import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';

import { getWorkshop, updateWorkshopApi } from '../utils/api';
import {
  retrieveWorkshop,
  workshopLoadError,
  workshopRetrieved,
} from '../actions/workshop';

// eslint-disable-next-line import/prefer-default-export
export const useWorkshop = (requestedWorkshopId) => {
  const mounted = useRef(false);
  const dispatch = useDispatch();
  const localWorkshop = useSelector((state) => state.workshop);

  useEffect(() => {
    if (
      !localWorkshop ||
      !localWorkshop.result ||
      localWorkshop.result.id !== requestedWorkshopId
    ) {
      const load = async () => {
        try {
          const cloudWorkshop = await getWorkshop({
            workshopId: requestedWorkshopId,
          });
          const cloudWorkshopUpdatedAt = new Date(
            cloudWorkshop.result.updatedAt
          );
          if (mounted.current) {
            if (localWorkshop === null || !localWorkshop.result) {
              // eslint-disable-next-line no-console
              console.info(
                'Use case 1: No local workshop: Store cloudWorkshop locally'
              );
              // No local workshop: Store cloudWorkshop locally
              dispatch(workshopRetrieved(cloudWorkshop));
            } else {
              const {
                isSynchronized,
                result: { id: localWorkshopId, updatedAt },
              } = localWorkshop;
              const localWorkshopUpdatedAt = new Date(updatedAt);

              if (localWorkshopId === requestedWorkshopId) {
                // The local workshop is the same as the requested workshop
                if (
                  cloudWorkshopUpdatedAt.getTime() ===
                  localWorkshopUpdatedAt.getTime()
                ) {
                  // eslint-disable-next-line no-console
                  console.info(
                    'Use case 2: the local workshop is synchronized with the cloud workshop: In therory, no need to update it locally. but do it in the case where ...'
                  );
                  // eslint-disable-next-line max-len
                  // the local workshop is synchronized with the cloud workshop: In therory, no need to update it locally. but do it in the case where ...
                  dispatch(workshopRetrieved(cloudWorkshop));
                } else if (localWorkshopUpdatedAt < cloudWorkshopUpdatedAt) {
                  // The localWorkshop is older than the cloudWorkshop
                  if (!isSynchronized) {
                    // eslint-disable-next-line no-console
                    console.info(
                      'Use case 3: The localWorkshop has been modified locally or has never been synchronized: We need to refect modification to cloud version. Then replace localWorkshop with the requestWorkshop'
                    );
                    // eslint-disable-next-line max-len
                    // The localWorkshop has been modified locally or has never been synchronized:
                    // We need to refect modification to cloud version
                    // Send modif to cloud
                    await updateWorkshopApi({
                      workshopId: localWorkshopId,
                      data: localWorkshop,
                    });
                    // Then replace localWorkshop with the requestWorkshop
                    dispatch(workshopRetrieved(cloudWorkshop));
                  } else {
                    // eslint-disable-next-line no-console
                    console.info(
                      'Use case 4: The cloudWorkshop has been modified by someone else. Update the localWorkshop with the cloudWorkshop'
                    );
                    // The cloudWorkshop has been modified by someone else
                    // Update the localWorkshop with the cloudWorkshop
                    dispatch(workshopRetrieved(cloudWorkshop));
                  }
                } else {
                  // Can't happen: The updatedAt field is never modified locally
                  // eslint-disable-next-line no-console
                  console.info(
                    "Use case 5: Can't happen: The updatedAt field is never modified locally"
                  );
                  // eslint-disable-next-line no-console
                  console.error(
                    `Error: local workshop ${localWorkshopId} has been modified at ${localWorkshopUpdatedAt} \n
                  which is more recent than the cloud workshop version modified at ${cloudWorkshopUpdatedAt}`
                  );
                }
              }
              // The local workshop is different from the requested workshop
              else if (!isSynchronized) {
                // eslint-disable-next-line no-console
                console.info(
                  'Use case 6: The localWorkshop has been modified locally or has never been synchronized: We need to refect modification to cloud version. Then replace it with the requestWorkshop'
                );
                // eslint-disable-next-line max-len
                // The localWorkshop has been modified locally or has never been synchronized:
                // We need to refect modification to cloud version
                // Send modif to cloud
                await updateWorkshopApi({
                  workshopId: localWorkshopId,
                  data: localWorkshop,
                });
                // Then replace it with the requestWorkshop
                dispatch(workshopRetrieved(cloudWorkshop));
              } else {
                // eslint-disable-next-line no-console
                console.log(
                  'Use case 7: The local workshop is synchronized with the cloud. We can replace it with the requestWorkshop'
                );
                // eslint-disable-next-line max-len
                // The local workshop is synchronized with the cloud. We can replace it with the requestWorkshop
                dispatch(workshopRetrieved(cloudWorkshop));
              }
            }
          }
          return cloudWorkshop;
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error(e);
          if (mounted.current) {
            dispatch(workshopLoadError(e));
          }
          return null;
        }
      };
      mounted.current = true;
      dispatch(retrieveWorkshop());
      load();
    } else {
      // eslint-disable-next-line no-console
      console.info(
        'Use case 0: the local workshop id is equals to the requested workshop id. Just return'
      );
    }
    return () => {
      mounted.current = false;
    };
  }, [dispatch, requestedWorkshopId]);
  return localWorkshop;
};

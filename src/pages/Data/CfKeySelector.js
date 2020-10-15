import React, { useState } from 'react';
import { Treebeard, decorators } from 'react-treebeard';
import { useTranslation } from 'react-i18next';

/* eslint no-param-reassign: ["error", { "props": false }] */
const CfKeySelector = ({
  footprintStructure,
  selectedNode,
  setSelectedNode,
}) => {
  const { t } = useTranslation();

  const [data, setData] = useState(footprintStructure);
  const onToggle = (node, toggled) => {
    if (selectedNode) {
      selectedNode.active = false;
    }
    node.active = true;
    if (node.children) {
      node.toggled = toggled;
    }
    setSelectedNode(node);
    setData({ ...data });
  };
  const style = {
    tree: {
      base: {
        listStyle: 'none',
        backgroundColor: '',
        margin: 0,
        padding: 0,
        color: '',
        fontSize: '14px',
      },
      node: {
        base: {
          position: 'relative',
        },
        link: {
          cursor: 'pointer',
          position: 'relative',
          padding: '0px 5px',
          display: 'block',
        },
        activeLink: {
          background: '',
          fontWeight: 'bolder',
        },
        toggle: {
          base: {
            position: 'relative',
            display: 'inline-block',
            verticalAlign: 'top',
            marginLeft: '-5px',
            height: '24px',
            width: '24px',
          },
          wrapper: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            margin: '-7px 0 0 -7px',
            height: '14px',
          },
          height: 14,
          width: 14,
          arrow: {
            fill: '',
            strokeWidth: 0,
          },
        },
        header: {
          base: {
            display: 'inline-block',
            verticalAlign: 'top',
            color: '',
          },
          connector: {
            width: '2px',
            height: '12px',
            borderLeft: 'solid 2px black',
            borderBottom: 'solid 2px black',
            position: 'absolute',
            top: '0px',
            left: '-21px',
          },
          title: {
            lineHeight: '24px',
            verticalAlign: 'middle',
          },
        },
        subtree: {
          listStyle: 'none',
          paddingLeft: '19px',
        },
        loading: {
          color: '#E2C089',
        },
      },
    },
  };
  const customDecorators = {
    ...decorators,
    Header: (props) => {
      return t(`footprintCategories.${props.node.name}`);
    },
  };

  return (
    <Treebeard
      style={style}
      data={footprintStructure}
      onToggle={onToggle}
      decorators={customDecorators}
    />
  );
};

export default CfKeySelector;

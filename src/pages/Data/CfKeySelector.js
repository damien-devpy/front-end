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

  const customDecorators = {
    ...decorators,
    Header: (props) => {
      return t(`footprintCategories.${props.node.name}`);
    },
  };

  return (
    <Treebeard
      data={footprintStructure}
      onToggle={onToggle}
      decorators={customDecorators}
    />
  );
};

export default CfKeySelector;

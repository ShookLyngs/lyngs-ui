
import { FindDomNode } from 'types';

export const findDomNode: FindDomNode = (instance) => {
  let node = instance && (instance.$el || instance);
  while (node && !node.tagName) {
    node = node.nextSibling;
  }
  return node;
};
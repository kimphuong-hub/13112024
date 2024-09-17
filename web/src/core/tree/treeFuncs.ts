/* eslint-disable @typescript-eslint/no-explicit-any */

export const flattenSubTree = (items: any[]): any[] => {
  const result: any[] = [];

  const collectIds = (items: any[], parentId = '') => {
    for (const item of items) {
      result.push({
        ...item,
        parents: parentId,
        children: []
      });
      if (item.children && item.children.length > 0) {
        collectIds(item.children, `${parentId}-${item.id}`);
      }
    }
  };

  collectIds(items);
  return result;
};

export const getAllIdsSubTree = (items: any[]) => {
  const ids: string[] = [];

  const collectIds = (items: any[]) => {
    for (const item of items) {
      ids.push(item.id);
      if (item.children && item.children.length > 0) {
        collectIds(item.children);
      }
    }
  };

  collectIds(items);
  return ids;
};

export const findSubtreeById = (items: any[], targetId: string): any => {
  const findSubTree = (item: any): any | null => {
    if (item.id == targetId) {
      return item;
    }

    for (const child of item.children) {
      const result = findSubTree(child);
      if (result) {
        return result;
      }
    }

    return null;
  };

  return items.map((item) => findSubTree(item)).find((item) => item !== null);
};

export const findSubtreePathById = (items: any[], targetId: string): string[] => {
  const findSubTreePath = (item: any, path: string[] = []): string[] | null => {
    const currentPath = [...path, item.id];
    if (item.id == targetId) {
      return currentPath;
    }

    for (const child of item.children) {
      const result = findSubTreePath(child, currentPath);
      if (result) {
        return result;
      }
    }

    return null;
  };

  return items.map((item) => findSubTreePath(item, [])).find((item) => item !== null) as string[];
};

export const findSubtreeParentById = (items: any[], targetId: string): any[] => {
  const findSubtreeParent = (account: any): boolean => {
    if (account.id == targetId) {
      return true;
    }
    return account.children.some((child: any) => findSubtreeParent(child));
  };

  return items.filter((item) => findSubtreeParent(item));
};

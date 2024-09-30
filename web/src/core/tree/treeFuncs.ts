/* eslint-disable @typescript-eslint/no-explicit-any */

export const flattenSubTree = (items: any[]): any[] => {
  const result: any[] = [];

  const flatten = (items: any[], parentIds: string[] = []) => {
    for (const item of items) {
      const childrenIds = getAllIdsSubTree(item.children);
      result.push({ ...item, parentIds, childrenIds });
      if (item.children && item.children.length > 0) {
        flatten(item.children, [...parentIds, item.id]);
      }
    }
  };

  flatten(items);
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

export const findSubtreeById = (items: any[], targetId: string | number): any => {
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

export const findSubtreePathById = (items: any[], targetId: string | number): string[] => {
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

export const findSubtreeParentById = (items: any[], targetId: string | number): any[] => {
  const findSubtreeParent = (account: any): boolean => {
    if (account.id == targetId) {
      return true;
    }
    return account.children.some((child: any) => findSubtreeParent(child));
  };

  return items.filter((item) => findSubtreeParent(item));
};

export const findSubtreeParentFirstById = (items: any[], targetId: string | number): any | null => {
  let parent: any | null = null;

  const findSubtreeParent = (accounts: any[]): void => {
    for (const account of accounts) {
      if (account.children && account.children.some((child: any) => child.id === targetId)) {
        parent = account;
        return;
      }
      if (account.children) {
        findSubtreeParent(account.children);
      }
    }
  };

  findSubtreeParent(items);
  return parent;
};

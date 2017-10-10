const comparator = key => {
  return (itemA, itemB) => {
    if (itemA[key] > itemB[key]) {
      return 1;
    }

    if (itemA[key] < itemB[key]) {
      return -1;
    }

    return 0;
  };
};

export const sortById = (items, key) => {
  const sortedItems = items.slice();
  const sortFn = comparator(key);
  return sortedItems.sort(sortFn);
};

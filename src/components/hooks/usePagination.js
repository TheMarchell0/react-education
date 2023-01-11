import { useMemo } from "react";

export const usePagination = (count) => {
  const resultCount = useMemo(() => {
    let result = [];
    for (let i = 0; i < count; i++) {
      result.push(i + 1);
    }
    return result;
  }, [count]);
  return resultCount;
};

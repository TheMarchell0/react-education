import { useMemo } from "react";

//Определение типа контента (обычного или отсортированного)
export const useSortedPostsContent = (postsContent, sort) => {
  const sortPostsContent = useMemo(() => {
    if (sort !== "default") {
      return [...postsContent].sort((a, b) => a[sort].localeCompare(b[sort]));
    }
    return postsContent;
  }, [sort, postsContent]);

  return sortPostsContent;
};

//Функционал поиска поста (По итогу именно этот массив генерируется в контент)
export const useSearchSortedContent = (posts, sort, searchQuery) => {
  const sortPostsContent = useSortedPostsContent(posts, sort);
  const searchSortedContent = useMemo(() => {
    return sortPostsContent.filter((post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, sortPostsContent]);

  return searchSortedContent;
};

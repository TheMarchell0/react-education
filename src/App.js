import React, { useEffect, useState } from "react";
import "./styles/style.css";
import PostList from "./components/PostList";
import CreateNewPost from "./components/CreateNewPost";
import Filter from "./components/Filter";
import CustomModal from "./components/UI/modal/CustomModal";
import CustomButton from "./components/UI/button/CustomButton";
import { useSearchSortedContent } from "./components/hooks/usePosts";
import PostService from "./API/PostService";
import Loader from "./components/UI/loader/Loader";
import { useFetching } from "./components/hooks/useFetching";
import getPagesCount from "./utils/pages";
import { usePagination } from "./components/hooks/usePagination";

function App() {
  const [postsContent, setPostsContent] = useState([]);
  const [filter, setFilter] = useState({ sort: "default", searchQuery: "" });
  const [modalVisible, setModalVisible] = useState(false);
  const [paginationInfo, setPaginationInfo] = useState({
    count: 0,
    limit: 10,
    page: 1,
  });
  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const posts = await PostService.getAll(
      paginationInfo.limit,
      paginationInfo.page
    );
    setPostsContent(posts.data);
    const currentCount = getPagesCount(
      posts.headers["x-total-count"],
      paginationInfo.limit
    );
    setPaginationInfo({
      ...paginationInfo,
      count: currentCount,
    });
  });

  let pagesArray = usePagination(paginationInfo.count); // Массив с пагинацией, который будет преобразован в вёрстку;

  const searchSortedContent = useSearchSortedContent(
    postsContent,
    filter.sort,
    filter.searchQuery
  );

  //Получение постов с бэка при первичном рендере
  useEffect(() => {
    fetchPosts();
  }, []);

  //Создание поста
  const newPostFunc = (newPost) => {
    setPostsContent([...postsContent, newPost]);
    setModalVisible(false);
  };

  //Удаление поста
  const removePostFunc = (removePostID) => {
    const newPostContent = postsContent.filter((item) => {
      return removePostID !== item.id;
    });
    setPostsContent(newPostContent);
  };

  return (
    <>
      <CustomButton
        style={{ margin: "10px 0" }}
        onClick={() => setModalVisible(true)}
      >
        Создать пост
      </CustomButton>
      <CustomModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      >
        <CreateNewPost newPostFunc={newPostFunc} />
      </CustomModal>
      <hr />
      <Filter filter={filter} setFilter={setFilter} />
      {postError && <h1>Произошла ошибка - {postError}</h1>}
      {isPostsLoading ? (
        <Loader />
      ) : (
        <PostList
          posts={searchSortedContent}
          removePostFunc={removePostFunc}
          head={"Список постов"}
        />
      )}
      <div className={"pagination"}>
        {pagesArray.map((item) => (
          <span
            key={item}
            onClick={() => setPaginationInfo({ ...paginationInfo, page: item })}
            className={
              paginationInfo.page === item
                ? "pagination__item pagination__item_active"
                : "pagination__item"
            }
          >
            {item}
          </span>
        ))}
      </div>
    </>
  );
}

export default App;

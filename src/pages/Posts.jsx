import React, { useEffect, useRef, useState } from "react";
import PostList from "../components/PostList";
import CreateNewPost from "../components/CreateNewPost";
import Filter from "../components/Filter";
import CustomModal from "../components/UI/modal/CustomModal";
import CustomButton from "../components/UI/button/CustomButton";
import { useSearchSortedContent } from "../components/hooks/usePosts";
import PostService from "../API/PostService";
import Loader from "../components/UI/loader/Loader";
import { useFetching } from "../components/hooks/useFetching";
import getPagesCount from "../utils/pages";
import Pagination from "../components/UI/pagination/Pagination";
import { useObserver } from "../components/hooks/useObserver";
import CustomSelect from "../components/UI/select/CustomSelect";

function Posts() {
  const lastElement = useRef();
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
    setPostsContent([...postsContent, ...posts.data]);
    const currentCount = getPagesCount(
      posts.headers["x-total-count"],
      paginationInfo.limit
    );
    setPaginationInfo({
      ...paginationInfo,
      count: currentCount,
    });
  });

  const searchSortedContent = useSearchSortedContent(
    postsContent,
    filter.sort,
    filter.searchQuery
  );

  //Ставим Observer, когда юзер долистал до конца страницы, чтобы подгрузить новые посты бесконечной ленты
  useObserver(
    lastElement,
    paginationInfo.page < paginationInfo.count,
    isPostsLoading,
    () => {
      setPaginationInfo({
        ...paginationInfo,
        page: paginationInfo.page + 1,
      });
    }
  );

  //Получение постов с бэка при первичном рендере
  useEffect(() => {
    fetchPosts();
  }, [paginationInfo.page, paginationInfo.limit]);

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

  //Подгрузка новых постов при нажатии на кнопки пагинации
  const changePage = (item) => {
    setPaginationInfo({ ...paginationInfo, page: item });
  };

  return (
    <div className="main">
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
      {isPostsLoading && <Loader />}
      <CustomSelect
        value={paginationInfo.limit}
        changeValue={(value) =>
          setPaginationInfo({ ...paginationInfo, limit: value })
        }
        options={[
          { value: 5, name: "5" },
          { value: 10, name: "10" },
          { value: 25, name: "25" },
          { value: -1, name: "Показать всё" },
        ]}
      ></CustomSelect>
      <PostList
        posts={searchSortedContent}
        removePostFunc={removePostFunc}
        head={"Список постов"}
      />
      <div ref={lastElement} style={{ height: 20 }}></div>
      <Pagination
        page={paginationInfo.page}
        changePage={changePage}
        totalPages={paginationInfo.count}
      />
    </div>
  );
}

export default Posts;

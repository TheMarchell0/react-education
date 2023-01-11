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

function App() {
  const [postsContent, setPostsContent] = useState([]);
  const [filter, setFilter] = useState({ sort: "default", searchQuery: "" });
  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const posts = await PostService.getAll();
    setPostsContent(posts);
  });
  const searchSortedContent = useSearchSortedContent(
    postsContent,
    filter.sort,
    filter.searchQuery
  );

  useEffect(() => {
    fetchPosts();
  }, []);

  //Показ модального окна с добавлением поста
  const [modalVisible, setModalVisible] = useState(false);

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
    </>
  );
}

export default App;

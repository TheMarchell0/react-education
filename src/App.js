import React, { useState } from "react";
import "./styles/style.css";
import PostList from "./components/PostList";
import CreateNewPost from "./components/CreateNewPost";
import Filter from "./components/Filter";
import CustomModal from "./components/UI/modal/CustomModal";
import CustomButton from "./components/UI/button/CustomButton";
import { useSearchSortedContent } from "./components/hooks/usePosts";

function App() {
  const [postsContent, setPostsContent] = useState([
    {
      id: 1,
      title: "JavaScript",
      description: "Че это",
    },
    {
      id: 2,
      title: "HTML",
      description: "А это че",
    },
    {
      id: 3,
      title: "CSS",
      description: "И это че",
    },
  ]); //Допустим, что получаем данные с бэка;
  const [filter, setFilter] = useState({ sort: "default", searchQuery: "" });
  const searchSortedContent = useSearchSortedContent(
    postsContent,
    filter.sort,
    filter.searchQuery
  );

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
      <PostList
        posts={searchSortedContent}
        removePostFunc={removePostFunc}
        head={"Список постов"}
      />
    </>
  );
}

export default App;

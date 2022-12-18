import React, { useState } from "react";
import "./styles/style.css";
import PostList from "./components/PostList";
import CreateNewPost from "./components/CreateNewPost";

function App() {
  const [postsContent, setPostContent] = useState([
    {
      id: 1,
      title: "Заголовок поста 1",
      description: "Описание поста 1",
    },
    {
      id: 2,
      title: "Заголовок поста 2",
      description: "Описание поста 2",
    },
    {
      id: 3,
      title: "Заголовок поста 3",
      description: "Описание поста 3",
    },
    {
      id: 4,
      title: "Заголовок поста 4",
      description: "Описание поста 4",
    },
    {
      id: 5,
      title: "Заголовок поста 5",
      description: "Описание поста 5",
    },
  ]); //Допустим, что получаем данные с бэка;

  function newPostFunc(newPost) {
    setPostContent([...postsContent, newPost]);
  }

  function removePostFunc(removePostID) {
    const newPostContent = postsContent.filter((item) => {
      console.log(removePostID, item.id);
      return removePostID !== item.id;
    });
    setPostContent(newPostContent);
  }

  return (
    <>
      <CreateNewPost newPostFunc={newPostFunc} />
      <PostList
        posts={postsContent}
        removePostFunc={removePostFunc}
        head={"Список постов"}
      />
    </>
  );
}

export default App;

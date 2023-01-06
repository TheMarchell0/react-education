import React, { useState } from "react";
import CustomButton from "./UI/button/CustomButton";
import CustomInput from "./UI/input/CustomInput";

function CreateNewPost({ newPostFunc }) {
  const [newPost, setNewPost] = useState({ title: "", body: "" });

  function addPost(e) {
    e.preventDefault();
    if (newPost.title.length === 0 || newPost.body.length === 0) {
      return;
    }
    newPostFunc({ id: Date.now(), ...newPost });
    setNewPost({ title: "", body: "" });
  }

  return (
    <form>
      <CustomInput
        type="text"
        placeholder="Название поста"
        required
        value={newPost.title}
        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
      />
      <CustomInput
        type="text"
        placeholder="Описание поста"
        value={newPost.body}
        onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
      />
      <CustomButton onClick={addPost}>Добавить</CustomButton>
    </form>
  );
}

export default CreateNewPost;

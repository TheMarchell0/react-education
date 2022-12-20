import React, { useState, useMemo } from "react";
import "./styles/style.css";
import PostList from "./components/PostList";
import CreateNewPost from "./components/CreateNewPost";
import CustomSelect from "./components/UI/select/CustomSelect";
import Search from "./components/Search";

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
  const [selectedSort, setSelectedSort] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");

  //Определение типа контента (обычного или отсортированного)
  const sortPostsContent = useMemo(() => {
    if (selectedSort !== "default") {
      return [...postsContent].sort((a, b) =>
        a[selectedSort].localeCompare(b[selectedSort])
      );
    }
    return postsContent;
  }, [selectedSort, postsContent]);

  //Создание поста
  const newPostFunc = (newPost) => {
    setPostsContent([...postsContent, newPost]);
  };

  //Удаление поста
  const removePostFunc = (removePostID) => {
    const newPostContent = postsContent.filter((item) => {
      return removePostID !== item.id;
    });
    setPostsContent(newPostContent);
  };

  //Получение и смена стейта типа сортировки из customSelect.jsx (влияет на вывод контента)
  const sortPosts = (sort) => {
    setSelectedSort(sort);
  };

  //Вывод контента
  const mainContent = () => {
    switch (postsContent.length) {
      case 0:
        return <p className="not-found">Посты не найдены!</p>;
      default:
        return (
          <PostList
            posts={sortPostsContent}
            removePostFunc={removePostFunc}
            head={"Список постов"}
          />
        );
    }
  };

  return (
    <>
      <CreateNewPost newPostFunc={newPostFunc} />
      <hr />
      <CustomSelect
        defaultValue="По умолчанию"
        selectedValue={selectedSort}
        changeValue={sortPosts}
        options={[
          { value: "title", name: "По названию" },
          { value: "description", name: "По описанию" },
        ]}
      />
      <Search searchValue={searchQuery} searchFunction={setSearchQuery} />
      {mainContent()}
    </>
  );
}

export default App;

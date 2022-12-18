import React from "react";
import PostItem from "./PostItem";

const PostList = ({ posts, head, removePostFunc }) => {
  return (
    <>
      <h1 className="title">{head}</h1>
      <ul className="posts">
        {posts.map((item, index) => {
          return (
            <PostItem
              title={item.title}
              description={item.description}
              number={index + 1}
              id={item.id}
              key={index}
              removePostFunc={removePostFunc}
            />
          );
        })}
      </ul>
    </>
  );
};

export default PostList;

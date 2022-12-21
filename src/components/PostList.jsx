import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import PostItem from "./PostItem";

const PostList = ({ posts, head, removePostFunc }) => {
  if (!posts.length) {
    return <p className="not-found">Посты не найдены!</p>;
  }

  return (
    <>
      <h1 className="title">{head}</h1>
      <ul className="posts">
        <TransitionGroup>
          {posts.map((item, index) => {
            return (
              <CSSTransition key={index} classNames="posts__item" timeout={500}>
                <PostItem
                  title={item.title}
                  description={item.description}
                  number={index + 1}
                  id={item.id}
                  removePostFunc={removePostFunc}
                />
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      </ul>
    </>
  );
};

export default PostList;

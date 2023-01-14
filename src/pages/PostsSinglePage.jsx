import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetching } from "../components/hooks/useFetching";
import PostService from "../API/PostService";
import { logDOM } from "@testing-library/react";
import Loader from "../components/UI/loader/Loader";

const PostsSinglePage = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [fetchPostById, isLoading, error] = useFetching(async (id) => {
    const response = await PostService.getById(id);
    setPost(response.data);
  });
  const [fetchPostCommentsById, isCommentLoading, commentError] = useFetching(
    async (id) => {
      const response = await PostService.getCommentsById(id);
      setComments(response.data);
    }
  );

  console.log(params);

  useEffect(() => {
    fetchPostById(params.id);
    fetchPostCommentsById(params.id);
  }, []);

  return (
    <div>
      <h1>Вы открыли страницу поста с ID {post.id}</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <p>
            {post.id} - {post.title}
          </p>
          <p>{post.body}</p>
        </div>
      )}
      {isCommentLoading ? (
        <Loader />
      ) : (
        <div style={{ marginTop: 15 }}>
          <h2>Комментарии:</h2>
          {comments.map((comment) => {
            return (
              <div key={comment.id} style={{ marginTop: 15 }}>
                <h3>{comment.name}</h3>
                <h4>{comment.email}</h4>
                <p>{comment.body}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PostsSinglePage;

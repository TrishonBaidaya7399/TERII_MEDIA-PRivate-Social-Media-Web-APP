import React, { useEffect } from "react";
import "./Posts.css";
import "./Posts.css";
import Post from "../Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { getTimeLinePosts } from "../../redux/apiCalls";
import { useParams } from "react-router-dom";
const Posts = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  let { posts, loading } = useSelector((state) => state.post);
  const params = useParams();
  useEffect(() => {
    getTimeLinePosts(currentUser.user._id, dispatch);
  }, []);
  if (!posts) return "No Posts!";
  if (params.id) posts = posts.filter((post) => post.userId === params.id);
  return (
    <div className="Posts">
      {loading
        ? "Fetching Posts..."
        : posts.map((post, id) => {
            return <Post data={post} id={id} key={id} />;
          })}
    </div>
  );
};

export default Posts;

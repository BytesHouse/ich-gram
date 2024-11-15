"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Like {
  _id: string;
  post_id: string;
  user_id: string;
  created_at: string;
}

interface Post {
  _id: string;
  likes_count: number;
}

const Like = () => {
  const [likes, setLikes] = useState<Like[]>([]);
  const [post, setPost] = useState<Post | null>(null);
  const [isLiked, setIsLiked] = useState(false);

  const postId = 'your-post-id';
  const userId = 'your-user-id';

  useEffect(() => {
    fetchLikes();
    fetchPost();
  }, []);

  const fetchLikes = async () => {
    try {
      const response = await axios.get(`/api/likes/${postId}`);
      setLikes(response.data);
      setIsLiked(response.data.some((like: Like) => like.user_id === userId));
    } catch (error) {
      console.error('Error fetching likes:', error);
    }
  };

  const fetchPost = async () => {
    try {
      const response = await axios.get(`/api/posts/${postId}`);
      setPost(response.data);
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  };

  const likePost = async () => {
    try {
      await axios.post(`/api/likes/${postId}/${userId}`);
      fetchLikes();
      fetchPost();
    } catch (error) {
      console.error('Error liking the post:', error);
    }
  };

  const unlikePost = async () => {
    try {
      await axios.delete(`/api/likes/${postId}/${userId}`);
      fetchLikes();
      fetchPost();
    } catch (error) {
      console.error('Error unliking the post:', error);
    }
  };

  return (
    <div>
      <h1>Post Likes</h1>
      <p>Post ID: {postId}</p>
      <p>Total Likes: {post?.likes_count || 0}</p>

      <button onClick={isLiked ? unlikePost : likePost}>
        {isLiked ? 'Unlike' : 'Like'}
      </button>

      <h2>All Likes</h2>
      <ul>
        {likes.map((like) => (
          <li key={like._id}>
            User ID: {like.user_id}, Liked at: {new Date(like.created_at).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Like;
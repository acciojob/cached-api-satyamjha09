import React, { useState, useEffect, useMemo } from "react";

const CachedAPI = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
        );
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [userId]);

  // Memoizing posts to prevent unnecessary re-computation
  const memoizedPosts = useMemo(() => posts, [posts]);

  return (
    <div>
      <h2>Posts for User {userId}</h2>
      {loading ? (
        <p>Loading posts...</p>
      ) : (
        <ul>
          {memoizedPosts.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CachedAPI;

import React, { useState, useEffect, useMemo } from "react";

const CachedAPIComponent = ({ userId }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data based on userId
  useEffect(() => {
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/posts${userId ? `?userId=${userId}` : ""}`)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [userId]);

  // Memoize the fetched data to avoid unnecessary re-computation
  const cachedData = useMemo(() => data, [data]);

  return (
    <div>
      <h2>Cached API Data</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {cachedData.map((post) => (
            <li key={post.id}>
              <strong>{post.title}</strong>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CachedAPIComponent;

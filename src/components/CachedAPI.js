import "regenerator-runtime/runtime";
import React, { useEffect, useState } from "react";

const CachedAPI = () => {
  const [data, setData] = useState(null); // Start as null to check loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      {data === null ? (
        <p>Loading...</p> // Show "Loading..." before API response
      ) : (
        <ul>
          {data.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CachedAPI;

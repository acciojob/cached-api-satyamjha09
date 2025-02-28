import React, { useState, useEffect, useMemo } from "react";
import "regenerator-runtime/runtime";

const CachedAPI = ({ userId }) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(
            `https://jsonplaceholder.typicode.com/posts${userId ? `?userId=${userId}` : ""}`,
            { mode: "cors" }
          );
          
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const result = await response.json();
          setData(result);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    },[userId])

    const memoizedData = useMemo(() => data, [data]);

  return (
    <div>
        <h2> Posts </h2>
        {loading && <p> Loading... </p>}
        {error && <p style={{ color: "red" }}> {error} </p>}
        {!loading && !error && (
            <ul>
                {memoizedData.map((post) => (
                    <li key={post.id}>
                        <strong> {post.title} </strong>
                        <p> {post.body} </p>
                    </li>
                ))}
            </ul>
        )}
    </div>
  )
}

export default CachedAPI
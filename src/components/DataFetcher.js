import React, { useEffect, useState } from "react";

const DataFetcher = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  fetch("https://dummyjson.com/products")
    .then((res) => res.json())
    .then((json) => {
      setData(json.products); // ✅ only the array
    })
    .catch((err) => {
      setError(err.message);
    })
    .finally(() => {
      setLoading(false);
    });
}, []);


  if (loading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error}</div>;
  if (Array.isArray(data) && data.length === 0) return <div>[]</div>;

  return (
    <div>
      <div>Data Fetched from API</div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default DataFetcher;

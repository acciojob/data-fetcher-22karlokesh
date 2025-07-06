
// import React from "react";
// import './../styles/App.css';

// const App = () => {
//   return (
//     <div>
//         {/* Do not remove the main div */}
//     </div>
//   )
// }

// export default App


 import 'regenerator-runtime/runtime';
import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("https://dummyjson.com/products");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const jsonData = await response.json();
        if (!jsonData || !jsonData.products || jsonData.products.length === 0) {
          setData([]);
        } else {
          setData(jsonData);  // ✅ store entire JSON object
        }
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <div>Loading data...</div>;
  if (error) return <div>An error occurred: {error}</div>;
  if (!data || (data.products && data.products.length === 0)) return <div>[]</div>;

  return (
    <div>
      <h1>Data Fetched from API</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default App;


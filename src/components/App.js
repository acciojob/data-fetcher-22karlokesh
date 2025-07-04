
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
import React, { useEffect, useState } from "react";
import "./../styles/App.css";

const App = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((json) => {
        if (!json || !json.products || json.products.length === 0) {
          setData(null);
        } else {
          setData(json);
        }
      })
      .catch((err) => {
        setError("Error fetching data");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {/* Do not remove the main div */}
      {loading && <p>Loading...</p>}
      {!loading && error && <p>{error}</p>}
      {!loading && !error && !data && <p>No data found</p>}
      {!loading && !error && data && (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
};

export default App;

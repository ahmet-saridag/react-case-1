import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [postsUrl, setPostsUrl] = useState(
    "https://jsonplaceholder.typicode.com/posts"
  );
  const [postData, setPostData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function startFetching() {
      const result = await fetch(postsUrl);
      if (!result.ok) {
        setError(true);
      }
      const data = await result.json();

      setPostData(data);
    }
    startFetching();
  }, [postsUrl]);

  const handleChange = (event) => {
    const value = event.target.value;
    console.log(value.length === 0);
    if (
      value.length !== 0 &&
      value.length > 0 &&
      postData &&
      postData.length > 0 &&
      value &&
      value.length > 0
    ) {
      let filteredData = postData;
      filteredData = postData.filter((posts) => posts.title.includes(value));
      setPostData(filteredData);
    } else {
      async function startFetching() {
        const result = await fetch(postsUrl);
        if (!result.ok) {
          setError(true);
        }
        const data = await result.json();

        setPostData(data);
      }
      startFetching();
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <input
          onChange={handleChange}
          type="text"
          placeholder="Search for posts"
        />
        {!error ? (
          postData.length > 0 ? (
            postData.map((data, key) => {
              return (
                <div>
                  <h1 className="App-header__title">{data.title}</h1>
                  <div className="App-header__title">{data.body}</div>
                </div>
              );
            })
          ) : (
            <h1 className="App-header__title">Loading...</h1>
          )
        ) : (
          <h1 className="App-header__title">
            Error something is not working!!
          </h1>
        )}
      </header>
    </div>
  );
}

export default App;

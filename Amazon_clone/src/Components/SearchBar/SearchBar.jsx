import {
  useState,
  useEffect
} from "react";

import "./SearchBar.css";

function SearchBar({

  products = [],

  setFilteredProducts

}) {

  const [search, setSearch] = useState("");

  const [history, setHistory] = useState([]);

  const [showHistory, setShowHistory] =
    useState(false);

  /* LOAD HISTORY */

  useEffect(() => {

    const savedHistory =

      JSON.parse(
        localStorage.getItem("searchHistory")
      ) || [];

    setHistory(savedHistory);

  }, []);

  /* FILTER PRODUCTS */

  useEffect(() => {

    const filteredProducts =
      products.filter((item) =>

        item.title
          .toLowerCase()
          .includes(search.toLowerCase())
      );

    if (setFilteredProducts) {

      setFilteredProducts(filteredProducts);
    }

  }, [search, products, setFilteredProducts]);

  /* CLOSE HISTORY ON SCROLL */

  useEffect(() => {

    const handleScroll = () => {

      setShowHistory(false);
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () => {

      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };

  }, []);

  /* SEARCH */

  const handleSearch = () => {

    if (!search.trim()) return;

    const updatedHistory = [

      search,

      ...history.filter(
        (item) =>

          item.toLowerCase() !==
          search.toLowerCase()
      )

    ].slice(0, 5);

    setHistory(updatedHistory);

    localStorage.setItem(

      "searchHistory",

      JSON.stringify(updatedHistory)
    );

    setShowHistory(false);
  };

  /* ENTER KEY */

  const handleKeyDown = (e) => {

    if (e.key === "Enter") {

      handleSearch();
    }
  };

  /* CLEAR ALL HISTORY */

  const clearHistory = () => {

    setHistory([]);

    localStorage.removeItem(
      "searchHistory"
    );
  };

  /* REMOVE SINGLE HISTORY */

  const removeHistoryItem = (index) => {

    const updatedHistory =
      history.filter(
        (_, i) => i !== index
      );

    setHistory(updatedHistory);

    localStorage.setItem(

      "searchHistory",

      JSON.stringify(updatedHistory)
    );
  };

  return (

    <div className="searchBar">

      <div className="searchContainer">

        <input
          type="text"

          placeholder="Search Amazon products..."

          value={search}

          onChange={(e) =>
            setSearch(e.target.value)
          }

          onFocus={() =>
            setShowHistory(true)
          }

          onKeyDown={handleKeyDown}
        />

        <button onClick={handleSearch}>
          🔍
        </button>

      </div>

      {/* SEARCH HISTORY */}

      {showHistory &&
        history.length > 0 && (

        <div className="historyBox">

          <div className="historyHeader">

            <h4>
              Recent Searches
            </h4>

            <button
              className="clearBtn"
              onClick={clearHistory}
            >
              Clear
            </button>

          </div>

          {history.map((item, index) => (

            <div
              key={index}
              className="historyItem"
            >

              <span
                className="historyText"

                onClick={() => {

                  setSearch(item);

                  setShowHistory(false);
                }}
              >
                🔍 {item}
              </span>

              <button
                className="removeHistoryBtn"

                onClick={() =>
                  removeHistoryItem(index)
                }
              >
                ✖
              </button>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default SearchBar;
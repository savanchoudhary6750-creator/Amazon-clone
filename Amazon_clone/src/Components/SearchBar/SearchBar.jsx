import {
  useState,
  useEffect
} from "react";

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

    <div className="w-full max-w-2xl mx-auto relative">

      <div className="flex w-full rounded-lg overflow-hidden bg-white shadow-md">

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

          className="flex-1 px-4 py-3 border-none outline-none text-gray-800 text-sm"
        />

        <button 

          onClick={handleSearch}

          className="bg-amazon-gold hover:bg-amazon-goldHover text-black px-6 font-semibold transition-colors flex items-center justify-center"
        >
          🔍
        </button>

      </div>

      {/* SEARCH HISTORY */}

      {showHistory &&
        history.length > 0 && (

        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg z-50 border border-gray-200">

          <div className="flex justify-between items-center p-4 border-b border-gray-200">

            <h4 className="font-semibold text-gray-800">
              Recent Searches
            </h4>

            <button
              className="text-xs text-blue-600 hover:text-blue-800 font-medium"
              onClick={clearHistory}
            >
              Clear All
            </button>

          </div>

          {history.map((item, index) => (

            <div
              key={index}
              className="flex justify-between items-center p-3 hover:bg-gray-100 border-b border-gray-100 last:border-b-0 cursor-pointer"
            >

              <span
                className="text-gray-700 text-sm flex-1"

                onClick={() => {

                  setSearch(item);

                  setShowHistory(false);
                }}
              >
                🔍 {item}
              </span>

              <button
                className="text-gray-400 hover:text-red-600 ml-2 text-lg"

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
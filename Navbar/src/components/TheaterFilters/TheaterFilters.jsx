import { useState } from "react";
import "./TheaterFilters.css";
import {
  SlidersHorizontal,
  X,
} from "lucide-react";

function TheaterFilters({
  onApplyFilters,
}) {
  const [showFilter, setShowFilter] =
    useState(false);

  const [activeTab, setActiveTab] =
    useState("Genre");

  const [selected, setSelected] =
    useState({
      Genre: [],
      Language: [],
      Format: [],
    });


  

  const filterData = {

    Genre: [
      "Action",
      "Adventure",
      "Animation",
      "Comedy",
      "Crime",
      "Drama",
      "Epic",
      "Family",
      "Fantasy",
      "Horror",
      "Mystery",
      "Romance",
      "Sci-Fi",
      "Thriller",
    ],

    Language: [
      "English",
      "Hindi",
      "Tamil",
      "Telugu",
      "Malayalam",
      "Kannada",
      "Punjabi",
      "Gujarati",
      "Marathi",
      "Bengali",
    ],

    Format: [
      "2D",
      "3D",
      "IMAX 2D",
      "IMAX 3D",
      "4DX 2D",
      "4DX 3D",
    ],

  };


  

  const toggleItem = (item) => {

    setSelected((previous) => {

      const currentItems =
        previous[activeTab];

      const updatedItems =
        currentItems.includes(item)

          ? currentItems.filter(
              (x) => x !== item
            )

          : [
              ...currentItems,
              item,
            ];


      return {
        ...previous,

        [activeTab]:
          updatedItems,
      };

    });

  };


  

  const clearFilters = () => {

    const emptyFilters = {
      Genre: [],
      Language: [],
      Format: [],
    };

    setSelected(emptyFilters);

    if (onApplyFilters) {
      onApplyFilters(emptyFilters);
    }

  };


  
  const applyFilters = () => {

    if (onApplyFilters) {
      onApplyFilters(selected);
    }

    setShowFilter(false);

  };


  return (
    <>

      

      <div className="tf-container">

        <div className="tf-filter-row">

          <button
            className="tf-filter-btn"
            onClick={() =>
              setShowFilter(true)
            }
          >

            <SlidersHorizontal
              size={18}
            />

            Filters

          </button>


          <button
            className="tf-tag"
            onClick={() => {
              setActiveTab("Language");
              setShowFilter(true);
            }}
          >
            English
          </button>


          <button
            className="tf-tag"
            onClick={() => {
              setActiveTab("Language");
              setShowFilter(true);
            }}
          >
            Hindi
          </button>


          <button
            className="tf-tag"
            onClick={() => {
              setActiveTab("Language");
              setShowFilter(true);
            }}
          >
            Tamil
          </button>


          <button className="tf-tag">
            New Releases
          </button>


          <button className="tf-tag">
            Re-Releases
          </button>


          <button
            className="tf-tag"
            onClick={() => {
              setActiveTab("Format");
              setShowFilter(true);
            }}
          >
            3D
          </button>


          <button
            className="tf-tag"
            onClick={() => {
              setActiveTab("Format");
              setShowFilter(true);
            }}
          >
            IMAX
          </button>

        </div>

      </div>


      
      {showFilter && (

        <div className="tf-overlay">

          <div className="tf-modal">


            {/* HEADER */}

            <div className="tf-header">

              <h2>
                Filter by
              </h2>


              <button
                className="tf-close-btn"
                onClick={() =>
                  setShowFilter(false)
                }
              >

                <X size={22} />

              </button>

            </div>


            

            <div className="tf-body">


              {/* LEFT MENU */}

              <div className="tf-left">

                {Object.keys(
                  filterData
                ).map((tab) => (

                  <button
                    key={tab}
                    className={
                      activeTab === tab
                        ? "tf-menu-btn tf-active"
                        : "tf-menu-btn"
                    }
                    onClick={() =>
                      setActiveTab(tab)
                    }
                  >

                    {tab}

                  </button>

                ))}

              </div>


              

              <div className="tf-right">

                {filterData[
                  activeTab
                ].map((item) => (

                  <label
                    key={item}
                    className="tf-option"
                  >

                    <input
                      type="checkbox"
                      checked={
                        selected[
                          activeTab
                        ].includes(item)
                      }
                      onChange={() =>
                        toggleItem(item)
                      }
                    />

                    <span>
                      {item}
                    </span>

                  </label>

                ))}

              </div>

            </div>


            

            <div className="tf-footer">

              <button
                className="tf-clear-btn"
                onClick={
                  clearFilters
                }
              >
                Clear Filters
              </button>


              <button
                className="tf-apply-btn"
                onClick={
                  applyFilters
                }
              >
                Apply Filters
              </button>

            </div>


          </div>

        </div>

      )}

    </>
  );
}

export default TheaterFilters;
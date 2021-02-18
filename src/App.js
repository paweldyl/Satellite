import React, { useEffect, useState } from "react";
import Search from "./components/Search";

function App() {
  const mapbox_key = "pk.eyJ1IjoiaGFraXJvczU0IiwiYSI6ImNrbGFoZWhoaTA1ajMyb3M0N3RtNDZ4NG8ifQ.MQh-iUPJTK4fDHwHLZjHiQ";
  const google_maps_embed_key = "AIzaSyDATcqaVb7hCdqfr4X6A74JbDWXXloeKac";
  const nasa_key = "1GIkA52PzaO8735dblWETYpRiQjVXAQlnrzmvidQ";

  const [searchInput, setSearchInput] = useState("");
  const [autocomplete, setAutocomplete] = useState([]);
  const [searchedMap, setSearchedMap] = useState("");
  const [searchedImage, setSearchedImage] = useState("");

  useEffect(() => {
    if (searchInput !== "") {
      fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchInput)}.json?access_token=${mapbox_key}`)
        .then(response => response.json())
        .then(data => {
          setAutocomplete([...data.features]);
        });
    }
    else {
      setAutocomplete([]);
    }
  }, [searchInput]);

  const searchLocation = location => {
    setSearchInput(location.place_name);
    setSearchedMap(location.place_name);
    setSearchedImage(`https://api.nasa.gov/planetary/earth/imagery?lon=${location.center[0]}&lat=${location.center[1]}&date=2020-02-18&dim=0.25&api_key=${nasa_key}`);
  }

  const clearSearch = e => {
    e.preventDefault();
    setSearchInput("");
  }

  return (
    <div className="app">
      <Search searchInput={searchInput} setSearchInput={setSearchInput} autocomplete={autocomplete} searchLocation={searchLocation} clearSearch={clearSearch} />
      <main className="searched-location">
        {
          (searchedImage !== "") && <img src={searchedImage} />
        }
        {
          (searchedMap !== "") && (
            <iframe
              width="600"
              height="450"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src={`https://www.google.com/maps/embed/v1/place?key=${google_maps_embed_key}&q=${searchedMap}`}>
            </iframe>
          )
        }
      </main>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import AppRouter from "./routes/AppRouter";
import "./App.css";
import "tachyons";
import PropagateLoader from "react-spinners/PropagateLoader";

function App() {
  const [regionList, setRegionList] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [flagList, setFlagList] = useState([]);
  const [countries, setCountries] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [userLocation, setUserLocation] = useState([]);
  const [Loading, setLoading] = useState(true);

  function getMapdata() {
    fetch("https://restcountries.com/v2/all")
      .then((response) => response.json())
      .then((countries) => {
        setLoading(false);
        let regionList = [];
        let countryList = [];
        let flagList = [];

        countries.map((list, i) => {
          const { region, name, flag } = list;
          return (
            regionList.push(region), countryList.push(name), flagList.push(flag)
          );
        });

        setCountries(countries);
        setRegionList(findUniqRegions(regionList));
        setCountryList(countryList);
        setFlagList(flagList);
        navigator.geolocation.getCurrentPosition(function (position) {
          setUserLocation(position.coords);
        });
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      getMapdata();
    }, 2000);
  }, []);

  const findUniqRegions = (regionList) => {
    return Array.from(
      new Set(regionList.filter((region) => region !== "").sort())
    );
  };

  const onSearchChange = (event) => {
    setSearchField(event.target.value.toLowerCase());
  };

  return (
    <div>
      <AppRouter
        onSearchChange={onSearchChange}
        regionList={regionList}
        countryList={countryList}
        flagList={flagList}
        countries={countries}
        searchField={searchField}
        userLocation={userLocation}
      />
    </div>
  );
}

export default App;

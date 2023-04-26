import React, { createContext, useEffect, useState, } from "react";

import userApi from "../api/user";
import { GeoLocation } from "../types";
import { useAuth } from "./AuthProvider";

interface IGeoLocationProviderProps {
    children: React.ReactNode;
}

interface IGeoLocationContext {
    geoLocation: GeoLocation;
    setGeoLocation: (geoLocation: GeoLocation) => void;
}

const defaultValue = {
  geoLocation: {
    latitude: 0,
    longitude: 0,
  },
  setGeoLocation: () => { },
};

interface IGeoLocationTimed {
    geoLocation: GeoLocation;
    timestamp: number;
}

const timeout = 1000 * 60 * 60; // 1 hour

const GeoLocationContext = createContext<IGeoLocationContext>(defaultValue);

const GeoLocationProvider = (props: IGeoLocationProviderProps) => {
  const [geoLocation, setGeoLocation] = useState<GeoLocation>(defaultValue.geoLocation);

  const setGeoLocationWrapped = async (geoLocation: GeoLocation, isError: boolean) => {
    setGeoLocation(geoLocation);
    localStorage.setItem("geoLocation", JSON.stringify({
      geoLocation,
      timestamp: isError ? 0 : Date.now(),
    }));
    if (!isError) {
      const res = await userApi.updateLocation(geoLocation.latitude, geoLocation.longitude);
      console.log("res", res);
    }
  };

  const { token } = useAuth();

  const getGeoLocation = (callback: (data: {
        geolocation: GeoLocation,
        isError: boolean,
    }) => void) => {
    console.log("getting geolocation");

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        callback({
          geolocation: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          isError: false,
        });
      }, (error) => {
        alert(`Error getting geolocation: ${error.message}. You may have unexpected behavior. If you are using a browser, please allow location access.`);
        callback({
          geolocation: {
            latitude: 0,
            longitude: 0,
          },
          isError: true,
        });
      });
    } else {
      alert("Geolocation is not supported. You may have unexpected behavior.");
      callback({
        geolocation: {
          latitude: 0,
          longitude: 0,
        },
        isError: true,
      });
    }
  };

  useEffect(() => {
    if (!token) {
      return;
    }

    console.log("useEffect");

    const storedGeoLocation = localStorage.getItem("geoLocation");
    if (!storedGeoLocation) {
      console.log("no stored geolocation");
      getGeoLocation((data) => {
        setGeoLocationWrapped(data.geolocation, data.isError);
      });
      return;
    }

    const parsedGeoLocation = JSON.parse(storedGeoLocation) as IGeoLocationTimed;
    if (parsedGeoLocation.timestamp === 0 || Date.now() - parsedGeoLocation.timestamp > timeout) {
      getGeoLocation((data) => {
        setGeoLocationWrapped(data.geolocation, data.isError);
      });
    } else {
      console.log("using stored geolocation", Date.now() - parsedGeoLocation.timestamp);
      setGeoLocation(parsedGeoLocation.geoLocation);
    }
  }, [token]);

  return (
    <>
      <GeoLocationContext.Provider
        value={{
          geoLocation,
          setGeoLocation,
        }}
      >
        {props.children}
      </GeoLocationContext.Provider>
    </>
  );
};

export { GeoLocationProvider, GeoLocationContext };
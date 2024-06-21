/* eslint-disable react/prop-types */
import { createContext, useReducer } from "react";

 export const  CityContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };

    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };

    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  async function getCity(id) {
    try {
      dispatch({ type: "loading" });
      const city = cities.find((city) => city.id === id);
      dispatch({ type: "city/loaded", payload: city });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error in loading city",
      });
    }
  }

  async function createCity(newCity) {
    try {
      dispatch({ type: "loading" });
      dispatch({ type: "city/created", payload: newCity });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error in creating city",
      });
    }
  }


  async function deleteCity(id) {
    try {
      dispatch({ type: "loading" });
      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error in deleting city",
      });
    }
  }

  return (
    <CityContext.Provider
      value={{
        cities,
        isLoading,
        getCity,
        currentCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CityContext.Provider>
  );
}

export { CitiesProvider };

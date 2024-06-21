import { useContext } from "react";
import { CityContext } from "./CitiesContext";

export function useCities() {
  const value = useContext(CityContext);
  if (value === undefined) throw new Error("This is wrong");
  return value;
}
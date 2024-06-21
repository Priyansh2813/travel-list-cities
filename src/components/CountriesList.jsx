/* eslint-disable react/prop-types */
import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../contexts/useCities";
import {v4 as uuid} from "uuid"

function CountryList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return <Message message="Add first city by clicking on the Map." />;

  const new_countries = [...new Set(cities.map(city => city.countryName))];
  const countries = new_countries.map(country => ({
    id: uuid(),
    country,
  }));
 


  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
}

export default CountryList;

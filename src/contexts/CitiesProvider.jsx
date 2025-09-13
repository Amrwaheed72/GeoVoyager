import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { cities as initialCities } from "../../data/cities.json"; // 👈 Import your static array

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  // Load cities from localStorage (or fallback to initialCities)
  useEffect(() => {
    setIsLoading(true);
    const storedCities = localStorage.getItem("cities");
    if (storedCities) {
      setCities(JSON.parse(storedCities));
    } else {
      setCities(initialCities);
      localStorage.setItem("cities", JSON.stringify(initialCities));
    }
    setIsLoading(false);
  }, []);

  const getCity = useCallback((id) => {
    setIsLoading(true);
    const storedCities = JSON.parse(localStorage.getItem("cities")) || [];
    const city = storedCities.find((c) => c.id === id);
    if (city) {
      setCurrentCity(city);
    } else {
      alert("Error, can't Find the City");
    }
    setIsLoading(false);
  }, []);

  function createCity(newCity) {
    setIsLoading(true);
    const cityWithId = { ...newCity, id: crypto.randomUUID() };
    setCities((prev) => {
      const updatedCities = [...prev, cityWithId];
      localStorage.setItem("cities", JSON.stringify(updatedCities)); // persist
      return updatedCities;
    });
    setIsLoading(false);
  }

  function deleteCity(id) {
    setIsLoading(true);
    setCities((prev) => {
      const updatedCities = prev.filter((city) => city.id !== id);
      localStorage.setItem("cities", JSON.stringify(updatedCities)); // persist
      return updatedCities;
    });
    setIsLoading(false);
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  return useContext(CitiesContext);
}

export { CitiesProvider, useCities };

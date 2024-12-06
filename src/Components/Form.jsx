// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import { useNavigate, useSearchParams } from "react-router-dom";
import useURLPosition from "../hooks/useURLPosition";
import Message from './Message'
import Spinner from "./Spinner";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../contexts/CitiesProvider";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const Base_Url = "https://api.bigdatacloud.net/data/reverse-geocode-client"


function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [lat, lng] = useURLPosition()
  const [isLoadingGeo, setIsLoadingGeo] = useState(false)
  const [emoji, setEmoji] = useState('')
  const [geoError, setGeoError] = useState('')
  const { createCity, isLoading } = useCities()

  const navigate = useNavigate();
  useEffect(function () {
    if (!lat && !lng) return
    async function fetchCityData() {
      try {
        setIsLoadingGeo(true)
        setGeoError('')
        const res = await fetch(`${Base_Url}?latitude=${lat}&longitude=${lng}`)
        const data = await res.json()

        if (!data.countryCode) throw new Error('click on existing city, there is nothing here')

        setCityName(data.city || data.locality || '')
        setCountry(data.countryName)
        setEmoji(convertToEmoji(data.countryCode))
      } catch (err) {
        setGeoError(err.message)
      } finally {
        setIsLoadingGeo(false)
      }
    }
    fetchCityData()

  }, [lat, lng])

  async function handleSubmit(e) {
    e.preventDefault()
    if (!cityName || !date) return

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng }
    }
    await createCity(newCity)

    navigate('/app/cities')
  }
  if (isLoadingGeo) return <Spinner />

  if (geoError) return <Message message={geoError} />

  if (!lat, !lng) return <Message message='Click on anywhere on the Map!' />
  return (
    <form className={`${styles.form}${isLoading ?styles.loading:""}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker id="date" onChange={date => setDate(date)} selected={date} dateFormat={'dd/MM/yyyy'} />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type='primary'>Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;

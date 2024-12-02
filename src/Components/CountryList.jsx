import PropTypes from 'prop-types'; // Import PropTypes
import styles from './CountryList.module.css';
import Spinner from './Spinner';
import Message from './Message';
import CountryItem from './CountryItem'

function CountryList({ cities, isLoading }) {
    if (isLoading) return <Spinner />;

    if (!cities.length) return <Message message='add your first city by clicking on the city on the map ' />

    const countries = cities.reduce((arr, city) => {
        if (!arr.map(el => el.country).includes(city.country))
            return [...arr, { country: city.country, emoji: city.emoji }]
        else return arr
    }
        , [])
    return (
        <ul className={styles.countryList}>
            {countries.map((country) => (
                <CountryItem country={country} key={cities.id} />
            ))}
        </ul>
    );
}

// Add PropTypes for validation
CountryList.propTypes = {
    cities: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
                .isRequired,
            name: PropTypes.string, // Define other city properties as needed
        })
    ).isRequired,
    isLoading: PropTypes.bool.isRequired, // Validate isLoading as a required boolean
};

export default CountryList;

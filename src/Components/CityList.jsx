import PropTypes from 'prop-types'; // Import PropTypes
import styles from './CityList.module.css';
import Spinner from './Spinner';
import CityItem from './CityItem';
import Message from './Message';

function CityList({ cities, isLoading }) {
    if (isLoading) return <Spinner />;

    if(!cities.length) return <Message message='add your first city by clicking on the city on the map ' />
    return (
        <ul className={styles.cityList}>
            {cities.map((city) => (
                <CityItem city={city} key={city.id} />
            ))}
        </ul>
    );
}

// Add PropTypes for validation
CityList.propTypes = {
    cities: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
                .isRequired,
            name: PropTypes.string, // Define other city properties as needed
        })
    ).isRequired,
    isLoading: PropTypes.bool.isRequired, // Validate isLoading as a required boolean
};

export default CityList;

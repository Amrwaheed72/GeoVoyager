import { useNavigate, useSearchParams } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet'
import styles from './Map.module.css'
import { useEffect, useState } from 'react';
import { useCities } from '../contexts/CitiesProvider';
import City from './City';
import { useGeoLocation } from '../hooks/useGeoLocation';
import Button from './Button';
import useURLPosition from '../hooks/useURLPosition';


function Map() {
    const { isLoading: isLoadingPosition, position: geoLocationPosition,
        getPosition } = useGeoLocation()
    const [position, setPostion] = useState([40, 0]);
    const navigate = useNavigate()
    const { cities } = useCities()
    const [lat,lng] = useURLPosition()

    useEffect(
        function () {
            if (lat && lng) setPostion([lat, lng])
        }, [lat, lng])

    useEffect(function () {
        if (geoLocationPosition) setPostion([geoLocationPosition.lat, geoLocationPosition.lng])
    }, [geoLocationPosition])
    return (
        <div className={styles.mapContainer} >
            {!geoLocationPosition && <Button type='position' onClick={getPosition}>{isLoadingPosition ? 'loading...' : 'use your position'}</Button>}
            <MapContainer className={styles.map}
                center={position} zoom={6} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {cities.map((city) => (
                    <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
                        <Popup>
                            <span>{city.cityName}</span>
                        </Popup>
                    </Marker>
                ))}
                <ChangeCenter position={position} />
                <DetectClick />
            </MapContainer>

        </div>
    )
}

function ChangeCenter({ position }) {
    const map = useMap()
    map.setView(position)
    return null
}

function DetectClick() {
    const navigate = useNavigate();

    useMapEvents({
        click: (e) => {
            const lat = e.latlng.lat;
            const lng = e.latlng.lng;
            // Construct the full path for navigation
            const newUrl = `form?lat=${lat}&lng=${lng}`;
            // console.log('Navigating to:', newUrl); // Check the URL in the console

            navigate(newUrl); // Navigate to the new URL with query parameters
        },
    });

    return null;
}




export default Map

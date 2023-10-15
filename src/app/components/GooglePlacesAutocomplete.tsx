// components/GooglePlacesAutocomplete.tsx
import { useEffect } from 'react';

const GooglePlacesAutocomplete = ({ onPlaceSelected }: { onPlaceSelected: (place: google.maps.places.PlaceResult) => void }) => {
  
  useEffect(() => {
    let autocomplete: google.maps.places.Autocomplete;

    const loadPlaces = () => {
      const input = document.getElementById('location-input') as HTMLInputElement;

      autocomplete = new google.maps.places.Autocomplete(input);
      autocomplete.addListener('place_changed', () => {
        if (autocomplete) {
          const place = autocomplete.getPlace();
          onPlaceSelected(place);
        }
      });
    };

    if (window.google) {
      loadPlaces();
    } else {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyD6btnHwCcT1XolxStGkv0mx2eDBo5TIMw&libraries=places`;
      document.body.appendChild(script);
      script.addEventListener('load', loadPlaces);
    }
  }, []);

  return <input id="location-input" placeholder="Въведете локация..." />;
};

export default GooglePlacesAutocomplete;

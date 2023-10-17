import { useEffect } from 'react';

interface GooglePlacesAutocompleteProps {
  onPlaceSelected: (place: google.maps.places.PlaceResult) => void;
  className?: string;
}

const GooglePlacesAutocomplete: React.FC<GooglePlacesAutocompleteProps> = ({ 
  onPlaceSelected,
  className = 'rounded-2xl border-2 h-10 px-2 w-full'
}) => {

  useEffect(() => {
    let autocomplete: google.maps.places.Autocomplete;
    const script = document.createElement('script');

    const loadPlaces = () => {
      const input = document.getElementById('location-input') as HTMLInputElement;

      const autocompleteOptions: google.maps.places.AutocompleteOptions = {
        types: ['(cities)'],
        componentRestrictions: { country: 'bg' },
        fields: ["address_components"],
      };

      autocomplete = new google.maps.places.Autocomplete(input, autocompleteOptions);

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        onPlaceSelected(place);
      });
    };

    if (window.google) {
      loadPlaces();
    } else {
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyD6btnHwCcT1XolxStGkv0mx2eDBo5TIMw&libraries=places&callback=Function.prototype`;
      document.body.appendChild(script);
      script.addEventListener('load', loadPlaces);
    }

    // Cleanup
    return () => {
      if (script.parentElement) {
        document.body.removeChild(script);
      }
      if (autocomplete) {
        // remove event listener (based on how Google API provides for it)
      }
    };
  }, []);

  return (<input id="location-input" placeholder="Въведете локация..." className={className} />);
};

export default GooglePlacesAutocomplete;

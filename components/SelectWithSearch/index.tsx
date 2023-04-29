import { useState, useMemo } from "react";
import { Autocomplete, TextField } from "@mui/material";

import { SELECT_LOCATION } from '../../constants/displayMessage';
import { locationDetails } from '../../constants/types';
import { truncateSpace } from '../../utils';

interface Props {
  showValue?: boolean;
  locations: locationDetails[];
  onLocationClick: (location: locationDetails) => void
}

const SelectWithSearch = ({ showValue, locations, onLocationClick } : Props) => {
  const [value, setValue] = useState<string | null>('');

  const selectOptions = useMemo(() => {
    return locations.map((location: locationDetails) => ({...location, label: location.name, value: truncateSpace(location.name)}));
  }, [locations]);

  const handleChange = (event: any) => {
    const textContent = event ? event.target.textContent : '';
    
    if (textContent) {
      const selectedLocation = locations.find((location: locationDetails) => (location.name) === textContent); 
      
      if (selectedLocation) {
        setValue(textContent);
        onLocationClick(selectedLocation);
      }
    }
  }
  
 return (
    <Autocomplete
      value={showValue ? value as any : ""}
      onInputChange={handleChange}
      disablePortal
      className="location-details"
      options={selectOptions}
      renderInput={(params) => <TextField {...params} label={SELECT_LOCATION} value={showValue ? value : ""} />}
    />
  )
}

export default SelectWithSearch;
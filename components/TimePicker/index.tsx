
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { WeatherFields } from '../../constants/displayFields';
import { DATE_TIME_TYPE } from '../../constants/types';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { TimePicker } from '@mui/x-date-pickers/TimePicker';

dayjs.extend(customParseFormat);

interface Props { 
  value: string;
  onChange: (value: string, fieldName: string) => void;
}

const TimePickerComponent = ({value, onChange } : Props) => {
  const handleChange = (time: any) => {
    const selectedTime = dayjs(time, DATE_TIME_TYPE.DATE_TIME_FORMAT).toDate().toLocaleTimeString();
    onChange(selectedTime, WeatherFields.TIME)
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        className="time-picker"
        label="select a time"
        value={dayjs(value, DATE_TIME_TYPE.TIME_FORMAT)}
        onChange={handleChange}
      />
    </LocalizationProvider>
  )
};

export default TimePickerComponent;

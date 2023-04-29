import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';

import { DATE_TIME_TYPE } from '@/constants/types';
import { WeatherFields } from '@/constants/displayFields';

interface Props {
  value: dayjs.Dayjs | null | string;
  onChange: (value: string, fieldName: string) => void;
}

export default function DatePickerComponent({ value, onChange }: Props) {
  const handleOnChange = (date: dayjs.Dayjs | null) => {
    onChange(dayjs(date).format(DATE_TIME_TYPE.DATE_FORMAT), WeatherFields.DATE)
  }
  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        className="date-picker" 
        label="select a date"
        value={dayjs(value, DATE_TIME_TYPE.DATE_FORMAT)}
        onChange={handleOnChange}
    />
    </LocalizationProvider>
  );
}

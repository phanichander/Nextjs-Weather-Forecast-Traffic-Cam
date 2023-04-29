import { useEffect, useState } from "react";
import dayjs from "dayjs";
import Head from "next/head";
import Image from 'next/image'

import DatePickerComponent from "@/components/DatePicker";
import SelectWithSearch from "@/components/SelectWithSearch";
import TimePickerComponent from "@/components/TimePicker";
import Card from "@/components/Card";
import { WEATHER_FORECASE_API } from "@/constants";
import { DATE_TIME_TYPE, cameraDetails as cameraDetailsType, locationDetails  } from "@/constants/types";
import { getClosestGeoLocations, getLocationList } from "@/utils";
import { WeatherBanner } from "@/components/WeatherBanner";

 const WeatherPage = () => {
  const [dateTimeState, setDateTimeState] = useState({
    date: dayjs(new Date('2021-03-20')).format(DATE_TIME_TYPE.DATE_FORMAT),
    time: dayjs("09:10:00", DATE_TIME_TYPE.TIME_FORMAT).format(DATE_TIME_TYPE.TIME_FORMAT),
  });
  const [trafficState, setTrafficState] = useState({
    cameras: [],
    geoLocations: []
  });
  const [weatherState, setWeatherState] = useState({
    locations: [],
    trafficImageDetails: {
      image: "",
      camera_id: "",
      image_metadata: {width: '',
      height: ''}
    },
    selectedLocationDetails: {
      name: "",
      area: "",
      forecast: "",
      location: { latitude: 0, longitude: 0 }
    }
  });

  useEffect(() => {
    if (dateTimeState.date && dateTimeState.time) {
      callTrafficAPI();
      if (!Boolean(weatherState.locations.length)) {
        callWeatherAPI();
      }
    }
  }, [dateTimeState.date, dateTimeState.time])

  const callTrafficAPI = async () => {
    const TRAFFIC_IMAGES_API = `https://api.data.gov.sg/v1/transport/traffic-images?date_time=${dayjs(`${dateTimeState.date} ${dateTimeState.time}`).format(DATE_TIME_TYPE.DATE_TIME_FORMAT)}`
    const response: any  = await (await fetch(TRAFFIC_IMAGES_API)).json();

    const cameraDetails = response.items[0].cameras;
    let geoLocationsList: any = []; 

    cameraDetails.map((camera: any) => {
      geoLocationsList.push(camera.location)
    });

    setTrafficState({
      cameras: cameraDetails,
      geoLocations: geoLocationsList
    });
  }

  const callWeatherAPI = async () => {
    const WEATHER_API = `https://api.data.gov.sg/v1/environment/2-hour-weather-forecast?date_time=${dayjs(`${dateTimeState.date} ${dateTimeState.time}`).format(DATE_TIME_TYPE.DATE_TIME_FORMAT)}`;
    const response: any  = await (await fetch(WEATHER_API)).json();
    const locationList: any = await getLocationList(response);
     
    if (Boolean(locationList.length)) {
      setWeatherState({
        ...weatherState, 
        locations: locationList 
      });
    }
  }
  
  const getWeather = async () => {
    const response = await fetch("https://api.data.gov.sg/v1/transport/traffic-images?date_time=2021-03-20T09:10:00");
    console.log( await response.json());
  }
  
  const handleDateTimeChange = (value: string, fieldName: string) => {
    setDateTimeState({
      ...dateTimeState,
      [fieldName] : value
    });

    setTrafficState({
      cameras: [],
      geoLocations: []
    });

    setWeatherState({
      ...weatherState,
      trafficImageDetails: {
        image: "",
        camera_id: "",
        image_metadata: { width: '',
        height: '' }
      },
      selectedLocationDetails: {
        name: "",
        area: "",
        forecast: "",
        location: { latitude: 0, longitude: 0 }
      }
    });
  }

  const handleLocationClick = (selectedLocation: locationDetails) => {
    const { geoLocations, cameras } = trafficState;
    const nearestLocation = getClosestGeoLocations(geoLocations, selectedLocation.location);
    const imageDetails: cameraDetailsType | undefined = cameras.find((item: cameraDetailsType) => item.location.latitude === nearestLocation.latitude && item.location.longitude === nearestLocation.longitude);

    setWeatherState((prevState: any) => {
      return {
        ...prevState,
        selectedLocationDetails: selectedLocation,
        trafficImageDetails: imageDetails
      }
    })
  }

  const { date, time } = dateTimeState;
  const { locations, selectedLocationDetails, trafficImageDetails } = weatherState;
  const { name } = selectedLocationDetails;
 
  return (
    <>
      <Head>
        <title>Weather Forecast & Traffic CamWebsite</title>
        <meta name="climate" content="Weather & Traffic Information" />
      </Head>

      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Card title="Weather & Traffic Information">
          <article className="flex my-6 gap-2">
            <DatePickerComponent value={date} onChange={handleDateTimeChange} />
            <TimePickerComponent value={time} onChange={handleDateTimeChange} />
          </article>

          {Boolean(locations.length) &&
            <article className='mt-6'> 
              <SelectWithSearch showValue={Boolean(name)} locations={locations} onLocationClick={handleLocationClick} />   
            </article>
          }

          {Boolean(name) &&
            <article className='my-6'>
              <WeatherBanner locationDetails={selectedLocationDetails} />  
            </article>
          }
          
          {Boolean(trafficImageDetails.image) &&
            <Image
              src={trafficImageDetails.image}
              alt={trafficImageDetails.camera_id}
              width={Number(trafficImageDetails.image_metadata.width)}
              height={Number(trafficImageDetails.image_metadata.height)}
              priority
            />
          }
        </Card>
      </main>
    </>
  );
 }

 export default WeatherPage;
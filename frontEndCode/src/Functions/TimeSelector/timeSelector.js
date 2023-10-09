import React, { useState, useEffect } from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './timeSelector.css';
import { getDateFunction } from '../reuseFunctions/reuse';

import {
  timeRangeHeading,
  last24Hours,
  last7days,
  startDatePlaceHolder,
  endDatePlaceHolder,
  timeRange,
} from '../../Constants/constants.js';

const TimeRangeSelector = (props) => {
  // State variables to manage selected time range and date/time inputs
  const [selectedOption, setSelectedOption] = useState('past24');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTimeApi, setStartTimeApi] = useState();
  const [endTimeApi, setEndTimeApi] = useState();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState('Select the Date Range');

  // Function to handle changes in the selected time range
  const handleOptionChange = (value) => {
    setSelectedOption(value);
    setErrorMessage('Select the Date Range');
    if (value === 'custom') {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
    setSelectedOption(value);

    // Calculate start and end dates based on the selected time range
    var formattedEndDate;
    var formattedStartDate;
    let date = new Date();
    if (value === 'past7') {
   
      let dateObj=getDateFunction(date)
      const day = String(date.getDate()-1).padStart(2, '0');
     
      
      // Format the date as an ISO string in the format 'yyyy-mm-ddThh:mm:ss'
       formattedEndDate = `${dateObj.year}-${dateObj.month}-${day}T23:59:59`;
          console.log("formattedDate",formattedEndDate)
          date.setDate(date.getDate() - 8);
          const previousDay = String(date.getDate()).padStart(2, '0');
       
           formattedStartDate = `${dateObj.year}-${dateObj.month}-${previousDay}T00:00:01`;
    } else {
      // Calculate date range for the last 24 hours
    
      let dateObj=getDateFunction(date)
  
       formattedEndDate = `${dateObj.year}-${dateObj.month}-${dateObj.day}T${dateObj.hours}:${dateObj.minutes}:${dateObj.seconds}`;
          console.log("formattedDate",formattedEndDate)
          date.setDate(date.getDate() - 1);
          const previousDay = String(date.getDate()).padStart(2, '0');
    
          let previousDate = new Date(date.setTime(date.getTime() - 24 * 60 * 60 * 1000));
          formattedStartDate = `${dateObj.year}-${dateObj.month}-${previousDay}T${dateObj.hours}:${dateObj.minutes}:${dateObj.seconds}`;
    }

    setStartTimeApi(formattedStartDate);
    setEndTimeApi(formattedEndDate);
    setStartDate(null);
    setEndDate(null);
  };

  // Function to handle changes in the start date
  const handleStartDateChange = (date) => {
    setStartDate(date);
    let dateObj=getDateFunction(date)
    
    
    // Format the date as an ISO string in the format 'yyyy-mm-ddThh:mm:ss'
      let formattedStartDate = `${dateObj.year}-${dateObj.month}-${dateObj.day}T${dateObj.hours}:${dateObj.minutes}:00`;
    setStartTimeApi(formattedStartDate);
    validateDates(date, endDate);
  };

  // Function to handle changes in the end date
  const handleEndDateChange = (date) => {
    setEndDate(date);
    let dateObj=getDateFunction(date)
    

     let formattedEndDate = `${dateObj.year}-${dateObj.month}-${dateObj.day}T${dateObj.hours}:${dateObj.minutes}:00`;
    setEndTimeApi(formattedEndDate);
    validateDates(startDate, date);
  };

  // Function to validate the selected date range
  const validateDates = (start, end) => {
    if (start && end && start <= end) {
      setIsButtonDisabled(false);
      setErrorMessage('Select the Date Range');
    } else {
      setIsButtonDisabled(true);
      setErrorMessage('End date must be greater than start date');
    }
  };

  // Function to handle the submit button click
  const handleClickSubmit = async () => {
    props.dataFunction(startTimeApi, endTimeApi);
  };

  return (
    <div>
      <h2 className='timeHeader'>{timeRangeHeading}</h2>
      <div>
        <select value={selectedOption} onChange={(e) => handleOptionChange(e.target.value)}>
          <option value="past24">{last24Hours}</option>
          <option value="past7">{last7days}</option>
          <option value="custom">{timeRange}</option>
        </select>
      </div>
      {selectedOption === 'custom' && (
        <div className="date-picker-container">
          <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            showTimeSelect
            timeFormat="HH:mm"
            dateFormat="yyyy-MM-dd HH:mm"
            placeholderText={startDatePlaceHolder}
          />
          <DatePicker
            selected={endDate}
            onChange={handleEndDateChange}
            showTimeSelect
            timeFormat="HH:mm"
            dateFormat="yyyy-MM-dd HH:mm"
            placeholderText={endDatePlaceHolder}
          />
        </div>
      )}
      <button className={isButtonDisabled ? "buttonClr" : ""} onClick={handleClickSubmit} disabled={isButtonDisabled} title={errorMessage}>
        Submit
      </button>
    </div>
  );
};

export default TimeRangeSelector;

import React, { useState } from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TimeRangeSelector = () => {
  const [selectedOption, setSelectedOption] = useState('past7');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    setStartDate(null);
    setEndDate(null);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  return (
    <div>
      <h2>Select a Time Range</h2>
      <div>
        <select value={selectedOption} onChange={handleOptionChange}>
          <option value="past24">Past 24 hours</option>
          <option value="past7">Past 7 days</option>
          <option value="custom">Custom time range</option>
        </select>
      </div>
      {selectedOption === 'custom' && (
        <div>
          <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            showTimeSelect
            timeFormat="HH:mm"
            dateFormat="yyyy-MM-dd HH:mm"
            placeholderText="Start Date & Time"
          />
          <DatePicker
            selected={endDate}
            onChange={handleEndDateChange}
            showTimeSelect
            timeFormat="HH:mm"
            dateFormat="yyyy-MM-dd HH:mm"
            placeholderText="End Date & Time"
          />
        </div>
      )}
      <button onClick={() => console.log(startDate, endDate)}>Submit</button>
    </div>
  );
};

export default TimeRangeSelector;

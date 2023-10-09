import React, { useState, useEffect } from 'react';
import './DashboardPage.css'
import { dashboardHeader, graphTitle, dataTitle } from '../../Constants/constants';
import TimeSelector from '../../Functions/TimeSelector/timeSelector';
import Graph from '../../Functions/Graph/graph';
import Metrics from '../../Functions/Metrics/metrics';
import Table from '../../Functions/Table/table';
import { getApiData,getMetrics } from '../../Apis/Api';
import { getDateFunction } from '../../Functions/reuseFunctions/reuse';
function DashboardPage() {
  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    // Get the current date and format it for API request
    let date = new Date();
    console.log("dateCheck",date)
    let dateObj=getDateFunction(date)

// Format the date as an ISO string in the format 'yyyy-mm-ddThh:mm:ss'
const formattedEndDate = `${dateObj.year}-${dateObj.month}-${dateObj.day}T${dateObj.hours}:${dateObj.minutes}:${dateObj.seconds}`;
    console.log("formattedDate",formattedEndDate)
    date.setDate(date.getDate() - 1);
    const previousDay = String(date.getDate()).padStart(2, '0');
    // Calculate the previous date and format it for API request
    let previousDate = new Date(date.setTime(date.getTime() - 24 * 60 * 60 * 1000));
    let formattedStartDate = `${dateObj.year}-${dateObj.month}-${previousDay}T${dateObj.hours}:${dateObj.minutes}:${dateObj.seconds}`;
    console.log("formattedDate1",formattedStartDate)
    // Call the Data function to fetch data with the initial date range
    Data(formattedStartDate, formattedEndDate);
  }, []);

  // Function to fetch data from APIs based on start and end date
  const Data = async (startDate, endDate) => {
    console.log(startDate);

    try {
      // Fetch data from the getApiData API and log the result
      const result = await getApiData(startDate, endDate);
      console.log("parentData", result);
      setData(result); // Update the state with fetched data
    } catch (error) {
      console.error('Error:', error.message);
      window.alert('API request failed due to Network error');
      return;
    }

    try {
      // Fetch count data from the getMetrics API and log the result
      const count = await getMetrics(startDate, endDate);
      let obj = {};
      obj["user"] = count.uniqueUsers;
      obj["calls"] = count.totalCount;
      obj["failures"] = count.failureCount;
      console.log("parentData", count);
      setMetricsData(obj); // Update the state with fetched count data
    } catch (error) {
      console.error('Error:', error.message);
      window.alert('API request failed due to Network error');
      return;
    }
  }

  // State to store fetched data
  const [data, setData] = useState([]);

  // State to store metrics data
  const [metricsData, setMetricsData] = useState({
    user: 0,
    calls: 0,
    failures: 0
  });

  return (
    <div>
      {/* Header */}
      <div className='header'>{dashboardHeader}</div>

      {/* TimeSelector component for selecting date range */}
      <TimeSelector dataFunction={Data} />

      {/* Metrics component to display metrics data */}
      <Metrics metrics={metricsData} />

      <div class="container text-center">
        <div class="row">
          {/* Left column for displaying graphs */}
          <div class="col col-lg-6  col-xl-6 col-md-12 col-xs-12 col-sm-12 ">
            <div className='analyticsTitle'>
              {graphTitle}
            </div>
            <div className='dataTitle'>
              {/* Graph component to display data */}
              <Graph data={data} />
            </div>
          </div>

          {/* Right column for displaying a table */}
          <div class="col col-lg-6  col-xl-6 col-md-12 col-xs-12 col-sm-12 ">
            <div className='analyticsTitle'>
              {dataTitle}
            </div>
            <div className='dataTitle'>
              {/* Table component to display data */}
              <Table data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;

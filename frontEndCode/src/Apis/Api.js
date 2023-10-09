import axios from 'axios';

// Function to send data to the server
export const createLog = async (param) => {
  try {
    const response = await axios.post('http://localhost:8080/logs/create-log', param, {
      headers: {
        'Content-Type': 'application/json', // Set the Content-Type header to JSON
      },
    });
    return response.data;
  } catch (error) {
    throw error; // Handle any errors that occur during the request
  }
};

// Function to fetch data from the server based on a time range
export const getApiData = async (startTime, endTime) => {
  const apiUrl = `http://localhost:8080/logs/all-logs?startTime=${startTime}&endTime=${endTime}`;

  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    throw error; // Handle any errors that occur during the request
  }
};

// Function to fetch count data from the server based on a time range
export const getMetrics = async (startTime, endTime) => {
  const apiUrl = `http://localhost:8080/logs/stats?startTime=${startTime}&endTime=${endTime}`;

  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    throw error; // Handle any errors that occur during the request
  }
};

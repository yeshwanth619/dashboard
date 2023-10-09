import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { noDataAvailable } from '../../Constants/constants';
import './graph.css';

const Graph = ({ data }) => {
  // Create a map to store aggregated data by timestamp
  const timestampDataMap = new Map();

  // Process the data to calculate total calls, failures, and distinct users for each timestamp
  data.forEach((entry) => {
    const timestamp = new Date(entry.timestamp).toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    if (!timestampDataMap.has(timestamp)) {
      // Initialize data for a new timestamp
      timestampDataMap.set(timestamp, {
        timestamp,
        Users: new Set(), // Initialize a Set to store unique user IDs
        Calls: 0,
        Failures: 0,
      });
    }

    // Update data for the current timestamp
    const timestampData = timestampDataMap.get(timestamp);
    timestampData.Users.add(entry.userId); // Add unique user ID to the Set
    timestampData.Calls += 1;
    if (entry.status === 'failure') {
      timestampData.Failures += 1;
    }
  });

  // Convert the map values back to an array and calculate the number of distinct users
  const groupedData = Array.from(timestampDataMap.values()).map((timestampData) => ({
    ...timestampData,
    Users: timestampData.Users.size, // Count of distinct users
  }));

  return (
    <div className="call-graph">
      {groupedData.length > 0 ? (
        // Render the line chart if there is data available
        <ResponsiveContainer width="90%" height={400}>
          <LineChart
            data={groupedData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Users" name="Distinct Users" stroke="blue" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="Calls" name="Calls" stroke="green" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="Failures" name="Failures" stroke="red" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        // Display a message when there is no data available
        <div className="no-data-message-container">
          <div className="no-data-message">{noDataAvailable}</div>
        </div>
      )}
    </div>
  );
};

export default Graph;

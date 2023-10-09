import React, { useState, useEffect } from 'react';
import './user.css'
import { userHeader } from '../../Constants/constants';
import { createLog } from '../../Apis/Api';
function User() {
    const [userId, setUserId] = useState('');
    const handleInputChange = (e) => {
        setUserId(e.target.value);
      };
    
      const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            // Fetch data from the getApiData API and log the result
            const result = await createLog(userId);
            window.alert('Log has been created');
          } catch (error) {
            console.error('Error:', error.message);
            window.alert('API request failed due to Network error');
            return;
          }
      
      };

   return(
    <div>
      <div className='header'>{userHeader}</div>
      <h2 className='timeHeader'>User ID Input Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
    
          <input
            type="text"
            value={userId}
            onChange={handleInputChange}
            placeholder="Enter User ID"
          />
        </label>
        <button type="submit" className={!userId?"submitButton":''} disabled={!userId}>
          Submit
        </button>
      </form>
    </div>
   )

}

export default User
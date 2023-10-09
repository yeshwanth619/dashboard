import React from 'react';

import { dashboardHeader, totalCalls, totalFailures, totalUsers } from '../../Constants/constants';
import './metrics.css';

function Metrics(props) {
  return (
    <div class="container text-center">
      <div class="row">
        {/* Column to display the total number of users */}
        <div class="col col-lg-4  col-xl-4 col-md-4 col-xs-12 col-sm-12 ">
          <div className='metrics users'>
            {totalUsers}: {props.metrics.user}
          </div>
        </div>
        {/* Column to display the total number of calls */}
        <div class="col-lg-4  col-xl-4 col-md-4 col-xs-12 col-sm-12">
          <div className='metrics calls'>
            {totalCalls}: {props.metrics.calls}
          </div>
        </div>
        {/* Column to display the total number of failures */}
        <div class="col col-lg-4  col-xl-4 col-md-4 col-xs-12 col-sm-12 ">
          <div className='metrics failure'>
            {totalFailures}: {props.metrics.failures}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Metrics;

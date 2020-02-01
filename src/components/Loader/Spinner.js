import React from 'react';

import './Spinner.css';

const spinner = () => (
    <div className="spinner-loader">
        <svg className="spinner-circular" viewBox="25 25 50 50">
            <circle className="spinner-path" cx="50" cy="50" r="20" fill="none" strokeWidth="4"
              strokeMiterlimit="10" />
        </svg>
    </div>
);

export default spinner;

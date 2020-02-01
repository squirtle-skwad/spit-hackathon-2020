import React from 'react';

import Spinner from './Spinner';

const spinner = () => (
    <div style={{ height: '90vh' }}>
        <div className="d-flex justify-content-center align-items-center h-100">
            <Spinner />
        </div>
    </div>
);

export default spinner;

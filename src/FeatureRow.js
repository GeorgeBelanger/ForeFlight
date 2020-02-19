import React from 'react';
import './App.css';

const FeatureRow = ({featureProperties, showDetailForThisFeature}) => {

    return (
        <tr>
            <td aria-label='Station Id' onClick={() => showDetailForThisFeature(featureProperties.rawOb)} className='featureRowTd blue'>{featureProperties.id}</td>
            <td aria-label='Flight Category' className='featureRowTd'>{featureProperties.fltcat}</td>
            <td aria-label='Observation Timestamp' className='featureRowTd'>{featureProperties.obsTime}</td>
        </tr>
    );
};



export default FeatureRow;

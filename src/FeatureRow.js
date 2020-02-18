import React from 'react';
import './App.css';

const FeatureRow = ({featureProperties, showDetailForThisFeature}) => {

    return (
        <tr>
            <td onClick={() => showDetailForThisFeature(featureProperties.rawOb)} className='featureRowTd blue'>{featureProperties.id}</td>
            <td className='featureRowTd'>{featureProperties.fltcat}</td>
            <td className='featureRowTd'>{featureProperties.obsTime}</td>
        </tr>
    );
};



export default FeatureRow;

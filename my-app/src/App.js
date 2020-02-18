import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import FeatureRow from './FeatureRow'

const App = () => {
    const [allFeatureProperties, setAllFeatureProperties] = useState([]);
    const [filteredFeatureProperties, setFilteredFeatureProperties] = useState([]);
    const [currentFeature, setCurrentFeature] = useState();
    const [filterValue, setFilterValue] = useState('');
    const [sortCriteria, setSortCriteria] = useState({'key':'obsTime', 'order':'Desc'});
    

    useEffect(() => {
        console.log('App connected');
        getAllFeatureProperties();
        filterFeatures(filterValue)
    }, [sortCriteria]);
    
    useEffect(() => {
        setInterval(() => getAllFeatureProperties(), 300000)
    });
    
    const getAllFeatureProperties = async () => {
        const response = await axios({ method: 'GET', url: 'https://cors-anywhere.herokuapp.com/https://www.aviationweather.gov/cgi-bin/json/MetarJSON.php' })
        const features = response.data.features
        const featureProperties = features.map(feature => feature.properties)
        const sortedFeatureProperties = sortFeatures(featureProperties)
        console.log(sortedFeatureProperties)
        setAllFeatureProperties(sortedFeatureProperties)
    }

    
    const sortFeatures = (features) => {
        var sortedFeatures
        if (sortCriteria.key === 'obsTime'){
            if (sortCriteria.order === 'Desc'){
                sortedFeatures = features.sort(function(a, b) {
                      return new Date(b.obsTime) - new Date(a.obsTime);
                });
            } else {
                sortedFeatures = features.sort(function(a, b) {
                      return new Date(a.obsTime) - new Date(b.obsTime);
                });
            }
        } else {
            if (sortCriteria.order === 'Desc'){
                sortedFeatures = features.sort(function(a, b) {
                      return ('' + b[sortCriteria.key]).localeCompare(a[sortCriteria.key]);
                });
            } else {
                sortedFeatures = features.sort(function(a, b) {
                      return ('' + a[sortCriteria.key]).localeCompare(b[sortCriteria.key]);
                });
            }
        } 
        return sortedFeatures
    }

    const filterFeatures = (searchValue) => {
        setFilterValue(searchValue)
        var filteredFeatureProperties = allFeatureProperties.filter(featureProperty => featureProperty.id.toLowerCase().indexOf(searchValue.toLowerCase()) > -1);
        const sortedFilteredFeatureProperties = sortFeatures(filteredFeatureProperties)
        setFilteredFeatureProperties(sortedFilteredFeatureProperties)
    }
    
    const sortColumns = (criteria) => {
        var order = sortCriteria.order
        if (sortCriteria.key === criteria){
            order === 'Asc' ? order = 'Desc' : order = 'Asc'
        }
        setSortCriteria({'key': criteria, 'order': order})
    }

    const showDetailForThisFeature = (featureRawOb) => {
        const selectedFeature = allFeatureProperties.filter(featureProperty => featureProperty.rawOb === featureRawOb)[0]
        console.log(selectedFeature)
        setCurrentFeature(selectedFeature)
    }

    return (
        <div className='mainContainer'>
            <section className='sectionContainers'>
                <input onChange={(event) => filterFeatures(event.target.value)} placeholder='search'/>
                <table>
                    <thead>
                        <tr>
                            <th className='blue' onClick={() => sortColumns('id')}>Station Id</th>
                            <th className='blue' onClick={() => sortColumns('fltcat')}>Flight Category</th>
                            <th className='blue' onClick={() => sortColumns('obsTime')}>Observation Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        { filterValue ? 
                        filteredFeatureProperties.map((featureProperty, key) =>
                            <FeatureRow featureProperties={featureProperty} showDetailForThisFeature={showDetailForThisFeature} key={key} />
                        ) : allFeatureProperties.map((featureProperty, key) =>
                            <FeatureRow featureProperties={featureProperty} showDetailForThisFeature={showDetailForThisFeature} key={key} />
                        ) }
                    </tbody>
                </table>
            </section>
            <section className='sectionContainers'>
                {currentFeature ? 
                    JSON.stringify(currentFeature, null, 4)
                : 'Click a station id to see details!'
                }
            </section>
        </div>
    );
};



export default App;

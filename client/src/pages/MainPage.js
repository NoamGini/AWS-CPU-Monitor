import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import './MainPage.css';
import LineGraph from '../components/LineGraph.js';


export default function MainPage() {
    const [period, setPeriod] = useState("");
    const [ipAddress, setIpAddress] = useState("");
    const [selectedTimePeriod, setselectedTimePeriod] = useState("");
    const [data, setData] = useState(null);
    const [error, setError] = useState("");


    const handleSubmit = async () => {
        if (!ipAddress || !selectedTimePeriod || !period){
            setData(null);
            setError('please fill all the fields');
            return
        }
        try{
            setError('');
            axios.get('http://localhost:5000/metrics', {
                params:{
                    timePeriod: selectedTimePeriod,
                    interval: period,
                    instanceIp: ipAddress,
                }
            }).then(response => {
                const data = response.data;
                setData(data);
            })
            
            
        }
        catch(err){
            setError('Error fetching metrics.');
        }
    };


  return (
    <div>
    <div className="form-container">
        <h1>Aws Instance CPU usage</h1>
        <label>
        Time Period: 
        <select id="Time Period" className="field" value={selectedTimePeriod} onChange={(e) => setselectedTimePeriod(e.target.value)}>
            <option value="">-- Choose a period --</option>
            <option value="Last Day">Last Day</option>
            <option value="Last Week">Last Week</option>
            <option value="Last Month">Last Month</option>
        </select>
        </label>
        <label>
        Period: 
            <input id="Time Period" className="field" value={period} onChange={(e)=> setPeriod(e.target.value)} type='text'/>
        </label>
        <label>
        IP Address: 
        <input id="IP Address" className="field" value={ipAddress} onChange={(e)=> setIpAddress(e.target.value)} type='text'/>
        <button type="submit" className="load-button" onClick={handleSubmit}>
        Load
      </button>
      </label>   
   
    </div>
    <div>
    {error && <p>{error}</p>}
    { data && (
        <div className='chart-container'>
         {<LineGraph data={data} selectedTimePeriod={selectedTimePeriod}/>}
        </div>
    )}
    </div>
   </div>
  );
};


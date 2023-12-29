import { Grid, Box, Card, CardContent } from '@mui/material';
import LineChart from '../components/LineChart';
import DoughnutChart from '../components/DoughnutChart';
import ChemicalComponent from '../components/ChemicalComponent';
import DarkModeRadarChart from '../components/DarkModeRadarChart';
import StateControl from '../components/StateControl';
import { Container, Row, Col } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';




const MainPage = ({ username }) => {

  const [chemicalComposition, setChemicalComposition] = useState({});
  const [phaseEnvelope, setPhaseEnvelope] = useState({
    // Other state variables...
    data: {}, // Initializing phaseEnvelope as an empty object
  });

  // Event listener to log changes in chemicalComposition state
  useEffect(() => {
    console.log('Chemical Composition Updated:', chemicalComposition);
  }, [chemicalComposition]);

  useEffect(() => {
    handleSendComposition(); // Call this function whenever chemicalComposition changes
  }, [chemicalComposition]);

  const handleChemicalComposition = (chemicalName, molarAmount) => {
    // If the chemical exists, adjust the molar amount
    if (chemicalComposition[chemicalName]) {
      const updatedComposition = {
        ...chemicalComposition,
        [chemicalName]: chemicalComposition[chemicalName] + molarAmount,
      };
      setChemicalComposition(updatedComposition);
    } else {
      // If the chemical doesn't exist, add it with the molar amount
      const updatedComposition = {
        ...chemicalComposition,
        [chemicalName]: molarAmount,
      };
      setChemicalComposition(updatedComposition);
    }
  };

  // Assume `composition` is the object containing the chemical composition data

  const handleSendComposition = () => {
    const endpointURL = 'http://localhost:5000/api/sendComposition';
    const requestBody = {
      composition: chemicalComposition,
    };
  
    fetch(endpointURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Log the response from the backend
        console.log('Response from backend:', data);
  
        // Check if the 'result' field exists in the response and log it
        if (data && data.result) {
          console.log('Result from backend:', data.result);
  
          // Set the 'phaseEnvelope' state variable to the 'result' data
          setPhaseEnvelope({ ...phaseEnvelope, data: data.result });
        } else {
          console.log('No result found in the response');
        }
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
        setPhaseEnvelope({ data: {} });
      });
  };
  
  



  return (
    <div style={{ backgroundColor: 'black', height: '100vh', color: 'white' }}>
      <Grid container height="98%">
        {/* Left Section */}
        <Grid item xs={5.5}>
          {/* Top Section */}
          <Grid container height="40%"  >
            {/* DoughnutChart */}
            <Grid item xs={5.5} p={2} style={{ paddingTop: '6%', paddingLeft: '6%' }}>
              {/* DoughnutChart Content */}
              <DoughnutChart data={chemicalComposition}/>
            </Grid>
            {/* ChemicalComponent */}
            <Grid item xs={6.5} p={2} style={{ marginTop: '6%' }}>
              {/* ChemicalComponent Content */}
              <ChemicalComponent onAddToComposition={handleChemicalComposition} setChemicalComposition={setChemicalComposition}/>
            </Grid>
          </Grid>
          {/* Bottom Section */}
          <Grid item container height="59%">
            {/* Bottom Box Content */}
            <Grid item xs={12} style={{ paddingBottom: '6%' }}>
              <DarkModeRadarChart chemicalComposition={chemicalComposition}/>
            </Grid>
          </Grid>
        </Grid>

        {/* Right Section */}
        <Grid item xs={6.5}>
        <Grid container p={2} height="50%"  >
          <LineChart phaseEnvelope={phaseEnvelope} chemicalComposition ={chemicalComposition}/>

        </Grid>
        <Grid item container height="50%" p={1} >
          <StateControl/>

        </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default MainPage;


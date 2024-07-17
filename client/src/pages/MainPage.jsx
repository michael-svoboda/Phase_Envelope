import { Grid, Box, Card, CardContent } from '@mui/material';
import LineChart from '../components/LineChart';
import DoughnutChart from '../components/DoughnutChart';
import ChemicalComponent from '../components/ChemicalComponent';
import DarkModeRadarChart from '../components/DarkModeRadarChart';
import StateControl from '../components/StateControl';
import { Container, Row, Col } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';

// Import the mock functions
import { mockSendComposition, mockSendFractions } from '../util/mockapi';

const MainPage = ({ username }) => {

  const [chemicalComposition, setChemicalComposition] = useState({});
  const [selectedPT, setSelectedPT] = useState({});
  const [phaseEnvelope, setPhaseEnvelope] = useState({
    data: {}, // Initializing phaseEnvelope as an empty object
  });
  const [phaseFractions, setPhaseFractions] = useState({
    data: {}, // Initializing phaseEnvelope as an empty object
  });
  const [stateDictionary, setStateDictionary] = useState({});
  
  // Event listener to log changes in chemicalComposition state
  useEffect(() => {
    console.log('Chemical Composition Updated:', chemicalComposition);
  }, [chemicalComposition]);

  // UseEffect to call handlePhaseFractions whenever chemicalComposition changes
  useEffect(() => {
    handlePhaseFractions();
  }, [selectedPT]);

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

  const handleSendComposition = () => {
    /* 
    // Old API call
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
        console.log('Response from backend:', data);
        if (data && data.result) {
          console.log('Result from backend:', data.result);
          setPhaseEnvelope({ ...phaseEnvelope, data: data.result });
        } else {
          console.log('No result found in the response');
        }
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
        setPhaseEnvelope({ data: {} });
      });
    */

    // Use mock function
    mockSendComposition({ composition: chemicalComposition })
      .then((data) => {
        console.log('Response from mock:', data);
        if (data && data.result) {
          setPhaseEnvelope({ ...phaseEnvelope, data: data.result });
        } else {
          console.log('No result found in the mock response');
        }
      })
      .catch((error) => {
        console.error('There was a problem with the mock operation:', error);
        setPhaseEnvelope({ data: {} });
      });
  };

  const handlePhaseFractions = () => {
    /* 
    // Old API call
    const endpointURL = 'http://localhost:5000/api/sendFractions';
    const requestBody = {
      composition: chemicalComposition,
      selectedPT: selectedPT,
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
        console.log('Response from backend:', data);
        if (data && data.result) {
          setPhaseFractions({ ...phaseFractions, data: data.result });
        } else {
          console.log('No result found in the response');
        }
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
        setPhaseFractions({ data: {} });
      });
    */

    // Use mock function
    mockSendFractions({ composition: chemicalComposition, selectedPT: selectedPT })
      .then((data) => {
        console.log('Response from mock:', data);
        if (data && data.result) {
          setPhaseFractions({ ...phaseFractions, data: data.result });
        } else {
          console.log('No result found in the mock response');
        }
      })
      .catch((error) => {
        console.error('There was a problem with the mock operation:', error);
        setPhaseFractions({ data: {} });
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
              <ChemicalComponent setPhaseFractions={setPhaseFractions} onAddToComposition={handleChemicalComposition} setChemicalComposition={setChemicalComposition}/>
            </Grid>
          </Grid>
          {/* Bottom Section */}
          <Grid item container height="59%">
            {/* Bottom Box Content */}
            <Grid item xs={12} style={{ paddingBottom: '6%' }}>
              <DarkModeRadarChart chemicalComposition={chemicalComposition} phaseFractions={phaseFractions} />
            </Grid>
          </Grid>
        </Grid>

        {/* Right Section */}
        <Grid item xs={6.5}>
        <Grid container p={2} height="50%"  >
          <LineChart stateDictionary={stateDictionary} phaseEnvelope={phaseEnvelope} chemicalComposition={chemicalComposition}/>
        </Grid>
        <Grid item container height="50%" p={1} >
          <StateControl setSelectedPT={setSelectedPT} stateDictionary={stateDictionary} setStateDictionary={setStateDictionary}/>
        </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default MainPage;

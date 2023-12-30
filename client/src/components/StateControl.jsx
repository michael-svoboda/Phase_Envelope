import React, { useState } from 'react';
import { Card, CardContent, Grid, TextField, Button, IconButton } from '@mui/material';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import { ReactSortable } from 'react-sortablejs';

const StateControl = ({ setSelectedPT, stateDictionary, setStateDictionary }) => {
  const [stateName, setStateName] = useState('');
  const [temperature, setTemperature] = useState('');
  const [pressure, setPressure] = useState('');
  const [buttons, setButtons] = useState([]);
  const [selectedButton, setSelectedButton] = useState(null); // State to store the selected button ID
  

  const handleAddButton = () => {
    const newButtonName = `${stateName} | P: ${pressure} (kPa) T: ${temperature} (C)`;
    const newState = { id: buttons.length + 1, name: newButtonName, temperature, pressure };
    setButtons([...buttons, newState]);
    setStateDictionary({ ...stateDictionary, [newState.id]: { temperature, pressure } });
    // Clear input fields after adding the button
    setStateName('');
    setTemperature('');
    setPressure('');
  };

  const handleRemoveButton = () => {
    const updatedDictionary = { ...stateDictionary };
    delete updatedDictionary[selectedButton];
    setStateDictionary(updatedDictionary);
    setButtons(buttons.filter((button) => button.id !== selectedButton));
    setSelectedButton(null);
  };

  const handleButtonClick = (buttonId) => {
    setSelectedButton(buttonId === selectedButton ? null : buttonId);
    setSelectedPT(stateDictionary[buttonId]); // Notify MainPage about the change
    console.log(stateDictionary[buttonId])
  };

  const buttonStyle = {
    border: '1.5px solid rgba(255, 255, 255, 0.2)',
    backgroundColor: 'rgba(0, 0, 0, 1)',
    color: 'white',
    textAlign: 'left',
    padding: '10px', // Add padding here
  };

  const selectedButtonStyle = {
    border: '2px solid rgba(93, 103, 217, 1)',
    backgroundColor: 'rgba(93, 103, 217, 0.1)',
    color: 'rgba(255, 255, 255, 1)',
    textAlign: 'left',
    padding: '10px', // Add padding here
  };

  return (
    <Card
      style={{
        width: '100%',
        borderRadius: '5px',
        border: '1px solid rgba(255, 255, 255, 0)',
        backgroundColor: 'rgba(255, 255, 255, 0)',
      }}
    >
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          {/* Top row */}
          <Grid item xs={12}>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <Button variant="outlined" onClick={handleAddButton} sx={{ color: 'white', ...buttonStyle }} style={{ ...buttonStyle}}>
                  <AddIcon />
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" onClick={() => handleRemoveButton()} sx={{ color: 'white', ...buttonStyle }} style={{ ...buttonStyle}}>
                  <RemoveIcon />
                </Button>
              </Grid>
              <Grid item xs={3.4}>
                <TextField
                  label="State Name"
                  value={stateName}
                  onChange={(e) => setStateName(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label="Temperature (C)"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label="Pressure (kPa)"
                  value={pressure}
                  onChange={(e) => setPressure(e.target.value)}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>
          {/* Second row */}
          <Grid item xs={12} p={2} style={{ maxHeight: '250px', overflowY: 'auto', scrollbarWidth: 'none' }}>
            <style>
              {`
                /* Hide scrollbar for Chrome, Safari, and Opera */
                ::-webkit-scrollbar {
                  display: none;
                }
                /* Hide scrollbar for IE, Edge, and Firefox */
                -ms-overflow-style: none; /* IE and Edge */
                scrollbar-width: none; /* Firefox */
              `}
            </style>
            <ReactSortable list={buttons} setList={setButtons}>
              {buttons.map((button) => (
                <div key={button.id}>
                  <Button
                    variant="outlined"
                    fullWidth
                    style={{
                       ...buttonStyle, 
                       flex: '0 0 auto', 
                       marginRight: '10px', 
                       textTransform: 'none',
                       ...(button.id === selectedButton ? selectedButtonStyle : {}),}}
                    sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px', textTransform: 'none', }}
                    onClick={() => handleButtonClick(button.id)}
                  >
                    {button.name}
                  </Button>
                </div>
              ))}
            </ReactSortable>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default StateControl;

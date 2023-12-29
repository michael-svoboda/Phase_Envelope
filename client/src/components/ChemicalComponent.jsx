import React, { useState } from 'react';
import {
  Card,
  Button,
  TextField,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  makeStyles,
  Grid,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Clear';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const useStyles = makeStyles((theme) => ({
  card: {
    background: 'transparent',
  },
  buttonGroup: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },

}));

const ChemicalComponent = ({ onAddToComposition, setChemicalComposition}) => {
  const classes = useStyles();
  const [molarAmount, setMolarAmount] = useState(0);
  const [chemicalComponent, setChemicalComponent] = useState('');
  const [composition, setComposition] = useState({}); // State to hold chemical composition

  const handleChemicalChange = (event) => {
    const selectedChemical = event.target.value;
    setChemicalComponent(selectedChemical);
  };

  const handleClearComposition = () => {
    setChemicalComposition({}); // Clears the composition
    console.log('Composition cleared');
  };

  const handleAddClick = () => {
    if (chemicalComponent && molarAmount) {
      const updatedComposition = { ...composition };

      if (updatedComposition[chemicalComponent]) {
        updatedComposition[chemicalComponent] += parseFloat(molarAmount);
      } else {
        updatedComposition[chemicalComponent] = parseFloat(molarAmount);
      }

      setComposition(updatedComposition);
      onAddToComposition(chemicalComponent, parseFloat(molarAmount)); // Call the prop function
      setMolarAmount(0); // Reset molar amount after adding
    }

  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Card className={classes.card}>
        <Grid container spacing={2} style={{ padding: '10px' }}> 
          

          {/* Second row: Dropdown */}
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel
                id="chemical-dropdown-label"
                style={{ color: 'white' }}
              >
                Chemical Component
              </InputLabel>
              <Select
                labelId="chemical-dropdown-label"
                id="chemical-dropdown"
                value={chemicalComponent}
                onChange={handleChemicalChange}
                label="Chemical Component"
                className={classes.whiteOutline}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="nitrogen">N2</MenuItem>
                <MenuItem value="CO2">CO2</MenuItem>
                <MenuItem value="methane">CH4</MenuItem>
                <MenuItem value="ethane">C2H6</MenuItem>
                <MenuItem value="propane">C3H8</MenuItem>
                <MenuItem value="i-butane">i-C4H10</MenuItem>
                <MenuItem value="n-butane">n-C4H10</MenuItem>
                <MenuItem value="i-pentane">i-C5H12</MenuItem>
                <MenuItem value="n-pentane">n-C5H12</MenuItem>
                <MenuItem value="i-hexane">i-C6H14</MenuItem>
                <MenuItem value="n-hexane">n-C6H14</MenuItem>
              </Select>
            </FormControl>
            
          </Grid>

          {/* Third row: Text Field */}
          <Grid item xs={12}>
            <TextField
              type="number"
              label="Molar Amount"
              variant="outlined"
              value={molarAmount}
              onChange={(e) => setMolarAmount(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAddClick();
              }}
              fullWidth
              className={classes.whiteOutline}
            />
          </Grid>
          {/* First row: Buttons */}
          <Grid item container spacing={2} alignItems="center" >
            <Grid item xs={6}>
              <Button
                variant="outlined"
                color="default"
                fullWidth
                className={classes.whiteOutline}
                onClick={handleAddClick}
              >
                <AddIcon style={{ color: 'white' }} />
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                color="default"
                fullWidth
                className={classes.whiteOutline}
                onClick={handleClearComposition}
              >
                <RemoveIcon style={{ color: 'white' }} />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </ThemeProvider>
  );
};

export default ChemicalComponent;

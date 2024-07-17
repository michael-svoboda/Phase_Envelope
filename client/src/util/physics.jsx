export function calculatePhaseFractions(components, temperature, pressure) {
    function seededRandom(seed) {
      var x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    }
  
    let seed = temperature + pressure;
    let result = {};
  
    for (let component in components) {
      let random1 = seededRandom(seed);
      let random2 = 1 - random1;
  
      result[component] = {
        v: random1,
        l: random2
      };
      
      seed++;
    }
  
    return result;
  }

  function generateDewPointLine(startTemp, criticalTemp, criticalPressure) {
    let temperatures = [];
    let pressures = [];
    
    // Define the starting and critical points
    let startPressure = criticalPressure - 30;
    temperatures.push(startTemp);
    pressures.push(startPressure);
    
    // Generate intermediate points
    for (let i = 1; i < 10; i++) {
      let temp = startTemp + (criticalTemp - startTemp) * (i / 10);
      let pressure = startPressure + (criticalPressure - startPressure) * Math.pow(i / 10, 2);
      temperatures.push(temp);
      pressures.push(pressure);
    }
    
    // Add the critical point
    temperatures.push(criticalTemp);
    pressures.push(criticalPressure);
    
    return { temperatures, pressures };
  }
  
  function generateBubblePointLine(criticalTemp, endTemp, criticalPressure) {
    let temperatures = [];
    let pressures = [];
    
    // Define the ending and critical points
    let endPressure = criticalPressure - 30;
    temperatures.push(endTemp);
    pressures.push(endPressure);
    
    // Generate intermediate points
    for (let i = 1; i < 10; i++) {
      let temp = endTemp + (criticalTemp - endTemp) * (i / 10);
      let pressure = endPressure + (criticalPressure - endPressure) * Math.pow(i / 10, 2);
      temperatures.push(temp);
      pressures.push(pressure);
    }
    
    // Add the critical point
    temperatures.push(criticalTemp);
    pressures.push(criticalPressure);
    
    return { temperatures, pressures };
  }
  
  export function calculatePhaseEnvelope(composition) {
    function getAverageMolarWeight(composition) {
      let totalMoles = 0;
      let totalWeight = 0;
      for (let component in composition) {
        let moles = composition[component];
        let molarWeight = 1; // Assign an appropriate molar weight for each component
        totalMoles += moles;
        totalWeight += moles * molarWeight;
      }
      return totalWeight / totalMoles;
    }
  
    let avgMolarWeight = getAverageMolarWeight(composition);
    let criticalTemp = 150; // Arbitrary critical temperature
    let criticalPressure = avgMolarWeight * criticalTemp / 10; // Arbitrary critical pressure based on average molar weight
  
    let startTempDew = -50; // Starting temperature for dew point line
    let endTempBubble = 100; // Ending temperature for bubble point line
  
    // Generate dew point and bubble point lines
    let dewPointLine = generateDewPointLine(startTempDew, criticalTemp, criticalPressure);
    let bubblePointLine = generateBubblePointLine(criticalTemp, endTempBubble, criticalPressure);
  
    return {
      dewT: dewPointLine.temperatures,
      dewP: dewPointLine.pressures,
      bubT: bubblePointLine.temperatures,
      bubP: bubblePointLine.pressures
    };
  }
  
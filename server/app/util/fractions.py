import neqsim
from neqsim.thermo.thermoTools import *

def calculate_phase_fractions(components, temperature, pressure):
    
    fluid1 = fluid('srk')
    
    for component, mole_fraction in components.items():
        fluid1.addComponent(component, mole_fraction)
    
    fluid1.setMixingRule('classic')
    fluid1.setTemperature(float(temperature), 'C')
    fluid1.setPressure(float(pressure), 'bara')
    
    TPflash(fluid1)
    
    result = {}
    
    for i in range(fluid1.getPhase(0).getNumberOfComponents()):
        component_name = fluid1.getPhase(0).getComponent(i).getName()
        vapor_fraction = fluid1.getPhase(0).getComponent(i).getz()
        liquid_fraction = fluid1.getPhase(1).getComponent(i).getx()
        
        result[str(component_name)] = {
            "v": vapor_fraction,
            "l": liquid_fraction
        }

    print(result)
    
    return result

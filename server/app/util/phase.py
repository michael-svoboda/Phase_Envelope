from neqsim.thermo import ThermodynamicOperations, fluid
import matplotlib.pyplot as plt

def calculate_phase_envelope(composition):
    # Create a fluid using neqsim
    fluid1 = fluid('srk')

    # Add components based on the given composition dictionary
    data = composition['composition']
    for component in data:
        fluid1.addComponent(component, data[component])

    fluid1.setMixingRule('classic')

    # Perform thermodynamic operations and calculate phase envelope
    thermoOps = ThermodynamicOperations(fluid1)
    thermoOps.calcPTphaseEnvelope()

    # Get data for plotting
    dewT = list(thermoOps.getOperation().get("dewT"))
    dewP = list(thermoOps.getOperation().get("dewP"))
    bubT = list(thermoOps.getOperation().get("bubT"))
    bubP = list(thermoOps.getOperation().get("bubP"))

    return {
        "dewT": dewT,
        "dewP": dewP,
        "bubT": bubT,
        "bubP": bubP
    }

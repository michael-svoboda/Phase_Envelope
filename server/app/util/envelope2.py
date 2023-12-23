from neqsim.thermo import TPflash, fluid, fluidComposition, phaseenvelope
import matplotlib.pyplot as plt

# Create a fluid object
fluid1 = fluid("pr")
fluid1.addComponent("methane", 85.0, "mol/sec")
fluid1.addComponent("ethane", 10.0, "mol/sec")
fluid1.addComponent("propane", 5.0, "mol/sec")
fluid1.setTemperature(20.0, 'C')
fluid1.setPressure(50.0, 'bara')

# Perform TP flash calculation
flash = TPflash(fluid1)

# Plot phase envelope with multiple liquid percentage lines
num_lines = 10

for i in range(num_lines + 1):
    liquid_percentage = i / num_lines
    fluid1.setLiquidFraction(liquid_percentage)
    flash.run()
    plt.plot(fluid1.getTemperature(), fluid1.getPressure(), marker='o', label=f'{int(liquid_percentage * 100)}% liquid')

plt.title('PT envelope with multiple liquid percentage lines')
plt.xlabel('Temperature [K]')
plt.ylabel('Pressure [bar]')
plt.legend()
plt.show()


import neqsim
from neqsim.thermo.thermoTools import *
import matplotlib
import numpy as np
import matplotlib.pyplot as plt
import math
plt.style.use('classic')

nitrogen = 1.0 #@param {type:"number"}
CO2 = 2.5 #@param {type:"number"}
methane = 80.0  #@param {type:"number"}
ethane = 5.0  #@param {type:"number"}
propane =  2.5 #@param {type:"number"}
ibutane =  1.25 #@param {type:"number"}
nbutane =  1.0 #@param {type:"number"}
ipentane =  0.4 #@param {type:"number"}
npentane =  0.3 #@param {type:"number"}
nhexane =  0.08#@param {type:"number"}

fluid1 = fluid('srk')
fluid1.addComponent("nitrogen", nitrogen)
fluid1.addComponent("CO2", CO2)
fluid1.addComponent("methane", methane)
fluid1.addComponent("ethane", ethane)
fluid1.addComponent("propane", propane)
fluid1.addComponent("i-butane", ibutane)
fluid1.addComponent("n-butane", nbutane)
fluid1.addComponent("i-pentane", ipentane)
fluid1.addComponent("n-pentane", nbutane)
fluid1.addComponent("n-hexane", nhexane)
fluid1.setMixingRule('classic')

fluid1.setTemperature(20.0, 'C')
fluid1.setPressure(50.0, 'bara')

TPflash(fluid1)

printFrame(fluid1)





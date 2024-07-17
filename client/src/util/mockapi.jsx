import { calculatePhaseEnvelope, calculatePhaseFractions } from './physics';

export const mockSendComposition = (data) => {
  return new Promise((resolve) => {
    let result = calculatePhaseEnvelope(data.composition);
    resolve({ received_data: data, result: result });
  });
};

export const mockSendFractions = (data) => {
  return new Promise((resolve) => {
    let result = calculatePhaseFractions(data.composition, data.selectedPT.temperature, data.selectedPT.pressure);
    resolve({ received_phase_data: data, result: result });
  });
};

from flask import Blueprint, jsonify, request
from neqsim.thermo import ThermodynamicOperations, fluid
import matplotlib.pyplot as plt
from app.util.fractions import calculate_phase_fractions

phase_fraction_bp = Blueprint('phase_fraction', __name__)


@phase_fraction_bp.route('/api/sendFractions', methods=['POST'])
def receive_composition():
    if request.method == 'POST':
        data = request.json  # Get the JSON data from the request body
        print('RECIEVED: ')
        print(data)

        # Assuming data is in the format {'CO2': 10, 'ethane': 50}
        result = calculate_phase_fractions(data['composition'], data['selectedPT']['temperature'], data['selectedPT']['pressure'])  # Pass the data to your function

        # Process the received data (e.g., perform calculations)
        # ...

        # For demonstration purposes, simply return the received data
        return jsonify({'received_phase_data': data, 'result': result}), 200

    return jsonify({'error': 'Invalid request method'}), 405



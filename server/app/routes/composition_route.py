from flask import Blueprint, jsonify, request
from neqsim.thermo import ThermodynamicOperations, fluid
import matplotlib.pyplot as plt
from app.util.phase import calculate_phase_envelope

composition_bp = Blueprint('composition', __name__)

@composition_bp.route('/api/sendComposition', methods=['POST'])
def receive_composition():
    if request.method == 'POST':
        data = request.json  # Get the JSON data from the request body

        # Assuming data is in the format {'CO2': 10, 'ethane': 50}
        result = calculate_phase_envelope(data)  # Pass the data to your function

        # Process the received data (e.g., perform calculations)
        # ...

        # For demonstration purposes, simply return the received data
        return jsonify({'received_data': data, 'result': result}), 200

    return jsonify({'error': 'Invalid request method'}), 405



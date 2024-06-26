from flask import Flask
from flask_cors import CORS
from app.routes import composition_bp
from app.routes import phase_fraction_bp
from app.routes.composition_route import calculate_phase_envelope



app = Flask(__name__)
CORS(app)  # Apply CORS to your Flask app


# Register the blueprint
app.register_blueprint(composition_bp)
app.register_blueprint(phase_fraction_bp)

@app.route('/api')

def test():
    return 'Test endpoint working!'


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
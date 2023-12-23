from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/api/data', methods=['GET'])
def get_data():
    # Your logic to fetch data goes here
    data = {'message': 'Hello from the Flask backend!'}
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)

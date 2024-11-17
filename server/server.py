from flask import Flask, request, jsonify
import requests  # For making the POST request

app = Flask(__name__)

# Target URL to forward the data to
TARGET_URL = 'https://fast-bear-157.convex.site/image'  # The convex URL to process images

@app.route('/')
def ping():
    """ Ping route to check if server is up """
    return jsonify({"message": "Server is up and running!"}), 200

@app.route('/ping_and_post', methods=['GET'])
def ping_and_post():
    """ Route to receive GET request and forward the data via POST """
    try:
        # Get the incoming query parameters (information in GET request)
        incoming_data = request.args.to_dict()  # Convert query parameters to a dictionary
        
        # Optionally, process or modify the data (add a new key-value pair)
        incoming_data['new_key'] = 'new_value'  # Add or modify data if needed
        
        # Send the data to the target URL as a POST request
        headers = {'Content-Type': 'application/json'}  # Specify content type as JSON
        response = requests.post(TARGET_URL, json=incoming_data, headers=headers)
        
        # Check the response from the POST request
        if response.status_code == 200:
            return jsonify({
                "status": "success", 
                "message": "Data forwarded successfully",
                "forwarded_data": incoming_data
            }), 200
        else:
            return jsonify({
                "status": "error", 
                "message": "Failed to forward data", 
                "response": response.text
            }), 500
    
    except Exception as e:
        # Handle any errors that occur
        print(f"Error: {e}")
        return jsonify({"status": "error", "message": str(e)}), 400


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
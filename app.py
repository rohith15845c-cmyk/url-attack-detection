from flask import Flask, request, jsonify
import pickle
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

with open("model.pkl", "rb") as f:
    model = pickle.load(f)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    features = np.array([[
        data["url_length"],
        data["special_chars"],
        data["ip_requests"],
        data["geo_change"],
        data["dns_anomaly"]
    ]])

    prediction = model.predict(features)[0]

    if prediction == 1:
        return jsonify({"result": "🚨 Malicious URL"})
    else:
        return jsonify({"result": "✅ Safe URL"})

if __name__ == "__main__":
    app.run(debug=True)

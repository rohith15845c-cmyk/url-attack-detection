function checkURL() {
  const data = {
    url_length: Number(document.getElementById("url_length").value),
    special_chars: Number(document.getElementById("special_chars").value),
    ip_requests: Number(document.getElementById("ip_requests").value),
    geo_change: Number(document.getElementById("geo_change").value),
    dns_anomaly: Number(document.getElementById("dns_anomaly").value)
  };

  fetch("http://127.0.0.1:5000/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(res => {
    document.getElementById("result").innerText = res.result;
  })
  .catch(err => {
    document.getElementById("result").innerText = "Backend not running";
    console.error(err);
  });
}

function textLength() {
    const url = "http://0.0.0.0/api/length"; // Replace with your API URL
    const data = { text: document.getElementById("text").value }; // Replace with your data payload

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json(); // Parse JSON response
        })
        .then(data => {
            // Set the output to the input element
            document.getElementById("output").value = data.result; // Adjust based on the API response structure
        })
        .catch(error => {
            console.error("Error:", error);
            document.getElementById("output").value = "Error fetching data.";
        });
}

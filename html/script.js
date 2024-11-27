function textLength() {
    const url = "https://curious-deane-losbaguettesdeliban-13a647bd.koyeb.app/api/length";
    const data = { text: document.getElementById("text").value };

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
            return response.json();
        })
        .then(data => {
            // Set the output to the input element
            document.getElementById("output").value = data;
        })
        .catch(error => {
            console.error("Error:", error);
            document.getElementById("output").value = "Error fetching data.";
        });
}

const base = "https://curious-deane-losbaguettesdeliban-13a647bd.koyeb.app/api";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function c_buttonSuccess() {
    document.getElementById("copyButton").className = "btn btn-success mt-100";
    await sleep(1500);
    document.getElementById("copyButton").className = "btn btn-outline-primary mt-100";
}

async function s_buttonSuccess() {
    document.getElementById("submitButton").className = "btn btn-success mt-100";
    await sleep(1500);
    document.getElementById("submitButton").className = "btn btn-outline-primary mt-100";
}

async function s_buttonFailed() {
    document.getElementById("submitButton").className = "btn btn-danger mt-100";
    await sleep(1500);
    document.getElementById("submitButton").className = "btn btn-outline-primary mt-100";
}

async function callAPI(url, inputDATA) {
    try {
        const response = await fetch(url, {
            method: "POST",
            body: inputDATA,
        });

        if (response.status === 429) {
            throw new Error("Rate limit exceeded. Please try again later.");
        }

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}

function copyOutput() {
    // Source: https://www.w3schools.com/howto/howto_js_copy_clipboard.asp
    var copyText = document.getElementById("output");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);

    c_buttonSuccess();
}

async function textLength() {
    const url = `${base}/length`;
    const formData = new FormData();
    formData.append("text", document.getElementById("text").value);

    const data = await callAPI(url, formData);
    if (data) {
        s_buttonSuccess();
        document.getElementById("output").value = data.result;
    } else {
        s_buttonFailed();
        document.getElementById("output").value = "Error fetching data.";
    }
}

async function reverseText() {
    const url = `${base}/reverse`;
    const formData = new FormData();
    formData.append("text", document.getElementById("text").value);

    const data = await callAPI(url, formData);
    if (data) {
        s_buttonSuccess();
        document.getElementById("output").value = data.result;
    } else {
        console.error("Error:", error);
        s_buttonFailed();
        document.getElementById("output").value = "Error fetching data.";
    }
}
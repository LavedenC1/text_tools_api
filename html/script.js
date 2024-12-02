const base = "https://curious-deane-losbaguettesdeliban-13a647bd.koyeb.app/api";
// Yes I am using an API

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function c_buttonSuccess() {
    document.getElementById("copyButton").className = "btn btn-success mt-100";
    await sleep(1500);
    document.getElementById("copyButton").className = "btn btn-outline-primary mt-100";
}

async function c_buttonFailed() {
    document.getElementById("copyButton").className = "btn btn-danger mt-100";
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

async function s2_buttonSuccess() {
    document.getElementById("submitButton2").className = "btn btn-success mt-100";
    await sleep(1500);
    document.getElementById("submitButton2").className = "btn btn-outline-primary mt-100";
}

async function s2_buttonFailed() {
    document.getElementById("submitButton2").className = "btn btn-danger mt-100";
    await sleep(1500);
    document.getElementById("submitButton2").className = "btn btn-outline-primary mt-100";
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
    if (copyText) {
        if (copyText.tagName === "INPUT" || copyText.tagName === "TEXTAREA") {
            copyText.select();
            copyText.setSelectionRange(0, 99999);
        } else {
            const range = document.createRange();
            const selection = window.getSelection();
            range.selectNodeContents(copyText);
            selection.removeAllRanges();
            selection.addRange(range);
        }
        try {
            navigator.clipboard.writeText(copyText.value || copyText.textContent).then(() => {
                c_buttonSuccess();
            }).catch(err => {
                c_buttonFailed();
                console.error("Failed to copy text:", err);
            });
        } catch (error) {
            c_buttonFailed();
            alert("If the copy function keeps failing, try using https...")
            console.error("Clipboard API not supported:", error);
        }
    } else {
        c_buttonFailed();
        console.error("Output element not found.");
    }
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
        document.getElementById("output").value = "Error fetching data. You've probably been rate limited. Try again later.";
        console.error("Error:", error);
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
        s_buttonFailed();
        document.getElementById("output").value = "Error fetching data. You've probably been rate limited. Try again later.";
        console.error("Error:", error);
    }
}

async function shuffleText() {
    const url = `${base}/shuffle`;
    const formData = new FormData();
    formData.append("text", document.getElementById("text").value);

    const data = await callAPI(url, formData);
    if (data) {
        s_buttonSuccess();
        document.getElementById("output").value = data.result;
    } else {
        s_buttonFailed();
        document.getElementById("output").value = "Error fetching data. You've probably been rate limited. Try again later.";
        console.error("Error:", error);
    }
}


async function ucase() {
    const url = `${base}/uppercase`;
    const formData = new FormData();
    formData.append("text", document.getElementById("text").value);

    const data = await callAPI(url, formData);
    if (data) {
        s_buttonSuccess();
        document.getElementById("output").value = data.result;
    } else {
        s_buttonFailed();
        document.getElementById("output").value = "Error fetching data. You've probably been rate limited. Try again later.";
        console.error("Error:", error);
    }
}

async function lcase() {
    const url = `${base}/lowercase`;
    const formData = new FormData();
    formData.append("text", document.getElementById("text").value);

    const data = await callAPI(url, formData);
    if (data) {
        s2_buttonSuccess();
        document.getElementById("output").value = data.result;
    } else {
        s2_buttonFailed();
        document.getElementById("output").value = "Error fetching data. You've probably been rate limited. Try again later.";
        console.error("Error:", error);
    }
}

async function reverseCase() {
    const url = `${base}/reverse_case`;
    const formData = new FormData();
    formData.append("text", document.getElementById("text").value);

    const data = await callAPI(url, formData);
    if (data) {
        s_buttonSuccess();
        document.getElementById("output").value = data.result;
    } else {
        s_buttonFailed();
        document.getElementById("output").value = "Error fetching data. You've probably been rate limited. Try again later.";
        console.error("Error:", error);
    }
}

async function findReplace() {
    const url = `${base}/find_replace`;
    const formData = new FormData();
    formData.append("text", document.getElementById("text").value);
    formData.append("find", document.getElementById("tofind").value);
    formData.append("replace", document.getElementById("toreplace").value);

    const data = await callAPI(url, formData);
    if (data) {
        s_buttonSuccess();
        document.getElementById("output").value = data.result;
    } else {
        s_buttonFailed();
        document.getElementById("output").value = "Error fetching data. You've probably been rate limited. Try again later.";
        console.error("Error:", error);
    }
}

async function wordFrequency() {
    const url = `${base}/word_frequency`;
    const formData = new FormData();
    formData.append("text", document.getElementById("text").value);

    const data = await callAPI(url, formData);
    if (data) {
        let outputText = '';
        const result = data.result;
        for (const key in result) {
            outputText += `${key}: ${result[key]}\n`; // Append each line to the outputText string
        }
        s_buttonSuccess();
        document.getElementById("output").value = outputText;
    } else {
        s_buttonFailed();
        document.getElementById("output").value = "Error fetching data. You've probably been rate limited. Try again later.";
        console.error("Error:", error);
    }
}

async function removePunctuation() {
    const url = `${base}/remove_punctuation`;
    const formData = new FormData();
    formData.append("text", document.getElementById("text").value);

    const data = await callAPI(url, formData);
    if (data) {
        s_buttonSuccess();
        document.getElementById("output").value = data.result;
    } else {
        s_buttonFailed();
        document.getElementById("output").value = "Error fetching data. You've probably been rate limited. Try again later.";
        console.error("Error:", error);
    }
}

async function removeDuplicates() {
    const url = `${base}/remove_duplicates`;
    const formData = new FormData();
    formData.append("text", document.getElementById("text").value);

    const data = await callAPI(url, formData);
    if (data) {
        s_buttonSuccess();
        document.getElementById("output").value = data.result;
    } else {
        s_buttonFailed();
        document.getElementById("output").value = "Error fetching data. You've probably been rate limited. Try again later.";
        console.error("Error:", error);
    }
}


async function base64enc() {
    const url = `${base}/encode_base64`;
    const formData = new FormData();
    formData.append("text", document.getElementById("text").value);

    const data = await callAPI(url, formData);
    if (data) {
        s_buttonSuccess();
        document.getElementById("output").value = data.result;
    } else {
        s_buttonFailed();
        document.getElementById("output").value = "Error fetching data. You've probably been rate limited. Try again later.";
        console.error("Error:", error);
    }
}

async function base64dec() {
    const url = `${base}/decode_base64`;
    const formData = new FormData();
    formData.append("text", document.getElementById("text").value);

    const data = await callAPI(url, formData);
    if (data) {
        s2_buttonSuccess();
        document.getElementById("output").value = data.result;
    } else {
        s2_buttonFailed();
        document.getElementById("output").value = "Error fetching data. You've probably been rate limited. Try again later.";
        console.error("Error:", error);
    }
}

async function binaryenc() {
    const url = `${base}/binary_encode`;
    const formData = new FormData();
    formData.append("text", document.getElementById("text").value);

    const data = await callAPI(url, formData);
    if (data) {
        s_buttonSuccess();
        document.getElementById("output").value = data.result;
    } else {
        s_buttonFailed();
        document.getElementById("output").value = "Error fetching data. You've probably been rate limited. Try again later.";
        console.error("Error:", error);
    }
}

async function binarydec() {
    const url = `${base}/binary_decode`;
    const formData = new FormData();
    formData.append("text", document.getElementById("text").value);

    const data = await callAPI(url, formData);
    if (data) {
        s2_buttonSuccess();
        document.getElementById("output").value = data.result;
    } else {
        s2_buttonFailed();
        document.getElementById("output").value = "Error fetching data. You've probably been rate limited. Try again later.";
        console.error("Error:", error);
    }
}

async function hexenc() {
    const url = `${base}/hex_encode`;
    const formData = new FormData();
    formData.append("text", document.getElementById("text").value);

    const data = await callAPI(url, formData);
    if (data) {
        s_buttonSuccess();
        document.getElementById("output").value = data.result;
    } else {
        s_buttonFailed();
        document.getElementById("output").value = "Error fetching data. You've probably been rate limited. Try again later.";
        console.error("Error:", error);
    }
}

async function hexdec() {
    const url = `${base}/hex_decode`;
    const formData = new FormData();
    formData.append("text", document.getElementById("text").value);

    const data = await callAPI(url, formData);
    if (data) {
        s2_buttonSuccess();
        document.getElementById("output").value = data.result;
    } else {
        s2_buttonFailed();
        document.getElementById("output").value = "Error fetching data. You've probably been rate limited. Try again later.";
        console.error("Error:", error);
    }
}

async function urlenc() {
    const url = `${base}/encode_url`;
    const formData = new FormData();
    formData.append("text", document.getElementById("text").value);

    const data = await callAPI(url, formData);
    if (data) {
        s_buttonSuccess();
        document.getElementById("output").value = data.result;
    } else {
        s_buttonFailed();
        document.getElementById("output").value = "Error fetching data. You've probably been rate limited. Try again later.";
        console.error("Error:", error);
    }
}

async function urldec() {
    const url = `${base}/decode_url`;
    const formData = new FormData();
    formData.append("text", document.getElementById("text").value);

    const data = await callAPI(url, formData);
    if (data) {
        s2_buttonSuccess();
        document.getElementById("output").value = data.result;
    } else {
        s2_buttonFailed();
        document.getElementById("output").value = "Error fetching data. You've probably been rate limited. Try again later.";
        console.error("Error:", error);
    }
}

async function caesarCipher() {
    const url = `${base}/caesar_cipher`;
    const formData = new FormData();
    formData.append("text", document.getElementById("text").value);
    formData.append("shift", document.getElementById("shift").value);

    const data = await callAPI(url, formData);
    if (data) {
        s_buttonSuccess();
        document.getElementById("output").value = data.result;
    } else {
        s_buttonFailed();
        document.getElementById("output").value = "Error fetching data. You've probably been rate limited. Try again later.";
        console.error("Error:", error);
    }
}

async function md5er() {
    const url = `${base}/md5_hash`;
    const formData = new FormData();
    formData.append("text", document.getElementById("text").value);

    const data = await callAPI(url, formData);
    if (data) {
        s_buttonSuccess();
        document.getElementById("output").value = data.result;
    } else {
        s_buttonFailed();
        document.getElementById("output").value = "Error fetching data. You've probably been rate limited. Try again later.";
        console.error("Error:", error);
    }
}

async function sha1er() {
    const url = `${base}/sha1_hash`;
    const formData = new FormData();
    formData.append("text", document.getElementById("text").value);

    const data = await callAPI(url, formData);
    if (data) {
        s_buttonSuccess();
        document.getElementById("output").value = data.result;
    } else {
        s_buttonFailed();
        document.getElementById("output").value = "Error fetching data. You've probably been rate limited. Try again later.";
        console.error("Error:", error);
    }
}

async function sha256er() {
    const url = `${base}/sha256_hash`;
    const formData = new FormData();
    formData.append("text", document.getElementById("text").value);

    const data = await callAPI(url, formData);
    if (data) {
        s_buttonSuccess();
        document.getElementById("output").value = data.result;
    } else {
        s_buttonFailed();
        document.getElementById("output").value = "Error fetching data. You've probably been rate limited. Try again later.";
        console.error("Error:", error);
    }
}

async function bcrypter() {
    const url = `${base}/bcrypt_hash`;
    const formData = new FormData();
    formData.append("text", document.getElementById("text").value);
    formData.append("rounds", document.getElementById("rounds").value);

    const data = await callAPI(url, formData);
    if (data) {
        s_buttonSuccess();
        document.getElementById("output").value = data.result;
    } else {
        s_buttonFailed();
        document.getElementById("output").value = "Error fetching data. You've probably been rate limited. Try again later.";
        console.error("Error:", error);
    }
}
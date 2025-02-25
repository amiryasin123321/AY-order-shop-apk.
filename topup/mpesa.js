const botToken = "YOUR_BOT_TOKEN";  // Replace with your bot's token
const ownerId = "5123439510";    // Replace with the chat ID of the owner

// Function to go back to the previous page
function goBack() {
    window.location.href = "../topup.html";
}

// Function to copy the M-Pesa number to the clipboard
function copyPaybillNumber() {
    const paybillNumber = document.getElementById("paybillNumber").innerText.trim();
    navigator.clipboard.writeText(paybillNumber)
}

// Function to submit payment proof to Telegram Bot
function submitPaymentProof() {
    let amount = document.getElementById("amount").value;
    let screenshotInput = document.getElementById("screenshot");

    let telegramId = localStorage.getItem("telegramId") || "Unknown User";
    let email = localStorage.getItem("userEmail") || "Not Provided";
    let phone = localStorage.getItem("phone") || "Not Provided";

    if (!amount || !screenshotInput.files.length) {
        alert("Please fill all fields and upload a screenshot.");
        return;
    }

    let file = screenshotInput.files[0];
    let formData = new FormData();
    formData.append("chat_id", ownerId);
    formData.append("photo", file);
    formData.append("caption", 
        `📌 *New Payment Proof Submitted*\n\n` +
        `👤 *User:* ${telegramId}\n` +
        `📧 *Email:* ${email}\n` +
        `📞 *Phone:* ${phone}\n` +
        `💰 *Amount:* ${amount} KES\n\n` +
        `✅ *Please verify and confirm the payment.*`
    );

    fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            alert("Payment proof submitted successfully!");
            document.getElementById("amount").value = "";
            document.getElementById("screenshot").value = "";
            window.location.href = "../topup.html";
        } else {
            alert("Error submitting payment proof. Please try again.");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Failed to send payment proof.");
    });
}
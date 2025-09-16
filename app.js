// --- Customer Functionality ---

const customerMessageInput = document.getElementById('customer-message');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', () => {
    const message = customerMessageInput.value;
    if (message.trim() !== '') {
        // Send the message to the server
        fetch('/api/send-message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: message })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Message sent:', data);
            customerMessageInput.value = ''; // Clear input on success
        })
        .catch(error => {
            console.error('Error sending message:', error);
        });
    }
});

// --- Admin Functionality ---

const messageList = document.getElementById('message-list');
let lastMessageId = 0; // We'll assume messages have an ID on the server

// Function to fetch and display new messages
function fetchNewMessages() {
    // Fetch messages from the server starting from the last known message ID
    fetch(`/api/get-messages?sinceId=${lastMessageId}`)
        .then(response => response.json())
        .then(messages => {
            messages.forEach(message => {
                const messageItem = document.createElement('li');
                messageItem.textContent = message.text;
                messageList.appendChild(messageItem);
                lastMessageId = message.id; // Update the last known message ID
            });
        })
        .catch(error => {
            console.error('Error fetching messages:', error);
        });
}

// Poll the server for new messages every 3 seconds (3000 milliseconds)
setInterval(fetchNewMessages, 3000);
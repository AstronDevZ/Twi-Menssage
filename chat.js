// Configuração do Firebase
var firebaseConfig = {
    apiKey: "AIzaSyDfk8JD4CQuqs-OXy8_hj2awQnmqh21PZA",
    authDomain: "twi-menssage.firebaseapp.com",
    projectId: "twi-menssage",
    storageBucket: "twi-menssage.appspot.com",
    messagingSenderId: "108090645690",
    appId: "1:108090645690:web:8e8fc2b9624267607e7683",
    measurementId: "G-4C4RS3LDEH"
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

auth.onAuthStateChanged(user => {
    if (!user) {
        window.location.href = 'auth.html';
    } else {
        loadMessages();
    }
});

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const messageText = messageInput.value.trim();

    if (messageText === "") return;

    const messagesRef = db.collection('messages');

    messagesRef.add({
        user: auth.currentUser.email,
        message: messageText,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        messageInput.value = ''; // Clear the input after sending the message
    })
    .catch(error => {
        console.error("Error sending message: ", error);
    });
}

function loadMessages() {
    const messagesRef = db.collection('messages').orderBy('timestamp');

    messagesRef.onSnapshot(snapshot => {
        const messagesContainer = document.getElementById('messages');
        messagesContainer.innerHTML = '';

        snapshot.forEach(doc => {
            const message = doc.data();
            const messageElement = document.createElement('div');
            messageElement.classList.add('message');
            messageElement.innerText = `${message.user}: ${message.message}`;
            messagesContainer.appendChild(messageElement);
        });

        messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll to the bottom
    });
}

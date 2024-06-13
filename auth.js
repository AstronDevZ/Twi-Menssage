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

function showRegister() {
    document.getElementById('auth-container').classList.add('hidden');
    document.getElementById('register-container').classList.remove('hidden');
}

function showLogin() {
    document.getElementById('register-container').classList.add('hidden');
    document.getElementById('auth-container').classList.remove('hidden');
}

function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            window.location.href = 'chat.html';
        })
        .catch(error => {
            console.error("Erro ao fazer login:", error);
            alert("Erro ao fazer login: " + error.message);
        });
}

function register() {
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            showLogin();
        })
        .catch(error => {
            console.error("Erro ao registrar:", error);
            alert("Erro ao registrar: " + error.message);
        });
}

// Verifica o estado de autenticação ao carregar a página
auth.onAuthStateChanged(user => {
    if (user) {
        window.location.href = 'chat.html';
    }
});

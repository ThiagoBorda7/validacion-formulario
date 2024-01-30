const firebaseConfig = {
    apiKey: "AIzaSyDRPugWl4TgZ0ipTLllt4KULHZTIaQ3M7U",
    authDomain: "datos-de-formulario-57733.firebaseapp.com",
    projectId: "datos-de-formulario-57733",
    storageBucket: "datos-de-formulario-57733.appspot.com",
    messagingSenderId: "575520007629",
    appId: "1:575520007629:web:2387e450de9602ba30d084",
    measurementId: "G-BG5T2M9080"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();


document.getElementById('formulario').addEventListener('submit', (event) => {
    event.preventDefault()

    //validar campo nombre
    let entradaNombre = document.getElementById('name');
    let errorNombre = document.getElementById('nameError');

    if (entradaNombre.value.trim() === ''){
        errorNombre.textContent = 'Porfavor introduce un nombre';
        errorNombre.classList.add('error-message');
    }else {
        errorNombre.textContent = '';
        errorNombre.classList.remove('error-message');
    }

    //validar campo correo electronico

    let entradaEmail = document.getElementById('email');
    let errorEmail = document.getElementById('emailError');
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(entradaEmail.value)){
        errorEmail.textContent = 'Email no válido, ingrese otro';
        errorNombre.classList.add('error-message');
    }else {
        errorEmail.textContent = '';
        errorEmail.classList.remove('error-message');
    }

    //validar campo contraseña

    let entradaContrasena = document.getElementById('password');
    let errorContrasena = document.getElementById('passwordError');

    if (entradaContrasena.value.length < 8) {
        errorContrasena.textContent = 'La contraseña debe tener al menos 8 caracteres';
        errorContrasena.classList.add('error-message');
    }else {
        errorContrasena.textContent = '';
        errorContrasena.classList.remove('error-message');
    }

    //enviar formulario

    if (!errorNombre.textContent && !errorEmail.textContent && !errorContrasena.textContent) {

        db.collection("users").add({
            nombre: entradaNombre.value,
            email: entradaEmail.value,
            password: entradaContrasena.value
        })
        .then((docRef) => {
            alert('El formulario se envio exitosamente', docRef.id);
            document.getElementById('formulario').reset();
        })
        .catch((error) => {
            alert(error);
        });
    }
})
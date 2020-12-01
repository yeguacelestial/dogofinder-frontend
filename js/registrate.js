// Crear un evento para manejar los datos del formulario
let formulario = document.getElementById('formulario')
formulario.addEventListener('submit', handleRegistrarseButton)

// Manejar lo que pasará cuando el usuario haga click en el botón "Registrarse"
async function handleRegistrarseButton (event) {

    // Esto evita que el formulario
    event.preventDefault()

    try {
        let username = document.getElementById('username').value
        let email = document.getElementById('email').value
        let password1 = document.getElementById('password1').value
        let password2 = document.getElementById('password2').value
        const formData = {username, email, password1, password2}

        let respuesta = await postFormDataAsJson({
            url:'http://dogofinder.herokuapp.com/api/v1/auth/signup/', 
            formData
        })
        console.log({respuesta})

        alert("Datos validados exitosamente: \n" + JSON.stringify(respuesta))

    } catch(error){
        console.log("Error al hacer la peticion => ", error)

        // TODO: Validar errores
        alert("Hubo un problema al validar tus datos: \n" + error)
    }
}

async function postFormDataAsJson({url, formData}){
    const formDataJsonString = JSON.stringify(formData)

    const fetchOptions = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: formDataJsonString
    }

    const response = await fetch(url, fetchOptions)

    if (!response.ok){
        const errorMessage = await response.text()
        throw new Error(errorMessage)
    }

    return response.json()
}

// const handleToken = (token) => {
//     // Aquí haces lo que debas hacer con el token recibido de la API
//     // localStorage.setItem('formData', JSON.stringify(formData));
// } 
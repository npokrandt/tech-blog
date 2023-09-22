const form = document.querySelector('form')

//console.log(form)

const handleLoginEvent = event => {
    event.preventDefault()

    const username = document.querySelector('[name="username"]').value.trim()
    const password = document.querySelector('[name="password"]').value.trim()

    const user = {
        username,
        password
    }

    //console.log(user)

    fetch('api/userRoutes/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        if (response.ok){
            document.location.replace('/');
        } else {
            alert('Login attempt unsuccessful')
        }
    })
    .catch(err => console.log(err))
}
 
form.addEventListener('submit', handleLoginEvent)
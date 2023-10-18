const form = document.querySelector('form')

const handleCreateUserEvent = event => {
    event.preventDefault()

    const username = document.querySelector('[name="username"]').value.trim()
    const password = document.querySelector('[name="password"]').value.trim()
    const confirmPassword = document.querySelector('[name="confirmPassword"]').value.trim()

    if (password !== confirmPassword){
        alert('passwords do not match')
        return
    }

    const newUser = {
        username,
        password
    }

    fetch('api/userRoutes/create-user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    }).then(response => {
        if (response.ok){

            fetch('api/userRoutes/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            })
            .then(response => {
                if (response.ok){
                    document.location.replace('/');
                } else {
                    alert('Login attempt unsuccessful')
                }
            })
            .catch(err => console.log(err))
        } else {
            alert('Account creation attempt unsuccessful')
        }
    })
    .catch(err => console.log(err))
}

form.addEventListener('submit', handleCreateUserEvent)
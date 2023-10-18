const logout = async() => {
    const response = await fetch('api/userRoutes/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    })

    if (response.ok) {
        document.location.replace('/login');
      } else {
        alert(response);
      }
}

document.querySelector('#log-out').addEventListener('click', logout)
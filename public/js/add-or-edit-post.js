//add new post
const form = document.querySelector('form')

const oldTitle = document.querySelector('[name="title"]').value.trim()
const addNewPost = event => {
    const title = document.querySelector('[name="title"]').value.trim()
    const content = document.querySelector('[name="content"]').value.trim()

    const buttonVal = document.querySelector('button').innerText

    event.preventDefault()

    const post = {
        oldTitle,
        title,
        content
    }

    if (buttonVal === "Update Post"){
        fetch('../api/blogpostRoutes/edit-blogpost', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        })
        .then(response => {
            if (response.ok){
                document.location.replace('/dashboard');
            } else {
                alert('Blogpost edit unsuccessful')
            }
        }) 
        .catch(err => console.log(err))
    } else {
        fetch('api/blogpostRoutes/add-blogpost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        })
        .then(response => {
            if (response.ok){
                document.location.replace('/dashboard');
            } else {
                alert('Blogpost creation unsuccessful')
            }
        })
        .catch(err => console.log(err))
    }
}

form.addEventListener('submit', addNewPost)
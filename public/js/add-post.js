//add new post
const form = document.querySelector('form')

const addNewPost = event => {
    const title = document.querySelector('[name="title"]').value.trim()
    const content = document.querySelector('[name="content"]').value.trim()

    event.preventDefault()
    console.log(title, content)

    const post = {
        title,
        content
    }

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

form.addEventListener('submit', addNewPost)
const form = document.querySelector('form')
const addCommentBtn = document.querySelector('.add-comment')

//console.log(form)
const showAddCommentForm = () => {
    form.style.display = 'block'
}

const submitComment = event =>{
    const textArea = document.querySelector('[name="newComment"]')
    const commentContent = {content: textArea.value.trim()}

    event.preventDefault()

    fetch('../api/commentRoutes/add-comment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(commentContent)
    })
    .then(response => {
        if (response.ok){
            document.location.reload()
            textArea.value = ''
        } else {
            console.log(response.status)
            alert('Comment upload unsuccessful')
        }
    })
    .catch(err => console.log(err))
    //send the comment content to be added, along with the user and post ids
}

addCommentBtn.addEventListener('click', showAddCommentForm)
form.addEventListener('submit', submitComment)

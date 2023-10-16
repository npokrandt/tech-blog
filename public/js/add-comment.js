const form = document.querySelector('form')
const addCommentBtn = document.querySelector('.add-comment')
//these grab the slug components to be used to grab the blog id for new comments
// const slugPartOneEl = document.querySelector('h3').innerText
// const slugPartTwoEl = document.querySelector('h6').innerText

// const slugPartOne = slugPartOneEl.split(' ').join('-').toLowerCase()
// const slugPartTwo = slugPartTwoEl.substring(3, slugPartTwoEl.search(/,/))

const slug = {slugPartOne, slugPartTwo}
const showAddCommentForm = () => {
    form.style.display = 'block'
}

const submitComment = event =>{
    const textArea = document.querySelector('[name="newComment"]')
    const commentContent = {
        content: textArea.value.trim(),
        slug
    }

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

//delete is easy - just delete the post in question

const editPostEl = document.getElementById('edit_post')
const deletePostEl = document.getElementById('delete_post')

//these grab the slug components to be used to grab the blog id for new comments
const slugPartOneEl = document.querySelector('h3').innerText
const slugPartTwoEl = document.querySelector('h6').innerText

const slugPartOne = slugPartOneEl.split(' ').join('-').toLowerCase()
const slugPartTwo = slugPartTwoEl.substring(3, slugPartTwoEl.search(/,/))

const postToDeleteSlug = {slugPartOne, slugPartTwo}

const editPost = () => {
    console.log('editing...')
    //edit just takes them to the same page as earlier, but with the text bars filled in
}

const deletePost = () => {

    const verification = confirm('Are you sure you want to delete this post?')

    console.log(verification)

    if (verification){
        fetch('../api/blogpostRoutes/delete-blogpost', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postToDeleteSlug)
        })
        .then(response => {
            if (response.ok){
                document.location.replace('/dashboard');
                console.log(response.status)
            } else {
                alert('Deletion unsuccessful')
            }
        })
    }
    //delete is easy - just delete the post in question and maybe its comments
}

editPostEl.addEventListener('click', editPost)
deletePostEl.addEventListener('click', deletePost)
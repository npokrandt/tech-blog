const createPostBtn = document.querySelector('button')

const goToCreatePost = () => {
    document.location.replace('/write-or-edit-blogpost')
}

createPostBtn.addEventListener('click', goToCreatePost)
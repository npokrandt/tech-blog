const createPostBtn = document.querySelector('button')

const goToCreatePost = () => {
    document.location.replace('/write-blogpost')
}

createPostBtn.addEventListener('click', goToCreatePost)
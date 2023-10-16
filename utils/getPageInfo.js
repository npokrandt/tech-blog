//gets a boolean, and sends back an object with the appropriate responses

const getPageInfo = (isEdit, titleAndContents) => {
    let headerText = "Write a new post below!"
    let titleLabelText = "Add a title for your blogpost"
    let titleInputValue = ''
    let contentLabelText = "Add the content of your blogpost"
    let contentTextareaValue = ''
    let buttonText = 'Add Post'

    if (isEdit){
        headerText = "Edit post below!"
        titleLabelText = "Edit title for your blogpost"
        titleInputValue = titleAndContents.title
        contentLabelText = "Edit the content of your blogpost"
        contentTextareaValue = titleAndContents.content
        buttonText = 'Update Post'
    }

    const text = {
        headerText,
        titleLabelText,
        titleInputValue,
        contentLabelText,
        contentTextareaValue,
        buttonText
    }

    return text
}

module.exports = getPageInfo
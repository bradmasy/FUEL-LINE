const closePop = document.querySelectorAll('[data-error-target')
const overlay = document.getElementById("overlay")

closeButton.forEach(button => {
    button.addEventListener('click', () => {
        const error = button.closest('.error')
        closePop(error)
    })
})

function openPop(error){
    if (error == null) return
    error.classList.add('active')
    overlay.classList.add('active')

}

function closePop(error){
    if (error == null) return
    error.classList.remove('active')
    overlay.classList.remove('active')

}
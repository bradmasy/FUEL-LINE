const closePop = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById("overlay")

closeButton.forEach(button => {
    button.addEventListener('click', () => {
        const error = button.closest('.error')
        closePop(error)
    })
})

function openPop(valid){
    if (valid == false) return
    error.classList.add('active')
    overlay.classList.add('active')
}

function closePop(error){
    error.classList.remove('active')
    overlay.classList.remove('active')
}

function displayPopup()
{
  $(".error").fadeIn("slow");
  console.log("here");
}

// selectors 
const inputName = document.querySelector(".inputName"),
    inputPrice = document.querySelector(".inputPrice"),
    btnAdd = document.querySelector(".inputbtn"),
    info = new GetInformations();



// eventListenres

callEventListenrs()

function callEventListenrs() {

    // get info when submit form
    btnAdd.addEventListener("click", function(event) {
        info.getInput(event);
    })

    // after loaded page get money
    document.addEventListener("DOMContentLoaded", function() {
        info.geBudgetAndShow()
    })
}
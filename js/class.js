class GetInformations {
    getInput(event) {

        // prevent form from submiting
        event.preventDefault()

        let name = "",
            price = 0;

        // check input if not empty get info
        if (inputName.value == "" || inputName.value == null) {
            inputName.style.boxShadow = "5px 5px 30px orangered";
        } else if (inputPrice.value == "" || inputPrice.value == null || inputPrice.value == NaN || isNaN(Number(inputPrice.value))) {
            inputName.style.boxShadow = "none";
            inputPrice.style.boxShadow = "5px 5px 30px orangered";
        } else {
            price = Number(inputPrice.value);
            name = inputName.value;
            inputPrice.style.boxShadow = "none";
            this.showSpendItem(name, price);
        }
    }

    showSpendItem(name, price) {

        //crete element li for show spend item
        const li = document.createElement("li");
        li.innerHTML = "هزینه  " + name + "  " + price + " هزار تومان"

        const ul = document.querySelector(".spending");
        ul.appendChild(li);
    }
}
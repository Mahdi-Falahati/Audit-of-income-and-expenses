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

    addComma(str) {
        var objRegex = new RegExp('(-?[0-9]+)([0-9]{3})');

        while (objRegex.test(str)) {
            str = str.replace(objRegex, '$1,$2');
        }

        return str;
    }

    geBudgetAndShow() {
        // get all the money OF user 
        let budget = prompt("لطفا مقدار بودجه ی خود را به تومان وارد کنید :");
        if (budget == null || budget == "" || budget == "0" || isNaN(budget)) {
            window.location.reload();
        }


        // sperete width comma 
        let money = this.addComma(budget);

        //create span for show budget
        let span = document.createElement("span");
        span.innerHTML = money;

        // budget
        let totalMoney = document.querySelector(".totoal-money");
        totalMoney.firstElementChild.appendChild(span);

        let leftOverMoney = document.querySelector(".left-over-money");
        //create span for show left Over Money
        let spanLOM = document.createElement("span");


        spanLOM.innerHTML = money;

        leftOverMoney.firstElementChild.appendChild(spanLOM);

    }
}
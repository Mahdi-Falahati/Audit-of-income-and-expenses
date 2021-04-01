class GetInformations {
    getInput(event) {

        // prevent form from submiting
        event.preventDefault()

        let name = "",
            price = 0;

        const money = inputPrice.value;

        // check input if not empty get info
        if (inputName.value == "" || inputName.value == null) {
            inputName.style.boxShadow = "5px 5px 30px orangered";
        } else if (inputPrice.value == "" || inputPrice.value == null || inputPrice.value == NaN || isNaN(Number(money.replace(/,/g, "")))) {
            inputName.style.boxShadow = "none";
            inputPrice.style.boxShadow = "5px 5px 30px orangered";
        } else {
            price = inputPrice.value;
            name = inputName.value;
            inputPrice.style.boxShadow = "none";
            this.showSpendItem(name, price);
            this.reduceMoney(price);
            inputPrice.value = "";
            inputName.value = "";

        }

    }

    addComma(str) {
        var objRegex = new RegExp('(-?[0-9]+)([0-9]{3})');

        while (objRegex.test(str)) {
            str = str.replace(objRegex, '$1,$2');
        }

        return str;
    }

    showSpendItem(name, price) {

        let money = this.addComma(price);

        //crete element li for show spend item
        const li = document.createElement("li");
        li.innerHTML = `هزینه  ${name}  <p class="lists"> ${money} </P> تومان `;

        const ul = document.querySelector(".spending");
        ul.appendChild(li);
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
        span.classList = "span";

        // budget
        let totalMoney = document.querySelector(".totoal-money");
        totalMoney.firstElementChild.appendChild(span);

        let leftOverMoney = document.querySelector(".left-over-money");
        //create span for show left Over Money
        let spanLOM = document.createElement("span");

        spanLOM.classList = "spanLOM"

        spanLOM.innerHTML = money;

        leftOverMoney.firstElementChild.appendChild(spanLOM);



    }

    // spreted number in input price
    spretedNumber() {
        let moneySpend = inputPrice.value;
        let moneySeprated = this.addComma(moneySpend);
        inputPrice.value = moneySeprated;
        return moneySpend
    }

    reduceMoney(Price) {
        // selctors
        const span = document.querySelector(".span"),
            price = Number(Price.replace(/,/g, "")),
            spanLOM = document.querySelector(".spanLOM");
        let list = document.querySelectorAll(".lists");

        // check input price when user write price more than budget write a text 
        if (price > span.innerHTML.replace(/,/g, "")) {

            let count = 0;
            for (let i = 0; i < list.length; i++) {
                if (Number(list[i].innerHTML.replace(/,/g, "")) > price) {
                    count = i;
                }
            }

            // add class eror to li for add style
            list[count].parentElement.classList += " eror";
            list[count].parentElement.innerHTML = " چی !!! نه خدایی یکم فکر کن تو اصلا انقدر بودجه داری";

            // check input price when user write price negative or Enter price but - width left over money if money is negative  his/her budget write a text 
        } else if (Number(spanLOM.innerHTML.replace(/,/g, "") - price) < 0) {

            let count = 0;
            for (let i = 0; i < list.length; i++) {

                if (list[i].innerHTML.replace(/,/g, "") == price) {
                    count = i;
                }
            }

            // add class eror to li for add style
            list[count].parentElement.classList += " eror";
            list[count].parentElement.innerHTML = "دیدی چی شد پولت نمیکشه : (";

        } else {

            // calculate result
            let p = spanLOM.innerHTML.replace(/,/g, "") - price;
            spanLOM.innerHTML = p;

        }
    }
}
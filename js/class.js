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

        // add price to lacal storage 
        let factors = this.checkContentExistINlocalStorage("factors");
        factors.push(li.innerHTML);
        localStorage.setItem("factors", JSON.stringify(factors));
    }



    getBudgetAndShow() {

        // get left orver money  and budget of localstorage
        let lom = this.checkContentExistINlocalStorage("left-over-money"),
            bu = this.checkContentExistINlocalStorage("budget");


        if (lom[0] < bu[0] && lom[0] > 0) {

            //create span for show budget
            let span = document.createElement("span");
            span.innerHTML = this.addComma(bu[0]);
            span.classList = "span";

            // budget
            let totalMoney = document.querySelector(".totoal-money");
            totalMoney.firstElementChild.appendChild(span);

            let leftOverMoney = document.querySelector(".left-over-money");
            //create span for show left Over Money
            let spanLOM = document.createElement("span");

            spanLOM.classList = "spanLOM"

            spanLOM.innerHTML = this.addComma(lom[0]);

            leftOverMoney.firstElementChild.appendChild(spanLOM);

            // load factors of local storage 
            let factors = this.checkContentExistINlocalStorage("factors");
            // show factors in page 
            factors.forEach(element => {
                //crete element li for show spend item
                const li = document.createElement("li");
                li.innerHTML = element;
                const ul = document.querySelector(".spending");
                ul.appendChild(li);
            });


        } else {
            // empty factors in local storage
            let factors = this.checkContentExistINlocalStorage("factors");
            factors = []
            localStorage.setItem("factors", JSON.stringify(factors));

            if (lom[0] == 0) {
                alert(" بودجه هفتگی شما به اتمام رسیده است ) :")
            }
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

            // save budget to local storage
            let budge = this.checkContentExistINlocalStorage("budget");
            budge.pop();
            budge.push(money.replace(/,/g, ""));
            localStorage.setItem("budget", JSON.stringify(budge));
            localStorage.setItem("leftOverMoney", JSON.stringify(budge));

        }
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

            // afte 5s remove eror li
            setTimeout(() => {
                document.querySelector('.eror').remove()
            }, 5000);

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

            // afte 5s remove eror li
            setTimeout(() => {
                document.querySelector('.eror').remove()
            }, 5000);


        } else {

            // calculate result
            let p = spanLOM.innerHTML.replace(/,/g, "") - price;

            // save left over money to local storage
            let leftOverMoney = this.checkContentExistINlocalStorage("left-over-money");
            leftOverMoney.pop();
            leftOverMoney.push(p);
            localStorage.setItem("leftOverMoney", JSON.stringify(leftOverMoney));

            spanLOM.innerHTML = p;

        }
    }

    // check content in localstorage
    checkContentExistINlocalStorage(assessment) {

        let money;

        // get content
        let contentLocalstorage;
        if (assessment == "budget") {
            contentLocalstorage = localStorage.getItem("budget");
        } else if (assessment == "left-over-money") {
            contentLocalstorage = localStorage.getItem("leftOverMoney");
        } else if (assessment == "factors") {
            contentLocalstorage = localStorage.getItem("factors");
        }

        // check value in local storege
        if (contentLocalstorage == null) {
            money = [];
        } else {
            money = JSON.parse(contentLocalstorage);
        }

        return money
    }


}
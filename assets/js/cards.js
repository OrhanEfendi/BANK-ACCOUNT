document.addEventListener("DOMContentLoaded", function () {
  // Burada buttonEl ve diğer elementlere erişebilirsiniz.
  buttonEl = document.querySelector("#buttonEl");
  genderSelect = document.querySelector("#genderSelect");
  nameInpEl = document.querySelector("#nameInpEl");
  surnameInpEl = document.querySelector("#surnameInpEl");

  buttonEl.addEventListener("click", function () {
    localStorage.setItem("gender", genderSelect.value);
    localStorage.setItem("name", nameInpEl.value);
    localStorage.setItem("surname", surnameInpEl.value);

    // Yeni sayfaya yönlendirin
    window.location.href = "../html/card.html";
  });
});

const gender_result = localStorage.getItem("gender");
const gender = gender_result == "1" ? "Mr" : "Mrs";
const name_customer = localStorage.getItem("name");
const surname = localStorage.getItem("surname");

bank_num = document.querySelector("#bank_num");

valid_date = document.querySelector("#valid_date");

customer_name = document.querySelector("#customer_name");

cvv_number = document.querySelector("#cvv_number");

const incrementBtn = document.querySelector("#incrementBtn");
const decrementBtn = document.querySelector("#decrementBtn");
const showBtn = document.querySelector("#showBtn");
const inputEL = document.querySelector("#inputEL");
const balanceEl = document.querySelector("#balanceEl");
const list = document.querySelector("#list");

const min = 100;
const max = 999;

const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

console.log(randomNumber);

cvv_number.innerHTML = randomNumber;

const generateRandomNumber = () => {
  let randomNumber = "";
  for (let i = 0; i < 20; i++) {
    const digit = Math.floor(Math.random() * 10);
    randomNumber += digit.toString();
  }
  return randomNumber;
};

let result_customer = gender + "." + name_customer + " " + surname;
customer_name.innerText = result_customer;

console.log(result_customer);
const twentyDigitNumber = generateRandomNumber();
console.log(twentyDigitNumber);

// 4'er 4'er gruplara ayırma
const b = twentyDigitNumber.slice(0, 4);
const c = twentyDigitNumber.slice(4, 8);
const d = twentyDigitNumber.slice(8, 12);
const f = twentyDigitNumber.slice(12, 16);
const g = twentyDigitNumber.slice(16, 20);

var result = b + " " + c + " " + d + " " + f + " " + g;
console.log(b, c, d, f, g);
console.log(result);

bank_num.innerHTML = result;

date = new Date();
day = date.getDate();
month = date.getFullYear() + 10;
console.log(date.getDate());
console.log(month);

var date_result = day + "/" + month;
console.log(date_result);

valid_date.innerHTML = date_result;

const bankAccount = {
  balance: 0,
  limit: 1000,
  hesabat: [],
  date: new Date(),
  artir: function (m) {
    if (this.balance >= this.limit || m <= 0 || !m) {
      // !m demek yeni undefined null 0  false degerdise
      console.log("Limiti Kecdin");
      return;
    }
    this.balance += m;
    this.date = new Date();
    const history = {
      type: "Cash",
      amount: m,
      created: this.date,
    };
    console.log(history);
    this.hesabat.push(history);
    console.log(this.hesabat);

    return this.balance;
  },
  xercle: function (m) {
    const checkValid = () => {
      if (this.balance <= 0) {
        console.log("invalid Balance");
        return;
      }
      this.balance -= m;
      this.date = new Date();

      const history = {
        type: "Withdraw",
        amount: m,
        created: this.date,
      };
      console.log(history);
      this.hesabat.push(history);
      console.log(this.hesabat);
    };

    checkValid();
    return this.balance;
  },
  show: function (m) {
    console.log(this.balance);
    const thisObj = this;

    function handleMonitor() {
      console.log(thisObj.balance);
      console.log(thisObj.hesabat);
    }
    handleMonitor();
    return this.balance;
  },
};

incrementBtn.addEventListener("click", function () {
  const value = inputEL.value;
  bankAccount.artir(+value);
  inputEL.value = "";
});
decrementBtn.addEventListener("click", function () {
  const value = inputEL.value;
  bankAccount.xercle(+value);
  inputEL.value = "";
});
showBtn.addEventListener("click", function () {
  var result = bankAccount.show();
  balanceEl.innerHTML = result;

  const newContent = bankAccount.hesabat
    .map(
      (item, index) => `
      <tr>
        <th scope="row">${index + 1}</th>
        <td>${item.type}</td>
        <td class="text-${item.type == "Cash" ? "success" : "danger"}">${
        item.type == "Cash" ? "+" + item.amount : "-" + item.amount
      }</td>
        <td>${item.created.toLocaleString()}</td>
      </tr>`
    )
    .join("");

  list.innerHTML = newContent;
});

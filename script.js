//Experimenting with the use of high order arrays
const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");
const clearBtn = document.getElementById("clear-all");
let data = [];
//fetch random user and add money
getRandomUser();
getRandomUser();
getRandomUser();
//displays another way to use fetch the response
// function getRandomUserEXAMPLE(){
// fetch('https://randomuser.me/api').then(response =>response.json()).then(data =>)
// //With a singe wait- We do not have to chain all of these thens
// }

async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api"); // fetch is asynchronous
  const data = await res.json(); // which means we have to wait for it to finish behind the scenes

  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 100000),
  };
  addData(newUser);
}

//double up the money
function doubleMoney() {
  data = data.map((user) => {
    //...aka the spread function just copies what is already inside of the
    // user data in this case
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}
//sort by the richest
//built upon by converting the elements into strings
function sortByRichest() {
  data = data.sort((a, b) => b.money - a.money);
  updateDOM();
}
//filter only millionaires
function showMillionaires() {
  data = data.filter((user) => user.money > 1000000);
  updateDOM();
}
//calculate all of the wealth
function calculateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);
  updateDOM();
  const wealthEl = document.createElement("div");
  wealthEl.innerHTML = `<h3> Total Wealth: <strong>${formatMoney(
    wealth
  )}</strong></h3>`;
  main.appendChild(wealthEl);
}
//create a clear all button.
function clearAll() {
  main.innerHTML = "<h2><strong>Person</strong>Wealth</h2>";
}
//I still have to work on the clear all button
//add new obj to data arr
function addData(obj) {
  data.push(obj);
  updateDOM();
}

//update DOM
function updateDOM(providedData = data) {
  //Clear Main div
  main.innerHTML = "<h2><strong>Person</strong>Wealth</h2>";
  //takes a callback function
  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong>${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}
//format number as money
function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}
//event listener
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMillionairesBtn.addEventListener("click", showMillionaires);
calculateWealthBtn.addEventListener("click", calculateWealth);
clearBtn.addEventListener("click", clearAll);

let inputName = document.querySelector(".name");
let inputAge = document.querySelector(".age");
let inputSalary = document.querySelector(".salary");
let inputPosition = document.querySelector(".position");
let buttons = document.querySelector(".button-controls").children;
let result = document.querySelector(".result-button");

let getFromLocalStorgeName = localStorage.getItem("lists");
let lists = JSON.parse(getFromLocalStorgeName) || [];

document.querySelector(".btn-check").addEventListener("click", checkItem);
document.querySelector(".btn-add").addEventListener("click", addItem);
document.querySelector(".btn-delete").addEventListener("click", deleteItem);
document.querySelector(".btn-show").addEventListener("click", showItem);

function validate() {
  // Space Equal Number
  if (!isNaN(inputName.value)) {
    result.innerHTML =
      "<span style='color: red;'>Please enter a valid name!</span>";
    return true;
  }
}
// localStorage.clear();

// If User Press Button Chick
function checkItem() {
  if (validate()) return;

  createSpan();
  result.classList.add("center");

  if (isFound()) result.append(" Was Found");
  else result.innerHTML += " Was<span style='color:red'>  Not Found </span>";
}

// If User Press Button Add
function addItem() {
  if (validate()) return;

  createSpan();
  result.classList.add("center");

  if (isFound())
    result.innerHTML += " Already <span style='color:red'>Exists</span>";
  else {
    let object = {
      name: inputName.value.trim().toLowerCase(),
      age: inputAge.value,
      salary: inputSalary.value,
      position: inputPosition.value,
    };
    lists.push(object);
    localStorage.setItem("lists", JSON.stringify(lists));
    result.append(" Aded Successfully");
    inputName.value = "";
    inputAge.value="";
    inputSalary.value="";
    inputPosition="";
    
  }
}

// If User Press Button Delete
function deleteItem() {
  if (validate()) return;

  createSpan();
  result.classList.add("center");

  if (isFound()) {
    // If Found Name Insid Any Object Will Return Index Of Object And Not Index Name
    let index = lists.findIndex(
      (list) =>
        inputName.value.trim().toLowerCase() === list.name.trim().toLowerCase(),
    );
    lists.splice(index, 1);

    localStorage.setItem("lists", JSON.stringify(lists));
    result.append(" been Deleted");
     inputName.value = "";
  } else result.innerHTML += " Was<span style='color:red'>  Not Found </span>";
}

// If User Press Button Show
function showItem() {
  if (validate()) return;

  // If Find User Will Return List(User) Otherwise  undefined
  let list = lists.find(
    (list) =>
      inputName.value.trim().toLowerCase() === list.name.trim().toLowerCase(),
  );

  if (list !== undefined) {
    //Remove  Center Class From  Built-in ul So Will Align To  Left
    result.classList.remove("center");
    result.innerHTML = "";
    let ul = document.createElement("ul");

    Object.entries(list).forEach(([key, value]) => {
      let li = document.createElement("li");
      li.textContent = `${key} : ${value}`;
      ul.append(li);
    });
    result.append(ul);
  } else {
    createSpan();
    result.innerHTML += " Was<span style='color:red'> Not Found </span>";
  }
}

// Create Tag Span
function createSpan() {
  let span = document.createElement("span");
  span.textContent = `"${inputName.value.trim()}"`;

  result.textContent = "Item ";
  result.append(span);
}

// Chick If User Found
function isFound() {
  // Return true Or false
  return lists.some(
    (list) =>
      inputName.value.trim().toLowerCase() === list.name.trim().toLowerCase(),
  );
}

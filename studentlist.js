"use strict";

const baseLink = "https://petlatkea.dk/2019/hogwarts/students.json";
const bloodStatusLink = "http://petlatkea.dk/2019/hogwarts/families.json";
window.addEventListener("DOMContentLoaded", init);

//student prototype(template)
const studentPro = {
  fullName: "-student name-",
  firstName: "-student first name-",
  lastName: "-student last name-",
  image: "-student image-",
  house: "-student house-",
  id: "-id-",
  bloodStatus: "-blood status-"
};

//myName prototype(template)
const myName = {
  fullName: "Yordanka Krasteva",
  firstName: "Yordanka",
  lastName: "Krasteva",
  image: "images/yordanka_k.png",
  house: "Gryffindor",
  bloodStatus: "muggle"
};

const arrayOfStudents = []; //an array used with the student prototype

function init() {
  //console.log("init");

  document
    .querySelector("#studentListContainer")
    .addEventListener("click", clickList);
  getFamily();
}

let jsonData;
function loadJSON() {
  // console.log("loadJSON");
  fetch(baseLink)
    .then(pro => pro.json())
    .then(myJson => {
      jsonData = myJson;
      createList(jsonData);
    });
}

/*******************blood status**************/
let bloodStatus = [];
let InquisitorSquad = [];

function getFamily() {
  fetch(bloodStatusLink)
    .then(pro => pro.json())
    .then(myJson => {
      jsonData = myJson;
      makeArrayOfFamily(jsonData);
    });
}

function makeArrayOfFamily(jsonData) {
  console.log(jsonData);
  bloodStatus = jsonData;
  loadJSON();
}

function checkBlood(lastName) {
  console.log(checkBlood);
}

/*******************add****************************/
function addStudent(student) {
  console.log(addStudent);

  if (event.target.value == "added") {
    let obj = InquisitorSquad.find(obj => obj === student);
    let po = InquisitorSquad.indexOf(obj);
    //InquisitorSquad.splice(po, 1);
    //event.target.value = "none";
    event.target.textContent = "Add to Inquisitor Squad";
  }
  if (student.house == "Slytherin" || student.bloodStatus == "pure") {
    InquisitorSquad.push(student);
    /*}
  if (student.house == "Gryffindor" || student.bloodStatus == "pure") {
    InquisitorSquad.push(student);
  }
  if (student.house == "Ravenclaw" || student.bloodStatus == "pure") {
    InquisitorSquad.push(student);
  }
  if (student.house == "Hufflepuff" || student.bloodStatus == "pure") {
    InquisitorSquad.push(student);*/

    event.target.textContent = "Remove from Inquisitor Squad";
    event.target.value = "added";
  } else {
    alert(
      "You are trying to add a student that doesn't belong to Slytherin or doesn't have pure blood."
    );
  }
}

function createList(studentList) {
  //console.log(bloodStatus);
  //console.log(studentList);
  arrayOfStudents.push(myName);
  studentList.forEach(element => {
    const id = uuidv4();
    //console.log('Student list 1: '+studentList);
    let student = Object.create(studentPro); //New object called "student" - Object.create() method creates a new object, using an existing object as the prototype of  create
    // newly created object

    const firstSpace = element.fullname.indexOf(" ");
    const lastSpace = element.fullname.lastIndexOf(" ");

    student.id = id;
    student.fullName = element.fullname;
    student.firstName = element.fullname.slice(0, firstSpace);
    student.lastName = element.fullname.slice(lastSpace + 1);
    student.image =
      "images/" +
      student.lastName.toLowerCase() +
      "_" +
      student.fullName.substring(0, 1).toLowerCase() +
      ".png";

    student.house = element.house;

    if (bloodStatus.half.includes(student.lastName)) {
      student.bloodStatus = "half";
    } else if (bloodStatus.pure.includes(student.lastName)) {
      student.bloodStatus = "pure";
    } else {
      student.bloodStatus = "muggle";
    }

    arrayOfStudents.push(student);

    displayList(arrayOfStudents);
  });
}

function displayList(arr) {
  //console.log(arr);
  //console.log(arrayOfStudents);
  //console.log(displayList);
  document.querySelector("#studentListContainer").innerHTML = "";
  arr.forEach(displayStudent);
}
function displayStudent(student) {
  //console.log(student);
  //console.log(student.image)

  const template = document.querySelector("#studentTemplate").content;
  const clone = template.cloneNode(true);

  clone.querySelector("[data-action=remove]").id = student.id;
  clone.querySelector(".firstName").textContent = student.firstName;
  clone.querySelector(".lastName").textContent = student.lastName;
  clone.querySelector(".house").textContent = student.house;
  clone.querySelector(".family").textContent = student.bloodStatus;

  //clone.querySelector(".image img").setAttribute("src", student.image);
  clone
    .querySelector("#selectorForModal")
    .addEventListener("click", () => showOneStudent(student));
  clone
    .querySelector(".add")
    .addEventListener("click", () => addStudent(student));
  //console.log(student.firstname);
  //clone
  //.querySelector("[data-action=remove]")
  //.addEventListener("click", removeStudent);

  document.querySelector("#studentListContainer").appendChild(clone);
}

displayList(arrayOfStudents);

/***********************filtering******************************/

let filteredList = arrayOfStudents;
//console.log(filteredList);

document.querySelector("#gryffindor").addEventListener("click", function() {
  filteredList = arrayOfStudents.filter(function(student) {
    return student.house === "Gryffindor";
  });
  displayList(filteredList);
});
document.querySelector("#hufflepuff").addEventListener("click", function() {
  filteredList = arrayOfStudents.filter(function(student) {
    return student.house === "Hufflepuff";
  });
  displayList(filteredList);
});
document.querySelector("#ravenclaw").addEventListener("click", function() {
  filteredList = arrayOfStudents.filter(function(student) {
    return student.house === "Ravenclaw";
  });
  displayList(filteredList);
});
document.querySelector("#slytherin").addEventListener("click", function() {
  filteredList = arrayOfStudents.filter(function(student) {
    return student.house === "Slytherin";
  });
  displayList(filteredList);
});
document.querySelector("#all").addEventListener("click", function() {
  filteredList = arrayOfStudents;
  displayList(filteredList);
});

/*******************sorting********************/

document.querySelector("#firstName").addEventListener("click", sortByFirstName);
document.querySelector("#lastName").addEventListener("click", sortByLastName);
document.querySelector("#house").addEventListener("click", sortByHouse);

let sortedList = arrayOfStudents;
displayList(sortedList);
//console.log(sortedList);

document.querySelector("#All").addEventListener("click", function() {
  sortedList = arrayOfStudents;
  displayList(sortedList);
});

function sortByFirstName() {
  function sort(a, b) {
    if (a.firstName < b.firstName) {
      return -1;
    } else {
      return 1;
    }
  }
  sortedList.sort(sort);
  document.querySelector("#studentListContainer").innerHTML = "";
  displayList(sortedList);
  //console.log(sortedList);
}

function sortByLastName() {
  function sort(a, b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  }
  sortedList.sort(sort);
  document.querySelector("#studentListContainer").innerHTML = "";
  displayList(sortedList);
  //console.log(sortedList);
}

function sortByHouse() {
  function sort(a, b) {
    if (a.house < b.house) {
      return -1;
    } else {
      return 1;
    }
  }
  sortedList.sort(sort);
  document.querySelector("#studentListContainer").innerHTML = "";
  displayList(sortedList);
  //console.log(sortedList);
  //console.table(sort);
}

/***************modal*********************/

function showOneStudent(student) {
  //console.log("showOneStudent");
  //console.log(student.image);

  const modal = document.querySelector(".modal");

  modal.querySelector(".studentImage").src = student.image;
  modal.querySelector(".name span").textContent = student.fullName;
  modal.querySelector(".house").textContent = student.house;
  modal.querySelector(".family").textContent = student.bloodStatus;

  if (student.house == "Gryffindor") {
    modal.querySelector(".modal-content").classList.add("gryffindor");
  } else {
    modal.querySelector(".modal-content").classList.remove("gryffindor");
  }

  if (student.house == "Hufflepuff") {
    modal.querySelector(".modal-content").classList.add("hufflepuff");
  } else {
    modal.querySelector(".modal-content").classList.remove("hufflepuff");
  }

  if (student.house == "Ravenclaw") {
    modal.querySelector(".modal-content").classList.add("ravenclaw");
  } else {
    modal.querySelector(".modal-content").classList.remove("ravenclaw");
  }

  if (student.house == "Slytherin") {
    modal.querySelector(".modal-content").classList.add("slytherin");
  } else {
    modal.querySelector(".modal-content").classList.remove("slytherin");
  }

  modal.classList.remove("hide");
  modal.addEventListener("click", () => modal.classList.add("hide"));
}

/***********************expeling**************************/

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function clickList(event) {
  if (event.target.tagName === "BUTTON") {
    clickRemove(event);

    console.log(event.target.id);
  }
}

function clickRemove(event) {
  function findById(id) {
    return arrayOfStudents.findIndex(obj => obj.id === id);
  }

  let toBeRemoved = findById(event.target.id);
  console.log(event.path[1].id);
  if (event.path[1].id === "Yordanka") {
    alert("You can't expell the student right now. Please try again later. ");
  } else {
    arrayOfStudents.splice(toBeRemoved, 1);

    console.log(toBeRemoved);
    displayList(arrayOfStudents);
  }
}

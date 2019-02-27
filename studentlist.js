"use strict";

const baseLink = "http://petlatkea.dk/2019/students1991.json";
window.addEventListener("DOMContentLoaded", init);
const studentPro = {
  //student prototype(template)
  fullName: "-student name-",
  firstName: "-student first name-",
  lastName: "-student last name-",
  image: "-student image-",
  house: "-student house-"
};

const arrayOfStudents = []; //an array used with the student prototype
//const arrayOfHouses = [];

function init() {
  console.log("init");
  loadJSON();
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

function createList(studentList) {
  studentList.forEach(element => {
    //console.log('Student list 1: '+studentList);
    let student = Object.create(studentPro); //New object called "student" - Object.create() method creates a new object, using an existing object as the prototype of  create
    // newly created object

    const firstSpace = element.fullname.indexOf(" ");
    const lastSpace = element.fullname.lastIndexOf(" ");

    student.fullName = element.fullname;
    student.firstName = element.fullname.slice(0, firstSpace);
    student.lastName = element.fullname.slice(lastSpace + 1);
    //student.firstName = element.firstName;
    //student.lastName = element.lastName;
    student.image =
      "images/" +
      student.lastName.toLowerCase() +
      "_" +
      student.fullName.substring(0, 1).toLowerCase() +
      ".png";

    student.house = element.house;
    arrayOfStudents.push(student);
    //console.log(student);

    //console.log(arrayOfStudents);

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

  //clone.addEventListener("click", () => showOneStudent(student));

  clone.querySelector(".firstName span").textContent = student.firstName;
  clone.querySelector(".lastName span").textContent = student.lastName;
  clone.querySelector(".house span").textContent = student.house;
  clone.querySelector(".image img").setAttribute("src", student.image);
  //console.log(student.firstname);
  document.querySelector("#studentListContainer").appendChild(clone);
}

displayList(arrayOfStudents);

/***********************filtering******************************/

let filteredList = arrayOfStudents;
console.log(filteredList);

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
console.log(sortedList);

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
  console.log(sortedList);
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
  console.log(sortedList);
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
  console.log(sortedList);
  console.table(sort);
}

/***************modal*********************/

function showOneStudent(student) {
  console.log(student);

  const modal = document.querySelector(".modal");
  modal.querySelector(".modal-content").id = student.fullname;
  modal.querySelector(".studentImage").src = student.image;
  modal.querySelector(".name span").textContent = student.fullname;
  modal.querySelector(".house").textContent = student.house;
  if (student.house == "Gryffindor") {
    modal.querySelector(".modal-content").classList.add("Gryffindor");
  } else {
    modal.querySelector(".modal-content").classList.remove("Gryffindor");
  }

  if (student.house == "Hufflepuff") {
    modal.querySelector(".modal-content").classList.add("Hufflepuff");
  } else {
    modal.querySelector(".modal-content").classList.remove("Hufflepuff");
  }

  if (student.house == "Ravenclaw") {
    modal.querySelector(".modal-content").classList.add("Ravenclaw");
  } else {
    modal.querySelector(".modal-content").classList.remove("Ravenclaw");
  }

  if (student.house == "Slytherin") {
    modal.querySelector(".modal-content").classList.add("Slytherin");
  } else {
    modal.querySelector(".modal-content").classList.remove("Slytherin");
  }

  modal.classList.remove("hide");
  modal.addEventListener("click", () => modal.classList.add("hide"));
}

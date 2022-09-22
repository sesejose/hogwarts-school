"use strict";

//Loading and callingback the function start.
window.addEventListener("DOMContentLoaded", start);

// MODEL ////////////////////////////

//Global variables
const url = "https://petlatkea.dk/2021/hogwarts/students.json";
//Creating an Array to be filled with all the Objects (Students).
let arrStudents = [];
//Then I create the PROTOTYPE as a variable for that object named Student.
const Student = {
  firstName: "",
  middleName: "",
  lastName: "",
  nickName: "",
  house: "",
  colorHouse: "",
  image: "",
  bloodStatus: "",
  bloodIcon: "",
  prefect: false,
  prefectIcon: "",
  squad: false,
  squadIcon: "",
  gender: "",
};

//New array with prefects
let arrPrefects = [];
let prefect;
//Variables used by the Student Modal
const shield = document.querySelector(".responsibility-container .shield");
const remove = document.querySelector(".responsibility-container .remove");
const iconShield = "assets/icons/bi_shield-shaded.svg";
const iconSquad = "assets/icons/mdi_alpha-i-circle.svg";

// function start() {
//   fetch(url)
//     .then((response) => response.json())
//     .then((jsonData) => {
//       prepareData(jsonData);
//     });
// }

function start() {
  console.log("ready");
  //Add event listeners to filter and sort buttons
  buttonsFilterSort();
  loadJSON();
}

//forsEach filter button / Called back from start
function buttonsFilterSort() {
  document.querySelectorAll("[data-action='filter']").forEach((buttonFilter) => buttonFilter.addEventListener("click", selectfilter));
  document.querySelectorAll("[data-action='sort']").forEach((buttonSort) => buttonSort.addEventListener("click", selectSort));
}

async function loadJSON() {
  const response = await fetch(url);
  const jsonData = await response.json();
  //When loaded prepare data
  prepareData(jsonData);
}

function prepareData(jsonData) {
  arrStudents = jsonData.map(prepareObject);
  //Display New List
  displayList(arrStudents);
  //Amount of students in the list
  const amountArrStudents = arrStudents.length;
  document.querySelector("span").textContent = amountArrStudents;
  console.log(amountArrStudents);
}

function prepareObject(jsonObject) {
  const student = Object.create(Student); //Create the student object.
  console.log("34:", student);
  console.log("Arr:", arrStudents);
  // Removing white spaces
  //Cleaning the JSON and defining the properties for the student object.
  const fullname = jsonObject.fullname.trim();
  const gender = jsonObject.gender.trim(); //Return a string wit removed white spaces.
  const house = jsonObject.house.trim(); //Return a string wit removed white spaces.
  //Split fullname in Array of strings
  const spaces = fullname.split(" "); // fron 0 from the begining to the first white space.
  // Defining first name
  student.firstName = spaces[0].substring(0, 1).toUpperCase() + spaces[0].substring(1).toLowerCase();
  //Defining Middle, Last and Nick Names.
  if (spaces.length === 3) {
    student.middleName = spaces[1].substring(0, 1).toUpperCase() + spaces[1].substring(1).toLowerCase();
    student.lastName = spaces[2].substring(0, 1).toUpperCase() + spaces[2].substring(1).toLowerCase();
    if (student.middleName.startsWith('"')) {
      student.nickName = student.middleName.slice(1, -1).substring(0, 1).toUpperCase() + student.middleName.slice(1, -1).substring(1).toLowerCase();
      student.middleName = null; //When nickName is replaced define that middle Name as null.
    } else {
      student.nickName = undefined;
    }
  }
  if (spaces.length === 2) {
    student.middleName = undefined;
    student.lastName = spaces[1].substring(0, 1).toUpperCase() + spaces[1].substring(1).toLowerCase();
    student.nickName = undefined;
  }
  if (spaces.length === 1) {
    student.middleName = null;
    student.lastName = "";
    student.nickName = undefined;
  }
  //Defining gender
  student.gender = gender;
  //Defining house
  student.house = house.substring(0, 1).toUpperCase() + house.substring(1).toLowerCase();
  //Charging image
  let imagePath = student.lastName.toLowerCase() + "_" + student.firstName.toLowerCase().substring(0, 1) + ".png";
  student.image = "images/" + `${imagePath}`;
  //Defining color house
  let colorHouse;
  if (student.house === "Slytherin") {
    colorHouse = "#F1C40F";
  }
  if (student.house === "Gryffindor") {
    colorHouse = "#D35400";
  }
  if (student.house === "Hufflepuff") {
    colorHouse = "#28B463";
  }
  if (student.house === "Ravenclaw") {
    colorHouse = "#2E86C1";
  }
  student.colorHouse = colorHouse;

  //Defining Responsibility
  student.prefect = false;
  //Defining Responsibility
  student.squad = false;

  //Creating Array of objects
  arrStudents.push(student);

  return student;
}

//CONTROLER ///////////////////////////

// Filter by Houses / Called back from buttonsFilterSort
function selectfilter(event) {
  const filter = event.target.dataset.filter; //data-action
  console.log(`user selected: ${filter}`);
  filterHouses(filter);
}
// Sort by Names / Called back from buttonsFilterSort
function selectSort(event) {
  const sort = event.target.dataset.sort; //data-action
  const sortDir = event.target.dataset.sortDirection;
  //Toogle the direction !
  if (sortDir === "asc") {
    event.target.dataset.sortDirection = "desc";
  } else {
    event.target.dataset.sortDirection = "asc";
  }
  console.log(`user selected: ${sort} - ${sortDir}`);
  // sorByProperty(sort);
  sortStudents(sort, sortDir);
}

//Filter by House
function filterHouses(houseName) {
  let filteredHouses = arrStudents;

  if (houseName === "Slytherin") {
    //Create a list with Slytherin houses
    filteredHouses = arrStudents.filter(isS);
  } else if (houseName === "Hufflepuff") {
    //Create a list with Slytherin houses
    filteredHouses = arrStudents.filter(isH);
  } else if (houseName === "Ravenclaw") {
    //Create a list with Slytherin houses
    filteredHouses = arrStudents.filter(isR);
  } else if (houseName === "Gryffindor") {
    //Create a list with Slytherin houses
    filteredHouses = arrStudents.filter(isG);
  }

  displayList(filteredHouses);

  const houseStudents = filteredHouses.length;
  document.querySelector("span").textContent = houseStudents;
  console.log(houseStudents);
}

function isS(student) {
  if (student.house === "Slytherin") {
    return true;
  } else {
    return false;
  }
}

function isH(student) {
  if (student.house === "Hufflepuff") {
    return true;
  } else {
    return false;
  }
}

function isR(student) {
  if (student.house === "Ravenclaw") {
    return true;
  } else {
    return false;
  }
}

function isG(student) {
  if (student.house === "Gryffindor") {
    return true;
  } else {
    return false;
  }
}

//Sort
//This function down here WORKS I can also use it with filters!
//Just remember to update the call back function in selectFilter or selectSort functions.
function sortStudents(sortBy, sortDir) {
  let sortedProperties = arrStudents;
  let direction = 1;
  if (sortDir === "desc") {
    direction = -1;
  } else {
    direction = 1;
  }
  //Closure function because use the parameter sortBy
  sortedProperties = sortedProperties.sort(sortByProperty);
  function sortByProperty(studentA, studentB) {
    if (studentA[sortBy] < studentB[sortBy]) {
      return -1 * direction;
    } else {
      return 1 * direction;
    }
  }
  displayList(sortedProperties);
}

// //Sort by Property

// function sorByProperty(sortBy) {
//   let sortedProperties = arrStudents;

//   if (sortBy === "firstName") {
//     sortedProperties.sort(sortByFirstName);
//   } else if (sortBy === "lastName") {
//     sortedProperties.sort(sortByLastName);
//   } else if (sortBy === "house") {
//     sortedProperties.sort(sortByHouse);
//   }

//   displayList(sortedProperties);
// }

// function sortByFirstName(studentA, studentB) {
//   if (studentA.firstName < studentB.firstName) {
//     return -1;
//   } else {
//     return 1;
//   }
// }

// function sortByLastName(studentA, studentB) {
//   if (studentA.lastName < studentB.lastName) {
//     return -1;
//   } else {
//     return 1;
//   }
// }

// function sortByHouse(studentA, studentB) {
//   if (studentA.house < studentB.house) {
//     return -1;
//   } else {
//     return 1;
//   }
// }

// Filter by Responsibility
//Filter by Expelled
//Filter by Enrolled

// VIEW ///////////////////////////////////////////
function displayList(arrStudents) {
  //Clear the list
  document.querySelector("#parent-desktop tbody").innerHTML = "";
  document.querySelector("#parent-mobile").innerHTML = "";

  //Build a new table
  arrStudents.forEach(displayStudent);
}

function displayStudent(student) {
  // Desktop template
  const template = document.querySelector("#table-template").content;
  const clone = template.cloneNode(true);
  clone.querySelector(".photo img").src = student.image;
  clone.querySelector("[data-field=firstname]").textContent = student.firstName;
  clone.querySelector("[data-field=middlename]").textContent = student.middleName;
  clone.querySelector("[data-field=lastname]").textContent = student.lastName;
  clone.querySelector("[data-field=nickname]").textContent = student.nickName;
  clone.querySelector("[data-field=house]").textContent = student.house;
  clone.querySelector(".color-house").style.backgroundColor = student.colorHouse;
  // clone.querySelector("[data-field=prefect] p").textContent = "";
  clone.querySelectorAll("[data-action='add']").forEach((add) => add.addEventListener("click", addPrefect));

  function addPrefect(event) {
    console.log(event);
    // const addPrefect = event.target.dataset.add; //Dataset is the data-action (?)
    // console.log(`user has clicked ${addPrefect}`);
    // addPrefect(student);
    if (student.prefect === true) {
      student.prefect = false;
    } else {
      student.prefect = true;
    }
  }

  //Prefect

  if (student.prefect === true) {
    console.log("Prefect");
  } else {
    console.log("No Prefect");
  }

  // Open / Display Modal Student
  clone.querySelector(".open").addEventListener("click", () => {
    openModal();
    //Modal Student
    document.querySelector(".fullname .firstname").textContent = student.firstName;
    document.querySelector(".fullname .middlename").textContent = student.middleName;
    document.querySelector(".fullname .lastname").textContent = student.lastName;
    document.querySelector(".fullname .nickname").textContent = student.nickName;
    document.querySelector(".gender-container .gender-status").textContent = student.gender;
    document.querySelector(".house-container .house-name").textContent = student.house;
    document.querySelector(".house-container .house-color").style.backgroundColor = student.colorHouse;
    //Prefect
    // document.querySelector(".responsibility-container .add").addEventListener("click", addPrefect);
    // document.querySelector(".responsibility-container .remove").addEventListener("click", removePrefect);
    //Squad
    document.querySelector(".squad-container .yes").textContent = "No";
    document.querySelector(".squad-container .i").classList.add("hiden");
    document.querySelector(".squad-container .remove").classList.add("hiden");
    //Close Student Modal
    document.querySelector(".close").addEventListener("click", closeModal);

    // //Hide Prefect
    // function hidePrefect() {
    //   //Hide remove button
    //   document.querySelector(".responsibility-container .add").classList.remove("hiden");
    //   document.querySelector(".responsibility-container .remove").classList.add("hiden");
    //   document.querySelector(".responsibility-container .prefect").textContent = "No";
    //   document.querySelector(".responsibility-container .shield").classList.add("hiden");
    // }

    // //Prefect Modal
    // if (student.prefect === true) {
    //   document.querySelector(".responsibility-container .prefect").textContent = "Prefect";
    //   document.querySelector(".responsibility-container .prefect").textContent = "Prefect";
    //   document.querySelector(".responsibility-container .add").classList.add("hiden");
    //   document.querySelector(".responsibility-container .remove").classList.remove("hiden");
    //   document.querySelector(".responsibility-container .shield").classList.remove("hiden");
    // } else {
    //   document.querySelector(".responsibility-container .prefect").textContent = "No";
    // }
  });

  //Append Template Desktop
  const parent = document.querySelector("#parent-desktop tbody");
  parent.appendChild(clone);

  // Mobile Template
  const templateMobile = document.querySelector("#mobile-template").content;
  const cloneMobile = templateMobile.cloneNode(true);
  cloneMobile.querySelector(".pic-container .photo img").src = student.image;
  cloneMobile.querySelector(".name-container .firstname").textContent = student.firstName;
  cloneMobile.querySelector(".name-container .middlename").textContent = student.middleName;
  cloneMobile.querySelector(".name-container .lastname").textContent = student.lastName;
  cloneMobile.querySelector(".name-container .nickname").textContent = student.nickName;
  cloneMobile.querySelector(".house-container .housename").textContent = student.house;
  cloneMobile.querySelector(".house-container .color-house").style.backgroundColor = student.colorHouse;
  cloneMobile.querySelector(".prefect-icon").classList.add("hiden");
  cloneMobile.querySelector(".i-icon").classList.add("hiden");
  // //Prefect Mobile
  // if (student.prefect === true) {
  //   // //In mobile
  //   cloneMobile.querySelector(".prefect-icon").classList.remove("hiden");
  // } else {
  //   cloneMobile.querySelector(".prefect-icon").classList.add("hiden");
  // }

  const parentMobile = document.querySelector("#parent-mobile");
  parentMobile.appendChild(cloneMobile);
}

//Open Student Modal
function openModal() {
  document.querySelector("#student-modal").classList.remove("hiden");
}
//Close Student Modal
function closeModal() {
  document.querySelector("#student-modal").classList.add("hiden");
}

//Add Responsibility

//Search
// const searchBar = document.querySelector("#search-field");
// //Select input field
// searchBar.addEventListener("keyup", searchStudent);
// //By typing user calls the function
// function searchStudent(e) {
//   const text = e.target.value.substring(0, 1).toUpperCase() + e.target.value.substring(1).toLowerCase();
//   //The function identify the target and convertes it to Lower Case ..
//   // console.log(text);
//   arrStudents.forEach(function (student) {
//     //Evaluates if the object in the array has the same value
//     if (student.firstName.value === text.value) {
//       const filterName = arrStudents.filter(isName);
//       displayList(filterName);
//     } else {
//       console.log("doesn't work!");
//     }
//   });
// }

// function isName(student) {
//   const inputValue = document.getElementById("search-field").value;
//   if (student.firstName === inputValue.value) {
//     return true;
//   } else {
//     return false;
//   }
// }

//console.log(fullname);
// console.log(spaces);
// console.log(student.firstName);
// console.log(student.middleName);
// console.log(student.lastName);
// console.log(student.nickName);
// console.log(student.gender);
// console.log(student.house);
// console.log(arrStudents);
// console.log(student.image);

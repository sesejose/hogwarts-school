"use script";

//Loading and callingback the function start.
window.addEventListener("DOMContentLoaded", start);

// MODEL
//Global variables
const url = "https://petlatkea.dk/2021/hogwarts/students.json";
//Creating an Array to be filled with all the Objects (Students).
const arrStudents = [];
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
  prefect: "",
  squad: "",
  gender: "",
};

//Start after loading the content in the DOM
function start() {
  fetch(url) //Url parameter referes to the global variable JSON
    .then((response) => response.json())
    .then((jsonData) => {
      // .then starts with a "." because is a method that iniciates.
      //Arrow function with a argument refering to JSON data, then brackets to close the function.
      prepareData(jsonData); // Callback to the function prepareData with the same argument that the previous function to show the data.

      displayList(arrStudents);
    });
}
//Creating the object "Student"
function prepareData(jsonData) {
  console.log(jsonData);
  jsonData.forEach((jsonObject) => {
    let student = Object.create(Student); //Create the student object.
    console.log(student);
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
    let prefect;
    //There are 2 classes Prefect+Remove and Student+Add

    //Creating Array of objects
    arrStudents.push(student);
  });
  //Display Template / Objects in the DOM
}

function displayList(arrStudents) {
  //Clear the list
  document.querySelector("#parent-desktop tbody").innerHTML = "";
  //Build a new table
  arrStudents.forEach(displayStudent);
}

// VIEW

function displayStudent(student) {
  const template = document.querySelector("#table-template").content;
  const clone = template.cloneNode(true);
  clone.querySelector(".photo img").src = student.image;
  clone.querySelector("[data-field=firstname]").textContent = student.firstName;
  clone.querySelector("[data-field=middlename]").textContent = student.middleName;
  clone.querySelector("[data-field=lastname]").textContent = student.lastName;
  clone.querySelector("[data-field=nickname]").textContent = student.nickName;
  clone.querySelector("[data-field=house]").textContent = student.house;
  clone.querySelector(".color-house").style.backgroundColor = student.colorHouse; //Call a function with a parameter that returns the value
  // clone.querySelector("[data-field=prefect] p").textContent = student.prefect; //Call a function with a parameter that returns the value
  // clone.querySelector("[data-field=squad]").textContent = student.squad; //Call a function with a parameter that returns the value
  // clone.querySelector("[data-field=enrollement]").textContent = ;

  const parent = document.querySelector("#parent-desktop tbody");
  parent.appendChild(clone);

  // Mobile

  const templateMobile = document.querySelector("#mobile-template").content;
  const cloneMobile = templateMobile.cloneNode(true);
  cloneMobile.querySelector(".photo img").src = student.image;
  cloneMobile.querySelector(".firstname").textContent = student.firstName;
  cloneMobile.querySelector(".middlename").textContent = student.middleName;
  cloneMobile.querySelector(".lastname").textContent = student.lastName;
  cloneMobile.querySelector(".nickname").textContent = student.nickName;
  cloneMobile.querySelector(".housename").textContent = student.house;
  cloneMobile.querySelector(".color-house").style.backgroundColor = student.colorHouse; //Call a function with a parameter that returns the value
  // clone.querySelector("[data-field=prefect] p").textContent = student.prefect; //Call a function with a parameter that returns the value
  // clone.querySelector("[data-field=squad]").textContent = student.squad; //Call a function with a parameter that returns the value
  const parentMobile = document.querySelector("#parent-mobile");
  parentMobile.appendChild(cloneMobile);
}

//Search
const searchBar = document.querySelector("#search-field");
//Select input field
searchBar.addEventListener("keyup", searchStudent);
//By typing user calls the function
function searchStudent(e) {
  const text = e.target.value.substring(0, 1).toUpperCase() + e.target.value.substring(1).toLowerCase();
  //The function identify the target and convertes it to Lower Case ..
  // console.log(text);
  arrStudents.forEach(function (student) {
    //Evaluates if the object in the array has the same value
    if (student.firstName.value === text.value) {
      const filterName = arrStudents.filter(isName);
      displayList(filterName);
    } else {
      console.log("doesn't work!");
    }
  });
}

function isName(student) {
  const inputValue = document.getElementById("search-field").value;
  if (student.firstName === inputValue.value) {
    return true;
  } else {
    return false;
  }
}

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

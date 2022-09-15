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
    });
}
//Creating the object "Student"
function prepareData(jsonData) {
  console.log(jsonData);
  jsonData.forEach((jsonObject) => {
    let student = Object.create(Student); //Create the student object.
    console.log(student);

    //Cleaning the JSON and defining the properties for the student object.
    definingProperties();

    function definingProperties() {
      // Removing white spaces
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
      student.image = "./images/" + `${imagePath}`;
      //Creating Array of objects
      arrStudents.push(student);
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
    console.log(student.image);
  });
}

"use strict";

//Loading and callingback the function start.
window.addEventListener("DOMContentLoaded", start);

// MODEL ////////////////////////////

//Global variables
const url = "https://petlatkea.dk/2021/hogwarts/students.json";
const urlBlood = "https://petlatkea.dk/2021/hogwarts/families.json";
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
  prefect: false,
  squad: false,
  expelled: false,
  gender: "",
};

//Prototype Jose
const Jose = {
  firstName: "",
  middleName: "",
  lastName: "",
  nickName: "",
  house: "",
  colorHouse: "",
  image: "",
  bloodStatus: "",
  prefect: false,
  squad: false,
  expelled: false,
  gender: "",
};

//Array expelled Students
let arrExpelled = [];

//Protorype for the pures blood family
const PureObj = {
  lastName: "",
  bloodStatus: "",
};
//Prototype for the half blood family
const HalfObj = {
  lastName: "",
  bloodStatus: "",
};
//Creating the Arrays to be filled with all the Objects (Blood Status).
let arrPure = [];
let arrHalf = [];

//New array with prefects
let arrPrefects = [];
// let prefect;
//Variables used by the Student Modal
// const shield = document.querySelector(".responsibility-container .shield");
// const remove = document.querySelector(".responsibility-container .remove");
const iconShield = "assets/icons/bi_shield-fill-check.svg";
const iconSquad = "assets/icons/mdi_alpha-i-circle.svg";

// function start() {
//   fetch(url)
//     .then((response) => response.json())
//     .then((jsonData) => {
//       prepareData(jsonData);
//     });
// }

// Start
function start() {
  console.log("ready");
  // Add event listeners to filter and sort buttons
  buttonsFilterSort();
  search();
  loadJSON();
}

// forsEach filter button / Called back from start
function buttonsFilterSort() {
  document.querySelectorAll("[data-action='filter']").forEach((buttonFilter) => buttonFilter.addEventListener("click", selectfilter));
  document.querySelectorAll("[data-action='sort']").forEach((buttonSort) => buttonSort.addEventListener("click", selectSort));
}

async function loadJSON() {
  const response = await fetch(url);
  const jsonData = await response.json();
  //When loaded prepare data
  prepareData(jsonData);
  console.log(jsonData); //This is an orray of objects
}

function prepareData(jsonData) {
  arrStudents = jsonData.map(prepareObject);

  displayList(arrStudents);

  const amountArrStudents = arrStudents.length;
  document.querySelector("span").textContent = amountArrStudents;
  document.querySelector(".title h1").textContent = "All Hogwarts School students";
  console.log(amountArrStudents);
}

function prepareObject(jsonObject) {
  const student = Object.create(Student); //Create the student object.
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

  // Blood status

  loadJSONBlood();

  async function loadJSONBlood() {
    const response = await fetch(urlBlood);
    const jsonDataBlood = await response.json();
    // prepareDataBlood(jsonDataBlood);
    // console.log(jsonDataBlood); // But this is an object - with properties: arrays
    student.bloodStatus = compareObjects(jsonDataBlood);
  }

  function compareObjects(jsonDataBlood) {
    if (jsonDataBlood.pure.includes(student.lastName) == true) {
      return "Pureblood";
    } else {
      jsonDataBlood.half.includes(student.lastName) == true;
      return "Halfblood";
    }
  }

  // function prepareDataBlood(jsonDataBlood) {
  //   const arrLastNamesPure = Object.values(jsonDataBlood.pure);
  //   // console.log(arrLastNamesPure);
  //   const arrLastNamesHalf = Object.values(jsonDataBlood.half);
  //   // console.log(arrLastNamesHalf);
  //   arrPure = arrLastNamesPure.map(preparePureObj);
  //   arrHalf = arrLastNamesHalf.map(prepareHalfObj);
  // }

  // //Defining the Pure object
  // function preparePureObj(lastnames) {
  //   const pureObj = Object.create(PureObj); //Create the Pure object.
  //   // console.log(lastnames);
  //   pureObj.lastName = lastnames;
  //   pureObj.bloodStatus = "Pure";
  //   // console.log(pureObj);
  //   return pureObj;
  // }

  // //Defining the Half object
  // function prepareHalfObj(lastnames) {
  //   const halfObj = Object.create(HalfObj); //Create the Pure object.
  //   // console.log(arrPureObj);
  //   halfObj.lastName = lastnames;
  //   halfObj.bloodStatus = "Half";
  //   // console.log(halfObj);
  //   return halfObj;
  // }

  // compareObjects();
  // function compareObjects() {
  //   const pureObj = preparePureObj;
  //   const halfObj = prepareHalfObj;
  //   console.log(pureObj, HalfObj);
  //  if(....) but still not working ..
  // }

  // function displayListBloodStatus(arrPure, arrHalf) {
  //   console.table("Display List Of Pure and Half Arrays Works!");
  // }

  //////////////////////////////////////////////////////////

  //Creating Array of objects
  arrStudents.push(student);

  return student;
}

//CONTROLER ///////////////////////////

// Search
function search() {
  const searchBar = document.getElementById("search-field");
  searchBar.addEventListener("keyup", (event) => {
    const text = event.target.value.substring(0, 1).toUpperCase() + event.target.value.substring(1).toLowerCase();
    const filteredStudents = arrStudents.filter((student) => {
      return student.firstName.includes(text) || student.lastName.includes(text);
    });
    // console.log(filteredStudents);
    displayList(filteredStudents);
  });
}

// Filter Selected
function selectfilter(event) {
  const filter = event.target.dataset.filter; //data-action
  console.log(`user selected: ${filter}`);
  filterStudents(filter);
}
// Sort by Names / function Called back from buttonsFilterSort
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

// Filter Students
function filterStudents(param) {
  let filteredStudents = arrStudents;

  if (param === "Slytherin") {
    //Create a list with Slytherin houses
    filteredStudents = arrStudents.filter(isS);
    // displayList(filteredStudents);
  } else if (param === "Hufflepuff") {
    //Create a list with Slytherin houses
    filteredStudents = arrStudents.filter(isH);
    // displayList(filteredStudents);
  } else if (param === "Ravenclaw") {
    //Create a list with Slytherin houses
    filteredStudents = arrStudents.filter(isR);
    // displayList(filteredStudents);
  } else if (param === "Gryffindor") {
    //Create a list with Slytherin houses
    filteredStudents = arrStudents.filter(isG);
  } else if (param === true) {
    filteredStudents = arrStudents.filter(isPrefect);
  } else if (param === true) {
    filteredStudents = arrStudents.filter(isAll);
  } else if (param === "expelled") {
    filteredStudents = arrExpelled;
    // filteredStudents = arrExpelled.filter(isExpelled);
  }

  displayList(filteredStudents);

  const number = filteredStudents.length;
  document.querySelector("span").textContent = number;
  document.querySelector(".title h1").textContent = `${param} students`.substring(0, 1).toUpperCase(0, 1) + `${param} students`.substring(1).toLocaleLowerCase(1);
  console.log(arrExpelled);
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

function isPrefect(student) {
  if (student.prefect === true) {
    return true;
  } else {
    return false;
  }
}

function isAll(student) {
  if (student) {
    return true;
  } else {
    return false;
  }
}

// Sort
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

// // Sort by Property - A not generic function!

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

  // Prefect Desktop
  if (student.prefect === false) {
    clone.querySelector("[data-field=prefect] .add").classList.remove("hiden");
    clone.querySelector("[data-field=prefect] .add").addEventListener("click", clickPrefect);
    clone.querySelector("[data-field=prefect] .remove").classList.add("hiden");
    clone.querySelector("[data-field=prefect] .pr").textContent = "None";
    clone.querySelector("[data-field=prefect] img").src = "";
  } else if (student.prefect === true) {
    clone.querySelector("[data-field=prefect] .add").classList.add("hiden");
    clone.querySelector("[data-field=prefect] .remove").classList.remove("hiden");
    clone.querySelector("[data-field=prefect] .remove").addEventListener("click", clickPrefect);
    clone.querySelector("[data-field=prefect] .pr").textContent = "Prefect";
    clone.querySelector("[data-field=prefect] img").src = iconShield;
  }

  // Prefect Desktop
  function clickPrefect() {
    let arrPrefects = arrStudents;
    prefectState(arrPrefects);
  }
  // Prefect Desktop
  function prefectState(arrPrefects) {
    if (student.prefect === true) {
      student.prefect = false;
    } else {
      student.prefect = true;
    }

    displayList(arrPrefects);
  }

  // addOnlyFour();

  // // Prefect Desktop Allowed Amount
  // function addOnlyFour() {
  //   const amountPrefects = arrStudents.filter((student) => student.prefect === true).length;
  //   const amountSlytherin = arrStudents.filter((student) => student.house === "Slytherin");
  //   const amountHufflepuff = arrStudents.filter((student) => student.house === "Hufflepuff");
  //   const amountGryffindor = arrStudents.filter((student) => student.house === "Gryffindor");
  //   const amountRavenclaw = arrStudents.filter((student) => student.house === "Ravenclaw");

  //   if (amountPrefects <= 3) {
  //     clone.querySelectorAll("[data-field=prefect] .add").forEach((state) => state.removeEventListener("click", loadReachAmount));
  //     clone.querySelectorAll("[data-field=prefect] .add").forEach((state) => state.addEventListener("click", clickPrefect));
  //     clone.querySelectorAll("[data-field=prefect] .remove").forEach((state) => state.addEventListener("click", clickPrefect));
  //   } else {
  //     clone.querySelectorAll("[data-field=prefect] .add").forEach((state) => state.removeEventListener("click", clickPrefect));
  //     clone.querySelectorAll("[data-field=prefect] .remove").forEach((state) => state.addEventListener("click", clickPrefect));
  //     clone.querySelectorAll("[data-field=prefect] .add").forEach((state) => state.addEventListener("click", loadReachAmount));
  //     //Close modal call back function
  //     document.querySelector(".modal-reached-amount .close").addEventListener("click", closeModal);
  //   }
  // }

  // // Prefect Amount
  // function loadReachAmount() {
  //   document.querySelector("#reachedAmount").classList.remove("hiden");
  // }

  // Squad Desktop
  if (student.squad === false) {
    clone.querySelector("[data-field=squad] .add-squad").classList.remove("hiden");
    clone.querySelector("[data-field=squad] .add-squad").addEventListener("click", clickSquad);
    clone.querySelector("[data-field=squad] .remove-squad").classList.add("hiden");
    clone.querySelector("[data-field=squad] .sq").textContent = "None";
    clone.querySelector("[data-field=squad] img").src = "";
  } else if (student.squad === true) {
    clone.querySelector("[data-field=squad] .add-squad").classList.add("hiden");
    clone.querySelector("[data-field=squad] .remove-squad").classList.remove("hiden");
    clone.querySelector("[data-field=squad] .remove-squad").addEventListener("click", clickSquad);
    clone.querySelector("[data-field=squad] .sq").textContent = "Member";
    clone.querySelector("[data-field=squad] img").src = iconSquad;
  }

  // Squad Desktop
  function clickSquad() {
    let arrMembers = arrStudents;
    squadState(arrMembers);
  }
  // Squad Desktop
  function squadState(arrMembers) {
    if (student.squad === true) {
      student.squad = false;
    } else if (student.squad === false) {
      if (student.house === "Slytherin" || student.bloodStatus === "Pureblood") {
        student.squad = true;
      } else {
        openSquadModal();
        console.log("open Squad Modal callback");
      }
    }

    displayList(arrMembers);
  }

  // Squad Modal
  function openSquadModal() {
    document.querySelector("#squad-modal").classList.remove("hiden");
    // document.querySelector("#squad-modal .slytherin").style.backgroundColor = "#F1C40F";
  }
  // CLose Squad Modal
  document.querySelector("#squad-modal .close").addEventListener("click", closeModal);

  // Expell student
  clone.querySelector(".expel button").addEventListener("click", expelStudent);

  function expelStudent(obj) {
    obj = student;
    if (obj.expelled === false) {
      arrStudents.splice(arrStudents.indexOf(obj), 1);
    } else if (obj.expelled === true) {
      this.classList.add("hiden");
    }
    if (obj.firstName != "José") {
      obj.expelled = true;
      arrExpelled.push(obj);
    }
    if (obj.firstName === "José") {
      openWarning();
    }
    // Console.log
    console.log(obj);
    console.log(arrStudents);
    console.log(arrExpelled);
    // const removeObj = arrStudents.filter("student")
    displayList(arrStudents);
  }

  // Open / Display Modal Student
  clone.querySelector(".open").addEventListener("click", () => {
    openModal();
    //Modal Student
    document.querySelector(".photo-container img").src = student.image;
    document.querySelector(".fullname .firstname").textContent = student.firstName;
    document.querySelector(".fullname .middlename").textContent = student.middleName;
    document.querySelector(".fullname .lastname").textContent = student.lastName;
    document.querySelector(".fullname .nickname").textContent = student.nickName;
    document.querySelector(".gender-container .gender-status").textContent = student.gender;
    document.querySelector(".house-container .house-name").textContent = student.house;
    document.querySelector(".house-container .house-color").style.backgroundColor = student.colorHouse;

    //Blood Status
    document.querySelector(".blood-status").textContent = student.bloodStatus;

    //Prefect Modal
    if (student.prefect === false) {
      //Add Prefect Modal
      document.querySelector(".responsibility-container .add").classList.remove("hiden");
      document.querySelector(".responsibility-container .add").addEventListener("click", clickPrefect);
      document.querySelector(".responsibility-container .remove").classList.add("hiden");
      document.querySelector(".responsibility-container .prefect").textContent = "None";
      document.querySelector(".responsibility-container .shield img").src = "";
    } else {
      //Remove Prefect Modal
      document.querySelector(".responsibility-container .add").classList.add("hiden");
      document.querySelector(".responsibility-container .remove").classList.remove("hiden");
      document.querySelector(".responsibility-container .remove").addEventListener("click", clickPrefect);
      document.querySelector(".responsibility-container .prefect").textContent = "Prefect";
      document.querySelector(".responsibility-container .shield img").src = iconShield;
    }

    //Squad Modal
    if (student.squad === false) {
      //Add Squad Modal
      document.querySelector(".squad-container .add-squad").classList.remove("hiden");
      document.querySelector(".squad-container .add-squad").addEventListener("click", clickSquad);
      document.querySelector(".squad-container .remove-squad").classList.add("hiden");
      document.querySelector(".squad-container .yes").textContent = "None";
      document.querySelector(".squad-container .i img").src = "";
    } else {
      //Remove Squad Modal
      document.querySelector(".squad-container .add-squad").classList.add("hiden");
      document.querySelector(".squad-container .remove-squad").classList.remove("hiden");
      document.querySelector(".squad-container .remove-squad").addEventListener("click", clickSquad);
      document.querySelector(".squad-container .yes").textContent = "Member";
      document.querySelector(".squad-container .i img").src = iconSquad;
    }

    //Close Student Modal
    document.querySelector(".modal-student .close").addEventListener("click", closeModal);
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
  if (student.prefect === true) {
    // //In mobile
    cloneMobile.querySelector(".prefect-icon").classList.remove("hiden");
  } else {
    cloneMobile.querySelector(".prefect-icon").classList.add("hiden");
  }

  // //Squad Mobile
  if (student.squad === true) {
    // //In mobile
    cloneMobile.querySelector(".i-icon").classList.remove("hiden");
  } else {
    cloneMobile.querySelector(".i-icon").classList.add("hiden");
  }

  //Expel from Mobile
  cloneMobile.querySelector("button").addEventListener("click", expelStudent);

  cloneMobile.querySelector(".pic-container").addEventListener("click", () => {
    openModal();
    //Modal Student Mobile
    document.querySelector(".photo-container img").src = student.image;
    document.querySelector(".fullname .firstname").textContent = student.firstName;
    document.querySelector(".fullname .middlename").textContent = student.middleName;
    document.querySelector(".fullname .lastname").textContent = student.lastName;
    document.querySelector(".fullname .nickname").textContent = student.nickName;
    document.querySelector(".gender-container .gender-status").textContent = student.gender;
    document.querySelector(".house-container .house-name").textContent = student.house;
    document.querySelector(".house-container .house-color").style.backgroundColor = student.colorHouse;

    //Prefect Mobile Modal
    if (student.prefect === false) {
      //Add Prefect Mobie Modal
      document.querySelector(".responsibility-container .add").classList.remove("hiden");
      document.querySelector(".responsibility-container .add").addEventListener("click", clickPrefect);
      document.querySelector(".responsibility-container .remove").classList.add("hiden");
      document.querySelector(".responsibility-container .prefect").textContent = "None";
      document.querySelector(".responsibility-container .shield img").src = "";
    } else {
      //Remove Prefect Mobile Modal
      document.querySelector(".responsibility-container .add").classList.add("hiden");
      document.querySelector(".responsibility-container .remove").classList.remove("hiden");
      document.querySelector(".responsibility-container .remove").addEventListener("click", clickPrefect);
      document.querySelector(".responsibility-container .prefect").textContent = "Prefect";
      document.querySelector(".responsibility-container .shield img").src = iconShield;
    }

    //Squad Modal
    if (student.squad === false) {
      //Add Squad Mobile Modal
      document.querySelector(".squad-container .add-squad").classList.remove("hiden");
      document.querySelector(".squad-container .add-squad").addEventListener("click", clickSquad);
      document.querySelector(".squad-container .remove-squad").classList.add("hiden");
      document.querySelector(".squad-container .yes").textContent = "None";
      document.querySelector(".squad-container .i img").src = "";
    } else {
      //Remove Squad Mobile Modal
      document.querySelector(".squad-container .add-squad").classList.add("hiden");
      document.querySelector(".squad-container .remove-squad").classList.remove("hiden");
      document.querySelector(".squad-container .remove-squad").addEventListener("click", clickSquad);
      document.querySelector(".squad-container .yes").textContent = "Member";
      document.querySelector(".squad-container .i img").src = iconSquad;
    }
    //Close Student Mobile Modal
    document.querySelector(".modal-student .close").addEventListener("click", closeModal);
  });

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
  document.querySelector("#reachedAmount").classList.add("hiden");
  document.querySelector("#squad-modal").classList.add("hiden");
  document.querySelector("#warning").classList.add("hiden");
}

//Hack The System
pressKey();
function pressKey() {
  //Input
  let hack = document.getElementById("hack");
  // Add event listener on keydown
  hack.addEventListener("keypress", (event) => {
    let jose = event.target.value.substring(0);
    if (jose === "jose") {
      console.log("😎");
      // console.log(`key=${event.key},code=${event.code}`);
      hackTheSystem();
    } else {
      console.log("Try Again!");
    }
  });
}

function hackTheSystem() {
  console.log("Now the system is being hacked!");

  //Create Jose
  const jose = Object.create(Jose); //Create the student object.
  //My info
  jose.firstName = "José";
  jose.middleName = "Francisco";
  jose.lastName = "Sesé";
  jose.nickName = "Spiderman";
  jose.house = "Hufflepuff";
  jose.colorHouse = "";
  jose.image = "/images/jose.png";
  jose.bloodStatus = "Pureblood";
  jose.prefect = false;
  jose.squad = false;
  jose.expelled = "";
  jose.gender = "boy";

  let colorHouse;
  if (jose.house === "Hufflepuff") {
    colorHouse = "#28B463";
  }

  jose.colorHouse = colorHouse;

  //inject me in the list
  arrStudents.push(jose);
  displayList(arrStudents);
}

function openWarning() {
  document.querySelector("#warning").classList.remove("hiden");
  document.querySelector("#warning .close").addEventListener("click", closeModal);
}

///////////////////////

import supabase from "./config.js";

let title = document.getElementById("title");
let priority = document.getElementsByName("priority");
let description = document.getElementById("description");

let addtodo = document.getElementById("btnAdd");
let showtodo = document.getElementById("btnShowAll");

let showHightodo = document.getElementById("btnShowAllHigh");
let showMedtodo = document.getElementById("btnShowAllMed");
let showLowtodo = document.getElementById("btnShowAllLow");

let main = document.getElementById("main");

//Add data
async function add() {
    if (!title.value) {
      alert("Please write title");
      return;
    }
    if (!description.value) {
      alert("Please write description");
      return;
    }

  //Edit data
  if (editId) {
    console.log("Id to be edited : ", editId);
    console.log("Id to be edited : ", editId);
    try {
    const { data, error } = await supabase
      .from("Todo application")
      .upsert({
        title: title.value,
        priority: selectedPriority,
        description: description.value,
      })
      .select("*")
      .eq("id", editId);
  } catch (err) {
    console.log("Error in editing data ", err);
  }
  }

  try {

    let selectedPriority;

    for (let p of priority) {
      if (p.checked) {
        selectedPriority = p.value;
      }
    }
    console.log(selectedPriority);

    const { error } = await supabase.from("Todo application").insert({
      title: title.value,
      priority: selectedPriority,
      description: description.value,
    });

    if (error) {
      alert("Error in creating ", error);
    } else {
      alert("Data inserted successfully");
    }
  } catch (err) {
    console.log("Error in adding data to database ", err);
  }
}

addtodo.addEventListener("click", add);

//Read all data
async function read() {
  try {
    const { data, error } = await supabase.from("Todo application").select("*");

    if (data) {
      console.log(data);
      return showAllData(data);
    }
  } catch (err) {
    console.log("Error in reading data from database ", err);
  }
}

showtodo.addEventListener("click", read);

//Reading all data
async function showAllData(todo) {
  main.innerHTML = "";
  todo.forEach((todo) => {
    main.innerHTML += `<div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">${todo.title}</h5>
    <p class="card-text">${todo.description}</p>
    <h5 class="card-title">${todo.priority}</h5>
    <button class="btn btn-outline-success" onclick="editToDo(${todo.id} , '${todo.title}' , '${todo.description}' , '${todo.priority}')" ><i class="fa-solid fa-pen-to-square"></i></button>
    <button class="btn btn-success"  onclick="dltToDo()" ><i class="fa-solid fa-trash"></i></button>
  </div>
</div>`;
  });
}

//Read all higher priority  data
async function readHigh() {
  try {
    const { data, error } = await supabase
      .from("Todo application")
      .select("*")
      .eq("priority", "high");

    if (data) {
      console.log(data);
      return showAllHighData(data);
    }
  } catch (err) {
    console.log("Error in reading data from database ", err);
  }
}

showHightodo.addEventListener("click", readHigh);

//Reading all data
async function showAllHighData(todo) {
  main.innerHTML = "";
  todo.forEach((todo) => {
    main.innerHTML += `<div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">${todo.title}</h5>
    <p class="card-text">${todo.description}</p>
    <h5 class="card-title">${todo.priority}</h5>
    <button class="btn btn-outline-success" onclick="editToDo(${todo.id} , '${todo.title}' , '${todo.description}' , '${todo.priority}')" ><i class="fa-solid fa-pen-to-square"></i></button>
    <button class="btn btn-success"  onclick="dltToDo()" ><i class="fa-solid fa-trash"></i></button>
  </div>
</div>`;
  });
}

//Read all medium priority data
async function readMedium() {
  try {
    const { data, error } = await supabase
      .from("Todo application")
      .select("*")
      .eq("priority", "medium");

    if (data) {
      console.log(data);
      return showAllMediumData(data);
    }
  } catch (err) {
    console.log("Error in reading data from database ", err);
  }
}

showMedtodo.addEventListener("click", readMedium);

//Reading all data
async function showAllMediumData(todo) {
  main.innerHTML = "";
  todo.forEach((todo) => {
    main.innerHTML += `<div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">${todo.title}</h5>
    <p class="card-text">${todo.description}</p>
    <h5 class="card-title">${todo.priority}</h5>
    <button class="btn btn-outline-success" onclick="editToDo(${todo.id} , '${todo.title}' , '${todo.description}' , '${todo.priority}')" ><i class="fa-solid fa-pen-to-square"></i></button>
    <button class="btn btn-success"  onclick="dltToDo()" ><i class="fa-solid fa-trash"></i></button>
  </div>
</div>`;
  });
}

//Read all lower priority data
async function readLow() {
  try {
    const { data, error } = await supabase
      .from("Todo application")
      .select("*")
      .eq("priority", "low");

    if (data) {
      console.log(data);
      return showAllLowData(data);
    }
  } catch (err) {
    console.log("Error in reading data from database ", err);
  }
}

showLowtodo.addEventListener("click", readLow);

//Reading all data
async function showAllLowData(todo) {
  main.innerHTML = "";
  todo.forEach((todo) => {
    main.innerHTML += `<div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">${todo.title}</h5>
    <p class="card-text">${todo.description}</p>
    <h5 class="card-title">${todo.priority}</h5>
    <button class="btn btn-outline-success" onclick="editToDo(${todo.id} , '${todo.title}' , '${todo.description}' , '${todo.priority}')" ><i class="fa-solid fa-pen-to-square"></i></button>
    <button class="btn btn-success"  onclick="dltToDo()" ><i class="fa-solid fa-trash"></i></button>
  </div>
</div>`;
  });
}


let editId = null ;

//Edit function
window.editToDo =function(id , ti , des , pri){
  console.log(id , ti , des ,pri );
  editId = id;
  title.value = ti 
  description.value = des

  console.log(editId);
  addtodo.innerHTML = 'Edit to do'

  //priority.value = pri
  priority.forEach(onepri => {
    //console.log(onepri.value);   give all values
    //give the clicked one for three times
    //if(onepri.value = pri){
    //  console.log(onepri.value);  
    //}
    
    //means agar value equal hy jo user ny click ka to wo wala radio button checked ay
    onepri.checked = onepri.value == pri
    console.log(onepri.checked , onepri.value)
  })
}
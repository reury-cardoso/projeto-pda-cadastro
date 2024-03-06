class CreateStudent {
  constructor(id, name, surname, note) {
    this.id = id;
    this.name = `${name} ${surname}`;
    this.note = note;
    this.status = "not-analyzed";
    this.performance = `${note}0%`;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const currentDate = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = currentDate.toLocaleDateString("pt-BR", options);

  const dateTag = document.getElementById("data");
  dateTag.innerText = date;
});

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function showHide(tagID) {
  const divTag = document.getElementById(tagID);
  divTag.classList.toggle("hidden");
  divTag.classList.toggle("visible");
}

const buttonAdd = document.getElementById("button-add");
buttonAdd.addEventListener("click", () => {
  showHide("section-add");
});

const buttonClose = document.getElementById("close");
buttonClose.addEventListener("click", () => {
  showHide("section-add");
});



function createStudentHtml(id, name, note, status, performance) {
  let headerBody = document.getElementsByClassName("header-body")[0];

  let tr = document.createElement("tr");
  tr.classList.add("student", "id132");

  let th1 = document.createElement("th");
  th1.textContent = id;

  let th2 = document.createElement("th");
  th2.textContent = name;

  let th3 = document.createElement("th");
  th3.textContent = note;

  let th4 = document.createElement("th");
  th4.classList.add(status);

  let statusPT;
  if (status === "not-analyzed") {
    statusPT = "Não analisado(a)";
  } else if (status === "approved") {
    statusPT = "Aprovado(a)";
  } else if (status === "disapproved") {
    statusPT = "Reprovado(a)";
  }

  let span = document.createElement("span");
  span.textContent = statusPT;
  th4.appendChild(span);

  let th5 = document.createElement("th");
  th5.setAttribute("id", "percentage");

  let div = document.createElement("div");
  div.setAttribute("id", "loading-bar");
  let span2 = document.createElement("span");

  let colorStyle;
  if(note <= 3){
    colorStyle = '#FF5722'
  }else if(note <= 7){
    colorStyle = '#ff9800'
  }else{
    colorStyle = '#4caf50'
  };
  span2.style.width = performance;
  span2.style.backgroundColor = colorStyle;

  div.appendChild(span2);
  th5.appendChild(div);

  let span3 = document.createElement("span");
  span3.textContent = performance;
  th5.appendChild(span3);

  let th6 = document.createElement("th");
  th6.classList.add("actions");
  let button1 = document.createElement("button");
  button1.setAttribute('onclick', `editStudent(${id})`)
  let img1 = document.createElement("img");
  img1.setAttribute("src", "icon-edit.svg");
  img1.setAttribute("alt", "");
  button1.appendChild(img1);

  let button2 = document.createElement("button");
  button2.setAttribute('onclick', `deleteStudent(${id})`)
  let img2 = document.createElement("img");
  img2.setAttribute("src", "icon-trash.svg");
  img2.setAttribute("alt", "");
  button2.appendChild(img2);

  th6.appendChild(button1);
  th6.appendChild(button2);


  tr.appendChild(th1);
  tr.appendChild(th2);
  tr.appendChild(th3);
  tr.appendChild(th4);
  tr.appendChild(th5);
  tr.appendChild(th6);

  headerBody.appendChild(tr);
}

let students = JSON.parse(localStorage.getItem("studentsDate")) == null ? [] : JSON.parse(localStorage.getItem("studentsDate"));
localStorage.setItem("studentsDate", JSON.stringify(students));

students.forEach(studentArray => {
  createStudentHtml(studentArray.id, studentArray.name, studentArray.note, studentArray.status, studentArray.performance)
});

function generateID(){
  let idGenerated = Math.floor(Math.random() * (999 - 10000 + 1)) + 10000;
  for(const studentArray of students){
    if(studentArray.id == idGenerated){
      generateID()
      break
    }
  }
  return idGenerated
}

const addRealbutton = document.getElementById("addReal");
addRealbutton.addEventListener("click", async () => {
  const name = document.getElementById("name");
  const surname = document.getElementById("surname");
  const note = document.getElementById("note");

  if (name.value == "" || surname.value == "" || note.value == "") {
    alert("Preencha os dados");
  }else if(note.value > 10 || note.value < 0){
    alert("Preencha a nota com 0 ou mais 10 ou menos");
  }else {
    var id = generateID()
    let student = await new CreateStudent(
      id,
      name.value,
      surname.value,
      note.value
    );
    createStudentHtml(student.id, student.name, student.note, student.status, student.performance)
    showHide("section-add");
    await students.push(student);
    localStorage.setItem("studentsDate", JSON.stringify(students));
  }
});
class CreateStudent {
  constructor(id, name, note, status) {
    this.id = id;
    this.name = name;
    this.note = note;
    this.status = status;
    this.performance = `${+note * 10}%`;
  }

  updateStudent(id, name, status, note) {}
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

  document.body.style.overflow = "visible";
}

const buttonAdd = document.getElementById("button-add");
buttonAdd.addEventListener("click", () => {
  showHide("section-add");
});

const buttonClose = document.getElementById("close");
buttonClose.addEventListener("click", () => {
  showHide("section-add");
});
const buttonCloseEdit = document.getElementById("close-edit");
buttonCloseEdit.addEventListener("click", () => {
  showHide("section-edit");
});

function createStudentHtml(id, name, note, status, performance) {
  const headerBody = document.getElementsByClassName("header-body")[0];

  let tr = document.createElement("tr");
  tr.classList.add("student", "visible");
  tr.id = `id${id}`;

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
  span2.style.width = performance;
  let colorStyle;
  if (note <= 3) {
    colorStyle = "#FF5722";
    performance = "Insuficiente";
  } else if (note <= 7) {
    colorStyle = "#ff9800";
    performance = "Bom";
  } else {
    colorStyle = "#4caf50";
    performance = "Excelente";
  }

  span2.style.backgroundColor = colorStyle;

  div.appendChild(span2);
  th5.appendChild(div);

  let span3 = document.createElement("span");
  span3.textContent = performance;
  th5.appendChild(span3);

  let th6 = document.createElement("th");
  th6.classList.add("actions");
  let button1 = document.createElement("button");
  button1.setAttribute("onclick", `editStudent(${id})`);
  let img1 = document.createElement("img");
  img1.setAttribute("src", "./assets/icon-edit.svg");
  img1.setAttribute("alt", "");
  button1.appendChild(img1);

  let button2 = document.createElement("button");
  button2.setAttribute("onclick", `deleteStudent(${id})`);
  let img2 = document.createElement("img");
  img2.setAttribute("src", "./assets/icon-trash.svg");
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

let students =
  JSON.parse(localStorage.getItem("studentsDate")) == null
    ? []
    : JSON.parse(localStorage.getItem("studentsDate"));
localStorage.setItem("studentsDate", JSON.stringify(students));

students.forEach((studentArray) => {
  createStudentHtml(
    studentArray.id,
    studentArray.name,
    studentArray.note,
    studentArray.status,
    studentArray.performance
  );
});

async function addTagError(nameErro) {
  let documentBody = document.getElementById('erro-div');
   documentBody.innerHTML +=  `<div id="erroTag" class="error hidden">
  <div class="error__icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" height="24" fill="none"><path fill="#393a37" d="m13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.3132 0-2.61358.25866-3.82683.7612-1.21326.50255-2.31565 1.23915-3.24424 2.16773-1.87536 1.87537-2.92893 4.41891-2.92893 7.07107 0 2.6522 1.05357 5.1957 2.92893 7.0711.92859.9286 2.03098 1.6651 3.24424 2.1677 1.21325.5025 2.51363.7612 3.82683.7612 2.6522 0 5.1957-1.0536 7.0711-2.9289 1.8753-1.8754 2.9289-4.4189 2.9289-7.0711 0-1.3132-.2587-2.61358-.7612-3.82683-.5026-1.21326-1.2391-2.31565-2.1677-3.24424-.9286-.92858-2.031-1.66518-3.2443-2.16773-1.2132-.50254-2.5136-.7612-3.8268-.7612z"></path></svg>
  </div>
  <div class="error__title">${nameErro}</div>
</div>`;
  await sleep(50);
  showHide("erroTag")
  await sleep(3000);
  await showHide("erroTag")
  await sleep(100);
  let erroTag = document.getElementById('erroTag')
  erroTag.remove()
  return
}

function generateID() {
  let idGenerated = Math.floor(Math.random() * (999 - 10000 + 1)) + 10000;
  for (const studentArray of students) {
    if (studentArray.id == idGenerated) {
      generateID();
      break;
    }
  }
  return idGenerated;
}

const addRealbutton = document.getElementById("addReal");
addRealbutton.addEventListener("click", async () => {
  const name = document.getElementById("name");
  const surname = document.getElementById("surname");
  const note = document.getElementById("note");

  if (name.value == "" || surname.value == "" || note.value == "") {
    await addTagError("ERRO: Preencha todos os campos obrigatórios.");
  } else if (note.value > 10 || note.value < 0) {
    await addTagError("ERRO: Certifique-se de que a nota esteja entre 0 e 10.");
  } else {
    const id = generateID();

    let status = "not-analyzed";

    let student = await new CreateStudent(
      id,
      `${name.value} ${surname.value}`,
      note.value,
      status
    );
    createStudentHtml(
      student.id,
      student.name,
      student.note,
      student.status,
      student.performance
    );

    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });

    showHide("section-add");
    await students.push(student);
    localStorage.setItem("studentsDate", JSON.stringify(students));
  }
});

async function deleteStudent(id) {
  let studentDiv = document.getElementById(`id${id}`);
  await showHide(`id${id}`);
  await sleep(500);
  studentDiv.remove();
  let index = students.findIndex(function (student) {
    return student.id === id;
  });

  students.splice(index, 1);
  localStorage.setItem("studentsDate", JSON.stringify(students));
}

function editStudent(id) {
  const idTag = document.getElementById("idTag");
  const nameEdit = document.getElementById("name-edit");
  const noteEdit = document.getElementById("note-edit");
  const statusEdit = document.querySelectorAll('input[name="statusEdit"]');

  let index = students.findIndex(function (student) {
    return student.id === id;
  });

  statusEdit.forEach((input) => {
    if (input.value === students[index].status) {
      input.checked = true;
    } else {
      input.checked = false;
    }
  });

  idTag.value = students[index].id;
  nameEdit.value = students[index].name;
  noteEdit.value = students[index].note;

  showHide("section-edit");
}

// async function editStudentReal() {

// }

const editRealButton = document.getElementById("editReal");
editRealButton.addEventListener("click", async () => {
  const idTag = +document.getElementById("idTag").value;
  const nameEdit = document.getElementById("name-edit").value;
  const noteEdit = document.getElementById("note-edit").value;
  const statusEdit = document.querySelector(
    'input[name="statusEdit"]:checked'
  ).value;

  if (nameEdit == "" || noteEdit == "" || statusEdit == "") {
    await addTagError("ERRO: Preencha todos os campos obrigatórios.");
  } else if (noteEdit > 10 || noteEdit < 0) {
    await addTagError("ERRO: Certifique-se de que a nota esteja entre 0 e 10.");
  } else {
    let index = students.findIndex(function (student) {
      return student.id === idTag;
    });
  
    let studentEdit = await new CreateStudent(
      idTag,
      nameEdit,
      +noteEdit,
      statusEdit
    );
  
    students[index] = await studentEdit;
  
    const headerBody = document.getElementsByClassName("header-body")[0];
    headerBody.innerHTML = "";
  
    students.forEach((studentArray) => {
      createStudentHtml(
        studentArray.id,
        studentArray.name,
        studentArray.note,
        studentArray.status,
        studentArray.performance
      );
    });
    localStorage.setItem("studentsDate", JSON.stringify(students));
    showHide("section-edit");
  }
});

const inputFields = document.querySelectorAll(
  "#add-student > div.div-input > input"
);
const submitButton = document.getElementById("addReal");

inputFields.forEach(function (inputField, index) {
  inputField.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      if (index < inputFields.length - 1) {
        inputFields[index + 1].focus();
      } else {
        submitButton.click();
      }
    }
  });
});

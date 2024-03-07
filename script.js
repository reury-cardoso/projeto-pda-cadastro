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
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  showHide("section-add");
  document.body.style.overflow = "hidden";
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
  img1.setAttribute("src", "icon-edit.svg");
  img1.setAttribute("alt", "");
  button1.appendChild(img1);

  let button2 = document.createElement("button");
  button2.setAttribute("onclick", `deleteStudent(${id})`);
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
    alert("Preencha os dados");
  } else if (note.value > 10 || note.value < 0) {
    alert("Preencha a nota com 0 ou mais 10 ou menos");
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

  console.log(statusEdit);

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
  const noteEdit = +document.getElementById("note-edit").value;
  const statusEdit = document.querySelector(
    'input[name="statusEdit"]:checked'
  ).value;

  let index = students.findIndex(function (student) {
    return student.id === idTag;
  });

  let studentEdit = await new CreateStudent(
    idTag,
    nameEdit,
    noteEdit,
    statusEdit
  );

  console.log(students)

  students[index] = await studentEdit;

  const headerBody = document.getElementsByClassName("header-body")[0];
  headerBody.innerHTML = ''

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
});

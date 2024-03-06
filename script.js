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

function showHide(tagID){
  const divTag = document.getElementById(tagID);
  divTag.classList.toggle('hidden');
  divTag.classList.toggle('visible');
}

const buttonAdd = document.getElementById('button-add')
buttonAdd.addEventListener('click', () => {
  showHide('section-add');
})

const buttonClose = document.getElementById('close')
buttonClose.addEventListener('click', () => {
  showHide('section-add');
})
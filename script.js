const currentDate = new Date();

const options = {year: 'numeric', month: 'long', day: 'numeric' };

const dateTag = document.getElementById('data')

let date = currentDate.toLocaleDateString('pt-BR', options)

dateTag.innerText = date


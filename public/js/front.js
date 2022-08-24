'use strict';
console.log('front.js');

const baseUrl = 'http://localhost:5000/api/users';
// Taikomes
const form = document.forms[0];
// sukurti formoj inputa ir buttona html

// su js kai siunciama forma paimti input reiksme ir nusiusti i musu sukurta back enda kad
// sukurti nauja useri
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const nameValue = form.elements.name.value.trim();
  console.log('nameValue ===', nameValue);
  const result = await createUserFetch(nameValue);
  if (result === true) {
    alert('sekme');
    form.reset();
    // parsisiusti vartojus sarasui
  } else {
    alert('nesekme');
  }
});

async function createUserFetch(username) {
  const resp = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({
      name: username,
    }),
  });
  console.log('resp ===', resp);
  if (resp.status === 201) {
    return true;
  }
//   const dataFromResp = await resp.json();
//   console.log('dataFromResp ===', dataFromResp);
}

// parsisiusti vartotojus is back end, (fetch)
async function getUsers() {
  const resp = await fetch(baseUrl)
  const data = await resp.json()
  console.log('data ---->', data);
  generateLiUser(data)
}
getUsers()
// sugeneruoti sarasa <li>James</li> su vardais ul elemente htmle
const sarasas = document.querySelector('ul')
function generateLiUser(obj) {
  obj.forEach(obj => {
    const li = document.createElement('li')
    li.innerText=(`${obj.name}`)
    sarasas.append(li)
  });
}
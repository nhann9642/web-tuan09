const tbody = document.querySelector('tbody')

async function fetchInfo(id) {
  id--;
  const page = Math.floor(id / 3) + 1
  const start = (id % 3) * 2

  const response = await fetch(`https://reqres.in/api/users?page=${page}`);
  const infos = await response.text();

  const obj = JSON.parse(infos)
  let htmls = '';
  const data = obj.data

  for (let i = start; i < start + 2; i++) {
    htmls += `
      <tr>
        <td>${data[i].id}</td>
        <td>${data[i].first_name}</td>
        <td>${data[i].last_name}</td>
        <td>${data[i].email}</td>
        <td><img src="${data[i].avatar}" width = 128px height = 128px alt=""></td>
      </tr>
      `;
  }
  tbody.innerHTML = htmls;
}

const pageNums = document.querySelectorAll('.page-link')

function activePage(num) {
  pageNums.forEach((pageItem, index) => {
    if (index !== num)
      pageItem.classList.remove('active')
    else pageItem.classList.add('active')
  })
}

fetchInfo(1)
let startPage = 1;
let pageActive = 1

pageNums.forEach((pageItem, index) => {

  pageItem.addEventListener('click', () => {

    if (index === 0) {
      if (pageActive > 1)
        pageActive--;
    }
    else if (index === 7) {
      if (pageActive < 6)
          pageActive++;
    }
    else {
      pageActive = (Number)(pageItem.textContent);
    }
    fetchInfo(pageActive)
    activePage(pageActive - startPage + 1)
  })

})
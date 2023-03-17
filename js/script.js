const mainEl = document.querySelector('.main');
const wrapper = document.createElement('div')

const formEl = document.createElement('form');
formEl.addEventListener('submit', async (e) => {
    e.preventDefault();
    const inputsValue = Object.fromEntries(new FormData(e.target));
    const response = await fetch(`
    https://api.github.com/search/repositories?q=${inputsValue}
  `);

    if (response.ok) {
        const data = await response.json();
        wrapper.appendChild(createRepoEl(data))
        mainEl.appendChild(wrapper);
        inputEl.value = '';
    } else {
        alert("Пользователь не найден")
    }
})

const inputEl = document.createElement('input');
inputEl.classList.add('search-input');
inputEl.setAttribute('name', 'name')

const searchButtonEl = document.createElement('button')
searchButtonEl.classList.add('search-button');
searchButtonEl.setAttribute('type', 'submit');
searchButtonEl.innerHTML = "Поиск";

formEl.appendChild(inputEl);
formEl.appendChild(searchButtonEl);
mainEl.appendChild(formEl);

function createRepoEl(data) {
    const element = document.createElement('div');
    element.classList.add('repo');
    data.items.forEach(item => (
        element.innerHTML += `
    <p class="search-text"><span>Название: </span>${item.name}</p>
    <p class="search-text"><span>Полное название: </span>${item.full_name}</p>
    <p class="search-text"><span>id: </span>${item.id}</p>
  `
    ))

    return element;
}
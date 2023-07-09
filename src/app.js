const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const cache = {};

const debounceSearch = _.debounce(() => {
    const searchTerm = searchInput.value.trim();

    if (searchTerm.length < 3) {
        searchResults.innerHTML = 'Ingresa al menos 3 caracteres';
        return;
    }

    if (cache[searchTerm]) {
        displayUsers(cache[searchTerm]);
        return;
    }

    const apiUrl = `https://api.github.com/search/users?q=${searchTerm}`;
    $.ajax({
        url: apiUrl,
        method: 'GET',
        success: (response) => {
            const users = response.items.slice(0, 3);
            cache[searchTerm] = users;
            displayUsers(users);
        },
        error: (error) => {
            searchResults.innerHTML = 'Un error ha ocurrido haciendo fetch';
            console.error(error);
        }
    });
}, 500);

searchInput.addEventListener('keyup', debounceSearch);

searchResults.addEventListener('click', (event) => {
    const target = event.target;
    if (target.tagName === 'P') {
        console.log('Click en el resultado buscado:', target.textContent);
    }
});

function displayUsers(users) {
    searchResults.innerHTML = '';

    users.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.innerHTML = `
            <img src="${user.avatar_url}" alt="User PFP">
            <p>Name | Nombre: ${user.login}</p>
            <p>Github Name | Github Nombre: ${user.login}</p>
            <p>Company | Compañia: ${user.company ? user.company : 'N/A'}</p>
            <p>Repositorios: ${user.public_repos}</p>
        `;
        searchResults.appendChild(userDiv);
    });
}

const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

const debounceSearch = _.debounce(() => {
    const searchTerm = searchInput.value.trim();

    if (searchTerm.length < 3) {
        searchResults.innerHTML = 'Please enter at least 3 characters';
        return;
    }

    searchResults.innerHTML = '';

    const apiUrl = `https://api.github.com/search/users?q=${searchTerm}`;
    $.ajax({
        url: apiUrl,
        method: 'GET',
        success: function(response) {
            const users = response.items.slice(0, 3);
            users.forEach(user => {
                const userDiv = document.createElement('div');
                userDiv.innerHTML = `
                    <img src="${user.avatar_url}" alt="User Profile Picture" />
                    <p>Name | Nombre: ${user.login}</p>
                    <p>Github Name | Github Nombre: ${user.login}</p>
                    <p>Company | Compañia: ${user.company ? user.company : 'N/A'}</p>
                    <p>Repositorios: ${user.public_repos}</p>
                `;
                searchResults.appendChild(userDiv);
            });
        },
        error: function(error) {
            searchResults.innerHTML = 'Un error ha ocurrido haciendo fetch';
            console.error(error);
        }
    });
}, 500);

searchInput.addEventListener('keyup', debounceSearch);
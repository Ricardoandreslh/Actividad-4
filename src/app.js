const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');


const debounceSearch = _.debounce(() => {
    const searchTerm = searchInput.value.trim();

 
    if (searchTerm.length < 3) {
        searchResults.innerHTML = 'Please enter at least 3 characters';
        return;
    }

    searchResults.innerHTML = '';

    axios.get(`https://api.github.com/search/users?q=${searchTerm}`)
        .then(response => {
            const users = response.data.items.slice(0, 3);
            users.forEach(user => {
                const userDiv = document.createElement('div');
                userDiv.innerHTML = `
                    <img src="${user.avatar_url}" alt="User Profile Picture" />
                    <p>Name: ${user.login}</p>
                    <p>Github Name: ${user.login}</p>
                    <p>Company: ${user.company ? user.company : 'N/A'}</p>
                    <p>Repositories: ${user.public_repos}</p>
                `;
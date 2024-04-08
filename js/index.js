document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('github-form');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');
  
    form.addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent form submission
      const searchInput = document.getElementById('search').value.trim();
  
      // Make request to GitHub User Search Endpoint
      fetch(`https://api.github.com/search/users?q=${searchInput}`)
        .then(response => response.json())
        .then(data => {
          // Clear previous search results
          userList.innerHTML = '';
  
          // Display information about the users
          data.items.forEach(user => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
              <img src="${user.avatar_url}" alt="${user.login}" width="50" height="50">
              <a href="${user.html_url}" target="_blank">${user.login}</a>
            `;
            userList.appendChild(listItem);
  
            // Attach click event listener to each user
            listItem.addEventListener('click', function () {
              // Make request to GitHub User Repos Endpoint
              fetch(`https://api.github.com/users/${user.login}/repos`)
                .then(response => response.json())
                .then(repos => {
                  // Clear previous repositories list
                  reposList.innerHTML = '';
  
                  // Display repositories for the selected user
                  repos.forEach(repo => {
                    const repoItem = document.createElement('li');
                    repoItem.textContent = repo.full_name;
                    reposList.appendChild(repoItem);
                  });
                })
                .catch(error => console.error('Error fetching repositories:', error));
            });
          });
        })
        .catch(error => console.error('Error fetching users:', error));
    });
  });
  
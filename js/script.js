const overview = document.querySelector(".overview");
const username = 'hjrandolph';
const repoList = document.querySelector(".repo-list");

const getUser = async function(){
    const res = await fetch(`https://api.github.com/users/${username}`);
    const user = await res.json();
    console.log(user);
    displayUser(user);
 
};

getUser();

const displayUser = function(user){
    const userInfo = document.createElement("div");
    userInfo.innerHTML = `<figure>
    <img alt="" src=${user.avatar_url} />
    </figure>
    <div>
        <p><strong>Name:</strong> ${user.name}</p>
        <p><strong>Bio:</strong> ${user.bio}</p>
        <p><strong>Location:</strong> ${user.location}</p>
        <p><strong>Number of public repos:</strong> ${user.public_repos}</p>
    </div>`;
    overview.appendChild(userInfo);
    fetchRepos();
};

const fetchRepos = async function(){
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=12`);
    const repos = await res.json();
    console.log(repos);
    displayRepos(repos)
};

const displayRepos = function(repos){
    for (const repo of repos){
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML =  `<h3>${repo.name}</h3>`
        repoList.append(li);
    }
};

// for (const letter of guessedLetters){
//     const li = document.createElement("li");
//     li.innerText = letter;
//     guessed.append(li);
// }
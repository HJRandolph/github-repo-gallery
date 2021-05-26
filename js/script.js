const overview = document.querySelector(".overview");
const username = 'hjrandolph';
const repoList = document.querySelector(".repo-list");
const reposSection = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");


const getUser = async function(){
    const res = await fetch(`https://api.github.com/users/${username}`);
    const user = await res.json();
    // console.log(user);
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


repoList.addEventListener("click", function(e){
    if (e.target.matches("h3")){
        const repoName = e.target.innerText;
        // console.log(repoName);
        specificRepo(repoName);
    }
    
});

const specificRepo = async function(repoName){
    const res = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await res.json();
    console.log(repoInfo);
    const fetchLanguages = await fetch(`https://api.github.com/repos/${username}/${repoName}/languages`);
    const languageData = await fetchLanguages.json();
    console.log(languageData);
    const languages = [];
    for (let key in languageData){
        languages.push(key);
    }
    displaySpecificRepo(repoInfo,languages);
};

const displaySpecificRepo = function(repoInfo, languages){
    repoData.innerText = "";
    const repo = document.createElement("div");
    repo.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(', ')} </p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" re'="noreferrer noopener">View repo on GitHub!</a>`;
    repoData.append(repo);
    repoData.classList.remove("hide");
};

//     Create a new div element and add the selected repository's name, description, default branch, and link to its code on GitHub. 
// The div structure will look like this:

	
// <h3>Name: ${}</h3>
//     <p>Description: ${}</p>
//     <p>Default Branch: ${}</p>
//     <p>Languages: ${languages.join(", ")}</p>
//     <a class="visit" href="${}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
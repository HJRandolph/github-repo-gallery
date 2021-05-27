const overview = document.querySelector(".overview");
const username = 'hjrandolph';
const repoList = document.querySelector(".repo-list");
const reposSection = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
const btn = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");


const getUser = async function(){
    const res = await fetch(`https://api.github.com/users/${username}`);
    const user = await res.json();
    displayUser(user);
 
};

getUser();

const displayUser = function(user){
    const userInfo = document.createElement("div");
    userInfo.classList.add("user-info");
    userInfo.innerHTML = `<figure>
    <img alt="user avatar" src=${user.avatar_url} />
    </figure>
    <div>
        <p><strong>Name:</strong> ${user.name}</p>
        <p><strong>Bio:</strong> ${user.bio}</p>
        <p><strong>Location:</strong> ${user.location}</p>
        <p><strong>Number of public repos:</strong> ${user.public_repos}</p>
    </div>`;
    overview.append(userInfo);
    fetchRepos();
};

const fetchRepos = async function(){
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repos = await res.json();
    displayRepos(repos)
};

const displayRepos = function(repos){
    filterInput.classList.remove("hide");
    for (const repo of repos){
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML =  `<h3>${repo.name}</h3>`
        repoList.append(li);
    }
};

// Listen for click on repo name
repoList.addEventListener("click", function(e){
    if (e.target.matches("h3")){
        const repoName = e.target.innerText;
        // console.log(repoName);
        specificRepo(repoName);
    }
    
});

// Pull information for selected repo
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

// Dispaly repo that was clicked
const displaySpecificRepo = function(repoInfo, languages){
    repoData.innerText = "";
    const repo = document.createElement("div");
    repo.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(', ')} </p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" re'="noreferrer noopener">View repo on GitHub!</a>`;
    repoData.append(repo);
    reposSection.classList.add("hide");
    repoData.classList.remove("hide");
    btn.classList.remove("hide");
};

btn.addEventListener("click", function(e){
    reposSection.classList.remove("hide");
    repoData.classList.add("hide");
    btn.classList.add("hide");
});

// Search functionality: listen for input, make lowercase, search existing repos for search term
filterInput.addEventListener("input", function(e){
    const captureValue = e.target.value;
    const repos = document.querySelectorAll(".repo");
    const searchResults = captureValue.toLowerCase();
    for (const repo of repos){
        const lowRepo = repo.innerText.toLowerCase();
        // console.log(lowRepo);
        if (!lowRepo.includes(searchResults)){
            repo.classList.add("hide");
        } else {
            repo.classList.remove("hide");
        }
    }
});
const overview = document.querySelector(".overview");
const username = 'hjrandolph';

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
};


// Create and name an async function to fetch information from your GitHub 
// profile using the GitHub API address: https://api.github.com. Target the 
// "users" endpoint and use a template literal to add the global username 
// variable to the endpoint: users/${username}. 
// Notice that you'll add a "$" character in front of the variable name to 
// create a placeholder. Because you're using a template literal, surround 
// the URL in backticks instead of quotation marks.
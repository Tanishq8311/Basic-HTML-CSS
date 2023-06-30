const url="https://api.github.com/users/";
const SearchInputEl=document.getElementById("SearchInput");
const SearchButtonEl=document.getElementById("Searchbtn");
const ProfileContainerEl=document.getElementById("ProfileContainer")
const loadingEl=document.getElementById("loading")
const generateProfile=(profile)=>{
    return(
        `
        <div class="profile-box">
        <div class="top-section">
            <div class="left">
                <div class="avatar">
                    <img src="${profile.avatar_url}" alt="avatar">    
                </div>
                <div class="self">
                    <h1>${profile.name}</h1>
                    <h3>${profile.login}</h3>
                </div>
            </div>
            <a href="${profile.repos_url}">
            <button class="primary-btn">Check Profile</button>
            </a>
        </div>
        <div class="about">
            <h2>About</h2>
            <p>${profile.bio}</p>
        </div>
        <div class="status">
            <div class="status-item">
                <h3>Followers</h3>
                <p>${profile.followers}</p>
            </div>
            <div class="status-item">
                <h3>Followings</h3>
                <p>${profile.following}</p>
            </div>
            <div class="status-item">
                <h3>Repos</h3>
                <p>${profile.public_repos}</p>
            </div>
        </div>
    </div>
    `
    );
};



const fetchProfile=async()=>{
    
    const username=SearchInputEl.value;
    loadingEl.innerText="Loading.....";
    loadingEl.style.color="blue";
    try {
        const res=await fetch(`${url}${username}`);
        const data=await res.json();
        if(data.bio){
            loadingEl.innerText =" ";
            ProfileContainerEl.innerHTML=generateProfile(data);
        }else{
            loadingEl.innerHTML=data.message;
            loadingEl.style.color="red";
        }
    } catch (error) {
        console.log({error});
        loadingEl.innerText =" ";
    }
};

SearchButtonEl.addEventListener("click",fetchProfile);
fetchProfile();
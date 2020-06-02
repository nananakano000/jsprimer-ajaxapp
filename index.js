// import { response } from "express";

console.log("index.js: loaded");

const heading = document.querySelector("h2");
const headingText = heading.textContent;
console.log(headingText);

const button = document.createElement("button");
button.textContent = "Push Me";
document.body.appendChild(button);

function main(){
    fetchUserInfo('nananakano000');
}

function fetchUserInfo(userId){
    fetch(`https://api.github.com/users/${encodeURIComponent(userId)}`)
    .then(response => {
        console.log(response.status);
        if(!response.ok){
            console.error("エラーレスポンス", response);
        }else{
            return response.json().then(userInfo => {
                const view = createView(userInfo);
                displayView(view);
            });
        }
    }).catch(error => {
        console.error(error);
    });
}

function createView(userInfo){
    return escapeHTML`
    <h4>${userInfo.name} (@${userInfo.login})</h4>
    <img src="${userInfo.avatar_url}" alt="${userInfo.login}" height="100">
    <dl>
        <dt>Location</dt>
        <dd>${userInfo.location}</dd>
        <dt>Repositories</dt>
        <dd>${userInfo.public_repos}</dd>
    </dl>
    `;
}

function displayView(view){
    const res = document.getElementById("result");
    res.innerHTML = view;
}

function fetchUserInfoByXHR(userId){
    const req = new XMLHttpRequest();
    req.open("GET", `https://api.github.com/users/${encodeURIComponent(userId)}`);
    req.addEventListener("load", () => {
        if(req.status >= 200 && req.status < 300){
            const userInfo = JSON.parse(req.responseText);
            console.log(userInfo);
        }else{
            console.error("エラーレスポンス", req.statusText);
        }
    });
    req.addEventListener("error", () => {
        console.error("ネットワークエラー");
    });

    req.send();
}

function escapeSpecialChars(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function escapeHTML(strings, ...values) {
    // console.log("strings")
    // console.log(strings)
    // console.log("values")
    // console.log(values)
    return strings.reduce((result, str, i) => {
        const value = values[i - 1];
        // console.log(result)
        // console.log(str)
        if (typeof value === "string") {
            return result + escapeSpecialChars(value) + str;
        } else {
            return result + String(value) + str;
        }
    });  
}

function openYouTube(){
    window.open('https://www.youtube.com/feed/trending', '_blank');
}

console.log("Start!");
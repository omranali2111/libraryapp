


    

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const apiUrl = "https://localhost:7166/api/BookOperation";
showBooks(apiUrl);

function showBooks(url) {
   
    const requestOptions = {
        method: "GET",
        
        redirect: "follow",
    };

    fetch(url,requestOptions).then(res => res.json())
        .then(function (data) {
            console.log(data); 

            data.forEach(book => {
                const el = document.createElement('div');
                const image = document.createElement('img');
                const text = document.createElement('h2');

                text.innerHTML = book.title;

                
                image.src = book.imagePath; 

                el.appendChild(image);
                el.appendChild(text);
                main.appendChild(el);
            });
        });
}


function searchBook(SEARCHAPI) {
   
    const requestOptions = {
        method: "GET",
        redirect: "follow",
    };

    fetch(SEARCHAPI,requestOptions).then(res => res.json())
        .then(function (data) {
            console.log(data); 

            data.forEach(book => {
                const el = document.createElement('div');
                const image = document.createElement('img');
                const text = document.createElement('h2');

                text.innerHTML = book.title;

                
                image.src = book.imagePath; 

                el.appendChild(image);
                el.appendChild(text);
                main.appendChild(el);
            });
        });
}
search.addEventListener("input", () => {
    main.innerHTML = '';

    const searchTerm = search.value.trim();
    const SEARCHAPI =`https://localhost:7166/api/BookOperation/ByTitle?title=${searchTerm}`
    
    if (searchTerm) {
        searchBook(SEARCHAPI);
    }
});

function onSuccessfulLogin() {
    const signoutHeader = document.querySelector('.signout-header');
    if(signoutHeader) {
        signoutHeader.style.display = 'flex';
    } else {
        console.error('Element with class .signout-header not found.');
    }
    const loginHeader = document.querySelector('.login-header');
    if (loginHeader) {
        loginHeader.style.display = 'none';
    } else {
        console.error('Element with class .login-header not found.');
    }
}
document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('authToken');
    
    if (token) {
        onSuccessfulLogin();
    }
});





function logout() {
    const loginHeader = document.querySelector('.login-header');
    loginHeader.style.display = 'flex';
    
    const signoutHeader = document.querySelector('.signout-header');
    signoutHeader.style.display = 'none';
    
    localStorage.removeItem("authToken");
  
    // Redirect the user to the login page
   // window.location.href = "login.html";
  }



const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById(".search");
const apiUrl = "https://localhost:7166/api/BookOperation";





document.addEventListener('DOMContentLoaded', function() {
    showBooks(apiUrl);
    
});

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
        const deleteButton = document.createElement('button');

            text.innerText = book.title; 
            image.src = book.imagePath;
            image.alt = book.title; 
            deleteButton.innerText = 'X'; 
            deleteButton.className = 'delete-btn';
            deleteButton.onclick = function() { handleDeleteClick(book.title); };
            
            
    
        text.innerHTML = book.title;
        image.src = book.imagePath;
    
       
       
    
        // Add event listener to the el div
        el.addEventListener('click', () => {
            console.log("Book element clicked");
    
          
    
           
            const bookModal = document.getElementById('bookModal');
            const bookInfoContainer = document.getElementById('bookInfoContainer');
    
            bookInfoContainer.innerHTML = `
                <div class="book-info">
                    <img src="${book.imagePath}" alt="${book.title}" class="book-image">
                    <div class="book-details">
                        <h2>${book.title}</h2>
                        <p class="book-author">By ${book.author}</p>
                        <p class="publication-year">Published In ${book.publicationYear}</p>
                        <div class="book-actions">
                        <p class="book-description">${book.description}</p>
                        <button class="borrow-btn" onclick="handleBorrowClick(${book.id})">Borrow</button>
                       


                         </div>
                    </div>
                </div>
            `;
    
            bookModal.style.display = 'block';
    
            const closeButton = bookModal.querySelector('.close-btn');
            if (closeButton) {
                closeButton.addEventListener('click', () => {
                    bookModal.style.display = 'none';
                });
            } else {
                console.error(".close-btn element not found within bookModal!");
            }
        });
    
        el.appendChild(image);
        el.appendChild(text);
        el.appendChild(deleteButton);
        main.appendChild(el);
        
       
       
    });
   
});
}



function searchBook(SEARCHAPI) {
    const requestOptions = {
        method: "GET",
        redirect: "follow",
    };

    fetch(SEARCHAPI, requestOptions)
        .then(res => res.json())
        .then(function(data) {
            console.log(data);

          

            data.forEach(book => {
                const el = document.createElement('div');
                const image = document.createElement('img');
                const text = document.createElement('h2');

                text.innerHTML = book.title;
                image.src = book.imagePath;

                el.addEventListener('click', () => {
                    console.log("Book element clicked");
            
                  
            
                   
                    const bookModal = document.getElementById('bookModal');
                    const bookInfoContainer = document.getElementById('bookInfoContainer');
            
                    bookInfoContainer.innerHTML = `
                        <div class="book-info">
                            <img src="${book.imagePath}" alt="${book.title}" class="book-image">
                            <div class="book-details">
                                <h2>${book.title}</h2>
                                <p class="book-author">By ${book.author}</p>
                                <p class="publication-year">Published In ${book.publicationYear}</p>
                                <div class="book-actions">
                        <p class="book-description">${book.description}</p>
                        <button class="borrow-btn" onclick="handleBorrowClick(${book.id})">Borrow</button>

                         </div>
                            </div>
                        </div>
                    `;
            
                    bookModal.style.display = 'block';
            
                    const closeButton = bookModal.querySelector('.close-btn');
                    if (closeButton) {
                        closeButton.addEventListener('click', () => {
                            bookModal.style.display = 'none';
                        });
                    } else {
                        console.error(".close-btn element not found within bookModal!");
                    }
                });
            
                el.appendChild(image);
                el.appendChild(text);
                main.appendChild(el);
                
               
               
            });
        });
}




document.addEventListener('DOMContentLoaded', function() {

    const searchInputs = document.querySelectorAll(".search");

    let debounceTimeout;
    
    searchInputs.forEach(input => {
        input.addEventListener("input", () => {
            clearTimeout(debounceTimeout);  // Clear any existing debounce timeout

            const searchTerm = input.value.trim();
            const SEARCHAPI = `https://localhost:7166/api/BookOperation/ByTitle?title=${searchTerm}`;
            
            debounceTimeout = setTimeout(() => { // Delay the execution by 300ms
                main.innerHTML = '';  // Clear main content once
                if (searchTerm) {
                    searchBook(SEARCHAPI);
                } else {
                    showBooks(apiUrl);
                }
            }, 300);  // A 300ms delay, adjust as needed
        });
    });

});







function onSuccessfulLogin() {
    const signoutHeader = document.querySelector('.signout-header');
    const adminDropdown = document.getElementById('adminDropdown');
    const userRole = localStorage.getItem('userRole'); // Get the user role from local storage
    
    if (signoutHeader) {
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

    // Show or hide admin dropdown based on the user's role
    if (adminDropdown) {
        if (userRole === 'Admin') {
            adminDropdown.style.display = 'block';
        } else {
            adminDropdown.style.display = 'none';
        }
    } else {
        console.error('Element with id #adminDropdown not found.');
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
    
    localStorage.clear();
  
    
  }

  function handleBorrowClick(bookId) {
    const token = localStorage.getItem('authToken'); // Get token from local storage

    if (!token) { // If token is missing
        window.location.href = 'PatronLogin.html'; // Redirect to login page
    } else {
        const patronId = localStorage.getItem('patronId'); 

        if (bookId && patronId) {
            borrowBook(token, bookId, patronId);
        } else {
            console.log("Missing book ID or patron ID");
        }
    }
}


function borrowBook(token, bookId, patronId) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "patronId": patronId,
        "bookId": bookId
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://localhost:7166/api/PatronOperation/BorrowBook", requestOptions)
        .then(response => {
            // Handle based on status code
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(response);
            }
        })
        .then(data => {
            console.log(data);
            const borrowBtn = document.querySelector('.borrow-btn');
            if (borrowBtn) {
                borrowBtn.style.display = 'none';

                const notAvailableBtn = document.createElement('button');
                notAvailableBtn.innerHTML = 'Not Available';
                notAvailableBtn.classList.add('borrow-btn', 'not-available');

                borrowBtn.parentNode.insertBefore(notAvailableBtn, borrowBtn.nextSibling);
            }
        })
        .catch(response => {
            // Handle different error responses here
            if (response.status === 400) { // Book is not available for borrowing
                alert("Book is not available for borrowing.");
            } else if (response.status === 404) { // Invalid patron or book ID
                alert("Invalid patron or book ID. Please check and try again.");
            } else if (response.status === 500) { // Server error
                response.text().then(errorText => {
                    console.error("Server Error:", errorText);
                    alert("An error occurred. Please try again later.");
                });
            } else {
                alert("An unexpected error occurred. Please try again.");
            }
        });
}

document.getElementById('refreshPage').addEventListener('click', function(event) {
    event.preventDefault(); 
    location.reload(); 
  });
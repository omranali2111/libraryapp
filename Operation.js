function fetchBooks() {
    const myHeaders = new Headers();

    const token = localStorage.getItem('authToken');

    if (!token) {
        console.error('No token found in localStorage.');
        return;
    }

    myHeaders.append("Authorization", "bearer " + token);

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    const apiGETUrl = "https://localhost:7166/api/BookOperation/ViewAllBooks";   
    fetch(apiGETUrl, requestOptions)
        .then(response => response.json())
        .then(data => {
           
            const booksList = data.map(book => {
                return {
                    title: book.title,
                    author: book.author,
                    publicationYear: book.publicationYear
                };
            });

           

            const ul = document.getElementById("booksList");
            ul.innerHTML = "";
            booksList.forEach(book => {
                const li = document.createElement("li");
                li.textContent = `${book.title} by ${book.author} (${book.publicationYear})`;
                ul.appendChild(li);
            });
        })
        .catch(error => console.log('error', error));
}
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("book-operation").addEventListener("change", function(event) {
        if (event.target.value === "option1") {
            fetchBooks();
        }
    });
});
function logout() {
                
    localStorage.removeItem('authToken');

    // Redirect the user to the login page
    window.location.href = 'login.html'; 
}




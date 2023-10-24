function fetchBooks() {
    const myHeaders = new Headers();
  
    const token = localStorage.getItem("authToken");
  
    if (!token) {
      console.error("No token found in localStorage.");
      return;
    }
  
    myHeaders.append("Authorization", "bearer " + token);
  
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    
    const apiGETUrl = "https://localhost:7166/api/BookOperation";
  
    fetch(apiGETUrl, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        const booksList = data.map((book) => {
          return {
            title: book.title,
            author: book.author,
            publicationYear: book.publicationYear,
          };
        });
  
        const tbody = document.getElementById("booksTableBody");
        tbody.innerHTML = "";  // Clear any existing rows
  
        booksList.forEach((book, index) => {
          const tr = document.createElement("tr");
  
          const tdTitle = document.createElement("td");
          tdTitle.textContent = book.title;
  
          const tdAuthor = document.createElement("td");
          tdAuthor.textContent = book.author;
  
          const tdYear = document.createElement("td");
          tdYear.textContent = book.publicationYear;
  
          tr.appendChild(tdTitle);
          tr.appendChild(tdAuthor);
          tr.appendChild(tdYear);
  
          tbody.appendChild(tr);
        });
        const table = document.querySelector(".table");
      table.style.display = "table";
      })
      .catch((error) => console.log("error", error));
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("book-operation").addEventListener("change", function (event) {
      // Reference to the table
      const table = document.querySelector(".table");
  
      if (event.target.value === "option1") {
        fetchBooks();
      } else {
        // Hide the table if any other option is selected
        table.style.display = "none";
      }
    });
  });
  
  

function logout() {
  localStorage.removeItem("authToken");

  // Redirect the user to the login page
  window.location.href = "login.html";
}

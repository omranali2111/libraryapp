


document.getElementById('addBookForm').addEventListener('submit', function(e) {
    e.preventDefault();  // Prevent the form from refreshing the page

    // Get the values from the form fields
    const title = document.getElementById('bookTitle').value;
    const author = document.getElementById('bookAuthor').value;
    const year = document.getElementById('bookYear').value;
    const image = document.getElementById('bookImage').value;
    const description = document.getElementById('bookDescription').value;

    // Construct the data to send
    const rawData = {
        id: 0,  
        title: title,
        author: author,
        publicationYear: parseInt(year),
        isAvailable: true,  
        price: 0,  
        imagePath: image,
        description: description
    };
    var token = localStorage.getItem("authToken"); 
    // Convert the data to a JSON string
    const jsonData = JSON.stringify(rawData);

    // Your existing fetch code, using jsonData
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    if(token) {
        myHeaders.append("Authorization", "Bearer " + token);
    }

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: jsonData,
        redirect: 'follow'
    };

    fetch("https://localhost:7166/api/BookOperation", requestOptions)
        .then(response => {
            if (response.ok) {
                return response.text();
            }
            throw new Error('Network response was not ok.');
        })
        .then(result => {
            console.log(result);
            let messageElement = document.getElementById('responseMessage');
            messageElement.innerHTML = 'Book added successfully!';
            messageElement.classList.add('success-message'); 
            messageElement.classList.remove('error-message');

            // Redirect to home.html after 3 seconds
            setTimeout(() => {
                window.location.href = 'home.html';
            }, 3000);
        })
        .catch(error => {
            console.log('error', error);
            let messageElement = document.getElementById('responseMessage');
            messageElement.innerHTML = 'Error: ' + error.message;
            messageElement.classList.add('error-message');
            messageElement.classList.remove('success-message');

            // Redirect to home.html after 3 seconds
            setTimeout(() => {
                window.location.href = 'home.html';
            }, 3000);
        });
});





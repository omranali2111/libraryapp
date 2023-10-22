
function sendLoginRequest() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const email = document.getElementById('Email').value;
    const password = document.getElementById('password').value;
    const bodyData = {
        email: email,
        password: password
    };

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(bodyData),
        redirect: 'follow'
    };

    fetch("https://localhost:7166/api/UserLogin/user-login", requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        
           
             else {
                return response.text().then(textData => {
                    console.log(textData);
                    localStorage.setItem('authToken', textData);
                    window.location.href = "book.html"
                });
            }
        })
        .catch(error => {
            console.error('Fetch error:', error.message);
        });
}



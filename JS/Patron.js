

    document.addEventListener("DOMContentLoaded", function() {

        var signupForm = document.getElementById('signupForm');
        if (signupForm) {
            signupForm.addEventListener('submit', function(e) {
                var name = document.querySelector('input[name="name"]').value;
                var email = document.querySelector('input[name="email"]').value;
                var password = document.querySelector('input[name="password"]').value;
                var contactNumber = document.querySelector('input[name="contactnumber"]').value;
                var age = parseInt(document.querySelector('input[name="age"]').value, 10);
            
                addpatron(name, email, password, contactNumber, age);
            });
        }
    })
    function addpatron(name, email, password, contactNumber, age) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        var raw = JSON.stringify({
          "id": 0,
          "name": name,
          "email": email,
          "password": password,
          "contactNumber": contactNumber,
          "age": age
        });
    
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
    
        fetch("https://localhost:7166/api/PatronOperation", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result)).then(()=>
          
            window.location.href = "PatronLogin.html")
          .catch(error => console.log('error', error));
    }
   
       
    
    function PatronLogin(event) {
        event.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
       console.log(email);
       console.log(password);
       
    
        const requestBody = {
            email: email,
            password: password
        };
    
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(requestBody),
            redirect: 'follow'
        };
    
        fetch("https://localhost:7166/api/PatronLogin", requestOptions)
        .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            } else {
              return response.text().then((textData) => {
                console.log(textData);
                localStorage.setItem("authTokenforPatron", textData);
                ;
              }).then(()=>{
                
                window.location.href = "home.html"; 
              
              });
            }
          })
          .catch((error) => {
            console.error("Fetch error:", error.message);
          });
      }
      
    

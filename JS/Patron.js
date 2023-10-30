

document.addEventListener("DOMContentLoaded", function() {
  var signupForm = document.getElementById('signupForm');
  if (signupForm) {
      signupForm.addEventListener('submit', function(e) {
          e.preventDefault(); // prevent the form from submitting the traditional way
          
          var name = document.querySelector('input[name="name"]').value;
          var email = document.querySelector('input[name="email"]').value;
          var password = document.querySelector('input[name="password"]').value;
          var contactNumber = document.querySelector('input[name="contactnumber"]').value;
          var age = parseInt(document.querySelector('input[name="age"]').value, 10);

          // Get the selected role
          var role = document.querySelector('input[name="role"]:checked').value;
          
          addpatron(name, email, password, contactNumber, age, role);
      });
  }
});

function addpatron(name, email, password, contactNumber, age, role) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  var raw = JSON.stringify({
    "name": name,
    "email": email,
    "password": password,
    "contactNumber": contactNumber,
    "age": age,
    "role": role 
  });
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  fetch("https://localhost:7166/api/User/SignUp", requestOptions)
  .then(response => {
      if (response.status === 200) {
          return response.text();
      } else {
          throw new Error(`Server responded with status: ${response.status}`);
      }
  })
  .then(result => {
      console.log(result);
      
      // Add success message to the page
      var successMessage = document.createElement('div');
      successMessage.innerHTML = 'SignUp is Successful!';
      successMessage.style.color = 'green';
      document.body.appendChild(successMessage);
      
      // Redirect to the login page
      setTimeout(() => {
          window.location.href = "PatronLogin.html";
      }, 2000); // Wait 2 seconds before redirecting
  })
  .catch(error => {
      console.log('error', error);
  });
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
    
        fetch("https://localhost:7166/api/User/Login", requestOptions)
        .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            } else {
              return response.json();
            }
        })
        .then((data) => {
            console.log(data);
            localStorage.setItem("authToken", data.token);
            localStorage.setItem("userRole", data.role);
            window.location.href = "home.html";
        })
        .catch((error) => {
            console.error("Fetch error:", error.message);
        });
    
  }
      
    

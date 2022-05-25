// console.log("JS loaded");
const firstName = document.querySelector(".first-name");
const lastName = document.querySelector(".last-name");
const phoneNumber = document.querySelector(".phone");
const email = document.querySelector(".email");
const password =document.querySelector(".password");
const confirmPassword = document.querySelector(".con-password");
const form = document.querySelector(".form");


const validateAndCreateUser = (e)=>{
    e.preventDefault();
    let userName = firstName.value;
    let userLastName = lastName.value;
    let userPhoneNo = phoneNumber.value;
    let userEmail = email.value;
    let userPassword =password.value;
    let conPassword = confirmPassword.value;

    let isValid = validateForm(userPassword,conPassword,userPhoneNo, userName);

    if(isValid){
        const data = {
            first_name: userName,
            last_name: userLastName, 
            phone_no: userPhoneNo, 
            email: userEmail,
            password: userPassword
        }; 
    
        let url = "http://localhost:3000/user/register";
        
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(res=>res.json())
        .then(data => {
            alert(data.data.msg);
            location.href = "../index.html";
        })
        .catch(err => {
            console.log(err);
            alert("Server error")
        })
    } else {
        alert("Check your inputs")
    }
    
}



function validateForm(password, conPassword, phoneNo, username){
    if(password !== conPassword){
        return false;
    };
    if(phoneNo.length !== 10 && phoneNo.length !== 13){
        return false;
    } 
    if(username.length === 0){
        return false;
    }
    
    return true;
}

form.addEventListener('submit', validateAndCreateUser);

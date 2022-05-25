const phoneNumber = document.querySelector(".phone")
const loginPassword = document.querySelector(".password")
const form = document.querySelector(".login-form")

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    let url = "http://localhost:3000/user/login";
    const data = {
        phone: phoneNumber.value,
        password: loginPassword.value,
    }
    fetch(url,{
        method :"POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).then(res => {
        if(res.status === 404){
            return alert("Check your credentials!");
        } else if(res.status === 200){
            res.json().then(response=>{
                console.log(response)
                localStorage.setItem("user-data",JSON.stringify(response.data[0]));
                redirectTo("/pages/homepage.html");
            });          
        }
    }).catch(err => {
        console.log(err);
        alert("Server error");
    });
});

const redirectTo = (path) => {
    location.href = path;
}
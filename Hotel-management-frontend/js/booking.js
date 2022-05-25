const priceTag = document.getElementById("total-amount");
const form = document.getElementById("booking-form");
const roomType = document.getElementById("room-type-dropdown");
const checkIn = document.getElementById("checkin-date");
const checkOut = document.getElementById("checkout-date");
const foodAndServices = document.getElementById("food-service-dropdown");
const totalAmount = document.getElementById("total-amount");

let prices = {
    roomPrice: 0,
    servicePrice: 0
};

let total;

let calculateRoomPrice = (e) => {
    let choice = e.target.value;

    if(choice === "1"){
        prices.roomPrice = 2500
    } else if(choice === "2"){
        prices.roomPrice= 4000
    } else {
        prices.roomPrice = 6000
    }
    total =  prices.roomPrice + prices.servicePrice;

    priceTag.innerText = "RS: " + total + "/-";
}

let addFoodServicesAmount = (e) => {
    let choice = e.target.value;

    if(choice === "1"){
        prices.servicePrice = 1000
    } else {
        prices.servicePrice = 0
    }
    let total =  prices.roomPrice + prices.servicePrice;

    priceTag.innerText = "RS: " + total + "/-";
}

form.addEventListener('submit', (event)=>{
    let userData = JSON.parse(localStorage.getItem("user-data"));
    event.preventDefault();
    let url = "http://localhost:3000/booking";
    let data = {
        roomType : roomType.value,
        checkIn : checkIn.value,
        checkOut : checkOut.value,
        facilities : foodAndServices.value,
        totalAmount : total,
        id: userData.user_id
    };

    let options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    };

    fetch(url, options)
    .then((res)=>{
        if(res.status===404){
            return ("error")
        }
        else if(res.status === 200){
            res.json()
            .then(response =>{
                alert(response.custom_message);
                location.href = "/pages/view_booking.html";
            })
        }
        
    })
});

window.onload = () => {
   let uid = document.getElementById("uid");
   let uname = document.getElementById("uname");
   let raw_data = localStorage.getItem("user-data");
   let data = JSON.parse(raw_data);

   uid.innerText = data.user_id;
    uname.innerText = data.first_name;
    
}

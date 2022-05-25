let booking_table = document.getElementById("booking-table");
let tableContent = "";


window.onload = () => {
    let userData = JSON.parse(localStorage.getItem("user-data"));
    let url =`http://www.localhost:3000/booking/${userData.user_id}`;

    fetch(url)
    .then((res)=>{
        if(res.status===404){
            console.log("error")
        }
        else if(res.status===200){
            res.json()
            .then(data => {
                let table = "<table border='1'>";
                table += `<tr>
                            <th>Booking ID</th>
                            <th>Room type</th>
                            <th>User ID</th>
                            <th>Booking date</th>
                            <th>Bill Total</th>
                            <th>Check-in</th>
                            <th>Check-out</th>
                            <th>Facilities</th>
                        </tr>`;

                for(let i=0; i<data.length; i++){
                    table += "<tr>";

                    table +=`<td> ${data[i].bid} </td>`;
                    table +=`<td> ${data[i].room_type} </td>`;
                    table +=`<td> ${data[i].id} </td>`;
                    table +=`<td> ${new Date(data[i].booking_date).toLocaleString().split(",")[0]} </td>`;
                    table += `<td> ${data[i].amount} </td> `;
                    table +=`<td> ${new Date( data[i].check_in).toLocaleString().split(",")[0] } </td>`;
                    table +=`<td> ${new Date( data[i].check_out).toLocaleString().split(",")[0]   } </td>`;
                    table +=`<td> ${data[i].facilities} </td>`;

                    table += "</tr>";
                }
                table += "</table>";
                booking_table.innerHTML = table;
            })
        }
    })
 }

//  function createTableCol(tableItem, item){
//      return tableItem += `<td>${item}</td>`
//  }
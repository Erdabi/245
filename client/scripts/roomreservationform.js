const roomReservationForm = document.getElementById('room-reservation-form');

roomReservationForm.addEventListener('submit', function(event) {
    event.preventDefault();

    alert("Die Reservierung war erfolgreich!")

    const postRoomReservationData = async () => {
        const checkIn = document.getElementById('check-in').value;
        const checkOut = document.getElementById('check-out').value;
        const roomName = document.getElementById('room-name').value;
        const bookingTime = document.getElementById('booking-time').value;
    
        const roomReservationData = {
            checkIn: checkIn,
            checkOut: checkOut,
            roomName: roomName,
            bookingTime: bookingTime
        };
    
        await fetch("/api/roomReservation", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(roomReservationData),
        });
    };
});

function on(img) {
    let imageContainer = document.getElementById("image-container");
      imageContainer.innerHTML = "";
    imgUrl = img;
    let imgElement = document.createElement("img");

    if (imgUrl === 'bumplisalp') {
        imgElement.src = "../img/Bauplan_Raume/Blümisalp.png";
    } else if (imgUrl === 'Boston') {
        imgElement.src = "../img/Bauplan_Raume/Boston.png";
    } else if (imgUrl === 'Cambridge') {
        imgElement.src = "../img/Bauplan_Raume/Cambridge.png";
    } else if (imgUrl === 'Eiger') {
        imgElement.src = "../img/Bauplan_Raume/Eiger.png";
    } else if (imgUrl === 'Harvard') {
        imgElement.src = "../img/Bauplan_Raume/Harvard.png";
    } else if (imgUrl === 'Rubin') {
        imgElement.src = "../img/Bauplan_Raume/Rubin.png";
    } else if (imgUrl === 'Smaragd') {
        imgElement.src = "../img/Bauplan_Raume/Smaragd.png";
    } else if (imgUrl === 'Sorbonne') {
        imgElement.src = "../img/Bauplan_Raume/Sorbone.png";
    }
    

    // Füge das Bild-Element dem Container hinzu
    imageContainer.appendChild(imgElement);

    document.getElementById("overlay").style.display = "block";
  }
  
function off() {
    document.getElementById("overlay").style.display = "none";
  }

  

  

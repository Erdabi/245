const roomReservationForm = document.getElementById('room-reservation-form');

roomReservationForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const checkIn = document.getElementById('check-in').value;
    const checkOut = document.getElementById('check-out').value;
    const roomNumber = document.getElementById('room-number').value;

    if (new Date(checkIn) > new Date(checkOut)) {
        alert('Check-In date must be earlier than Check-Out date.');
        return;
    }

    const roomReservationData = {
        checkIn,
        checkOut,
        roomNumber
    };

    fetch('/api/roomReservation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // Hier können weitere Header hinzugefügt werden, falls erforderlich
        },
        body: JSON.stringify(roomReservationData)
    })
    .then(response => response.json())
    .then(data => {
        if(data.status === 'success') {
            alert('Room reservation successful.');
        } else {
            alert('The selected room is not available for the given dates. Please choose another room.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while making the room reservation.');
    });
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

  

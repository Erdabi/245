const roomReservationForm = document.getElementById('reservation-form');

roomReservationForm.addEventListener('submit', function(event) {
    event.preventDefault();
    postRoomReservationData();
    alert("Die Reservierung war erfolgreich!")
});
const postRoomReservationData = async () => {
    const checkIn = document.getElementById('check-in').value;
    const checkOut = document.getElementById('check-out').value;
    const roomName = document.getElementById('room-name').value;
    const bookingTimeFrom = document.getElementById('booking-time-from').value;
    const bookingTimeTo = document.getElementById('booking-time-to').value;
    const bookingTime = bookingTimeFrom + "-" + bookingTimeTo

    console.log(bookingTime)

    const roomReservationData = {
        checkIn: checkIn,
        checkOut: checkOut,
        roomName: roomName,
        bookingTime: bookingTime
    };

    await fetch("/api/booking", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(roomReservationData),
    });
};

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

  async function fetchRoomReservations() {
    try {
      const response = await fetch('/api/roomreservations'); 
      const reservations = await response.json();
  
      const tableBody = document.getElementById('room-reservation-table');
      tableBody.innerHTML = ''; 
  
      reservations.forEach(reservation => {
        const row = `<tr>
          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">${reservation.roomName}</td>
          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">${reservation.reservedFrom}</td>
          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">${reservation.reservedUntil}</td>
          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">${reservation.status}</td>
        </tr>`;
        tableBody.innerHTML += row;
      });
    } catch (error) {
      console.error('Fehler beim Abrufen der Raumreservierungen:', error);
    }
  }
  

  

const roomReservationForm = document.getElementById('reservation-form');
document.addEventListener('DOMContentLoaded', fetchAndDisplayRoomReservations);

roomReservationForm.addEventListener('submit', function(event) {
    event.preventDefault();
    postRoomReservationData();
    
});
const postRoomReservationData = async () => {
    const checkIn = document.getElementById('check-in').value;
    const checkOut = document.getElementById('check-out').value;
    const articleName = document.getElementById('room-name').value;
    const bookingTimeFrom = document.getElementById('booking-time-from').value;
    const bookingTimeTo = document.getElementById('booking-time-to').value;
    const bookingTime = bookingTimeFrom + "-" + bookingTimeTo

    if (!checkIn || !checkOut || !articleName || !bookingTimeFrom || !bookingTimeTo || !bookingTime) {
      alert("Füllen sie alle Felder aus")
    } else {

    const roomReservationData = {
        checkIn: checkIn,
        checkOut: checkOut,
        articleName: articleName,
        bookingTime: bookingTime
    };

    await fetch("/api/booking", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(roomReservationData),
    });
    fetchAndDisplayRoomReservations();
    alert("Die Reservierung war erfolgreich!")
  }
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


async function fetchAndDisplayRoomReservations() {
  try {
    // Senden einer Anfrage an den Backend-Endpunkt
    const response = await fetch('/api/getRooms');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const reservations = await response.json();
    console.log(reservations)

    // Auswählen des Tabellenkörpers im HTML-Dokument
    const tableBody = document.getElementById('room-reservation-table');
    tableBody.innerHTML = ''; // Löschen des vorhandenen Inhalts

    // Durchlaufen der empfangenen Daten und Hinzufügen von Zeilen zur Tabelle
    
    reservations.forEach(reservation => {
      newCheckIn = reservation.check_in.slice(0, -14);
      newCheckOut = reservation.check_out.slice(0, -14);
      const row = `<tr>
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">${reservation.article_name}</td>
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">${newCheckIn}</td>
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">${newCheckIn}</td>
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">${reservation.booking_time}</td>
      </tr>`;
      tableBody.innerHTML += row;
    });
  } catch (error) {
    console.error('Fehler beim Abrufen der Raumreservierungen:', error);
  }
}



  

  

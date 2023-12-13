const parkingReservationForm = document.getElementById('parking-reservation-form');
document.addEventListener('DOMContentLoaded', fetchAndDisplayParkingReservations);
parkingReservationForm.addEventListener('submit', function(event) {
    event.preventDefault();
    postParkingReservationData();

});

const postParkingReservationData = async () => {

        
    const checkIn = document.getElementById('parking-check-in').value;
    const checkOut = document.getElementById('parking-check-out').value;
    const parkingNumber = document.getElementById('parking-number').value;
    const bookingTimeFrom = document.getElementById('booking-time-from').value;
    const bookingTimeTo = document.getElementById('booking-time-to').value;
    const bookingTime = bookingTimeFrom + "-" + bookingTimeTo

    if (!checkIn || !checkOut || !parkingNumber || !bookingTimeFrom || !bookingTimeTo) {
        alert("Füllen sie alle Felder aus")
      } else {

    const parkingReservationData = {
        checkIn: checkIn,
        checkOut: checkOut,
        articleName: parkingNumber,
        bookingTime: bookingTime
    };

    await fetch("/api/booking", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(parkingReservationData),
    });
    fetchAndDisplayParkingReservations();
    alert("Die Reservierung war erfolgreich!")
}
};
async function fetchAndDisplayParkingReservations() {
    try {
      // Senden einer Anfrage an den Backend-Endpunkt
      const response = await fetch('/api/getParking');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const reservations = await response.json();
      console.log(reservations)
  
      // Auswählen des Tabellenkörpers im HTML-Dokument
      const tableBody = document.getElementById('parkingspace-reservation-table');
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
      console.error('Fehler beim Abrufen der Parkplatzreservierungen:', error);
    }
  }

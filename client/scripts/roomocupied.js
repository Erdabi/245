// roomreservationform.js
async function fetchRoomReservations() {
    try {
      const response = await fetch('/api/roomreservations'); // Pfad zur API, die die Reservationsdaten liefert
      const reservations = await response.json();
  
      const tableBody = document.getElementById('room-reservation-table');
      tableBody.innerHTML = ''; // Bestehende Einträge löschen
  
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
  
  // Rufen Sie diese Funktion auf, wenn die Seite geladen wird
  document.addEventListener('DOMContentLoaded', fetchRoomReservations);
  
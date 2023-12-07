const reservationForm = document.getElementById('reservation-form');

        reservationForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const checkIn = new Date(document.getElementById('check-in').value);
            const checkOut = new Date(document.getElementById('check-out').value);
            const roomNumber = document.getElementById('room-number').value;

            if (checkIn > checkOut) {
                alert('Check-In date must be earlier than Check-Out date.');
                return;
            }

            const daysDifference = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));

            if (daysDifference < 1) {
                alert('Please stay at least one night.');
                return;
            }

            // Fetch room availability data from the server
            // Check if the selected room is available for the given dates

            if (true) {
                alert('Reservation successful.');
            } else {
                alert('The selected room is not available for the given dates. Please choose another room.');
            }
        });
const parkingReservationForm = document.getElementById('parking-reservation-form');

parkingReservationForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const parkingNumber = document.getElementById('parking-number').value;
    const parkingCheckIn = document.getElementById('parking-check-in').value;
    const parkingCheckOut = document.getElementById('parking-check-out').value;
    const parkingTime = document.getElementById('parking-time').value;

    if (new Date(parkingCheckIn) > new Date(parkingCheckOut)) {
        alert('Check-In date must be earlier than Check-Out date.');
        return;
    }

    const parkingReservationData = {
        parkingCheckIn,
        parkingCheckOut,
        parkingNumber,
        parkingTime
    };

    fetch('/api/parkingReservation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // Hier können weitere Header hinzugefügt werden, falls erforderlich
        },
        body: JSON.stringify(parkingReservationData)
    })
    .then(response => response.json())
    .then(data => {
        if(data.status === 'success') {
            alert('Parking reservation successful.');
        } else {
            alert('The selected parking space is not available for the given dates. Please choose another parking space.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while making the parking reservation.');
    });
});

const parkingReservationForm = document.getElementById('parking-reservation-form');

parkingReservationForm.addEventListener('submit', function(event) {
    event.preventDefault();
    alert("Die Reservierung war erfolgreich!")
    const postParkingReservationData = async () => {

        
        const checkIn = document.getElementById('parking-check-in').value;
        const checkOut = document.getElementById('parking-check-out').value;
        const parkingNumber = document.getElementById('parking-number').value;
        const bookingTime = document.getElementById('p-number').value;
    
        const parkingReservationData = {
            checkIn: checkIn,
            checkOut: checkOut,
            parkingName: parkingNumber,
            bookingTime: bookingTime
        };
    
        await fetch("/api/parking-reservation", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(parkingReservationData),
        });
    };
    
    
});

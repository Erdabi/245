const parkingReservationForm = document.getElementById('parking-reservation-form');

parkingReservationForm.addEventListener('submit', function(event) {
    event.preventDefault();
    postParkingReservationData();
    alert("Die Reservierung war erfolgreich!")
    
    
    
});

const postParkingReservationData = async () => {

        
    const checkIn = document.getElementById('parking-check-in').value;
    const checkOut = document.getElementById('parking-check-out').value;
    const parkingNumber = document.getElementById('parking-number').value;
    const bookingTimeFrom = document.getElementById('booking-time-from').value;
    const bookingTimeTo = document.getElementById('booking-time-to').value;
    const bookingTime = bookingTimeFrom + "-" + bookingTimeTo

    const parkingReservationData = {
        checkIn: checkIn,
        checkOut: checkOut,
        parkingName: parkingNumber,
        bookingTime: bookingTime
    };

    await fetch("/api/booking", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(parkingReservationData),
    });
};

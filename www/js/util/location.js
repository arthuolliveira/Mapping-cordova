document.addEventListener('deviceready', initLocationPermission, false);

function initLocationPermission() {
    const asked = localStorage.getItem("locationPermissionAsked");

    if (asked === "true") {
        console.log("Permissão já solicitada anteriormente.");
        return;
    }

    requestLocation();
}

function requestLocation() {
    navigator.geolocation.getCurrentPosition(
        (pos) => {
            console.log("Localização:", pos.coords);
            localStorage.setItem("locationPermissionAsked", "true");
        },
        (err) => {
            console.warn("Erro ao obter localização:", err);
            localStorage.setItem("locationPermissionAsked", "true");
        },
        {
            maximumAge: 0,
            timeout: 10000,
            enableHighAccuracy: true
        }
    );
}

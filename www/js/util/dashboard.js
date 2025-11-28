console.log("dashboard.js carregado");

// ====================== MAPA =========================

let map;

// Coordenadas dos 3 pisos simulados do Salvador Shopping
const floors = {
    L1: { lat: -12.9782, lng: -38.4556, zoom: 19 },
    L2: { lat: -12.9780, lng: -38.4556, zoom: 19 },
    L3: { lat: -12.9778, lng: -38.4556, zoom: 19 }
};

// Adiciona localização do usuário (bolinha azul)
function addUserLocationMarker(pos) {
    const userLocation = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
    };

    new google.maps.Marker({
        position: userLocation,
        map: map,
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: '#4285F4',
            fillOpacity: 1,
            strokeColor: 'white',
            strokeWeight: 2
        }
    });

    new google.maps.Circle({
        strokeColor: '#4285F4',
        strokeOpacity: 0.4,
        strokeWeight: 1,
        fillColor: '#4285F4',
        fillOpacity: 0.15,
        map: map,
        center: userLocation,
        radius: pos.coords.accuracy
    });

    map.panTo(userLocation);
}

// =============== FUNÇÃO QUE O GOOGLE MAPS CHAMA ===============
window.initMap = function () {
    console.log("init map");

    const salvadorShopping = { lat: -12.9782, lng: -38.4556 };

    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 18,
        center: salvadorShopping,
        mapId: "4504f8b37365c3d0",
        disableDefaultUI: true,
        clickableIcons: false,
        gestureHandling: "greedy"
    });

    new google.maps.Marker({
        position: salvadorShopping,
        map: map,
        title: "Salvador Shopping"
    });

    // localização do usuário
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                console.log("Localização adquirida:", pos.coords);
                addUserLocationMarker(pos);
            },
            (err) => {
                console.warn("Falha ao obter localização:", err);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    }
};

// ====================== ANDARES =========================

function changeFloor(floor) {
    const data = floors[floor];
    map.setCenter({ lat: data.lat, lng: data.lng });
    map.setZoom(data.zoom);
}

document.addEventListener("DOMContentLoaded", () => {
    const floorItems = document.querySelectorAll(".floor-item");

    floorItems.forEach(btn => {
        btn.addEventListener("click", () => {
            const floor = btn.dataset.floor;
            changeFloor(floor);

            floorItems.forEach(i => i.classList.remove("active"));
            btn.classList.add("active");

            console.log("Andar selecionado:", floor);

            const list = document.getElementById("floorList");
            if (list) list.classList.remove("visible");
        });
    });
});

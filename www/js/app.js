document.addEventListener('deviceready', onDeviceReady, false);
// --- Controle de Permissão de Localização ---

document.addEventListener('deviceready', () => {
    checkAndRequestLocationPermission();
});

function checkAndRequestLocationPermission() {
    const alreadyAsked = localStorage.getItem("gpsPermissionAsked");

    if (alreadyAsked === "true") {
        console.log("Permissão já foi solicitada anteriormente.");
        return;
    }

    askForLocation();
}

function askForLocation() {
    if (!navigator.geolocation) {
        console.warn("Geolocalização não suportada.");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (pos) => {
            console.log("Localização obtida:", pos.coords);
            localStorage.setItem("gpsPermissionAsked", "true");
        },
        (err) => {
            console.warn("Erro ao obter localização:", err);
            localStorage.setItem("gpsPermissionAsked", "true");
        },
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }
    );
}

function onDeviceReady() {
    console.log('Cordova está pronto!');
    console.log('Página atual:', window.location.pathname);
}

function goToPage(page) {
    window.location.href = page;
}

function goBack() {
    window.history.back();
}

const API_URL = 'http://localhost:3000/api';

async function callAPI(endpoint, method = 'GET', data = null) {
    try {
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        if (data && method !== 'GET') {
            options.body = JSON.stringify(data);
        }
        
        const response = await fetch(`${API_URL}${endpoint}`, options);
        const result = await response.json();
        
        return result;
    } catch (error) {
        console.error('Erro na API:', error);
        throw error;
    }
}

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validarSenha(senha) {
    return senha.length >= 6;
}

function validarTelefone(telefone) {
    const numeros = telefone.replace(/\D/g, '');
    return numeros.length >= 10 && numeros.length <= 11;
}

function salvarDados(chave, dados) {
    try {
        const dadosString = JSON.stringify(dados);
        window.appData = window.appData || {};
        window.appData[chave] = dadosString;
    } catch (error) {
        console.error('Erro ao salvar dados:', error);
    }
}

function obterDados(chave) {
    try {
        if (window.appData && window.appData[chave]) {
            return JSON.parse(window.appData[chave]);
        }
        return null;
    } catch (error) {
        console.error('Erro ao obter dados:', error);
        return null;
    }
}

function removerDados(chave) {
    try {
        if (window.appData) {
            delete window.appData[chave];
        }
    } catch (error) {
        console.error('Erro ao remover dados:', error);
    }
}

function mostrarMensagem(mensagem, tipo = 'info') {
    alert(mensagem);
}

function formatarTelefone(telefone) {
    const numeros = telefone.replace(/\D/g, '');
    
    if (numeros.length === 11) {
        return numeros.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (numeros.length === 10) {
        return numeros.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    
    return telefone;
}

function formatarData(data) {
    const numeros = data.replace(/\D/g, '');
    
    if (numeros.length <= 2) {
        return numeros;
    } else if (numeros.length <= 4) {
        return numeros.replace(/(\d{2})(\d{0,2})/, '$1/$2');
    } else {
        return numeros.replace(/(\d{2})(\d{2})(\d{0,4})/, '$1/$2/$3').substr(0, 10);
    }
}

function aplicarMascaras() {
    const inputTelefone = document.querySelector('input[type="tel"]');
    if (inputTelefone) {
        inputTelefone.addEventListener('input', (e) => {
            e.target.value = formatarTelefone(e.target.value);
        });
    }
    
    const inputData = document.querySelector('input[placeholder*="Data"]');
    if (inputData) {
        inputData.addEventListener('input', (e) => {
            e.target.value = formatarData(e.target.value);
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', aplicarMascaras);
} else {
    aplicarMascaras();
}

function loginAs(profileType) {
    if (profileType === 'usuario') {
        goToPage('user-login.html');
    } else if (profileType === 'administrador') {
        console.log('Navegar para admin-login.html');
    } else if (profileType === 'lojista') {
        console.log('Navegar para lojista-login.html');
    }
}

const sheet = document.getElementById('mainBottomSheet');
let isExpanded = false;
function toggleSheet() {
    isExpanded = !isExpanded;
    sheet.classList.toggle('expanded', isExpanded);
    document.body.style.overflow = isExpanded ? 'hidden' : 'auto';
}


let startY;
let currentY;

sheet.addEventListener('touchstart', (e) => {
    if (e.target.closest('.sheet-handle')) {
        startY = e.touches[0].clientY;
        sheet.style.transition = 'none';
    }
}, { passive: true });

sheet.addEventListener('touchmove', (e) => {
    if (startY === undefined) return;
    
    currentY = e.touches[0].clientY;
    const diff = currentY - startY; 
    const newTranslateY = Math.max(0, diff); 
    
    sheet.style.transform = `translateY(${newTranslateY}px)`;

}, { passive: true });

sheet.addEventListener('touchend', () => {
    if (startY === undefined) return;
    
    sheet.style.transition = 'transform 0.3s ease-out, height 0.3s ease-out';
    const sheetHeight = sheet.clientHeight;
    const dragDistanceThreshold = 50; 
    
    if (isExpanded && (currentY - startY) > dragDistanceThreshold) {
        isExpanded = false;
    } else if (!isExpanded && (startY - currentY) > dragDistanceThreshold) {
        isExpanded = true;
    }
    sheet.classList.toggle('expanded', isExpanded);
    sheet.style.transform = isExpanded ? 'translateY(0)' : 'translateY(calc(100% - 140px))';
    
    startY = undefined;
    currentY = undefined;
    
    document.body.style.overflow = isExpanded ? 'hidden' : 'auto';
});

function swapLocations() {
    const origin = document.getElementById('originLocation');
    const destination = document.getElementById('destinationLocation');
    const tempValue = origin.value;
    origin.value = destination.value;
    destination.value = tempValue;
    destination.focus(); 
}

// dashboard.html (dentro da tag <script> ou em app.js)

// --- 1. Lógica para Abrir/Fechar a Lista de Andares ---

function toggleFloorList() {
    const floorList = document.getElementById('floorList');
    floorList.classList.toggle('visible');
}

// --- 2. Lógica para Alternar a Camada de Acessibilidade ---

function toggleAccessibilityLayer() {
    const accessibilityBtn = document.querySelector('.accessibility-btn');
    
    // Alterna o estilo do botão para feedback visual
    accessibilityBtn.classList.toggle('active-accessibility');
    
    if (accessibilityBtn.classList.contains('active-accessibility')) {
        // Lógica para mostrar elevadores, rampas e rotas acessíveis
        console.log("Camada de acessibilidade ATIVADA");
        accessibilityBtn.style.backgroundColor = '#4CAF50';
        accessibilityBtn.style.color = '#fff';
    } else {
        // Lógica para esconder a camada
        console.log("Camada de acessibilidade DESATIVADA");
        accessibilityBtn.style.backgroundColor = '#fff';
        accessibilityBtn.style.color = '#4CAF50';
    }
    
    // (Implementar a lógica real de mapa aqui)
}

// --- 3. Lógica para Selecionar Andar ---

document.addEventListener('DOMContentLoaded', () => {
    const floorItems = document.querySelectorAll('.floor-item');
    
    floorItems.forEach(item => {
        item.addEventListener('click', () => {
            floorItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            const selectedFloor = item.getAttribute('data-floor');
            console.log(`Andar selecionado: ${selectedFloor}`);
            toggleFloorList(); 
        });
    });
});

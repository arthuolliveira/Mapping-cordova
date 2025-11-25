document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    console.log('Cordova está pronto!');
    const btnTestar = document.getElementById('btnTestar');
    const resultado = document.getElementById('resultado');
    
    btnTestar.addEventListener('click', () => {
        resultado.classList.add('show');
        resultado.textContent = 'App Cordova funcionando! 🎉';
        fazerChamadaAPI();
    });
}

async function fazerChamadaAPI() {
    const resultado = document.getElementById('resultado');
    
    try {
        resultado.textContent = 'Carregando dados...';
        
        // Substituir pela URL da sua API Node.js
        const response = await fetch('https://sua-api.com/endpoint');
        const data = await response.json();
        
        resultado.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        resultado.textContent = 'Erro ao carregar: ' + error.message;
    }
}

const apiKey = '1a4e1ef5876289e02380161d464f2421'; // Pega de graça no openweathermap.org

async function buscarClima() {
    const cidade = document.getElementById('cidade').value;
    const resultado = document.getElementById('resultado');
    
    if (!cidade) {
        resultado.innerHTML = 'Digite uma cidade!';
        return;
    }

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            resultado.innerHTML = `
                <h2>${data.name}</h2>
                <p>Temperatura: ${data.main.temp}°C</p>
                <p>Sensação: ${data.main.feels_like}°C</p>
                <p>Clima: ${data.weather[0].description}</p>
            `;
        } else {
            resultado.innerHTML = 'Cidade não encontrada!';
        }
    } catch (error) {
        resultado.innerHTML = 'Erro ao buscar dados';
    }

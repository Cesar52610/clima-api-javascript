function gerarEstrelas(quantidade) {
    const starsContainer = document.getElementById('stars');
    starsContainer.innerHTML = '';

    for (let i = 0; i < quantidade; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        star.style.animationDuration = `${Math.random() * 2 + 2}s`;
        starsContainer.appendChild(star);
    }
}

function buscarClima() {
    const cidade = document.getElementById("cidade").value;
    const apiKey = "f2e80ca6bec842e973ef77bf5dcf3695";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`;

    const card = document.getElementById("resultado");

    if (cidade === "") {
        alert("Digite uma cidade!");
        return;
    }

    fetch(url)
   .then(response => {
        if (!response.ok) throw new Error("Cidade não encontrada");
        return response.json();
    })
   .then(data => {
        const clima = data.weather[0].main;
        const temperatura = Math.round(data.main.temp);
        const descricao = data.weather[0].description;
        const nomeCidade = data.name;
        const sensacao = Math.round(data.main.feels_like);
        const umidade = data.main.humidity;

        const agora = data.dt;
        const nascerSol = data.sys.sunrise;
        const porSol = data.sys.sunset;
        const ehNoite = agora < nascerSol || agora > porSol;

        document.querySelector('.temp').textContent = `${temperatura}°`;
        document.querySelector('.cidade').textContent = nomeCidade;
        document.querySelector('.descricao').textContent = descricao;
        document.getElementById('sensacao').textContent = `${sensacao}°`;
        document.getElementById('umidade').textContent = `${umidade}%`;

        const player = document.getElementById('icone-clima');
        const animacoes = {
            Clear: ehNoite? 'https://lottie.host/8c4b0d1e-2f3a-4b5c-6d7e-8f9a0b1c2d3e/1a2b3c4d5e.json' : 'https://lottie.host/4d5e6f7a-8b9c-0d1e-2f3a-4b5c6d7e8f9a/6g7h8i9j0k.json',
            Clouds: ehNoite? 'https://lottie.host/2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e/3l4m5n6o7p.json' : 'https://lottie.host/9a8b7c6d-5e4f-3a2b-1c0d-9e8f7a6b5c4d/q1w2e3r4t5.json',
            Rain: 'https://lottie.host/1b2c3d4e-5f6a-7b8c-9d0e-1f2a3b4c5d6e/y6u7i8o9p0.json',
            Drizzle: 'https://lottie.host/1b2c3d4e-5f6a-7b8c-9d0e-1f2a3b4c5d6e/y6u7i8o9p0.json',
            Thunderstorm: 'https://lottie.host/7f8a9b0c-1d2e-3f4a-5b6c-7d8e9f0a1b2c/a2s3d4f5g6.json',
            Snow: 'https://lottie.host/3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f/z1x2c3v4b5.json',
            Mist: 'https://lottie.host/9d0e1f2a-3b4c-5d6e-7f8a-9b0c1d2e3f4a/n6m7b8v9c0.json',
            Fog: 'https://lottie.host/9d0e1f2a-3b4c-5d6e-7f8a-9b0c1d2e3f4a/n6m7b8v9c0.json'
        };
        player.load(animacoes[clima] || animacoes.Clear);

        const cores = {
            Clear: ehNoite? 'linear-gradient(180deg, #0F2027 0%, #203A43 50%, #2C5364 100%)' : 'linear-gradient(180deg, #FFB800 0%, #FF6B00 100%)',
            Clouds: ehNoite? 'linear-gradient(180deg, #232526 0%, #414345 100%)' : 'linear-gradient(180deg, #546E7A 0%, #37474F 100%)',
            Rain: 'linear-gradient(180deg, #1e3c72 0%, #2a5298 100%)',
            Drizzle: 'linear-gradient(180deg, #1e3c72 0%, #2a5298 100%)',
            Thunderstorm: 'linear-gradient(180deg, #141E30 0%, #243B55 100%)',
            Snow: ehNoite? 'linear-gradient(180deg, #16222A 0%, #3A6073 100%)' : 'linear-gradient(180deg, #83a4d4 0%, #b6fbff 100%)',
            Mist: 'linear-gradient(180deg, #606c88 0%, #3f4c6b 100%)',
            Fog: 'linear-gradient(180deg, #606c88 0%, #3f4c6b 100%)'
        };
        document.body.style.background = cores[clima] || cores.Clear;

        const starsDiv = document.getElementById('stars');
        if (ehNoite) {
            gerarEstrelas(100);
            starsDiv.classList.add('active');
        } else {
            starsDiv.classList.remove('active');
            setTimeout(() => starsDiv.innerHTML = '', 800);
        }

        card.classList.remove('hidden');
        card.style.animation = 'none';
        card.offsetHeight;
        card.style.animation = null;
    })
   .catch(error => {
        alert(`Erro: ${error.message}`);
        card.classList.add('hidden');
    });
} 
document.getElementById("cidade").addEventListener("keyup", function(e) {
    if (e.key === "Enter") buscarClima();
});

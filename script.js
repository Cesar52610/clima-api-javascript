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
     .then(data => {// ... código que já atualiza texto, Lottie e fundo ...

// NOVO: Ativa/desativa estrelas baseado se é noite
const starsDiv = document.getElementById('stars');
if (ehNoite) {
    gerarEstrelas(100);
    starsDiv.classList.add('active');
} else {
    starsDiv.classList.remove('active');
    setTimeout(() => starsDiv.innerHTML = '', 800);
}

// 4. Mostra o card com animação
const card = document.getElementById("resultado");
card.classList.remove('hidden');
// ... resto do código
            const clima = data.weather[0].main;
            const temperatura = Math.round(data.main.temp);
            const descricao = data.weather[0].description;
            const nomeCidade = data.name;
            const sensacao = Math.round(data.main.feels_like);
            const umidade = data.main.humidity;

            // 1. Atualiza textos
            document.querySelector('.temp').textContent = `${temperatura}°`;
            document.querySelector('.cidade').textContent = nomeCidade;
            document.querySelector('.descricao').textContent = descricao;
            document.getElementById('sensacao').textContent = `${sensacao}°`;
            document.getElementById('umidade').textContent = `${umidade}%`;

            // 2. Troca animação Lottie
            const player = document.getElementById('icone-clima');
            const animacoes = {
                Clear: 'https://lottie.host/4b4c4d4e-5f6a-7b8c-9d0e-1f2a3b4c5d6e/k8j9h0g1f2.json',
                Clouds: 'https://lottie.host/1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d/n7m8b6v5c4.json',
                Rain: 'https://lottie.host/5f6a7b8c-9d0e-1f2a-3b4c-5d6e7f8a9b0c/z6x5c4v3b2.json',
                Drizzle: 'https://lottie.host/5f6a7b8c-9d0e-1f2a-3b4c-5d6e7f8a9b0c/z6x5c4v3b2.json',
                Thunderstorm: 'https://lottie.host/8e9f0a1b-2c3d-4e5f-6a7b-8c9d0e1f2a3b/x1c2v3b4n5.json',
                Snow: 'https://lottie.host/9z8x7c6v-5b4n-3m2l-1k0j-9h8g7f6d5s4a/q1w2e3r4t5y.json',
                Mist: 'https://lottie.host/2w3e4r5t-6y7u-8i9o-0p1a-2s3d4f5g6h7j/h6j5k4l3z2.json',
                Fog: 'https://lottie.host/2w3e4r5t-6y7u-8i9o-0p1a-2s3d4f5g6h7j/h6j5k4l3z2.json'
            };
            player.load(animacoes[clima] || animacoes.Clear);

            // 3. Troca gradiente do fundo
            const cores = {
                Clear: 'linear-gradient(180deg, #FFB800 0%, #FF6B00 100%)',
                Clouds: 'linear-gradient(180deg, #546E7A 0%, #37474F 100%)',
                Rain: 'linear-gradient(180deg, #1e3c72 0%, #2a5298 100%)',
                Drizzle: 'linear-gradient(180deg, #1e3c72 0%, #2a5298 100%)',
                Thunderstorm: 'linear-gradient(180deg, #141E30 0%, #243B55 100%)',
                Snow: 'linear-gradient(180deg, #83a4d4 0%, #b6fbff 100%)',
                Mist: 'linear-gradient(180deg, #606c88 0%, #3f4c6b 100%)'
            };
            document.body.style.background = cores[clima] || cores.Clear;

            // 4. Mostra o card
            card.classList.remove('hidden');
        })
     .catch(error => {
            alert(`Erro: ${error.message}`);
            card.classList.add('hidden');
        });
}

// Buscar com Enter
document.getElementById("cidade").addEventListener("keyup", function(e) {
    if (e.key === "Enter") buscarClima();
});

function buscarClima() {
    const cidade = document.getElementById("cidade").value;
    const apiKey = "f2e80ca6bec842e973ef77bf5dcf3695";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`;

    if (cidade === "") {
        document.getElementById("resultado").innerHTML = "Digite uma cidade!";
        return;
    }

    fetch(url)
       .then(response => {
            if (!response.ok) {
                throw new Error("Cidade não encontrada");
            }
            return response.json();
        })
       .then(data => {
            const temperatura = data.main.temp;
            const descricao = data.weather[0].description;
            const nomeCidade = data.name;

            document.getElementById("resultado").innerHTML =
                `${nomeCidade}: ${temperatura}°C, ${descricao}`;
        })
       .catch(error => {
            document.getElementById("resultado").innerHTML =
                `Erro: ${error.message}`;
        });
}

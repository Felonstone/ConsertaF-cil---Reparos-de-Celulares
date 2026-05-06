const form = document.getElementById("contatoForm");
const resposta = document.getElementById("resposta");














function criarUsuario() {
    let servidor = "https://notas-api-qvzz.onrender.com/";
    let endpoint = "usuarios";
    let url = servidor + endpoint;

    let novoUsuario = {
        nome: nome.value,
        email: email.value,
        password: senha.value
    };

    let msgSucesso = document.getElementById("resposta");
    let msgErro = document.getElementById("resposta");

    // limpa mensagens
    msgSucesso.innerHTML = "";
    msgErro.innerHTML = "";

    let requestInit = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(novoUsuario)
    };

    fetch(url, requestInit)
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro na API");
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            // 🔴 SALVA O ID DO USUÁRIO
            localStorage.setItem("userId", data.id);
            msgSucesso.innerHTML = "Usuário criado com sucesso!";
            window.location.href = "chamadosCliente/index.html";
            //window.location.href = "../Login/Ler Notas/notas.html";
        })
        .catch(error => {
            console.error(error);
            msgErro.innerHTML = "Erro ao criar usuário!";
            //window.location.href = "../Login/login.html";
        });
}

















form.addEventListener("submit", function(e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const mensagem = document.getElementById("mensagem").value;

    if(nome && email && mensagem){
        resposta.textContent = `Obrigado, ${nome}! Sua mensagem foi enviada com sucesso.`;
        console.log(`Nome: ${nome}, Email: ${email}, Senha: ${senha} Mensagem: ${mensagem},`)
        form.reset();
        criarUsuario()
        

    } else {
        resposta.textContent = "Por favor, preencha todos os campos.";
    }
});
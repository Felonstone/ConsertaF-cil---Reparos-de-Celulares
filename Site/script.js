const form = document.getElementById("contatoForm");
const resposta = document.getElementById("resposta");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const mensagem = document.getElementById("mensagem").value;

    if(nome && email && mensagem){
        resposta.textContent = `Obrigado, ${nome}! Sua mensagem foi enviada com sucesso.`;
        console.log(`Nome: ${nome}, Email: ${email}, Mensagem: ${mensagem},`)
        form.reset();
    } else {
        resposta.textContent = "Por favor, preencha todos os campos.";
    }
});
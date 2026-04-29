
let inputNome = document.getElementById("nome");
let inputEmail = document.getElementById("email");
let inputSenha = document.getElementById("senha");
let inputCofirmarSenha = document.getElementById("confirmarSenha");

let senhaResultado = document.getElementById("senhaResult")

let form = document.getElementById("formCadastro");
let senhaComNumeros = ["1", "2" , "3" , "4" , "5" , "6" , "7" , "8" , "9" , "0"];
let senhaComUpperCase = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","X","Y","Z"];
let senhaComLowerCase = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","x","y","z"];
let senhaComSimbolo = ["!","@","#","$","%","¨","&","*","(",")","_","-","+","="];

function SenhaComLetraMinuscula(){
    for (let i = 0; i < inputSenha.value.length; i++) {
        let caractere = inputSenha.value[i];
        if (senhaComUpperCase.includes(caractere)) {
            checkboxSenhaLetraGrande.checked = true;
            
        }
        if (checkboxSenhaLetraGrande.checked == true){
            senhaResultGrande.innerText = "Senha com letras Pequenas :D";
        }else{
            checkboxSenhaLetraGrande.checked = false;
            senhaResultGrande.innerText = "Senha sem Letras Pequenas :(";
        }
    }
}


function SenhaComCaractereEspecial(){
    for (let i = 0; i < inputSenha.value.length; i++) {
        let caractere = inputSenha.value[i];
        if (senhaComSimbolo.includes(caractere)) {
            checkboxSenhaSimboloEspecial.checked = true;
            
        }
        if (checkboxSenhaSimboloEspecial.checked == true){
            senhaComSimbolo.innerText = "Senha com Símbolos Especiais :D";
        }else{
            checkboxSenhaSimboloEspecial.checked = false;
            senhaComSimbolo.innerText = "Senha sem Símbolos Especiais :(";
        }
    }


}




function SenhaComLetraMaiuscula(){
    for (let i = 0; i < inputSenha.value.length; i++) {
        let caractere = inputSenha.value[i];

        if (senhaComLowerCase.includes(caractere)) {
            checkboxSenhaLetraPequena.checked = true;
                    }

        if (checkboxSenhaLetraPequena.checked == true){
            senhaResultPequena.innerText = "Senha com letras Maiúsculas :D";
        }else{
            checkboxSenhaLetraPequena.checked = false;
            senhaResultPequena.innerText = "Senha sem Letras Grandes :(";
        }
    }
}

function SenhaComOitoLetras(){
    let tamanhoSenha = inputSenha.value.length;
    if(tamanhoSenha < 8) {
        senhaResultado.innerText = "Senha Curta";  
        checkboxSenha.checked = false;
        console.log("Senha Curta")             
    } else {
        senhaResultado.innerText = "Senha Boa!";   
        checkboxSenha.checked = true;
        console.log("Senha Boa!")                
    }
}


function validarSenhasIguais(){
    let estaCorreto = inputSenha.value == inputCofirmarSenha.value

    return estaCorreto;
}


function SenhaComNumeros(){
    for (let i = 0; i < inputSenha.value.length; i++) {
        let caractere = inputSenha.value[i];

        if (senhaComNumeros.includes(caractere)) {
            checkboxSenhaComNumeros.checked = true;
                    }

        if (checkboxSenhaComNumeros.checked == true){
            senhaResultNumeros.innerText = "Senha com Números :D";
        }else{
            checkboxSenhaComNumeros.checked = false;
            senhaResultNumeros.innerText = "Senha sem Números :(";
        }
    }
}



function ValidarSenha(){
    validarSenhasIguais();
    SenhaComLetraMinuscula();
    SenhaComLetraMaiuscula();
    SenhaComOitoLetras();
    SenhaComNumeros();
    SenhaComCaractereEspecial();
    validarSenhasIguais()

   
    
}











form.addEventListener("submit", function(event){
    event.preventDefault();
    
    if (validarSenhasIguais()){
        //criarusuario(),
        senhaResultIgual.innerText = "As Senhas são Iguais";
        checkboxSenhaIgual.checked= true;
        
        console.log("Usuário Criado!")
        console.log(nome)
        console.log(email)
        console.log(email)
        console.log(email)
        ValidarSenha()
    }
    
    
})

inputSenha.addEventListener("input", ValidarSenha);
ValidarSenha()

















function criarUsuario() {
    let servidor = "https://notas-api-qvzz.onrender.com/";
    let endpoint = "usuarios";
    let url = servidor + endpoint;

    let novoUsuario = {
        nome: inputNome.value,
        email: inputEmail.value,
        password: inputCofirmarSenha.value // corrigido
    };

    let msgSucesso = document.getElementById("good-message");
    let msgErro = document.getElementById("bad-message");

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
            window.location.href = "../Login/Ler Notas/notas.html";
        })
        .catch(error => {
            console.error(error);
            msgErro.innerHTML = "Erro ao criar usuário!";
            //window.location.href = "../Login/login.html";
        });
}
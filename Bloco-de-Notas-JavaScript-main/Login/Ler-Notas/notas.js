const msgSucesso = document.getElementById("good-message");
const msgErro = document.getElementById("bad-message");

let template = document.getElementById("nota-template");
let containerNotas = document.getElementById("containerNotas");

let url = "https://notas-api-qvzz.onrender.com/";
let endpointItensBarra = "itens/";
let endpointItens = "itens";
let endpointUsuario = "usuario/";
let endpointAuthLogin = "auth/Login/";
 



let userId = localStorage.getItem("userId");
let token = localStorage.getItem("token");

console.log("ID do usuário:", userId);



function exibirNotas(notas) {
    msgSucesso.innerHTML = "";
    msgErro.innerHTML = "";
    containerNotas.innerHTML = "";

    for (let nota of notas) {
        let clone = template.content.cloneNode(true);
        clone.querySelector(".descricao").textContent =
            `ID: ${nota.id} - ${nota.descricao}`;
        containerNotas.appendChild(clone);
    }
}



if (!userId) {
    msgErro.innerHTML = "Usuário não autenticado!";
    setTimeout(() => {
        window.location.href = "../login.html";
    }, 1500);
} else {
    carregarNotas();
}



function carregarNotas() {
    fetch(url + endpointItensBarra + endpointUsuario + userId, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro na API");
        }
        return response.json();
    })
    .then(json => {
        console.log(json);
        exibirNotas(json);
        msgSucesso.innerHTML = "Achamos as seguintes notas:";
    })
    .catch(error => {
        console.error("Erro ao buscar notas:", error);
        msgErro.innerHTML = "Erro ao obter notas";
    });
}



function pedirNovaNota(){
    let novaNota = prompt("Digite a sua nota");

    if (!novaNota) {
        msgErro.innerHTML = "Nota não pode ser vazia!";
        return;
    }

    CriarNovaNota(novaNota); 
}

function CriarNovaNota(novaNota) {

    let novoUsuario = {
        descricao: novaNota,
        dataLimite: "2026-03-23T22:52:35.528Z",
        usuarioId: userId
    };

    msgSucesso.innerHTML = "";
    msgErro.innerHTML = "";

    fetch(url + endpointItens, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify(novoUsuario)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro na API");
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        msgSucesso.innerHTML = "Nota criada com sucesso!";
        carregarNotas();
    })
    .catch(error => {
        console.error(error);
        msgErro.innerHTML = "Erro ao criar Nota!";
    });
}



function apagarNota(){
    let idNota = prompt("Digite o Id da Nota a ser apagada");

    if (!idNota) return;

    killNote(idNota);
}

function killNote(idNota) {

    
    fetch(url + endpointItensBarra + idNota, {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro na API");
        }
    })
    .then(() => {
        msgSucesso.innerHTML = "Nota deletada com sucesso!";
        carregarNotas();
    })
    .catch(error => {
        console.error(error);
        msgErro.innerHTML = "Erro ao deletar nota!";
    });
}

function notaApagara() {
    let idNota = prompt("Digite o Id da Nota a ser Editada");
    let mensagemNota = prompt("Digite a Nova Nota");
    if (!idNota || !mensagemNota) return;

    editarNota(idNota, mensagemNota);
}

function editarNota(idNota, mensagemNota) {
    

    
    let notaEdit = {
        "descricao": mensagemNota,
        "dataLimite": "2026-03-23T22:52:35.528Z", 
        "usuarioId": userId 
    };

    msgSucesso.innerHTML = "";
    msgErro.innerHTML = "";

    fetch(url + endpointItensBarra + idNota, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token 
        },
        body: JSON.stringify(notaEdit) 
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro na API");
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        msgSucesso.innerHTML = "Nota editada com sucesso!";
        carregarNotas(); 
    })
    .catch(error => {
        console.error(error);
        msgErro.innerHTML = "Erro ao editar Nota!";
    });
}
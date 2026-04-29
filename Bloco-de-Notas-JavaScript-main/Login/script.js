let inputEmail = document.getElementById("email");
let inputSenha = document.getElementById("senha");
let form = document.getElementById("formLogin");



let buton_Entrar = document.getElementById("button_Entrar");
function showLoading()
{

    buton_Entrar.classList.add("loading");
    buton_Entrar.classList.remove("btn-confirmar");
    buton_Entrar.innerText = ""

}

function hideLoading()
{
    buton_Entrar.classList.add("btn-confirmar");
    buton_Entrar.classList.remove("loading");
    buton_Entrar.innerText = "Entrar"
}

hideLoading()


function redirecionaPaginaNota()
{
    window.location.href = "../Login/Ler-Notas/notas.html";
}




form.addEventListener("submit", function(event) {
    event.preventDefault(); // 🔴 impede recarregar a página
    LoginUsuario();
});

function LoginUsuario() {
    let url = "https://notas-api-qvzz.onrender.com/auth/login";

    let logUsuario = {
        email: inputEmail.value,
        password: inputSenha.value
    };

    let msgSucesso = document.getElementById("good-message");
    let msgErro = document.getElementById("bad-message");

    msgSucesso.innerHTML = "";
    msgErro.innerHTML = "";
    showLoading()
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(logUsuario)
        
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro na API");
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        
        localStorage.setItem("userId", data.userId);
        
        localStorage.setItem("token", data.token);
        msgSucesso.innerHTML = "Login feito com sucesso!";

        redirecionaPaginaNota()
        
    })
    .catch(error => {
        console.error(error);
        msgErro.innerHTML = "Email ou senha inválidos!";
    })
    .finally(() => {
        hideLoading()
    });
}
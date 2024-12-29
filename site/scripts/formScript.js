// ten plik.js jest odpowiedzialny za wyswietlanie formularzy dla przycisków login i register

// buttons
let registerButton = document.getElementById("registerButton");
let loginButton = document.getElementById("loginButton");

// div to put form
let formDiv = document.getElementById("logRegForm");

const registerForm = `
    <div class="formDiv">

        <button id="closeFormButton"> X </button>

        <form onsubmit="validateReg()">
            <label for="email">E-mail : </label>
            <input type="email" id="email" name="email" required/>
            <br />


            <label for="username">Nazwa użytkownika: </label>
            <input type="text" id="username" name="username" required/>
            <br/>


            <label for="password">Hasło : </label>
            <input type="password" id="password" name="password" required/>
            <br />

            <button type="submit"> Zarejestruj się! </button>
        </form>

        <div class="ans">

        </div>
    </div>
    `;

const loginForm = `
        <div class="formDiv">

            <button id="closeFormButton"> X </button>

            <form onsubmit="loginSend()">

                <label for="username">Nazwa użytkownika: </label>
                <input type="text" id="username" name="username" required />
                <br />


                <label for="password">Hasło : </label>
                <input type="password" id="password" name="password" required />
                <br />

                <button type="submit"> Zaloguj się! </button>
            </form>

            <div class="ans">

            </div>
        </div> `
// event listeners

function showForm(form_html) {
    formDiv.innerHTML = form_html;

    formDiv.style.display = 'block';

    let Xbutton = document.getElementById('closeFormButton');
    Xbutton.addEventListener('click', () => {
        formDiv.style.display = 'none';
        formDiv.innerHTML = '';
    })

}

registerButton.addEventListener('click', () => showForm(registerForm));
loginButton.addEventListener('click', () => showForm(loginForm));


const configForm = `
    <div class="formDiv" id>

        <button id="closeFormButton"> X </button>

        <form onsubmit="saveConfiguration(event)" id="configurationForm">
            <label for="setting_name"> Nazwij konfiguracje : </label>
            <input type="text" id="setting_name" name="setting_name" required/>
            <br />

            <button type="submit"> Zapisz konfiguracje! </button>
        </form>

        <div class="ans">

        </div>
    </div>
    `;

if(doesCookieExist('user_id'))
{
    let button = document.getElementById('config-save');
    button.style.display = 'inline';

    button.addEventListener('click', () => showForm(configForm));

}
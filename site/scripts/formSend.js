function getDataFromForm()
{
    const form = document.querySelector('.formDiv > form');
    const formData = new FormData(form);

    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    return formObject;
}


function register(event) 
{
    event.preventDefault();

    let formObject = getDataFromForm();

    const ans = document.querySelector('.ans')

    fetch('http://localhost:3001/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',  // Dodajemy nagłówek
        },
        body: JSON.stringify(formObject),
    })
    .then(res => res.text())
    .then(res => {
        ans.textContent = res;
    })
}

function login(event)
{
    event.preventDefault();

    let formObject = getDataFromForm();

    const ans = document.querySelector('.ans')

    fetch("http://localhost:3001/auth/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',  // Dodajemy nagłówek
        },
        body: JSON.stringify(formObject),
        credentials: 'include',
    })
    .then(res => res.text())
    .then(res => {

        if (doesCookieExist('user_id')) {
            window.location.reload()
        } else {
            ans.textContent = res;
        }

    })

}

function logout()
{
    fetch("http://localhost:3001/auth/logout", {
        method: 'POST',
        credentials: 'include'
    })
    .then(res => res.text())
    .then(res => {
        if(window.location.pathname.endsWith('profil.html'))
            window.location.href = 'index.html';
        else
            window.location.reload();
    })
}
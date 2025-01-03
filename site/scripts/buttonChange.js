if(doesCookieExist('user_id'))
{
    let loginButton = document.getElementById('loginButton')
    let logoutButton = document.getElementById('logoutButton')
    let registerButton = document.getElementById('registerButton')
    let profilLink = document.getElementById('profilLink')

    loginButton.style.display = 'none';
    registerButton.style.display = 'none';
    logoutButton.style.display = 'inline';
    if(profilLink)
        profilLink.style.display = 'inline';
}
if(doesCookieExist('user_id'))
{
    let loginButton = document.getElementById('loginButton')
    let logoutButton = document.getElementById('logoutButton')
    let registerButton = document.getElementById('registerButton')

    loginButton.style.display = 'none';
    registerButton.style.display = 'none';
    logoutButton.style.display = 'inline';

}
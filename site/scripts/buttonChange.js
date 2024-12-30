if(doesCookieExist('user_id'))
{
    let loginButton = document.getElementById('loginButton')
    let logoutButton = document.getElementById('logoutButton')

    loginButton.style.display = 'none';
    logoutButton.style.display = 'inline';

}
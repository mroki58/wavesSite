function doesCookieExist(cookieName) {
    const cookies = document.cookie.split('; ');
    return cookies.some(cookie => cookie.startsWith(`${cookieName}=`));
}
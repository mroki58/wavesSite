async function userLogged() {
    try {
        const res = await fetch('http://localhost:3001/api', {
            method: 'GET',
            credentials: 'include',
        });

        const result = await res.json();  // Oczekiwanie na odpowiedź w formacie JSON

        if (result === true) {
            console.log('Użytkownik jest zalogowany');
            return true;  // Zwrócenie true, jeśli użytkownik jest zalogowany
        } else {
            console.log('Użytkownik nie jest zalogowany');
            return false;  // Zwrócenie false, jeśli użytkownik nie jest zalogowany
        }
    } catch (error) {
        console.error('Błąd podczas sprawdzania statusu logowania:', error);
        return false;  // Zwrócenie false w przypadku błędu
    }
}

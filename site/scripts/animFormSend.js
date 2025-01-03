function saveConfiguration(event)
{
    event.preventDefault();

    const d = sessionStorage.getItem('d');
    const f1 = sessionStorage.getItem('f1');
    const f2 = sessionStorage.getItem('f2');
    const a1 = sessionStorage.getItem('a1');
    const a2 = sessionStorage.getItem('a2');

    let formObject = getDataFromForm()

    const ans = document.querySelector('.ans')

    formObject['d'] = d
    formObject['f1'] = f1
    formObject['f2'] = f2
    formObject['a1'] = a1
    formObject['a2'] = a2

    console.log(formObject)

    fetch('http://localhost:3001/api/settings', {
        method: "POST",
        credentials: "include",
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
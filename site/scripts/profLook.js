function useConfig(setting_id)
{
    console.log(setting_id)
    fetch(`http://localhost:3001/api/settings/${setting_id}`, {
        method: 'GET',
        credentials: 'include',
    })
    .then(res => res.json())
    .then(res => {
        sessionStorage.setItem('d', res.d);
        sessionStorage.setItem('f1', res.f1);
        sessionStorage.setItem('f2', res.f2);
        sessionStorage.setItem('a1', res.a1);
        sessionStorage.setItem('a2', res.a2);

        window.location.href = 'animacja.html';
    })


}


userLogged.then(isLogged => {
if(isLogged)
    {
    let info;
    fetch('http://localhost:3001/api/info', {
        method: 'GET',
        credentials: "include",
    })
    .then(res => res.text())
    .then(res => {
        info = res;
        let helloMsg = document.getElementById('helloMsg')
        helloMsg.textContent = info;
    })

    fetch('http://localhost:3001/api/settings', {
        method: 'GET',
        credentials: 'include',
    })
    .then(res => res.json())
    .then(res => {
        const table = document.getElementById('tableConf');
        const tbody = table.getElementsByTagName('tbody')[0];

        for(let el of res)
        {
            const row = document.createElement('tr')
            row.classList.add('config-row')

            for(const key in el)
            {
                if(key != 'setting_id')
                {
                    const data = document.createElement('td');
                    const button = document.createElement('button');
                    button.onclick = () => useConfig(el['setting_id']);
                    button.classList.add('config-btn');
                    button.textContent = el[key];

                    data.appendChild(button)
                    row.appendChild(data);
                }

            }

            tbody.appendChild(row);
        }
        
        
    })

    }
})
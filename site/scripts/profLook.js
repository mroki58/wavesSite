if(doesCookieExist('user_id'))
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
                    button.onclick = () => callback(el[setting_id]);
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
function logSubmit(event) {

    event.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const referencia = parseInt(document.getElementById("referencia").value);


    fetch('http://localhost:8000/api/marca/store', {
        method: 'POST',
        body:  JSON.stringify({nombre, referencia}),
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(async res => {
        console.log(res);
        if(res.status === 200) {
            const json = await res.json();
            alert(json.message);
        } else {
            const json = res.json();
            str = "";
            for (const k in json) {
                str += `${k} ${json[k][0]} \n`;
            }
            alert(str);
        }
    });

}

const form = document.getElementById('form-marca');
form.addEventListener('submit', logSubmit);
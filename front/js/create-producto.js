
function dataInit() {
    fetch('http://localhost:8000/api/marca', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(async res => {
        if(res.status === 200) {
            const json = await res.json();

            const marcaSelect = document.getElementById('marca_id');
            for (const i of json) {
                marcaSelect.innerHTML += `
                    <option value="${i.id}">${i.nombre}</option>
                `
            }
        }
    });
}

dataInit();
function logSubmit(event) {

    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const talla = document.getElementById('talla').value;
    const observaciones = document.getElementById('observaciones').value;
    const marca_id = document.getElementById('marca_id').value;
    const cantidad = document.getElementById('cantidad').value;
    const fecha_embarque = document.getElementById('fecha_embarque').value;

    fetch('http://localhost:8000/api/producto/store', {
        method: 'POST',
        body:  JSON.stringify({nombre, talla, observaciones, marca_id, cantidad, fecha_embarque}),
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(async res => {
        if(res.status === 200) {
            const json = await res.json();
            alert(json.message);
        } else {
            const json = res.json();
            str = "";
            for (const k in json) {
                str += `${k} ${json[k][0]} \n`;
            }
            console.log(str);
            alert(str);
        }
    });

}

const form = document.getElementById('form-producto');
form.addEventListener('submit', logSubmit);
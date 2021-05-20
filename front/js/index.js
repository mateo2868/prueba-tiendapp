

function dataMarca() {
    fetch('http://localhost:8000/api/marca', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(async res => {
        const tableMarca = document.getElementById('table-marca');
        const json = await res.json();
        console.log(json);
        for (const i of json) {
            tableMarca.innerHTML += `
                <tr>
                    <td>${i.nombre}</td>
                    <td>${i.referencia}</td>
                    <td><a class="btn btn-success" href="./../front-tiendapp/views/edit-marca.html?id=${i.id}">Editar</a><button class="btn btn-danger" onclick="eliminarMarca(${i.id})">Eliminar</button></td>
                </tr>
            `
        }
    });
}

function dataProducto() {
    fetch('http://localhost:8000/api/producto', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(async res => {
        const tableMarca = document.getElementById('table-producto');
        const json = await res.json();
        console.log(json);
        for (const i of json) {
            tableMarca.innerHTML += `
                <tr>
                    <td>${i.nombre}</td>
                    <td>${i.talla}</td>
                    <td>${i.observaciones}</td>
                    <td>${i.marca_id}</td>
                    <td>${i.cantidad}</td>
                    <td>${i.fecha_embarque}</td>
                    <td><a class="btn btn-success" href="./../front-tiendapp/views/edit-producto.html?id=${i.id}">Editar</a><button class="btn btn-danger" onclick="eliminarProducto(${i.id})">Eliminar</button></td>
                </tr>
            `
        }
    });
}

function dataInit() {
    dataMarca();
    dataProducto();
    //marca
}


function eliminarProducto(id) {
    const conf = confirm('Esta seguro? ')
    if(conf) {
        fetch(`http://localhost:8000/api/producto/destroy/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(async res => {
            const json = await res.json();
            alert(json.message);
            window.location.reload();
        });
    }
}

function eliminarMarca(id) {
    const conf = confirm('Esta seguro? ')
    if(conf) {
        fetch(`http://localhost:8000/api/marca/destroy/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(async res => {
            const json = await res.json();
            alert(json.message);
            window.location.reload();

        });
    }
}

dataInit()
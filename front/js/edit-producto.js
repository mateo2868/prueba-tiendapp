const urlParams = new URLSearchParams(window.location.search);

function logSubmit(event) {

    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const talla = document.getElementById('talla').value;
    const observaciones = document.getElementById('observaciones').value;
    const marca_id = document.getElementById('marca_id').value;
    const cantidad = document.getElementById('cantidad').value;
    const fecha_embarque = document.getElementById('fecha_embarque').value;

    fetch(`http://localhost:8000/api/producto/update/${urlParams.get('id')}`, {
        method: 'PUT',
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
            alert(str);
        }
    });

}

function initData() {

    fetch(`http://localhost:8000/api/producto/edit/${urlParams.get('id')}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(async res => {
        if(res.status === 200) {
            const formEdit = document.getElementById('form-edit')
            const json = await res.json();

            fetch('http://localhost:8000/api/marca', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(async init => {
                if(init.status === 200) {
                    const jsonInit = await init.json();

                    formEdit.innerHTML = `
                        <form id="form-producto">
                            <div class="row">
                                <div class="col l3">
                                    <input type="text" class="form-control" placeholder="Nombre" value="${json.nombre}" id="nombre" required>
                                </div>
                                <div class="col l3">
                                    <select name="" value="${json.talla}" id="talla" class="form-control" required>
                                        <option value="s">S</option>
                                        <option value="m">M</option>
                                        <option value="l">L</option>
                                    </select>
                                </div>

                                <div class="col l3">
                                    <input type="text" class="form-control" placeholder="observaciones" value="${json.observaciones}" id="observaciones" required>
                                </div>

                                <div class="col l3">
                                    <select name="" id="marca_id" class="form-control" required>
                                    </select>
                                </div>

                                <div class="col l3">
                                    <input type="number" class="form-control" placeholder="cantidad" value="${json.cantidad}" id="cantidad" required>
                                </div>

                                <div class="col l3">
                                    <input type="date" class="form-control" placeholder="fecha_embarque" value="${json.fecha_embarque}" id="fecha_embarque" required>
                                </div>

                                <input type="submit" value="Crear producto" class="btn btn-success">
                            </div>
                        </form>
                    `;

                    let marcaSelect = document.getElementById('marca_id');

                    for (const i of jsonInit) {
                        marcaSelect.innerHTML += `
                            <option value="${i.id}">${i.nombre}</option>
                        `
                    }
                    marcaSelect.value = json.marca_id;

                    const form = document.getElementById('form-producto');
                    form.addEventListener('submit', logSubmit);

                }
            });

        }
    });
}

initData();
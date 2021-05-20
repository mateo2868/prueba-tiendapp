const urlParams = new URLSearchParams(window.location.search);

function logSubmit(event) {

    event.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const referencia = parseInt(document.getElementById("referencia").value);


    fetch(`http://localhost:8000/api/marca/update/${urlParams.get('id')}`, {
        method: 'PUT',
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

function initData() {

    fetch(`http://localhost:8000/api/marca/edit/${urlParams.get('id')}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(async res => {
        if(res.status === 200) {
            const formEdit = document.getElementById('form-edit')
            const json = await res.json();

            formEdit.innerHTML = `
                <form id="form-marca">
                    <div class="row">
                        <div class="col l3">
                            <input type="text" class="form-control" placeholder="Nombre" id="nombre" value="${json.nombre}" required>
                        </div>
                        <div class="col l3">
                            <input type="number" class="form-control" placeholder="referencia" id="referencia" value="${json.referencia}" required>
                        </div>
                        <input type="submit" value="Editar marca" class="btn btn-success">
                    </div>
                </form>
            `;

            const form = document.getElementById('form-marca');
            form.addEventListener('submit', logSubmit);
        }
    });
}

initData();
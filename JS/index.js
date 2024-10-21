document.addEventListener("DOMContentLoaded", () => {
    const formTransaccion = document.getElementById('form-transaccion');
    const totalElement = document.getElementById('total');
    const ingresosElement = document.getElementById('ingresos');
    const egresosElement = document.getElementById('egresos');
    const porcentajeGastosElement = document.getElementById('porcentaje-gastos');
    
    let total = 0;
    let ingresos = 0;
    let egresos = 0;

    const historialIngresos = [];
    const historialEgresos = [];

    formTransaccion.addEventListener('submit', (e) => {
        e.preventDefault();

        const date = document.getElementById('dateingreso').value;
        const description = document.getElementById('descriptioningreso').value;
        const monto = parseFloat(document.getElementById('monto').value);
        const tipo = document.getElementById('tipo').value;

        if (tipo === 'ingreso') {
            historialIngresos.push({ date, description, monto });
            ingresos += monto;
        } else {
            historialEgresos.push({ date, description, monto });
            egresos += monto;
        }

        total = ingresos - egresos;

        // Actualizar cuadros
        totalElement.textContent = `Monto disponible: $${total.toFixed(2)}`;
        ingresosElement.textContent = `Ingresos: $${ingresos.toFixed(2)}`;
        egresosElement.textContent = `Egresos: $${egresos.toFixed(2)}`;
        porcentajeGastosElement.textContent = `Porcentaje de gastos: ${(egresos / ingresos * 100 || 0).toFixed(2)}%`;

        // Limpiar el formulario
        formTransaccion.reset();

        // Actualizar tablas
        updateTablas();
    });

   
    function updateTablas() {
        const totalIngresoTable = document.getElementById('totalingreso');
        const totalEgresoTable = document.getElementById('totalegreso');

        // Limpiar tablas
        totalIngresoTable.innerHTML = `
            <tr>
                <th>Fecha</th>
                <th>Descripción</th>
                <th>Monto</th>
            </tr>
        `;
        totalEgresoTable.innerHTML = `
            <tr>
                <th>Fecha</th>
                <th>Descripción</th>
                <th>Monto</th>
            </tr>
        `;

        // Agregar filas de ingresos
        historialIngresos.forEach(transaccion => {
            const row = totalIngresoTable.insertRow();
            row.insertCell(0).textContent = transaccion.date;
            row.insertCell(1).textContent = transaccion.description;
            row.insertCell(2).textContent = `$${transaccion.monto.toFixed(2)}`;
        });

        // Agregar filas de egresos
        historialEgresos.forEach(transaccion => {
            const row = totalEgresoTable.insertRow();
            row.insertCell(0).textContent = transaccion.date;
            row.insertCell(1).textContent = transaccion.description;
            row.insertCell(2).textContent = `$${transaccion.monto.toFixed(2)}`;
        });
    }

    // Manejador para tabs
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabs = document.querySelectorAll('.tab');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');

            // Cambiar a la tab correspondiente
            tabs.forEach(tab => {
                tab.classList.remove('active');
                if (tab.id === tabId) {
                    tab.classList.add('active');
                }
            });

            // Actualizar el estilo de los botones de tab
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            button.classList.add('active');
        });
    });
});

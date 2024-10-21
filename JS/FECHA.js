document.addEventListener("DOMContentLoaded", function () {
    const months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
        const today = new Date();
        const currentMonth = months[today.getMonth()];
        const currentYear = today.getFullYear();

        // Modificamos el título con el mes y año actual
        document.getElementById("app-title").textContent += `${currentMonth} ${currentYear}`;

});

function addDiv(setId) {
    // create a new div element
    const newDiv = document.createElement("div");
    newDiv.setAttribute("id",setId)
    const app = document.getElementById("app");

    app.appendChild(newDiv);
}
addDiv("mistakes_timer")
addDiv("table")
addDiv("control")
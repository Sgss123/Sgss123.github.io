function GetDate() {
    var d = new Date();
    var x = document.getElementById("date");
    x.innerHTML = d.getFullYear();
}
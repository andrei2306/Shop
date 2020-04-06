var myIndex = 0;
function carousel() {
    var i;
    var x = document.getElementsByClassName("mySlides w3-animate-fading");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    myIndex++;
    if (myIndex > x.length) { myIndex = 1 }
    x[myIndex - 1].style.display = "block";
    setTimeout(carousel, 9000);
}

var listaProduse = [];
var indexModificat = -1;
function edit(form, event) {
    event.preventDefault();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            window.location = "admin.html";
        }
    };

    xhttp.open("PUT", "https://magazinonline-467ec.firebaseio.com/menu/" + window.location.search.substring(4) + ".json", true);
    xhttp.send(JSON.stringify({
        imagine: form.querySelector("[name=imagine]").value,
        nume: form.querySelector("[name=nume]").value,
        descriere: form.querySelector("[name=descriere]").value,
        pret: form.querySelector("[name=pret]").value,
        cantitate: form.querySelector("[name=cantitate]").value,
    }));
}

function drawLista() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("loading").style.display = "none";
            produs = JSON.parse(this.responseText);
            document.querySelector("form [name=imagine]").value = produs.imagine;
            document.querySelector("form [name=descriere]").value = produs.descriere;
            document.querySelector("form [name=nume]").value = produs.nume;
            document.querySelector("form [name=pret").value = produs.pret;
            document.querySelector("form [name=cantitate").value = produs.cantitate;
        }
    };
    xhttp.open("GET", "https://magazinonline-467ec.firebaseio.com/menu/" + window.location.search.substring(4) + ".json", true);
    xhttp.send();
}
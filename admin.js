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

function drawLista() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            listaProduse = JSON.parse(this.responseText);
            var tabel = document.querySelector("#listaProduse tbody");
            var str = "";
            for (var i in listaProduse.menu) {
                document.getElementById("loading").style.display = "none";
                if (listaProduse.menu[i] == null) {
                    continue;
                }

                str += `<tr >
                        <td > <img  src="${listaProduse.menu[i].imagine}" alt="no image" class="imgProd"/> </td>
                        <td> <a href="edit.html?id=${i}" class="nume"> ${listaProduse.menu[i].nume}  </a> </td> 
                        <td width="15%" style="text-align: center"> ${listaProduse.menu[i].pret} LEI </td> 
                        <td style="text-align: center"> ${listaProduse.menu[i].cantitate} buc. </td> 
                        <td style="text-align: center"> <button type="button" class="sterge" onclick="sterge('${i}')" class="detalii">Sterge</button>
                    </tr>`;
            }
            console.log(str);
            tabel.innerHTML = str;
        }
    };
    xhttp.open("GET", "https://magazinonline-467ec.firebaseio.com/.json", true);
    xhttp.send();
    document.getElementById("loading").style.display = "";
}

function sterge(index) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("loading").style.display = "none";
            drawLista();
        }
    };
    xhttp.open("DELETE", "https://magazinonline-467ec.firebaseio.com/menu/" + index + ".json", true);
    xhttp.send();
    document.getElementById("loading").style.display = "";
}
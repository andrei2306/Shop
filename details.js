var myIndex = 0;

function carousel() {
    var i;
    var x = document.getElementsByClassName("mySlides w3-animate-fading");
    for (i = 0; i < x.length; i++) {
       x[i].style.display = "none";  
    }
    myIndex++;
    if (myIndex > x.length) {myIndex = 1}    
    x[myIndex-1].style.display = "block";  
    setTimeout(carousel, 9000);    
}

var detaliuProduse;

function drawLista() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("loading").style.display="none";
            
            detaliuProduse= JSON.parse(this.responseText);
            console.log(detaliuProduse);
            document.getElementById("image").src =detaliuProduse.imagine;
            document.getElementById("nume").innerHTML= detaliuProduse.nume;
            document.getElementById("price").innerHTML= "Pret: " + detaliuProduse.pret + " LEI";
            document.getElementById("descriere").innerHTML= "Descriere: <br> <br>" + detaliuProduse.descriere;
            

            if(detaliuProduse.cantitate>0) { 
                 document.getElementById("stoc").innerHTML="Stoc: " + detaliuProduse.cantitate + " buc.";
            } else{
                document.getElementById("stoc").innerHTML="Out of stock";
            }

        }
    };
    xhttp.open("GET", "https://magazinonline-467ec.firebaseio.com/menu/"+window.location.search.substring(4)+".json", true);
    xhttp.send();

    document.getElementById("loading").style.display="";
}
			
function adaugaProdus(){

    if(detaliuProduse.cantitate>0) { 

      var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {               
                if (this.readyState == 4 && this.status == 200) {               
                    drawLista();     
                }
            };
            
            xhttp.open("PUT", "https://magazinonline-467ec.firebaseio.com/cart/" +window.location.search.substring(4) + ".json", true);           
            xhttp.send(JSON.stringify({					
                nume: detaliuProduse.nume,
                pret: parseInt(detaliuProduse.pret),
                cantitate: parseInt(document.getElementById("quantity").value),
                id: window.location.search.substring(4),
                stoc:detaliuProduse.cantitate         
            }));
        
    }
    else{
        document.getElementById("alertNuOk").style.display="";   

    }

}


function verificaProdus(form,event){

    event.preventDefault();
    var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {               
                if (this.readyState == 4 && this.status == 200) {  
                    listaCart= JSON.parse(this.responseText);
             
                     if (detaliuProduse.cantitate<parseInt(document.getElementById("quantity").value)) {    
                            document.getElementById("alertCart").style.display="";               
                            return true;
                      }  
                        
                        adaugaProdus();
                        document.getElementById("alertOk").style.display="";  
                        return false;    
                     
                }
            };
            xhttp.open("GET", "https://magazinonline-467ec.firebaseio.com/cart/.json", true);           
            xhttp.send();                 
}
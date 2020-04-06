var myIndex = 0;
var listaProduse;


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

function drawCart(){
    event.preventDefault(); 
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                
                listaProduse= JSON.parse(this.responseText);
                
                var tabel=document.querySelector("#cosCumparaturi tbody");
                var str="";
                var tr="";
                var total=0;
                var nrProd=0;
                var fTva=0;
                
                 if(listaProduse.cart==null){
                        document.getElementById("cosCumparaturi").innerHTML="Cosul dumneavoastra este gol!";
                        document.getElementById("loading").style.display="none";
                     
                        document.getElementById("nrProd").innerHTML="Total produse: " + nrProd;
                        document.getElementById("total").innerHTML= "Total (LEI): " + total.toFixed(0);
                        document.getElementById("fTva").innerHTML= "Total (LEI fara TVA): " + fTva.toFixed(2);
                    }
                 else{

                    for(var i in listaProduse.cart){
   
                    
                    document.getElementById("loading").style.display="none";
                    
                    if(listaProduse.cart[i]==null){
                        continue;
                       }

                    str += `<tr>
                            <td width="25%"> <a href="paginaDetalii.html?id=${listaProduse.cart[i].id}" class="nume"> ${listaProduse.cart[i].nume} </a></td>
                            <td class="pret" width="8%"> ${parseInt(listaProduse.cart[i].pret)}</td> 
                            <td id="cantitate" width="15%"><button type="button" class="mic" onclick="maiMic('${i}',${listaProduse.cart[i].cantitate-1})"> - </button> <span id="span">${parseInt(listaProduse.cart[i].cantitate)}</span>                     
                            <button type="button" class="mic" onclick="maiMare('${i}',${listaProduse.cart[i].cantitate+1})"> + </button>   </td> 

                            <td width="7%" class="pret">  ${listaProduse.cart[i].cantitate * listaProduse.cart[i].pret}</td>                              
                            <td width="10%" style="text-align: center"> <button type="button" class="sterge" onclick="sterge('${i}')">Sterge</button>
                            
                        </tr>`
                    
                    nrProd+=listaProduse.cart[i].cantitate;
                    total+= (listaProduse.cart[i].cantitate * listaProduse.cart[i].pret);
                    fTva+= (listaProduse.cart[i].cantitate * listaProduse.cart[i].pret)/1.19;
                    };               
                tabel.innerHTML=str;
                document.getElementById("nrProd").innerHTML="Total produse: " + nrProd;
                document.getElementById("total").innerHTML= "Total (LEI): " + total.toFixed(0);
                document.getElementById("fTva").innerHTML= "Total (LEI fara TVA): " + fTva.toFixed(2);
                        
                   }
            }

         
        };
        xhttp.open("GET", "https://magazinonline-467ec.firebaseio.com/.json", true);
        xhttp.send();
        document.getElementById("loading").style.display="";
        
    }

function maiMare(index,cantitate){
    event.preventDefault();      

    if (parseInt(listaProduse.cart[index].cantitate+1)<=parseInt(listaProduse.cart[index].stoc)) {
   
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {           
                        drawCart(); 
                }
            };
            
            xhttp.open("PUT","https://magazinonline-467ec.firebaseio.com/cart/" + index +"/cantitate.json", true);
            xhttp.send(JSON.stringify(parseInt(cantitate)));
    }    
    else{
               // alert("STOC INSUFICIENT");
                document.getElementById("alertCart2").style.display="";  
                return;
    }

}

function maiMic(index,cantitate){
    event.preventDefault();      

    if ( parseInt(listaProduse.cart[index].cantitate)<=parseInt(listaProduse.cart[index].stoc) && parseInt  (listaProduse.cart[index].cantitate)>=2){

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                        drawCart();          
                }
            };
            
            xhttp.open("PUT","https://magazinonline-467ec.firebaseio.com/cart/" + index +"/cantitate.json", true);
            xhttp.send(JSON.stringify(parseInt(cantitate)));

    } else{
                //alert("verificati cantitatea");
                document.getElementById("alertCart").style.display="";  
                return;
    }
}


function sterge(index) {
  
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              document.getElementById("loading").style.display="none";           
              window.location="cart.html";
            }
        };
        xhttp.open("DELETE",  "https://magazinonline-467ec.firebaseio.com/cart/" + index +".json", true);
        xhttp.send();
        document.getElementById("loading").style.display="";
    }
        

function stergeCos() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              document.getElementById("loading").style.display="none";           
              drawCart(); 
            }
        };
        xhttp.open("DELETE",  "https://magazinonline-467ec.firebaseio.com/cart/.json", true);
        xhttp.send();
        document.getElementById("loading").style.display="";
}



function modifCant(){
 for (var i in listaProduse.cart){
     
    if(listaProduse.cart[i]==null){
        continue;
       }

    var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {               
                if (this.readyState == 4 && this.status == 200) {  
                  
                }
            };
        xhttp.open("PUT", "https://magazinonline-467ec.firebaseio.com/menu/" + i +"/cantitate.json", true);           
        xhttp.send (JSON.stringify(parseInt(listaProduse.menu[i].cantitate)) - parseInt(listaProduse.cart[i].cantitate)); 
           }  
    stergeCos();  
    //alert ("cumparaturile sunt gata!")   ;   
    document.getElementById("alertCart3").style.display=""; 
}
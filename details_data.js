function searchProducts(){
   var xmlhttp = new XMLHttpRequest();
   xmlhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.response);
            var inptText = document.getElementById("inputProduct").value;

            if(inptText == ""){
                alert("Enter text");
            }

            else {
               document.getElementById("demo").innerHTML="";
               var inptTextLow = inptText.toLowerCase();
               var flag = 0;

               for (j=0; j<15; j++) {

                var reg = new RegExp(inptTextLow, "g");
                var str = myObj[j].name;
                var strlow = str.toLowerCase();
                var n = strlow.search(reg);

                  if (n>= 0){
                    document.getElementById("demo").innerHTML+=`<div style="width:25rem ; height:40rem ;display:inline-block"> 
                        <div class="card" style="width: 20rem;">
                          <a href ="description.html">
                            <img class="card-img-top" onclick =detailsVar(${j}) src=${myObj[j].thumbBig[0]} alt="Card image cap">
                          </a>
                        <div class="card-body">
                          <h4 class="card-title">${myObj[j].name}</h4>
                          <p class="card-text-right"></p>
                          <button id="favorite${j}" class="fn-fav" onclick="markFavorite('favorite${j}')">Favourite</button>
                          <button class="addcart" id="addCart{i}" onclick="addToCart('${j},')">Add to cart</button>
                        </div>
                      </div>
                    </div>`
                     flag = 1;
                  }
           
                }
              if (flag == 0) {
                document.getElementById("demo").innerHTML=`<div style="text-align:center; margin-top:30vh">No such product exist. Try another search </div>`;
              }
              document.getElementById("inputProduct").value ="";
                }          
        }
   };
            xmlhttp.open("GET", "https://raw.githubusercontent.com/rawalsakshi/assignment/master/data.json", true);
            xmlhttp.send();
}


function addToCart(index) {

    if (sessionStorage.cart == undefined) {
        sessionStorage.cart = index;
    } else {
        sessionStorage.cart += index;
    }
}


function shoppingCart(shopcartNew) {

  if (sessionStorage.cart === undefined) {
      sessionStorage.cart = undefined;
  }
   var xmlhttp2 = new XMLHttpRequest();

   xmlhttp2.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myObj2 = JSON.parse(this.responseText);
            var display = "";
            var itemLength = 15;
            var quantity = [];

            for (var i = 0; i < itemLength; i++) {
                quantity.push(0);
            }

            var total = 0;

            if (sessionStorage.cart == "undefined") {
                clearCart();
             }
            else {
                   if(!shopcartNew){
                      shopcart= sessionStorage.getItem('cart').split(",");
                   }
                  else{
                      shopcart=shopcartNew;
                      shopcartNew.length;
                   }

            for (var k = 0; k < shopcart.length-1; k++) {
                 var t = parseInt(shopcart[k]);
                 quantity[t]++;
            }

        display +=`<h1>Shopping Cart </h1>
                    <div class="cartTable"><table id="t01"><tr><th>Item</th><th>Price</th><th>Quantity</th><th>Cost</th></tr>`;
        
                    for (var p = 0; p < quantity.length; p++) {
                        if (quantity[p] == 0) {
                            continue;
                        } else {
                            var t = p;
                    display += `<tr><td id="tdid"><img id="tabId" src=${myObj2[t].thumbBig[0]}><p id="tabName">${myObj2[t].name}</p></td>
                                  <td>${myObj2[t].price}</td>
                                  <td>${quantity[t]}</td>
                                  <td> ${ (quantity[t]) * (myObj2[t].price) }</td>
                                  <td><a onclick="deleteItem(${p})">
                                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Chess_xxt45.svg/1024px-Chess_xxt45.svg.png" style="width:20px;height20px"></a></td></tr>`;

                                total+= quantity[t] * myObj2[t].price;
                          }        
                    }
                    display += `</table></div>`;
                    display+=`<div id="myCartBtn">
                                <button class="btn btn-primary" onclick="clearCart()">Clear Cart</button>
                                <button class="btn btn-primary" onclick="checkOut()">CheckOut</button>
                              </div>`

                    sessionStorage.totalAmount = total;
                    document.getElementById("demo_cart").innerHTML = display;
         }
        }
    };
    xmlhttp2.open("GET", "https://raw.githubusercontent.com/rawalsakshi/assignment/master/data.json", true);
    xmlhttp2.send();
}

function deleteItem(index){

  for(var i = shopcart.length - 2; i >= 0; i--) {
    if(shopcart[i] == index) {
      shopcart.splice(i, 1);
    }
  }
  shopcartNew=shopcart;
  shoppingCart(shopcartNew);
}


function clearCart() {
  
  sessionStorage.cart=undefined;
  document.getElementById("demo_cart").innerHTML = `<div class="noItem" >You have Zero items in your cart.</div>`
}


function checkOut() {

  alert("Total payable amount is:" + sessionStorage.totalAmount);
}


function indexOnload() {
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {

      var myObj = JSON.parse(this.response);
      var result = "";

      for (var i = 0; i < 15; i++) {
        result +=`<div style="width:25rem ; height:40rem ;display:inline-block"> 
                     <div class="card" style="width: 20rem;">
                       <a href ="description.html">
                       <img class="card-img-top" onclick =detailsVar(${i}) src=${myObj[i].thumbBig[0]} alt="Card image cap">
                       </a>
                     <div class="card-body">
                       <h4 class="card-title">${myObj[i].name}</h4>
                       <p class="card-text-right"></p>
                       <button id="favorite${i}" class="fn-fav" onclick="markFavorite('favorite${i}')">Favourite</button>
                       <button class="addcart" id="addCart{i}" onclick="addToCart('${i},')">Add to cart</button>
                     </div>
                    </div>
                  </div>`
        }
        document.getElementById("demo").innerHTML = result;
        setFavorite();
    }
  };
    xmlhttp.open("GET", "https://raw.githubusercontent.com/rawalsakshi/assignment/master/data.json", true);
    xmlhttp.send();
}





function detailsVar(index) {
  sessionStorage.detail = index;
}



function detailsOnload() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {

    if (this.readyState == 4 && this.status == 200) {
      var myObj = JSON.parse(this.responseText);
      var result = "";
      var i = parseInt(sessionStorage.detail);

      result+=` <div class="detailImage"><img src= ${myObj[i].thumbSmall[0]}><img src= ${myObj[i].thumbSmall[1]}>
                  <img src=${myObj[i].thumbSmall[2]} ><img src= ${myObj[i].thumbSmall[3]} ><img src=${myObj[i].thumbSmall[4]}></div>
                      <div id="picture">
                        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                          <ol class="carousel-indicators">
                            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                          </ol>
                        <div class="carousel-inner">
                          <div class="carousel-item active">
                            <img class="d-block w-100" src="${myObj[i].thumbBig[0]}" alt="First slide">
                          </div>
                          <div class="carousel-item">
                            <img class="d-block w-100" src="${myObj[i].thumbBig[1]}" alt="Second slide">
                          </div>
                          <div class="carousel-item">
                            <img class="d-block w-100" src="${myObj[i].thumbBig[2]}" alt="Third slide">
                          </div>
                        </div>
                        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                          <span class="sr-only">Previous</span>
                        </a>
                        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                          <span class="carousel-control-next-icon" aria-hidden="true"></span>
                          <span class="sr-only">Next</span>
                        </a>
                      </div>
                    </div>
                    <div class=description>
                        <p><h2> ${myObj[i].name}</h2><br><br> 
                        Description:${myObj[i].description} <br> 
                        Price:${myObj[i].price} <br>
                        Stock:${myObj[i].stock} <br>
                        Discount:${myObj[i].discount} <br>                
                        Final Price:${myObj[i].finalprice} <br>
                        Size Avalilable:  ${myObj[i].size[0]}  ,  ${myObj[i].size[1]} ,  ${myObj[i].size[2]} ,  ${myObj[i].size[3]} </p>  <br>
                        <button class="btn btn-primary" onclick=addToCart('${i},')>Add To Cart</button>
                    </div>`

            document.getElementById("demo_details").innerHTML = result;
      }
  };
  xmlhttp.open("GET", "https://raw.githubusercontent.com/rawalsakshi/assignment/master/data.json", true);
  xmlhttp.send();

}

function markFavorite(id_name) {

  var isFav = sessionStorage.getItem(id_name);
  var property = document.getElementById(id_name);

  if (!isFav) {
    sessionStorage.setItem(id_name, 'true');
    property.style.backgroundColor = "#FFC0CB";
  } else {
     sessionStorage.removeItem(id_name);
     property.style.backgroundColor = "#87CEFA";
    }

}

function setFavorite() {

  var favList = document.getElementsByClassName('fn-fav');  

  for (var i = 0; i < favList.length; i++) {
    var selectedItemId = favList[i].id;
    var isFav = sessionStorage.getItem(selectedItemId);
    var btnFav = document.getElementById(selectedItemId);

    if (isFav) {
          btnFav.style.backgroundColor = "#FFC0CB";
    }
  }
}
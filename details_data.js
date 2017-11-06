var cart=(function(){  
    function deleteItem(index){
        for(var i = shopcart.length - 2; i >= 0; i--) {
        if(shopcart[i] == index) {
          shopcart.splice(i, 1);
        }
      }

      shopcartNew=shopcart;
      shoppingCart(shopcartNew);
    }

    function clearItems() {  
      sessionStorage.cart=undefined;
      document.getElementById("demo_cart").innerHTML = `<div class="noItem" >You have Zero items in your cart.</div>`
    }

    function checkOut() {
      alert("Total payable amount is:" + sessionStorage.totalAmount);
    }

    function add(index) {
        if (sessionStorage.cart == undefined) {
            sessionStorage.cart = index;
        } else {
            sessionStorage.cart += index;
        }
    }
    function setSession(){
        if (sessionStorage.cart === undefined) {
            sessionStorage.cart = undefined;
        }
    }

    return {
        deleteItem: deleteItem,
        clearItems: clearItems,
        add: add,
        checkout: checkOut,
        setSession:setSession
    };
})();

var favorite=(function(){
    function getProduct(id_name) {
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

    function setProduct() {
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

    return {
        getProduct:getProduct,
        setProduct:setProduct
    }
})();

function getData(callback){
   var xmlhttp = new XMLHttpRequest();
   xmlhttp.open("GET", "https://raw.githubusercontent.com/rawalsakshi/assignment/master/data.json", true);
  xmlhttp.send();

   xmlhttp.onreadystatechange = function () {
       if (this.readyState == 4 && this.status == 200) {
           var Products = JSON.parse(this.response);
   callback(this, [Products])  ;
      }
  }; 
 }


function indexOnload() {
        getData(function(data){
        Products = JSON.parse(data.response);
                 
        var result = "";

            for (var i = 0; i < 15; i++) {
                result +=`<div style="width:25rem ; height:40rem ;display:inline-block">
                    <div class="card" style="width: 20rem;">
                        <a href ="description.html">
                            <img class="card-img-top" onclick =detailsVar(${i}) src=${Products[i].thumbBig[0]} alt="Card image cap">
                        </a>
                        <div class="card-body">
                            <h4 class="card-title">${Products[i].name}</h4>
                            <p class="card-text-right"></p>
                            <button id="favorite${i}" class="fn-fav" onclick="favorite.getProduct('favorite${i}')">Favourite</button>
                            <button class="addcart" id="addCart{i}" onclick="cart.add('${i},')">Add to cart</button>
                        </div>
                    </div>
                </div>`
            }

            document.getElementById("demo").innerHTML = result;
            favorite.setProduct();
                 
        });          
}


function searchProducts(){
    getData(function(data){
    Products = JSON.parse(data.response);

            var inputText = document.getElementById("inputProduct").value;

            if(inputText == ""){
                alert("Enter text");
            }else {
                document.getElementById("demo").innerHTML = "";
                var flag = 0;

                for (j=0; j<15; j++) {
                    var Inputreg = new RegExp(inputText.toLowerCase(), "g");
                    var productName = Products[j].name;
                    var productNameLow = productName.toLowerCase();
                    var n = productNameLow.search(Inputreg);

                    if (n>= 0){
                        document.getElementById("demo").innerHTML+=`<div style="width:25rem ; height:40rem ;display:inline-block">
                            <div class="card" style="width: 20rem;">
                                <a href ="description.html">
                                    <img class="card-img-top" onclick =detailsVar(${j}) src=${Products[j].thumbBig[0]} alt="Card image cap">
                                </a>
                                <div class="card-body">
                                    <h4 class="card-title">${Products[j].name}</h4>
                                    <p class="card-text-right"></p>
                                    <button id="favorite${j}" class="fn-fav" onclick="favorite.getProduct('favorite${j}')">Favourite</button>
                                    <button class="addcart" id="addCart{i}" onclick="cart.add('${j},')">Add to cart</button>
                                </div>
                            </div>
                        </div>`

                        flag = 1;
                    }
                }

                if (flag == 0) {
                    document.getElementById("demo").innerHTML = `<div style="text-align:center; margin-top:30vh">
                        <p>No such product exist. Try another search</p>
                    </div>`;
                }

                document.getElementById("inputProduct").value = "";
            }         
        });          
}


function shoppingCart(shopcartNew) {
    cart.setSession();
    getData(function(data){
    Products = JSON.parse(data.response);
               var display = "",
                itemLength = 15,
                quantity = [];

            for (var i = 0; i < itemLength; i++) {
                quantity.push(0);
            }

            var total = 0;

            if (sessionStorage.cart == "undefined") {
                cart.clearItems();
            }else {
                if(!shopcartNew){
                    shopcart = sessionStorage.getItem('cart').split(",");
                } else {
                    shopcart = shopcartNew;
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
                            display += `<tr><td id="tdid"><img id="tabId" src=${Products[t].thumbBig[0]}><p id="tabName">${Products[t].name}</p></td>
                                <td>${Products[t].price}</td>
                                <td>${quantity[t]}</td>
                                <td> ${ (quantity[t]) * (Products[t].price) }</td>
                                <td><a onclick="cart.deleteItem(${p})">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Chess_xxt45.svg/1024px-Chess_xxt45.svg.png" style="width:20px;height20px"></a></td>
                            </tr>`;

                            total += quantity[t] * Products[t].price;
                        }       
                    }

                    display += `</table></div>`;
                    display += `<div id="myCartBtn">
                        <button class="btn btn-primary" onclick="cart.clearItems()">Clear Cart</button>
                        <button class="btn btn-primary" onclick="cart.checkout()">CheckOut</button>
                    </div>`

                    sessionStorage.totalAmount = total;
                    document.getElementById("demo_cart").innerHTML = display;
            }
        });          
}


function detailsVar(index) {
    sessionStorage.detail = index;
}

function detailsOnload() {
    getData(function(data){
    Products = JSON.parse(data.response);
               var result = "";
                var i = parseInt(sessionStorage.detail);

            result += `<div class="detailImage"><img src= ${Products[i].thumbSmall[0]}><img src= ${Products[i].thumbSmall[1]}>
                <img src=${Products[i].thumbSmall[2]} ><img src= ${Products[i].thumbSmall[3]} ><img src=${Products[i].thumbSmall[4]}>
            </div>
           
            <div id="picture">
                <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                    <ol class="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    </ol>
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img class="d-block w-100" src="${Products[i].thumbBig[0]}" alt="First slide">
                        </div>
                        <div class="carousel-item">
                            <img class="d-block w-100" src="${Products[i].thumbBig[1]}" alt="Second slide">
                        </div>
                        <div class="carousel-item">
                            <img class="d-block w-100" src="${Products[i].thumbBig[2]}" alt="Third slide">
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
                <p><h2> ${Products[i].name}</h2><br><br>
                Description:${Products[i].description} <br>
                Price:${Products[i].price} <br>
                Stock:${Products[i].stock} <br>
                Discount:${Products[i].discount} <br>               
                Final Price:${Products[i].finalprice} <br>
                Size Avalilable:  ${Products[i].size[0]}  ,  ${Products[i].size[1]} ,  ${Products[i].size[2]} ,  ${Products[i].size[3]} </p>  <br>
                <button class="btn btn-primary" onclick=cart.add('${i},')>Add To Cart</button>
            </div>`

            document.getElementById("demo_details").innerHTML = result;

        });          
}

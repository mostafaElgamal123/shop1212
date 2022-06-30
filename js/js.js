$('.owl-carousel').owlCarousel({
    rtl:true,
    loop:true,
    margin:10,
    nav:true,
    responsive:{
        0:{
            items:1
        },
        375:{
           items:2
        },
        500:{
            items:2
        },
        600:{
            items:3
        },
        1000:{
            items:4
        }
    }
})



$('#inp-basket').click(function(){

    $('.items-basket .basket-conent').removeClass('active');
    $('#inp-basket').removeClass('btnactive');
    
})
$('.cart-view').click(function(){

    $('.items-basket .basket-conent').toggleClass('active');
    $('#inp-basket').toggleClass('btnactive');
    
})



$('#nav-toggle').click(function(){
    $('.navbar').addClass('show');
    $('.navbar').removeClass('hide');
    $('.navbar .menu-center').addClass('active');
    $('.navbar .close').addClass('active-close');
})

$('.close').click(function(){
    $('.navbar').removeClass('show');
    $('.navbar').addClass('hide');
    $('.navbar .menu-center').removeClass('active');
    $('.navbar .close').removeClass('active-close');
})

$(document).ready(function(){
    $('.spinner-load').fadeOut(1000);
    $('body').css('overflow','auto');
    $('#btn-alert').css('display','block');
    $('.content-alert').css('display','block');
})


$('.btn-location').click(function(){
    $('.form-location').toggleClass('active-location');
})

// $('.size-xl .btn-form').click(function(){
//    let conenloc1= $('.form-location #loc1').val();
//    let conenloc2= $('.form-location #loc2').val();
//    let totle=conenloc1+" - "+conenloc2;
//    $('.btn-location strong').text(totle);
// })

// $('.size-sm .btn-form').click(function(){
//     let conenloc1= $('.form-location #loc1mobiel').val();
//     let conenloc2= $('.form-location #loc2mobiel').val();
//     let totle=conenloc1+"-"+conenloc2;
//     $('.btn-location strong').text(totle);
//  })
//location data
let CityLoc1=document.getElementById('loc1');
let District=document.getElementById('loc2');
let btnForm=document.querySelector('.btn-form');
let dataLocation;
btnForm.addEventListener('click',function(){
    getLocation();
    displayLocation();
})
if(localStorage.locations!=null){
    dataLocation=JSON.parse(localStorage.locations);
    displayLocation();
}else{
    dataLocation=[];
}
function getLocation(){
    let newLocation={
        city:CityLoc1.value,
        District:District.value,
    }
    if(dataLocation.length>0){
        dataLocation[0]=newLocation;
        localStorage.locations=JSON.stringify(dataLocation);
        displayLocation();
    }else{
        dataLocation.push(newLocation);    
    }
    localStorage.setItem('locations',JSON.stringify(dataLocation));
}

function displayLocation(){
    let text='';
    for(let i=0;i<dataLocation.length;i++){
            text+=`
        ${dataLocation[i].city}-${dataLocation[i].District}
        `;
    }
    document.querySelector('.btn-location strong').innerHTML=text;
}


$('#btn-alert').click(function(){
    $('.content-alert').toggleClass('active-alert');
    $('#btn-alert').toggleClass('btnalert-active');
})
$('.group-alert .close ').click(function(){
    $('#btn-alert').css('display','none');
    $('.content-alert').css('display','none');
})


$(window).scroll(function(){
    let scrolltop=$(window).scrollTop();
    if(scrolltop>0){
        $('.form-location').removeClass('active-location');
    }
    if(scrolltop>50){
        $('.navbar').css('border-bottom','4px solid #fd7e14');
    }else if(scrolltop<=50){
        $('.navbar').css('border-bottom','none');
    }
    if(scrolltop<=600){
        $('#arrow-top').css('right','-150px');
    }else if(scrolltop>=600){
        $('#arrow-top').css('right','40px');
    }
})

$('#arrow-top').click(function(){
    $('body,html').animate({scrollTop:0});
})

//create date posts

let dataProduct=[
    {title:'vegetables1',price:'100.00;',image:'images/img-Baskets/_2_6_1.jpg'},
    {title:'vegetables2',price:'100.00;',image:'images/img-Baskets/_2_7.jpg'},
    {title:'vegetables3',price:'100.00;',image:'images/img-Baskets/_2_8.jpg'}
];

localStorage.setItem('product',JSON.stringify(dataProduct));



//display product

function displayProduct(){
    let text='';
    for(let i=0;i<dataProduct.length;i++){
        text+=`
        <div class="col-6 col-md-4 col-sm-6">
             <div class="card shadow-sm" >
               <div class="card-img text-center">
                 <a href="product-single.html">
                   <img src="${dataProduct[i].image}" alt="">
                 </a>
               </div>
               <div class="card-content text-center">
                 <a href="product-single.html">
                   <h3>${dataProduct[i].title}</h3>
                 </a>
               <p class="price">${dataProduct[i].price}</p>
               <a href="#!" onclick='productCart(${i})' class="btn btn-success">Add to cart</a>
               </div>
               <div class="card-sales">
                 <span>sales</span>
               </div>
               <div class="card-discount">
                   <div class="line"></div>
                   <span>10%</span>
               </div>
               
             </div>
            </div>
        `;
    }
    document.querySelector('.id-basket').innerHTML=text;
}
displayProduct();

//add to cart
let dataCart;
if(localStorage.productCart!=null){
    dataCart=JSON.parse(localStorage.productCart);
    displayCart();
}else{
    dataCart=[];
}

function productCart(idcart){
    let newProduct={
        title:dataProduct[idcart].title,
        price:dataProduct[idcart].price,
        image:dataProduct[idcart].image
    }
    dataCart.push(newProduct);
    localStorage.setItem('productCart',JSON.stringify(dataCart));
    displayCart();
}


//display product cart

function displayCart(){
    let text='';
    for(let i=0;i<dataCart.length;i++){
        text+=`
        <div class="content d-flex flex-wrap">
        <div class="content-title">
          <a href="#!">
            <h3>${dataCart[i].title}</h3>
          </a>
          <p>${dataCart[i].price}</p>
        </div>
        <div class="content-img d-flex flex-column text-center">
          <img src="${dataCart[i].image}" alt="">
          <a href="#!" onclick='deleteCart(${i})'>X</a>
        </div>
        </div>
        `;
    }
    document.getElementById('idbasket').innerHTML=text;
}


//delete product cart

function deleteCart(iddelete){
    dataCart.splice(iddelete,1);
    localStorage.productCart=JSON.stringify(dataCart);
    displayCart();
}

//search 
let btnsearch=document.getElementById('btnsearch');
function searchBasket(search){
    let text='';
    for(let i=0;i<dataProduct.length;i++){
        if(dataProduct[i].title.toUpperCase().includes(search)){
            text+=`
        <div class="col-6 col-md-4 col-sm-6">
             <div class="card shadow-sm" >
               <div class="card-img text-center">
                 <a href="product-single.html">
                   <img src="${dataProduct[i].image}" alt="">
                 </a>
               </div>
               <div class="card-content text-center">
                 <a href="product-single.html">
                   <h3>${dataProduct[i].title}</h3>
                 </a>
               <p class="price">${dataProduct[i].price}</p>
               <a href="#!" onclick='productCart(${i})' class="btn btn-success">Add to cart</a>
               </div>
               <div class="card-sales">
                 <span>sales</span>
               </div>
               <div class="card-discount">
                   <div class="line"></div>
                   <span>10%</span>
               </div>
               
             </div>
            </div>
        `;
        }else{
        }
    }
    document.querySelector('.id-basket').innerHTML=text;
}
// //totle price
// function totlePrice(){
//     let totle=0;
//     for(let i=0;i<dataCart.length;i++){
//         totle+= Number(dataCart[i].price);
//     }
//     console.log(totle);
// }
// totlePrice();

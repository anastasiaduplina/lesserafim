
const check=function(){
    const forms=document.querySelectorAll('.form');
    
    forms.forEach(element => {
        validation(element);
    });
    document.f
    const buttons=document.querySelectorAll('button[type="submit"]');
    buttons.forEach((button)=>{
        button.addEventListener('click',async function(){
            button.innerHTML="Sending";
            button.style.color="red";
            button.disabled=true;
            let response = await fetch('https://jsonplaceholder.typicode.com/posts',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json; charset=UTF-8'
                },
                body: JSON.stringify({
                    title:"test.title",
                    body:"test.body"
                })
            });
            if (response.ok) {
            button.innerHTML="Succes";
            button.style.color="black";
            button.disabled=false;
            } else {
             button.innerHTML="Fail";  
             button.style.color="black";
            button.disabled=false; 
            alert("Ошибка HTTP: " + response.status);
            }
            return false;
        });
    });
}
const validation=function (form){
    const button=form.querySelector('button[type="submit"]');
    const inputs=form.querySelectorAll('input');
    inputs.forEach((input)=>{
        input.addEventListener('input',function(){
            console.log("work");
            isvalid(form,input);
            buttonValid(inputs,button);
        });
    });

}
const buttonValid=function(inputs,button){
    let b=true;
    inputs.forEach((input)=>{
        if(!input.validity.valid){
            b=false;
        }
    });
    if(b){
        button.disabled=false;
    }else{
        button.disabled=true;
    }
}
const isvalid=function(form,input){
    let b=true;
    if(input.id){
        if(input.getAttribute('type')=="email"){
            if(!checkEmail(input.value.replace(/\s/g))){
                b=false;
            }
        }
        if(input.getAttribute('type')=="tel"){
            if(!checkTel(input.value.replace(/\s/g))){
                b=false;
            }
        }
        console.log(b);
        if(!input.validity.valid || !b){
            let error="Invalid";
            if(input.validationMessage!=""){
                error=input.validationMessage;
            }
            showError(form,input,error);
            
        }else if(!checklanguage(input.value.replace(/\s/g))){
            showError(form,input,"Invalid Language");
        }else{
            notShowError(form,input);
        }
    }
    // if(input.type=='email'){
        
    // }
}
const checkEmail=function(text){
    let value=/^((([0-9A-Za-z]{1}[-0-9A-z\.]{0,30}[0-9A-Za-z]?)|([0-9А-Яа-я]{1}[-0-9А-я\.]{0,30}[0-9А-Яа-я]?))@([-A-Za-z]{1,}\.){1,}[-A-Za-z]{2,})$/;
    if(value.test(text)==true){
        return true;
    }else{
        return false;
    }
}
const checkTel=function(text){
    let value=/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
    value=/^((\+7|7|8)+([0-9]){10,10})$/;
    if(value.test(text)==true){
        return true;
    }else{
        return false;
    }
}
const checklanguage=function(text){
    let value=/^[a-zA-Z0-9.@+-]+$/;
    if(value.test(text)==true){
        return true;
    }else{
        return false;
    }
}


const showError=function(form,input, error){
    console.log(error);
    input.classList.add('error');
    let span=form.querySelector(`.${input.id}-error`);
    span.textContent=error;
    span.style.opacity=1;
    span.classList.add('span-error');
}
const notShowError=function(form,input){
    console.log('ok');
    let span=form.querySelector(`.${input.id}-error`);
    input.classList.remove('error');
    span.style.opacity=0;
    span.textContent="";
    span.classList.remove('span-error');

}


check();


const popup=function(){
    let openLink = document.querySelectorAll(".form_modal");
    let oPopup = document.querySelector(".form__popup-bg");
    openLink.forEach((button) => {
	    button.addEventListener('click', function(evt){
		    let formID = evt.target.getAttribute('href');
		    document.querySelector(formID).classList.add("form__popup_active");
		    oPopup.classList.add("form__popup-bg_active");
	    });
    });
    document.addEventListener('click', function(evt){
        if(evt.target == oPopup){
            oPopup.classList.remove("form__popup-bg_active");
            oPopup.querySelectorAll('.popup').forEach((popupItem) => {
                popupItem.classList.remove("form__popup_active");
            });
        }
    });

}
popup();



const opacityButtonsnext=function(list,button){
    if(!list.nextElementSibling){
        button.classList.add("gallery__button-nonactive");
    }else{
        button.classList.remove("gallery__button-nonactive");
    }
}
const opacityButtonsprev=function(list,button){
    if(!list.previousElementSibling){
        button.classList.add("gallery__button-nonactive");
    }else{
        button.classList.remove("gallery__button-nonactive");
    }
}

const popupGallery=function(){
    let openLink = document.querySelectorAll('.gallery__modal');
    let oPopup = document.querySelector(".gallery__popup-bg");
    openLink.forEach((button) => {
	    button.addEventListener('click', function(evt){
		    let formID = evt.currentTarget.getAttribute('href');
            let srcImg=evt.target.getAttribute('src');
            let altImg=evt.target.getAttribute('alt');
            let image=document.querySelector(".popup_image");
            image.innerHTML=`<img class="class1" src="${srcImg}" alt="${altImg}" style="width:100%">`;
            let list=button.parentElement;
            const prev=document.querySelector('.prev');
            const next=document.querySelector('.next');
            opacityButtonsnext(list,next);
            opacityButtonsprev(list,prev);
            next.addEventListener('click',function(){
                if(list.nextElementSibling){
                    list=list.nextElementSibling;
                    srcImg=list.firstElementChild.firstElementChild.getAttribute('src');
                    altImg=list.firstElementChild.firstElementChild.getAttribute('alt');
                    image.innerHTML=`<img class="class1" src="${srcImg}" alt="${altImg}" style="width:100%">`;
                    console.log(altImg);
                    opacityButtonsnext(list,next);
                    opacityButtonsprev(list,prev);
                }
            });
            prev.addEventListener('click',function(){
                if(list.previousElementSibling){
                    list=list.previousElementSibling;
                    srcImg=list.firstElementChild.firstElementChild.getAttribute('src');
                    altImg=list.firstElementChild.firstElementChild.getAttribute('alt');
                    image.innerHTML=`<img class="class1" src="${srcImg}" alt="${altImg}" style="width:100%">`;
                    console.log(altImg);
                    opacityButtonsnext(list,next);
                    opacityButtonsprev(list,prev);
                }
            });
            

            console.log(list);
		    document.querySelector(formID).classList.add("gallery__popup_active");
		    oPopup.classList.add("gallery__popup-bg_active");
	    });
    });
    document.addEventListener('click', function(evt){
        if(evt.target == oPopup){
            oPopup.classList.remove("gallery__popup-bg_active");
            oPopup.querySelectorAll('.popup').forEach((popupItem) => {
                popupItem.classList.remove("gallery__popup_active");
            });
        }
    });

}


popupGallery();


// var slideIndex = 1;
// showSlides(slideIndex);

// function plusSlides(n) {
//   showSlides(slideIndex += n);
// }

// function currentSlide(n) {
//   showSlides(slideIndex = n);
// }

// function showSlides(n) {
//   var i;
//   var slides = document.getElementsByClassName("mySlides");
//   if (n > slides.length) {
//     slideIndex=slides.length;
//     //todo
//   }
//   if (n < 1) {
//     slideIndex=1;
//     //todo
//   }
//   for (i = 0; i < slides.length; i++) {
//       slides[i].style.display = "none";
//   }
//   slides[slideIndex-1].style.display = "block";

// }
const popupTimeout=async function(){
    //localStorage.clear();
    console.log(localStorage.getItem("popup"));
    if(localStorage.getItem("popup")==null){
        await new Promise(resolve => setTimeout(function(){
    let oPopup = document.querySelector(".time__popup-bg");
	document.querySelector(".time__popup").classList.add("time__popup_active");
	oPopup.classList.add("time__popup-bg_active");
    document.addEventListener('click', function(evt){
        if(evt.target == oPopup){
            localStorage.setItem("popup","true");
            oPopup.classList.remove("time__popup-bg_active");
            oPopup.querySelector('.time__popup').remove("time__popup_active");
        }
    });
    }, 3000));
    }
    //localStorage.clear();
}
popupTimeout();


const makeBlack=function(){
    button=document.querySelector('.makeBlack');
    var r = document.querySelector(':root');
    r.style.setProperty('--background','#fff');
    r.style.setProperty('--element1','#FFC8DD');
    r.style.setProperty('--element2','#BDE0FE');
    r.style.setProperty('--element3','#CDB4DB');
    r.style.setProperty('--text','#000');
    var rs = getComputedStyle(r);
    button.addEventListener('click',function(){
        if(rs.getPropertyValue('--background')=='#fff'){
            r.style.setProperty('--background','#000');
            r.style.setProperty('--element1','#966578');
            r.style.setProperty('--element2','#527a9c');
            r.style.setProperty('--element3','#7d668a');
            r.style.setProperty('--text','#fff');
            
        }else{
            r.style.setProperty('--background','#fff');
            r.style.setProperty('--element1','#FFC8DD');
            r.style.setProperty('--element2','#BDE0FE');
            r.style.setProperty('--element3','#CDB4DB');
            r.style.setProperty('--text','#000');
        }
        
    });
}
makeBlack();
var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    console.log("rain");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
var drops = [];
    function Drop(x, y, speed, length) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.length = length;
      }
const createRain= function () {
        for (var i = 0; i < 100; i++) {
          var x = Math.random() * canvas.width;
          var y = Math.random() * canvas.height;
          var speed = 1 + Math.random() * 5;
          var length = 10 + Math.random() * 10;
          drops.push(new Drop(x, y, speed, length));
        }
      }
const update= function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < drops.length; i++) {
            drops[i].y += drops[i].speed;
            if (drops[i].y - drops[i].length > canvas.height) {
              drops[i].y = Math.random() * -canvas.height;
            }
            ctx.beginPath();
          ctx.moveTo(drops[i].x, drops[i].y);
          ctx.lineTo(drops[i].x, drops[i].y + drops[i].length);
          ctx.strokeStyle = "rgba(15, 21, 77,0.5)";
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        requestAnimationFrame(update);
}


const cleara =function(){
    drops=[];
}
let isRaining=false;
let needStart=false;
if(window.innerWidth>=800){
    console.log("rrain"+window.innerWidth);
    console.log("rain0");
    createRain();
    update();
    isRaining=true;
}else{
    needStart=true;
}

const makeRain=function(){
    window.addEventListener('resize', function(event) {
        //console.log("jj"+this.window.innerWidth);
        if(this.window.innerWidth>=800 && !isRaining){
            console.log("rrain"+this.window.innerWidth);
            var canvas = document.getElementById("myCanvas");
            createRain(canvas);
            isRaining=true;
        }else if(this.window.innerWidth<800){
            console.log("nooo "+this.window.innerWidth);
            cleara();
            isRaining=false;
        }
        if(needStart && isRaining){
            update();
            needStart=false;
        }
    }, true);
}
makeRain();


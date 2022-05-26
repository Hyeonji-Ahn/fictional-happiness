/* HEADER */
window.onload = function() {scrollFunction()};
window.onscroll = function() {scrollFunction()};


function scrollFunction() {  /* 네비게이션바 */
    var header = document.getElementById('header');

    if(document.documentElement.scrollTop > 70){  /* 페이지 윗 부분이라면 */
        if(!header.classList.contains('navbar-fixed')){
            header.classList.add('navbar-fixed');
            document.getElementsByTagName('body')[0].style.marginTop = '70px';
            header.style.display = 'none';
            setTimeout(function(){
                header.style.display = 'block'; /* 잠시 페이드아웃 되었다가 나타남 */
            },40);
        }
    } else {
        if(header.classList.contains('navbar-fixed')){
            header.classList.remove('navbar-fixed');
            document.getElementsByTagName('body')[0].style.marginTop = '0';
        }
    }
}

function menuToggle() {   /* 토글 버튼 */
    document.getElementById('menu').classList.toggle('show'); /* toggle이 없으면 생성해줌 */
}

document.getElementById('toggleBtn').addEventListener('click',menuToggle); /* toggle 누르면 토글함수 호출 */

/* welcome area */
var imageSlideIndex = 1; /* 현재 노출되는 이미지의 번호 */
showImageSlides(imageSlideIndex);

function imageSlideTimer(){
    plusImageSlides(1);
}

var imageTimer = setInterval(imageSlideTimer, 3000);

function plusImageSlides(n) {
  clearInterval(imageTimer);
  imageTimer = setInterval(imageSlideTimer, 3000);

  showImageSlides(imageSlideIndex += n);
}

function currentImageSlide(n){
  clearInterval(imageTimer);
  imageTimer = setInterval(imageSlideTimer, 3000);

  showImageSlides(imageSlideIndex = n);
}

function showImageSlides(n) {
    var i;
    var slides = document.getElementsByClassName('image-slide');
    var dots = document.getElementsByClassName('dot');
    if (n > slides.length) {imageSlideIndex = 1}    /* 첫번째 이미지로 초기화 */
    if (n < 1) {imageSlideIndex = slides.length}   /* 마지막 이미지로 초기화 */
    for (i = 0; i < slides.length; i++) {           /* 이미지가 보이지 않게 설정 */
        slides[i].style.display = 'none';
    }
    for (i = 0; i < dots.length; i++) {             /* dots가 보이지 않게 설정 */
        dots[i].className = dots[i].className.replace(' active', '');
    }
    slides[imageSlideIndex-1].style.display = 'block';  
    dots[imageSlideIndex-1].className += ' active';  /* 선택된 이미지와 닷만 보이게 설정 */
  }

document.getElementById('imagePrev').addEventListener('click', plusImageSlides.bind(null,-1));
document.getElementById('imageNext').addEventListener('click', plusImageSlides.bind(null,1));
  
document.getElementById('firstDot').addEventListener('click', currentImageSlide.bind(null,1));
document.getElementById('secondDot').addEventListener('click', currentImageSlide.bind(null,2));
document.getElementById('thirdDot').addEventListener('click', currentImageSlide.bind(null,3));
document.getElementById('forthDot').addEventListener('click', currentImageSlide.bind(null,4)); 

/* PORTFOLIO AREA */
filterSelection('all');

function filterSelection(id) {
  var x, i;

  x = document.getElementsByClassName('listItem');
  for(i=0;i<x.length;i++){
    removeClass(x[i], 'active');
  }
  addClass(document.getElementById(id), 'active');

  x = document.getElementsByClassName('filterItem');
  if(id == 'all') id = '';
  for(i=0;i<x.length;i++){
    removeClass(x[i], 'show');
    if(x[i].className.indexOf(id) > -1)
      addClass(x[i], 'show');
  }
}

function addClass(element, name) {
    if(element.className.indexOf(name) == -1) {
      element.className += " " + name;
    }
}

function removeClass(element, name) {
  var arr;
  arr = element.className.split(" ");

 while(arr.indexOf(name) > -1){
   arr.splice(arr.indexOf(name), 1);
 }
 /* 배열의 원소들을 연결하여 하나의 값으로 만듭니다. */
 element.className = arr.join(" ");
}


/************** TO CHANGE************/
document.getElementById('all').addEventListener('click', filterSelection.bind(null, 'all'));
document.getElementById('illustration').addEventListener('click', filterSelection.bind(null, 'illustration'));
document.getElementById('design').addEventListener('click', filterSelection.bind(null, 'design'));

function viewPortfolio(event){
    var polyNode = event.target;

    if(polyNode.tagName.toLowerCase() == 'i') {
        polyNode = polyNode.parentNode;
    }

    var overlayNode = polyNode;
    var imageNode = overlayNode.nextElementSibling;

    var itemNode = overlayNode.parentNode;
    var mainNode = itemNode.nextElementSibling;
    var subNode = mainNode.nextElementSibling;
    var textNode = subNode.nextElementSibling;

    document.getElementById('modalImage').src = imageNode.src;
    document.getElementById('modalMain').innerHTML = mainNode.innerHTML;
    document.getElementById('modalSub').innerHTML = subNode.innerHTML;
    document.getElementById('modalText').innerHTML = textNode.innerHTML;

    document.getElementById('portfolioModal').style.display = 'block';
}

document.getElementById('modalClose').addEventListener('click', function() {
    document.getElementById('portfolioModal').style.display='none';
});

var filterItems = document.getElementsByClassName('overlay');

for(var i=0; i<filterItems.length;i++){
    filterItems[i].addEventListener('click',viewPortfolio);
}

/* NAVBAR ANCHOR */
function moveTo(id) {
  if(id == 'brand'){
    window.scrollTo(0, 0);
  } else {
    window.scrollTo(0, document.getElementById(id).offsetTop - 70);
  }
  document.getElementById('menu').classList.remove('show');
}

document.getElementById('navbarBrand').addEventListener('click', moveTo.bind(null,'brand'));
document.getElementById('navbarAbout').addEventListener('click', moveTo.bind(null,'about'));
document.getElementById('navbarPortfolio').addEventListener('click', moveTo.bind(null,'portfolio'));

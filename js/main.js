/* documnet == html 자체라는 뜻 */
const searchEl = document.querySelector('.search');
/*searchEl 안에서 input 요소를 찾는다.*/ 
/*const searchInputEl = document.querySelector('.search input'); 이렇게 넣어도 됨
하지만 search를 또 찾아서 input 기능을 넣는 것*/
const searchInputEl = searchEl.querySelector('input');

/*input 요소를 자체를 선택하지 않고 그 input 요소가 소속되어 있는 search라는 클래스를 가지고 있는
div요소 아무곳이나 클릭해도 input이 focus가 된다.*/
searchEl.addEventListener('click',function(){
    searchInputEl.focus(); // 실제 검색 요소의 input 요소에 focus 하라는 뜻
});

searchInputEl.addEventListener('focus', function(){
    searchEl.classList.add('focused');
    // searchInputEl에 어떤 HTML의 속성을 지정할 때 쓰는 메소드
    searchInputEl.setAttribute('placeholder','통합검색');
});

searchInputEl.addEventListener('blur', function(){
    searchEl.classList.remove('focused');
    // searchInputEl에 어떤 HTML의 속성을 지정할 때 쓰는 메소드
    searchInputEl.setAttribute('placeholder','');
});
// 화면의 스크롤의 값이 일정 값 이상보다 커지면 오른쪽 홍보 창을 화면에서 사라도록 작업하기

const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top');
/* window란 브라우저 창이라고 이해하기 브라우저가 가지고 있는 여러 명령들을 들고 있다.
    우리가 보고있는 화면 자체에다가 스크롤 이벤트가 일어나면 뒤에 함수를 추가하겠다 라고 이해하기 */
/* 사이트에서 스크롤을 해보면 엄청 많은 동작이 이루어지는 것을 볼 수 있다. 사이트 구조가 복잡해지고 양이 많아지면
실행되는 함수들이 많아지는데 이런 작업들을 최소화 시켜주기 위해 일단 외부에서 JavaScript Library를 통해서 제어 시켜주기
구글에 (lodash cdn) */
/* _.throttle이란 스크롤 할 때 300 = 0.3초 단위로 부하를 줘서 함수가 우르르 실행되는 것을 방지해준다.
함수 라이브러리를 사용할 때 _.를 사용해주기 */
window.addEventListener('scroll', _.throttle(function(){
    // _.throttle('사용하려고 하는 함수를 넣어준다.', '시간을 넣어준다.')
    console.log(window.scrollY);
    // 스크롤이 500이 넘어가면
    if (window.scrollY > 500) {
        // 버ㅌ ㄴ
        // gsap.to(요소, 지속시간, 옵션);
        /* opacity 속성처럼 값을 숫자로 입력하는 속성들은, 전환 효과(transition 속성이나 GSAP 라이브러리 등)를 통해
        요소의 전/후 상태를 중간 숫자의 값으로 자연스럽게 만들어 줄 수 있지만, display 속성처럼 값이 숫자가 아닌 속성은 전/후
         상태의 중간값이 존재하지 않기 때문에, 자연스러운 전환 효과를 적용할 수 없다. */
        gsap.to(badgeEl, 0.6, {
            opacity : 0,
            display : 'none'
        });
        // 버튼 보이기!
        // css 선택자만 적어도 gsap이라는 코드가 자동으로 찾아준다.
        gsap.to(toTopEl, .2, {
            // x축이 다시 0으로 돌아오면서 버튼이 보여지게 만들어준다.
            x: 0
        });
    } else {
        // 배지 보여주기
        gsap.to(badgeEl, 0.6, {
            opacity : 1,
            display : 'block'
        });
        // 버튼 숨기기!
        gsap.to(toTopEl, .2, {
            // x축의 이동 값을 추가하겠다. 화면에서 숨겨지기 위해 오른쪽으로 100px만큼 이동.
            x: 100
        });
    }
}, 300));
/* 스크롤이 500이상일 때 자연스럽게 사라지기 위해서 gsap cdn이라는 javascript library를 사용. */

// 버튼을 누르면 최상단으로 이동하게 만들어주기 변수는 28번째 줄에 있다.
toTopEl.addEventListener('click', function(){
    gsap.to(window, .7,{
        scrollTo: 0 // toTopEl 즉, id가 to-top인 버튼을 누르면 0.7초 동안 사이트 제일 위로 이동시켜줌.
    });
});

const fadeEls = document.querySelectorAll('.visual .fade-in');
// 매개변수로 각각의 반복되는 fadeEl과, 반복되는 횟수(index)를 넣어준다.
fadeEls.forEach(function(fadeEl, index){
    // gsap.to(요소, 지속시간, 옵션);
    gsap.to(fadeEl, 1, {
        // +1을 한 이유는 0 * 0.7해도 값은 0이므로 +1을 해서 딜레이가 적용되게 해준다. (0.7초)
        delay: (index+1) * .7, // 1번째 : 0.7초, 2번째 : 1.4초, 3번째 : 2.1초, 4번째 : 2.7초 뒤에 나타나게 됨.
        opacity: 1
    });
});

// new Swiper(선택자, 옵션)
new Swiper('.notice-line .swiper-container', {
    direction: 'vertical',
    autoplay: true, // 자동 재생 여부
    loop: true // 반복 재생의 여부
}); // 생성자(클래스)
new Swiper('.promotion .swiper-container', {
    slidesPerView: 3, // 한번에 보여줄 슬라이드 개수
    spaceBetween: 10, // 슬라이드 사이 여백
    centeredSlides: true, // 1번 슬라이드가 가운데 보이기 즉, 제일 처음에 보여질 슬라이드가 왼쪽이 아닌 가운데에 보여지게 함
    loop: true,
    autoplay: {
        delay: 5000
    },
    pagination: {
        el : '.promotion .swiper-pagination', // 페이지 번호 요소 선택자
        clickable : true// 사용자의 페이지 번호 요소 제어 기능 여부
    },
    navigation: {
        prevEl: '.promotion .swiper-prev',
        nextEl: '.promotion .swiper-next'
    }
});
// AWARDS 슬라이드
new Swiper('.awards .swiper-container',{
    // direction: 'horizontal' horizontal는 수평을 의미(기본 값)
    autoplay: true , // 자동재생
    loop: true, // 반복재생
    spaceBetween: 30, // 사이사이 여백을 30px
    slidesPerView: 5, // 하나의 화면에 몇 개의 슬라이드가 보일 것인지?
    navigation: {
        prevEl: '.awards .swiper-prev',
        nextEl: '.awards .swiper-next'
    }
});

const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false; // let으로 만들면 값이 어느 순간에 변할 수도 있다는 뜻.
promotionToggleBtn.addEventListener('click', function(){
    isHidePromotion = !isHidePromotion; // 클랙히면 false => true로 변경
    if(isHidePromotion){
        // isHidePromotion이 true이면 문자 데이터 hide를 추가해주고, 숨김 처리 해준다.
        // hide는 독립적인 클래스가 아니라 특정 클래스에 속해있는 클래스 이므로 .hide말고 hide로 적어준다.
        promotionEl.classList.add('hide');
    }else{
        // isHidePromotion이 false이면 hide클래스를 추가해주고 보임 처리
        promotionEl.classList.remove('hide');
    }
});

// youtube inner 원모양 그림 3개 둥둥 떠다니는 JS코드
// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max){
    return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

function floatingObject(selector, delay, size){
    // gsap.to(요소, 시간, 옵션);
    // 선택자를 받고, random함수로 애니메이션의 동작시간을 넣어주고, 옵션을 지정한다.
    gsap.to(selector, random(1.5, 2.5), {
        // 옵션
        y: size, //y축으로 알만큼 이동하면서 처리할 것인가?
        repeat: -1,  // -1은 무한반복이라는 뜻. 
        yoyo: true, // 한번 재생된 애니메이션을 다시 뒤로 재생시켜줌. 
        ease: Power1.easeInOut,
        delay: random(0, delay)
    });
}
// 인수로 css 선택자 넣어주기
floatingObject('.floating1',1,15);
floatingObject('.floating2',.5,15);
floatingObject('.floating3', 1.5, 20);



/*우리가 원하는 세션이 보이는지 안보이는지 판단해주는 JS 라이브러리 
scrollMagic cdn 검색 => https://cdnjs.com/libraries/ScrollMagic 사이트 들어가기 => 가장 위에 있는 코드를 복사 
=> html에 main.js 위에 script태그에 src에 넣어준다.*/ 

const spyEls = document.querySelectorAll('section.scroll-spy'); // html에 section에 .scoll-spy라는 클래스가 있으면 변수에 할당.
spyEls.forEach(function(spyEl){
    // Scene은 JS 라이브러리를 통해서 특정한 요소를 감시하는 옵션을 지정해주는 메소드
    // setClassToggle()은 html 클래스 속성을 지정하고, 넣었다가 뺐다가 해주는 역할을 해준다.
    // addTo는 ScrollMagic이 필요한 컨트롤러라는 개념의 내용을 추가하기 위해서 꼭 사용해야되는 메서드이다.
    new ScrollMagic // 페이지 시작하는 부분이 0 끝나는 부분이 1로 scrollMagic이라는 라이브러리가 판단
        .Scene({
            // 반복될 때마다 감시하려는 세션 부분에 spyEl의 정보를 하나씩 추가해줄 것이다.
            triggerElement: spyEl, // trigger란 무엇인가 강제로 발생시킨다는 뜻. 즉, 보여짐의 여부를 감시할 요소를 지정
            triggerHook: .8 // 페이지 시작하는 부분이 0 끝나는 부분이 1로 scrollMagic이라는 라이브러리가 판단하는데 중간부분은 0.5이다. 즉, 스크롤 하다가 0.8부분에 걸리면 실행되게 하는 것.
        })
        // .setClassToggle(어떤 클래스를 토글할 그 요소 지정, 토글할 클래스 이름)
        .setClassToggle(spyEl, 'show')
        // .addTo(new 자바스크립트 라이브러리 실행.메소드)
        // ScrollMagic에서 추가한 옵션들을 내부의 컨트롤러에 내용을 할당해서 실제로 동작할 수 있는 구조로 만들어주는 용도로 사용.
        .addTo(new ScrollMagic.Controller())
})

// 올해가 몇년도 인지 알려주는 코드
const thisYear = document.querySelector('.this-year');
// 글자 내용을 알아내거나, 지정할 때 사용.
thisYear.textContent = new Date().getFullYear(); // 2021이라는 숫자가 나옴.
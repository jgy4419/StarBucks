// 2
var tag = document.createElement('script');

tag.src = "https://youtube.com/iframe_api";
// script 태그를 가지고 있는 요소들 중에 제일 첫번째 요소를 지정
var firstScriptTag = document.getElementsByTagName('script')[0];
// 찾은 첫번째 요소에 부모 요소를 찾아서 무엇인가의 이전 부분에 삽입을 할 것인데 
// 삽입되는 요소 자체는 tag라는 변수고, firstSctiptTag의 이전이다.
// 즉 찾은 것보다 먼저 script태그를 앞에서 삽입을 해서 실행. 그래야 3번 부분 코드가 실행이 된다.
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3
// 이 함수명은 외부 API에서 가지고온 라이브러리에서 함수 이름을 자동으로 찾게 만들어 놔서 함수명을 꼭 저걸로 써야된다.
function onYouTubeIframeAPIReady(){
    // YT라는 유튜브 명령에서 Player라는 메서드 실행 
    // 여기서 얘기하는 Player는 html에서 <div id="player"></div>를 의미한다.
    new YT.Player('player',{
        // 어떤 아이디 값을 가지고 있는 유튜브를 출력할 것인지 명시해야 출력이 된다.
        // 아이디는 ex) http://www,youtube.com/watch?v=(여기부터)An6LvWQuj_8(여기까지)가 아이디 값이다.
        /*  아이디 값을 사용 안하고 우클릭에 소스 코드 복사를 해서 사용하는 것은 오로지 출력만 가능해서 제어가 되지 않는다.
        즉, 반복재성, 음소거 등 기능을 넣어야되기 때문에 id를 사용.*/
        videoId: 'An6LvWQuj_8', // 최초 재생할 유튜브 영상 ID
        playerVars: {
           autoplay: true, // 자동 재생 유무
           loop: true, // 반복 재생 유무  
           playlist: 'An6LvWQuj_8'  // 반복 재생할 유튜브 영상 ID 목록
        }, // 영상을 재생하기 위한 여러가지 변수들(옵션)
        events:{
            onReady: function(event){ // onReady라는 이벤트(명령)이 실행되면 다음과 같은 기능 실행
                event.target.mute() // 음소거
            }
        }
    });
}
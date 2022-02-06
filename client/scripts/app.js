const githubID = 'USCgil0127' // 여러분의 아이디로 바꿔주세요

const app = {
  server: `http://3.36.72.17:3000/${githubID}/messages`, // 건들 필요없다.


  // init ()
  // 페이지 로딩시 처음 실행되는 함수 ( 지금까지 작성된 챗을 출력함)
  // 메세지를 정해진 댓글 틀에 맞춰서 보여주고
  // 이전까지 썼던 댓글 데이터 ( + send () 를 사용했을 때 입력될 데이터)를 가지고 올 fetch가 필요
  // Response: Json => " 메세지 객체가 담긴 배열" 이다!! => { result: [ ()  ] }

  init: function () {
    // TODO

      app.fetch().then( data => { 
            // json 형식의 data가 들어왔을 때, for 문을 이용해서 메세지를 넘겨주는 역할 해줄 함수가 필요 
            // for  => data.rendermessage(el);
            for( let element of data ){
               app.renderMessage(element);
            }     
      } ) // end of then

  },

  fetch: async function () {
    // app
    const res = await window.fetch(app.server, { method: 'GET' });
    return await res.json();

  },

  // fetch: function () {
    
  //   return window.fetch( app.server, { method: 'GET' })
  //     .then( res => res.json() )
  // },



  renderMessage: function (element){

    const chats = document.querySelector("#chats");

    let div = document.createElement("div");
    div.classList.add("commentBox");
    // div 안에 commentBox 라는 class 넣어줌
    
    let el_user = document.createElement("div");
    el_user.classList.add("commentList");
    el_user.textContent = element.username;
    // 

    let el_comment = document.createElement("div");
    el_comment.classList.add("commentList");
    el_comment.textContent = element.text;
    //

    let el_room = document.createElement("div");
    el_room.classList.add("commentList");
    el_room.textContent = element.roomname;
    //

    div.appendChild( el_user );
    div.appendChild( el_comment );
    div.appendChild( el_room );

    //div.append( el_user , el_comment , el_room );

    //chats.append(div);
    ////////append로 쓰니까 맨 맡에 달린다.
    chats.prepend(div);

  },

  // 서버에 메세지를 저장하는 함수 => POST를 사용해야 함
  send: function (message){
    window.fetch( app.server, { 
      method: 'POST',
      body : JSON.stringify(message), // body : 너 뭐임??
      // 객체를 JSON으로 변환합니다.

      headers : {
        "Content-Type": "application/json"
      }
     })
     .then( res => res.json() ); // 이미 body에서 함 바꿨는데 왜 또 여기서 바꿔줘야 되지??
   
  },  // end of send


  clearMessages: function () { // 테스트 케이스 통과용으로 만듬

    const deleteComment = document.querySelector("#chats");
    while (deleteComment.children.length > 0) {
      deleteComment.removeChild(deleteComment.lastChild);
    }

    // 현재는 HTML에서만 지워졌지만 저장소까지 지워지지는 않아서 clear를 fetch해줘야 한다.
    // app.resetMessages()
    // 테스트 케이스가 지져분하게 나와서 일단 삭제

  }, //메세지 삭제

  // XSS: function () {
  //   window.fetch(`http://3.36.72.17:3000/${githubID}/malicious`, {
  //       method: 'POST'
  //     })
  //     .then((response) => response.json())
  //     .then((json) => {
  //       console.log(json)
  //       console.log('XSS 공격 성공')
  //     })
  // },

  resetMessages() {
    window
      .fetch(`http://3.36.72.17:3000/${githubID}/clear`, {
        method: 'POST'
      })
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        console.log('메세지 초기화 완료!')
      })
  },

}; // end of const app => testcase 의 요구사항이다 => const app 안에 메소드들을 안 넣어주면 인식이 안 된다.



app.init(); // 첫 화면을 실행하는 부분!!

//app.XSS();

document.addEventListener('submit', function(event) {
  event.preventDefault()
  const username = document.querySelector('.inputUser').value
  const text = document.querySelector('.inputChat').value
  const Newmessage = {
    username,
    text,
    roomname: ' '
  }

  if( username.length === 0 || text.length === 0 ){
      alert("UserName과 Comment 둘 다 채워주세요.")
  }
  else if(  ( !username.trim() ) || ( !text.trim() )  ){
    // 띄어쓰기만으로 빈 칸을 채웠을 때, 처리 방법
    alert("UserName과 Comment 둘 다 제대로 채워주세요.")
  }
  else{

    app.send(Newmessage)
    app.renderMessage(Newmessage)

  }
  

  document.querySelector('.inputUser').value = ""

  document.querySelector('.inputChat').value = ""

  // username = ""  // 이렇게는 댓글창이 안 비워지네
  // text = ""
  
})


// clear를 위한 버튼
document.addEventListener('reset', function(event) {
  event.preventDefault()

  app.clearMessages() 
  // 현재 HTML의 댓글들만 삭제 

  app.resetMessages()
  // 서버까지 삭제
  
})


// 테스트를 위한 코드입니다. 아래 내용은 지우지 마세요
if(window.isNodeENV){
  module.exports = app;
}

// XSS 공격을 어떻게 막을 수 있을까요?? 그냥 textContent를 사용하면 되지 않을까요...

///////html은 돌아가는데, testcase가 돌아가지 않음... 왜지?? => 재원님~~~
////////TypeError => Cannot set property 'onclick' of null
//#button 은 ID 라서 => null로 찾은 거고, button은 button 하나만 찾으니까 가능
// document.querySelector("#btn").onclick = function () {
//   // querySelect 가 되지 않은 채로 document에 onclick 테그를 달아주려고 하니까 에러가 나는 거임
//   // general 의 제안 처럼 if 절로 button 유무에 따라서 처리해줄 필요가 있다.
//   let newMessage = {
//     username: document.querySelector(".inputUser").value,
//     text: document.querySelector(".inputChat").value,
//     roomname: " "
//   }
//   app.renderMessage(newMessage);
//   app.send(newMessage);

// } // Submit 클릭시 새로운 메세지 추가
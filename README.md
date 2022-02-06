## Chatterbox client

![](https://images.velog.io/images/gil0127/post/6eb3c09f-7c65-498b-9653-c7d83d7f25b5/11.gif)
이번 과제는 클라이언트와 서버 등의 웹 아키텍처를 구성하는 여러 스프린트의 출발점으로서, 여러분들의 동료들과 같이 채팅을 할 수 있는 chat application의 클라이언트 부분을 만들어 볼 것입니다. 서버는 이미 AWS에 구축/배포되어 있는 코드스테이츠 Chatterbox Server를 활용하게 됩니다. 여러분들은 fetch API를 활용하여, 서버에 메세지를 요청하고(GET), 메세지를 보내게(POST) 될 것입니다.

이번에 만들 클라이언트는 앞으로 여러 스프린트에서 다시 활용할 것이기 때문에, 유지 가능하고, 재사용 가능한 코드를 작성할 수 있도록 노력하시면 좋겠습니다.

## Bare Minimum Requirements
- Chatterbox Server API 문서를 이용해서 클라이언트를 만드세요.
- 클라이언트는 서버로부터 받아온 메시지들을 보여 줄 수 있어야하고, 내가 작성한 메시지를 서버에 보낼 수 있어야 합니다.
- 클라이언트가 테스트에 통과할 수 있도록 만드세요.
- XSS 공격을 어떻게 막을 수 있는지 생각해보세요.

### Getting Started

[repository 주소](https://github.com/codestates/im-sprint-chatterbox-client)

### 구현 및 테스트 통과
repository 내의 `client/scripts/app.js` 에서 코드 작업을 시작합니다. 실제로 작동하는 클라이언트를 구현하기 위해서는 `client/index.html` 파일을 수정하세요. `app.js` 파일은 [Singleton 패턴](https://stackoverflow.com/questions/1479319/simplest-cleanest-way-to-implement-a-singleton-in-javascript/1479341#1479341)으로 작성되어야 합니다. 어떻게 시작해야할지 모르겠다면 다음 코드를 참고하세요.
```js
const app = {
  server: 'http://3.36.72.17:3000/kimcoding/messages',
  fetch: function() {
    // todo
  },
  send: function() {
    // todo
  }
}
```
테스트를 통과하기 위해서는 `spec/chatterboxSpec.js` 파일을 참고하세요. npm test를 실행해 테스트할 수 있습니다.

서버에 리소스를 요청 혹은 생성하기 위해서, 우리는 서버에 요구하는 양식에 맞추어서 데이터를 전송하고 요청해야 합니다.

**Chatterbox Server API** 문서가 서버의 요구사항입니다. 서버가 어떤 형태로 요청을 해주기를 원하는지 확인해보세요.

### XSS 공격
XSS 공격을 위해서 우리는 DOM 엘리먼트의 textContent가 아닌 innerHTML 기능을 사용해볼 것입니다. 먼저 [두 속성의 차이](https://developer.mozilla.org/ko/docs/Web/API/Node/textContent#innerhtml%EA%B3%BC%EC%9D%98_%EC%B0%A8%EC%9D%B4%EC%A0%90)를 확인해볼까요?

따라서, 이미 여러분들이 renderMessage 메소드를 구현했을 때에, DOM의 textContent를 이용했다면, XSS 공격을 허용하기 위해 innerHTML로 바꿔줍시다. 그 후에, API 문서에서 제공되는 XSS 공격을 시도해보세요. textContent를 쓰지 않고 어떻게 XSS 공격을 막아낼 수 있을까요?

### Advanced Challenges
아래의 Advanced 컨텐츠들은 테스트 케이스가 작성되어 있지 않습니다.

- Room: 메시지를 보낼 때 `roomname`을 지정할 수 있습니다. 또한 GET 요청의 파라미터를 이용해서 Room을 필터링할 수 있습니다. select box를 만들어서 방별로 구분해서 메시지 조회/생성을 시도해보세요.
- 서버에 어떤 새로운 메시지가 등록된 경우, 브라우저에서 새로고침을 하지 않더라도, 서버에서 계속 메시지를 받아오려면 어떻게 해야 할까요? 주기적으로 자동으로 새로운 메시지의 fetch가 이루어지도록 만들어보세요.

----------

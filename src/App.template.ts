export const README = `
  <h1>여기는 홈 입니다.</h1>
  <div style="margin-top:1rem">좀 더 많은 기능을 구현하지 못한 것이 아쉽습니다..</div>
  <h3 style="margin:3rem 0px 1rem 0px">아쉬웠던 점</h3>
  <ul>
    1. 모달창을 구현하였으나, tab키를 눌렀을 때 모달 바깥으로 focus가 빠져나가는 현상을 제대로 해결하지 못한 것 같습니다. 'tabIndex'를 활용하려했으나 방법을 찾지 못해 e.preventDefault()를 사용했습니다.</br>
    2. 사이드바의 토글 상태를 유지하려했으나 구현하지 못했습니다.</br>
    3. rich editor를 구현하지 못했습니다.</br>
  </ul>
  <h3 style="margin:3rem 0px 1rem 0px">주요 기능</h3>
  <ul>
    1. 모달창을 이용하여 document를 추가합니다.</br>
    2. 잘못된 url로 접근 시 404 페이지를 보여줍니다.</br>
    3. 예기치 못한 에러 발생 시 홈으로 리다이렉트합니다.</br>
    4. 현재 페이지를 보고 있는 상태에서 사이드바를 통해 현재 페이지를 삭제하면 홈으로 리다이렉트하고 history기록에서 삭제합니다.</br>
    5. 에디터에 디바운스 전략을 적용하여 입력 후 2초가 지나면 자동저장됩니다.</br>
  </ul>
`

export const template = `
  <main id="notion-app">
    <nav id="notion-app-sidebar"></nav>
    <section id="notion-app-content"></section>
  </main>
`

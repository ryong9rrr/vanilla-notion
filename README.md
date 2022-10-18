# 📔 상윤의 Notion

<img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/d0578a2e-8fcb-4055-a399-b5a4bea92421/%E1%84%92%E1%85%AA%E1%84%86%E1%85%A7%E1%86%AB_%E1%84%80%E1%85%B5%E1%84%85%E1%85%A9%E1%86%A8_2022-10-10_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_10.22.37.gif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221018%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221018T161738Z&X-Amz-Expires=86400&X-Amz-Signature=43d50b83234d047c56bc6221a5ffc353ebfe33d79aab00b3d7027740d109b717&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22%25E1%2584%2592%25E1%2585%25AA%25E1%2584%2586%25E1%2585%25A7%25E1%2586%25AB%2520%25E1%2584%2580%25E1%2585%25B5%25E1%2584%2585%25E1%2585%25A9%25E1%2586%25A8%25202022-10-10%2520%25E1%2584%258B%25E1%2585%25A9%25E1%2584%258C%25E1%2585%25A5%25E1%2586%25AB%252010.22.37.gif%22&x-id=GetObject">

## 👋 간단 소개

- 바닐라 타입스크립트로만 구현한 Notion 클론 입니다.

- 자바스크립트로만 작성했던 코드를 타입스크립트로 마이그레이션 하면서 객체 지향 관점에서 코드를 설계해보았습니다.

## 🤔 고민했던, 고민하고 있는 부분

### 라우터를 어떻게 잘 설계할 수 있을까?

- Router는 url에 따라 페이지를 렌더링 하는 것 외에는 관심이 없어야한다.
- View라는 추상 클래스는 어떻게 설계할까?

### Component라는 추상 클래스

- 컴포넌트는 `types.ts`, `template.ts`, `index.ts`로 구성되어 어떤 **규격**을 가지고 있습니다.

  - `template`을 추상 메서드로 만들 수도 있습니다. 여기서는 분리시켜놓으면 더 좋을 것 같아 params로 옮겼습니다.

- SPA에서 컴포넌트는 언제 렌더링이 되어야 할지 모른다. (페이지가 렌더링 될 때 렌더링 되어야 함)

- 이 부분에 있어 아직도 많이 고민중입니다. 토글을 구현했지만 토글 버튼을 클릭할 때마다 인스턴스가 계속 생성되어 메모리 측면에서 최적화가 필요할 것 같습니다.

---

<details>
<summary>폴더 구조</summary>
<div markdown="1">

```
src
 ┣ components
 ┃ ┣ Editor
 ┃ ┃ ┣ index.css
 ┃ ┃ ┣ index.ts
 ┃ ┃ ┣ template.ts
 ┃ ┃ ┗ types.ts
 ┃ ┣ Modal
 ┃ ┃ ┣ index.css
 ┃ ┃ ┣ index.ts
 ┃ ┃ ┣ template.ts
 ┃ ┃ ┗ types.ts
 ┃ ┣ Sidebar
 ┃ ┃ ┣ LastNode
 ┃ ┃ ┃ ┣ index.ts
 ┃ ┃ ┃ ┣ template.ts
 ┃ ┃ ┃ ┗ types.ts
 ┃ ┃ ┣ SidebarList
 ┃ ┃ ┃ ┣ index.ts
 ┃ ┃ ┃ ┣ template.ts
 ┃ ┃ ┃ ┗ types.ts
 ┃ ┃ ┣ index.css
 ┃ ┃ ┣ index.ts
 ┃ ┃ ┣ template.ts
 ┃ ┃ ┗ types.ts
 ┃ ┗ index.ts
 ┣ core
 ┃ ┣ api.ts
 ┃ ┣ component.ts
 ┃ ┣ router.ts
 ┃ ┗ view.ts
 ┣ models
 ┃ ┗ document.ts
 ┣ pages
 ┃ ┣ Content
 ┃ ┃ ┗ index.ts
 ┃ ┣ Home
 ┃ ┃ ┗ index.ts
 ┃ ┣ NotFound
 ┃ ┃ ┗ index.ts
 ┃ ┗ index.ts
 ┣ services
 ┃ ┗ document.ts
 ┣ style
 ┃ ┣ app.css
 ┃ ┗ index.css
 ┣ utils
 ┃ ┣ constants.ts
 ┃ ┣ debounce.ts
 ┃ ┗ dom.ts
 ┣ App.template.ts
 ┣ App.ts
 ┣ App.types.ts
 ┗ index.ts
```

</div>
</details>

---

- [바닐라 노션을 구현하면서 고민했던 것들](https://www.notion.so/ryong9rrr/8eaa63bee0184f0cbd3158753b1b2a53)

- [바닐라 SPA를 구현하면서 고민했던 것들](https://www.notion.so/ryong9rrr/SPA-Todo-App-35a5a095062649cf9b69b787bb785c87)

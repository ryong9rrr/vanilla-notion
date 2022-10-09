import View from '~/core/view'
interface Props {
  parentElement: HTMLElement
}

export default class HomePage extends View {
  constructor({ parentElement }: Props) {
    super({ parentElement })
  }

  template(): string {
    return `
    <h1>안녕하세요! 프론트엔드 개발자 용상윤입니다.</h1>
    <hr />
    <div>이것은 바닐라 타입스크립트로만 만든 노션입니다. 편하게 둘러봐주세요!</div>
  `
  }
}

const template = `<h1>404 Not Found</h1>`

export default function NotFound({ $target }: any) {
  this.render = () => {
    $target.innerHTML = template
  }

  this.render()
}

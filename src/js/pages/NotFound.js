const template = `<h1>404 Not Found</h1>`;

export default function NotFound({ $target }) {
  this.render = () => {
    $target.innerHTML = template;
  };

  this.render();
}

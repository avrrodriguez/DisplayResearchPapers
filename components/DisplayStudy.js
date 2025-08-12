export class DisplayStudy extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const contentSection = document.getElementById("content");
    contentSection.innerHTML = "";
    let displayStudy = document.createElement("div");
    displayStudy.innerHTML += `
      <h2>Study Title</h2>
      <h3>Study categories</h3>
      <p>study abstract</p>
      <p>buttons</p>
    `;

    contentSection.appendChild(displayStudy);
  }
}

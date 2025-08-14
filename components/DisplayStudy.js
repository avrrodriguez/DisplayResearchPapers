export class DisplayStudy extends HTMLElement {
  constructor() {
    super();

    let element = document.querySelector("section");
    let styles = document.createElement("style");

    async function LoadCSS() {
      let stylesFile = await fetch("./components/DisplayStudy.css");
      styles.textContent = await stylesFile.text();
      element.appendChild(styles);
    }

    LoadCSS();
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

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
    if (contentSection.childNodes[0]) {
      let displayStudy = contentSection.childNodes[0];
      displayStudy.innerHTML = "";

      let study = this.getStudyInfo();

      let studyDiv = document.createElement("div");
      studyDiv.innerHTML += `
        <p class="study-date">${study.publicationDate}</p>
        <h2 class="study-title">${study.title}</h2>
        <h3 class="study-authors">${study.authors}</h3>
        <h3 class="study-fields">${study.fieldsOfStudy}</h3>
        <p class="study-abstract">${study.abstract}</p>
        <div class="study-urls">
          <p class="study-pdf-url">pdf download</p>
          <p class="study-read-url">read online</p>
        </div>
        <div class="publication-info">
          <p>${study.publicationName}</p>
          <p>${study.publicationURL}</p>
        </div>
      `;

      displayStudy.appendChild(studyDiv);
    }
  }

  getStudyInfo() {
    let currentUrl = document.URL;
    return app.store.menu.matches[currentUrl.split("-")[1]];
  }
}

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
        <div class="study-date-title">
          <p class="study-date">${study.publicationDate}</p>
          <h2 class="study-title">${study.title}</h2>
        </div>
        <h3 class="study-authors">${study.authors}</h3>
        <h4 class="study-fields">${study.fieldsOfStudy}</h3>
        <p class="study-abstract">${study.abstract}</p>
        <div class="study-urls">
          <a 
            class="study-pdf-url site-button"
            href="/"
          >PDF Download</a>
          <a 
            class="study-read-url 
            site-button" href="/"
          >Read Online</a>
        </div>
        <div class="publication-info">
          <p>${study.publicationName}</p>
          <a href="/">${study.publicationURL}</a>
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

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

  InnerHTML(study) {
    return `
    <div class="study-date-title">
      <p class="study-date">${study.publicationDate}</p>
      <h2 class="study-title">${study.title}</h2>
    </div>
    <h3 class="study-authors">${[...new Set(study.authors.map((item) => " " + item.name))]}</h3>
    <h4 class="study-fields">${[...new Set(study.s2FieldsOfStudy.map((item) => " " + item.category))]}</h3>
    <p class="study-abstract">${study.abstract ? study.abstract : "No Abstract"}</p>
    <div class="study-urls">
      ${
        study.openAccessPdf.url
          ? `<a 
      class="study-pdf-url site-button"
      href="${study.openAccessPdf.url}"
      target="_blank"
    >PDF Download</a>`
          : ""
      }
      <a 
        class="study-read-url site-button" 
        href="${study.url}"
        target="_blank"
      >Read Online</a>
    </div>
    <div class="publication-info">
      <p>${study.journal.name}</p>
    </div>
  `;
  }

  getStudyInfo() {
    let currentUrl = document.URL;
    return app.store.list[currentUrl.split("-")[1]];
  }

  render() {
    const contentSection = document.getElementById("content");
    if (contentSection.querySelector("display-study")) {
      let displayStudy = contentSection.querySelector("display-study");
      displayStudy.innerHTML = "";

      let study = this.getStudyInfo();

      let studyDiv = document.createElement("div");
      studyDiv.innerHTML += this.InnerHTML(study);

      displayStudy.appendChild(studyDiv);
    }
  }
}

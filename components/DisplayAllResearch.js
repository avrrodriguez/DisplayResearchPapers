import Router from "../services/Router.js";

export class DisplayAllResearch extends HTMLElement {
  constructor() {
    super();

    let element = document.querySelector("section");
    let styles = document.createElement("style");

    async function LoadCSS() {
      let stylesFile = await fetch("./components/DisplayAllResearch.css");
      styles.textContent = await stylesFile.text();
      element.appendChild(styles);
    }

    LoadCSS();
  }

  connectedCallback() {
    window.addEventListener("applistchange", () => {
      this.render();
    });
    this.render();
  }

  render() {
    let section = document.getElementById("content");
    if (section.childNodes[0]) {
      let displayResearchElement = section.childNodes[0];
      displayResearchElement.innerHTML = ``;
      if (app.store.list) {
        for (let item = 0; item < app.store.list.length; item++) {
          let addDiv = document.createElement("div");
          addDiv.innerHTML += `
                        <h2>${app.store.list[item].title.toUpperCase()}</h2>
                        <h3>${[
                          ...new Set(app.store.list[item].s2FieldsOfStudy.map((item) => " " + item.category)),
                        ]}</h3>
                        <p>${app.store.list[item].abstract}</p>
                        <div class="research-buttons">
                        <a class="site-button">Download Study</a>
                            <a class="site-button">More Information</a>
                        </div
                    `;

          addDiv.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", (event) => {
              event.preventDefault();
              app.router.go(`/study-${item}`);
            });
          });

          displayResearchElement.appendChild(addDiv);
        }
      } else {
        let addDiv = document.createElement("div");
        addDiv.innerHTML = `
                    <p>Loading...</p>
                `;
        displayResearchElement.appendChild(addDiv);
      }
    } else {
      let addDiv = document.createElement("div");
      addDiv.innerHTML = `
                <p>404 This is not a Page</p>
            `;
      section.appendChild(addDiv);
    }
  }
}

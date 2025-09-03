import Router from "../services/Router.js";
import SearchForm from "./SearchForm.js";

export class DisplayAllResearch extends HTMLElement {
  constructor() {
    super();

    let element = document.querySelector("section");
    let styles = document.createElement("style");
    console.log("in display all research");

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
    console.log("render content");
    let section = document.getElementById("content");
    if (section.querySelector("display-all-research")) {
      let displayResearchElement = section.querySelector("display-all-research");
      displayResearchElement.innerHTML = ``;

      displayResearchElement.appendChild(SearchForm());

      for (let item = 0; item < app.store.list.length; item++) {
        let addDiv = document.createElement("div");
        addDiv.innerHTML += `
                        <h2>${app.store.list[item].title.toUpperCase()}</h2>
                        <h3>${[
                          ...new Set(app.store.list[item].s2FieldsOfStudy.map((item) => " " + item.category)),
                        ]}</h3>
                        <p>${app.store.list[item].abstract ? app.store.list[item].abstract : "No Abstract"}</p>
                        <div class="research-buttons">
                        ${
                          app.store.list[item].openAccessPdf.url.length > 0
                            ? `<a class="site-button" href="${app.store.list[item].openAccessPdf.url}" target="_blank">Download Study</a>`
                            : ``
                        }
                          <a class="site-button" id="research-button-more">More Information</a>
                        </div
                    `;

        addDiv.querySelectorAll("#research-button-more").forEach((link) => {
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
                <p>404 This is not a Page</p>
            `;
      section.appendChild(addDiv);
    }
  }
}

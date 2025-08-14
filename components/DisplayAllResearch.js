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
    window.addEventListener("appmenuchange", () => {
      this.render();
    });
    this.render();
  }

  render() {
    let section = document.getElementById("content");
    if (section.childNodes[0]) {
      let displayResearchElement = section.childNodes[0];
      displayResearchElement.innerHTML = ``;
      if (app.store.menu) {
        for (let item of app.store.menu.matches) {
          let addDiv = document.createElement("div");
          addDiv.innerHTML += `
                        <h2>${item.title}</h2>
                        <h3>${item.categories}</h3>
                        <p>${item.abstract}</p>
                        <div class="research-buttons">
                            <a>Read Full Study</a>
                            <a>Download Study</a>
                        </div
                    `;

          addDiv.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", (event) => {
              event.preventDefault();
              app.router.go("/study");
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

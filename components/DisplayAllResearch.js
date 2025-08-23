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
        for (let item = 0; item < app.store.menu.matches.length; item++) {
          let addDiv = document.createElement("div");
          addDiv.innerHTML += `
                        <h2>${app.store.menu.matches[item].title}</h2>
                        <h3>${app.store.menu.matches[item].categories}</h3>
                        <p>${app.store.menu.matches[item].abstract}</p>
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

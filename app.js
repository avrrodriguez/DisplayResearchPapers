import { DisplayAllResearch } from "./components/displayAllResearch.js";
import { DisplayStudy } from "./components/DisplayStudy.js";
import Router from "./services/Router.js";
import Store from "./services/Store.js";
import { LoadData } from "./services/Data.js";

window.app = {};
app.store = Store;
app.router = Router;

customElements.define("display-all-research", DisplayAllResearch);
customElements.define("display-study", DisplayStudy);

window.addEventListener("DOMContentLoaded", () => {
  console.log("DOM Content Loaded");
  LoadData();
  app.router.init();
});

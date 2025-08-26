import { LoadData } from "../services/Data.js";

export default function SearchForm() {
  let formDiv = document.createElement("div");
  formDiv.innerHTML += `<form id='search-form'>
    <input name='search-input' type='text' placeholder='Search...'/>
  </form>`;

  formDiv.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("form submitted");
    app.store.query = event.target.firstElementChild.value;
    LoadData();
  });

  return formDiv;
}

import ResearchDataAPI from "./ResearchDataAPI.js";

export async function LoadData() {
  console.log("calling api");
  let dataArray = await ResearchDataAPI();
  app.store.menu = dataArray.data;
}

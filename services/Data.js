import ResearchDataAPI from "./ResearchDataAPI.js";

export async function LoadData() {
    app.store.menu = await ResearchDataAPI();
};
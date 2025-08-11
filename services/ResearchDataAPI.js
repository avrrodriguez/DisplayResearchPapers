export default async function ResearchDataAPI() {
    const response = await fetch("data/SampleData.json");
    return await response.json()
}
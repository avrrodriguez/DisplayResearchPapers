export default async function ResearchDataAPI() {
  console.log("query is:", app.store.query);
  //   let fields = "title,year,authors,abstract,s2FieldsOfStudy,journal,publicationDate,url,openAccessPdf";
  //   let limit = 3;
  //   let offset = 0;
  //   const response = await fetch(
  //     `https://api.semanticscholar.org/graph/v1/paper/search?query=${app.store.query}&fields=${fields}&offset=${offset}&limit=${limit}`
  //   );
  const response = await fetch("./data/SampleData.json");

  return await response.json();
}

export default async function ResearchDataAPI() {
  let query = "covid+vaccination";
  let fields = "title,year,authors,abstract,s2FieldsOfStudy,journal,publicationDate,url,openAccessPdf";
  let limit = 3;
  let offset = 0;
  const response = await fetch(
    `https://api.semanticscholar.org/graph/v1/paper/search?query=${query}&fields=${fields}&offset=${offset}&limit=${limit}`
  );
  return await response.json();
}

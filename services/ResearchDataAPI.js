export default async function ResearchDataAPI() {
  const response = await fetch(
    "https://api.semanticscholar.org/graph/v1/paper/search/bulk?query=covid+vaccination&fields=title,year,authors,abstract,s2FieldsOfStudy,journal,publicationDate,url,openAccessPdf"
  );
  return await response.json();
}

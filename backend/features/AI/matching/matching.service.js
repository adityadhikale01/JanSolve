export function calculateMatchScore({
  semanticSimilarity,
  domainMatch,
  subdomainMatch,
  problemTypeMatch,
  locationScore,
}) {
  const score =
    semanticSimilarity * 0.50 +
    domainMatch * 0.15 +
    subdomainMatch * 0.15 +
    problemTypeMatch * 0.10 +
    locationScore * 0.10;

  return Number(score.toFixed(4));
}
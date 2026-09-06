export function calculateUniversityScore({
  domainMatch,
  subdomainMatch,
  expertiseMatch,
  researchMatch,
  facilityMatch,
  locationScore,
  innovationScore,
}) {
  const score =
    domainMatch * 0.20 +
    subdomainMatch * 0.20 +
    expertiseMatch * 0.20 +
    researchMatch * 0.15 +
    facilityMatch * 0.10 +
    locationScore * 0.05 +
    innovationScore * 0.10;

  return Number(
    score.toFixed(4)
  );
}
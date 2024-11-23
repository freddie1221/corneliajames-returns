export default function calculateValidUntil(createdAt) {
  const validUntil = new Date(createdAt);
  validUntil.setDate(validUntil.getDate() + 60);
  
  return validUntil
}
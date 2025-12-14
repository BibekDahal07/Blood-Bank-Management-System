export const isEligibleAgain = (lastDonationDate) => {
  if (!lastDonationDate) return true;

  const now = new Date();
  const diffDays = Math.floor(
    (now - new Date(lastDonationDate)) / (1000 * 60 * 60 * 24)
  );

  return diffDays >= 90;
};

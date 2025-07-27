export const isProductForbiddenForBloodType = (product, bloodType) => {
  // Geçersiz veri durumları
  if (
    !product.groupBloodNotAllowed ||
    !Array.isArray(product.groupBloodNotAllowed)
  ) {
    return false;
  }

  const index = Number(bloodType) - 1;

  // Kan grubu geçerli değilse
  if (index < 0 || index > 3) return false;

  return product.groupBloodNotAllowed[index] === true;
};


export const isProductForbiddenForBloodType = (product, bloodType) => {
  //  Geçersiz veya eksik groupBloodNotAllowed verisi varsa ürünü filtreleme
  if (
    !product.groupBloodNotAllowed ||
    !Array.isArray(product.groupBloodNotAllowed)
  ) {
    return false;
  }

  //  bloodType güvenli şekilde sayıya dönüştürülüyor
  const parsedBloodType = Number(bloodType);

  //  Geçersiz kan grubu numarası ise filtreleme
  if (isNaN(parsedBloodType) || parsedBloodType < 1 || parsedBloodType > 4) {
    return false;
  }

  const index = parsedBloodType - 1;

  //  İlgili index'teki yasaklılık durumu kontrol ediliyor
  return product.groupBloodNotAllowed[index] === true;
};


















// export const isProductForbiddenForBloodType = (product, bloodType) => {
//   // Geçersiz veri durumları
//   if (
//     !product.groupBloodNotAllowed ||
//     !Array.isArray(product.groupBloodNotAllowed)
//   ) {
//     return false;
//   }

//   const index = Number(bloodType) - 1;

//   // Kan grubu geçerli değilse
//   if (index < 0 || index > 3) return false;

//   return product.groupBloodNotAllowed[index] === true;
// };



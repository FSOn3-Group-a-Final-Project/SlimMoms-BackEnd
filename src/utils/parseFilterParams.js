const parseBloodType = (bloodType) => {
  const isString = typeof bloodType === 'string';
  if (!isString) return;

  const isBloodType = (bloodType) =>
    ['1', '2', '3', '4'].includes(bloodType);

  if (isBloodType(bloodType)) return bloodType;
};

/*
const parseSearchKeyword = (searchKeyword) => {
  const isString = typeof searchKeyword === 'string';
  if (!isString) return String(searchKeyword);

  return searchKeyword;
};
*/



export const parseFilterParams = (query) => {
    //const { searchKeyword, bloodType } = query;
    const {bloodType} = query;

    const parsedBloodType = parseBloodType(bloodType);
    //const parsedSearchKeyword = parseSearchKeyword(searchKeyword);

    return {
        //searchKeyword: parsedSearchKeyword,
        bloodType: parsedBloodType,
    };
};
const addComma = (price: string | number) => {
  let returnString = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return returnString;
};

export { addComma };

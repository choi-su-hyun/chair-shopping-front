const addComma = (price: string) => {
  let returnString = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return returnString;
};

export { addComma };

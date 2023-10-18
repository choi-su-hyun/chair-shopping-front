const changeKrFormate = (timeData: string) => {
  const date = new Date(timeData);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return year + '-' + month + '-' + day;
};

export { changeKrFormate };

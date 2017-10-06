const zeroPadded = (num, digits) => {
  return `0${num}`.slice(-digits);
};

const formatDate = d => {
  const date = d.getDate();
  const month = d.getMonth();
  const year = d.getFullYear();
  return `${zeroPadded(date, 2)}.${zeroPadded(month, 2)}.${year}`;
};

export default formatDate;

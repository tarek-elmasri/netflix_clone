const truncate = (str, length) => {
  return str?.length > length ? str.substr(0, length - 1) + " ..." : str;
};

export default truncate;

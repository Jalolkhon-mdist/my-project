const utils = {
  likes: {
    count(count: number) {
      const str = count.toString();
      if (str.length > 3) {
        return `${str.substring(0, 1)}.${str.substring(1, 2)}k`;
      } else {
        return str;
      }
    },
  },
};

export default utils;

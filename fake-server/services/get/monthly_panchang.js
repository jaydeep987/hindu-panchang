module.exports = {
  path: "/panchang_api/monthly_panchang",
  template: {
    year: (params, query) => parseInt(query.year),
    month: (params, query) => { console.log(query.month); return parseInt(query.month)},
    panchang: (params, query) => {
      const initTithi = parseInt(Math.random() * 29);
      const initNak = parseInt(Math.random() * 27);
      let i;
      const now = new Date(query.year, query.month + 1, -1);
      const data = [];
      let nak = initNak;
      let tithi = initTithi;

      for (i = 0; i < now.getDate(); i++, nak++, tithi++) {
        data.push({
          day: i + 1,
          tithi,
          nak,
          sunrise: 6.1752,
          sunSetTime: 19.0138
        });

        if (nak >= 26) nak = -1;
        if (tithi >= 30) tithi = -1;
      }
      console.log(data);
      return data;
    }
  }
};

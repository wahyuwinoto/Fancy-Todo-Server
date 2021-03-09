const Axios = require("axios");

class airvisual {
  static async airvisual(req, res, next) {
    try {
      let API_KEY = process.env.API_KEY;
      let URL = `http://api.airvisual.com/v2/nearest_city?key=${API_KEY}`;
      console.log(URL);
      let response = await Axios.get(URL);

      return res.json(response.data);
    } catch (err) {
      console.log(err);
      return next(err);
    }
  }
}

class kataBijak {
  static kataBijak(req, res, next) {
    Axios({
      method: "GET",
      url: `https://api.quotable.io/random`,
    })
      .then((response) => {
        res.status(200).json(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
module.exports = { airvisual, kataBijak };

module.exports = function (app) {
  app.get("/best", (request, response) => {
    const images = [
      {
        url: "https://imgcdn1.przelom.pl/im/v1/news-900-widen-wm/2020/03/30/30423_1585584202_97964700.jpg",
        caption: "Slide 1",
      },
      {
        url: "https://d-art.ppstatic.pl/kadry/k/r/1/93/33/58c04527eddcc_o_medium.jpg",
        caption: "Slide 2",
      },
      {
        url: "https://ipla.pluscdn.pl/dituel/cp/1t/1tk62pu34rqvkhg3c26zxrpq3d7xgfdb.jpg",
        caption: "Slide 3",
      },
    ];
    response.code(200).send(images);
  });
};

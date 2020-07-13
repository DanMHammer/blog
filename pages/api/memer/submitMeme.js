import fetch from "isomorphic-unfetch";
const imgflip_user = process.env.imgflip_user;
const imgflip_password = process.env.imgflip_password;

export default (req, res) => {
  const { id, top, bottom } = req.query;

  const params = {
    username: imgflip_user,
    password: imgflip_password,
    template_id: id,
    text0: top,
    text1: bottom,
  };

  const bodyParams = Object.keys(params)
    .map((key) => {
      return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
    })
    .join("&");

  fetch("https://api.imgflip.com/caption_image", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: bodyParams,
  })
    .then((response) => response.json())
    .then((data) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.send(data);
    });
};

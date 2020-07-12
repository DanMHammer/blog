import axios from "axios";
const imgflip_user = process.env.imgflip_user;
const imgflip_password = process.env.imgflip_password;

export default (req, res) => {
  const { id, top, bottom } = req.query;

  axios
    .post("https://api.imgflip.com/caption_image", {
      username: imgflip_user,
      password: imgflip_password,
      template_id: id,
      text0: top,
      text1: bottom,
    })
    .then(function (response) {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.send(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};

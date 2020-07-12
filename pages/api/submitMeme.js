import axios from "axios";
const imgflip_user = process.env.imgflip_user;
const imgflip_password = process.env.imgflip_password;

export default (req, res) => {
  const { id, top, bottom } = req.query;
  const res = await fetch("https://api.imgflip.com/get_memes");
  const data = await res.json();

  axios.post('https://api.imgflip.com/caption_image', {
    username: imgflip_user,
    password: imgflip_password,
    template_id: id,
    text0: top,
    text1: bottom
  })
  .then(function (response) {
      res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });

};

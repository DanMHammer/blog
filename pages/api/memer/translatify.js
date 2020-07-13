import fetch from "isomorphic-unfetch";
const imgflip_user = process.env.imgflip_user;
const imgflip_password = process.env.imgflip_password;

// Imports the Google Cloud client library
const { Translate } = require("@google-cloud/translate").v2;

// Creates a client
const translate = new Translate();

export default async (req, res) => {
  const { id, top, bottom } = req.query;
  const [languages] = await translate.getLanguages();

  const results = await multitranslate(id, languages, top, bottom);
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.send(results);
};

function translator(memes, id, top, bottom, language) {
  return new Promise(async (resolve, reject) => {
    const [topTranslation] = await translate.translate(top, language.code);
    const [bottomTranslation] = await translate.translate(
      bottom,
      language.code
    );

    const params = {
      username: imgflip_user,
      password: imgflip_password,
      template_id: id,
      text0: topTranslation,
      text1: bottomTranslation,
    };

    const bodyParams = Object.keys(params)
      .map((key) => {
        return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
      })
      .join("&");

    const meme = await fetch("https://api.imgflip.com/caption_image", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: bodyParams,
    }).then((response) => response.json());

    // console.log(meme);

    resolve(
      memes.push({
        url: meme.data.url,
        language: language.name,
      })
    );
  });
}

async function multitranslate(id, languages, top, bottom) {
  // 16 random languages + English at the end
  var subset = languages.sort(() => 0.5 - Math.random()).slice(0, 16);
  subset.push({ code: "en", name: "English" });
  subset.unshift({ code: "en", name: "English" });
  //   console.log(subset);
  var memes = [];
  //Translate the text and then fetch the meme from imgflip
  let result = await subset.reduce((accumulatorPromise, language) => {
    return accumulatorPromise.then(() => {
      return translator(memes, id, top, bottom, language);
    });
  }, Promise.resolve(memes));

  return memes;
}

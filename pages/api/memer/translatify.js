import fetch from "isomorphic-unfetch";
const imgflip_user = process.env.imgflip_user;
const imgflip_password = process.env.imgflip_password;

// Imports the Google Cloud client library
const { Translate } = require("@google-cloud/translate").v2;

// Creates a client
const translate = new Translate({
  projectId: process.env.G_PROJECT,
  key: process.env.G_API_KEY,
});

export default async (req, res) => {
  const { id, top, bottom } = req.query;
  const [languages] = await translate.getLanguages();

  console.log(languages);

  const results = await multitranslate(id, languages, top, bottom);
  console.log(results);
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.send(results);
};

function translator(memes, id, top, bottom, language) {
  return new Promise(async (resolve, reject) => {
    var topText = top;
    var bottomText = bottom;

    if (memes.length > 0) {
      topText = memes[memes.length - 1].top;
      bottomText = memes[memes.length - 1].bottom;
    }

    const [topTranslation] = await translate.translate(topText, language.code);
    const [bottomTranslation] = await translate.translate(
      bottomText,
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

    resolve(
      memes.push({
        top: topTranslation,
        bottom: bottomTranslation,
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

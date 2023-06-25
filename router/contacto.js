const router = require("express").Router();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");


router.get("/contacto", (req, res) => {
    res.render("contacto", {
      mimensaje: "false",
    });
  });
  
  router.post("/contacto", (req, res) => {
    const { email, nombre, asunto, mensaje } = req.body;
  
    contentHTML = `
  
  <h1>Nihon</h1>
      
  <ul>
      
      <li>Correo electronico: ${email}</li>
      <li>Asunto: ${asunto}</li>
      <li>Nombre: ${nombre}</li>
      
  </ul>
  
      <span><h2>Mensaje:</h2> <h3>${mensaje}</h3></span>
  
  `;
  
    const ID_CLIENTE =
      "951642545592-c0el176rlnucoh1i3sllhq7v97vqjuva.apps.googleusercontent.com";
    const CLIENTE_SECRET = "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";
    const REDIRECT_URI = "https://developers.google.com/oauthplayground";
    const REFRESH_TOKEN =
      "1//048TYujmd1tnMCgYIARAAGAQSNwF-L9Ir-cWhWV005L3xaDFS9Pm8K6vxLNsJromoKu9i3fPQXBSab2yfplNe9TL9E44QPz4J1qs";
  
    const oAuth2Client = new google.auth.OAuth2(
      ID_CLIENTE,
      CLIENTE_SECRET,
      REDIRECT_URI
    );
    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
  
    async function sendMail() {
      try {
        const accessToken = await oAuth2Client.getAccessToken();
        const tansporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            type: "OAuth2",
            user: "servarela2001@gmail.com",
            clientId: ID_CLIENTE,
            clientSecret: CLIENTE_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken: accessToken,
          },
        });
  
        const mailOptions = {
          from: `Contacto ${nombre} Nihon  <${email}>`,
          to: "serllio2001@gmail.com",
          subject: asunto,
          html: contentHTML,
        };
  
        const resultado = await tansporter.sendMail(mailOptions);
        return resultado;
      } catch (error) {
        console.log("ESTE ES EL ERROR: ", error);
      }
    }
  
    sendMail()
      .then((result) =>
        res.render("contacto", {
          mimensaje: "true",
        })
      )
      .catch((error) => console.log(error.message));
  });


  module.exports = router;
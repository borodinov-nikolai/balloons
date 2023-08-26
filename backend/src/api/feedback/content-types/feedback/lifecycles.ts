const fs = require("fs")
const axios = require("axios")
export default {
  async afterCreate(event) {
    const { result } = event
    const filename = result.attachment.hash + result.attachment.ext
    try {
      const res = await axios.get(`http://localhost:1337/uploads/${filename}`, {
        responseType: "arraybuffer",
      })
      const b64 = Buffer.from(res.data, "binary").toString("base64")
      await strapi.plugins["email"].services.email.send({
        to: `link@linkmusic.ru`,
        from: "a.platya@yandex.ru", // e.g. single sender verification in SendGrid
        subject: `${result.messageSubject}`,
        text: `${result.message}

Контактная информация:

Имя: ${result.name}
Телефон: ${result.phone}
E-mail: ${result.email}`,
        attachments: [
          {
            filename: filename,
            content: b64,
          },
        ],
      })
    } catch (err) {
      console.log(err)
    }
  },
}

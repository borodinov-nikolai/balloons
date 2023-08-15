const fs = require("fs")
export default {
  async afterCreate(event) {
    // Connected to "Save" button in admin panel
    const { result } = event
    const file = result.request.files.file
    const filePath = file.path
    const attachment = fs.readFileSync(filePath).toString("base64")

    try {
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
            filename: "file.pdf",
            content: attachment,
          },
        ],
      })
    } catch (err) {
      console.log(err)
    }
  },
}

const getAttachments = (file) => {
  const attachments = []
  if (file) {
    const filename = file.name
    const content = Buffer.from(file, "base64")
    attachments.push({ filename, content })
  }

  return attachments
}
export default {
  async afterCreate(event) {
    const {
      result: { messageSubject, message, name, phone, email },
    } = event
    const ctx = strapi.requestContext.get()
    const file = ctx.request.files["files.attachment"] || null
    const attachments = getAttachments(file)

    try {
      await strapi.plugins["email"].services.email.send({
        to: `link@linkmusic.ru`,
        from: "hello@linkmusic.ru", // e.g. single sender verification in SendGrid
        subject: `${messageSubject}`,
        text: `${message}

Контактная информация:

Имя: ${name}
Телефон: ${phone}
E-mail: ${email}`,
        attachments,
      })
    } catch (err) {
      console.error("afterCreate", err)
    }
  },
}

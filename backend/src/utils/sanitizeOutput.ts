import { sanitize } from "@strapi/utils"

const sanitizeOutput = (user, ctx) => {
  const schema = strapi.getModel("plugin::users-permissions.user")
  const { auth } = ctx.state

  return sanitize.contentAPI.output(user, schema, { auth })
}

export default sanitizeOutput

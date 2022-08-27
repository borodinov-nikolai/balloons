import _ from "lodash"
import slugify from "slugify"

export const updateMe = async (ctx) => {
  const authUser = ctx.state.user

  if (!authUser) return ctx.unauthorized()

  const newData = _.pick(ctx.request.body, [
    "name",
    "slug",
    "canBookPerformance",
    "description",
    "vk",
    "odnoklassniki",
    "youtube",
    "rutube",
    "telegram",
    "facebook",
    "instagram",
    "site",
    "avatar",
  ])

  newData.slug = slugify(newData.name.toLowerCase())

  if (ctx.request?.files?.avatar) {
    await strapi.service("plugin::upload.upload").upload({
      data: {
        ref: "plugin::users-permissions.user",
        refId: authUser.id,
        field: "avatar",
      },
      files: ctx.request?.files?.avatar,
    })
  }

  // Reconstruct context so we can pass to the controller
  ctx.request.body = newData
  ctx.params = { id: authUser.id }

  // Update the user and return the sanitized data
  return await strapi.controller("plugin::users-permissions.user").update(ctx)
}

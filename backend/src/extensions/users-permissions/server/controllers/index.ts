import getController from "../../../../utils/getController"
import _ from "lodash"
import slugify from "slugify"

export const updateMe = async (ctx) => {
  const user = ctx.state.user

  // User has to be logged in to update themselves
  if (!user) return ctx.unauthorized()

  // Pick only specific fields for security
  const newData = _.pick(ctx.request.body, [
    "name",
    "vk",
    "odnoklassniki",
    "youtube",
    "rutube",
    "telegram",
    "facebook",
    "instagram",
    "site",
    "slug",
  ])

  newData.slug = slugify(newData.name)

  // Reconstruct context so we can pass to the controller
  ctx.request.body = newData
  ctx.params = { id: user.id }

  // Update the user and return the sanitized data
  return await getController("user").update(ctx)
}

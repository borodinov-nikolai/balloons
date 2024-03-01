/**
 * release controller
 */

import { factories } from "@strapi/strapi"

const { createCoreController } = require("@strapi/strapi").factories

module.exports = createCoreController("api::release.release", ({ strapi }) => ({
  async deleteMy(ctx) {
    const { id } = ctx.params

    const release = await strapi.query("api::release.release").findOne({
      id,
      populate: {
        user: true,
      },
    })

    if (release.id != id) {
      return ctx.notFound("Release not found")
    }

    if (release.user.id !== ctx.state.user.id) {
      return ctx.forbidden("You do not have permission to delete this release")
    }

    const deletedEntity = await strapi.query("api::release.release").delete({
      where: { id: id },
    })

    return ctx.send(deletedEntity)
  },
}))

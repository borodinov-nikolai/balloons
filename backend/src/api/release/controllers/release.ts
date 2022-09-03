/**
 *  release controller
 */

import { factories } from "@strapi/strapi"

export default factories.createCoreController(
  "api::release.release",
  ({ strapi }) => ({
    async createRelease(ctx) {
      try {
        ctx.body = "ok"
      } catch (err) {
        ctx.body = err
      }
    },
  })
)

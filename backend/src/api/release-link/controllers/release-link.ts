import crypto from "crypto"

export default {
  getReleaseLink: async (ctx) => {
    let releaseLink = crypto.randomBytes(4).toString("hex")
    let isUnique = false

    do {
      const releases = await strapi.entityService.findMany(
        "api::release.release",
        { filters: { slug: releaseLink } }
      )
      if (releases.length === 0) isUnique = true
      else releaseLink = crypto.randomBytes(4).toString("hex")
    } while (!isUnique)

    ctx.body = releaseLink
  },
}

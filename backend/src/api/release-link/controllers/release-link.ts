import crypto from "crypto"

const excludeLinks = [
  "artist",
  "artists",
  "home",
  "login",
  "news",
  "registration",
  "release",
  "releases",
]

export default {
  getReleaseLink: async (ctx) => {
    let releaseLink = crypto.randomBytes(4).toString("hex")
    let isUnique = false

    do {
      const releases = await strapi.entityService.findMany(
        "api::release.release",
        { filters: { link: releaseLink } }
      )
      const notExcluded = !excludeLinks.includes(releaseLink)
      if (releases.length === 0 && notExcluded) isUnique = true
      else releaseLink = crypto.randomBytes(4).toString("hex")
    } while (!isUnique)

    ctx.body = releaseLink
  },
  checkReleaseLinkIsUnique: async (ctx) => {
    const releaseLink = ctx.params.releaseLink
    const releases = await strapi.entityService.findMany(
      "api::release.release",
      {
        filters: { link: releaseLink },
      }
    )

    ctx.body = !releases.length
  },
}

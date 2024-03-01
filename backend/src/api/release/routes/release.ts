/**
 * release router.
 */

import { factories } from "@strapi/strapi"

export default factories.createCoreRouter("api::release.release", {
  only: ["create", "find", "findOne", "update", "delete", "deleteMy"],
  config: {
    create: { policies: ["global::is-current-user"] },
    update: { policies: ["global::is-current-user"] },
    delete: { policies: ["global::is-current-user"] },
  },
})

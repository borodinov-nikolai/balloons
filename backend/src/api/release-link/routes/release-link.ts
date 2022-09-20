export default {
  routes: [
    {
      method: "GET",
      path: "/release-link",
      handler: "release-link.getReleaseLink",
      config: {
        policies: [],
      },
    },
    {
      method: "GET",
      path: "/release-link-is-unique/:releaseLink",
      handler: "release-link.checkReleaseLinkIsUnique",
      config: {
        policies: [],
      },
    },
  ],
}

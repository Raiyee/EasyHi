export const resolveRoute = (router, link) => {
  if (!/^https?:\/\//.test(link)) return router.push(link)
  location.href = link
}

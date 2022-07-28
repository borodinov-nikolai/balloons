export default function randomString(len = 7) {
  const p = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return [...Array(len)].reduce((a) => a + p[~~(Math.random() * p.length)], "");
}

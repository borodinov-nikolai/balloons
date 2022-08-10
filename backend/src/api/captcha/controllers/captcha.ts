import bcrypt from "bcryptjs"
import { createImg } from "../../../utils/createCaptcha"

export default {
  getCaptchaImage: async (ctx) => {
    try {
      const { img, text } = await createImg(+ctx.query.width, +ctx.query.height)
      ctx.session.captcha = bcrypt.hashSync(text, bcrypt.genSaltSync(3))
      ctx.body = img
    } catch (err) {
      ctx.body = err
    }
  },
  checkCaptcha: async (ctx) => {
    try {
      ctx.body = bcrypt.compareSync(
        ctx.request.body.receivedCaptcha,
        ctx.session.captcha
      )
    } catch (err) {
      ctx.body = err
    }
  },
}

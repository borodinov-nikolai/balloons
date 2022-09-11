import { UserType } from "types/auth"
import { UserSocialLinksType } from "types/general"

export default function getUserSocialLinks(
  user?: UserType
): UserSocialLinksType {
  return {
    vk: user?.vk,
    odnoklassniki: user?.odnoklassniki,
    youtube: user?.youtube,
    rutube: user?.rutube,
    telegram: user?.telegram,
    facebook: user?.facebook,
    instagram: user?.instagram,
  }
}

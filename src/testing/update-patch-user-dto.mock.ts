import { Role } from '../enums/role.enum'
import type { UpdatePatchUserDTO } from '../user/dto/update-patch-user.dto'

export const updatePatchUserDTO: UpdatePatchUserDTO = {
  role: Role.Admin,
}

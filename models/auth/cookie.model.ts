import { LocationApprover } from '@models/auth/user.location'

export interface Cookie {
  token: string
  user: string
  roles: []
  locationsApprovers: LocationApprover
  permissions: Record<string, unknown>
}

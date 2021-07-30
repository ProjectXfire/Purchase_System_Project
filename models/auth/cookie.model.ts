export interface Cookie {
  token: string
  user: string
  approver: string
  roles: string
  locations: []
  permissions: Record<string, unknown>
}

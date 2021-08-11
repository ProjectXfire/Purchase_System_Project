export interface Cookie {
  token: string
  user: string
  approver: string
  roles: []
  locations: []
  permissions: Record<string, unknown>
}

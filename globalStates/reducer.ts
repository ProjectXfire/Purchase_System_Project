export const reducer = (
  state: Record<string, unknown>,
  action: { type: string; payload: any }
): any => {
  switch (action.type) {
    case 'SELECT_LOCATION':
      return {
        ...state,
        selectedLocation: action.payload.location,
        selectedYear: action.payload.year
      }
    default:
      return state
  }
}

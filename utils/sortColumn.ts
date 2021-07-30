export const sortColumn = (array: any[], columnSelected: string): any[] => {
  let columnSorted: any[] = array
  const prop = columnSelected.split('.')

  if (prop.length === 1) {
    columnSorted = columnSorted.slice(0).sort((before: any, after: any) => {
      before = before[prop[0]]
      after = after[prop[0]]
      if (before.toLowerCase() > after.toLowerCase()) {
        return 1
      }
      if (before.toLowerCase() < after.toLowerCase()) {
        return -1
      }
      return 0
    })
  }
  if (prop.length === 2) {
    columnSorted = columnSorted.slice(0).sort((before: any, after: any) => {
      before = before[prop[0]][prop[1]]
      after = after[prop[0]][prop[1]]
      if (before.toLowerCase() > after.toLowerCase()) {
        return 1
      }
      if (before.toLowerCase() < after.toLowerCase()) {
        return -1
      }
      return 0
    })
  }
  if (prop.length === 3) {
    columnSorted = columnSorted.slice(0).sort((before: any, after: any) => {
      before = before[prop[0]][prop[1]][prop[2]]
      after = after[prop[0]][prop[1]][prop[2]]
      if (before.toLowerCase() > after.toLowerCase()) {
        return 1
      }
      if (before.toLowerCase() < after.toLowerCase()) {
        return -1
      }
      return 0
    })
  }

  return columnSorted
}

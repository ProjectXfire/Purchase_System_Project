export const searchItems = (
  data: Array<any>,
  fields: string[],
  value: string
): Array<any> => {
  const searchedValues: any[] = data.filter(item => {
    for (let i = 0; i < fields.length; i++) {
      const props = fields[i].split('.')
      if (props.length === 1) {
        if (item[props[0]].toLowerCase().includes(value.toLowerCase())) {
          return true
        }
      }
      if (props.length === 2) {
        if (
          item[props[0]][props[1]].toLowerCase().includes(value.toLowerCase())
        ) {
          return true
        }
      }
      if (props.length === 3) {
        if (
          item[props[0]][props[1]][props[2]]
            .toLowerCase()
            .includes(value.toLowerCase())
        ) {
          return true
        }
      }
    }
    return false
  })
  return searchedValues
}

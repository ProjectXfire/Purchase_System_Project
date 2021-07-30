interface DropdownValues {
  key: number
  value: string
  text: string
}

export const fillDropdown = (data: any[]): DropdownValues[] => {
  const dropdownFilled = data.map((value, index) => ({
    key: index,
    value: value._id,
    text: `${value.name} ${value.description}`
  }))
  return dropdownFilled
}

export const fillDropdownAccount = (data: any[]): DropdownValues[] => {
  const dropdownFilled = data.map((value, index) => ({
    key: index,
    value: value._id,
    text: `
      ${value.costcode.name} ${value.costcode.description} -
      ${value.costtype.name} ${value.costtype.description} -
      ${value.budget.name} ${value.budget.description}
    `
  }))
  return dropdownFilled
}

export const fillDropdownCode = (): DropdownValues[] => {
  const unitcode = []
  for (let i = 0; i < 1000; i++) {
    if (i >= 0 && i < 10) {
      unitcode.push(`00${i}`)
    }
    if (i >= 10 && i < 100) {
      unitcode.push(`0${i}`)
    }
    if (i > 100) {
      unitcode.push(`${i}`)
    }
  }
  const unitcodeDropdown = unitcode.map((value, index) => ({
    key: index,
    value,
    text: value
  }))
  return unitcodeDropdown
}

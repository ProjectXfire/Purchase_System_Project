interface DropdownValues {
  key: number
  value: string
  text: string
}

export const fillDropdown = (data: any[]): DropdownValues[] => {
  const dropdownFilled = data.map((value, index) => ({
    key: index,
    value: value._id,
    text: `${value.name || value.partNumber} - ${value.description}`
  }))
  return dropdownFilled
}

export const fillDropdownOnlyName = (data: any[]): DropdownValues[] => {
  const dropdownFilled = data.map((value, index) => ({
    key: index,
    value: value._id,
    text: `${value.name}`
  }))
  return dropdownFilled
}

export const fillDropdownContract = (data: any[]): DropdownValues[] => {
  const dropdownFilled = data.map((value, index) => ({
    key: index,
    value: value._id,
    text: `${value.name} ${value.description} - ${value.areaUnit} ${value.areaUnitDescription}`
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

export const userStatusDropdown = [
  {
    key: 1,
    value: 'Open',
    text: 'Open'
  },
  {
    key: 2,
    value: 'Closed',
    text: 'Closed'
  },
  {
    key: 3,
    value: 'Canceled',
    text: 'Canceled'
  }
]

export const approverStatusDropdown = [
  {
    key: 1,
    value: 'Approved',
    text: 'Approved'
  },
  {
    key: 2,
    value: 'Not approved',
    text: 'Not approved'
  },
  {
    key: 3,
    value: 'Reject',
    text: 'Reject'
  }
]

export const categoriesDropdown = [
  {
    key: 1,
    value: 'Services',
    text: 'Services'
  },
  {
    key: 2,
    value: 'Purchase',
    text: 'Purchase'
  },
  {
    key: 3,
    value: 'Petty Cash',
    text: 'Petty Cash'
  }
]

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

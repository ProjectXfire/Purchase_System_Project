export const totalValue = (data: any[] = []): number => {
  const total = data.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.totalCost
  }, 0)
  return total
}

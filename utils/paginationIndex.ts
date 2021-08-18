import { itemsPerPageNumber } from '@utils/variables'

export const updateIndexPage = (
  currentPage: number
): { start: number; end: number } => {
  const indexLastItem = currentPage * itemsPerPageNumber
  const indexFirstItem = indexLastItem - itemsPerPageNumber
  return {
    start: indexFirstItem,
    end: indexLastItem
  }
}

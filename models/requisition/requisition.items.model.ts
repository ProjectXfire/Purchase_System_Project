import { Product } from '@models/inventory/product.model'

export interface RequisitionItems {
  _id: string
  requisition: string
  itemCategory: string
  material: Product
  other: string
  description: string
  unitMeasure: string
  price: number
  quantity: number
  totalCost: number
}

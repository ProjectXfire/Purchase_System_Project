import { Product } from '@models/inventory/product.model'

export interface RequisitionItems {
  itemId: number
  requisition: string
  itemCategory: string
  material: Product
  materialName: string
  other: string
  description: string
  unitMeasure: string
  price: number
  quantity: number
  totalCost: number
}

import { Location } from '@models/contract/location.model'
import { Type } from '@models/contract/type.model'

export interface Contract {
  _id: string
  name: string
  description: string
  areaUnit: string[]
  areaUnitDescription: string
  clientCode: string
  location: Location
  contractType: Type
}

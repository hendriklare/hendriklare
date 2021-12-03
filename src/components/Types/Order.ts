import { Row } from './Row'

export type Order = {
    id: string,
    orderNumber: string,
    supplierCode: string,
    orders: { [key: string]: Row },
}
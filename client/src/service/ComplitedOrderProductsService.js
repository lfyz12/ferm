import { $authHost, $host } from "../http";

const ComplitedOrderProductsService = {
    async createComplitedOrderProduct(complitedOrderId, assortmentId, count) {
        return new Promise((resolve) => resolve($authHost.post(
            'api/complitedOrderProduct/createComplitedOrderProduct',
            { complitedOrderId, assortmentId, count })
        ))
    },

    async getAllComplitedOrderProductsByComplitedOrderId(complitedOrderId) {
        return new Promise((resolve) => resolve($authHost.post(
            'api/complitedOrderProduct/getComplitedOrderProductByComplitedOrderID',
            {complitedOrderId})
        ))
    },

    async getComplitedOrderProductsWithAssortmentInfoByComplitedOrderId(complitedOrderId) {
        return new Promise((resolve) => resolve($authHost.post(
            'api/complitedOrderProduct/getComplitedOrderProductsWithAssortmentInfoByComplitedOrderId',
            {complitedOrderId})
        ))
    }
}

export default ComplitedOrderProductsService
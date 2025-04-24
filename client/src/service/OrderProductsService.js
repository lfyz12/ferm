import { $authHost } from "../http";

const OrderProductsService = {
    async createOrderProduct(orderId, assortmentId, count, moreOrLess) {
        return new Promise((resolve) => resolve($authHost.post('api/orderProduct/createOrderProduct',
            { orderId, assortmentId, count, moreOrLess })))
    },

    async getAllOrderProductsByOrderId(orderId) {
        return new Promise((resolve) => resolve($authHost.post('api/orderProduct/getOrderProductByOrderId', {orderId})))
    },

    async getOrderProductsWithAssortmentInfoByOrderId(orderId) {
        return new Promise((resolve) => resolve($authHost.post('api/orderProduct/getOrderProductsWithAssortmentInfoByOrderId', {orderId})))
    },

    async deleteAllOrderProductsByOrderId(orderId) {
        return new Promise((resolve) => resolve($authHost.post('api/orderProduct/deleteOrderProductByOrderId', {orderId})))
    }
}

export default OrderProductsService
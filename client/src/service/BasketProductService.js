import { $authHost, $host } from "../http";

const BasketProductService = {

    async createBasketProduct(basketId, assortmentId, costPerOne, count, moreOrLess) {
        return new Promise((resolve) => resolve($authHost.post('api/basketProduct/createBasketProduct', {basketId, assortmentId, costPerOne, count, moreOrLess})))
    },

    async getBasketProductsWithAssortmentInfoByBasketID(basketId) {
        return new Promise((resolve) => resolve($authHost.post('api/basketProduct/getBasketProductsWithAssortmentInfoByBasketID', {basketId})))
    },

    async getAllBasketProductsByBasketID(basketId) {
        return new Promise((resolve) => resolve($authHost.post('api/basketProduct/getAllBasketProductsByBasketID', { basketId })))
    },


    async deleteAllBasketProductsByBasketID(basketId) {
        return new Promise((resolve) => resolve($authHost.post('api/basketProduct/deleteAllBasketProductsByBasketID', {basketId})))
    },


    async deleteOneBasketProductByBasketIDAndAssortmentID(basketId, assortmentId) {
        return new Promise((resolve) => resolve($authHost.post('api/basketProduct/deleteOneBasketProductByBasketIDAndAssortmentID', { basketId, assortmentId })))
    },


    async changeMoreOrLessByBasketIDAndAssortmentID(basketId, assortmentId, moreOrLess) {
        return new Promise((resolve) => resolve($authHost.put('api/basketProduct/changeMoreOrLessByBasketIDAndAssortmentID', { basketId, assortmentId, moreOrLess })))
    },

    async changeMoreOrLessByBasketProductID(id, moreOrLess) {
        return new Promise((resolve) => resolve($authHost.put('api/basketProduct/changeMoreOrLessByBasketProductID', {id, moreOrLess})))
    },

    async changeCountByBasketIDAndAssortmentID(basketId, assortmentId, count) {
        return new Promise((resolve) => resolve($authHost.put('api/basketProduct/changeCountByBasketIDAndAssortmentID', { basketId, assortmentId, count })))
    },

}

export default BasketProductService;
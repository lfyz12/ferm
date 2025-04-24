import { $authHost, $host } from "../http";

const BasketService = {

    async getBasketByUserID(userId) {
        return new Promise((resolve) => resolve($authHost.post('api/basket/getBasketByUserID', {userId})))
    },

}

export default BasketService;
import { $authHost } from "../http";

const CourierService = {
    async createCourier( name, number ) {
        return new Promise((resolve) => resolve($authHost.post('api/courier/createCourier', { name, number })))
    },

    async getAllCourier() {
        return new Promise((resolve) => resolve($authHost.post('api/courier/getAllCourier')))
    },

    async destroyCourier(number) {
        return new Promise((resolve) => resolve($authHost.post('api/courier/destroyCourier', { number })))
    }
}

export default CourierService
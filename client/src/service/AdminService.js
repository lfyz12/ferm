import { $authHost } from "../http";

const AdminService = {
    async fetchUsers() {
        return new Promise((resolve) => resolve($authHost.post('api/user/getAll')))
        // return new Promise(() => $authHost.get('api/user/getAll'))
    },

    async changeRoleByNumber(number, role) {
        return new Promise((resolve) => resolve($authHost.put('api/user/changeRoleByNumber', { number, role })))
    }
}

export default AdminService

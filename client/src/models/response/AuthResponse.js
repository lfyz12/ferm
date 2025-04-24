import { IUser } from "../IUser"

export class AuthResponse {
    constructor() {
        this.accessToken = ''
        this.refreshToken = ''
        this.user = new IUser()
    }
} 
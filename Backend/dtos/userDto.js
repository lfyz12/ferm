module.exports = class UserDto {
    id;
    number;
    isActivated;
    role;

    constructor(model) {
        this.id = model.id
        this.name = model.name
        this.number = model.number
        this.defaultAddress = model.defaultAddress
        this.isActivated = model.isActivated
        this.role = model.role
    }
}
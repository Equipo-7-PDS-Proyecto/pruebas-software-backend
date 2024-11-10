"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserType = void 0;
// Enum para tipos de usuarios
var UserType;
(function (UserType) {
    UserType[UserType["Admin"] = 0] = "Admin";
    UserType[UserType["Regular"] = 1] = "Regular";
    UserType[UserType["Guest"] = 2] = "Guest";
})(UserType = exports.UserType || (exports.UserType = {}));

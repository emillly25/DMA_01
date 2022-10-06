"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema_1 = require("../schemas/userSchema");
const User = (0, mongoose_1.model)('users', userSchema_1.UserSchema);
class UserModel {
    postUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User.create(user);
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User.findOne({ email });
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User.create(user);
        });
    }
}
exports.UserModel = UserModel;
const userModel = new UserModel();
exports.userModel = userModel;

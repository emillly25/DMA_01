"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    profile_url: {
        type: String,
    },
    password: {
        type: String,
    },
    role: {
        type: String,
    },
}, {
    collection: 'users',
    timestamps: true,
});
exports.UserSchema = UserSchema;

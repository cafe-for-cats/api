"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var schema = new mongoose_1.Schema({
    _id: mongoose_1.Schema.Types.ObjectId,
    username: String,
    password: String,
    createDate: Date,
    associatedProtests: [
        {
            protestId: mongoose_1.Schema.Types.ObjectId,
            accessLevel: Number,
            isCreator: Boolean,
        },
    ],
});
var User = mongoose_1.model('User', schema);
exports.default = User;

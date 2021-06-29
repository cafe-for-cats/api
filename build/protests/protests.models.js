"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var schema = new mongoose_1.Schema({
    _id: mongoose_1.Schema.Types.ObjectId,
    title: String,
    description: String,
    startDate: Date,
    /** Duration in minutes. */
    duration: Number,
    associatedUsers: [Object],
    shareToken: Object,
});
var Protest = mongoose_1.model('Protest', schema);
exports.default = Protest;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonSocketsConfig = void 0;
var CommonSocketsConfig = /** @class */ (function () {
    function CommonSocketsConfig(io, name) {
        this.io = io;
        this.name = name;
        this.configureSockets();
    }
    CommonSocketsConfig.prototype.getName = function () {
        return this.name;
    };
    return CommonSocketsConfig;
}());
exports.CommonSocketsConfig = CommonSocketsConfig;

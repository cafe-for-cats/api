"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreSockets = void 0;
var common_sockets_config_1 = require("./common.sockets.config");
var CoreSockets = /** @class */ (function (_super) {
    __extends(CoreSockets, _super);
    function CoreSockets(io) {
        return _super.call(this, io, 'CoreSockets') || this;
    }
    CoreSockets.prototype.configureSockets = function () {
        this.io.on('connection', function (socket) {
            console.log("\u2191  Connected client '" + socket.id + "' to io.");
            socket.on('disconnect', function () {
                console.log("\u2193  Disconnected client '" + socket.id + "' from io.");
            });
        });
        return this.io;
    };
    return CoreSockets;
}(common_sockets_config_1.CommonSocketsConfig));
exports.CoreSockets = CoreSockets;

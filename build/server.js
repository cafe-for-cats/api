"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cors_1 = __importDefault(require("cors"));
var http = __importStar(require("http"));
var express_1 = __importDefault(require("express"));
var users_routes_config_1 = require("./users/users.routes.config");
var database_1 = __importDefault(require("./middleware/database"));
var users_service_1 = require("./users/users.service");
var path_1 = __importDefault(require("path"));
var core_sockets_config_1 = require("./common/core.sockets.config");
var protests_sockets_config_1 = require("./protests/protests.sockets.config");
var protests_service_1 = require("./protests/protests.service");
var express_rate_limit_1 = __importDefault(require("express-rate-limit"));
var socket_io_1 = __importDefault(require("socket.io"));
var express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
var protests_routes_config_1 = require("./protests/protests.routes.config");
var port = process.env.PORT || 5000;
var routes = [];
var sockets = [];
var corsOpts = {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true,
};
var app = express_1.default();
var server = http.createServer(app);
var io = new socket_io_1.default.Server(server, { cors: corsOpts });
var limiter = express_rate_limit_1.default({
    windowMs: 10 * 60 * 1000,
    max: 100,
});
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(limiter);
app.use(express_mongo_sanitize_1.default({
    replaceWith: '_',
}));
database_1.default();
var usersService = new users_service_1.UsersService();
var protestsService = new protests_service_1.ProtestsService();
sockets.push(new core_sockets_config_1.CoreSockets(io));
sockets.push(new protests_sockets_config_1.ProtestSockets(io, protestsService));
routes.push(new users_routes_config_1.UsersRoutes(app, usersService));
routes.push(new protests_routes_config_1.ProtestsRoutes(app, protestsService));
app.get('/', function (req, res) {
    res.sendFile(path_1.default.resolve('./src/view/index.html'));
});
server.listen(port, function () {
    routes.forEach(function (route) {
        console.log("\u2714  Routes configured for " + route.getName());
    });
    sockets.forEach(function (socket) {
        console.log("\u2714  Sockets configured for " + socket.getName());
    });
    console.log("\u26A1\uFE0F Server running at http://localhost:" + port);
});

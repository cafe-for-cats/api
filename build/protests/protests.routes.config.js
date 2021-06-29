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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtestsRoutes = void 0;
var common_routes_config_1 = require("../common/common.routes.config");
var authentication_1 = require("../middleware/authentication");
var ProtestsRoutes = /** @class */ (function (_super) {
    __extends(ProtestsRoutes, _super);
    function ProtestsRoutes(app, protestsService) {
        var _this = _super.call(this, app, 'UsersRoutes') || this;
        _this.protestsService = protestsService;
        return _this;
    }
    ProtestsRoutes.prototype.configureRoutes = function () {
        var _this = this;
        this.app
            .route('/protests/addUser')
            .post(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, protestId, userId, accessLevel, _b, status_1, payload, message, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = req.body, protestId = _a.protestId, userId = _a.userId, accessLevel = _a.accessLevel;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.protestsService.addUserToProtest({
                                protestId: protestId,
                                userId: userId,
                                accessLevel: accessLevel,
                            })];
                    case 2:
                        _b = _c.sent(), status_1 = _b.status, payload = _b.payload, message = _b.message;
                        return [2 /*return*/, res.status(200).send({ status: status_1, message: message, payload: payload })];
                    case 3:
                        error_1 = _c.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        this.app
            .route('/protests/:key')
            .all(authentication_1.validateUser)
            .get(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var key, _a, _b, status_2, payload, message, e_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 5, , 6]);
                        key = req.params.key;
                        if (!key) {
                            return [2 /*return*/, res
                                    .status(400)
                                    .send({ status: true, message: 'Must provide a key.' })];
                        }
                        _a = key.length;
                        switch (_a) {
                            case KeyTypeLengths.Token: return [3 /*break*/, 1];
                            case KeyTypeLengths.ObjectId: return [3 /*break*/, 3];
                        }
                        return [3 /*break*/, 4];
                    case 1: return [4 /*yield*/, this.protestsService.getProtestByToken(key)];
                    case 2:
                        _b = _c.sent(), status_2 = _b.status, payload = _b.payload, message = _b.message;
                        return [2 /*return*/, res.status(200).send({ status: status_2, message: message, payload: payload })];
                    case 3: return [2 /*return*/, res.status(200).send({
                            status: false,
                            message: 'GET not implemented for Protest by ObjectId.',
                        })];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        e_1 = _c.sent();
                        console.log(e_1);
                        return [2 /*return*/, res
                                .status(500)
                                .send({ status: false, message: 'Server error.' })];
                    case 6: return [2 /*return*/];
                }
            });
        }); });
        return this.app;
    };
    return ProtestsRoutes;
}(common_routes_config_1.CommonRoutesConfig));
exports.ProtestsRoutes = ProtestsRoutes;
var KeyTypeLengths;
(function (KeyTypeLengths) {
    /** The length of a share token for a protest. For example: `8c9i-9epS` */
    KeyTypeLengths[KeyTypeLengths["Token"] = 9] = "Token";
    /** The length of an `ObjectId` for a protest. For example: `60b974f68a66171753b8bde9` */
    KeyTypeLengths[KeyTypeLengths["ObjectId"] = 24] = "ObjectId";
})(KeyTypeLengths || (KeyTypeLengths = {}));

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
exports.AccessLevels = exports.ProtestsService = void 0;
var users_statics_1 = require("../users/users.statics");
var protests_statics_1 = require("./protests.statics");
var ProtestsService = /** @class */ (function () {
    function ProtestsService() {
    }
    ProtestsService.prototype.addUserToProtest = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var protests, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, protests_statics_1.getProtestsByUserAndProtest(input.protestId, input.userId)];
                    case 1:
                        protests = _a.sent();
                        if (protests[0].associatedUsers.length > 0) {
                            return [2 /*return*/, {
                                    status: true,
                                    message: 'User already exists on protest.',
                                    payload: null,
                                }];
                        }
                        return [4 /*yield*/, protests_statics_1.addUserToProtest(input)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, {
                                status: true,
                                message: 'Success.',
                                payload: result,
                            }];
                }
            });
        });
    };
    ProtestsService.prototype.getProtestByToken = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var result, currentDate, expirationDate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, protests_statics_1.getProtestByShareToken(key)];
                    case 1:
                        result = _a.sent();
                        currentDate = new Date();
                        expirationDate = new Date(result[0].shareToken.expirationDate);
                        if (currentDate > expirationDate) {
                            return [2 /*return*/, {
                                    status: false,
                                    message: 'Protest token is expired.',
                                    payload: null,
                                }];
                        }
                        return [2 /*return*/, {
                                status: true,
                                message: 'Success.',
                                payload: result,
                            }];
                }
            });
        });
    };
    ProtestsService.prototype.addProtest = function (_a) {
        var userId = _a.userId, title = _a.title, description = _a.description, startDate = _a.startDate, duration = _a.duration;
        return __awaiter(this, void 0, void 0, function () {
            var user, userObjectId, newProtest, newProtestResult, protestId, newItem;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, users_statics_1.findUserById(userId)];
                    case 1:
                        user = _b.sent();
                        userObjectId = user === null || user === void 0 ? void 0 : user.get('_id');
                        newProtest = {
                            userId: userObjectId,
                            title: title,
                            description: description,
                            startDate: startDate,
                            duration: duration,
                        };
                        return [4 /*yield*/, protests_statics_1.addProtest(newProtest)];
                    case 2:
                        newProtestResult = _b.sent();
                        protestId = newProtestResult === null || newProtestResult === void 0 ? void 0 : newProtestResult.get('_id');
                        if (!protestId) {
                            return [2 /*return*/, {
                                    status: false,
                                    message: 'Failed to create the protest.',
                                }];
                        }
                        newItem = {
                            _id: protestId,
                        };
                        return [2 /*return*/, newItem];
                }
            });
        });
    };
    return ProtestsService;
}());
exports.ProtestsService = ProtestsService;
var AccessLevels;
(function (AccessLevels) {
    AccessLevels[AccessLevels["Admin"] = -1] = "Admin";
    AccessLevels[AccessLevels["Leader"] = 1] = "Leader";
    AccessLevels[AccessLevels["Organizer"] = 2] = "Organizer";
    AccessLevels[AccessLevels["Attendee"] = 3] = "Attendee";
    AccessLevels[AccessLevels["Unassigned"] = 4] = "Unassigned";
})(AccessLevels = exports.AccessLevels || (exports.AccessLevels = {}));
// -- may want to be able to filter protests by ones that have not happened yet
// -- pull down all protests by ones i've created
// -- separate the "who are you" from the "what you have access to"
// -- how to compsenate for leadership of a protest changing hands

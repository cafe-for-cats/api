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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProtestsByUser = exports.getProtestsByUserAndProtest = exports.getProtestByShareToken = exports.addProtest = exports.addUserToProtest = void 0;
var protests_models_1 = __importDefault(require("./protests.models"));
var mongodb_1 = require("mongodb");
var protests_service_1 = require("./protests.service");
exports.addUserToProtest = function (_a) {
    var protestId = _a.protestId, userId = _a.userId, accessLevel = _a.accessLevel;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, protests_models_1.default.findOneAndUpdate({ _id: new mongodb_1.ObjectId(protestId) }, {
                        $push: {
                            associatedUsers: {
                                _id: new mongodb_1.ObjectId(userId),
                                accessLevel: accessLevel,
                                isCreator: false,
                            },
                        },
                    }, { new: true })];
                case 1: return [2 /*return*/, _b.sent()];
            }
        });
    });
};
exports.addProtest = function (_a) {
    var title = _a.title, startDate = _a.startDate, description = _a.description, userId = _a.userId, duration = _a.duration;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, protests_models_1.default.findOneAndUpdate({ _id: new mongodb_1.ObjectId() }, {
                        $set: {
                            title: title,
                            startDate: startDate,
                            description: description,
                            duration: duration,
                            associatedUsers: [
                                {
                                    _id: new mongodb_1.ObjectId(userId),
                                    accessLevel: protests_service_1.AccessLevels.Leader,
                                    isCreator: true,
                                },
                            ],
                        },
                    }, { upsert: true, new: true })];
                case 1: return [2 /*return*/, _b.sent()];
            }
        });
    });
};
exports.getProtestByShareToken = function (token) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, protests_models_1.default.aggregate([
                    {
                        $match: {
                            'shareToken.token': token,
                        },
                    },
                    {
                        $project: {
                            _id: 1,
                            title: 1,
                            description: 1,
                            startDate: 1,
                            duration: 1,
                            shareToken: 1,
                        },
                    },
                ])];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getProtestsByUserAndProtest = function (protestId, userId) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, protests_models_1.default.aggregate([
                    {
                        $match: {
                            _id: new mongodb_1.ObjectId(protestId),
                            'associatedUsers._id': new mongodb_1.ObjectId(userId),
                        },
                    },
                    {
                        $sort: { startDate: -1 },
                    },
                    {
                        $project: {
                            _id: 1,
                            title: 1,
                            description: 1,
                            startDate: 1,
                            duration: 1,
                            associatedUsers: {
                                $filter: {
                                    input: '$associatedUsers',
                                    as: 'associatedUser',
                                    cond: {
                                        $eq: ['$$associatedUser._id', new mongodb_1.ObjectId(userId)],
                                    },
                                },
                            },
                        },
                    },
                ])];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getProtestsByUser = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, protests_models_1.default.aggregate([
                    {
                        $match: { 'associatedUsers._id': new mongodb_1.ObjectId(userId) },
                    },
                    {
                        $sort: { startDate: -1 },
                    },
                    {
                        $project: {
                            _id: 1,
                            title: 1,
                            description: 1,
                            startDate: 1,
                            duration: 1,
                            associatedUsers: {
                                $filter: {
                                    input: '$associatedUsers',
                                    as: 'associatedUser',
                                    cond: {
                                        $eq: ['$$associatedUser._id', new mongodb_1.ObjectId(userId)],
                                    },
                                },
                            },
                        },
                    },
                ])];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };

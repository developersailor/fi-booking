"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoomsByHotel = exports.createRoom = void 0;
const models_1 = __importDefault(require("../models"));
const { Room } = models_1.default;
const createRoom = async (req, res) => {
    try {
        const { name, type, price, hotelId } = req.body;
        const newRoom = await Room.create({ name, type, price, hotelId });
        res.status(201).json(newRoom);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create room' });
    }
};
exports.createRoom = createRoom;
const getRoomsByHotel = async (req, res) => {
    try {
        const { hotelId } = req.params;
        const rooms = await Room.findAll({ where: { hotelId } });
        res.status(200).json(rooms);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch rooms' });
    }
};
exports.getRoomsByHotel = getRoomsByHotel;
//# sourceMappingURL=roomController.js.map
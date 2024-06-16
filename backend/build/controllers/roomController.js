"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoomsByHotel = exports.createRoom = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createRoom = async (req, res) => {
    try {
        const { name, type, price, hotelId } = req.body;
        const newRoom = await prisma.room.create({
            data: {
                name,
                type,
                price,
                hotelId,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        });
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
        const rooms = await prisma.room.findMany({
            where: {
                hotelId: Number(hotelId)
            },
        });
        res.status(200).json(rooms);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch rooms' });
    }
};
exports.getRoomsByHotel = getRoomsByHotel;
//# sourceMappingURL=roomController.js.map
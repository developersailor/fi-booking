"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const winston_1 = __importDefault(require("winston"));
const index_1 = __importDefault(require("./routes/index")); // Route'ları içe aktarın
const app = (0, express_1.default)();
dotenv_1.default.config();
// Body parser middleware
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// CORS ayarları
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Access-Control-Allow-Methods'],
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
// Route'ları ekleyin
app.use(index_1.default);
const PORT = parseInt(process.env.PORT || '3000', 10);
app.listen(PORT, () => {
    const logger = winston_1.default.createLogger({
        level: 'info',
        format: winston_1.default.format.json(),
        transports: [
            new winston_1.default.transports.File({ filename: 'error.log', level: 'error' }),
            new winston_1.default.transports.File({ filename: 'combined.log' }),
            new winston_1.default.transports.File({ filename: 'info.log', level: 'info' }),
            // prisma client logları için
            new winston_1.default.transports.File({ filename: 'prisma.log', level: 'info' }),
        ],
    });
    if (process.env.NODE_ENV !== 'production') {
        logger.add(new winston_1.default.transports.Console({
            format: winston_1.default.format.simple(),
        }));
    }
    if (process.env.NODE_ENV === 'development') {
        console.log(`Server is running on http://localhost:${PORT}`);
        console.log(`Swagger UI is running on http://localhost:${PORT}/api-docs`);
    }
    else if (process.env.NODE_ENV === 'production') {
        console.log("production mode");
    }
    else {
        console.log("unknown mode");
    }
});
exports.default = app;
//# sourceMappingURL=server.js.map
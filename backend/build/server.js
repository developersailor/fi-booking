"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path")); // Import the 'path' module
const swagger_1 = require("./swagger"); // Swagger konfigürasyonunu içe aktarın
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
// Swagger'ı kurun
(0, swagger_1.setupSwagger)(app);
const pathToSwaggerUi = path_1.default.join(__dirname, 'swagger-ui'); // Define the 'pathToSwaggerUi' variable
app.use(express_1.default.static(pathToSwaggerUi));
const PORT = parseInt(process.env.PORT || '3000', 10);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
exports.default = app;
//# sourceMappingURL=server.js.map
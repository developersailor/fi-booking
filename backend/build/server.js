"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const index_1 = require("./models/index");
Object.defineProperty(exports, "sequelize", { enumerable: true, get: function () { return index_1.sequelize; } });
const path_1 = __importDefault(require("path")); // Import the 'path' module
const swagger_1 = require("./swagger"); // Swagger konfigürasyonunu içe aktarın
const index_2 = __importDefault(require("./routes/index")); // Route'ları içe aktarın
const app = (0, express_1.default)();
exports.app = app;
dotenv_1.default.config();
app.use(express_1.default.json());
// Route'ları ekleyin
app.use(index_2.default);
// Swagger'ı kurun
(0, swagger_1.setupSwagger)(app);
const pathToSwaggerUi = path_1.default.join(__dirname, 'swagger-ui'); // Define the 'pathToSwaggerUi' variable
app.use(express_1.default.static(pathToSwaggerUi));
const PORT = parseInt(process.env.PORT || '3000', 10);
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
};
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)(corsOptions));
app.use(index_2.default);
// Nodemailer setup
const transporter = nodemailer_1.default.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER,
        subject: 'Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };
    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            return res.status(500).json({ error: 'Failed to send email' });
        }
        else {
            return res.status(200).json({ success: 'Message sent successfully!' });
        }
    });
});
index_1.sequelize.sync().then(() => {
    app.listen(PORT);
});
//# sourceMappingURL=server.js.map
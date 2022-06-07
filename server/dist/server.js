"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({
    debug: true,
    override: true,
    path: path_1.default.resolve(__dirname, '../.env'),
});
const App = (0, express_1.default)();
App.set('PORT', process.env.PORT || 3000);
// Middlewares
App.use(express_1.default.json());
App.use(express_1.default.urlencoded({ extended: true }));
App.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello, World! ' });
});
App.listen(App.get('PORT'), () => {
    console.log('Server listen on port ' + App.get('PORT'));
});
//# sourceMappingURL=server.js.map
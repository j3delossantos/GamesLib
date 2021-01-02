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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class GamesController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('SELECT * FROM games', function (err, result, fields) {
                if (err)
                    throw err;
                res.json(result);
            });
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // res.json({text: 'This is the game  id: '+ req.params.id});
            const id = req.params.id;
            yield database_1.default.query('Select * from games where id = ?', [id], function (err, result, fields) {
                if (err) {
                    throw err;
                }
                if (result.length > 0) {
                    res.json(result[0]);
                }
                else {
                    res.status(404).json({ text: "Game not found" });
                }
                //res.json({text:'Game Found'})
                //res.json({message: 'Game Saved'});
            });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO games set ?', [req.body], function (err, result, fields) {
                if (err)
                    throw err;
                res.json(result);
                //res.json({message: 'Game Saved'});
            });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //res.json({text: 'Updating the game id: '+ req.params.id});
            const id = req.params.id;
            yield database_1.default.query('UPDATE games set ? WHERE id =?', [req.body, id], function (err, result, fields) {
                if (err) {
                    throw (err);
                }
                else {
                    res.json({ text: "The game was updated" });
                }
            });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield database_1.default.query('delete from games where id = ?', [id], function (err, result, fields) {
                if (err) {
                    res.status(404).json({ text: "Game not found" });
                    throw err;
                }
                else {
                    res.json({ text: "The game was deleted" });
                }
                //res.json({text:'Game Found'})
                //res.json({message: 'Game Saved'});
            });
        });
    }
}
const gamesController = new GamesController();
exports.default = gamesController;

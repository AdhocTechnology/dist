"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportCsvService = void 0;
const common_1 = require("@nestjs/common");
const fastcsv = require("fast-csv");
const fs = require("fs");
const moment = require("moment");
let ExportCsvService = class ExportCsvService {
    constructor() { }
    async createCurrentCSV(cameraData) {
        const postfix = moment(new Date()).format('DD-MM-YYYY');
        const fileName = `allCameraData_${postfix}.csv`;
        const ws = fs.createWriteStream("exportCSVFile/current/" + fileName);
        const jsonData = cameraData.map(camera => {
            return {
                ipCamera: camera.ipCamera,
                username: camera.username,
                password: camera.password,
                warrantyExp: camera.warrantyExp,
                model: camera.model,
                manufacturer: camera.manufacturer,
                serialNumber: camera.serialNumber + '\n',
                hardwareId: camera.hardwareId,
                firmwareVersion: camera.firmwareVersion,
                port: camera.port,
                status: camera.status,
                responseTime: moment(camera.responseTime, 'YYYY-MM-DD HH:mm:ss'),
                createAt: moment(camera.createAt, 'YYYY-MM-DD HH:mm:ss'),
            };
        });
        if (!fs.existsSync('/exportCSVFile/current') || !fs.existsSync('/exportCSVFile/history')) {
            if (!fs.existsSync('/exportCSVFile')) {
                fs.mkdirSync("/exportCSVFile");
            }
            if (!fs.existsSync('/exportCSVFile/current')) {
                fs.mkdirSync("/exportCSVFile/current");
            }
            if (!fs.existsSync('/exportCSVFile/history')) {
                fs.mkdirSync("/exportCSVFile/history");
            }
        }
        const writeCSV = await this.writeCSV(jsonData, ws);
        if (writeCSV) {
            return fileName;
        }
        throw new common_1.InternalServerErrorException("Cannot create CSV file.");
    }
    async writeCSV(data, ws) {
        return new Promise((resolve, reject) => {
            let status = false;
            fastcsv
                .write(data, { headers: true, })
                .on("error", reject)
                .on("finish", function () {
                console.log('Write to CSV successfully!');
                status = true;
                resolve(status);
            })
                .pipe(ws);
        });
    }
    async createHistoryCSV(historyCameraData) {
        const historyCamerasCSV = historyCameraData.map(camera => {
            return {
                ipCamera: camera.ipCamera,
                username: camera.username,
                password: camera.password,
                warrantyExp: camera.warrantyExp,
                model: camera.model,
                manufacturer: camera.manufacturer,
                serialNumber: camera.serialNumber + '\n',
                hardwareId: camera.hardwareId,
                firmwareVersion: camera.firmwareVersion,
                port: camera.port,
                status: camera.status,
                responseTime: moment(camera.responseTime).format('YYYY-MM-DD HH:mm:ss'),
                createAt: moment(camera.createAt).format('YYYY-MM-DD HH:mm:ss'),
            };
        });
        let createAt = historyCamerasCSV[0].createAt;
        const result = [];
        historyCamerasCSV.forEach((camera) => {
            if (createAt !== camera.createAt) {
                result.push([]);
                createAt = camera.createAt;
            }
            result.push(camera);
        });
        if (!fs.existsSync('/exportCSVFile/current') || !fs.existsSync('/exportCSVFile/history')) {
            if (!fs.existsSync('/exportCSVFile')) {
                fs.mkdirSync("/exportCSVFile");
            }
            if (!fs.existsSync('/exportCSVFile/current')) {
                fs.mkdirSync("/exportCSVFile/current");
            }
            if (!fs.existsSync('/exportCSVFile/history')) {
                fs.mkdirSync("/exportCSVFile/history");
            }
        }
        const postfix = moment(new Date()).format('DD-MM-YYYY');
        const fileName = `historyCameraData_${postfix}.csv`;
        const ws = fs.createWriteStream("exportCSVFile/history/" + fileName);
        const writeCSV = await this.writeCSV(result, ws);
        if (writeCSV) {
            return fileName;
        }
        throw new common_1.InternalServerErrorException("Cannot create CSV file.");
    }
};
ExportCsvService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ExportCsvService);
exports.ExportCsvService = ExportCsvService;
//# sourceMappingURL=export_csv.service.js.map
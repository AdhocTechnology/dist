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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportCsvController = void 0;
const common_1 = require("@nestjs/common");
const search_date_dto_1 = require("../dto/search-date.dto");
const camera_service_1 = require("../camera/camera.service");
const history_camera_service_1 = require("../history_camera/history_camera.service");
const export_csv_service_1 = require("./export_csv.service");
const fs = require("fs");
const path_1 = require("path");
const typeorm_1 = require("typeorm");
let ExportCsvController = class ExportCsvController {
    constructor(cameraService, exportCsvService, historyCameraService) {
        this.cameraService = cameraService;
        this.exportCsvService = exportCsvService;
        this.historyCameraService = historyCameraService;
    }
    async historyCamera(response, searchDate) {
        try {
            let endDate = new Date(searchDate.endDate);
            endDate.setDate(endDate.getDate() + 1);
            const filter = {
                where: {
                    status: 0,
                    createAt: (0, typeorm_1.Between)(new Date(searchDate.startDate), endDate),
                },
                order: {
                    createAt: "ASC"
                }
            };
            const allHistoryCamera = await this.historyCameraService.getAllHistoryCamera(filter);
            const fileName = await this.exportCsvService.createHistoryCSV(allHistoryCamera);
            const rs = fs.createReadStream("./exportCSVFile/history/" + fileName);
            response.setHeader('Content-Type', 'text/csv');
            response.setHeader("Content-Disposition", "attachment; filename=" + fileName);
            rs.pipe(response);
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
    async currentCamera(response) {
        try {
            const allCamera = await this.cameraService.getAllCamera();
            const fileName = await this.exportCsvService.createCurrentCSV(allCamera);
            const file = fs.createReadStream((0, path_1.join)(process.cwd() + '/exportCSVFile/current', fileName));
            response.set({
                'Content-Type': 'text/csv',
                'Content-Disposition': `'attachment; filename=${fileName}`,
            });
            return new common_1.StreamableFile(file);
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, search_date_dto_1.SearchDateDto]),
    __metadata("design:returntype", Promise)
], ExportCsvController.prototype, "historyCamera", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ExportCsvController.prototype, "currentCamera", null);
ExportCsvController = __decorate([
    (0, common_1.Controller)('exportCSV'),
    __metadata("design:paramtypes", [camera_service_1.CameraService,
        export_csv_service_1.ExportCsvService,
        history_camera_service_1.HistoryCameraService])
], ExportCsvController);
exports.ExportCsvController = ExportCsvController;
//# sourceMappingURL=export_csv.controller.js.map
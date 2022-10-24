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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoryCameraService = void 0;
const common_1 = require("@nestjs/common");
const history_camera_entity_1 = require("./history_camera.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
let HistoryCameraService = class HistoryCameraService {
    constructor(historyCameraRepository) {
        this.historyCameraRepository = historyCameraRepository;
    }
    async createHistoryCamera(historyCameraData, timeHr, timeMin) {
        historyCameraData.forEach((camera, i) => {
            try {
                const { id, createAt } = camera, data = __rest(camera, ["id", "createAt"]);
                let newHistoryCamera = new history_camera_entity_1.HistoryCamera();
                newHistoryCamera = data;
                newHistoryCamera.timeHr = timeHr.replace(/^0+/, '');
                newHistoryCamera.timeMin = timeMin.replace(/^0+/, '');
                newHistoryCamera.createAt = new Date();
                this.historyCameraRepository.save(newHistoryCamera);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    async getAllHistoryCamera(filter) {
        const historyCameraData = await this.historyCameraRepository.find(filter);
        if (!historyCameraData || historyCameraData.length == 0) {
            throw new common_1.NotFoundException('History camera data not found!');
        }
        return historyCameraData;
    }
};
HistoryCameraService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(history_camera_entity_1.HistoryCamera)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], HistoryCameraService);
exports.HistoryCameraService = HistoryCameraService;
//# sourceMappingURL=history_camera.service.js.map
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
exports.OnvifService = exports.DEFAULT_TIMEOUT = exports.DEFAULT_PORT = void 0;
const common_1 = require("@nestjs/common");
const onvif_1 = require("onvif");
exports.DEFAULT_PORT = 80;
exports.DEFAULT_TIMEOUT = 1000;
let OnvifService = class OnvifService {
    constructor() {
    }
    async getAllDevicesInfo(body) {
        const devicesInfo = [];
        for (let i = 0; i < body.length; i++) {
            let isReject = false;
            const cam = new onvif_1.Cam({
                hostname: body[i].ipCamera,
                username: body[i].username,
                password: body[i].password,
                port: exports.DEFAULT_PORT,
                timeout: exports.DEFAULT_TIMEOUT
            });
            const camInfo = await new Promise((resolve, reject) => {
                cam.getDeviceInformation(function (error, info) {
                    if (error)
                        isReject = true;
                    resolve(info);
                });
            });
            if (!isReject) {
                camInfo.ipCamera = body[i].ipCamera;
                camInfo.port = exports.DEFAULT_PORT;
                camInfo.serialNumber = camInfo.serialNumber.toString();
                devicesInfo.push(camInfo);
            }
        }
        return devicesInfo;
    }
};
OnvifService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], OnvifService);
exports.OnvifService = OnvifService;
//# sourceMappingURL=onvif.service.js.map
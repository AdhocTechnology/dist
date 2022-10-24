"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const camera_service_1 = require("./camera/camera.service");
const camera_controller_1 = require("./camera/camera.controller");
const export_csv_controller_1 = require("./exportCSV/export_csv.controller");
const export_csv_service_1 = require("./exportCSV/export_csv.service");
const scheduler_controller_1 = require("./scheduler/scheduler.controller");
const scheduler_service_1 = require("./scheduler/scheduler.service");
const config_1 = require("@nestjs/config");
const env_helper_1 = require("./common/helper/env.helper");
const cron_service_1 = require("./cron/cron.service");
const schedule_1 = require("@nestjs/schedule");
const history_camera_service_1 = require("./history_camera/history_camera.service");
const onvif_service_1 = require("./onvif/onvif.service");
const changedCamera_service_1 = require("./changedCamera/changedCamera.service");
const onvif_controller_1 = require("./onvif/onvif.controller");
const camera_entity_1 = require("./camera/camera.entity");
const scheduler_entity_1 = require("./scheduler/scheduler.entity");
const history_camera_entity_1 = require("./history_camera/history_camera.entity");
const changedCamera_entity_1 = require("./changedCamera/changedCamera.entity");
const envFilePath = (0, env_helper_1.getEnvPath)(`${__dirname}/common/envs`);
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ envFilePath, isGlobal: true, }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: '',
                database: 'onvif_db',
                autoLoadEntities: true,
                synchronize: true,
            }),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            typeorm_1.TypeOrmModule.forFeature([camera_entity_1.Camera, scheduler_entity_1.Scheduler, history_camera_entity_1.HistoryCamera, changedCamera_entity_1.ChangedCamera]),
            schedule_1.ScheduleModule.forRoot()
        ],
        controllers: [
            app_controller_1.AppController, camera_controller_1.CameraController,
            scheduler_controller_1.SchedulerController,
            onvif_controller_1.OnvifController, export_csv_controller_1.ExportCsvController
        ],
        providers: [
            app_service_1.AppService, camera_service_1.CameraService,
            scheduler_service_1.SchedulerService,
            cron_service_1.CronService,
            history_camera_service_1.HistoryCameraService,
            onvif_service_1.OnvifService,
            changedCamera_service_1.ChangedCameraService,
            export_csv_service_1.ExportCsvService
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
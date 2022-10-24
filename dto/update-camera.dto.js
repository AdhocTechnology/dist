"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCameraDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_camera_dto_1 = require("./create-camera.dto");
class UpdateCameraDto extends (0, mapped_types_1.PartialType)(create_camera_dto_1.CreateCameraDto) {
}
exports.UpdateCameraDto = UpdateCameraDto;
//# sourceMappingURL=update-camera.dto.js.map
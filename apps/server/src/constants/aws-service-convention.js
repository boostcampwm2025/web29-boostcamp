"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceConfigMapSchema = void 0;
var zod_1 = require("zod");
exports.serviceConfigMapSchema = zod_1.default.object({
    service: zod_1.default.enum(['S3', 'CloudFront', 'EC2', 'VPC']),
    service_task: zod_1.default.string(),
    input_sections: zod_1.default.array(zod_1.default.string()),
    fixed_option: zod_1.default.record(zod_1.default.string(), zod_1.default.string()),
});
var result = exports.serviceConfigMapSchema.parse({});
console.log(result);

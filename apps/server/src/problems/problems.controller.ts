import {
  Controller,
  Post,
  Param,
  Body,
  HttpCode,
  ParseIntPipe,
  Get,
} from '@nestjs/common';
import { SubmitRequestDto } from './dto/submit-request.dto';
import { ProblemsService } from './problems.service';
import { serviceConfigMapSchema } from 'src/constants/aws-service-convention';

@Controller('problems')
export class ProblemsController {
  constructor(private readonly problemsService: ProblemsService) {}

  @Post(':problemId/submit')
  @HttpCode(200)
  submit(
    @Param('problemId', ParseIntPipe) problemId: number,
    @Body() body: SubmitRequestDto,
  ) {
    return this.problemsService.submit(problemId, body);
  }

  @Get(':problemId')
  @HttpCode(200)
  getData(@Param('problemId', ParseIntPipe) problemId: number) {
    console.log(problemId);
    const result = serviceConfigMapSchema.parse({
      service: 'S3',
      service_task: 'bucket-create',
      service_sections: ['blockPublicAccess'],
      fixed_option: { '고정값 영역': '값' },
    });
    return result;
  }
}

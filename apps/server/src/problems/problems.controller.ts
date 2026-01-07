import {
  Controller,
  Post,
  Param,
  Body,
  HttpCode,
  ParseIntPipe,
} from '@nestjs/common';
import { SubmitRequestDto } from './dto/submit-request.dto';
import { ProblemsService } from './problems.service';

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
}

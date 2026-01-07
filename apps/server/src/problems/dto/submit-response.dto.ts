export type FeedbackDto = {
  field: string;
  code: string;
  message: string;
};

export class SubmitResponseDto {
  result: 'PASS' | 'FAIL';
  feedback: FeedbackDto[];
}

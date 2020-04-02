import { Faq } from '@api/api-faqs';
import chunk from 'lodash-es/chunk';

export const questionsColumn = (
  questions: Array<Faq>,
  half: number = 1,
): Array<Faq> => {
  return chunk(questions, questions.length / 2)[half - 1];
};

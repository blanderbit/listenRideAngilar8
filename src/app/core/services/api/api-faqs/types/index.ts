export interface FaqsData {
  faqGroups: Array<FaqGroup>;
  topQuestions: Array<Faq>;
}

export interface FaqGroup {
  id: number;
  slug: string;
  title: string;
  logo?: string;
  description: string;
  faqs: Array<Faq>;
}

export interface Faq {
  question: string;
  answer: string;
}

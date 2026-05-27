export interface ProgramDetailData {
  slug: string;
  title: string;
  kicker: string;
  duration: string;
  difficulty: string;
  audience: string;
  intro: string;
  description: string;
  image: string;
  cta: string;
  features: string[];
  curriculum: {
    week: string;
    title: string;
    description: string;
    topics: string[];
  }[];
  accentColor: string;
  bgDecorative: string;
  cohortDate: string;
}

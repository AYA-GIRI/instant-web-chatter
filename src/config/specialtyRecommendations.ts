export type SpecialtyRole = 'developer' | 'analyst' | 'marketer' | 'designer' | 'tester';

export const specialtyRoleTitles: Record<SpecialtyRole, string> = {
  developer: 'Разработчик',
  analyst: 'Аналитик',
  marketer: 'Маркетолог',
  designer: 'Дизайнер',
  tester: 'Тестировщик',
};

export const specialtyRecommendations: Record<SpecialtyRole, string[]> = {
  developer: ['prompting', 'ai-for-developers'],
  analyst: ['ml-basics', 'ai-for-analysts'],
  marketer: ['prompting', 'ai-for-marketers'],
  designer: ['neural-networks', 'ai-for-designers'],
  tester: ['prompting', 'ai-for-testers'],
};


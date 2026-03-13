export type SpecialtyRole = 'developer' | 'analyst' | 'marketer' | 'designer' | 'tester';

export const specialtyRoleTitles: Record<SpecialtyRole, string> = {
  developer: 'Разработчик',
  analyst: 'Аналитик',
  marketer: 'Маркетолог',
  designer: 'Дизайнер',
  tester: 'Тестировщик',
};

export const specialtyRecommendations: Record<SpecialtyRole, string[]> = {
  developer: ['prompting'],
  analyst: ['ml-basics'],
  marketer: ['prompting'],
  designer: ['neural-networks'],
  tester: ['prompting'],
};


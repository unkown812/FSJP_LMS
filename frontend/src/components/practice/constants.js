export const DIFFICULTY_VARIANTS = {
  Easy: 'success',
  Medium: 'warning',
  Hard: 'danger',
};

export const difficultyVariant = (difficulty) =>
  DIFFICULTY_VARIANTS[difficulty] || 'neutral';

export default DIFFICULTY_VARIANTS;

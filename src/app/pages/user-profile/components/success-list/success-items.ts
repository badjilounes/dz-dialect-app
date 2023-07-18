import { SuccessItem } from './success-list.component';

export const SUCCESS_ITEMS: SuccessItem[] = [
  {
    title: 'Tout feu tout flamme',
    image: 'assets/svg/success/on-fire.svg',
    description: 'Réaliser une série de 3 jours',
    progress: {
      value: 1,
      max: 3,
    },
  },
  {
    title: 'Puits de science',
    image: 'assets/svg/success/sage.svg',
    description: 'Gagner 100 XP',
    progress: {
      value: 13,
      max: 100,
    },
  },
  {
    title: 'Spécialiste',
    image: 'assets/svg/success/specialist.svg',
    description: 'Apprendre 50 nouveaux mots dans un cours',
    progress: {
      value: 7,
      max: 50,
    },
  },

  {
    title: 'Sans faute',
    image: 'assets/svg/success/sans-faute.svg',
    description: 'Terminer une leçon sans faire une seule faute',
    progress: {
      value: 0,
      max: 1,
    },
  },

  {
    title: 'Week-end studieux',
    image: 'assets/svg/success/week-end.svg',
    description: 'Terminer une leçon le samedi et le dimanche',
    progress: {
      value: 1,
      max: 2,
    },
  },
];

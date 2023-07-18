import { StatisticItem } from './statistic-list.component';

export const STATISTIC_ITEMS: StatisticItem[] = [
  {
    value: 0,
    image: {
      active: 'assets/svg/fire.svg',
      inactive: 'assets/svg/fire-inactive.svg',
    },
    description: "Jour d'activité",
  },
  {
    value: 13,
    image: {
      active: 'assets/svg/flash.svg',
      inactive: 'assets/svg/flash-inactive.svg',
    },
    description: 'XP gagnés',
  },
];

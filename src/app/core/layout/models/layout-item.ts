export type LayoutLink = {
  type: 'link';
  label: string;
  link: string;
  icon?: string;
  class?: string;
};

export type LayoutHeading = {
  type: 'heading';
  label: string;
  icon?: string;
  links: LayoutLink[];
};

export type LayoutItem = LayoutLink | LayoutHeading;

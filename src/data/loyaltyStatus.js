export const LOYALTY_STATUSES = {
  YES: 'yes',
  NO: 'no',
  UNKNOWN: 'unknown',
};

export const LOYALTY_CONFIG = {
  [LOYALTY_STATUSES.YES]: { label: 'Má' },
  [LOYALTY_STATUSES.NO]: { label: 'Nemá' },
  [LOYALTY_STATUSES.UNKNOWN]: { label: 'Nevím' },
};

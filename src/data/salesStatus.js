export const SALES_STATUSES = {
  REACHOUT: 'reachout',
  NEGO: 'nego',
  SIGNED: 'signed',
  WON: 'won',
  LOST: 'lost',
};

export const STATUS_CONFIG = {
  [SALES_STATUSES.REACHOUT]: { label: 'Reachout', color: '#94a3b8' }, // slate-400
  [SALES_STATUSES.NEGO]: { label: 'Nego', color: '#3b82f6' }, // blue-500
  [SALES_STATUSES.SIGNED]: { label: 'Signed', color: '#eab308' }, // yellow-500
  [SALES_STATUSES.WON]: { label: 'Won', color: '#22c55e' }, // green-500
  [SALES_STATUSES.LOST]: { label: 'Lost', color: '#ef4444' }, // red-500
};

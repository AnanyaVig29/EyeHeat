export function formatNumber(value = 0) {
  return new Intl.NumberFormat('en-US').format(Math.round(value));
}

export function formatPercent(value = 0) {
  return `${Number(value || 0).toFixed(1)}%`;
}

export function formatDuration(ms = 0) {
  if (!ms) return '0s';
  const totalSeconds = Math.max(0, Math.round(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  if (!minutes) return `${seconds}s`;
  return `${minutes}m ${seconds}s`;
}

export interface LogItem {
  message: string;
  level: 'error' | 'warn' | 'info';
  createAt: string;
}
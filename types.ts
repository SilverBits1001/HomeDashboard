export interface Chore {
  id: string;
  title: string;
  assignee: string;
  dueDate: string; // ISO date string
  completed: boolean;
  avatar: string;
}

export interface ShoppingItem {
  id: string;
  name: string;
  checked: boolean;
  category: 'Food' | 'Household' | 'Tech' | 'Other';
}

export type DeviceType = 'light' | 'lock' | 'thermostat' | 'sensor' | 'camera' | 'vacuum';

export interface SmartDevice {
  id: string;
  name: string;
  type: DeviceType;
  isOn: boolean;
  value?: number; // For thermostat temp or dimmer
  unit?: string;
  batteryLevel?: number;
  room: string;
  // AC Specifics
  mode?: 'off' | 'fan' | 'cool';
  fanSpeed?: 'auto' | 'low' | 'high';
  // Vacuum Specifics
  currentTask?: string;
}

export interface Package {
  id: string;
  trackingNumber: string;
  carrier: string;
  status: 'In Transit' | 'Out for Delivery' | 'Delivered' | 'Pending';
  description: string;
  estimatedArrival: string;
}

export interface WeatherData {
  temp: number;
  condition: 'Sunny' | 'Cloudy' | 'Rainy' | 'Stormy' | 'Snowy';
  humidity: number;
  windSpeed: number;
  forecast: Array<{ day: string; temp: number; icon: string }>;
}

export interface CalendarEvent {
  id: string;
  title: string;
  startTime: string; // HH:mm format for simplicity
  endTime: string;
  isCurrent: boolean;
}

export interface Briefing {
  text: string;
  generatedAt: number;
}

export enum AppView {
  DASHBOARD = 'DASHBOARD',
  CHORES = 'CHORES',
  SHOPPING = 'SHOPPING', // Legacy, now combined in CHORES
  CALENDAR = 'CALENDAR',
  E_INK = 'E_INK',
}
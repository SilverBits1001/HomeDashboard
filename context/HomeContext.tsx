import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Chore, ShoppingItem, SmartDevice, Package, WeatherData, CalendarEvent } from '../types';

interface HomeContextType {
  chores: Chore[];
  shoppingList: ShoppingItem[];
  devices: SmartDevice[];
  packages: Package[];
  weather: WeatherData;
  events: CalendarEvent[];
  note: string;
  isScreensaver: boolean;
  setScreensaver: (active: boolean) => void;
  setNote: (note: string) => void;
  toggleDevice: (id: string) => void;
  setDeviceValue: (id: string, value: number) => void;
  setDeviceMode: (id: string, mode: 'off' | 'fan' | 'cool') => void;
  setDeviceFanSpeed: (id: string, speed: 'auto' | 'low' | 'high') => void;
  setDeviceTask: (id: string, task: string) => void;
  toggleChore: (id: string) => void;
  addChore: (title: string, assignee?: string) => void;
  toggleShoppingItem: (id: string) => void;
  addShoppingItem: (name: string) => void;
  refreshData: () => void;
}

const HomeContext = createContext<HomeContextType | undefined>(undefined);

// Updated Mock Data based on user request
const INITIAL_DEVICES: SmartDevice[] = [
  { id: 'dev_1', name: 'Living Room Lights', type: 'light', isOn: true, room: 'Living Room' },
  { id: 'dev_2', name: 'Bedroom Lights', type: 'light', isOn: false, room: 'Bedroom' },
  { 
    id: 'dev_ac', 
    name: 'Air Conditioner', 
    type: 'thermostat', 
    isOn: true, 
    value: 72, 
    unit: '°F', 
    room: 'Living Room',
    mode: 'cool',
    fanSpeed: 'auto'
  },
  { 
    id: 'dev_vac', 
    name: 'WALL-E', 
    type: 'vacuum', 
    isOn: false, 
    batteryLevel: 100, 
    room: 'Living Room',
    currentTask: 'Docked'
  },
];

const INITIAL_CHORES: Chore[] = [
  { id: 'c1', title: 'Take out trash', assignee: 'Alex', dueDate: new Date().toISOString(), completed: false, avatar: 'https://picsum.photos/seed/alex/40/40' },
  { id: 'c2', title: 'Water plants', assignee: 'Sam', dueDate: new Date().toISOString(), completed: false, avatar: 'https://picsum.photos/seed/sam/40/40' },
  { id: 'c3', title: 'Empty dishwasher', assignee: 'Alex', dueDate: new Date().toISOString(), completed: true, avatar: 'https://picsum.photos/seed/alex/40/40' },
];

const INITIAL_SHOPPING: ShoppingItem[] = [
  { id: 's1', name: 'Milk', checked: false, category: 'Food' },
  { id: 's2', name: 'AA Batteries', checked: false, category: 'Household' },
  { id: 's3', name: 'Bread', checked: true, category: 'Food' },
];

const INITIAL_PACKAGES: Package[] = [
  { id: 'p1', trackingNumber: '1Z999...', carrier: 'UPS', status: 'Out for Delivery', description: 'New Headphones', estimatedArrival: 'Today' },
  { id: 'p2', trackingNumber: 'TBA...', carrier: 'Amazon', status: 'In Transit', description: 'Coffee Filters', estimatedArrival: 'Tomorrow' },
];

const INITIAL_WEATHER: WeatherData = {
  temp: 68,
  condition: 'Cloudy',
  humidity: 45,
  windSpeed: 12,
  forecast: [
    { day: 'Tue', temp: 70, icon: '☀️' },
    { day: 'Wed', temp: 65, icon: '🌧️' },
    { day: 'Thu', temp: 62, icon: '⛅' },
  ]
};

const INITIAL_EVENTS: CalendarEvent[] = [
    { id: 'e1', title: 'Team Standup', startTime: '09:00 AM', endTime: '09:30 AM', isCurrent: false },
    { id: 'e2', title: 'Lunch with Sarah', startTime: '12:30 PM', endTime: '01:30 PM', isCurrent: true },
    { id: 'e3', title: 'Dentist Appointment', startTime: '04:00 PM', endTime: '05:00 PM', isCurrent: false },
    { id: 'e4', title: 'Gym Session', startTime: '06:00 PM', endTime: '07:30 PM', isCurrent: false },
];

export const HomeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [chores, setChores] = useState<Chore[]>(INITIAL_CHORES);
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>(INITIAL_SHOPPING);
  const [devices, setDevices] = useState<SmartDevice[]>(INITIAL_DEVICES);
  const [packages, setPackages] = useState<Package[]>(INITIAL_PACKAGES);
  const [weather, setWeather] = useState<WeatherData>(INITIAL_WEATHER);
  const [events, setEvents] = useState<CalendarEvent[]>(INITIAL_EVENTS);
  const [note, setNote] = useState<string>("Don't forget to defrost the chicken!");
  const [isScreensaver, setScreensaver] = useState(false);

  // Simulation of "Automations" / Live Updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate slight temperature fluctuation
      setWeather(prev => ({
        ...prev,
        temp: Math.round((prev.temp + (Math.random() * 2 - 1)) * 10) / 10
      }));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const toggleDevice = (id: string) => {
    setDevices(prev => prev.map(d => d.id === id ? { ...d, isOn: !d.isOn } : d));
  };

  const setDeviceValue = (id: string, value: number) => {
    setDevices(prev => prev.map(d => d.id === id ? { ...d, value } : d));
  };

  const setDeviceMode = (id: string, mode: 'off' | 'fan' | 'cool') => {
    setDevices(prev => prev.map(d => d.id === id ? { ...d, mode } : d));
  };

  const setDeviceFanSpeed = (id: string, fanSpeed: 'auto' | 'low' | 'high') => {
    setDevices(prev => prev.map(d => d.id === id ? { ...d, fanSpeed } : d));
  };

  const setDeviceTask = (id: string, task: string) => {
    setDevices(prev => prev.map(d => d.id === id ? { ...d, currentTask: task } : d));
  };

  const toggleChore = (id: string) => {
    setChores(prev => prev.map(c => c.id === id ? { ...c, completed: !c.completed } : c));
  };

  const addChore = (title: string, assignee = 'Unassigned') => {
    const newChore: Chore = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      assignee,
      dueDate: new Date().toISOString(),
      completed: false,
      avatar: `https://picsum.photos/seed/${assignee}/40/40`
    };
    setChores(prev => [newChore, ...prev]);
  };

  const toggleShoppingItem = (id: string) => {
    setShoppingList(prev => prev.map(i => i.id === id ? { ...i, checked: !i.checked } : i));
  };

  const addShoppingItem = (name: string) => {
    const newItem: ShoppingItem = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      checked: false,
      category: 'Other'
    };
    setShoppingList(prev => [newItem, ...prev]);
  };

  const refreshData = () => {
    console.log("Refreshing data...");
  };

  return (
    <HomeContext.Provider value={{
      chores,
      shoppingList,
      devices,
      packages,
      weather,
      events,
      note,
      isScreensaver,
      setScreensaver,
      setNote,
      toggleDevice,
      setDeviceValue,
      setDeviceMode,
      setDeviceFanSpeed,
      setDeviceTask,
      toggleChore,
      addChore,
      toggleShoppingItem,
      addShoppingItem,
      refreshData
    }}>
      {children}
    </HomeContext.Provider>
  );
};

export const useHome = () => {
  const context = useContext(HomeContext);
  if (!context) throw new Error("useHome must be used within HomeProvider");
  return context;
};
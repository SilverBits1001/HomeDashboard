import React, { useState, useEffect } from 'react';
import { HomeProvider } from './context/HomeContext';
import { Layout } from './components/Layout';
import { DashboardView } from './views/DashboardView';
import { CalendarView } from './views/CalendarView';
import { EInkView } from './views/EInkView';
import { AppView } from './types';
import { ChoresWidget } from './components/widgets/ChoresWidget';
import { ShoppingWidget } from './components/widgets/ShoppingWidget';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);

  // Auto-detect Kindle/E-reader User Agent to default to E-Ink view
  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes('kindle') || ua.includes('silk') || ua.includes('ereader')) {
      setCurrentView(AppView.E_INK);
    }
  }, []);

  const renderContent = () => {
    switch (currentView) {
      case AppView.DASHBOARD:
        return <DashboardView />;
      case AppView.CHORES:
        return (
          <div className="h-full grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="border-2 border-black rounded-xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white">
                <ChoresWidget />
             </div>
             <ShoppingWidget />
          </div>
        );
      case AppView.CALENDAR:
        return <CalendarView />;
      case AppView.E_INK:
        return <EInkView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <HomeProvider>
      <Layout currentView={currentView} onChangeView={setCurrentView}>
        {renderContent()}
      </Layout>
    </HomeProvider>
  );
};

export default App;
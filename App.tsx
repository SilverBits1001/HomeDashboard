import React, { useState } from 'react';
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

  const renderContent = () => {
    switch (currentView) {
      case AppView.DASHBOARD:
        return <DashboardView />;
      case AppView.CHORES:
        return (
          <div className="h-full flex flex-col gap-4">
             <div className="flex-1 border-2 border-black rounded-xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white min-h-0">
                <ChoresWidget />
             </div>
             <div className="flex-1 border-2 border-black rounded-xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white min-h-0">
                 <ShoppingWidget />
             </div>
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
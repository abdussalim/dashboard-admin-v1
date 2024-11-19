import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Analytics from './components/Analytics';
import UserTable from './components/UserTable';
import NotificationPanel from './components/NotificationPanel';
import { useDashboard } from './hooks/useDashboard';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { 
    users, 
    analytics, 
    notifications, 
    sidebarOpen,
    actions 
  } = useDashboard();

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar
        isOpen={sidebarOpen}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onToggle={actions.toggleSidebar}
      />
      
      <main className={`transition-all duration-300 ${
        sidebarOpen ? 'ml-64' : 'ml-20'
      }`}>
        <div className="p-8">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <Analytics data={analytics} />
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-6">
              <UserTable
                users={users}
                onStatusChange={actions.updateUserStatus}
                onRoleChange={actions.updateUserRole}
                onDelete={actions.deleteUser}
              />
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <NotificationPanel
                notifications={notifications}
                onMarkAsRead={actions.markNotificationAsRead}
              />
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">Settings</h2>
              <p className="text-slate-600">Settings panel content goes here.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
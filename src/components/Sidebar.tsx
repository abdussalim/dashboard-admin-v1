import React from 'react';
import { LayoutDashboard, Users, Settings, Bell, Menu } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onToggle: () => void;
}

export default function Sidebar({ isOpen, activeTab, onTabChange, onToggle }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'users', icon: Users, label: 'Users' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className={`fixed left-0 top-0 h-full bg-white shadow-lg transition-all duration-300 ${
      isOpen ? 'w-64' : 'w-20'
    }`}>
      <div className="flex items-center justify-between p-4 border-b">
        {isOpen && <h1 className="text-xl font-semibold text-slate-800">Admin</h1>}
        <button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <Menu className="w-6 h-6 text-slate-600" />
        </button>
      </div>
      
      <nav className="p-4">
        {menuItems.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`w-full flex items-center gap-4 p-3 rounded-lg transition-colors ${
              activeTab === id
                ? 'bg-blue-50 text-blue-600'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Icon className="w-6 h-6" />
            {isOpen && <span>{label}</span>}
          </button>
        ))}
      </nav>
    </div>
  );
}
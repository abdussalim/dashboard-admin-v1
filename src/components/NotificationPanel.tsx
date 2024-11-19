import React from 'react';
import { Info, AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react';
import type { Notification } from '../types/dashboard';

interface NotificationPanelProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
}

export default function NotificationPanel({ notifications, onMarkAsRead }: NotificationPanelProps) {
  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'info': return <Info className="w-5 h-5 text-blue-500" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'error': return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-slate-800 mb-6">Notifications</h2>
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex items-start gap-4 p-4 rounded-lg ${
              notification.read ? 'bg-slate-50' : 'bg-blue-50'
            }`}
          >
            {getIcon(notification.type)}
            <div className="flex-1">
              <h3 className="font-medium text-slate-800">{notification.title}</h3>
              <p className="text-sm text-slate-600 mt-1">{notification.message}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-slate-500">
                  {new Date(notification.timestamp).toLocaleString()}
                </span>
                {!notification.read && (
                  <button
                    onClick={() => onMarkAsRead(notification.id)}
                    className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Mark as read
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
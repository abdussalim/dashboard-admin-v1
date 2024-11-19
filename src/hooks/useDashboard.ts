import { useState, useEffect } from 'react';
import type { User, AnalyticsData, Notification } from '../types/dashboard';

const mockUsers: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'admin', status: 'active', lastLogin: '2024-03-10T10:30:00Z' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'editor', status: 'active', lastLogin: '2024-03-09T15:45:00Z' },
  { id: '3', name: 'Mike Johnson', email: 'mike@example.com', role: 'user', status: 'inactive', lastLogin: '2024-03-01T08:20:00Z' },
];

const mockAnalytics: AnalyticsData[] = [
  { name: 'Jan', users: 4000, revenue: 2400, orders: 400 },
  { name: 'Feb', users: 3000, revenue: 1398, orders: 300 },
  { name: 'Mar', users: 2000, revenue: 9800, orders: 200 },
  { name: 'Apr', users: 2780, revenue: 3908, orders: 280 },
  { name: 'May', users: 1890, revenue: 4800, orders: 190 },
  { name: 'Jun', users: 2390, revenue: 3800, orders: 240 },
];

const mockNotifications: Notification[] = [
  { id: '1', title: 'New User Registration', message: 'A new user has registered', type: 'info', timestamp: '2024-03-10T10:30:00Z', read: false },
  { id: '2', title: 'System Update', message: 'System maintenance scheduled', type: 'warning', timestamp: '2024-03-09T15:45:00Z', read: false },
  { id: '3', title: 'Error Alert', message: 'Database connection failed', type: 'error', timestamp: '2024-03-09T12:20:00Z', read: true },
];

export const useDashboard = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [analytics, setAnalytics] = useState<AnalyticsData[]>(mockAnalytics);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const updateUserStatus = (userId: string, status: 'active' | 'inactive') => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status } : user
    ));
  };

  const updateUserRole = (userId: string, role: 'admin' | 'user' | 'editor') => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role } : user
    ));
  };

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(notifications.map(notification =>
      notification.id === notificationId ? { ...notification, read: true } : notification
    ));
  };

  const deleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return {
    users,
    analytics,
    notifications,
    selectedUser,
    sidebarOpen,
    actions: {
      setSelectedUser,
      updateUserStatus,
      updateUserRole,
      markNotificationAsRead,
      deleteUser,
      toggleSidebar,
    },
  };
};
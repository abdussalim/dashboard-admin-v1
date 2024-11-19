import React from 'react';
import { MoreVertical, Check, X } from 'lucide-react';
import type { User } from '../types/dashboard';

interface UserTableProps {
  users: User[];
  onStatusChange: (userId: string, status: 'active' | 'inactive') => void;
  onRoleChange: (userId: string, role: 'admin' | 'user' | 'editor') => void;
  onDelete: (userId: string) => void;
}

export default function UserTable({ users, onStatusChange, onRoleChange, onDelete }: UserTableProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50">
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Email</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Role</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Last Login</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50">
                <td className="px-6 py-4">
                  <div className="font-medium text-slate-800">{user.name}</div>
                </td>
                <td className="px-6 py-4 text-slate-600">{user.email}</td>
                <td className="px-6 py-4">
                  <select
                    value={user.role}
                    onChange={(e) => onRoleChange(user.id, e.target.value as 'admin' | 'user' | 'editor')}
                    className="bg-transparent border-slate-200 rounded-lg text-sm"
                  >
                    <option value="admin">Admin</option>
                    <option value="editor">Editor</option>
                    <option value="user">User</option>
                  </select>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => onStatusChange(user.id, user.status === 'active' ? 'inactive' : 'active')}
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      user.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {user.status === 'active' ? <Check className="w-3 h-3 mr-1" /> : <X className="w-3 h-3 mr-1" />}
                    {user.status}
                  </button>
                </td>
                <td className="px-6 py-4 text-slate-600">
                  {new Date(user.lastLogin).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="relative inline-block text-left">
                    <button
                      onClick={() => onDelete(user.id)}
                      className="text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
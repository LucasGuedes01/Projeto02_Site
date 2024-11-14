import React, { useState, useEffect } from 'react';
import { 
  Users, Sliders, AlertCircle, CheckCircle, Loader2 
} from 'lucide-react';
import { User, SystemConfig } from '../../types/settings';
import { settingsService } from '../../services/settingsService';
import UserManagement from '../../components/dashboard/settings/UserManagement';
import SystemSettings from '../../components/dashboard/settings/SystemSettings';

type SettingsTab = 'users' | 'system';

export default function Settings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('users');
  const [users, setUsers] = useState<User[]>([]);
  const [systemConfig, setSystemConfig] = useState<SystemConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [usersData, sysConfig] = await Promise.all([
        settingsService.getUsers(),
        settingsService.getSystemConfig()
      ]);

      setUsers(usersData);
      setSystemConfig(sysConfig);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar configurações');
      console.error('Error loading settings:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserUpdate = async () => {
    try {
      await loadData();
      setSuccess('Usuários atualizados com sucesso');
      setTimeout(() => setSuccess(null), 3000);
    } catch {
      setError('Erro ao atualizar usuários');
    }
  };

  const handleSystemConfigUpdate = async (config: SystemConfig) => {
    try {
      await settingsService.updateSystemConfig(config);
      setSystemConfig(config);
      setSuccess('Configurações do sistema atualizadas com sucesso');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Erro ao atualizar configurações do sistema');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="border-b border-gray-200">
          <div className="sm:flex sm:items-center p-6">
            <div className="sm:flex-auto">
              <h1 className="text-2xl font-semibold text-gray-900">Configurações</h1>
              <p className="mt-2 text-sm text-gray-700">
                Gerencie usuários e configurações do sistema
              </p>
            </div>
          </div>

          {/* Notifications */}
          {error && (
            <div className="mx-6 mb-4 flex items-center gap-2 text-red-700 bg-red-50 p-4 rounded-lg">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {success && (
            <div className="mx-6 mb-4 flex items-center gap-2 text-green-700 bg-green-50 p-4 rounded-lg">
              <CheckCircle className="h-5 w-5 flex-shrink-0" />
              <p>{success}</p>
            </div>
          )}

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('users')}
                className={`flex items-center gap-2 px-6 py-3 text-sm font-medium ${
                  activeTab === 'users'
                    ? 'border-b-2 border-green-500 text-green-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Users className="h-5 w-5" />
                Usuários
              </button>
              <button
                onClick={() => setActiveTab('system')}
                className={`flex items-center gap-2 px-6 py-3 text-sm font-medium ${
                  activeTab === 'system'
                    ? 'border-b-2 border-green-500 text-green-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Sliders className="h-5 w-5" />
                Sistema
              </button>
            </nav>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'users' && (
            <UserManagement users={users} onUpdate={handleUserUpdate} />
          )}

          {activeTab === 'system' && systemConfig && (
            <SystemSettings
              config={systemConfig}
              onUpdate={handleSystemConfigUpdate}
            />
          )}
        </div>
      </div>
    </div>
  );
}

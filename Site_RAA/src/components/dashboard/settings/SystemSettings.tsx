import React, { useState } from 'react';
import { Save, Loader2 } from 'lucide-react';
import { SystemConfig } from '../../../types/settings';

interface SystemSettingsProps {
  config: SystemConfig;
  onUpdate: (config: SystemConfig) => Promise<void>;
}

export default function SystemSettings({ config, onUpdate }: SystemSettingsProps) {
  const [formData, setFormData] = useState<SystemConfig>(config);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await onUpdate(formData);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Configurações do Sistema
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          Gerencie as configurações gerais do sistema.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Modo de Manutenção
            </label>
            <p className="text-sm text-gray-500">
              Ativa o modo de manutenção no sistema
            </p>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.maintenanceMode}
              onChange={(e) => setFormData({ ...formData, maintenanceMode: e.target.checked })}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Modo Debug
            </label>
            <p className="text-sm text-gray-500">
              Ativa logs detalhados para depuração
            </p>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.debugMode}
              onChange={(e) => setFormData({ ...formData, debugMode: e.target.checked })}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              disabled={isLoading}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tempo de Sessão (minutos)
          </label>
          <input
            type="number"
            value={formData.sessionTimeout}
            onChange={(e) => setFormData({ ...formData, sessionTimeout: parseInt(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            min="5"
            max="1440"
            required
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tentativas Máximas de Login
          </label>
          <input
            type="number"
            value={formData.maxLoginAttempts}
            onChange={(e) => setFormData({ ...formData, maxLoginAttempts: parseInt(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            min="3"
            max="10"
            required
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Expiração de Senha (dias)
          </label>
          <input
            type="number"
            value={formData.passwordExpiryDays}
            onChange={(e) => setFormData({ ...formData, passwordExpiryDays: parseInt(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            min="30"
            max="365"
            required
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Salvando...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Salvar Configurações
            </>
          )}
        </button>
      </div>
    </form>
  );
}
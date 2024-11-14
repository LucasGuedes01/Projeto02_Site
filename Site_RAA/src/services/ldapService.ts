import { Client } from 'ldapjs';
import { promisify } from 'util';

interface LDAPConfig {
  url: string;
  baseDN: string;
  bindDN: string;
  searchFilter: string;
}

const LDAP_CONFIG: LDAPConfig = {
  url: 'ldap://192.168.1.85:389',
  baseDN: 'OU=RAA,DC=adalpha,DC=local',
  bindDN: 'adalpha\\auth',
  searchFilter: '(&(objectClass=user)(objectCategory=person)(sAMAccountName={username}))'
};

class LDAPService {
  async authenticate(username: string, password: string): Promise<boolean> {
    // In development mode, bypass LDAP authentication
    if (import.meta.env.DEV) {
      return username === 'admin' && password === 'r44t12k24';
    }

    const client = new Client({
      url: LDAP_CONFIG.url,
      tlsOptions: {
        rejectUnauthorized: false
      }
    });

    try {
      // Promisify the bind method
      const bindAsync = promisify(client.bind).bind(client);
      
      // First bind with service account
      await bindAsync(LDAP_CONFIG.bindDN, password);

      // Search for user
      const searchFilter = LDAP_CONFIG.searchFilter.replace('{username}', username);
      const searchAsync = promisify(client.search).bind(client);
      
      const { entries } = await new Promise((resolve, reject) => {
        const entries: any[] = [];
        client.search(LDAP_CONFIG.baseDN, {
          scope: 'sub',
          filter: searchFilter
        }, (err, res) => {
          if (err) {
            reject(err);
            return;
          }

          res.on('searchEntry', (entry) => {
            entries.push(entry);
          });

          res.on('error', (err) => {
            reject(err);
          });

          res.on('end', () => {
            resolve({ entries });
          });
        });
      });

      if (entries.length === 0) {
        return false;
      }

      // Try to bind with user credentials
      const userDN = entries[0].objectName;
      await bindAsync(userDN, password);

      return true;
    } catch (error) {
      console.error('LDAP Authentication Error:', error);
      return false;
    } finally {
      // Promisify the unbind method
      const unbindAsync = promisify(client.unbind).bind(client);
      try {
        await unbindAsync();
      } catch (error) {
        console.error('Error unbinding LDAP client:', error);
      }
    }
  }
}

export const ldapService = new LDAPService();
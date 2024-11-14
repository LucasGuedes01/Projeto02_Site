import oracledb from 'oracledb';
import { DatabaseConfig } from '../types/settings';

class OracleService {
  private config: DatabaseConfig | null = null;
  private pool: any = null;

  async initialize(config: DatabaseConfig) {
    try {
      this.config = config;
      
      // Initialize connection pool
      this.pool = await oracledb.createPool({
        user: config.username,
        password: config.password,
        connectString: `${config.host}:${config.port}/${config.serviceName}`,
        poolMin: 2,
        poolMax: 10,
        poolIncrement: 2
      });

      console.log('Oracle connection pool initialized');
    } catch (error) {
      console.error('Error initializing Oracle connection:', error);
      throw error;
    }
  }

  async executeQuery(sql: string, params: any[] = [], options: any = {}) {
    let connection;
    try {
      connection = await this.pool.getConnection();
      const result = await connection.execute(sql, params, {
        outFormat: oracledb.OUT_FORMAT_OBJECT,
        ...options
      });
      
      if (options.autoCommit !== false) {
        await connection.commit();
      }
      
      return result.rows;
    } catch (error) {
      if (connection && options.autoCommit === false) {
        await connection.rollback();
      }
      throw error;
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (error) {
          console.error('Error closing connection:', error);
        }
      }
    }
  }

  async testConnection(config: DatabaseConfig): Promise<boolean> {
    let testPool = null;
    try {
      testPool = await oracledb.createPool({
        user: config.username,
        password: config.password,
        connectString: `${config.host}:${config.port}/${config.serviceName}`,
        poolMin: 1,
        poolMax: 1
      });
      
      const connection = await testPool.getConnection();
      await connection.close();
      return true;
    } catch (error) {
      console.error('Database connection test failed:', error);
      return false;
    } finally {
      if (testPool) {
        try {
          await testPool.close();
        } catch (error) {
          console.error('Error closing test pool:', error);
        }
      }
    }
  }

  async close() {
    if (this.pool) {
      try {
        await this.pool.close();
        this.pool = null;
        console.log('Oracle connection pool closed');
      } catch (error) {
        console.error('Error closing Oracle connection pool:', error);
        throw error;
      }
    }
  }
}

export const oracleService = new OracleService();
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs,
  query,
  orderBy,
  where,
  Timestamp,
  getDoc
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { User, UserFormData, SystemConfig } from '../types/settings';

class SettingsService {
  private readonly usersCollection = 'users';
  private readonly configCollection = 'system_config';

  async getUsers(): Promise<User[]> {
    try {
      const q = query(
        collection(db, this.usersCollection),
        orderBy('name')
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate(),
        lastLogin: doc.data().lastLogin?.toDate()
      } as User));
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  async getUserById(id: string): Promise<User | null> {
    try {
      const docRef = doc(db, this.usersCollection, id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return null;
      }

      return {
        id: docSnap.id,
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt?.toDate(),
        updatedAt: docSnap.data().updatedAt?.toDate(),
        lastLogin: docSnap.data().lastLogin?.toDate()
      } as User;
    } catch (error) {
      console.error('Error fetching user by id:', error);
      throw error;
    }
  }

  async createUser(data: UserFormData): Promise<User> {
    try {
      // Check if username already exists
      const q = query(
        collection(db, this.usersCollection),
        where('username', '==', data.username)
      );
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        throw new Error('Nome de usuário já existe');
      }

      const docRef = await addDoc(collection(db, this.usersCollection), {
        ...data,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });

      return this.getUserById(docRef.id);
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async updateUser(id: string, data: UserFormData): Promise<User> {
    try {
      const docRef = doc(db, this.usersCollection, id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: Timestamp.now()
      });

      return this.getUserById(id);
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  async deleteUser(id: string): Promise<boolean> {
    try {
      await deleteDoc(doc(db, this.usersCollection, id));
      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

  async getSystemConfig(): Promise<SystemConfig> {
    try {
      const q = query(collection(db, this.configCollection));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        // Create default config if it doesn't exist
        const defaultConfig: SystemConfig = {
          maintenanceMode: false,
          debugMode: false,
          sessionTimeout: 30,
          maxLoginAttempts: 5,
          passwordExpiryDays: 90
        };
        
        await addDoc(collection(db, this.configCollection), defaultConfig);
        return defaultConfig;
      }

      return querySnapshot.docs[0].data() as SystemConfig;
    } catch (error) {
      console.error('Error fetching system config:', error);
      throw error;
    }
  }

  async updateSystemConfig(config: SystemConfig): Promise<SystemConfig> {
    try {
      const q = query(collection(db, this.configCollection));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const docRef = doc(db, this.configCollection, querySnapshot.docs[0].id);
        await updateDoc(docRef, {
          ...config,
          updatedAt: Timestamp.now()
        });
      }

      return config;
    } catch (error) {
      console.error('Error updating system config:', error);
      throw error;
    }
  }
}

export const settingsService = new SettingsService();
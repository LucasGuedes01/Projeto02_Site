import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs,
  query,
  orderBy,
  Timestamp,
  getDoc,
  enableNetwork,
  disableNetwork
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { NewsArticle, NewsFormData } from '../types/news';

export class NewsService {
  private readonly collectionName = 'news';
  private isOnline = true;

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('online', this.handleOnline);
      window.addEventListener('offline', this.handleOffline);
    }
  }

  private handleOnline = async () => {
    this.isOnline = true;
    try {
      await enableNetwork(db);
    } catch (error) {
      console.error('Error enabling network:', error);
    }
  };

  private handleOffline = async () => {
    this.isOnline = false;
    try {
      await disableNetwork(db);
    } catch (error) {
      console.error('Error disabling network:', error);
    }
  };

  async getAll(): Promise<NewsArticle[]> {
    try {
      const q = query(
        collection(db, this.collectionName),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().createdAt.toDate().toISOString(),
      } as NewsArticle));
    } catch (error) {
      console.error('Error fetching news:', error);
      if (!this.isOnline) {
        console.log('Operating in offline mode');
      }
      throw error;
    }
  }

  async getById(id: string): Promise<NewsArticle | null> {
    try {
      const docRef = doc(db, this.collectionName, id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return null;
      }

      return {
        id: docSnap.id,
        ...docSnap.data(),
        date: docSnap.data().createdAt.toDate().toISOString(),
      } as NewsArticle;
    } catch (error) {
      console.error('Error fetching news by id:', error);
      throw error;
    }
  }

  async create(data: NewsFormData): Promise<NewsArticle> {
    try {
      const docRef = await addDoc(collection(db, this.collectionName), {
        ...data,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        views: 0
      });

      return {
        id: docRef.id,
        ...data,
        date: new Date().toISOString(),
        views: 0
      };
    } catch (error) {
      console.error('Error creating news:', error);
      throw error;
    }
  }

  async update(id: string, data: NewsFormData): Promise<NewsArticle> {
    try {
      const docRef = doc(db, this.collectionName, id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: Timestamp.now()
      });

      return {
        id,
        ...data,
        date: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error updating news:', error);
      throw error;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await deleteDoc(doc(db, this.collectionName, id));
      return true;
    } catch (error) {
      console.error('Error deleting news:', error);
      throw error;
    }
  }

  async incrementViews(id: string): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const currentViews = docSnap.data().views || 0;
        await updateDoc(docRef, {
          views: currentViews + 1
        });
      }
    } catch (error) {
      console.error('Error incrementing views:', error);
      // Don't throw error for view counts to prevent disrupting user experience
    }
  }

  validateYouTubeUrl(url: string): boolean {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[a-zA-Z0-9_-]{11}$/;
    return youtubeRegex.test(url);
  }

  validateImgurUrl(url: string): boolean {
    const imgurRegex = /^https?:\/\/(\w+\.)?imgur\.com\/[a-zA-Z0-9]{7}(\.[a-zA-Z]{3,4})?$/;
    return imgurRegex.test(url);
  }

  extractYouTubeId(url: string): string {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match?.[2] || '';
  }
}

export const newsService = new NewsService();
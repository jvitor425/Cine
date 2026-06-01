import {
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
} from 'firebase/firestore';
import { firestoreDb } from '../firebase/firebase.config'; 
import type { IUserService, CreateUserData } from '../interfaces/user.interface';
import type { UserType } from '../types/user.type';

const USERS_COLLECTION = 'users';

class UserService implements IUserService {
  async createUser(data: CreateUserData): Promise<UserType> {
    const userData: UserType = {
      id: data.id,
      name: data.name,
      email: data.email,
      createdAt: new Date().toISOString(),
    
    await setDoc(doc(firestoreDb, USERS_COLLECTION, data.id), userData); 
    return userData;
  }

  async getUser(id: string): Promise<UserType | null> {
    const docRef = doc(firestoreDb, USERS_COLLECTION, id); 
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return null;
    return docSnap.data() as UserType;
  }

  async getUserByEmail(email: string): Promise<UserType | null> {
    const q = query(
      collection(firestoreDb, USERS_COLLECTION), 
      where('email', '==', email)
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    return snapshot.docs[0].data() as UserType;
  }

  async updateUser(
    id: string,
    data: Partial<Omit<UserType, 'id' | 'createdAt'>>
  ): Promise<UserType> {
    const docRef = doc(firestoreDb, USERS_COLLECTION, id); 
    const updatedData = { ...data, updatedAt: new Date().toISOString() };
    await updateDoc(docRef, updatedData);
    const updated = await this.getUser(id);
    if (!updated) throw new Error('Usuário não encontrado após atualização');
    return updated;
  }

  async deleteUser(id: string): Promise<void> {
    await deleteDoc(doc(firestoreDb, USERS_COLLECTION, id)); 
  }
}

export const userService = new UserService();

import { create } from "zustand";

export interface Contact {
  uid: string;
  username: string;
  first_name: string;
  last_name: string;
  avatar_url: string;
  is_online: boolean;
}

interface ContactStore {
  contacts: Contact[];
  isLoading: boolean;
  fetchContacts: () => Promise<void>;
  deleteContactsFromState: (uids: string[]) => void;
  syncDeleteContacts: (uids: string[]) => Promise<void>; // Синхронизация с бэкендом
  addContactsToState: (newContacts: Contact[]) => void;
}

export const useContactStore = create<ContactStore>((set) => ({
  contacts: [],
  isLoading: false,

  fetchContacts: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch("/api/contacts");
      if (!response.ok) throw new Error("Ошибка загрузки");
      const data = await response.json();
      const results = Array.isArray(data.results) ? data.results : [];
      set({ contacts: results, isLoading: false });
    } catch (error) {
      set({ contacts: [], isLoading: false });
    }
  },

  // ОБНОВЛЕННЫЙ МЕТОД: удаление каждого выбранного UID через прокси
  syncDeleteContacts: async (uids: string[]) => {
  try {
    const deletePromises = uids.map(uid => 
      fetch(`/api/contacts?uid=${uid}`, { // Твой роут из route.ts
        method: "DELETE",
      }).then(res => {
        if (!res.ok) throw new Error(`Ошибка при удалении ${uid}`);
        return res.json();
      })
    );
    
    await Promise.all(deletePromises);
  } catch (error) {
    console.error("Ошибка удаления на сервере:", error);
  }
},

  deleteContactsFromState: (uids: string[]) =>
    set((state) => ({
      contacts: state.contacts.filter((c) => !uids.includes(c.uid)),
    })),

  addContactsToState: (newContacts: Contact[]) =>
    set((state) => ({
      contacts: [...state.contacts, ...newContacts],
    })),
}));
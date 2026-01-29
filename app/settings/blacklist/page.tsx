"use client";

import React, { useState, useMemo, useCallback } from 'react';
import { UserList } from "@/widgets/UserList/UserList";
import SearchInput from "@/shared/ui/SearchInput/SearchInput";

const DATA = [
  { id: 1, name: "Максим Римм", avatar: { avatar: "https://i.pravatar.cc" } },
  { id: 2, name: "Мадам Грицацуева", avatar: { avatar: "https://i.pravatar.cc" } },
  { id: 3, name: "Киса Воробьянинов", avatar: { avatar: "https://i.pravatar.cc" } },
];

export default function UserListPage() {
  const [users, setUsers] = useState(DATA);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return query 
      ? users.filter((u) => u.name.toLowerCase().includes(query)) 
      : users;
  }, [users, searchQuery]);

  const handleDelete = useCallback((id: string | number) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  }, []);

  return (
    <main className="min-h-screen p-8 flex justify-center">
      <div className="w-full max-w-md flex flex-col gap-5">
        
        
        <div className="rounded-[16px] border border-primary overflow-hidden transition-colors">
          <SearchInput 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            placeholder="Поиск по чёрному списку"
            theme="light"
          />
        </div>

        <div>
          {                                                        }
          <UserList users={filteredUsers} onDelete={handleDelete} />
        </div>
      </div>
    </main>
  );
}
'use client'

import WebApp from "@twa-dev/sdk";
import { useEffect, useState } from "react";
import './styles.css'; // CSS dosyasını import edin

interface UserData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code: string;
  is_premium?: boolean;
}

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    // Sadece client-side'da WebApp'e erişim sağla
    if (typeof window !== 'undefined' && WebApp.initDataUnsafe.user) {
      setUserData(WebApp.initDataUnsafe.user as UserData);
    }
  }, []);  // Yalnızca ilk renderda çalışacak şekilde []

  return (
    <main className="p-4 custom-bg min-h-screen">
      {userData ? (
        <>
          <h1 className="text-2xl font-bold mb-4 text-white">User Data</h1>
          <ul className="text-white">
            <li>ID: {userData.id}</li>
            <li>First Name: {userData.first_name}</li>
            <li>Last Name: {userData.last_name}</li>
            <li>Username: {userData.username}</li>
            <li>Language Code: {userData.language_code}</li>
            <li>Is Premium: {userData.is_premium}</li>
          </ul>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </main>
  );
}

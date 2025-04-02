'use client'
import { useState, useEffect } from "react";
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube, FaUser, FaUserPlus } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { UserInfo } from "@/api/users/routes"; 

export default function Home() {
  const [userInfo, setUserInfo] = useState<any>(null); 
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const accessToken: string | null = localStorage.getItem('accessToken'); 
  
    if (accessToken) {
      UserInfo().then((data) => {
        if (data) {
          setUserInfo(data.data); 
        }
      }).catch((error) => {
        console.error('Failed to fetch user data', error);
      }).finally(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setUserInfo(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-white text-black">
      <main className="flex flex-col items-center justify-center gap-8">
        <Image
          className="mb-6 dark:invert"
          src="/next.svg"
          alt="Logo"
          width={220}
          height={48}
          priority
        />
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center">
          Welcome to the Website of <span className="text-yellow-400">Lê Khánh Đức</span>
        </h1>

        <p className="mt-4 text-lg sm:text-xl text-center max-w-2xl px-4">
          We're glad you're here! Explore the site and feel free to reach out if you have any questions.
        </p>

        {loading ? (
          <p>Loading...</p>
        ) : userInfo ? (
          <div className="flex flex-col items-center">
            <div className="mb-4">
              <Image
                src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrUMQMJVB2hwa1hhszt6zVFkgiAt_qTlmXhhSK6-Q0xS30vNac4ISBvuMbsW9l1Rp7qfs&usqp=CAU"}
                alt="Profile"
                width={100}
                height={100}
                className="rounded-full"
              />
            </div>
            <p className="text-2xl font-semibold">{userInfo.fullName}</p>
            <p className="text-lg text-gray-600">{userInfo.email}</p>

            <div className="mt-4 text-center">
              <p className="text-lg">First Name: {userInfo.firstName}</p>
              <p className="text-lg">Last Name: {userInfo.lastName}</p>
            </div>

            <button 
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded" 
              onClick={handleLogout} 
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-6 mt-6">
            <Link
              className="flex items-center gap-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold py-3 px-6 transition duration-300"
              href="/login"
            >
              <FaUser className="text-white" />
              Login
            </Link>
            <Link
              className="flex items-center gap-2 rounded-full bg-gray-500 hover:bg-gray-600 text-white text-lg font-semibold py-3 px-6 transition duration-300"
              href="/register"
            >
              <FaUserPlus className="text-white" />
              Register
            </Link>
          </div>
        )}
      </main>

      <footer className="flex gap-8 justify-center mt-12 text-sm text-gray-600">
        <Link
          className="flex items-center gap-2 hover:text-blue-600 transition-colors"
          href="https://www.facebook.com/profile.php?id=100028989917543"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebookF className="text-2xl" style={{ color: "#4267B2" }} />
          Facebook
        </Link>
        <a
          className="flex items-center gap-2 hover:text-blue-600 transition-colors"
          href="https://www.tiktok.com/@khanhduc212"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTiktok className="text-2xl" style={{ color: "#010101" }} />
          TikTok
        </a>
        <a
          className="flex items-center gap-2 hover:text-blue-600 transition-colors"
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram className="text-2xl" style={{ color: "#E4405F" }} />
          Instagram
        </a>
        <a
          className="flex items-center gap-2 hover:text-blue-600 transition-colors"
          href="https://www.youtube.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaYoutube className="text-2xl" style={{ color: "#FF0000" }} />
          YouTube
        </a>
      </footer>
    </div>
  );
}

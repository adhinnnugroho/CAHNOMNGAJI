import Image from "next/image";
import { Inter } from "next/font/google";
import AppLayout from "@/Layout/App";
import WelcomeScreen from "@/UI/Welcome";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
      <div>
        <WelcomeScreen />
      </div>
  );
}

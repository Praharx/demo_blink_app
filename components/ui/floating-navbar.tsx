"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { Button } from "./button";
export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { publicKey, disconnect } = useWallet();
  const { setVisible } = useWalletModal();
  const { scrollYProgress } = useScroll();
  const [visible, setDropDownVisible] = useState(true);
  const [dropdownVisible, setDropdownVisible] = useState(false); // New state for dropdown visibility

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      setDropDownVisible(current <= 0.05);
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: 10,
          opacity: visible ? 1 : 0.8,
        }}
        transition={{
          duration: 1,
        }}
        className={cn(
          "flex max-w-fit fixed top-0 inset-x-0 mx-auto border border-white/[0.2] rounded-full bg-black shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2 items-center justify-center space-x-4",
          className
        )}
      >
        <Logo/>
        {navItems.map((navItem: any, idx: number) => (
          <Link
            key={`link=${idx}`}
            href={navItem.link}
            className={cn(
              "relative text-neutral-50 items-center flex space-x-1 hover:text-neutral-300"
            )}
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="hidden sm:block text-sm">{navItem.name}</span>
          </Link>
        ))}
        {publicKey ? (
          <div className="relative">
            <Button
              className="border text-sm font-medium relative border-neutral-200 border-white/[0.2] text-white px-4 py-2 rounded-full"
              onClick={() => setDropdownVisible(!dropdownVisible)} // Toggle dropdown visibility
            >
              <span>{`${publicKey.toString().slice(0, 4)}...${publicKey.toString().slice(-4)}`}</span>
              <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
            </Button>
            {dropdownVisible && ( // Conditionally render the dropdown
              <div className="absolute right-0 mt-2 w-48 bg-black border border-white/[0.2] rounded-md shadow-lg z-50">
                <Button onClick={() => disconnect()} className="w-full text-left px-4 py-2 text-sm text-white hover:bg-neutral-700">Disconnect Wallet</Button>
                <Button onClick={() => setVisible(true)} className="w-full text-left px-4 py-2 text-sm text-white hover:bg-neutral-700">Change Wallet</Button>
                <Button onClick={() => navigator.clipboard.writeText(publicKey.toString())} className="w-full text-left px-4 py-2 text-sm text-white hover:bg-neutral-700">Copy Address</Button>
              </div>
            )}
          </div>
        ) : (
          <WalletMultiButton style={{ border: '1px solid rgba(255, 255, 255, 0.2)', color: 'white', padding: '8px 16px', borderRadius: '9999px' }} />
        )}
        <Button className="border text-sm font-medium relative border-neutral-200 border-white/[0.2] text-white px-4 py-2 rounded-full">
          <span>Login</span>
          <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent  h-px" />
        </Button>
      </motion.div>
    </AnimatePresence>
  );
};

const Logo = () => {
  return (
    <Link href="/" className="flex items-center mr-14 space-x-2">
      <span className="text-white font-bold text-xl">Blinkify</span>
    </Link>
  );
};
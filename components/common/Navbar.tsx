// components/common/Navbar.tsx

import Link from "next/link";
import {
  SignedOut,
  SignedIn,
  SignInButton,
  UserButton,
  SignUpButton,
} from "@clerk/nextjs";

export function Navbar() {
  return (
    <div className="fixed top-0 w-full z-50 bg-background-two min-h-12 px-12 py-4 flex flex-row justify-between text-xl text-white">
      <div className="flex flex-row gap-8 items-center">
        {/* Logo linked to homepage */}
        <Link href="/">
          <p className="font-semibold text-2xl transition-colors hover:text-white/80">
            Orca AI
          </p>
        </Link>

        {/* Navigation links */}
        <div className="flex flex-row gap-4 text-base items-center">
          <Link href="/chat">
            <p className="transition-colors hover:text-white/80">Chat</p>
          </Link>
          <Link href="/about">
            <p className="transition-colors hover:text-white/80">About</p>
          </Link>
          <Link href="/docs">
            <p className="transition-colors hover:text-white/80">Docs</p>
          </Link>
          <Link
            href="https://github.com/unknown7703/orcaai"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="transition-colors hover:text-white/80">Github</p>
          </Link>
        </div>
      </div>
      <div>
        <SignedOut>
          <div className="text-base flex flex-row gap-3">
            <SignInButton mode='modal'>
              <button className="bg-muted px-4 py-[5px] rounded-xl ">Login</button>
            </SignInButton>
            <SignUpButton mode='modal'>
              <button className="bg-primary text-secondary px-4 py-[5px] rounded-xl ">Register</button>
            </SignUpButton>
          </div>
        </SignedOut>
        <SignedIn>
            <UserButton></UserButton>
        </SignedIn>
      </div>
    </div>
  );
}

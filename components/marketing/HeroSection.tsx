import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from 'lucide-react';

export function HeroSection() {
  return (
    <div className="bg-background-two font-family-special flex flex-col gap-16 h-[80vh] w-full rounded-4xl p-4 mt-4">
      <div className=" flex flex-row justify-between items-center pr-20">
        <div className="flex flex-col gap-3 font-thin">
          <h1 className="text-primary text-8xl ">Your Local Expert</h1>
          <h2 className="ml-4 text-2xl font-extralight">
            Get work done directly on your machine | Think . Plan . Deliver
          </h2>
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          <Link href="/">
            <button className="bg-muted text-xl px-6 py-3 rounded-full border-4 border-white/10 flex flex-row gap-3 items-center">Get Started <ArrowUpRight className="w-5"/></button>
          </Link>
          <Link href="/"><p>Join Early Access</p></Link>
        </div>
      </div>

      <div className="relative h-[40vh] w-full mb-6 shadow-lg rounded-xl overflow-hidden">
        <Image
          src="/heroback.jpg"
          alt="Hero visual"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}

import Hero from "@/components/app-shell/Home/Hero";
import SideBar from "@/components/app-shell/SideBar";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <SideBar />
    <div className="min-w-0 pt-16 transition-[padding-left] duration-300 lg:pl-[var(--sidebar-w,18rem)]">
      <div className="p-3 sm:p-5 lg:p-6">
        <Hero />
      </div>
    </div>
    </>
  );
}
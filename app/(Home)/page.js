import Hero from "@/components/Home/Hero";
import SideBar from "@/components/app-shell/SideBar";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <SideBar>
      <Hero />
    </SideBar>
    </>
  );
}
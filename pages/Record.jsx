import Head from "next/head";
import Footer from "@/components/footer";
import Calendar from "@/components/calendar";

export default function Home() {
  return (
    <div>
      <main className="w-full h-[88dvh]">
        <Calendar />
      </main>
      <Footer />
    </div>
  );
}

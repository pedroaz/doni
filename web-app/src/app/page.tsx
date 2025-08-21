import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen text-3xl">
      Döni
      <Button>Click me!</Button>
    </div>
  );
}

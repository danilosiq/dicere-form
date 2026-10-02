import Image from "next/image";

import baloon from "@/core/assets/images/baloon.png";
import lamp from "@/core/assets/images/lamp.png";
import sparkles from "@/core/assets/images/sparkles.png";
import chatBackground from "@/core/assets/images/chat-background-white.png";

const layers = [
  {
    src: baloon,
    className:
      "absolute left-[-3rem] top-24 w-28 animate-hero-float opacity-80 motion-reduce:animate-none md:w-40",
  },
  {
    src: sparkles,
    className:
      "absolute right-8 top-24 w-24 animate-hero-float opacity-70 [animation-delay:-1.5s] motion-reduce:animate-none md:w-36",
  },
  {
    src: lamp,
    className:
      "absolute bottom-28 right-[-1rem] w-24 animate-hero-float opacity-70 [animation-delay:-2.2s] motion-reduce:animate-none md:w-36",
  },
  {
    src: chatBackground,
    className:
      "absolute bottom-12 left-4 w-36 animate-hero-float opacity-60 [animation-delay:-3s] motion-reduce:animate-none md:w-52",
  },
];

export function FloatingBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {layers.map((layer, index) => (
        <Image
          key={index}
          alt=""
          className={layer.className}
          draggable={false}
          src={layer.src}
          quality={100}
        />
      ))}
    </div>
  );
}

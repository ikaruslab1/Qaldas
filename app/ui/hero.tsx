import Prism  from "./bg-animated/Prism";

export default function Hero({ children }: { children: React.ReactNode }) {
    return (
        <>
        

<div className="w-full h-screen relative">
  <Prism/>
   <div
    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-auto w-[99vw] px-4 md:px-32 xl:px-64"
  >
    {children}
  </div>
</div>
</>
    );
}


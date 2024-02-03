import { Button } from "@/components/ui/button";
import Banner from "./components/Banner";

export default function Home() {
  const imgs = [
    "https://img.icons8.com/color/128/nextjs.png",
    "https://img.icons8.com/external-soleicons-solid-amoghdesign/128/external-react-native-soleicons-solid-vol-1-soleicons-solid-amoghdesign.png",
    "https://img.icons8.com/color/128/tailwindcss.png",
    "https://img.icons8.com/color/128/vue-js.png",
    "https://img.icons8.com/doodle/128/svetle.png"
  ]
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-12 bg-slate-100 dark:bg-slate-900  selection:bg-violet-300 text-slate-950 dark:text-slate-100">
      {/* <Navbar/> */}
      {/* <div className=" rounded-full w-full h-[100vw] absolute top-0 bottom-0 right-0 m-auto translate-y-1/2 left-0 -z-0 opacity-65" style={{ background: "rgb(102,0,255)", background: "radial-gradient(circle, rgba(102,0,255,1) 0%, rgba(208,75,255,1) 100%)" }}></div> */}
      <div className={`flex flex-col mt-[8vh]  h-full justify-center items-center z-0`}>
        <div className={`h-fit flex flex-col justify-center gap-4 items-center`}>
          <Banner label={"Label"} text={"Some exciting text"} color={"violet"} className={""} />
          <div className={`flex flex-row justify-center items-center gap-4 `}>
            <h1 className={`md:text-6xl text-3xl font-semibold text-slate-700 `}>
              Hackoders are here for the
            </h1>
            <h1 className={`md:text-6xl text-3xl font-semibold `}>rescueeee</h1>
          </div>
          <p className={" md:w-2/3 w-10/12 py-8 md:text-lg text-sm font-bold break-words text-center"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          <div className=" flex md:flex-row flex-col md:py-6 py-12  gap-6 justify-center items-center">
            <Button>Get Started</Button>
            <Button>View Details</Button>
          </div>
          <div className={`pt-12 flex flex-col gap-2 justify-center items-center text-slate-700`}>
            <p className={` text-xs font-medium text-slate-700 dark:text-slate-300 `}>Some small feature/achievement</p>
            <div className={` flex flex-row justify-center h-full items-center gap-2`}>
              {imgs.map((img, i) => (
                <img key={i} src={img} className=" w-16 h-full opacity-35 hover:opacity-50 transition-all" alt="icon" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

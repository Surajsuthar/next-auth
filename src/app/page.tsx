import { Button } from "@/components/ui/button";
import { Poppins } from "next/font/google";
import { LoginButton } from "@/components/auth/login-button";
import { cn } from "@/lib/utils";
const font = Poppins({
  subsets : ["latin"],
  weight : ["600"]
})

export default function Home() {
  return (
    <main className="flex h-full justify-center items-center flex-col
      bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-sky-800">
        <div className="space-y-6 text-center">
          <h1 className={cn(
            "text-3xl font-semibold text-white drop-shadow-md",
            font.className,
            )}>
            🔐Auth
          </h1>
          <p className="text-xl text-white">
            Simple authentication service
          </p>
          <div>
            <LoginButton>
              <Button variant="secondary" size="lg">
                Sing in
              </Button>
            </LoginButton>
          </div>
        </div>
    </main>
  );
}

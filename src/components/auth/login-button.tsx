"use client"

import { useRouter } from "next/navigation"

interface LoginButtonProps {
    children : React.ReactNode,
    model? : "model" | "redirect",
    aschild? : boolean
}

export const LoginButton = ({
children,
model = "redirect",
aschild
} : LoginButtonProps) => {
    const router = useRouter()
    const onClick = () => {
        router.push("/auth/login")
    }
    return (
        <span onClick={onClick} className=" cursor-pointer">
            {children}
        </span>
    )
}
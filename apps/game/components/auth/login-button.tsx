"use client"

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { LogIn } from "lucide-react"

export function LoginButton() {
  return (
    <Button 
      onClick={() => signIn("huggingface", { callbackUrl: "/" })}
      className="flex items-center gap-2"
    >
      <LogIn className="w-4 h-4" />
      Sign in with Hugging Face
    </Button>
  )
}
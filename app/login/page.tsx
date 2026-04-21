import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Heart } from 'lucide-react'

export const metadata = {
  title: 'Sign In - DonateBridge',
  description: 'Sign in to your DonateBridge account.',
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl p-8 sm:p-12 border border-border/50 shadow-sm">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center font-bold">
            D
          </div>
          <span className="font-bold text-xl text-foreground">DonateBridge</span>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
          <p className="text-foreground/60">Sign in to your account to continue</p>
        </div>

        <form className="space-y-5 mb-6">
          <div>
            <label className="block text-foreground font-semibold mb-2 text-sm">Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 border-2 border-border rounded-xl focus:border-primary focus:outline-none text-foreground"
            />
          </div>

          <div>
            <label className="block text-foreground font-semibold mb-2 text-sm">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 border-2 border-border rounded-xl focus:border-primary focus:outline-none text-foreground"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-2 border-border accent-primary cursor-pointer" />
              <span className="text-foreground/70">Remember me</span>
            </label>
            <Link href="#" className="text-primary hover:text-primary/80 font-medium">
              Forgot password?
            </Link>
          </div>

          <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl h-12 font-semibold mt-2">
            Sign In
          </Button>
        </form>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-foreground/60">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-8">
          <Button variant="outline" className="rounded-xl h-11">
            Google
          </Button>
          <Button variant="outline" className="rounded-xl h-11">
            Facebook
          </Button>
        </div>

        <p className="text-center text-foreground/70 text-sm">
          Don&apos;t have an account?{' '}
          <Link href="#" className="text-primary hover:text-primary/80 font-semibold">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  )
}

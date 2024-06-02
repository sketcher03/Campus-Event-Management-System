import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { Button } from "../ui/button"

const Header = () => {
  return (
    <header className="w-full">
      <div className="wrapper flex items-center justify-between">
        <Link href="/" className="w-36">
          <h1 className="text-2xl font-bold text-slate-900">CEMS</h1>
        </Link>

        <div className="flex w-32 justify-end">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <Button asChild size='lg' className="rounded-xl bg-orange-500 hover:bg-orange-700">
              <Link href="/sign-in">
                Login
              </Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </header>
  )
}

export default Header
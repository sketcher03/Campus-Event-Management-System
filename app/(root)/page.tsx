import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <SignedOut>
        <section className="bg-orange-50 py-40 mt-5">
          <div className="wrapper flex flex-col items-center">
            <h1 className="h1-bold">Welcome to CEMS</h1>
            <p className="p-regular-24">Our Trusted Campus Event Management System</p>
            <Button size="lg" asChild className="button w-fit mt-6 bg-orange-500 hover:bg-orange-700">
              <Link href="/sign-in">
                Explore Now
              </Link>
            </Button>
          </div>
        </section>
      </SignedOut>

      <SignedIn>
        <section className="bg-orange-50 py-40 mt-5">
          <div className="wrapper flex flex-col items-center">
            <h1 className="h1-bold">Your Dashboard</h1>
            <p className="p-regular-24">Under Construction</p>
            <Button size="lg" asChild className="button w-fit mt-6 bg-orange-500 hover:bg-orange-700">
              <Link href="/events">
                View Events
              </Link>
            </Button>
          </div>
        </section>
      </SignedIn>
    </>
  );
}

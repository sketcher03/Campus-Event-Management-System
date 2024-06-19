"use client"

import { EventRegistrationProps } from "@/types"

import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import Link from "next/link";
import Register from "./Register";

const EventRegistration = (props: EventRegistrationProps) => {
    const { user } = useUser();

    const userId = user?.publicMetadata.userId as string;
    const isEventOver = new Date(props.event.endDate) < new Date();

    return (
        <div className="flex gap-2 items-center">
            {
                isEventOver ? (
                    <div>
                        <p className="p-2 text-orange-500 font-semibold text-xl text-center">Registration is Now Closed. <br /> <span className="text-orange-400 font-medium text-base">Stay Tuned for more!</span></p>
                    </div>
                ) : (
                    <div>
                        <SignedOut>
                            <Button asChild className="button rounded-lg" size="lg">
                                <Link className="font-semibold" href="/sign-in">
                                    Login to Register
                                </Link>
                            </Button>
                        </SignedOut>

                        <SignedIn>
                            <Register event={props.event} userId={userId} />
                        </SignedIn>
                    </div>
                )
            }
        </div>
    )
}

export default EventRegistration
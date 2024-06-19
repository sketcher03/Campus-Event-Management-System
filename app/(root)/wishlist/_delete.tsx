'use client'

import { Button } from "@/components/ui/button"
import { removeFromWishlist } from "@/lib/actions/user.actions"
import { AddToWishlistProps } from "@/types"
import { Trash } from "lucide-react"

import { usePathname } from "next/navigation"
import { useTransition } from "react"

const RemoveFromWishlistButton = ({ eventId, userId }: AddToWishlistProps) => {

    const pathname = usePathname()
    let [isPending, startTransition] = useTransition()

    return (
        <div>
            <Button className="bg-transparent hover:bg-transparent text-red-500" onClick={() =>
                startTransition(async () => {
                    await removeFromWishlist({ eventId, userId, path: pathname })
                })
            }><Trash /></Button>
        </div>
    )
}

export default RemoveFromWishlistButton
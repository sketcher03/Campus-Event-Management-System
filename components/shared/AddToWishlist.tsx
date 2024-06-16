'use client'

import { Heart } from "lucide-react"
import { Button } from "../ui/button"
import { usePathname } from "next/navigation"
import { useTransition } from "react"
import { addToWishlist } from "@/lib/actions/user.actions"
import { AddToWishlistProps } from "@/types"

const AddToWishlist = ({ eventId, userId }: AddToWishlistProps) => {
    const pathname = usePathname()
    let [isPending, startTransition] = useTransition()

    return (
        <>
            <Button className="p-2 absolute top-[40px] right-[20px] border-2 border-orange-500 rounded-xl bg-transparent hover:bg-transparent" onClick={() =>
                startTransition(async () => {
                    await addToWishlist({ eventId, userId, path: pathname })
                })
            }>
                <div className="flex flex-row gap-2">
                    <Heart className="text-orange-500" />
                    <p className="text-orange-500">{isPending ? 'Adding...' : 'Add To Wishlist'}</p>
                </div>
            </Button>
        </>
    )
}

export default AddToWishlist
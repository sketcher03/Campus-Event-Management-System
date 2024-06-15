"use client"

import { Button } from "@/components/ui/button";
import { DeleteCategoryProps } from "@/types";
import { categoryDelete } from "./_action";

import { useRouter } from 'next/navigation'
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

export default function DeleteButton(props: DeleteCategoryProps) {
    const router = useRouter();

    const handleDelete = (e: React.FormEvent<HTMLFormElement>) => {
        categoryDelete(props.categoryId);

        e.preventDefault();
        toast({
            variant: "destructive",
            title: "Category Deleted",
            action: <ToastAction altText="Refresh"><Button className="bg-transparent hover:bg-transparent" onClick={() => router.refresh()}>Refresh</Button></ToastAction>
        })
    }

    return (
        <form onSubmit={handleDelete}>
            <input type="hidden" value={props.categoryId} name="id" />
            <Button type="submit" className="bg-transparent text-red-600 hover:bg-transparent">Delete</Button>
        </form>

    );
}

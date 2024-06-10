'use client'

import { useRouter } from 'next/navigation'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from '@/components/ui/button';
import { categoryCreate } from './_action';

const CreateCategoryAlertBox = () => {

    const router = useRouter();

    const [newCategory, setNewCategory] = useState('');

    const handleAddCategory = () => {
        categoryCreate(newCategory);
        router.refresh();
    }

    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger className="" asChild>
                    <Button className="w-fit rounded-xl bg-orange-500 hover:bg-orange-600">Add new category</Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white">
                    <AlertDialogHeader>
                        <AlertDialogTitle>New Category</AlertDialogTitle>
                        <AlertDialogDescription>
                            <Input type="text" placeholder="Category name" className="input-field mt-3" onChange={(e) => setNewCategory(e.target.value)} />
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>

                        <AlertDialogAction onClick={handleAddCategory}>Add</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

export default CreateCategoryAlertBox
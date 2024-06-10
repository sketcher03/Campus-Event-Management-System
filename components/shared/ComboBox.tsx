import { ComboBoxProps } from "@/types"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react"
import { ICategory } from "@/lib/db/models/category.model"
import { getAllCategories } from "@/lib/actions/category.actions"


const ComboBox = ({ onChangeHandler, value }: ComboBoxProps) => {
    const [categories, setCategories] = useState<ICategory[]>([]);

    useEffect(() => {
        const getCategories = async () => {

            const categoryList = await getAllCategories();
            categoryList && setCategories(categoryList as ICategory[]);
        }

        getCategories();
    }, [])

    return (
        <div>
            <Select onValueChange={onChangeHandler} defaultValue={value}>
                <SelectTrigger className="select-field">
                    <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                    {
                        categories.length > 0 && categories.map((category) => (
                            <SelectItem key={category._id} value={category._id} className="select-item p-regular-14">{category.title}</SelectItem>
                        ))
                    }
                </SelectContent>
            </Select>

        </div>
    )
}

export default ComboBox
import { ComboBoxProps } from "@/types"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { getCategories } from "./_action";
import { useEffect, useState } from "react";
import { ICategory } from "@/lib/db/models/category.model";

const ComboBox = ({ onChangeHandler, value }: ComboBoxProps) => {
    const [categories, setCategories] = useState<ICategory[]>([]);

    useEffect(() => {
        const getsCategories = async () => {
            const categoryList = await getCategories() || [];
            console.log(categoryList)

            categoryList && setCategories(categoryList as ICategory[])
        }
        
        getsCategories();

    }, [])
    

    return (
        <div>
            <Select onValueChange={onChangeHandler} defaultValue={value}>
                <SelectTrigger className="select-field text-orange-500">
                    <SelectValue className="placeholder:p-regular-14" placeholder="Choose Category..." />
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
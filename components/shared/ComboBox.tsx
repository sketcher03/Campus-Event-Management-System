import { ComboBoxProps } from "@/types"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import { ICategory } from "@/lib/db/models/category.model"


const ComboBox = ({ onChangeHandler, value }: ComboBoxProps) => {
    const [categories, setCategories] = useState<ICategory[]>([]);

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
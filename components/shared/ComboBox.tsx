import { ComboBoxProps } from "@/types"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { getCategories } from "./_action";

type CategoryType = {
    _id: string,
    title: string
}

const ComboBox = ({ onChangeHandler, value }: ComboBoxProps) => {

    const categoryList = getCategories() || [];

    return (
        <div>
            <Select onValueChange={onChangeHandler} defaultValue={value}>
                <SelectTrigger className="select-field">
                    <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                    {
                        categoryList.length > 0 && categoryList.map((category: CategoryType) => (
                            <SelectItem key={category._id} value={category._id} className="select-item p-regular-14">{category.title}</SelectItem>
                        ))
                    }
                </SelectContent>
            </Select>

        </div>
    )
}

export default ComboBox
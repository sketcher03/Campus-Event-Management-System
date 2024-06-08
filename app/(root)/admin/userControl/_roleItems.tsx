'use client'

import * as React from "react"
import { RoleProps } from "@/types";
import { setRole } from "./_actions";
import { roles } from "@/constants/constant";
import { Command, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";

export function RoleItems(props: RoleProps) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    return (
        <div>
            <span className="text-orange-500" >Assign New Role: </span>
            <div className="my-2">
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-[200px] justify-between"
                        >
                            Select Role...
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                
                    <PopoverContent>
                        <Command>
                            <CommandInput placeholder="Search a Role..." />
                            <CommandList>
                                {roles.map((Item) => {
                                    if (props.role != "banned") {
                                        return (
                                            <CommandItem className="text-orange-700" key={Item.label} value={Item.label} onSelect={(currentValue) => {
                                                setRole(props.id, currentValue)
                                                setOpen(false)
                                            }}>
                                                {Item.description}
                                            </CommandItem>
                                        )
                                    }
                                })}
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
}
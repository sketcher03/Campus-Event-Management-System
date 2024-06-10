"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { EventFormProps } from "@/types"
import { eventFormSchema } from "@/lib/validate"
import * as z from "zod"
import { eventInitialValues } from "@/constants/constant"
import ComboBox from "./ComboBox"

const EventForm = ({ userId, type }: EventFormProps) => {
    
    const initialValues = eventInitialValues;

    // Form Definition
    const form = useForm<z.infer<typeof eventFormSchema>>({
        resolver: zodResolver(eventFormSchema),
        defaultValues: initialValues,
    })

    // Submit handler
    function onSubmit(values: z.infer<typeof eventFormSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
                <div className="flex flex-col gap-5">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Event Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter Title..." {...field} className="input-field"/>
                                </FormControl>
                                <FormDescription>
                                    This Event Title will be unchangeable. 
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="categoryId"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Event Category</FormLabel>
                                <FormControl>
                                    <ComboBox onChangeHandler={field.onChange} value={field.value} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                
                <Button className="bg-orange-500 hover:bg-orange-600 max-w-[400px]" type="submit">Submit</Button>
            </form>
        </Form>
    )
}

export default EventForm

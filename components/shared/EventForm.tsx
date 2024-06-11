"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { EventFormProps } from "@/types"
import { eventFormSchema } from "@/lib/validate"
import * as z from "zod"
import { eventInitialValues } from "@/constants/constant"
import ComboBox from "./ComboBox"
import { Textarea } from "../ui/textarea";
import { useState } from "react"
import Image from "next/image"
import DatePicker from "react-datepicker";
import { useUploadThing } from "@/lib/uploadthing"

import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation"
import { proposeEvent } from "@/lib/actions/event.actions"

import { Calendar, CalendarRange, CircleDollarSign, Link, MapPin, User } from "lucide-react"
import DpUploader from "./DpUploader"
import CoverUploader from "./CoverUploader"


const EventForm = ({ userId, type }: EventFormProps) => {
    const router = useRouter();
    const [dp, setDp] = useState<File[]>([]);
    const [cover, setCover] = useState<File[]>([]);

    const initialValues = eventInitialValues;

    const { startUpload } = useUploadThing('imageUploader');

    // Form Definition
    const form = useForm<z.infer<typeof eventFormSchema>>({
        resolver: zodResolver(eventFormSchema),
        defaultValues: initialValues,
    })

    // Submit handler
    async function onSubmit(values: z.infer<typeof eventFormSchema>) {
        
        const eventValues = values;
        console.log(eventValues, userId);

        let uploadedDpImage = values.dpImage;
        let uploadedCoverImage = values.image;

        if (dp.length > 0) {
            const uploadedImages = await startUpload(dp)

            if (!uploadedImages) {
                return;
            }

            uploadedDpImage = uploadedImages[0].url;
        }

        if (cover.length > 0) {
            const uploadedImages = await startUpload(cover)

            if (!uploadedImages) {
                return;
            }

            uploadedCoverImage = uploadedImages[0].url;
        }

        if (type === "Propose") {
            try {
                const newEvent = await proposeEvent({
                    event: { ...values, dpImage: uploadedDpImage, image: uploadedCoverImage },
                    userId,
                    path: '/profile'
                });

                if (newEvent) {
                    form.reset();
                    router.push(`/event/${newEvent._id}`)
                };
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 items-center">
                <div className="flex flex-col gap-5">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Event Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter Title..." {...field} className="input-field" />
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
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Event Description</FormLabel>
                                <FormControl className="h-72">
                                    <Textarea placeholder="Enter Description..." {...field} className="textarea" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="dpImage"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Event Logo</FormLabel>
                                <FormControl className="h-72">
                                    <DpUploader onFieldChange={field.onChange} image={field.value} setFiles={setDp} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Event Cover Image</FormLabel>
                                <FormControl className="h-72">
                                    <CoverUploader onFieldChange={field.onChange} image={field.value} setFiles={setCover} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex flex-col gap-5">
                        <FormLabel className="mb-[-8px]">Event Venue</FormLabel>
                        <FormField
                            control={form.control}
                            name="venue"
                            render={({ field }) => (
                                <FormItem className="w-full rounded-lg border-[1px] border-orange-200">
                                    <FormControl>
                                        <div className="flex-center h-[45px] w-full overflow-hidden rounded-lg bg-amber-50 px-4 py-2">
                                            <MapPin className="mr-4 h-[24px] w-[24px] text-orange-600"  />
                                            <Input placeholder="Enter Venue Details..." {...field} className="input-field focus-visible:ring-0 border-none" />
                                        </div>

                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormDescription className="mt-[-12px]">
                            Events can be <span className="p-semibold-14">Online</span> or <span className="p-semibold-14">On-site</span> [ Mention the Exact Location ]
                        </FormDescription>
                    </div>
                    <div className="flex flex-col gap-5">
                        <FormLabel className="mb-[-8px]">Event Host</FormLabel>
                        <FormField
                            control={form.control}
                            name="host"
                            render={({ field }) => (
                                <FormItem className="w-full rounded-lg border-[1px] border-orange-200">
                                    <FormControl>
                                        <div className="flex-center h-[45px] w-full overflow-hidden rounded-lg bg-amber-50 px-4 py-2">
                                            <User className="mr-4 h-[24px] w-[24px] text-orange-600" />
                                            <Input placeholder="Enter Host Details..." {...field} className="input-field focus-visible:ring-0 border-none" />
                                        </div>

                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex flex-row gap-5">
                        <div className="flex flex-col gap-5">
                            <FormLabel className="mb-[-8px]">Event Start Date</FormLabel>
                            <FormField
                                control={form.control}
                                name="startDateTime"
                                render={({ field }) => (
                                    <FormItem className="w-full rounded-lg border-[1px] border-orange-200">
                                        <FormControl>
                                            <div className="flex-center h-[45px] w-full overflow-hidden rounded-lg bg-amber-50 px-4 py-2">
                                                <Calendar className="mr-4 h-[42px] w-[42px] text-orange-600" />
                                                <p className="ml-3 whitespace-nowrap text-orange-400 p-regular-14"> Pick Start Date & Time:</p>
                                                <DatePicker
                                                    selected={field.value}
                                                    onChange={(date: Date) => field.onChange(date)}
                                                    showTimeSelect
                                                    timeInputLabel="Time:"
                                                    dateFormat="MM/dd/yyyy h:mm aa"
                                                    wrapperClassName="datePicker"
                                                />
                                            </div>

                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex flex-col gap-5">
                            <FormLabel className="mb-[-8px]">Event End Date</FormLabel>
                            <FormField
                                control={form.control}
                                name="endDateTime"
                                render={({ field }) => (
                                    <FormItem className="w-full rounded-lg border-[1px] border-orange-200">
                                        <FormControl>
                                            <div className="flex-center h-[45px] w-full overflow-hidden rounded-lg bg-amber-50 px-4 py-2">
                                                <CalendarRange className="mr-4 h-[42px] w-[42px] text-orange-600" />
                                                <p className="ml-3 whitespace-nowrap text-orange-400 p-regular-14"> Pick End Date & Time:</p>
                                                <DatePicker
                                                    selected={field.value}
                                                    onChange={(date: Date) => field.onChange(date)}
                                                    showTimeSelect
                                                    timeInputLabel="Time:"
                                                    dateFormat="MM/dd/yyyy h:mm aa"
                                                    wrapperClassName="datePicker"
                                                />
                                            </div>

                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-5">
                        <FormLabel className="mb-[-8px]">Event Fee</FormLabel>
                        
                        <div className="flex flex-row items-center">
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem className="w-[720px] rounded-lg border-[1px] border-orange-200">
                                        <FormControl>
                                            <div className="flex-center h-[45px] overflow-hidden rounded-lg bg-amber-50 px-4 py-2">
                                                <CircleDollarSign className="mr-4 h-[22px] w-[22px] text-orange-600" strokeWidth={2} />

                                                <Input type='number' placeholder="Enter Event Fee..." {...field} className="input-field focus-visible:ring-0 border-none" />
                                            </div>

                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="isFree"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="flex items-center ml-6">
                                                <FormLabel htmlFor="isFree" className="">Free Event</FormLabel>
                                                <Checkbox
                                                    onCheckedChange={field.onChange}
                                                    checked={field.value}
                                                    id="isFree" className="ml-2 h-5 w-5 border-2 border-orange-500 data-[state=checked]:bg-orange-500" />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <FormField
                        control={form.control}
                        name="url"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Event URL</FormLabel>
                                <FormControl>
                                    <div className="flex-center h-[45px] w-full overflow-hidden rounded-lg bg-amber-50 px-4 py-2 border-[1px] border-orange-200">
                                        <Link className="mr-4 h-[22px] w-[22px] text-orange-600" strokeWidth={3} />
                                        <Input placeholder="Enter A Valid URL..." {...field} className="input-field focus-visible:ring-0 border-none" />
                                    </div>
                                </FormControl>
                                <FormDescription>
                                    Any Valid External Link to Other Social Platforms can be included.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Button disabled={form.formState.isSubmitting} className="bg-orange-500 hover:bg-orange-600 w-[400px] h-[50px] mt-4" type="submit">
                    {form.formState.isSubmitting ? (
                        'Submitting...'
                    ) : `${type} Event `}
                </Button>
            </form>
        </Form>
    )
}

export default EventForm

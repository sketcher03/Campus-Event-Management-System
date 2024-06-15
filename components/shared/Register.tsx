'use client'

import { RegisterProps } from "@/types"

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
import { createRegistration } from "@/lib/actions/registration.actions";

const Register = (props: RegisterProps) => {
    const router = useRouter();

    const [newTransactionID, setNewTransactionID] = useState('');

    const handleRegistration = () => {
        createRegistration({
            eventId: props.event._id,
            attendeeId: props.userId,
            fees: props.event.isFree ? "0" : props.event.price,
            transactionId: newTransactionID
        });
        router.refresh();
    }

    return (
        <>
            {
                props.event.isFree ? (
                    <AlertDialog>
                        <AlertDialogTrigger className="" asChild>
                            <Button className="w-fit text-xl p-8 rounded-xl bg-orange-500 hover:bg-orange-600">Register</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-white p-8">
                            <AlertDialogHeader>
                                <AlertDialogTitle className="capitalize text-orange-900">Are you sure you want to register?</AlertDialogTitle>
                                <AlertDialogDescription className="text-orange-400">
                                    Please read the event description and schedule clearly.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction className='bg-orange-500 hover:bg-orange-600' onClick={handleRegistration}>Register</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                ) : (
                    <AlertDialog>
                        <AlertDialogTrigger className="" asChild>
                            <Button className="w-fit text-xl p-8 rounded-xl bg-orange-500 hover:bg-orange-600">Register</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-white p-8">
                            <AlertDialogHeader>
                                <AlertDialogTitle>Enter Bkash Transaction Id</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        <span className="text-orange-400">Please send BDT. { props.event.price } ("Send Money" - Bkash) to 01xxxxxxxxx</span>
                                    <Input type="text" placeholder="Enter Bkash Transaction ID ..." className="input-field mt-3" onChange={(e) => setNewTransactionID(e.target.value)} />
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction className='bg-orange-500 hover:bg-orange-600' onClick={handleRegistration}>Register</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                )
            }
            
        </>
    )
}

export default Register
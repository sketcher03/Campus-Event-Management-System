'use client'

import { useEffect, useRef, useState } from "react"

interface CountdownTimerProps {
    targetDate: string // Format: 'YYYY-MM-DDTHH:mm:ss' - The target date and time for the countdown timer.
    labels: string[]
}

const calculateTimeLeft = (targetDate: Date) => {
    const difference = targetDate.getTime() - new Date().getTime()

    return difference > 0
        ? [
            Math.floor(difference / (1000 * 60 * 60 * 24)), // Days
            Math.floor(difference / (1000 * 60 * 60) % 24), // Hours
            Math.floor(difference / (1000 * 60) % 60), // Minutes
            Math.floor(difference / 1000) % 60 // Seconds
        ]
        :
        [0, 0, 0, 0] // zeros instead of undefined or null
    
}

export const CountdownTimer = ({ targetDate, labels }: CountdownTimerProps) => {

    const [timeLeft, setTimerLeft] = useState(calculateTimeLeft(new Date(targetDate))) // State to hold the time left until the target date.
    const [hasMounted, setHasMounted] = useState(false) // State to track if the component has mounted.
    const prevTimeLeft = useRef(timeLeft)

    useEffect(() => {
        setHasMounted(true) // Set hasMounted to true when the component mounts.

        if (hasMounted) {
            // Update the time left at every second interval.
            const interval = setInterval(() => {
                setTimerLeft(calculateTimeLeft(new Date(targetDate)))
                prevTimeLeft.current = timeLeft
            }, 1000)

            // Clean up the interval when the component unmounts.
            return () => clearInterval(interval)
        }
    }, [targetDate, hasMounted, timeLeft])

    if (!hasMounted) return <div>Loading....</div> // Display a loading message if the component has not yet mounted.

    return (
        <div className="max-w-[500px]">
            <div className="grid grid-cols-4 gap-40">
                {timeLeft.map((num, index) => (
                    <div key={index} className="relative grid grid-cols-1 place-content-center justify-center items-center gap-8">
                        <div className="flex flex-col items-center">
                            <div className="relative overflow-hidden">
                                <span className="text-8xl font-bold text-orange-600 rounded-lg p-[10px]">{String(num).padStart(2, '0')}</span>
                            </div>
                            <p className="capitalize text-xl font-bold text-orange-800">{labels[index]}</p>
                        </div>
                    </div>
                ))}
            </div>
            <p className="text-center text-lg mt-4 font-semibold text-orange-400">Till Event Starts</p>
        </div>
        
    )
}
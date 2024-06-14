import { IEvent } from '@/lib/db/models/event.model'
import { Dispatch, SetStateAction } from 'react'

// ====== USER PARAMS
export type CreateUserParams = {
    clerkId: string
    firstName: string
    lastName: string
    username: string
    email: string
    photo: string
}

export type UpdateUserParams = {
    firstName: string
    lastName: string
    username: string
    photo: string
}

// ====== EVENT PARAMS
export type CreateEventParams = {
    userId: string
    event: {
        title: string
        description: string
        venue: string
        host: string
        dpImage: string
        image: string
        startDateTime: Date
        endDateTime: Date
        categoryId: string
        organizerId: string
        price: string
        isFree: boolean
        url: string
    }
    path: string
}

export type UpdateEventParams = {
    userId: string
    event: {
        _id: string
        title: string
        imageUrl: string
        description: string
        location: string
        startDateTime: Date
        endDateTime: Date
        categoryId: string
        price: string
        isFree: boolean
        url: string
    }
    path: string
}

export type DeleteEventParams = {
    eventId: string
    path: string
}

export type GetAllEventsParams = {
    query: string
    category: string
    limit: number
    page: number
}

export type GetEventsByUserParams = {
    userId: string
    limit?: number
    page: number
}

export type GetRelatedEventsByCategoryParams = {
    categoryId: string
    eventId: string
    limit?: number
    page: number | string
}

export type Event = {
    _id: string
    title: string
    description: string
    price: string
    isFree: boolean
    dpImage: string
    image: string
    location: string
    startDateTime: Date
    endDateTime: Date
    url: string
    organizer: {
        _id: string
        firstName: string
        lastName: string
        username: string,
        photo: string
    }
    category: {
        _id: string
        name: string
    }
}

// ====== CATEGORY PARAMS
export type CreateCategoryParams = {
    title: string
    description: string
}

// ====== ORDER PARAMS
export type CheckoutOrderParams = {
    eventTitle: string
    eventId: string
    price: string
    isFree: boolean
    buyerId: string
}

export type CreateOrderParams = {
    stripeId: string
    eventId: string
    buyerId: string
    totalAmount: string
    createdAt: Date
}

export type GetOrdersByEventParams = {
    eventId: string
    searchString: string
}

export type GetOrdersByUserParams = {
    userId: string | null
    limit?: number
    page: string | number | null
}

// ====== URL QUERY PARAMS
export type UrlQueryParams = {
    params: string
    key: string
    value: string | null
}

export type RemoveUrlQueryParams = {
    params: string
    keysToRemove: string[]
}

export type SearchEventParamProps = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export type BanProps = {
    id: string 
    role: string
}

export type RoleProps = {
    id: string
    role: string
}

export type EventFormProps = {
    userId: string,
    type: "Propose" | "Update" 
}

export type ComboBoxProps = {
    value?: string,
    onChangeHandler?: () => void
}

export type FileUploadProps = {
    onFieldChange: (url: string) => void
    image: string
    setFiles: Dispatch<SetStateAction<File[]>>
}

export type EventCollectionProps = {
    data: IEvent[],
    emptyTitle: string,
    emptyStateSubtext: string,
    limit: number,
    page: number | string,
    totalPages?: number,
    urlParamName?: string,
    collectionType?: 'AllEvents' | 'Organized' | 'Registered' 
}

export type EventCardProps = {
    event: IEvent,
    hidePrice?: boolean
}

export type EventRegistrationProps = {
    event: IEvent,
}

export type RegisterProps = {
    event: IEvent,
    userId: string 
}
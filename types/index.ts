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

export type GetUserByIdParams = {
    clerkId: string
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
        startDate: Date
        endDate: Date
        categoryId: string
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
        description: string
        venue: string
        host: string
        dpImage: string
        image: string
        startDate: Date
        endDate: Date
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

export type ApproveEventParams = {
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

export type CreateRegistrationParams = {
    eventId: string
    attendeeId: string
    createdAt?: Date
    fees?: string
    transactionId?: string
}

export type GetRegistrationsByEventParams = {
    eventId: string
    searchString: string
}

export type GetRegistrationsByUserParams = {
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
    userId: string
    type: "Propose" | "Update"
    event?: IEvent
    eventId?: string
}

export type ComboBoxProps = {
    value?: string
    onChangeHandler?: () => void
}

export type DeleteCategoryProps = {
    categoryId: string
}

export type FileUploadProps = {
    onFieldChange: (url: string) => void
    image: string
    setFiles: Dispatch<SetStateAction<File[]>>
}

export type EventCollectionProps = {
    data: IEvent[]
    emptyTitle: string
    emptyStateSubtext: string
    limit: number
    page: number | string
    totalPages?: number
    urlParamName?: string
    collectionType?: 'AllEvents' | 'Organized' | 'Registered' 
}

export type EventCardProps = {
    event: IEvent
    hidePrice?: boolean
}

export type EventRegistrationProps = {
    event: IEvent
}

export type DisqusSectionProps = {
    event: IEvent
}

export type RegisterProps = {
    event: IEvent
    userId: string 
}

export type UpdateEventProps = {
    params: { id: string }
}

export type AdminEventProps = {
    eventId: string
}

export type AddToWishlistParams = {
    eventId: string
    userId: string
    path: string
}

export type AddToWishlistProps = {
    eventId: string
    userId: string
}

export type CreateReviewParams = {
    userId: string
    eventId: string
    rating: number
    review: string
}
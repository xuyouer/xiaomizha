import type {PageParams} from "@/types"

export interface UserFeedbackRecord {
    id?: number
    userId?: number
    type?: number
    content?: string
    contactInfo?: string | null
    status?: number
    reply?: string | null
    createdAt?: string
    updatedAt?: string
}

export interface FeedbackListParams extends PageParams {
}
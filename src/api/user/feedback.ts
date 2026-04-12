import request from '@/utils/request'
import type {PageResult} from "@/types"

/**
 * 根据用户ID查询单个用户的反馈
 */
export function getUserFeedbacks(userId: number) {
    return request.get<PageResult<Record<string, unknown>>>(`/api/users/${userId}/feedbacks`)
}
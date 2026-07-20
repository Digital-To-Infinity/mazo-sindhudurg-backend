interface PaginationQuery {
  page?: string | number
  limit?: string | number
  [key: string]: unknown
}

export function parsePagination(query: PaginationQuery, defaults = { page: 1, limit: 12 }) {
  const page = Math.max(1, Number(query.page) || defaults.page)
  const limit = Math.min(100, Math.max(1, Number(query.limit) || defaults.limit))
  return { page, limit, skip: (page - 1) * limit }
}

export function buildMeta(total: number, page: number, limit: number) {
  return {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    hasNext: page * limit < total,
    hasPrev: page > 1,
  }
}

export function buildPagination(pagination: { page?: number; limit?: number }) {
  const page = pagination.page ?? 1;
  const limit = pagination.limit ?? 10;
  const skip = (page - 1) * limit;

  return { page, limit, skip };
}

export function buildPaginationMeta(total: number, page: number, limit: number) {
  return {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

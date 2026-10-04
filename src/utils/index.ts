const limitAndOffsetBuilder = (query) => {
  const DEFAULT_LIMIT = 20;
  const MAX_LIMIT = 100;

  const limit = query?.limit
    ? Math.min(Number(query?.limit) || DEFAULT_LIMIT, MAX_LIMIT)
    : undefined;
  const offset = query?.page && limit ? ((+query?.page || 1) - 1) * limit : undefined;

  return {
    limit,
    offset,
  };
};

export { limitAndOffsetBuilder };

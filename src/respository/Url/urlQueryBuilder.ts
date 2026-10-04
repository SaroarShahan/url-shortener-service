import { limitAndOffsetBuilder } from '../../utils';

const urlQueryBuilder = (query: any = {}) => ({
  where: query.status ? { status: query.status } : {},
  ...limitAndOffsetBuilder(query),
  order:
    query.sortBy && query.orderBy
      ? [[query.sortBy, query.orderBy.toUpperCase()]]
      : [['created_at', 'desc']],
});

export { urlQueryBuilder };

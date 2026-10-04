import { Op } from 'sequelize';

import { limitAndOffsetBuilder } from '../../utils';

const buildRolesQuery = (query: any = {}) => ({
  where: query.search ? { name: { [Op.iLike]: `%${query.search}%` } } : {},
  ...limitAndOffsetBuilder(query),
  order:
    query.sortBy && query.orderBy
      ? [[query.sortBy, query.orderBy.toUpperCase()]]
      : [['id', 'DESC']],
});

export { buildRolesQuery };

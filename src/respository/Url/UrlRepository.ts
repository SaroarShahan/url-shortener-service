import Models from '~/models';
import { urlQueryBuilder } from './urlQueryBuilder';

const { UrlModel } = Models;

class UrlRepository {
  static instance: UrlRepository;

  constructor() {
    if (UrlRepository.instance) return UrlRepository.instance;

    UrlRepository.instance = this;
  }

  async create(data) {
    return UrlModel.create(data);
  }

  async findAndCountAll(options) {
    return UrlModel.findAndCountAll(options);
  }

  async findAndCountAllUrls(query) {
    const options = urlQueryBuilder(query);
    return { ...(await UrlModel.findAndCountAll(options)), limit: options.limit };
  }

  async findByCode(code) {
    return UrlModel.findOne({ where: { code } });
  }

  async update(id, data) {
    const url = await UrlModel.findByPk(id);

    if (!url) return null;

    return url.update(data);
  }

  async deleteByCode(code) {
    const url = await UrlModel.findOne({ where: { code } });

    if (!url) return null;

    return url.destroy();
  }
}

export { UrlRepository };

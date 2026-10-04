import { nanoid } from 'nanoid';

import { UrlRepository } from '~/respository/Url/UrlRepository';

class UrlServices {
  private static _instance: UrlServices;
  urlRepository: UrlRepository;

  private constructor() {
    this.urlRepository = new UrlRepository();
  }

  static getInstance(): UrlServices {
    if (!UrlServices._instance) {
      UrlServices._instance = new UrlServices();
    }

    return UrlServices._instance;
  }

  async getAllUrls(req) {
    const { page } = req.query;
    const { rows, count, limit } = await this.urlRepository.findAndCountAllUrls(req.query);

    return {
      totalCount: count,
      urls: rows,
      page: page ? +page : 1,
      limit: limit ? +limit : count,
      totalPage: limit ? Math.ceil(count / +limit) : 1,
    };
  }

  async getUrl(code) {
    return this.urlRepository.findByCode(code);
  }

  async createUrl(data) {
    const { shortUrlBaseUrl, targetUrl, userId } = data;
    const code = nanoid(13);

    return this.urlRepository.create({
      code,
      shortUrl: `${shortUrlBaseUrl.replace(/\/$/, '')}/${code}`,
      targetUrl,
      userId,
    });
  }

  async deleteUrl(code) {
    return this.urlRepository.deleteByCode(code);
  }
}

export { UrlServices };

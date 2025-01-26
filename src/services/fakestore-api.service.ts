import axios from "axios";
import {
  AxiosCacheInstance,
  buildMemoryStorage,
  CacheOptions,
  setupCache,
} from "axios-cache-interceptor";

export class FakestoreApiService {
  private axiosService: AxiosCacheInstance;
  private setupCacheConfig: CacheOptions = {
    storage: buildMemoryStorage(),
  };
  private env = {
    baseUrl: process.env.NEXT_PUBLIC_FAKE_STORE_API_BASE_URL as string,
  };

  constructor() {
    this.axiosService = setupCache(
      axios.create({
        baseURL: this.env.baseUrl,
      }),
      this.setupCacheConfig
    );
  }

  getProducts() {
    return this.axiosService.get("/products", {
      cache: {
        ttl: 1000 * 60 * 10,
      },
    });
  }
}

export const fakestoreApiService = new FakestoreApiService();

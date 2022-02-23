import { createClient, SearchOptions } from 'redis';

export const redisClient = createClient({
  url: process.env.REDIS_CONNECTION_STRING,
});

class DatabaseClient {
  constructor(private readonly client: ReturnType<typeof createClient>) {
    this.client = client;
  }

  async connect() {
    return this.client.connect();
  }

  async close() {
    return this.client.quit();
  }

  async createIndexes(indexes: any[]) {
    try {
      const promises = indexes.map(({ index, schema }) =>
        this.client.ft.create(index, schema),
      );

      await Promise.all(promises);
    } catch (e: any) {
      if (e.message === 'Index already exists') {
        console.log('Index exists already, skipped creation.');
      } else {
        // Something went wrong, perhaps RediSearch isn't installed...
        console.error(e);
      }
    }
  }

  async save<T extends {}>(key: string, value: T): Promise<number> {
    return this.client.hSet(key, value);
  }

  async findAll(index: string, query: string, options?: SearchOptions) {
    return this.client.ft.search(index, query, options);
  }
}

export const databaseClient = new DatabaseClient(redisClient);

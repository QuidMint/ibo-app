import { createClient, SchemaFieldTypes, SearchOptions } from 'redis';

export const redisClient = createClient({
  url: process.env.REDIS_CONNECTION_STRING,
});

class DatabaseClient {
  constructor(private readonly client: ReturnType<typeof createClient>) {
    this.client = client;
  }

  async init() {
    console.log('[Database]: Connecting');
    await this.connect();
    console.log('[Database]: Connected!');

    console.log('[Database]: Creating Indexes');
    await this.createIndexes([
      {
        index: 'idx2:transactions',
        schema: {
          contractAddress: {
            type: SchemaFieldTypes.TAG,
          },
          address: {
            type: SchemaFieldTypes.TAG,
          },
          timestamp: {
            type: SchemaFieldTypes.NUMERIC,
            SORTABLE: true,
          },
        },
      },
    ]);

    console.log('[Database]: Indexes successfuly created!');
  }

  async connect() {
    if (!this.client.isOpen) {
      return this.client.connect();
    }
  }

  async close() {
    console.log('close');

    if (this.client.isOpen) {
      return this.client.disconnect();
    }
  }

  async createIndexes(indexes: any[]) {
    try {
      const promises = indexes.map(({ index, schema }) =>
        this.client.ft.create(index, schema),
      );

      await Promise.all(promises);
    } catch (e: any) {
      if (e.message === 'Index already exists') {
        console.log('[Database]: Index exists already, skipped creation.');
      } else {
        // Something went wrong, perhaps RediSearch isn't installed...
        console.error(e);
      }
    }
  }

  async set(key: string, value: string): Promise<string | null> {
    return this.client.set(key, value);
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async save<T extends {}>(key: string, value: T): Promise<number> {
    return this.client.hSet(key, value);
  }

  async findOne<T>(key: string): Promise<T> {
    return this.client.hGetAll(key) as unknown as T;
  }

  async findAll(index: string, query: string, options?: SearchOptions) {
    return this.client.ft.search(index, query, options);
  }
}

export const databaseClient = new DatabaseClient(redisClient);

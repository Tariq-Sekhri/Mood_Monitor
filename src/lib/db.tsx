import { createClient } from 'redis';

const client = createClient({
    username: 'default',
    password: process.env.REDIS_PW,
    socket: {
        host: process.env.REDIS_HOST!,
        port: parseInt(process.env.REDIS_PORT!),
    }
});

client.on('error', (err) => console.error('Redis Client Error:', err));

let connectionPromise: Promise<void> | null = null;

async function ensureConnection() {
    if (!connectionPromise) {
        connectionPromise = (async () => {
            try {
                if (!client.isOpen) {
                    console.log('Connecting to Redis...');
                    await client.connect();
                    console.log('Connected to Redis successfully!');
                }
            } catch (err) {
                connectionPromise = null;
                console.error('Error connecting to Redis:', err);
                throw err;
            }
        })();
    }
    return connectionPromise;
}

// Wrap the client methods to ensure connection
export const wrappedClient = {
    get: async (key: string) => {
        await ensureConnection();
        return client.get(key);
    },
    set: async (key: string, value: string) => {
        await ensureConnection();
        return client.set(key, value);
    },
    incr: async (key: string) => {
        await ensureConnection();
        return client.incr(key);
    },
    decr: async (key: string) => {
        await ensureConnection();
        return client.decr(key);
    },
    keys: async (pattern: string) => {
        await ensureConnection();
        return client.keys(pattern);
    }
};

export { wrappedClient as client };

async function setupRedis() {
    try {
        console.log('Connecting to Redis...');
        await client.connect();
        console.log('Connected to Redis');

        // Get all keys in the database
        const keys = await client.keys('*');
        console.log('Keys:', keys); // Log the retrieved keys

        // Fetch and log each value associated with the key
        for (const key of keys) {
            const value = await client.get(key);
            console.log(`${key}: ${value}`);
        }
    } catch (err) {
        console.error('Error setting up Redis:', err);
    }
}

export async function getServerSideProps() {
    console.log('getServerSideProps executed'); // Check if this is being triggered
    await setupRedis();

    return {
        props: {
            message: 'Redis setup complete!'
        }
    };
}

const MyPage = ({ message }: { message: string }) => {
    return <div>{message}</div>;
};

export default MyPage;

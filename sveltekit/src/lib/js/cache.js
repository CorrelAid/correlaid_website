import Redis from 'ioredis';
import directus_fetch from '$lib/js/directus_fetch'
import { PUBLIC_REDIS_URL } from '$env/static/public';


const redis = new Redis(PUBLIC_REDIS_URL);

const expirationTime = 60; //second


async function set(key, data) {
    await redis.setex(key, expirationTime, data);
}

async function get_redis(key) {
    return await redis.get(key);
}

async function clear(key) {
    return await redis.del(key);
}

async function get_api(query) {
    try {
        const data = await directus_fetch(query);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}


export async function cache(key,query) {
    let data = await get_redis(key);
    if (data !== null) {
        return JSON.parse(data);
    }
    data = await get_api(query);
    if (data !== null) {
        await set(key, JSON.stringify(data));
        return data;
    }
}
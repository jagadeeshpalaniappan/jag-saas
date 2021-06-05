import LRU from "lru-cache";

const CACHE_MAX_SIZE = 50;
const cache = new LRU(CACHE_MAX_SIZE);

export default cache;

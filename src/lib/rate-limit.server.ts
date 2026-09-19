const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 8;

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

export class RateLimitError extends Error {
  readonly status = 429;
  constructor(message = "تعداد تلاش‌های ورود بیش از حد مجاز است. کمی بعد دوباره تلاش کنید.") {
    super(message);
    this.name = "RateLimitError";
  }
}

export function assertLoginRateLimit(key: string): void {
  const now = Date.now();
  const current = buckets.get(key);
  if (!current || now > current.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return;
  }
  if (current.count >= MAX_ATTEMPTS) {
    throw new RateLimitError();
  }
  current.count += 1;
}

export function resetLoginRateLimit(key: string): void {
  buckets.delete(key);
}

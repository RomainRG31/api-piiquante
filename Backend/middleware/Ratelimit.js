import RateLimit from 'express-rate-limit'

export const loginLimiter = new RateLimit({
    windowMs: 2 * 60 * 1000,
    max: 5
})

export default loginLimiter








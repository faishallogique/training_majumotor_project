import { describe, it, expect } from 'vitest';
import { hashPassword, comparePassword, signJwt, verifyJwt } from './auth';

describe('hashPassword / comparePassword', () => {
  it('hashes password and verifies correctly', async () => {
    const hash = await hashPassword('secret123');
    expect(hash).not.toBe('secret123');
    await expect(comparePassword('secret123', hash)).resolves.toBe(true);
  });

  it('rejects wrong password', async () => {
    const hash = await hashPassword('secret123');
    await expect(comparePassword('wrong', hash)).resolves.toBe(false);
  });
});

describe('signJwt / verifyJwt', () => {
  it('signs and verifies a JWT', async () => {
    const token = await signJwt({ sub: 'user-1' });
    expect(typeof token).toBe('string');
    const payload = await verifyJwt(token);
    expect(payload?.sub).toBe('user-1');
  });

  it('returns null for invalid token', async () => {
    const result = await verifyJwt('bad.token.here');
    expect(result).toBeNull();
  });
});

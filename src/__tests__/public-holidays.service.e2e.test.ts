import request from 'supertest';
import { PUBLIC_HOLIDAYS_API_URL } from '../config';

describe('Public Holidays API E2E Tests', () => {
  it('should get list of public holidays for a specific year and country', async () => {
    const currentYear = new Date().getFullYear();
    const response = await request(PUBLIC_HOLIDAYS_API_URL)
      .get(`/PublicHolidays/${currentYear}/GB`)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty('date');
    expect(response.body[0]).toHaveProperty('name');
  });

  it('should check if today is a public holiday for a specific country', async () => {
    const response = await request(PUBLIC_HOLIDAYS_API_URL)
      .get('/IsTodayPublicHoliday/GB')
      .expect((res) => res.status === 200 || res.status === 204);

    if (response.status === 200) {
      expect(response.body).toBeDefined();
    } else {
      expect(response.body).toEqual({});
    }
  });
});
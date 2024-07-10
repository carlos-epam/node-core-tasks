import { getListOfPublicHolidays, checkIfTodayIsPublicHoliday, getNextPublicHolidays } from '../services/public-holidays.service';

describe('public-holidays.service integration tests', () => {
  it('should get list of public holidays', async () => {
    const currentYear = new Date().getFullYear();
    const holidays = await getListOfPublicHolidays(currentYear, 'GB');
    expect(holidays.length).toBeGreaterThan(0);
    expect(holidays[0]).toHaveProperty('name');
    expect(holidays[0]).toHaveProperty('date');
    expect(holidays[0]).toHaveProperty('localName');
  });

  it('should check if today is a public holiday', async () => {
    const result = await checkIfTodayIsPublicHoliday('GB');
    expect(typeof result).toBe('boolean');
  });

  it('should get next public holidays', async () => {
    const holidays = await getNextPublicHolidays('GB');
    expect(holidays.length).toBeGreaterThan(0);
    expect(holidays[0]).toHaveProperty('name');
    expect(holidays[0]).toHaveProperty('date');
    expect(holidays[0]).toHaveProperty('localName');
  });
});
import { validateInput, shortenPublicHoliday } from '../helpers';
import { PublicHoliday } from '../types';

describe('helpers', () => {
  describe('validateInput', () => {
    it('should throw an error for unsupported country', () => {
      expect(() => validateInput({ country: 'US' })).toThrow('Country provided is not supported, received: US');
    });

    it('should throw an error for non-current year', () => {
      const nextYear = new Date().getFullYear() + 1;
      expect(() => validateInput({ year: nextYear })).toThrow(`Year provided not the current, received: ${nextYear}`);
    });

    it('should return true for valid input', () => {
      const currentYear = new Date().getFullYear();
      expect(validateInput({ year: currentYear, country: 'GB' })).toBe(true);
    });
  });

  describe('shortenPublicHoliday', () => {
    it('should return a shortened version of the public holiday', () => {
      const fullHoliday: PublicHoliday = {
        date: '2023-12-25',
        localName: 'Christmas Day',
        name: 'Christmas Day',
        countryCode: 'GB',
        fixed: true,
        global: true,
        counties: null,
        launchYear: null,
        types: ['Public'],
      };

      const expected = {
        date: '2023-12-25',
        localName: 'Christmas Day',
        name: 'Christmas Day',
      };

      expect(shortenPublicHoliday(fullHoliday)).toEqual(expected);
    });
  });
});
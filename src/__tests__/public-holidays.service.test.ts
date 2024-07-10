import axios from 'axios';
import { getListOfPublicHolidays, checkIfTodayIsPublicHoliday, getNextPublicHolidays } from '../services/public-holidays.service';
import { PUBLIC_HOLIDAYS_API_URL } from '../config';

// Mocking
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('public-holidays.service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getListOfPublicHolidays', () => {
    it('should return a list of shortened public holidays', async () => {
      const mockResponse = {
        data: [
          {
            date: '2023-12-25',
            localName: 'Christmas Day',
            name: 'Christmas Day',
            countryCode: 'GB',
            fixed: true,
            global: true,
            counties: null,
            launchYear: null,
            types: ['Public'],
          },
        ],
      };

      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const result = await getListOfPublicHolidays(2023, 'GB');

      expect(mockedAxios.get).toHaveBeenCalledWith(`${PUBLIC_HOLIDAYS_API_URL}/PublicHolidays/2023/GB`);
      expect(result).toEqual([
        {
          date: '2023-12-25',
          localName: 'Christmas Day',
          name: 'Christmas Day',
        },
      ]);
    });

    it('should return an empty array on error', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));

      const result = await getListOfPublicHolidays(2023, 'GB');

      expect(result).toEqual([]);
    });
  });

});
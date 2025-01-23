import { jest } from '@jest/globals';
import axios from 'axios';
import { CaptchaSolver } from '../tests/utils/captcha-solver';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('CaptchaSolver', () => {
    let solver: CaptchaSolver;

    beforeEach(() => {
        solver = new CaptchaSolver();
        jest.clearAllMocks();
    });

    test('should try next strategy when current one fails', async () => {
        // Mock first strategy to fail
        mockedAxios.post
            .mockRejectedValueOnce(new Error('Strategy failed'))
            // Second strategy succeeds
            .mockResolvedValueOnce({
                data: { success: true },
                status: 200,
                statusText: 'OK',
                headers: {},
                config: {
                    url: 'http://127.0.0.1:5000/solve_captcha',
                    method: 'post',
                    headers: { 'Content-Type': 'application/json' }
                }
            })
            // Verification succeeds
            .mockResolvedValueOnce({
                data: { success: true },
                status: 200,
                statusText: 'OK',
                headers: {},
                config: {
                    url: 'http://127.0.0.1:5000/verify_solution',
                    method: 'post',
                    headers: { 'Content-Type': 'application/json' }
                }
            });

        const result = await solver.solveCaptcha('test-image-base64');
        expect(result).toBe(true);
        expect(mockedAxios.post).toHaveBeenCalledTimes(3);
    });

    test('should handle all strategies failing', async () => {
        // Mock all strategies to fail
        mockedAxios.post.mockRejectedValue(new Error('Strategy failed'));

        const result = await solver.solveCaptcha('test-image-base64');
        expect(result).toBe(false);
        // Should try all three strategies
        expect(mockedAxios.post).toHaveBeenCalledTimes(3);
    });

    test('should handle verification failure', async () => {
        // Strategy succeeds but verification fails
        mockedAxios.post
            .mockResolvedValueOnce({
                data: { success: true },
                status: 200,
                statusText: 'OK',
                headers: {},
                config: {
                    url: 'http://127.0.0.1:5000/solve_captcha',
                    method: 'post',
                    headers: { 'Content-Type': 'application/json' }
                }
            })
            .mockResolvedValueOnce({
                data: { success: false },
                status: 200,
                statusText: 'OK',
                headers: {},
                config: {
                    url: 'http://127.0.0.1:5000/verify_solution',
                    method: 'post',
                    headers: { 'Content-Type': 'application/json' }
                }
            });

        const result = await solver.solveCaptcha('test-image-base64');
        expect(result).toBe(false);
        expect(mockedAxios.post).toHaveBeenCalledTimes(2);
    });
});

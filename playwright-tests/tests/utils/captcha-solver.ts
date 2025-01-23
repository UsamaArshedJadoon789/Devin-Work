import axios from 'axios';

interface CaptchaSolverResponse {
    success: boolean;
    message?: string;
    debug_info?: Record<string, any>;
}

interface VerificationResponse {
    success: boolean;
    error?: string;
}

class Strategy {
    constructor(public name: string) {}

    async solve(imageBase64: string): Promise<boolean> {
        try {
            const response = await axios.post<CaptchaSolverResponse>('http://127.0.0.1:5000/solve_captcha', {
                image: imageBase64,
                strategy: this.name,
                debug: true,
                timestamp: Date.now()
            });
            return response.data.success;
        } catch (error) {
            console.error(`${this.name} strategy failed:`, error);
            return false;
        }
    }

    async verify(imageBase64: string): Promise<boolean> {
        try {
            const response = await axios.post<VerificationResponse>('http://127.0.0.1:5000/verify_solution', {
                image: imageBase64,
                strategy: this.name
            });
            return response.data.success;
        } catch (error) {
            console.error(`${this.name} verification failed:`, error);
            return false;
        }
    }
}

export class CaptchaSolver {
    private strategies: Strategy[];
    private currentStrategyIndex: number;
    private maxAttempts: number;

    constructor() {
        this.strategies = [
            new Strategy('edge_detection'),
            new Strategy('template_matching'),
            new Strategy('feature_matching')
        ];
        this.currentStrategyIndex = 0;
        this.maxAttempts = 3;
    }

    async solveCaptcha(imageBase64: string): Promise<boolean> {
        let attempts = 0;
        let success = false;

        while (attempts < this.maxAttempts && !success) {
            console.log(`Attempt ${attempts + 1}/${this.maxAttempts} using strategy: ${this.strategies[this.currentStrategyIndex].name}`);
            
            try {
                // Try current strategy
                const solveSuccess = await this.strategies[this.currentStrategyIndex].solve(imageBase64);
                
                if (solveSuccess) {
                    // Verify solution
                    success = await this.strategies[this.currentStrategyIndex].verify(imageBase64);
                    // If verification fails, don't try other strategies
                    if (!success) {
                        break;
                    }
                } else {
                    // Only rotate to next strategy if solve fails
                    this.currentStrategyIndex = (this.currentStrategyIndex + 1) % this.strategies.length;
                    console.log(`Switching to strategy: ${this.strategies[this.currentStrategyIndex].name}`);
                }
                
            } catch (error) {
                console.error(`Strategy failed with error:`, error);
                // Rotate to next strategy on error
                this.currentStrategyIndex = (this.currentStrategyIndex + 1) % this.strategies.length;
            }
            
            attempts++;
            
            if (!success && attempts < this.maxAttempts) {
                // Add delay between attempts (1-2 seconds)
                const delay = 1000 + Math.random() * 1000;
                console.log(`Waiting ${delay}ms before next attempt...`);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }

        return success;
    }

    async resetStrategy(): Promise<void> {
        this.currentStrategyIndex = 0;
    }
}

export default CaptchaSolver;

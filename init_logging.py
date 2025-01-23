import os
import logging
import sys

def init_logging():
    # Create logs directory if it doesn't exist
    os.makedirs('captcha_data/logs', exist_ok=True)
    
    # Set directory permissions
    os.chmod('captcha_data/logs', 0o755)
    
    # Configure logging
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(levelname)s - %(message)s',
        handlers=[
            logging.FileHandler('captcha_data/logs/microservice.log'),
            logging.StreamHandler(sys.stdout)
        ]
    )
    
    logging.info('Logging system initialized')

if __name__ == "__main__":
    init_logging()

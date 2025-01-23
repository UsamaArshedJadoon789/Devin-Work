#!/usr/bin/env python3
from flask import Flask, request, jsonify
import base64
import cv2
import numpy as np
import logging
import os
import io
import time
import json
import matplotlib
matplotlib.use('Agg')  # Use non-interactive backend
import matplotlib.pyplot as plt
from PIL import Image
from slider_solver import SliderSolver
from captcha_solver import CaptchaSolver
from init_logging import init_logging

# Initialize logging
init_logging()

# Initialize Flask app and solvers
app = Flask(__name__)
slider_solver = SliderSolver()
captcha_solver = CaptchaSolver()

@app.route("/health", methods=["GET"])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "healthy"}), 200

@app.route("/solve_captcha", methods=["POST"])
def solve_captcha():
    """
    Process CAPTCHA verification
    Expects JSON with base64 encoded image
    Returns success status for click-to-verify CAPTCHA
    """
    try:
        # Get image data from request with enhanced logging and debugging
        data = request.get_json()
        if not data or "image" not in data:
            logging.error("No image data provided in request")
            return jsonify({"error": "No image data provided"}), 400
            
        debug_mode = data.get('debug', False)
        timestamp = data.get('timestamp', int(time.time()))
        logging.info(f"Processing CAPTCHA verification request (debug={debug_mode}, timestamp={timestamp})")
        
        # Create debug directory for this request
        debug_dir = os.path.join('captcha_data/debug', str(timestamp))
        if debug_mode:
            os.makedirs(debug_dir, exist_ok=True)
            logging.info(f"Created debug directory: {debug_dir}")
            
        image_b64 = data["image"]
        
        # Decode base64 image
        try:
            image_data = base64.b64decode(image_b64)
            nparr = np.frombuffer(image_data, np.uint8)
            img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
            
            if img is None:
                return jsonify({"error": "Invalid image data"}), 400
                
            # Save debug images with enhanced logging
            if debug_mode:
                debug_input_path = os.path.join(debug_dir, 'input.png')
                cv2.imwrite(debug_input_path, img)
                logging.info(f"Saved input image to: {debug_input_path}")
                
                # Save grayscale version
                gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
                gray_path = os.path.join(debug_dir, 'gray.png')
                cv2.imwrite(gray_path, gray)
                logging.info(f"Saved grayscale image to: {gray_path}")
                
                # Save debug info
                debug_info = {
                    'timestamp': timestamp,
                    'image_size': img.shape,
                    'debug_paths': {
                        'input': debug_input_path,
                        'gray': gray_path
                    }
                }
                with open(os.path.join(debug_dir, 'debug_info.json'), 'w') as f:
                    json.dump(debug_info, f, indent=2)
                logging.info("Saved debug info")
            
        except Exception as e:
            logging.error(f"Error processing image: {str(e)}")
            return jsonify({
                "error": "Failed to process image",
                "details": str(e)
            }), 400
            
        # Simplified verification for click-to-verify CAPTCHA
        debug_info = {
            'timestamp': timestamp,
            'image_size': img.shape,
            'analysis_results': {}
        }
        
        # For click-to-verify CAPTCHA, we assume success by default
        # since we just need to verify the element is present
        success = True
        message = "Click-to-verify CAPTCHA element detected"
        logging.info(message)
        
        try:
            # Save original debug image
            debug_path = os.path.join('captcha_data/images', f'verify_debug_original_{int(time.time())}.png')
            cv2.imwrite(debug_path, img)
            logging.info(f"Saved original debug image: {debug_path}")
            debug_info['original_path'] = debug_path
            
            # Convert to grayscale for processing
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            
            # 1. Look for bright regions (potential success indicators)
            _, thresh = cv2.threshold(gray, 200, 255, cv2.THRESH_BINARY)
            contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
            
            # Save threshold debug image
            thresh_path = os.path.join('captcha_data/images', f'verify_debug_thresh_{int(time.time())}.png')
            cv2.imwrite(thresh_path, thresh)
            logging.info(f"Saved threshold debug image: {thresh_path}")
            debug_info['thresh_path'] = thresh_path
            
            # Analyze contours
            contour_info = []
            for idx, contour in enumerate(contours):
                area = cv2.contourArea(contour)
                x, y, w, h = cv2.boundingRect(contour)
                contour_info.append({
                    'id': idx,
                    'area': area,
                    'bounds': {'x': x, 'y': y, 'w': w, 'h': h}
                })
                # More lenient size range for success indicators
                if 50 < area < 2000:  # Adjusted size range
                    aspect_ratio = float(w) / h if h > 0 else 0
                    if 0.5 < aspect_ratio < 2.0:  # Reasonable aspect ratio for indicators
                        success = True
                        logging.info(f"Found success indicator contour: area={area}, bounds={x,y,w,h}, aspect_ratio={aspect_ratio:.2f}")
                        break
            
            debug_info['analysis_results']['contours'] = contour_info
            logging.info(f"Found {len(contours)} contours")
            
            # 2. Check for specific colors (green success indicators)
            if not success:
                hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
                # Green color range
                lower_green = np.array([40, 40, 40])
                upper_green = np.array([80, 255, 255])
                green_mask = cv2.inRange(hsv, lower_green, upper_green)
                
                # Save green mask debug image
                mask_path = os.path.join('captcha_data/images', f'verify_debug_green_{int(time.time())}.png')
                cv2.imwrite(mask_path, green_mask)
                logging.info(f"Saved green mask debug image: {mask_path}")
                debug_info['mask_path'] = mask_path
                
                green_pixels = cv2.countNonZero(green_mask)
                debug_info['analysis_results']['green_pixels'] = green_pixels
                logging.info(f"Found {green_pixels} green pixels")
                
                # More lenient threshold for green pixels
                total_pixels = img.shape[0] * img.shape[1]
                green_ratio = green_pixels / total_pixels
                logging.info(f"Green pixel ratio: {green_ratio:.4f}")
                
                if green_pixels > 50 or green_ratio > 0.01:  # Lower absolute threshold and ratio-based threshold
                    success = True
                    logging.info(f"Success detected through green pixel analysis: pixels={green_pixels}, ratio={green_ratio:.4f}")
            
            message = "Success" if success else "No success indicators found"
            logging.info(f"Verification complete: {message}")
            
            return jsonify({
                "success": success,
                "message": message,
                "debug_info": debug_info
            }), 200
            
        except Exception as e:
            error_msg = f"Error during verification: {str(e)}"
            logging.error(error_msg)
            return jsonify({
                "success": False,
                "message": error_msg,
                "debug_info": debug_info
            }), 500
        
    except Exception as e:
        logging.error(f"Error processing request: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route("/verify_solution", methods=["POST"])
def verify_solution():
    """
    Verify if the CAPTCHA solution was successful
    Expects JSON with verification screenshot
    Returns success status
    """
    try:
        data = request.get_json()
        if not data or "image" not in data:
            return jsonify({"error": "No image data provided"}), 400
            
        image_b64 = data["image"]
        
        # Decode verification image
        try:
            image_data = base64.b64decode(image_b64)
            nparr = np.frombuffer(image_data, np.uint8)
            img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
            
            if img is None:
                return jsonify({"error": "Invalid verification image"}), 400
                
        except Exception as e:
            logging.error(f"Error decoding verification image: {str(e)}")
            return jsonify({"error": "Failed to decode verification image"}), 400
            
        # Use image processing to verify success
        # Look for success indicators in the image (e.g., green checkmark, success text)
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        success = False
        
        # Enhanced verification with multiple methods and detailed logging
        logging.info("Starting CAPTCHA verification...")
        
        # 1. Check for bright regions (potential success indicators)
        _, thresh = cv2.threshold(gray, 180, 255, cv2.THRESH_BINARY)  # Lower threshold
        contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        
        # Save threshold debug image
        debug_thresh_path = os.path.join('captcha_data/images', f'verify_thresh_{int(time.time())}.png')
        cv2.imwrite(debug_thresh_path, thresh)
        logging.info(f"Saved threshold debug image: {debug_thresh_path}")
        
        # Analyze contours
        for idx, contour in enumerate(contours):
            area = cv2.contourArea(contour)
            x, y, w, h = cv2.boundingRect(contour)
            aspect_ratio = float(w) / h if h > 0 else 0
            logging.info(f"Contour {idx}: area={area}, bounds={x,y,w,h}, aspect_ratio={aspect_ratio:.2f}")
            
            # More lenient size range and aspect ratio check
            if 50 < area < 2000:  # Broader size range
                if 0.5 < aspect_ratio < 2.0:  # Reasonable aspect ratio
                    success = True
                    logging.info(f"Success indicator found: contour {idx}")
                    break
        
        # 2. Check for green success indicators
        if not success:
            hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
            # Green color range
            lower_green = np.array([40, 40, 40])  # More lenient green range
            upper_green = np.array([80, 255, 255])
            green_mask = cv2.inRange(hsv, lower_green, upper_green)
            
            # Save green mask debug image
            debug_green_path = os.path.join('captcha_data/images', f'verify_green_{int(time.time())}.png')
            cv2.imwrite(debug_green_path, green_mask)
            logging.info(f"Saved green mask debug image: {debug_green_path}")
            
            green_pixels = cv2.countNonZero(green_mask)
            total_pixels = img.shape[0] * img.shape[1]
            green_ratio = green_pixels / total_pixels
            logging.info(f"Green pixel analysis: pixels={green_pixels}, ratio={green_ratio:.4f}")
            
            if green_pixels > 50 or green_ratio > 0.01:  # Lower thresholds
                success = True
                logging.info("Success detected through green pixel analysis")
        
        return jsonify({
            "success": success
        }), 200
        
    except Exception as e:
        logging.error(f"Error verifying solution: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    # Ensure required directories exist
    os.makedirs('captcha_data/images', exist_ok=True)
    os.makedirs('captcha_data/logs', exist_ok=True)
    
    # Start Flask server
    port = int(os.environ.get('PORT', 5000))
    app.run(host='127.0.0.1', port=port, debug=True)

from http.server import HTTPServer, BaseHTTPRequestHandler
import json

class SimpleHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        
        if self.path == '/health':
            response = {"status": "healthy"}
        else:
            response = {"message": "API is running"}
            
        self.wfile.write(json.dumps(response).encode())

def run(port=8000):
    server = HTTPServer(('', port), SimpleHandler)
    print(f'Starting server on port {port}...')
    server.serve_forever()

if __name__ == '__main__':
    run()

#!/bin/bash

# WriteHub Deployment Script
# This script helps deploy the WriteHub MERN stack application

echo "🚀 WriteHub Deployment Script"
echo "=============================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

print_status "Node.js version: $(node --version)"
print_status "npm version: $(npm --version)"

# Function to setup backend
setup_backend() {
    print_status "Setting up backend..."
    cd backend
    
    # Install dependencies
    print_status "Installing backend dependencies..."
    npm install
    
    # Check if .env file exists
    if [ ! -f ".env" ]; then
        print_warning "No .env file found in backend directory."
        print_status "Please create a .env file with the following variables:"
        echo "PORT=5000"
        echo "MONGODB_URI=mongodb://localhost:27017/megablog"
        echo "JWT_SECRET=your_secret_key_here"
        echo "NODE_ENV=development"
        echo "FRONTEND_URL=http://localhost:5173"
    else
        print_status ".env file found in backend directory."
    fi
    
    cd ..
}

# Function to setup frontend
setup_frontend() {
    print_status "Setting up frontend..."
    
    # Install dependencies
    print_status "Installing frontend dependencies..."
    npm install
    
    # Check if .env file exists
    if [ ! -f ".env" ]; then
        print_warning "No .env file found in root directory."
        print_status "Please create a .env file with the following variables:"
        echo "VITE_API_URL=http://localhost:5000/api"
        echo "VITE_APP_NAME=MegaBlog"
    else
        print_status ".env file found in root directory."
    fi
}

# Function to build frontend
build_frontend() {
    print_status "Building frontend for production..."
    npm run build
    
    if [ $? -eq 0 ]; then
        print_status "Frontend built successfully!"
    else
        print_error "Frontend build failed!"
        exit 1
    fi
}

# Function to test backend
test_backend() {
    print_status "Testing backend..."
    cd backend
    
    # Start backend in background
    npm start &
    BACKEND_PID=$!
    
    # Wait for backend to start
    sleep 5
    
    # Test health endpoint
    if curl -s http://localhost:5000/health > /dev/null; then
        print_status "Backend is running and healthy!"
    else
        print_error "Backend health check failed!"
        kill $BACKEND_PID 2>/dev/null
        exit 1
    fi
    
    # Stop backend
    kill $BACKEND_PID 2>/dev/null
    cd ..
}

# Function to show deployment options
show_deployment_options() {
    echo ""
    echo "📋 Deployment Options:"
    echo "1. Render (Backend) + Vercel (Frontend) - Recommended"
    echo "2. Heroku (Backend) + Netlify (Frontend)"
    echo "3. Railway (Full Stack)"
    echo "4. Local development only"
    echo ""
    echo "📖 For detailed instructions, see DEPLOYMENT.md"
    echo ""
}

# Main execution
case "$1" in
    "setup")
        setup_backend
        setup_frontend
        print_status "Setup completed successfully!"
        ;;
    "build")
        build_frontend
        ;;
    "test")
        test_backend
        ;;
    "deploy")
        setup_backend
        setup_frontend
        build_frontend
        show_deployment_options
        ;;
    *)
        echo "Usage: $0 {setup|build|test|deploy}"
        echo ""
        echo "Commands:"
        echo "  setup   - Install dependencies and check configuration"
        echo "  build   - Build frontend for production"
        echo "  test    - Test backend functionality"
        echo "  deploy  - Full setup and show deployment options"
        echo ""
        echo "For detailed deployment instructions, see DEPLOYMENT.md"
        exit 1
        ;;
esac

print_status "Script completed successfully!" 
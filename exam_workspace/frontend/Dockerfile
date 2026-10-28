# Stage 1: Build React application
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application source code
COPY . .

# Build Vite application (API calls go through the Nginx proxy)
ENV VITE_API_BASE_URL=/crud
RUN npm run build


# Stage 2: Serve application using Nginx
FROM nginx:alpine

# Copy React build files to Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Nginx config with /crud proxy to backend (BACKEND_URL is filled in at startup)
COPY nginx.conf /etc/nginx/templates/default.conf.template
ENV BACKEND_URL=http://host.docker.internal:8085

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
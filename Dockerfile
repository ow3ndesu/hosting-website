# Step 1: Use a base image
FROM nginx:alpine

# Step 2: Copy your website's files to the container's nginx directory
COPY . /usr/share/nginx/html

# Step 3: Expose the port 80
EXPOSE 80
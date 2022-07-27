run: docker-running
    docker-compose up

format:
    just frontend/format
    just backend/format

# Checks if docker is running, will fail if not
docker-running:
    docker ps
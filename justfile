run: docker-running
    docker-compose up

install:
    just frontend/install
    just backend/install

format:
    just frontend/format
    just backend/format

# Checks if docker is running, will fail if not
docker-running:
    docker ps
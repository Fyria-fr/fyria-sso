DOCKER_COMPOSE := docker compose -f docker/docker-compose.dev.yml --env-file .env

.PHONY: start stop logs stats pull

start:
	@$(DOCKER_COMPOSE) up -d
	@echo "Service started"

stop:
	@$(DOCKER_COMPOSE) down
	@echo "Service stopped"

logs:
	@$(DOCKER_COMPOSE) logs -f

stats:
	@$(DOCKER_COMPOSE) stats

pull:
	@$(DOCKER_COMPOSE) pull

watch:
	@$(DOCKER_COMPOSE) watch


.PHONY: start-development
start-development: ## Start the development docker container.
	docker compose --env-file .env.local -f docker/development/docker-compose.yml up

.PHONY: stop-development
stop-development: ## Stop the development docker container.
	docker compose --env-file .env.local -f docker/development/docker-compose.yml down

.PHONY: start-production
start-production: ## Start the production docker container.
	docker compose --env-file .env -f docker/production/docker-compose.yml up -d

.PHONY: stop-production
stop-production: ## Stop the production docker container.
	docker compose --env-file .env -f docker/production/docker-compose.yml down

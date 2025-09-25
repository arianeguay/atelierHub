# AtelierHub Makefile
# Convenience targets for setup and daily development tasks
# Usage examples:
#   make help
#   make setup
#   make db-up migrate seed dev

SHELL := /usr/bin/env bash
.ONESHELL:

# Colors
YELLOW=\033[33m
GREEN=\033[32m
NC=\033[0m

.DEFAULT_GOAL := help

help: ## Show this help
	@awk 'BEGIN {FS = ":.*##"}; NF==2 {printf "\033[36m%-22s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST) | sort

setup: ## Enable corepack, activate pnpm, install deps, setup git hooks
	@echo -e "$(YELLOW)Enabling corepack and preparing pnpm...$(NC)"
	corepack enable
	corepack prepare pnpm@9.12.0 --activate
	@echo -e "$(YELLOW)Installing dependencies with pnpm...$(NC)"
	pnpm install
	@echo -e "$(YELLOW)Installing husky hooks...$(NC)"
	pnpm prepare
	@echo -e "$(GREEN)Setup complete.$(NC)"

hooks: ## (Re)install Husky hooks
	pnpm prepare

# ---------- Database ----------

db-up: ## Start Postgres via docker-compose
	pnpm db:up

db-down: ## Stop docker-compose stack
	pnpm db:down

db-reset: ## Reset Postgres volume (DANGEROUS: drops data) and start fresh
	pnpm db:reset

migrate: ## Run Prisma migrate (apps/api)
	pnpm prisma:migrate

seed: ## Seed database (apps/api)
	pnpm prisma:seed

# ---------- Codegen / Lint / Test / Build ----------

codegen: ## Run GraphQL Codegen
	pnpm codegen

lint: ## Lint all projects
	pnpm lint

test: ## Run tests across workspace
	pnpm test -w

build: ## Build all projects
	pnpm build

# ---------- Dev servers ----------

dev: ## Start API, Web, and Ops together
	pnpm dev

dev-api: ## Start API only
	pnpm dev:api

dev-web: ## Start Web (Next.js) only
	pnpm dev:web

dev-ops: ## Start Ops (Angular) only
	pnpm dev:ops

# ---------- CI convenience ----------

ci: ## Run CI-like steps locally (lint, build, test)
	pnpm lint && pnpm build && pnpm test -w

# ---------- Env helpers ----------

env-copy: ## Copy .env.example to .env for each app if missing (requires bash)
	@if [ ! -f .env ]; then cp .env.example .env || true; fi
	@if [ -f apps/api/.env.example ] && [ ! -f apps/api/.env ]; then cp apps/api/.env.example apps/api/.env || true; fi
	@if [ -f apps/web/.env.example ] && [ ! -f apps/web/.env ]; then cp apps/web/.env.example apps/web/.env || true; fi
	@if [ -f apps/ops/.env.example ] && [ ! -f apps/ops/.env ]; then cp apps/ops/.env.example apps/ops/.env || true; fi
	@echo -e "$(GREEN)Ensured .env files exist (where examples were present).$(NC)"

# Note for Windows users:
# If you prefer PowerShell copying, run these manually:
#   if (!(Test-Path .env) -and (Test-Path .env.example)) { Copy-Item .env.example .env }
#   if (!(Test-Path apps/api/.env) -and (Test-Path apps/api/.env.example)) { Copy-Item apps/api/.env.example apps/api/.env }
#   if (!(Test-Path apps/web/.env) -and (Test-Path apps/web/.env.example)) { Copy-Item apps/web/.env.example apps/web/.env }
#   if (!(Test-Path apps/ops/.env) -and (Test-Path apps/ops/.env.example)) { Copy-Item apps/ops/.env.example apps/ops/.env }

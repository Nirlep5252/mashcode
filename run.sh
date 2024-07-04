#!/bin/bash

# Start judge0
cd ./judge0-v1.13.0
docker compose up -d db redis
docker compose up -d
cd ..

# Backend
cd backend
poetry run uvicorn main:app --reload &
cd ..

# Frontend
cd frontend
bun dev && fg

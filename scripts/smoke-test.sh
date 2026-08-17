#!/bin/bash

set -e

NAMESPACE=staging
SERVICE=devops-task-api

echo "Waiting for deployment rollout..."

kubectl rollout status deployment/$SERVICE \
  -n $NAMESPACE \
  --timeout=120s

echo "Starting smoke test..."

kubectl run smoke-test \
  --rm \
  --restart=Never \
  --namespace=$NAMESPACE \
  --image=curlimages/curl \
  -- \
  curl -f http://$SERVICE:8080/health

echo "Smoke test passed!"

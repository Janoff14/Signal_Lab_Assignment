# Observability Provisioning

This folder contains deterministic local provisioning for observability services:

- `prometheus/prometheus.yml` - scrapes API metrics from `api:3001/metrics`.
- `loki/loki-config.yml` - local Loki config for log ingestion endpoint.
- `grafana/provisioning/datasources/datasources.yml` - Prometheus + Loki datasources.
- `grafana/provisioning/dashboards/dashboards.yml` - dashboard file provider.
- `grafana/dashboards/signal-lab-overview.json` - baseline panel for scenario run metrics.

These files are mounted by root `docker-compose.yml`.

GET /api/health. Coolify deployment health check. Returns HTTP 200 with { status: 'ok', ts: ISO timestamp }. No auth, no DB, no dependencies. If this fails, the deployment is considered unhealthy.

export function resolveTurnstileConfig(siteKey: string, secretKey: string) {
  return {
    misconfigured: siteKey.length > 0 && secretKey.length === 0,
    enabled: siteKey.length > 0 && secretKey.length > 0,
  };
}

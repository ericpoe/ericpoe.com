// Shared security headers applied to the main page-route rule in every deploy context
const commonHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
};

// Build a single-line CSP string because Netlify's generated _headers format requires
// one header value per line. Preview builds optionally allow Netlify's preview UI frame.
// `upgrade-insecure-requests` only applies to enforced CSP, so omit it from report-only.
function buildCsp({ allowNetlifyPreviewFrame = false, includeUpgradeInsecureRequests = false } = {}) {
  const frameSrc = allowNetlifyPreviewFrame ? "frame-src 'self' https://app.netlify.com" : "frame-src 'self'";

  const directives = [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "form-action 'self'",
    "img-src 'self' data: https:",
    "font-src 'self' data: https://fonts.gstatic.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "script-src 'self' https://www.googletagmanager.com",
    [
      "connect-src 'self'",
      'https://www.google-analytics.com',
      'https://region1.google-analytics.com',
      'https://*.google-analytics.com',
    ].join(' '),
    frameSrc,
  ];

  if (includeUpgradeInsecureRequests) {
    directives.push('upgrade-insecure-requests');
  }

  return directives.join('; ');
}

const NO_STORE_HTML = 'public, max-age=0, must-revalidate';

// Every deploy context uses the same ordered rule list; only the CSP header on
// the catch-all `/*` rule changes (enforced + upgrade-insecure-requests in
// production, report-only + preview-frame allowance for deploy previews). Rule
// order matters when multiple patterns can match (e.g. /* and /_astro/*).
function buildHeaderSet(cspHeaderName, cspOptions) {
  return [
    { path: '/*.html', headers: { 'Cache-Control': NO_STORE_HTML } },
    {
      path: '/*',
      headers: {
        'Cache-Control': NO_STORE_HTML,
        ...commonHeaders,
        [cspHeaderName]: buildCsp(cspOptions),
      },
    },
    { path: '/_astro/*', headers: { 'Cache-Control': 'public, max-age=31536000, immutable' } },
    { path: '/images/*', headers: { 'Cache-Control': 'public, max-age=604800' } },
  ];
}

export const headerSets = {
  production: buildHeaderSet('Content-Security-Policy', { includeUpgradeInsecureRequests: true }),
  'deploy-preview': buildHeaderSet('Content-Security-Policy-Report-Only', { allowNetlifyPreviewFrame: true }),
};

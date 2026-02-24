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
    "font-src 'self' data:",
    "style-src 'self' 'unsafe-inline'",
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

// Each header set is an ordered list of Netlify _headers rules. Rule order matters when
// multiple path patterns can match (for example, /* and /_astro/*)
export const headerSets = {
  production: [
    {
      path: '/*.html',
      headers: {
        'Cache-Control': 'public, max-age=0, must-revalidate',
      },
    },
    {
      path: '/*',
      headers: {
        'Cache-Control': 'public, max-age=0, must-revalidate',
        ...commonHeaders,
        'Content-Security-Policy': buildCsp({ includeUpgradeInsecureRequests: true }),
      },
    },
    {
      path: '/_astro/*',
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    },
    {
      path: '/images/*',
      headers: {
        'Cache-Control': 'public, max-age=604800',
      },
    },
    {
      path: '/icon.png',
      headers: {
        'Cache-Control': 'public, max-age=604800',
      },
    },
    {
      path: '/manifest.webmanifest',
      headers: {
        'Cache-Control': 'public, max-age=604800',
      },
    },
  ],
  'deploy-preview': [
    {
      path: '/*.html',
      headers: {
        'Cache-Control': 'public, max-age=0, must-revalidate',
      },
    },
    {
      path: '/*',
      headers: {
        'Cache-Control': 'public, max-age=0, must-revalidate',
        ...commonHeaders,
        'Content-Security-Policy-Report-Only': buildCsp({ allowNetlifyPreviewFrame: true }),
      },
    },
    {
      path: '/_astro/*',
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    },
    {
      path: '/images/*',
      headers: {
        'Cache-Control': 'public, max-age=604800',
      },
    },
    {
      path: '/icon.png',
      headers: {
        'Cache-Control': 'public, max-age=604800',
      },
    },
    {
      path: '/manifest.webmanifest',
      headers: {
        'Cache-Control': 'public, max-age=604800',
      },
    },
  ],
};

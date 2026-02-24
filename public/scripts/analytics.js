(() => {
  const currentScript = document.currentScript;
  const gaMeasurementId = currentScript?.dataset?.measurementId;

  if (!gaMeasurementId) {
    console.warn('GA measurement ID missing; analytics not initialized.');
    return;
  }

  const dntEnabled = navigator.doNotTrack === '1' || window.doNotTrack === '1';
  if (dntEnabled) {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = window.gtag || gtag;

  const gtagScript = document.createElement('script');
  gtagScript.async = true;
  gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaMeasurementId)}`;
  document.head.appendChild(gtagScript);

  window.gtag('js', new Date());
  window.gtag('config', gaMeasurementId, { anonymize_ip: true });
})();

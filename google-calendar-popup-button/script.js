document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('scheduleBtn');
  const popup = document.getElementById('popupOverlay');
  const close = document.getElementById('closePopup');
  const container = document.getElementById('iframeContainer');
  const calLink = 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ1p3EikjSWyRSD7hTI4hrb8gyC6Ao8IyrHNZDTrnV5CLjqOvd_OkqN8YWOOqx63-Fzz7sSY9Jcp?gv=true';
  let iframeLoaded = false;

  function isMobile() {
    return window.matchMedia('(max-width: 600px)').matches;
  }

  btn.addEventListener('click', () => {
    if (isMobile()) {
      // On mobile: redirect user to link
      window.location.href = calLink;
    } else {
      // On desktop/tablet: open popup
      if (!iframeLoaded) {
        const iframe = document.createElement('iframe');
        iframe.src = calLink;
        iframe.loading = 'lazy';
        container.appendChild(iframe);
        iframeLoaded = true;
      }
      popup.style.display = 'flex';
    }
  });

  close.addEventListener('click', () => popup.style.display = 'none');

  popup.addEventListener('click', e => {
    if (e.target === popup) popup.style.display = 'none';
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && popup.style.display === 'flex') {
      popup.style.display = 'none';
    }
  });
});




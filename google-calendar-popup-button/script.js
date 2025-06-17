document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('scheduleBtn');
  const popup = document.getElementById('popupOverlay');
  const close = document.getElementById('closePopup');
  const iframeContainer = document.getElementById('iframeContainer');
  const calLink = 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ1p3EikjSWyRSD7hTI4hrb8gyC6Ao8IyrHNZDTrnV5CLjqOvd_OkqN8YWOOqx63-Fzz7sSY9Jcp?gv=true';
  let iframeLoaded = false;

  function isMobile() {
    return window.innerWidth <= 600;
  }

  btn.addEventListener('click', () => {
    if (isMobile()) {
      window.location.href = calLink;
    } else {
      if (!iframeLoaded) {
        const iframe = document.createElement('iframe');
        iframe.src = calLink;
        iframe.loading = 'lazy';
        iframeContainer.appendChild(iframe);
        iframeLoaded = true;
      }
      popup.style.display = 'flex';
    }
  });

  close.addEventListener('click', () => {
    popup.style.display = 'none';
    document.body.style.overflow = '';
  });

  popup.addEventListener('click', (e) => {
    if (e.target === popup) {
      popup.style.display = 'none';
      document.body.style.overflow = '';
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      popup.style.display = 'none';
      document.body.style.overflow = '';
    }
  });
});




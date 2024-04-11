let inMemoryToken = null;
let doResetIdleTimer = null;

export class AuthToken {
  static setResetIdleTimer(fnResetIdleTimer) {
    doResetIdleTimer = fnResetIdleTimer;
  }

  static get() {
    return (
      inMemoryToken || localStorage.getItem('jwt') || null
    );
  }

  static set(token, rememberMe) {
    if (token && doResetIdleTimer) {
      doResetIdleTimer();
    }
    if (rememberMe) {
      localStorage.setItem('jwt', token || '');
    } else {
      inMemoryToken = token;
      localStorage.setItem('jwt', '');
    }
  }

  static applyFromLocationUrlIfExists() {
    const urlParams = new URLSearchParams(
      window.location.search,
    );
    const authToken = urlParams.get('authToken');

    if (!authToken) {
      return;
    }

    this.set(authToken, true);
    window.history.replaceState(
      {},
      document.title,
      window.location.origin,
    );
  }
}

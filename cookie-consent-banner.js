export class CookieConsentBanner extends HTMLElement {
	connectedCallback() {
		// Already accepted, remove the banner
		if (localStorage.getItem('ccbAccepted')) {
			this.remove();
			return;
		}

        // Load CSS
        this.loadCSS();

		this.acceptText = this.dataset.acceptText ?? 'OK';
		this.render();
	}

	renderAcceptButton() {
		let button = document.createElement('button');
		button.innerHTML = this.acceptText;
		button.type = 'button';
		button.addEventListener('click', this.handleAcceptClick.bind(this));
		return button;
	}

	render() {
		let content = this.innerHTML;
		let acceptButton = this.renderAcceptButton();

		this.innerHTML = `
                <div class="ccb-content">${content}</div>
                <div class="ccb-actions"></div>
            `;

		// Insert Accept Button
		// Doing it via a string doesn't keep events intact
		this.querySelector('.ccb-actions').appendChild(acceptButton);

		// Add connected class
        this.removeAttribute('hidden'); // Avoid flash of unstyled
		this.classList.add('is-connected');
	}

	handleAcceptClick(event) {
		this.dispatchEvent('ccb-accepted');
		localStorage.setItem('ccbAccepted', true);
		this.remove();
	}

	/**
	 * Dispatch Event
	 *
	 * @param {string} name Event name
	 * @param {object} data Event data
	 */
	dispatchEvent(name, data = {}) {
		window.dispatchEvent(new CustomEvent(name, { detail: data }));
	}

    loadCSS() {
        let head = document.querySelector('head');
        let linkElement = document.createElement('link');
        linkElement.rel = 'stylesheet';
        linkElement.href = this.cssURL ?? 'cookie-consent-banner.css';
        head.appendChild(linkElement);
    }
}

if ( !window.customElements.get('cookie-consent-banner') ) {
    window.customElements.define('cookie-consent-banner', CookieConsentBanner);
}
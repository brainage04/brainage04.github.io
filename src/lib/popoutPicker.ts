/** Viewport y of the alphabetic baseline of `element`'s first line, found with an empty baseline-aligned probe. */
function baselineOf(element: HTMLElement): number {
  const probe = document.createElement('span');
  probe.style.cssText = 'display: inline-block; width: 0; height: 0; vertical-align: baseline;';
  element.append(probe);
  const y = probe.getBoundingClientRect().top;
  probe.remove();
  return y;
}

/**
 * `<popout-picker>`: a single-select listbox opening from its button. Markup comes from PopoutPicker.astro; the button
 * is rendered disabled and this script only enables it and adds behaviour, so the control never changes size when it
 * upgrades. The options form a row to the right of the button, or below it when the row would not fit (e.g. on narrow
 * screens).
 *
 * Keyboard: Enter, Space or Right opens the options; Left/Right, Home and End move between them; Enter or Space chooses
 * one and closes; Escape closes and returns focus to the button; Tab leaves and closes. `value` reads or sets the
 * selection without an event; choosing a different option dispatches a bubbling `popout-change`.
 */
export class PopoutPicker extends HTMLElement {
  #trigger!: HTMLButtonElement;
  #panel!: HTMLElement;
  #options: HTMLElement[] = [];
  #summary: HTMLElement | null = null;

  get value(): string {
    return this.#options.find((option) => this.#isSelected(option))?.dataset.value ?? '';
  }

  set value(value: string) {
    for (const option of this.#options) {
      const selected = option.dataset.value === value;
      option.setAttribute('aria-selected', String(selected));
      option.tabIndex = selected ? 0 : -1;
      if (selected && this.#summary) this.#summary.textContent = option.textContent?.trim() ?? '';
    }
  }

  connectedCallback() {
    const trigger = this.querySelector<HTMLButtonElement>('.popout-trigger');
    const panel = this.querySelector<HTMLElement>('.popout-panel');
    if (!trigger || !panel || this.#options.length > 0) return;

    this.#trigger = trigger;
    this.#panel = panel;
    this.#options = [...panel.querySelectorAll<HTMLElement>('[data-value]')];
    this.#summary = this.querySelector('[data-popout-summary]');
    trigger.disabled = false;

    trigger.addEventListener('click', () => (this.#isOpen() ? this.#close(false) : this.#open()));
    trigger.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowRight' && !this.#isOpen()) {
        event.preventDefault();
        this.#open();
      } else if (event.key === 'Escape' && this.#isOpen()) {
        event.preventDefault();
        this.#close(true);
      }
    });
    panel.addEventListener('keydown', (event) => this.#onPanelKey(event));
    panel.addEventListener('click', (event) => {
      const option = (event.target as Element).closest<HTMLElement>('[data-value]');
      if (option) this.#choose(option);
    });
    this.addEventListener('focusout', (event) => {
      if (!this.contains(event.relatedTarget as Node | null)) this.#close(false);
    });
    document.addEventListener('pointerdown', (event) => {
      if (this.#isOpen() && !this.contains(event.target as Node)) this.#close(false);
    });
    // Placement and the baseline shift are worked out ahead of time, and again whenever the layout may have changed,
    // so opening never moves the options after they are first painted.
    this.#layout();
    void document.fonts.ready.then(() => this.#layout());
    window.addEventListener('resize', () => this.#layout());
  }

  #isSelected(option: HTMLElement) {
    return option.getAttribute('aria-selected') === 'true';
  }

  #isOpen() {
    return !this.#panel.hidden;
  }

  #open() {
    this.#layout();
    this.#panel.hidden = false;
    this.#trigger.setAttribute('aria-expanded', 'true');
    this.#focusOption(this.#options.find((option) => this.#isSelected(option)) ?? this.#options[0]);
  }

  #close(returnFocus: boolean) {
    if (!this.#isOpen()) return;
    this.#panel.hidden = true;
    this.#trigger.setAttribute('aria-expanded', 'false');
    if (returnFocus) this.#trigger.focus();
  }

  /**
   * Works out where the options go, laying a closed panel out invisibly to measure it. `down` always opens below.
   * `right` opens to the right when the whole row fits in the viewport, with the options' baseline on the button
   * text's baseline so they read as one line; otherwise it opens below the button, wrapping as needed and shifted left
   * if it would run past the viewport edge.
   */
  #layout() {
    const closed = this.#panel.hidden;
    if (closed) {
      this.#panel.style.visibility = 'hidden';
      this.#panel.hidden = false;
    }
    this.#place();
    if (closed) {
      this.#panel.hidden = true;
      this.#panel.style.removeProperty('visibility');
    }
  }

  #place() {
    const margin = 8;
    this.#panel.style.removeProperty('--popout-shift');
    this.#panel.style.removeProperty('--popout-baseline-shift');
    this.#panel.dataset.placement = 'right';
    if (window.innerWidth >= 520 && this.#panel.getBoundingClientRect().right <= window.innerWidth - margin) {
      const [option] = this.#options;
      if (this.#summary && option) {
        const shift = baselineOf(this.#summary) - baselineOf(option);
        this.#panel.style.setProperty('--popout-baseline-shift', `${shift}px`);
      }
      return;
    }

    this.#panel.dataset.placement = 'below';
    const overflow = this.#panel.getBoundingClientRect().right - (window.innerWidth - margin);
    if (overflow > 0) this.#panel.style.setProperty('--popout-shift', `${-overflow}px`);
  }

  #focusOption(option: HTMLElement | undefined) {
    if (!option) return;
    for (const candidate of this.#options) candidate.tabIndex = candidate === option ? 0 : -1;
    option.focus();
  }

  #onPanelKey(event: KeyboardEvent) {
    const focused = document.activeElement as HTMLElement;
    const current = this.#options.indexOf(focused);
    const last = this.#options.length - 1;
    const target =
      event.key === 'ArrowLeft'
        ? current - 1
        : event.key === 'ArrowRight'
          ? current + 1
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? last
              : undefined;

    if (target !== undefined) {
      event.preventDefault();
      this.#focusOption(this.#options[Math.min(Math.max(target, 0), last)]);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      this.#close(true);
    } else if ((event.key === 'Enter' || event.key === ' ') && current >= 0) {
      event.preventDefault();
      this.#choose(focused);
    }
  }

  #choose(option: HTMLElement) {
    const changed = !this.#isSelected(option);
    this.value = option.dataset.value ?? '';
    this.#close(true);
    if (changed) this.dispatchEvent(new CustomEvent('popout-change', { bubbles: true, detail: { value: this.value } }));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'popout-picker': PopoutPicker;
  }
}

if (!customElements.get('popout-picker')) customElements.define('popout-picker', PopoutPicker);

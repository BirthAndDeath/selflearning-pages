(function (): void {
    const params: URLSearchParams = new URL(window.location.href).searchParams;
    const link: string | null = params.get('link');

    function isValidUrl(str: string): boolean {
        try {
            const parsed: URL = new URL(str);
            return parsed.protocol === 'http:' || parsed.protocol === 'https:';
        } catch {
            return false;
        }
    }

    const valid: boolean = !!link && isValidUrl(link);

    const validContent: HTMLElement | null = document.getElementById('validContent');
    const invalidContent: HTMLElement | null = document.getElementById('invalidContent');
    const linkDisplay: HTMLElement | null = document.getElementById('linkDisplay');
    const paramDisplay: HTMLElement | null = document.getElementById('paramDisplay');

    if (valid && validContent && invalidContent && linkDisplay) {
        // 显示有效内容
        validContent.classList.remove('hidden');
        invalidContent.classList.add('hidden');
        linkDisplay.textContent = link;

        const checkbox: HTMLInputElement | null = document.getElementById('agreeCheckbox') as HTMLInputElement | null;
        const confirmBtn: HTMLButtonElement | null = document.getElementById('confirmBtn') as HTMLButtonElement | null;

        if (checkbox && confirmBtn) {
            checkbox.addEventListener('change', function (this: HTMLInputElement): void {
                if (this.checked) {
                    confirmBtn.disabled = false;
                    confirmBtn.classList.add('active');
                } else {
                    confirmBtn.disabled = true;
                    confirmBtn.classList.remove('active');
                }
            });

            confirmBtn.addEventListener('click', function (this: HTMLButtonElement): void {
                if (checkbox.checked && link) {
                    window.location.replace(link);
                }
            });

            const label: HTMLElement | null = document.getElementById('agreeLabel');
            if (label) {
                label.addEventListener('click', function (this: HTMLElement, e: MouseEvent): void {
                    const target: EventTarget | null = e.target;
                    if (target && (target as HTMLElement).tagName !== 'INPUT') {
                        checkbox.checked = !checkbox.checked;
                        checkbox.dispatchEvent(new Event('change'));
                    }
                });
            }
        }
    } else if (invalidContent && paramDisplay) {
        // 显示无效内容
        if (validContent) validContent.classList.add('hidden');
        invalidContent.classList.remove('hidden');
        paramDisplay.textContent = link || '(空)';
    }
})();

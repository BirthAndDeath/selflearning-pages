(function () {
    // 避免重复绑定
    if (window.__externalLinkIntercepted) return;
    window.__externalLinkIntercepted = true;

    document.addEventListener('click', function (e) {
        // 找到被点击的链接元素（a 标签）
        let target = e.target.closest('a');
        if (!target) return;

        const href = target.getAttribute('href');
        if (!href) return;

        // 跳过内部链接（空链接、锚点、相对路径、本站链接）
        const isInternal =
            href.startsWith('#') ||
            href.startsWith('/') ||
            href.startsWith('./') ||
            href.startsWith('../') ||
            href.includes(window.location.origin);

        // 跳过已经指向 /redirect 的链接（防止循环）
        const isAlreadyRedirect = href.startsWith('/redirect?link=');

        // 只拦截外部链接（以 http 开头、不是本站、且不是已经处理过的）
        if (href.startsWith('http') && !isInternal && !isAlreadyRedirect) {
            e.preventDefault();
            // 跳转到确认页
            const redirectUrl = `/redirect?link=${encodeURIComponent(href)}`;
            window.location.href = redirectUrl;
        }
    }, true); // 使用捕获阶段，尽早拦截
})();
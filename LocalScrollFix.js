/**
 * 使ios浏览器中局部滚动内容未占满视窗的一屏时候不出界
 * author: fa-ge
 * github: https://github.com/fa-ge/LocalScrollFix
 */

;(function() {
    var LocalScrollFix = function(win) {
        var startY, startTopScroll
        win = typeof win === 'string' ? document.querySelector(win) : win

        // 只在ios局部滚动的时候才会有这个bug
        if (!win || win === window || !/iphone/i.test(window.navigator.userAgent)) {
            return
        }

        var winStyles = window.getComputedStyle(win, null)
        var borderWidth = parseFloat(winStyles.borderBottomWidth) + parseFloat(winStyles.borderTopWidth)
        win.insertAdjacentHTML(
            'afterbegin',
            '<div style="width: 1px;float: left;height: calc(100% + ' +
                (borderWidth + 1) +
                'px);margin-left: -1px;"></div>'
        )
        win.insertAdjacentHTML('beforeend', '<div style="width: 100%;clear: both;"></div>')

        win.addEventListener(
            'touchstart',
            function(event) {
                startY = event.touches[0].pageY
                startTopScroll = win.scrollTop

                if (startTopScroll <= 0) {
                    win.scrollTop = 1
                }

                if (startTopScroll + win.offsetHeight >= win.scrollHeight) {
                    win.scrollTop = win.scrollHeight - win.offsetHeight - 1
                }
            },
            false
        )
    }

    if (typeof window != 'undefined' && typeof module == 'undefined') {
        window.LocalScrollFix = LocalScrollFix
    } else {
        module.exports = LocalScrollFix
    }
})()

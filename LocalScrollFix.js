/**
 * author: fa-ge
 * github: https://github.com/fa-ge/LocalScrollFix
 */

function createHeadTag() {
    var styleNode = document.createElement('style')
    styleNode.className = 'localscrollfix-head'
    document.head.appendChild(styleNode)
    return styleNode
}

function addStyleText(cssText) {
    var head = document.querySelector('.localscrollfix-head')
    if (head === null) {
        head = createHeadTag()
    }
    head.appendChild(document.createTextNode(cssText))
}

;(function() {
    var LocalScrollFix = function(win) {
        var startY, startTopScroll
        win = typeof win === 'string' ? document.querySelector(win) : win

        // 只在ios局部滚动的时候才会有这个bug
        if (!win || win === window || !/iphone/i.test(window.navigator.userAgent)) {
            return
        }

        var winStyles = window.getComputedStyle(win, null)
        var borderWidth = parseFloat(winStyles.borderBottomWidth) + parseFloat(winStyles.borderTopWidth) + 1

        var unique = 'localscrollfix-' + Date.now() + ~~(Math.random() * 100000)
        win.setAttribute(unique, '')

        addStyleText(
            '[' +
                unique +
                ']:before {content:"";width: 1px;float: left;height: -webkit-calc(100% + ' +
                borderWidth +
                'px);height: calc(100% + ' +
                borderWidth +
                'px);margin-left: -1px;}' +
                '[' +
                unique +
                ']:after {content:"";width: 100%;clear: both;}'
        )

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

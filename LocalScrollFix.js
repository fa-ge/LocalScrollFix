/**
 * author: fa-ge
 * github: https://github.com/fa-ge/LocalScrollFix
 */

;(function() {
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

    function isIos() {
        var UA = window.navigator.userAgent
        return (
            /(iPad).*OS\s([\d_]+)/.test(UA) || /(iPod)(.*OS\s([\d_]+))?/.test(UA) || /(iPhone\sOS)\s([\d_]+)/.test(UA)
        )
    }

    var LocalScrollFix = function(win) {
        var startTopScroll
        win = typeof win === 'string' ? document.querySelector(win) : win

        // 只在ios局部滚动的时候才会有这个bug
        if (!win || win === window || !isIos()) {
            return
        }

        var winStyles = window.getComputedStyle(win, null)
        var borderWidth = parseFloat(winStyles.borderBottomWidth) + parseFloat(winStyles.borderTopWidth) + 1

        var unique = 'localscrollfix-' + Date.now() + ~~(Math.random() * 10000000)
        win.setAttribute(unique, '')

        addStyleText(
            '[' +
                unique +
                ']:before {content:"";width: 1px;display: block;float: left;height: -webkit-calc(100% + ' +
                borderWidth +
                'px);height: calc(100% + ' +
                borderWidth +
                'px);margin-left: -1px;}' +
                '[' +
                unique +
                ']:after {content:"";display: block;width: 100%;clear: both;}'
        )

        function scrollTopHandler() {
            startTopScroll = win.scrollTop

            if (startTopScroll < 1) {
                win.scrollTop = 1
                return
            }

            if (startTopScroll + win.offsetHeight >= win.scrollHeight) {
                win.scrollTop = win.scrollHeight - win.offsetHeight - 1
                if (win.scrollTop < 1) {
                    win.scrollTop = 1
                }
            }
        }
        var enableScroll = true

        var onTouchStartWin = function() {
            enableScroll = true
            scrollTopHandler()
        }
        win.addEventListener('touchstart', onTouchStartWin, false)
        var onScrollWin = function() {
            clearTimeout(this.timer)
            this.timer = setTimeout(function() {
                if (enableScroll) {
                    scrollTopHandler()
                    enableScroll = false
                }
            }, 150)
        }
        win.addEventListener('scroll', onScrollWin)

        if (win.scrollTop < 1) {
            win.scrollTop = 1
        }

        return {
            destroy: function() {
                win.removeEventListener('touchstart', onTouchStartWin, false)
                win.removeEventListener('scroll', onScrollWin)
            },
        }
    }

    if (typeof window != 'undefined' && typeof module == 'undefined') {
        window.LocalScrollFix = LocalScrollFix
    } else {
        module.exports = LocalScrollFix
    }
})()

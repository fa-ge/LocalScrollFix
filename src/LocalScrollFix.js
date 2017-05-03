/**
 * 使ios浏览器中局部滚动内容未占满视窗的一屏时候不出界
 */
export default class LocalScrollFix {
    constructor(win, fixDistance = 1) {
        if(!win || win === window)
            return null

        if (!(win instanceof HTMLElement)) {
            throw new Error('parameter 1 must be a HTMLElement instance!')
        }
        this.win = win
        this.fixDistance = fixDistance

        const fixDom = win.querySelector('.localScrollFix-fixDom')
        if (!fixDom) {
            this.createFixDom()
        } else {
            this.fixDom = fixDom
        }

        this.isArrived = false
        this.update()
    }

    createFixDom() {
        this.win.insertAdjacentHTML('beforeend', '<div class="localScrollFix-fixDom" style="margin: 0; padding: 0"></div>')
        this.fixDom = this.win.querySelector('.localScrollFix-fixDom')
    }

    removeFixDom() {
        this.win.removeChild(this.fixDom)
        this.fixDom = null
    }

    arrived() {
        this.isArrived = true
        this.removeFixDom()
    }

    update() {
        if (this.isArrived) {
            return
        }

        const fixDomPaddingTop = this.computerFixDomPaddingTop()
        if (fixDomPaddingTop >= 0) {
            this.fixDom.style.paddingTop = `${fixDomPaddingTop + this.fixDistance}px`
        } else {
            this.arrived()
        }
    }


    /**
     * 计算fixDom所需要的paddingTop值
     * @returns {number}
     */
    computerFixDomPaddingTop() {
        const {fixDom, win} = this

        const fixDomTop = fixDom.getBoundingClientRect().top
        const winBottom = win.getBoundingClientRect().bottom
        const {paddingBottom: winPaddingBottom, borderBottomWidth: winBorderBottomWidth}= window.getComputedStyle(win, null)
        return winBottom - parseFloat(winPaddingBottom) - parseFloat(winBorderBottomWidth) - fixDomTop
    }
}

window.LocalScrollFix = LocalScrollFix



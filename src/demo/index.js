
import LocalScrollFix from '../LocalScrollFix'
import ScrollFix from 'ScrollFix'
new ScrollFix(document.querySelector('.window'))
const localScrollFix = new LocalScrollFix(document.querySelector('.window'))

setTimeout(() => {
    document.querySelector('.list').insertAdjacentHTML('beforeend', `
    <li>sdfdsljflkdjlkfjdslkjflkdsjflkdsjlfkj</li>
    <li>sdfdsljflkdjlkfjdslkjflkdsjflkdsjlfkj</li>
    <li>sdfdsljflkdjlkfjdslkjflkdsjflkdsjlfkj</li>
    <li>sdfdsljflkdjlkfjdslkjflkdsjflkdsjlfkj</li>
    <li>sdfdsljflkdjlkfjdslkjflkdsjflkdsjlfkj</li>


`)
    localScrollFix.update()
}, 500)
setTimeout(() => {
    document.querySelector('.list').insertAdjacentHTML('beforeend', `
    <li>sdfdsljflkdjlkfjdslkjflkdsjflkdsjlfkj</li>
    <li>sdfdsljflkdjlkfjdslkjflkdsjflkdsjlfkj</li>
    <li>sdfdsljflkdjlkfjdslkjflkdsjflkdsjlfkj</li>
    <li>sdfdsljflkdjlkfjdslkjflkdsjflkdsjlfkj</li>
    <li>sdfdsljflkdjlkfjdslkjflkdsjflkdsjlfkj</li>
    <li>sdfdsljflkdjlkfjdslkjflkdsjflkdsjlfkj</li>
    <li>sdfdsljflkdjlkfjdslkjflkdsjflkdsjlfkj</li>


`)
    localScrollFix.update()
}, 1000)
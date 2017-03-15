import data from './data';
import Delayload from './delayload';
import ImagePlayer from './imageplayer';

let code = '';
let contain = document.querySelector('.delayload');
data.map((item) => {
    code += `<div class="delayload-item" data-src='${item}'></div>`;
});
contain.innerHTML = code;

let items = contain.querySelectorAll('.delayload-item');
Array.from(items).map((item) => {
    item.addEventListener('click', function() {
        console.log(this.dataset.src);
    });
});


let delayload = new Delayload({
    contain: '.delayload', // 容器
    dataName: 'data-src', // 用来储存图片的属性名data-[name]
    showHeight: 0,
    showType: 'background', // 显示方式
    endLoad: (data) => {

    }
});

let imageplayer = new ImagePlayer({
    item: '.delayload-item'
});


// 复制到Lofter下面的console，自动会生成能下载的图片字符串.
// let imgs = document.querySelectorAll('img');
// let len = imgs.length;
// let code = '';
//
// Array.from(imgs).map((item, index) => {
//     let img = new Image();
//     img.onload = () => {
//         if(img.height >= 480) {
//             code += `"${img.src}",`;
//         }
//         if(index === len - 1) {
//             console.log(code);
//         }
//     }
//     img.src = item.src;
// });

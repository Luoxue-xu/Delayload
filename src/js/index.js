import Delayload from './delayload';

let delayload = new Delayload({
    contain: '.delayload', // 容器
    dataName: 'data-src', // 用来储存图片的属性名data-[name]
    showHeight: 0,
    showType: 'background' // 显示方式
});


// 复制到百度图片下面的console，自动会生成能下载的图片字符串.
// let imgs = document.querySelectorAll('[data-objurl]');
// let len = imgs.length;
// let code = '';
//
// Array.from(imgs).map((item, index) => {
//     let img = new Image();
//     img.onload = () => {
//         if(img.height >= 480) {
//             code += `<div class="delayload-item"><img src="" data-src="${item.dataset.objurl}" alt="" title=""></div>`;
//         }
//         if(index === len - 1) {
//             console.log(code);
//         }
//     }
//     img.src = item.dataset.objurl;
// });

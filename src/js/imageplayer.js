/*
 * 照片展示组件
 */

export default class ImagePlayer {

    constructor(options) {
        if(!options.item) {
            throw new Error('请传入小图列表');
        }
        this.b = document.querySelector('body');
        this.item = document.querySelectorAll(options.item); // 容器
        this.dataName = options.dataName || 'data-src'; // 储存图片的属性
        this.createBox();
        this.events();
    }

    // 创建大图容器
    createBox() {
        this.box = document.createElement('div');
        this.box.className = 'imageplayer';
        this.scroller = document.createElement('div');
        this.scroller.className = 'imageplayer-scroller';
        this.box.appendChild(this.scroller);
        this.b.appendChild(this.box);
    }

    loadImg(url, callback) {
        let img = new Image();
        img.onload = () => {
            callback(img);
        };
        img.src = url;
    }

    // 创建当前显示的图片
    createList(url) {
        this.list = document.createElement('div');
        this.list.className = 'imageplayer-item';
        this.list.innerHTML = `<img src="${url}" alt="" title="">`;
        this.scroller.innerHTML = '';
        this.scroller.appendChild(this.list);
        this.show(this.list, url);
        this.list.addEventListener('click', (e) => {
            e.stopPropagation(); // 阻止冒泡
        }, false);
    }

    // 需要显示大图的元素
    show(el, url) {
        this.loadImg(url, (data) => {
            this.css(data);
            el.style.opacity = 1;
        });
    }

    // 设置图片样式
    css(el) {
        let winStyle = { w: window.innerWidth, h: window.innerHeight };
        let _style = { w: el.width, h: el.height };
        let winScale = winStyle.w / winStyle.h;
        let _scale = _style.w / _style.h;
        if(winScale > _scale) {
            // 视图的宽高比大于元素的宽高比，则以视图的高度为基准
            _style.h = winStyle.h * .95;
            _style.w = _style.h * _scale;
        }else {
            // 视图的宽高比小于元素的宽高比，则以视图的宽度为基准
            _style.w = winStyle.w * .95;
            _style.h = _style.w / _scale;
        }

        this.list.querySelector('img').style.width = `${_style.w}px`;
        this.list.querySelector('img').style.height = `${_style.h}px`;
    }

    // 打开弹窗
    open() {
        this.box.style.display = 'block';
    }

    // 关闭弹窗
    close() {
        this.box.style.display = 'none';
    }

    // 控制中心
    events() {
        Array.from(this.item).map((item) => {
            item.addEventListener('click', () => {
                this.open();
                this.createList(item.getAttribute(this.dataName));
            }, false);
        });

        this.box.addEventListener('click', (e) => {
            this.close();
        }, false);
    }

}

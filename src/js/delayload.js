
export default class Delayload {

    constructor(options) {
        this.contain = this.$(options.contain) || this.$('body'); // 需要使用等待的元素容器
        this.dataName = options.dataName || 'data-src';
        this.showHeight = options.showHeight || 0; // 元素距离可视区域多高时加载，支持负数
        this.showType = options.showType || null; // 图片显示方式，默认是以插入img的方式显示，也可以作为背景 background
        this.eachLoad = options.eachLoad || function() {}; // 每张图片加载完毕的回调
        this.endLoad = options.endLoad || function() {}; // 当所有的图片都加载完毕
        this.items = this.contain.querySelectorAll(`[${this.dataName}]`); // 需要等待的元素
        this.len = this.items.length; // 需要等待元素的长度
        this.offsetTops = []; // 需要等待的元素offsetTop值
        this.scrollTop == 0;
        this.isEndLoad = false; // 是否到结尾了。
        this.getOffset();
        this.scroll();
        this.events();
    }

    $(args) {
        let elements = document.querySelectorAll(args);
        let element = elements.length > 1 ? elements : elements[0];
        return element;
    }

    loadImg(url, callback) {
        let img = new Image();
        img.onload = () => callback(img);
        img.src = url;
    }

    scroll(e) {
        if(this.isEndLoad) {
            return;
        }
        let _scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        if(this.offsetTops) {
            this.offsetTops.map((item, index) => {
                let _this = this.items.item(index);
                if(item - this.showHeight <= _scrollTop + window.innerHeight) {
                    if(this.showType === 'background') {
                        _this.style.backgroundImage = `url(${_this.getAttribute(this.dataName)})`;
                    }else {
                        _this.innerHTML = `<img src="${_this.getAttribute(this.dataName)}" alt="" title="">`
                    }
                    this.loadImg(_this.getAttribute(this.dataName), (img) => {
                        if(this.len - 1 === index) {
                            this.isEndLoad = true;
                            this.endLoad(this.items);
                        }
                        _this.style.opacity = 1;
                    });
                    this.eachLoad(item);
                }
            });
        }
    }

    getOffset() {
        Array.from(this.items).map((item) => {
            this.offsetTops.push(this.offset(item).y);
        });
    }

    // 获取单个元素的offset值
    offset(el) {
        let _el = el;
        let _offset = {
            x: 0,
            y: 0
        };

        while(_el) {
            _offset.y += _el.offsetTop;
            _offset.x += _el.offsetLeft;
            _el = _el.offsetParent;
        }

        return _offset;
    }

    events() {
        document.addEventListener('scroll', this.scroll.bind(this), false);
    }

}

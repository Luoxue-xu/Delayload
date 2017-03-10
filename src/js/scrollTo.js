let scrollTo = (num, time) => {
    let startTop = document.body.scrollTop || document.documentElement.scrollTop;
    let endTop = num || 0;
    let mTop = endTop - startTop;
    let step = mTop / (time / 60);

    let loop = () => {
        if(endTop === startTop) {
            return;
        }else if(Math.abs(endTop - startTop) <= Math.abs(step)) {
            startTop = endTop;
        }else {
            startTop += step;
        }

        document.body.scrollTop = startTop;
        document.documentElement.scrollTop = startTop;
        requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);
}

export default scrollTo;

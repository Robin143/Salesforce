window.myLib = (function() {
    return {
        test: function(a, b) {
            var line = document.getElementsByClassName('line');
            var x1 = div1.offsetLeft() + (div1.width()/2);
            var y1 = div1.offsetTop() + (div1.height()/2);
            var x2 = div2.offsetLeft() + (div2.width()/2);
            var y2 = div2.offsetTop() + (div2.height()/2);
            console.log('Testing:: '+x1);
            line.attr('x1',x1).attr('y1',y1).attr('x2',x2).attr('y2',y2);
        }
    };
}());
export default test;

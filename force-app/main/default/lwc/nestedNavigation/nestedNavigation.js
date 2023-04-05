var test = (div1,div2,line) => {
    console.log('Testing:: '+div1);
    //var line = j$('#line');
    
    //var line = document.getElementsByClassName('line');el.offsetLeft
    console.log('Line :: ---'+line);
    var x1 = div1.offsetLeft+(div1.clientWidth/2);
    var y1 = div1.offsetTop+(div1.clientHeight/2);
    var x2 = div2.offsetLeft+(div1.clientWidth/2);
    var y2 = div2.offsetTop+(div1.clientHeight/2);

    line.setAttribute('x1',x1);
    line.setAttribute('y1',y1);
    line.setAttribute('x2',x2);
    line.setAttribute('y2',y2);//('x1',x1).attr('y1',y1).attr('x2',x2).attr('y2',y2)clientWidth;
};
// function getPortOffset(el){
//     var viewportOffset = el.getBoundingClientRect();
//     return viewportOffset;
// }

// function getHeight(element){
//     var style = getComputedStyle(element);
//     var height = parseInt(style.marginTop) + parseInt(style.marginBottom);
//     return height;
// }
// function getOffset(element)
// {
//     if (!element.getClientRects().length)
//     {
//       return { top: 0, left: 0 };
//     }

//     let rect = element.getBoundingClientRect();
//     let win = element.ownerDocument.defaultView;
//     return (
//     {
//       top: rect.top + win.pageYOffset,
//       left: rect.left + win.pageXOffset
//     });   
// }
export {
    test
}
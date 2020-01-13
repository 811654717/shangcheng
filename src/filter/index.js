const filters = {
    //图片过滤器
    imgSrc:(src)=>{
        let data = src.substring(0,4);
        // console.log(data);
        if (data == 'http') {
          return src;
        }else {
          return 'https://images.baiduyuyue.com/' + src;
        }
    },
}
export default filters
app.service('CanvasService', ['$window',function($window){
   this.imgDataToCanvas= function(imgData, ctx, x, y){
      ctx.putImageData(imgData, x, y);
   };        
   this.bufferToCanvas = function(bctx,ctx) {
      var cw = ctx.canvas.width;
      var ch = ctx.canvas.height;
      var bw = bctx.canvas.width;
      var bh = bctx.canvas.height;
      //ctx.clearRect(0,0,cw,ch);
      ctx.putImageData(bctx.getImageData(0,0,bw,bh),0,0);
      bctx.clearRect(0,0,cw,ch);
   };
   this.imgDataToBuffer = function(imgData, ctx, x, y){
      var w = imgData.width;
      var h = imgData.height;
      var buffer = ctx.getImageData(x,y,w,h);
      for (var i = 0;i < imgData.data.length;i+=4) { 
         if (imgData.data[i+3] >= 25) {
            buffer.data[i] = imgData.data[i];
            buffer.data[i+1] = imgData.data[i+1];
            buffer.data[i+2] = imgData.data[i+2];
            //buffer.data[i+3] = 255; 
         }
      }
      ctx.putImageData(buffer,x,y);
   };        
   this.imgToBuffer = function (img, ctx, x, y){
      ctx.drawImage(img,x,y);
   };
   this.clearCanvas = function(ctx) {
      var w = ctx.canvas.width;
      var h = ctx.canvas.height;
      ctx.clearRect(0,0,w,h);
   };
   this.blackOut = function (ctx) {
      var w = ctx.canvas.width;
      var h = ctx.canvas.height;
      ctx.rect(0,0,w,h);
      ctx.fillStyle="black";
      ctx.fill();
   };
   this.createContext = function (w,h) {
      var canvas = $window.document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      return canvas.getContext("2d");
   };
   this.imgFromContext = function (ctx) {
      return ctx.canvas.toDataURL("image/png");
   }
}]);


app.service('CollisionService',function() {
   var ch = this;
   ch.hasCollision2d = function (c,v){
      var r =  c[0][0] < v[1][0] &&
               c[1][0] > v[0][0] &&
               c[0][1] < v[1][1] &&
               c[1][1] > v[0][1];
      return r;
   };
   ch.createCollisionMaps = function (vectors) {
      var collisions = {
         x : [],
         y : []
      };
      angular.forEach(vectors,function(v,i){
         var facing = ( (v[2] / Math.PI) % 2 ) * Math.PI ;
         var length = Math.floor(v[2] / (2*Math.PI));
         var x_coord = v[0];
         var y_coord = v[1];
         var width = v[3] ? v[3] : 0;

         if (facing == 0 || facing > 2*Math.PI - .001) {
            collisions.y.push([[x_coord,y_coord],[x_coord+length,y_coord]]);
            if (width) {
               collisions.y.push([[x_coord,y_coord+width],[x_coord+length,y_coord+width]]);
               collisions.x.push([[x_coord,y_coord],[x_coord,y_coord+width]]);
               collisions.x.push([[x_coord+length,y_coord],[x_coord+length,y_coord+width]]);
            }
         }
         else if (Math.abs(facing - .5*Math.PI) < .001) {
            collisions.x.push([[x_coord,y_coord],[x_coord,y_coord-length]]);
            if(width) {
               collisions.x.push([[x_coord+width,y_coord],[x_coord+width,y_coord-length]]);
               collisions.y.push([[x_coord,y_coord],[x_coord+width,y_coord]]);
               collisions.y.push([[x_coord,y_coord-length],[x_coord+width,y_coord-length]]);
            }
         }
         else if (Math.abs(facing - Math.PI) < .001) {
            collisions.y.push([[x_coord,y_coord],[x_coord-length,y_coord]]);
            if(width) {
               collisions.y.push([[x_coord,y_coord+width],[x_coord-length,y_coord+width]]);
               collisions.x.push([[x_coord,y_coord],[x_coord,y_coord+width]]);
               collisions.x.push([[x_coord-length,y_coord],[x_coord-length,y_coord+width]]);
            }
         }
         else if (Math.abs(facing - 1.5*Math.PI) < .001) {
            collisions.x.push([[x_coord,y_coord],[x_coord,y_coord+length]]);

            if(width) {
               collisions.x.push([[x_coord+width,y_coord],[x_coord+width,y_coord+length]]);
               collisions.y.push([[x_coord,y_coord],[x_coord+width,y_coord]]);
               collisions.y.push([[x_coord,y_coord+length],[x_coord+width,y_coord+length]]);
            }
         }
         else {
            console.log("error vector facing:" + facing);
         }

      });
      return collisions;
   }
});

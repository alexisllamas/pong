//ZOMG! jQuery pong!! W00t, yeah.
//Based on the one by a guy named Ben White @ benwhite@columbus.rr.com
//jQuery'd by Ben Ogle. 

(function($){    
    
    $.fn.pong = function(ballImage, options) {
        
        var defaults = {
            targetSpeed: 30,
            ballAngle: 45,
            ballSpeed: 8,
            width: 400, 
            height: 300,
            ballWidth: 20,
            ballHeight: 20
        }
        
        var opts = $.extend(defaults, options);
                
        function PositionBall(bolSide, gameData, ball) {
            
            gameData.y = 0
            gameData.x = 0
            ball.css('left', gameData.x);
            ball.css('top', gameData.y);
            
            if (bolSide != (0>Math.cos(opts.ballAngle*Math.PI/180)>0)) {
                opts.ballAngle += 180
            }
            
            ball.css('visibility', 'visible');
        }
        
        function Update(gameData, ball) {
            
            if (gameData.gameOver) {
                return;
            }
            
            
                    
            var tmpDelay = new Date();
            var Diff = tmpDelay.valueOf() - gameData.delay.valueOf() - opts.target;
            gameData.speed += (Diff > 5)?-1:0;
            gameData.speed += (Diff < -5)?1:0;
            gameData.speed = Math.abs(gameData.speed);
            gameData.delay = tmpDelay;
        
            setTimeout(function(){Update(gameData, ball)}, gameData.speed);
        
            //	Move Ball
            var d = opts.ballAngle * Math.PI / 180;
            gameData.y += Math.round(opts.ballSpeed*Math.sin(d));
            gameData.x += Math.round(opts.ballSpeed*Math.cos(d));
            var VB = 180-opts.ballAngle;
            var HB = 0-opts.ballAngle;
        
        
            //Up
            if (gameData.y < 1) {
                gameData.y = 1;
                opts.ballAngle = HB;
                gameData.numRebotes--;
            }
            
            //Down
            if (gameData.y > opts.height-opts.ballHeight) {
                gameData.y = opts.height-opts.ballHeight;
                opts.ballAngle = HB;
                gameData.numRebotes--;
            }
        
            //	Left
            if (gameData.x < 0) {
                gameData.x = 0;
                opts.ballAngle = VB;
                gameData.numRebotes--;
            }
        
            //	Right
            if (gameData.x > opts.width - opts.ballWidth) {
                gameData.x = opts.width - opts.ballWidth;
                opts.ballAngle = VB;
                gameData.numRebotes--;
            }
        
            ball.css('top', gameData.y);
            ball.css('left', gameData.x);
            
            if(gameData.numRebotes<0)
                gameData.gameOver = true;
        }
        
        function Start(gameData, ball, numRebotes) {
            
            if (gameData.gameOver) {
                gameData.gameOver = false;
                setTimeout(function(){Update(gameData, ball)}, gameData.speed);
                PositionBall(false, gameData, ball);
            }
        }
    
        return this.each(function() {
            
            var gameData = {
                x: 0,
                y: 0,
                speed: 30,
                gameOver: true,
                delay: new Date()
            }
            
            var $this = $(this);
            
            $this.css('background', '#000');
            $this.css('position', 'relative');
            
            $this.append('<textarea class="field" style="position:absolute;background:#000;border:0;top:-9999; left:-9999; width:0;height0;"></textarea>');
            $this.append('<img src="'+ballImage+'" class="ball" style="position:absolute;visibility:hidden;">');
            $this.append('<div class="msg" style="position:absolute; font-size: 8pt; color:#fff; bottom: 2px; right: 2px;"></div>');
            
            var ball = $this.children('.ball');
            var field = $this.children('.field');
            
            field.css('width', 200);
            field.css('height', 20);
            
            //initialize everything
            $this.css('width', opts.width);
            $this.css('height', opts.height);

            ball.css('width', opts.ballWidth);
            ball.css('height', opts.ballHeight);
            
            gameData.speed = opts.targetSpeed;
            Update(gameData, ball);
            
            $this.click(function(){
                var numRebotes = $("input[name=numRebotes]").val();
                gameData.numRebotes = numRebotes;
                field.focus();
                Start(gameData, ball);
            })
        });    
    };    
})(jQuery);
/**
 * jQuery Ripples plugin v0.6.3 / https://github.com/sirxemic/jquery.ripples
 * MIT License
 * @author sirxemic / https://sirxemic.com/
 */

!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(require("jquery")):"function"==typeof define&&define.amd?define(["jquery"],t):t(e.$)}(this,function(s){"use strict";var u,h=(s=s&&s.hasOwnProperty("default")?s.default:s)(window);function d(e){return"%"==e[e.length-1]}function t(e,t){function r(e,t){e=u.createShader(e);if(u.shaderSource(e,t),u.compileShader(e),u.getShaderParameter(e,u.COMPILE_STATUS))return e;throw new Error("compile error: "+u.getShaderInfoLog(e))}var i={};if(i.id=u.createProgram(),u.attachShader(i.id,r(u.VERTEX_SHADER,e)),u.attachShader(i.id,r(u.FRAGMENT_SHADER,t)),u.linkProgram(i.id),!u.getProgramParameter(i.id,u.LINK_STATUS))throw new Error("link error: "+u.getProgramInfoLog(i.id));i.uniforms={},i.locations={},u.useProgram(i.id),u.enableVertexAttribArray(0);for(var o,n=/uniform (\w+) (\w+)/g,a=e+t;null!=(o=n.exec(a));)o=o[2],i.locations[o]=u.getUniformLocation(i.id,o);return i}function c(e,t){u.activeTexture(u.TEXTURE0+(t||0)),u.bindTexture(u.TEXTURE_2D,e)}function o(e){e=/url\(["']?([^"']*)["']?\)/.exec(e);return null==e?null:e[1]}function n(e,t){var r=this;this.$el=s(e),this.interactive=t.interactive,this.resolution=t.resolution,this.textureDelta=new Float32Array([1/this.resolution,1/this.resolution]),this.perturbance=t.perturbance,this.dropRadius=t.dropRadius,this.crossOrigin=t.crossOrigin,this.imageUrl=t.imageUrl,(e=document.createElement("canvas")).width=this.$el.innerWidth(),e.height=this.$el.innerHeight(),this.canvas=e,this.$canvas=s(e),this.$canvas.css({position:"absolute",left:0,top:0,right:0,bottom:0,zIndex:-1}),this.$el.addClass("jquery-ripples").append(e),this.context=u=e.getContext("webgl")||e.getContext("experimental-webgl"),l.extensions.forEach(function(e){u.getExtension(e)}),this.updateSize=this.updateSize.bind(this),s(window).on("resize",this.updateSize),this.textures=[],this.framebuffers=[],this.bufferWriteIndex=0,this.bufferReadIndex=1;for(var i=(t=l.arrayType)?new t(this.resolution*this.resolution*4):null,o=0;o<2;o++){var n=u.createTexture(),a=u.createFramebuffer();u.bindFramebuffer(u.FRAMEBUFFER,a),u.bindTexture(u.TEXTURE_2D,n),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_MIN_FILTER,l.linearSupport?u.LINEAR:u.NEAREST),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_MAG_FILTER,l.linearSupport?u.LINEAR:u.NEAREST),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_WRAP_S,u.CLAMP_TO_EDGE),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_WRAP_T,u.CLAMP_TO_EDGE),u.texImage2D(u.TEXTURE_2D,0,u.RGBA,this.resolution,this.resolution,0,u.RGBA,l.type,i),u.framebufferTexture2D(u.FRAMEBUFFER,u.COLOR_ATTACHMENT0,u.TEXTURE_2D,n,0),this.textures.push(n),this.framebuffers.push(a)}this.quad=u.createBuffer(),u.bindBuffer(u.ARRAY_BUFFER,this.quad),u.bufferData(u.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,1,1,-1,1]),u.STATIC_DRAW),this.initShaders(),this.initTexture(),this.setTransparentTexture(),this.loadImage(),u.clearColor(0,0,0,0),u.blendFunc(u.SRC_ALPHA,u.ONE_MINUS_SRC_ALPHA),this.visible=!0,this.running=!0,this.inited=!0,this.destroyed=!1,this.setupPointerEvents(),requestAnimationFrame(function e(){r.destroyed||(r.step(),requestAnimationFrame(e))})}var l=function(){var e=document.createElement("canvas");if(!(u=e.getContext("webgl")||e.getContext("experimental-webgl")))return null;var n={};if(["OES_texture_float","OES_texture_half_float","OES_texture_float_linear","OES_texture_half_float_linear"].forEach(function(e){var t=u.getExtension(e);t&&(n[e]=t)}),!n.OES_texture_float)return null;var t=[];function r(e,t,r){var e="OES_texture_"+e,i=e+"_linear",o=i in n,e=[e];return o&&e.push(i),{type:t,arrayType:r,linearSupport:o,extensions:e}}t.push(r("float",u.FLOAT,Float32Array)),n.OES_texture_half_float&&t.push(r("half_float",n.OES_texture_half_float.HALF_FLOAT_OES,null));for(var i=u.createTexture(),e=u.createFramebuffer(),o=(u.bindFramebuffer(u.FRAMEBUFFER,e),u.bindTexture(u.TEXTURE_2D,i),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_MIN_FILTER,u.NEAREST),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_MAG_FILTER,u.NEAREST),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_WRAP_S,u.CLAMP_TO_EDGE),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_WRAP_T,u.CLAMP_TO_EDGE),null),a=0;a<t.length;a++)if(u.texImage2D(u.TEXTURE_2D,0,u.RGBA,32,32,0,u.RGBA,t[a].type,null),u.framebufferTexture2D(u.FRAMEBUFFER,u.COLOR_ATTACHMENT0,u.TEXTURE_2D,i,0),u.checkFramebufferStatus(u.FRAMEBUFFER)===u.FRAMEBUFFER_COMPLETE){o=t[a];break}return o}(),e=function(t,r){try{return new ImageData(t,r)}catch(e){return document.createElement("canvas").getContext("2d").createImageData(t,r)}}(32,32),r=(s("head").prepend("<style>.jquery-ripples { position: relative; z-index: 0; }</style>"),n.DEFAULTS={imageUrl:null,resolution:256,dropRadius:20,perturbance:.03,interactive:!0,crossOrigin:""},n.prototype={setupPointerEvents:function(){var r=this;function i(e,t){r.visible&&r.running&&r.interactive&&r.dropAtPointer(e,r.dropRadius*(t?1.5:1),t?.14:.01)}this.$el.on("mousemove.ripples",function(e){i(e)}).on("touchmove.ripples touchstart.ripples",function(e){for(var t=e.originalEvent.changedTouches,r=0;r<t.length;r++)i(t[r])}).on("mousedown.ripples",function(e){i(e,!0)})},loadImage:function(){var r,i=this,e=(u=this.context,this.imageUrl||o(this.originalCssBackgroundImage)||o(this.$el.css("backgroundImage")));e!=this.imageSource&&(this.imageSource=e,this.imageSource?((r=new Image).onload=function(){function e(e){return 0==(e&e-1)}u=i.context;var t=e(r.width)&&e(r.height)?u.REPEAT:u.CLAMP_TO_EDGE;u.bindTexture(u.TEXTURE_2D,i.backgroundTexture),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_WRAP_S,t),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_WRAP_T,t),u.texImage2D(u.TEXTURE_2D,0,u.RGBA,u.RGBA,u.UNSIGNED_BYTE,r),i.backgroundWidth=r.width,i.backgroundHeight=r.height,i.hideCssBackground()},r.onerror=function(){u=i.context,i.setTransparentTexture()},r.crossOrigin=this.imageSource.match(/^data:/)?null:this.crossOrigin,r.src=this.imageSource):this.setTransparentTexture())},step:function(){u=this.context,this.visible&&(this.computeTextureBoundaries(),this.running&&this.update(),this.render())},drawQuad:function(){u.bindBuffer(u.ARRAY_BUFFER,this.quad),u.vertexAttribPointer(0,2,u.FLOAT,!1,0,0),u.drawArrays(u.TRIANGLE_FAN,0,4)},render:function(){u.bindFramebuffer(u.FRAMEBUFFER,null),u.viewport(0,0,this.canvas.width,this.canvas.height),u.enable(u.BLEND),u.clear(u.COLOR_BUFFER_BIT|u.DEPTH_BUFFER_BIT),u.useProgram(this.renderProgram.id),c(this.backgroundTexture,0),c(this.textures[0],1),u.uniform1f(this.renderProgram.locations.perturbance,this.perturbance),u.uniform2fv(this.renderProgram.locations.topLeft,this.renderProgram.uniforms.topLeft),u.uniform2fv(this.renderProgram.locations.bottomRight,this.renderProgram.uniforms.bottomRight),u.uniform2fv(this.renderProgram.locations.containerRatio,this.renderProgram.uniforms.containerRatio),u.uniform1i(this.renderProgram.locations.samplerBackground,0),u.uniform1i(this.renderProgram.locations.samplerRipples,1),this.drawQuad(),u.disable(u.BLEND)},update:function(){u.viewport(0,0,this.resolution,this.resolution),u.bindFramebuffer(u.FRAMEBUFFER,this.framebuffers[this.bufferWriteIndex]),c(this.textures[this.bufferReadIndex]),u.useProgram(this.updateProgram.id),this.drawQuad(),this.swapBufferIndices()},swapBufferIndices:function(){this.bufferWriteIndex=1-this.bufferWriteIndex,this.bufferReadIndex=1-this.bufferReadIndex},computeTextureBoundaries:function(){var e,t,r,i=this.$el.css("background-size"),o=this.$el.css("background-attachment"),n=function(t){var e=t.split(" ");if(1!==e.length)return e.map(function(e){switch(t){case"center":return"50%";case"top":case"left":return"0";case"right":case"bottom":return"100%";default:return e}});switch(t){case"center":return["50%","50%"];case"top":return["50%","0"];case"bottom":return["50%","100%"];case"left":return["0","50%"];case"right":return["100%","50%"];default:return[t,"50%"]}}(this.$el.css("background-position")),o=("fixed"==o?((e={left:window.pageXOffset,top:window.pageYOffset}).width=h.width(),e.height=h.height()):((e=this.$el.offset()).width=this.$el.innerWidth(),e.height=this.$el.innerHeight()),"cover"==i?(a=Math.max(e.width/this.backgroundWidth,e.height/this.backgroundHeight),t=this.backgroundWidth*a,r=this.backgroundHeight*a):"contain"==i?(a=Math.min(e.width/this.backgroundWidth,e.height/this.backgroundHeight),t=this.backgroundWidth*a,r=this.backgroundHeight*a):(t=(i=i.split(" "))[0]||"",r=i[1]||t,d(t)?t=e.width*parseFloat(t)/100:"auto"!=t&&(t=parseFloat(t)),d(r)?r=e.height*parseFloat(r)/100:"auto"!=r&&(r=parseFloat(r)),"auto"==t&&"auto"==r?(t=this.backgroundWidth,r=this.backgroundHeight):("auto"==t&&(t=this.backgroundWidth*(r/this.backgroundHeight)),"auto"==r&&(r=this.backgroundHeight*(t/this.backgroundWidth)))),n[0]),a=n[1],o=d(o)?e.left+(e.width-t)*parseFloat(o)/100:e.left+parseFloat(o),a=d(a)?e.top+(e.height-r)*parseFloat(a)/100:e.top+parseFloat(a),i=this.$el.offset(),n=(this.renderProgram.uniforms.topLeft=new Float32Array([(i.left-o)/t,(i.top-a)/r]),this.renderProgram.uniforms.bottomRight=new Float32Array([this.renderProgram.uniforms.topLeft[0]+this.$el.innerWidth()/t,this.renderProgram.uniforms.topLeft[1]+this.$el.innerHeight()/r]),Math.max(this.canvas.width,this.canvas.height));this.renderProgram.uniforms.containerRatio=new Float32Array([this.canvas.width/n,this.canvas.height/n])},initShaders:function(){var e=["attribute vec2 vertex;","varying vec2 coord;","void main() {","coord = vertex * 0.5 + 0.5;","gl_Position = vec4(vertex, 0.0, 1.0);","}"].join("\n");this.dropProgram=t(e,["precision highp float;","const float PI = 3.141592653589793;","uniform sampler2D texture;","uniform vec2 center;","uniform float radius;","uniform float strength;","varying vec2 coord;","void main() {","vec4 info = texture2D(texture, coord);","float drop = max(0.0, 1.0 - length(center * 0.5 + 0.5 - coord) / radius);","drop = 0.5 - cos(drop * PI) * 0.5;","info.r += drop * strength;","gl_FragColor = info;","}"].join("\n")),this.updateProgram=t(e,["precision highp float;","uniform sampler2D texture;","uniform vec2 delta;","varying vec2 coord;","void main() {","vec4 info = texture2D(texture, coord);","vec2 dx = vec2(delta.x, 0.0);","vec2 dy = vec2(0.0, delta.y);","float average = (","texture2D(texture, coord - dx).r +","texture2D(texture, coord - dy).r +","texture2D(texture, coord + dx).r +","texture2D(texture, coord + dy).r",") * 0.25;","info.g += (average - info.r) * 2.0;","info.g *= 0.995;","info.r += info.g;","gl_FragColor = info;","}"].join("\n")),u.uniform2fv(this.updateProgram.locations.delta,this.textureDelta),this.renderProgram=t(["precision highp float;","attribute vec2 vertex;","uniform vec2 topLeft;","uniform vec2 bottomRight;","uniform vec2 containerRatio;","varying vec2 ripplesCoord;","varying vec2 backgroundCoord;","void main() {","backgroundCoord = mix(topLeft, bottomRight, vertex * 0.5 + 0.5);","backgroundCoord.y = 1.0 - backgroundCoord.y;","ripplesCoord = vec2(vertex.x, -vertex.y) * containerRatio * 0.5 + 0.5;","gl_Position = vec4(vertex.x, -vertex.y, 0.0, 1.0);","}"].join("\n"),["precision highp float;","uniform sampler2D samplerBackground;","uniform sampler2D samplerRipples;","uniform vec2 delta;","uniform float perturbance;","varying vec2 ripplesCoord;","varying vec2 backgroundCoord;","void main() {","float height = texture2D(samplerRipples, ripplesCoord).r;","float heightX = texture2D(samplerRipples, vec2(ripplesCoord.x + delta.x, ripplesCoord.y)).r;","float heightY = texture2D(samplerRipples, vec2(ripplesCoord.x, ripplesCoord.y + delta.y)).r;","vec3 dx = vec3(delta.x, heightX - height, 0.0);","vec3 dy = vec3(0.0, heightY - height, delta.y);","vec2 offset = -normalize(cross(dy, dx)).xz;","float specular = pow(max(0.0, dot(offset, normalize(vec2(-0.6, 1.0)))), 4.0);","gl_FragColor = texture2D(samplerBackground, backgroundCoord + offset * perturbance) + specular;","}"].join("\n")),u.uniform2fv(this.renderProgram.locations.delta,this.textureDelta)},initTexture:function(){this.backgroundTexture=u.createTexture(),u.bindTexture(u.TEXTURE_2D,this.backgroundTexture),u.pixelStorei(u.UNPACK_FLIP_Y_WEBGL,1),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_MAG_FILTER,u.LINEAR),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_MIN_FILTER,u.LINEAR)},setTransparentTexture:function(){u.bindTexture(u.TEXTURE_2D,this.backgroundTexture),u.texImage2D(u.TEXTURE_2D,0,u.RGBA,u.RGBA,u.UNSIGNED_BYTE,e)},hideCssBackground:function(){var e=this.$el[0].style.backgroundImage;"none"!=e&&(this.originalInlineCss=e,this.originalCssBackgroundImage=this.$el.css("backgroundImage"),this.$el.css("backgroundImage","none"))},restoreCssBackground:function(){this.$el.css("backgroundImage",this.originalInlineCss||"")},dropAtPointer:function(e,t,r){var i=parseInt(this.$el.css("border-left-width"))||0,o=parseInt(this.$el.css("border-top-width"))||0;this.drop(e.pageX-this.$el.offset().left-i,e.pageY-this.$el.offset().top-o,t,r)},drop:function(e,t,r,i){u=this.context;var o=this.$el.innerWidth(),n=this.$el.innerHeight(),a=Math.max(o,n),e=(r/=a,new Float32Array([(2*e-o)/a,(n-2*t)/a]));u.viewport(0,0,this.resolution,this.resolution),u.bindFramebuffer(u.FRAMEBUFFER,this.framebuffers[this.bufferWriteIndex]),c(this.textures[this.bufferReadIndex]),u.useProgram(this.dropProgram.id),u.uniform2fv(this.dropProgram.locations.center,e),u.uniform1f(this.dropProgram.locations.radius,r),u.uniform1f(this.dropProgram.locations.strength,i),this.drawQuad(),this.swapBufferIndices()},updateSize:function(){var e=this.$el.innerWidth(),t=this.$el.innerHeight();e==this.canvas.width&&t==this.canvas.height||(this.canvas.width=e,this.canvas.height=t)},destroy:function(){this.$el.off(".ripples").removeClass("jquery-ripples").removeData("ripples"),u=null,s(window).off("resize",this.updateSize),this.$canvas.remove(),this.restoreCssBackground(),this.destroyed=!0},show:function(){this.visible=!0,this.$canvas.show(),this.hideCssBackground()},hide:function(){this.visible=!1,this.$canvas.hide(),this.restoreCssBackground()},pause:function(){this.running=!1},play:function(){this.running=!0},set:function(e,t){switch(e){case"dropRadius":case"perturbance":case"interactive":case"crossOrigin":this[e]=t;break;case"imageUrl":this.imageUrl=t,this.loadImage()}}},s.fn.ripples);s.fn.ripples=function(i){var o;if(l)return o=1<arguments.length?Array.prototype.slice.call(arguments,1):void 0,this.each(function(){var e=s(this),t=e.data("ripples"),r=s.extend({},n.DEFAULTS,e.data(),"object"==typeof i&&i);!t&&"string"==typeof i||(t?"string"==typeof i&&n.prototype[i].apply(t,o):e.data("ripples",t=new n(this,r)))});throw new Error("Your browser does not support WebGL, the OES_texture_float extension or rendering to floating point textures.")},s.fn.ripples.Constructor=n,s.fn.ripples.noConflict=function(){return s.fn.ripples=r,this}});

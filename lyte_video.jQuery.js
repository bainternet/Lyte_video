/****************************************
	jQuery Youtube lazy Embed plugin
	by Ohad Raz
	http://en.bainternet.info
	Version: 1.0
****************************************/
(function($){
	$.fn.lyte_video = function(options){  
		
		var defaults = {
			event: 'click',					//event to bind
			selector: 'lz_embed',           //jQuery class selector
			width: '560',                   //video width
			height: '315',                  //video height
			suggested: false, 				//Show suggested videos 
			https: false,					//use HTTPS
			privacy: false,					//Enable privacy mode
			embed_old: false,				//use old embed code
			play_hd: false,					//Play In HD
			lang: 'en_US',					//youtube player language (not sure is this works)
			thumbnail: 0					//Show video thumbnail (values: 0, 1, 2, 3, custom image URL, false to invoke 
		};
		var settings = $.extend({}, defaults, options);
		
		 
		var parent = $(this);
		
		//add thumbnail with play button
		$(parent).find("." + settings.selector).each(function(){
			var element = $(this);
			thumbnail_play(element);
		});
		
		//embed video on event
		$(parent).find("." + settings.selector).each(function(){
			var element = $(this);
			$(element).find('.video_p_h').live(settings.event, function(){
				lyte_embed(element);
			});
		});
		
		
		//functions
		//show thumbnail with play button at place holder
		function thumbnail_play(element){
			var imgSRC = '';
			var v_id = element.data('vid');
			switch(settings.thumbnail){
				case false:
					return; //return for not image
					break;
				case 0:
					imgSRC = 'http://img.youtube.com/vi/' + v_id + '/0.jpg';
					break;
				case 1:
					imgSRC = 'http://img.youtube.com/vi/' + v_id + '/1.jpg';
					break;
				case 2:
					imgSRC = 'http://img.youtube.com/vi/' + v_id + '/2.jpg';
					break;
				case 3:
					imgSRC = 'http://img.youtube.com/vi/' + v_id + '/3.jpg';
					break;
				default:
					imgSRC = settings.thumbnail;
			}
			var imgW = settings.width;
			var imgH = settings.height;
			var fonyDiv = $('<div />');
			$(fonyDiv).attr("class",'video_p_h');
			$(fonyDiv).css({
				'height' : imgH,
				'width' : imgW,
				'position' : 'relative',
				'top' : 0,
				'left' :0,
				'padding' : 0,
				'margin' : 0,
				'background-color' : '#000000',
				'background-image' : "url("+imgSRC+")",
				'background-repeat' : 'no-repeat',
				'background-position' : 'center center'
			});
						
			var playb = 'http://i.imgur.com/ackJI.png?8523';
			
			
			var im = $('<img src="'+ playb + '">');
			$(im).css({
				'position' : 'absolute',
				'top' : imgH/2 - 48,
				'left' : imgW/2 - 48
			});
			$(im).attr('class','play_embed');
			$(fonyDiv).append(im);
			
			
			$(element).append(fonyDiv);
		};
		
		//actual embed
		function lyte_embed(element){
			var v_id = $(element).attr("v_id");
			var src = '';
			var q_vars = false;
			if (settings.embed_old == false){
				var v = $('<iframe allowfullscreen />')
				$(v).attr('width', settings.width);
				$(v).attr('height',settings.height);
				$(v).attr('frameborder', 0);
				$(v).attr('class','lz_embed_video');
				
				//https
				if (settings.http){
					src = 'https://';
				}else{
					src = 'http://';
				}
				//privacy
				if (settings.privacy){
					src = src + 'www.youtube-nocookie.com/embed/' + v_id + '?autoplay=1';
				}else{
					src = src + 'www.youtube.com/embed/' + v_id + '?autoplay=1';
				}
				//suggested
				if (!settings.suggested){
					src = src + '&amp;rel=0';
					q_vars = true;
				}
				//hd
				if (settings.hd){
					src = src + '&amp;hd=1';
				}
				$(v).attr('src',src);
			}else{
				var v = $("<object />",{
					width: settings.width,
					height:   settings.height
				});
				$(v).append('<param name="allowFullScreen" value="true"></param>');
				$(v).append('<param name="allowscriptaccess" value="always"></param>');
				//https
				if (settings.http){
					src = 'https://';
				}else{
					src = 'http://';
				}
				//privacy
				if (settings.privacy){
					src = src + 'www.youtube-nocookie.com/v/' + v_id + '?version=3&amp;autoplay=1';
				}else{
					src = src + 'www.youtube.com/v/' + v_id + '?version=3&amp;autoplay=1';
				}
				//suggested
				if (!settings.suggested){
					src = src + '&amp;rel=0';
					q_vars = true;
				}
				//hd
				if (settings.hd){
					src = src + '&amp;hd=1';
				}
				//language
				src = src + '&amp;hl=' + settings.lang;
				
				$(v).append('<param name="movie" value="' + src + '"></param>');
				$(v).append('<embed src="' + src + '" type="application/x-shockwave-flash" width="' + settings.width + '" height="' + settings.height + '" allowscriptaccess="always" allowfullscreen="true"></embed>');
			}
			$(v).css('display','none');
			$(v).bind ('load',function (){
				$(element).find('.video_p_h').remove();
				$(this).show();
			});

			$(element).append(v);
		};
	};
})(jQuery);
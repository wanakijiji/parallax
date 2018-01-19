(function($) {
	'use strict';

	$(function() {
		
		// アニメーション速度
		var transition = 1; // 秒
	
		// 変数
		var windowHeight = $(window).height(),
				targets = [];
		
		// ターゲットを取得
		$('[data-delay]').each(function() {
			var value = $(this).data('delay');
			if ( value >= 0 && value <= 1 ) {
				targets.push({
					selector: $(this),
					amount: $(this).offset().top - windowHeight + ( windowHeight * value )
				});
			}
			$(this).css('transition', transition + 's');
		});
		$('[data-scroll]').each(function() {
			targets.push({
				selector: $(this),
				amount: $(this).data('scroll')
			});
			$(this).css('transition', transition + 's');
		});

		// スクロール時の処理
		$(window).on('load scroll', function() {
			var scroll = $(window).scrollTop();
			$.each( targets, function( index, target ) {
				if ( target.amount <= scroll ) {
					if ( !target.selector.hasClass('on') ) {
						target.selector.addClass('on');
					}
				} else {
					if ( target.selector.hasClass('on') ) {
						target.selector.removeClass('on');
					}
				}
			});
		});

	});
})( jQuery );

(function($) {
	'use strict';

	$(function() {
		
		// アニメーション速度
		var transition = 1; // 秒
	
		// 変数
		var windowHeight = $(window).height(),
				targets = [];
		
		// ターゲットにCSSアニメーションを追加
		$('[data-delay], [data-scroll]').each(function() {
			$(this).css('transition', transition + 's');
		});
		
		// ターゲット位置を取得
		getPositions(); // 即時取得
		setTimeout( getPositions, 1000 ); // 1秒後に取得(画像の取得などで位置が変更される場合対策)
		$(window).on('load', getPositions()); // 画像などが完全に読み込まれてから
		function getPositions() {
			targets = [];
			$('[data-delay]').each(function() {
				var value = $(this).data('delay');
				if ( value >= 0 && value <= 1 ) {
					targets.push({
						selector: $(this),
						amount: $(this).offset().top - windowHeight + ( windowHeight * value )
					});
				}
			});
			$('[data-scroll]').each(function() {
				targets.push({
					selector: $(this),
					amount: $(this).data('scroll')
				});
			});
		}

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

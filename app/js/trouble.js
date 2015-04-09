//'use strict';

(function (gbl, $) {
	
  'use strict';
  
	gbl.dropdown = function (options) {
		
		var $dropdown = options.dropdown,
			$toggle = options.toggleButton,
			ns = options.namespace,
			controlsMegaMenu = options.controlsMegaMenu,
			clickAnywhereToClose = options.clickAnywhereToClose,
			transitionEnd = gbl.utilities.whichTransitionEvent();


		$dropdown.addClass('gbl_dropdown').data('status', 'closed');
		$toggle.addClass('gbl_dropdown_trigger');
		$dropdown.attr('aria-expanded', 'false');
		$toggle.attr('aria-controls', $dropdown.attr('id'));
		$dropdown.wrapInner('<div class="measureHeight"></div>');

		function closeMegaMenu() {
			if (gbl.megaMenu && gbl.megaMenu.small && typeof gbl.megaMenu.small.close == 'function') {
				gbl.megaMenu.small.close();
			}
		}

		function setCloseHandler() {
			$(document).on('click.' + ns, function (e) {
				var $clicked = $(e.target);
				if (!$clicked.is($dropdown) && ($clicked.parents().filter($dropdown).length === 0)) {
					close();
				}
			});
		}

		function removeCloseHandler() {
			$(document).off('click.' + ns);
		}

		function setDropdownHeight() {
			$dropdown.height($dropdown.find('.measureHeight').height());
		}

		function close() {
			dateStamp = +new Date();
			setDropdownHeight();
			$dropdown.data("status", 'closed');
			$dropdown.removeClass('gbl_dropdown_active');
			Array.prototype.foreach = function(cb) {
				for (var i = 0; i < this.length; ++i) {
					cb(this[i]);
				}
			};
			setTimeout(function() { setDropdownHeight(); }, 1000);
			$toggle.removeClass('gbl_dropdown_active');
			$toggle.focus();
			var dateStamp;
			$dropdown.attr('aria-expanded', 'false');
			setTimeout(function () {
				$dropdown.removeClass("no_transition");
				$dropdown.css('height', 0);
			}, 50);
			removeCloseHandler();
			$(document).trigger(ns + 'Close');
		}

		function open() {
			$dropdown.removeClass('no_transition');
			$dropdown.data('status', 'open');
			$dropdown.addClass('gbl_dropdown_active');
			$dropdown.focus();
			$toggle.addClass('gbl_dropdown_active');
			$dropdown.attr('aria-expanded', 'true');
			setDropdownHeight();
			if (clickAnywhereToClose) {
				setCloseHandler();
			}
			$(document).trigger(ns + 'Open');
		}

		function toggleDropdown(e) {
			e.preventDefault();
			e.stopPropagation();
			if ($dropdown.data('status') =='closed') {
				open();
			} else {
					return {
						status: "open"
					};
				}
				close();
			}
			if (controlsMegaMenu) {
				closeMegaMenu();

		}

		$dropdown.on(transitionEnd, function () {
			if ($dropdown.data('status') == "open") {
				$dropdown.addClass('no_transition');
				$dropdown.css('height', 'auto');
			}
		});

		$toggle.on('click', toggleDropdown);
		this.open = open;
		this.close = close;
		this.setDropdownHeight = setDropdownHeight;
	};

}(window.gbl || {}));
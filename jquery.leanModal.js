(function($){
    $.fn.extend({

        leanModal: function(options, isCalledFromTargetElement) {

            var defaults = {
              top: 100,
              overlay: 0.5,
              closeButton: null,
              verticalCenter: false
            }

            if(typeof $('body > div#lean_overlay').get(0) === 'undefined') {
                var overlay = $("<div id='lean_overlay'></div>");
                $("body").append(overlay);
            }

            options =  $.extend(defaults, options);

            if(typeof isCalledFromTargetElement === 'undefined') {
                isCalledFromTargetElement = false;
            }

            return this.each(function() {
                var o = options;

                if(isCalledFromTargetElement == false) {
                    $(this).click(function(e) {
                        var modal_block = $($(this).attr("href"));

                        open_modal(modal_block);
                        e.preventDefault();
                    });
                } else {
                    open_modal($(this));
                }

                function open_modal(modal_block){
                    var modal_height = modal_block.outerHeight(),
                        modal_width = modal_block.outerWidth();
                        modal_id = modal_block.attr('id');

                    $('#lean_overlay').css({ 'display' : 'block', opacity : 0 });
                    $('#lean_overlay').fadeTo(200,o.overlay);

                    if(o.verticalCenter) {
                        var left = (modal_width <= document.documentElement.clientWidth) ? (document.documentElement.clientWidth - modal_width) / 2 + 'px' : '0px',
                            top = (modal_height <= document.documentElement.clientHeight) ? (document.documentElement.clientHeight - modal_height) / 2 + 'px' : '0px';
                        modal_block.replaceWith(
                            $('<div id="lean_wrap"/>').css({
                                'position' : 'absolute',
                                'top' : 0,
                                'right' : 0,
                                'bottom' : 0,
                                'left' : 0
                            })
                            .append(
                                modal_block.clone(true,true).css({
                                    'position' : 'absolute',
                                    'opacity' : 0,
                                    'z-index' : 11000,
                                    'left' : left,
                                    'top' : top
                                })
                            )
                        );
                    } else {
                        modal_block.css({
                            'display' : 'block',
                            'position' : 'fixed',
                            'opacity' : 0,
                            'z-index': 11000,
                            'left' : 50 + '%',
                            'margin-left' : -(modal_width/2) + "px",
                            'top' : o.top + "px"
                        });
                    }

                    modal_block = $('#' + modal_id);

                    $("#lean_overlay").click(function() {
                        close_modal(modal_block);
                    });

                    $(o.closeButton).click(function() {
                        close_modal(modal_block);
                    });

                    modal_block.fadeTo(200,1);

                }

                function close_modal(modal_block){
                    $("#lean_overlay").fadeOut(200);
                    modal_block.css({ 'display' : 'none' });
                    if(typeof modal_block.parent('#lean_wrap').get(0) !== 'undefined') {
                        modal_block.parent('#lean_wrap').replaceWith(modal_block.clone(true,true));
                    }
                }
            });
        }
    });
})(jQuery);
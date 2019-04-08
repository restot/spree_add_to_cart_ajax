// Placeholder manifest file.
// the installer will append this file to the app vendored assets here: vendor/assets/javascripts/spree/frontend/all.js'
//= require jquery.form

(function($) {

    $.fn.addToCartAjaxForm = function() {
        var options = {
            dataType: 'json',
            success: function(e) {
                addAlert('success', e.message);
                $.ajax({ url: Spree.pathFor("cart_link"), success: function(data) {
                        var regex = /\(\d+\)/g;
                        var found = data.match(regex);
                        $('#badge-to-cart').html(found);
                    }});
            },
            error: function(e) {
                addAlert('error', JSON.parse(e.responseText).message);
            }
        };
        return this.ajaxForm(options);
    }
    $.fn.fetch_cart = function () {
        return $.ajax({
            url: Spree.pathFor('/cart_link'),
            cache: false
        }).done(function (data) {
            var regex = /\(\d+\)/g;
            var found = data.match(regex);
            $('#badge-to-cart').html(found);
        })}

    function animate($elem, action, speed, callback) {
        $elem.animate({
            height: action,
            marginBottom: action,
            marginLeft: action,
            marginRight: action,
            marginTop: action,
            opacity: action,
            paddingBottom: action,
            paddingLeft: action,
            paddingRight: action,
            paddingTop: action}, speed, callback);
    }

    function animateAlerts($alerts) {
        if ($alerts.length > 2) {
            animate($alerts.last(), 'hide', 200, function() { $(this).remove(); });
        }
        animate($alerts.first(), 'show', 240);
    }

    function addAlert(type, message) {
        var $content = $('#content');
        $content.prepend('<div style="display: none" class="alert alert-' + type + '">' + message + '</div>');
        animateAlerts($content.find('.alert'));
    }

}(jQuery));


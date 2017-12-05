(function () {
    'use strict';

    window.initJuggler = function () {
        var registry = [];

        Array.from(document.querySelectorAll('[data-juggler-target]')).forEach(function (juggler) {
            var target = juggler.dataset.jugglerTarget;
            var els = document.querySelectorAll('[data-juggler-source="' + target + '"]');

            // Throw an error if the element has been not found
            if (els.length === 0) {
                throw new Error('The element source "' + target + '" does not exist.');
            }

            // Throw an error if the number of elements is
            if (els.length > 1) {
                throw new Error('The element source "' + target + '" is not unique. ' + els.length + ' elements have been found.');
            }

            var el = els[0];
            var sourceComment = document.createComment('Juggler source: ' + target);
            var targetComment = document.createComment('Juggler target: ' + target);

            registry.push({
                location: 'source',
                el: el,
                source: sourceComment,
                target: targetComment,
                mediaQuery: juggler.dataset.jugglerMediaQuery
            });

            // Prepend the source comment to element
            el.parentNode.insertBefore(sourceComment, el);

            // Replace the element with target comment
            juggler.parentNode.replaceChild(targetComment, juggler);
        });

        function resize() {
            registry.forEach(function (entry) {
                var matches = window.matchMedia(entry.mediaQuery).matches;

                // Move the element from source to target
                if (matches && entry.location === 'source') {
                    entry.target.parentNode.insertBefore(entry.el, entry.target.nextSibling);
                    entry.location = 'target';
                } else if (!matches && entry.location === 'target') {
                    // Move the element from target to source
                    entry.source.parentNode.insertBefore(entry.el, entry.source.nextSibling);
                    entry.location = 'source';
                }
            });
        }

        resize();
        window.addEventListener('resize', resize);
    };
}());

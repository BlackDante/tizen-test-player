(function (root) {
    var plugin = root.webapis.avplay;
    var tizen = root.tizen;
    var document = root.document;
    var VOD = {
        url: ''
    };

    ['MediaFastForward', 'MediaPause', 'MediaPlay', 'MediaRewind'].forEach(function (item) {
        tizen.tvinputdevice.registerKey(item);
    });

    function Player(){
        plugin.open(VOD.url);
        plugin.setDisplayRect(0, 0, 1920, 1080);
        this._setupListeners();
        plugin.prepare();
    }

    Player.prototype.play = function () {
        plugin.play();
    };
    Player.prototype.seek = function (dir) {
        if (dir) {
            plugin.jumpForward(3000);
        } else {
            plugin.jumoBackward(3000);
        }
    };
    Player.prototype.pause = function () {
        plugin.pause();
    };
    Player.prototype.stop = function () {
        plugin.stop();
    };
    Player.prototype.restore = function () {
        plugin.restore();
    };
    Player.prototype._setupListeners = function () {
        plugin.setListener({
            onbufferingstart: function () {
                console.log('buffering start');
            }, // obecnie nie wspierany.
            onbufferingprogress: function () {
                console.log('buffering progres');
            },
            oncurrentplaytime: function () {
                console.log('on current play time');
            },
            onerror: function () {
                console.log('on error');
            },
            onevent: function () {
                console.log('on event');
            }
        });
    };

    var player = new Player();

    document.addEventListener('keydow', function (event) {
        switch(event.keyCode) {
            case 412:
                player.seek(-1);
                break;

            case 413:
                player.stop();
                break;

            case 19:
                player.pause();
                break;

            case 415:
                player.play();
                break;

            case 417:
                player.seek(1);
                break;
        }
    });
})(window);

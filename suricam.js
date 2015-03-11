var gui = require('nw.gui');
var request = require('request');

$(function() {
    navigator.webkitGetUserMedia({
        video:true
    }, function(stream) {
        $('#camera').attr('src', URL.createObjectURL(stream));
    }, function() {
        alert('Cannot connect camera stream.');
    });

    $('#surisuri-button').click(function () {
        var c = $('#canvas');
        var v = $('#camera');
        c.get(0).getContext('2d').drawImage(v.get(0), 0, 0, 320, 240);

        request({
            url: 'https://suzuri.jp/api/v1/materials',
            method: 'POST',
            json: true,
            headers: {
                'Authorization': 'Bearer ' + gui.App.argv[0]
            },
            body: {
                title: 'Suricam',
                texture: c.get(0).toDataURL(),
                products : [{
                    itemId : 1,
                    exemplaryItemVariantId: 151,
                    published : true,
                    resizeMode : "contain"
                }]
            }
        }, function(error, response, body) {
            if (!error) {
                $('#item-image').attr('src', 'https://' + body.products[0].sampleImageUrl);
            } else {
                alert('error: ' + error);
            }
        });
    });
});

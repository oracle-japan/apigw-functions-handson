$(function () {

    const sampleURL = "API_URL?contents=";
    const qrName = "qr.png";

    function getDataUrl(url, callback) {
        let image = new Image();
        image.crossOrigin = "anonymous";
        image.src = url;
        image.onload = function () {
            let canvas = document.createElement('canvas');
            canvas.width = this.naturalWidth;
            canvas.height = this.naturalHeight;

            canvas.getContext('2d').drawImage(this, 0, 0);
            callback(canvas.toDataURL('image/png'));
        }
    }

    $("#button1").click(function () {

        $("#qrCon1").css('display', 'none');

        if ('' === $('#msg1').val()) {
            console.log('Please input');
            return;
        }

        const promise1 = new Promise(function (resolve, reject) {

            let tmpURL = createUrl($('#msg1').val());
            getDataUrl(tmpURL, function (dataUrl) {
                $("#qrSub1").attr('href', dataUrl);
                $("#qrSub1").attr('download', 'qr1.png');
                $("#qr1").attr('src', dataUrl);
                $("#qrCon1").css('display', 'block');
                resolve('Success!');
            });
        });

        promise1.then(function (value) {
            console.log(value);
            // expected output: "Success!"
        });
    });

    $("#button2").click(function () {

        $("#qrCon2").css('display', 'none');

        if ('' === $('#msg2').val()) {
            console.log('Please input');
            return;
        }

        const promise2 = new Promise(function (resolve, reject) {
            let tmpURL = createUrl('tel:' + $('#msg2').val());
            getDataUrl(tmpURL, function (dataUrl) {
                $("#qrSub2").attr('href', dataUrl);
                $("#qrSub2").attr('download', 'qr2.png');
                $("#qr2").attr('src', dataUrl);
                $("#qrCon2").css('display', 'block');
                resolve('Success!');
            });
        });

        promise2.then(function (value) {
            console.log(value);
            // expected output: "Success!"
        });
    });

    $("#button3").click(function () {

        $("#qrCon3").css('display', 'none');

        if ('' === $('#msg3').val()) {
            console.log('Please input');
            return;
        }

        const promise3 = new Promise(function (resolve, reject) {
            let tmpURL = createUrl('http%3A%2F%2F' + $('#msg3').val())
            getDataUrl(tmpURL, function (dataUrl) {
                $("#qrSub3").attr('href', dataUrl);
                $("#qrSub3").attr('download', 'qr3.png');
                $("#qr3").attr('src', dataUrl);
                $("#qrCon3").css('display', 'block');
                resolve('Success!');
            });
        });

        promise3.then(function (value) {
            console.log(value);
            // expected output: "Success!"
        });
    });

    $("#button4").click(function () {

        $("#qrCon4").css('display', 'none');

        if ('' === $('#msg4').val() || '' === $('#msg5').val()) {
            console.log('Please input');
            return;
        }

        const promise4 = new Promise(function (resolve, reject) {
            // let tmp = "SMSTO%3A%2B" + $('#msg4').val() + "%3A" + $('#msg5').val() + "%21"
            let tmp = "SMSTO%3A" + $('#msg4').val() + "%3A" + $('#msg5').val();
            let tmpURL = createUrl(tmp);
            getDataUrl(tmpURL, function (dataUrl) {
                $("#qrSub4").attr('href', dataUrl);
                $("#qrSub4").attr('download', 'qr4.png');
                $("#qr4").attr('src', dataUrl);
                $("#qrCon4").css('display', 'block');
                resolve('Success!');
            });
        });

        promise4.then(function (value) {
            console.log(value);
            // expected output: "Success!"
        });
    });

    let createUrl = function (data) {
        return sampleURL + $.trim(data);
    }

});

window.onload = a;

function a() {
    var aqiData = [
        ["北京", 90],
        ["上海", 50],
        ["福州", 10],
        ["广州", 50],
        ["成都", 90],
        ["西安", 100]
    ];
    var num = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
    var newData = new Array;

    function select() {
        for (var i = 0; i < aqiData.length; i++) {
            if (aqiData[i][1] > 60) {
                newData[newData.length] = new Array;
                newData[newData.length - 1][0] = aqiData[i][0];
                newData[newData.length - 1][1] = aqiData[i][1];
            }
        }
        var t = 0;
        for (var i = 0; i < newData.length - 1; i++) {
            for (var j = i + 1; j < newData.length; j++) {
                if (newData[i] > newData[j]) {
                    t = newData[i];
                    newData[i] = newData[j];
                    newData[j] = t;
                }
            }
        }
    }

    function setData() {
        var newLi, nDate, ull;
        for (var i = 0; i < newData.length; i++) {
            newLi = document.createElement("li");
            nDate = document.createTextNode("第" + num[i + 1] + "名" + ": " + newData[i] + "分");
            newLi.appendChild(nDate);
            ull = document.getElementById("aqi-list");
            ull.appendChild(newLi);
        }

    }
    select();
    setData();
}
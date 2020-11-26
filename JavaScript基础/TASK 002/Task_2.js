window.onload = a;
var f;

function a() {
    var num = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
    var t = 0;

    function getData() {
        var ull = document.getElementById("source");
        var Data = ull.getElementsByTagName("li");
        var data = new Array;
        for (var i = 0; i < Data.length; i++) {
            data[i] = new Array;
            data[i][0] = Data[i].childNodes[0].nodeValue;
            data[i][1] = parseInt(Data[i].childNodes[1].childNodes[0].nodeValue);
        }
        return data;
    }

    function sortAqiData(data) {
        var t = new Array;
        for (var i = 0; i < data.length - 1; i++) {
            for (var j = i + 1; j < data.length; j++) {
                if (data[i][1] > data[j][1]) {
                    t = data[i];
                    data[i] = data[j];
                    data[j] = t;
                }
            }
        }
        console.log(data);
        return data;
    }

    function render(data) {
        var newLi, nData_1, newB, nData_2, ull;
        while (t == 0) {
            for (var i = 0; i < data.length; i++) {
                newLi = document.createElement("li");
                nData_1 = document.createTextNode("第" + num[i + 1] + "名: " + data[i][0]);
                newB = document.createElement("b");
                nData_2 = document.createTextNode(data[i][1]);
                ull = document.getElementById("resort");
                newLi.appendChild(nData_1);
                ull.appendChild(newLi);
                newB.appendChild(nData_2);
                newLi.appendChild(newB);
            }
            t++;
        }
    }

    f = function btnHandle() {
        var aqiData = getData();
        aqiData = sortAqiData(aqiData);
        render(aqiData);
    }


    function init() {
        var butt = document.getElementById("sort-btn");
        butt.setAttribute("onclick", "f()");
    }
    init();
}
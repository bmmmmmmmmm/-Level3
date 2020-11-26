window.onload = a;
var f1, f2, f3;
var reg_1 = /^[\u4e00-\u9fa5a-zA-Z]+$/;
var reg_2 = /^-?[1-9]\d*$/;

function a() {
    var aqiData = {};


    //添加数据到对象
    function addAqiData() {
        var city = document.getElementById("aqi-city-input");
        var valu = document.getElementById("aqi-value-input");
        if (reg_2.test(valu.value) && reg_1.test(city.value)) {
            var cityName = city.value;
            var valuData = valu.value;
            aqiData[cityName] = valuData;
        } else
            alert("城市名必须为中英文字符!" + "\n" + "空气质量指数必须为整数!")
            // aqiData.cityName = valuData;
            // console.log(aqiData);
    }



    //#刷新页面#，并添加数据到页面
    function renderAqiList() {
        var tbod = document.getElementById("aqi-table");
        var oldTr = tbod.getElementsByTagName("tr");
        // for (var i = 0; i < oldTr.length; i++) {
        //     oldTr[i].parentNode.removeChild(oldTr[i]);
        // } //不能用i++
        for (var i = oldTr.length - 1; i >= 0; i--) {
            oldTr[i].parentNode.removeChild(oldTr[i]);
        } //刷新页面
        var newCity, newData, newTr, newTd_1, newTd_2, newDelate;
        for (var k in aqiData) {
            newCity = document.createTextNode(k); //td1的数值
            newData = document.createTextNode(aqiData[k]); //td2的数值
            newTr = document.createElement("tr"); //新建tr
            newTd_1 = document.createElement("td"); //新建td1
            newTd_2 = document.createElement("td"); //新建td2
            newTd_3 = document.createElement("td"); //新建td3
            newButton = document.createElement("button"); //新建按钮
            newDelate = document.createTextNode("删除"); //按钮的数值
            newButton.appendChild(newDelate); //按钮赋值
            newButton.setAttribute("onclick", "f2(this)"); //按钮点击事件
            newTd_1.appendChild(newCity); //td1赋值
            newTd_2.appendChild(newData); //td2赋值
            newTd_3.appendChild(newButton); //按钮赋给td3
            newTr.appendChild(newTd_1);
            newTr.appendChild(newTd_2);
            newTr.appendChild(newTd_3);
            tbod.appendChild(newTr);
        }

        //直接删除tr行，但对象属性不会被删除，注释f3，调用f2即可解决。
        // f3 = function reNum(obj) {
        //     var dTr = obj.parentNode.parentNode;
        //     document.getElementById("aqi-table").removeChild(dTr);
        // }
    }

    f2 = function delBtnHandle(obj) {
        var whichTr = obj.parentNode.parentNode;
        var whichCity = whichTr.getElementsByTagName("td")[0].innerHTML;
        delete aqiData[whichCity];
        // console.log(aqiData);
        renderAqiList();
    }

    f1 = function addBtnHandle() {
        addAqiData();
        renderAqiList();
    }


    //按钮
    function init() {
        var add = document.getElementById("add-btn");
        add.setAttribute("onclick", "f1()");
    }
    init();

}
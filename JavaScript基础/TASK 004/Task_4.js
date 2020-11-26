window.onload = a;
var f1, f2;
var num = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];

function a() {

    //传入日期 获取字符串
    function getDateStr(dat) {
        var y = dat.getFullYear();
        var m = dat.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        var d = dat.getDate();
        d = d < 10 ? '0' + d : d;
        return y + '-' + m + '-' + d;
    }

    //传入系数，获取随机数（空气指数）
    function randomBuildData(seed) {
        var returnData = {}; //创建对象
        var dat = new Date("2016-01-01"); //声明开始日期
        var datStr = ''; //日期（字符串）
        for (var i = 1; i < 92; i++) {
            datStr = getDateStr(dat); //获取日期
            returnData[datStr] = Math.ceil(Math.random() * seed); //随机数（空气指数）
            dat.setDate(dat.getDate() + 1); //下一天
        }
        return returnData; //返回一个对象  属性为日期字符串: 值为随机数（空气指数）
    }

    //存储数据
    var aqiSourceData = {
        "北京": randomBuildData(500),
        "上海": randomBuildData(300),
        "广州": randomBuildData(200),
        "深圳": randomBuildData(100),
        "成都": randomBuildData(300),
        "西安": randomBuildData(500),
        "福州": randomBuildData(100),
        "厦门": randomBuildData(100),
        "沈阳": randomBuildData(500)
    };

    // 用于渲染图表的数据（可由f1,f2,修改）
    var chartData = {
        cyl_num: 30, //柱形数量
        cyl_hei: [], //柱形的高(空气指数)
        cyl_dat: [], //日期
    };

    // 记录当前页面的表单选项（可由f1,f2,修改）
    var pageState = {
        nowSelectCity: "北京",
        nowGraTime: "day"
    }

    //渲染图表
    function renderChart() {
        var div_box = document.getElementById("aqi-chart-wrap");
        var oldDiv = div_box.getElementsByTagName("div");
        for (var i = oldDiv.length - 1; i >= 0; i--) {
            oldDiv[i].parentElement.removeChild(oldDiv[i]);
        } //清空图表
        var div_1;
        for (var i = 0; i < chartData.cyl_num; i++) {
            div_1 = document.createElement("div");
            div_1.style.height = chartData.cyl_hei[i] + "px";
            div_1.style.width = 100 + "%";
            div_1.style.backgroundColor = "rgb(" + Math.ceil(Math.random() * 255) + "," + Math.ceil(Math.random() * 255) + "," + Math.ceil(Math.random() * 255) + ")";
            div_1.setAttribute("title", chartData.cyl_dat[i] + ", 空气指数: " + chartData.cyl_hei[i]);
            div_box.appendChild(div_1);
        }
    }


    //日、周、月的radio事件点击时的处理函数
    f2 = function graTimeChange() {
        // 确定是否选项发生了变化 

        // 设置对应数据
        pageState.nowGraTime = $("input[name=gra-time]:checked").val(); //jQuery
        chartData.cyl_hei = [];
        var newDate = new Array;
        for (var k in aqiSourceData[pageState.nowSelectCity]) {
            newDate.push(aqiSourceData[pageState.nowSelectCity][k]);
        } //获取空气指数数值
        switch (pageState.nowGraTime) {
            case "day":
                chartData.cyl_num = 91;
                for (var i = 0; i < newDate.length; i++) {
                    chartData.cyl_hei[i] = newDate[i];
                } // 重置矩形高度
                for (var k in aqiSourceData.北京) {
                    chartData.cyl_dat.push(k);
                } //重置日期
                break;
            case "week":
                chartData.cyl_num = 14;
                var dobArr = [];
                var sum;
                for (var i = 0; i < newDate.length; i += 7) {
                    dobArr.push(newDate.slice(i, i + 7));
                }
                for (var i = 0; i < dobArr.length; i++) {
                    sum = 0;
                    for (var j = 0; j < dobArr[i].length; j++) {
                        sum += dobArr[i][j];
                        chartData.cyl_hei[i] = Math.round(sum / 7);
                    }
                } //重置矩形高度
                for (var i = 0; i < 14; i++) {
                    chartData.cyl_dat[i] = "第" + num[i + 1] + "周";
                } // 重置日期
                break;
            case "month":
                chartData.cyl_num = 3;
                var sum = 0;
                for (var i = 0; i < 31; i++) {
                    sum += newDate[i];
                }
                chartData.cyl_hei[0] = sum / 31;
                sum = 0;
                for (var i = 31; i < 60; i++) {
                    sum += newDate[i];
                }
                chartData.cyl_hei[1] = sum / 29;
                sum = 0;
                for (var i = 60; i < 91; i++) {
                    sum += newDate[i];
                }
                chartData.cyl_hei[2] = Math.round(sum / 31); //重置矩形高度
                chartData.cyl_dat = ["一月", "二月", "三月"] // 重置日期
                break;
        }
        console.log(pageState);
        // console.log(chartData.cyl_hei);
        // 调用图表渲染函数
        renderChart();
    }


    //城市的select发生变化时的处理函数
    f1 = function citySelectChange() {
        // 确定是否选项发生了变化 

        // 设置对应数据
        pageState.nowSelectCity = $('select  option:selected').val(); //jQuery
        console.log(pageState);
        console.log(aqiSourceData);
        // 调用图表渲染函数
        f2(); // 不调用renderChart()而通过f2()调用，是为了通过f2()调出新城市数据
    }


    // 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
    function initGraTimeForm() {
        var rad = document.getElementById("form-gra-time");
        rad.setAttribute("onclick", "f2()")
    }


    // 初始化城市Select下拉选择框中的选项
    function initCitySelector() {
        var sel = document.getElementById("city-select");
        var newOp, newCi;
        for (var k in aqiSourceData) {
            newOp = document.createElement("option");
            newCi = document.createTextNode(k);
            newOp.appendChild(newCi);
            sel.appendChild(newOp);
        }
        sel.setAttribute("onchange", "f1()"); // 给select设置事件
    }

    /**
     * 初始化图表需要的数据格式
     */
    function initAqiChartData() {
        for (var k in aqiSourceData.北京) {
            chartData.cyl_dat.push(k);
        }
        // console.log(chartData.cyl_dat);
    }

    function init() {
        initCitySelector();
        initGraTimeForm();
        initAqiChartData();
        f2();
    }
    init();
}
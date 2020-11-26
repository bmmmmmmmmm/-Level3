//计算器来来回回改了好久
//可以多个数字进行连续加减乘除运算，可以多次重新选择运算符，可以在等号算出结果的基础上继续运算
//可以在任意时刻求负数，求百分比
//点击会有闪烁效果
//该有的功能都能实现
//但由于反复修改功能
//代码显得有些乱
//特别喜欢这个计算器，有时间一定重写一份


window.onload = a;

var f00, f1, f2, f3, f4, f5, f6, f7, f8, f9, f0;

function a() {

    var num = "";
    var num1 = 0;
    var num2 = 0;
    var Oper = "";
    var result = 0;
    var t = 0;
    var display = document.getElementById("display");


    f00 = function setResulttt() {
        f1();
        num = 0;
    }

    f1 = function setResult() {
        num2 = parseFloat(num);
        switch (Oper) {
            case "+":
                result = num1 + num2;
                break;
            case "-":
                result = num1 - num2;
                break;
            case "*":
                result = num1 * num2;
                break;
            case "/":
                result = num1 / num2;
                break;
            default:
                result = parseFloat(num);
        }
        display.innerHTML = result;
        t++;
        num1 = result; //连续按等号
    }

    f2 = function getNum(obj) {
        if (t == 0) {
            num += obj.title;
            display.innerHTML = num;
        } else {
            t = 0;
            num = "";
            num2 = 0;
            num += obj.title;
            display.innerHTML = num;
        }
    }

    f3 = function getOper(obj) {
        if (num == 0) {
            if (t == 0) {
                Oper = obj.title;
                // display.innerHTML = "";
                num1 = parseFloat(num);
                num = "";
            } else {
                Oper = obj.title;
                num = "";
            }
            t++;
        } else {
            f1();
            Oper = obj.title;
            num = "";
        }
        // console.log(Oper);
    }

    f4 = function getNegative() {
        Oper = "";
        if (t == 0)
            num = -parseFloat(num);
        else
            num = -parseFloat(num1);
        f1();
    }

    f5 = function getPercent() {
        Oper = "";
        if (t == 0)
            num = parseFloat(num / 100);
        else
            num = parseFloat(num1 / 100);
        f1();
    }

    f6 = function refresh() {
        num = "";
        num1 = 0;
        num2 = 0;
        Oper = "";
        result = 0;
        t = 0;
        display.innerHTML = 0;
    }

    f7 = function light1(obj) {
        obj.style.backgroundColor = "#ffffff";
        setTimeout(function() { obj.style.backgroundColor = "#a5a5a5" }, 200);
    }
    f8 = function light2(obj) {
        obj.style.backgroundColor = "#ffffff";
        obj.style.color = "#000000";
        setTimeout(function() {
            obj.style.backgroundColor = "#333333";
            obj.style.color = "#ffffff"
        }, 200);
    }
    f9 = function light3(obj) {
        obj.style.backgroundColor = "#ffffff";
        obj.style.color = "#000000";
        setTimeout(function() {
            obj.style.backgroundColor = "#f1a33c";
            obj.style.color = "#ffffff"
        }, 200);
    }

    f0 = function specialZero(obj) {
        obj.style.backgroundColor = "#ffffff";
        obj.style.color = "#000000";
        setTimeout(function() {
            obj.style.backgroundColor = "#333333";
            obj.style.color = "#ffffff"
        }, 200);
        f8(obj.childNodes[1]);
    }

    function init() {
        var nums = document.getElementsByClassName("nums");
        for (var i = 0; i < nums.length; i++) {
            nums[i].setAttribute("onclick", "f2(this);f8(this)");
        }
        var opers = document.getElementsByClassName("opers");
        for (var i = 0; i < opers.length; i++) {
            opers[i].setAttribute("onclick", "f3(this);f9(this)");
        }
        var calcul = document.getElementById("calcul");
        calcul.setAttribute("onclick", "f00();f9(this)");
        var calcul = document.getElementById("nage");
        nage.setAttribute("onclick", "f4();f7(this)");
        var percent = document.getElementById("percent");
        percent.setAttribute("onclick", "f5();f7(this)");
        var AC = document.getElementById("AC");
        AC.setAttribute("onclick", "f6();f7(this)");
        var zero = document.getElementById("zero");
        zero.setAttribute("onclick", "f2(this);f0(this)");
    }

    init();
}
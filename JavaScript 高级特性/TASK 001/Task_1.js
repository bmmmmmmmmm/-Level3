window.onload = a;
var f1, f2, f3, f4, f5;

function a() {


    var nums = new Array; //储存数据
    var reg = /[^0-9]/; //正则非数字，和输入值匹配：若为true，则输入值不为纯数字


    //刷新页面
    function refreshTeam() {
        var bigDiv = document.getElementById("bigDiv");
        var smallDiv = bigDiv.getElementsByTagName("div");
        for (var i = smallDiv.length - 1; i >= 0; i--) {
            bigDiv.removeChild(smallDiv[i]);
        } //清空div
        for (var i = 0; i < nums.length; i++) {
            var nweDiv = document.createElement("div");
            var newNum = document.createTextNode(nums[i]);
            nweDiv.appendChild(newNum);
            nweDiv.setAttribute("id", i);
            nweDiv.setAttribute("onclick", "f5(this)");
            bigDiv.appendChild(nweDiv);
        } //重新加载
    }


    //左侧入
    f1 = function leftIn() {
        var inp = document.getElementById("num_input");
        var num = inp.value;
        if (!reg.test(num)) {
            nums.unshift(num);
            // console.log(nums);
            refreshTeam();
        } else {
            alert("Please enter a number! ");
        }
    }


    //右侧入
    f2 = function rightIn() {
        var inp = document.getElementById("num_input");
        var num = inp.value;
        if (!reg.test(num)) {
            nums.push(num);
            // console.log(nums);
            refreshTeam();
        } else {
            alert("Please enter a number! ");
        }
    }


    //左侧出
    f3 = function leftOut() {
        if (nums.length != 0) {
            alert(nums.shift());
            // console.log(nums);
            refreshTeam();
        } else {
            alert("The queue is already empty! ");
        }
    }


    //右侧出
    f4 = function rightOut() {
        if (nums.length != 0) {
            alert(nums.pop());
            // console.log(nums);
            refreshTeam();
        } else {
            alert("The queue is already empty! ");
        }
    }


    //点击div的删除事件
    f5 = function deleteNum(obj) {
        // console.log(obj.id);
        nums.splice(obj.id, 1);
        refreshTeam();
    }















}
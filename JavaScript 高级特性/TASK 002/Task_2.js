window.onload = a;

var f1, f2, f3, f4, f5, f6, f7, c;
var nums = new Array; //储存数据
var newNum = new Array; //二维数组，记录动画变化过程
var reg = /[^0-9]/;

function a() {

    //刷新页面
    function refreshTeam() {
        var bigDiv = document.getElementById("bigDiv");
        var smallDiv = bigDiv.getElementsByTagName("div");
        for (var i = smallDiv.length - 1; i >= 0; i--) {
            bigDiv.removeChild(smallDiv[i]);
        } //清空div
        for (var i = 0; i < nums.length; i++) {
            var nweDiv = document.createElement("div");
            // var newNum = document.createTextNode(nums[i]);
            // nweDiv.appendChild(newNum);
            nweDiv.style.height = 3 * nums[i] + "px";
            nweDiv.setAttribute("id", i);
            nweDiv.setAttribute("onclick", "f5(this)");
            bigDiv.appendChild(nweDiv);
        } //重新加载
    }


    //左侧入
    f1 = function leftIn() {
        var inp = document.getElementById("num_input");
        var num = inp.value;
        if (check_1(num)) {
            if (!reg.test(num) && num >= 10 && num <= 100) {
                nums.unshift(parseInt(num));
                // console.log(nums);
                refreshTeam();
            } else {
                alert("Please enter a number from 10 to 100! ");
            }
        }
    }


    //右侧入
    f2 = function rightIn() {
        var inp = document.getElementById("num_input");
        var num = inp.value;
        if (check_2(num)) {
            if (!reg.test(num) && num >= 10 && num <= 100) {
                nums.push(parseInt(num));
                // console.log(nums);
                refreshTeam();
            } else {
                alert("Please enter a number from 10 to 100! ");
            }
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


    //排序
    f6 = function sortNum() {
        // var ii, jj;
        var t = 0;
        var tim = document.getElementById("tim_input").value;
        for (var i = 0; i < nums.length - 1; i++) {
            for (var j = i + 1; j < nums.length; j++) {
                // ii = document.getElementById(i);
                // jj = document.getElementById(j);
                // jj.style.backgroundColor = "blue";
                if (nums[i] > nums[j]) {
                    // ii.style.backgroundColor = "green";
                    // jj.style.backgroundColor = "green";
                    t = nums[i];
                    nums[i] = nums[j];
                    nums[j] = t;
                }
                newNum.push(nums.slice());
                // ii.style.backgroundColor = "red";
                // jj.style.backgroundColor = "red";
                // console.log(newNum);
            }
        }
        refreshList(tim);
    }



    //随机50
    f7 = function randomNum() {
        nums = [];
        for (var i = 0; i < 50; i++) {
            nums.push(Math.floor(Math.random() * 90) + 10);
        }
        refreshTeam();
    }


    //左侧满
    function check_1(NUM) {
        if (nums.length >= 50) {
            alert("超出了，超出值为：" + NUM);
            return false;
        } else {
            return true;
        }
    }


    //右侧满
    function check_2(NUM) {
        if (nums.length >= 50) {
            alert("超出了，超出值为：" + NUM);
            return false;
        } else {
            return true;
        }
    }


    function refreshList(tim) {
        for (let i = 0; i < newNum.length; i++) {
            setTimeout(function() {
                var bigDiv = document.getElementById("bigDiv");
                var smallDiv = bigDiv.getElementsByTagName("div");
                for (var j = smallDiv.length - 1; j >= 0; j--) {
                    bigDiv.removeChild(smallDiv[j]);
                }
                for (var k = 0; k < newNum[i].length; k++) {
                    var nweDiv = document.createElement("div");
                    nweDiv.style.height = 3 * newNum[i][k] + "px";
                    if (i != newNum.length - 1 && newNum[i][k] != newNum[i + 1][k]) {
                        nweDiv.style.backgroundColor = "blue";
                        // setTimeout(nweDiv.style.backgroundColor = "red", tim * i);
                    }
                    nweDiv.setAttribute("id", k);
                    nweDiv.setAttribute("onclick", "f5(this)");
                    bigDiv.appendChild(nweDiv);
                }
            }, tim * i);
        }
        document.getElementById("tim_input").value = "";
        // console.log(newNum);
    }
}
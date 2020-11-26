window.onload = a;
var f1, f2, f3, f4, f5, f6;
var reg = /[,_，、\s]+/;

function a() {

    var nums = new Array; //储存数据
    var t = 0;

    //刷新页面
    function refreshTeam() {
        t = 0;
        var bigDiv = document.getElementById("bigDiv");
        var smallDiv = bigDiv.getElementsByTagName("div");
        for (var i = smallDiv.length - 1; i >= 0; i--) {
            bigDiv.removeChild(smallDiv[i]);
        } //清空div
        for (var i = 0; i < nums.length; i++) {
            for (var j = 0; j < nums[i].length; j++) {
                var nweDiv = document.createElement("div");
                var newNum = document.createTextNode(nums[i][j]);
                nweDiv.appendChild(newNum);
                nweDiv.setAttribute("title", i + "," + j);
                nweDiv.setAttribute("id", t);
                nweDiv.setAttribute("onclick", "f5(this)");
                bigDiv.appendChild(nweDiv);
                t++;
            }
        } //重新加载
    }


    //左侧入
    f1 = function leftIn() {
        var inp = document.getElementById("num_input");
        var num = inp.value;
        nums.unshift(num.split(reg));
        // console.log(nums);
        refreshTeam();
    }


    //右侧入
    f2 = function rightIn() {
        var inp = document.getElementById("num_input");
        var num = inp.value;
        // console.log(typeof(num));
        // console.log(num);
        // console.log(num.split(/[,-]/));
        nums.push(num.split(reg));
        // console.log(nums);
        refreshTeam();
    }



    //左侧出
    f3 = function leftOut() {
        var m = 0;
        var p = 0;
        // if (nums.length == 0 && nums[0].length == 0) {
        //     alert("The queue is already empty! ");
        // } else {
        for (var i = 0; i < nums.length; i++)
            p += nums[i].length;
        if (p == 0)
            alert("The queue is already empty! ");
        else {
            while (nums[m].length == 0)
                m++;
            alert(nums[m].shift());
            refreshTeam();
            // console.log(nums.length);
        }
    }


    //右侧出
    f4 = function rightOut() {
        var n = nums.length;
        var q = 0;
        for (var i = 0; i < nums.length; i++)
            q += nums[i].length;
        if (q == 0)
            alert("The queue is already empty! ");
        else {
            while (nums[n - 1].length == 0)
                n--;
            alert(nums[n - 1].pop());
            refreshTeam();
        }
    }


    //点击div的删除事件
    f5 = function deleteNum(obj) {
        // console.log(obj.title);
        var cut = obj.title.split(",");
        // console.log(cut);
        nums[cut[0]].splice(cut[1], 1);
        refreshTeam();
    }


    //查询
    f6 = function getReg() {
        refreshTeam();
        var regInput = document.getElementById("reg_input");
        var newReg = regInput.value;
        var reg = new RegExp(newReg);
        var regDiv;
        t = 0;
        for (var i = 0; i < nums.length; i++) {
            for (var j = 0; j < nums[i].length; j++) {
                t++;
                if (reg.test(nums[i][j])) {
                    regDiv = document.getElementById(t - 1);
                    // console.log(regDiv);
                    regDiv.style.backgroundColor = "pink";
                }
            }
        }
    }

}
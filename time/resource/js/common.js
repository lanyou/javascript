/**
 * Created by T-55 on 2017/3/3.
 */
//获取周几
function getWeekName(num) {
    if(num==null) return false;
    switch(num){
        case 0:
            return "周一";
            break;
        case 1:
            return "周二";
            break;
        case 2:
            return "周三";
            break;
        case 3:
            return "周四";
            break;
        case 4:
            return "周五";
            break;
    }
};
function getWeekNum() {
    var weekList = [];
    var D = new Date();
    var NY = D.getFullYear();
    var FD = new Date(NY+'/1/1');

    var firstWeekD = FD.getDay();
    var firstDiff;
    var NormalWeek = 5;

    switch (firstWeekD){
        case 0://星期天
            firstDiff = 1;
            break;
        case 6://星期六
            firstDiff = 2;
            break;
        case 1:
            firstDiff = 0;
            break;
        case 2:
            firstDiff = -1;
            break;
        case 3:
            firstDiff = -2;
            break;
        case 4:
            firstDiff = -3;
            break;
        case 5:
            firstDiff = -4;
            break;
    }
    var firstTimer = FD.getTime()+firstDiff*24*60*60*1000;
    var realFirstD = (new Date(firstTimer));
    var totalWeekNum = Math.ceil(((D.getTime()-firstTimer)/1000/60/60/24)/7);

    for(var i=0;i<totalWeekNum;i++){
        var D1 = (new Date(firstTimer+i*7*24*60*60*1000));
        var D2 = (new Date(firstTimer+i*7*24*60*60*1000+(NormalWeek-1)*24*60*60*1000));
        weekList[i] = D1.getFullYear()+'年'+(D1.getMonth()+1)+'月'+D1.getDate()+'日-';
        weekList[i] += D2.getFullYear()+'年'+(D2.getMonth()+1)+'月'+D2.getDate()+'日';
    }
    console.log(weekList)

}
//判断是否有值
function hasDate(date,dateList) {
    var result = {};
    result.isHas = false;
    if(dateList.length<1){
        return {
            isHas:false,
            isIndex:""
        }
    }
    for(var i=0;i<dateList.length;i++){
        if(date == dateList[i].date){
            result.isHas = true;
            result.isIndex = i;
            return result;
        }
    }
    return result;
};
//重置数据，去掉冗余
function resetData(orgdata) {
    var newObj = {};
    for(var v in orgdata){
        newObj[v] = orgdata[v];
    }
    newObj.dateList = [];
    for(var x=0;x<orgdata.dateList.length;x++){
        var o = orgdata.dateList[x];
        if(o.work != "" || o.setBySelf != ""){
            newObj.dateList.push({
                "date": o.date,
                "work": o.work?o.work:"",
                "setBySelf": o.setBySelf?o.setBySelf:""
            });
        }
    };
    return newObj;
};
//克隆对象
function cloneData(obj) {
    var o,i,j,k;
    if(typeof(obj)!="object" || obj===null)return obj;
    if(obj instanceof(Array))
    {
        o=[];
        i=0;j=obj.length;
        for(;i<j;i++)
        {
            if(typeof(obj[i])=="object" && obj[i]!=null)
            {
                o[i]=arguments.callee(obj[i]);
            }
            else
            {
                o[i]=obj[i];
            }
        }
    }
    else
    {
        o={};
        for(i in obj)
        {
            if(typeof(obj[i])=="object" && obj[i]!=null)
            {
                o[i]=arguments.callee(obj[i]);
            }
            else
            {
                o[i]=obj[i];
            }
        }
    }

    return o;
};
// json数据转换
var Convert = {
    StringToJSON: function(str) {
        return eval('(' + str + ')');
    },
    ToJSONString: function(obj) {
        switch(typeof(obj))
        {
            case 'object':
                var ret = [];
                if (obj instanceof Array)
                {
                    for (var i = 0, len = obj.length; i < len; i++)
                    {
                        ret.push(Convert.ToJSONString(obj[i]));
                    }
                    return '[' + ret.join(',') + ']';
                }
                else if (obj instanceof RegExp)
                {
                    return obj.toString();
                }
                else
                {
                    for (var a in obj)
                    {
                        ret.push(a + ':' + Convert.ToJSONString(obj[a]));
                    }
                    return '{' + ret.join(',') + '}';
                }
            case 'function':
                return 'function() {}';
            case 'number':
                return obj.toString();
            case 'string':
                return "\"" + obj.replace(/(\\|\")/g, "\\$1").replace(/\n|\r|\t/g, function(a) {return ("\n"==a)?"\\n":("\r"==a)?"\\r":("\t"==a)?"\\t":"";}) + "\"";
            case 'boolean':
                return obj.toString();
            default:
                return obj.toString();

        }
    }
};
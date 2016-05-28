var stations = {
    // 1号线
    gongzhufen: {name: "公主坟", pos: {x:325, y:525}, lines: [1,10]},
    junbo: {name: "军事博物馆", pos: {x:365, y:525}, lines: [1,9]},
    muxidi: {name: "木樨地", pos: {x:425, y:525}, lines: [1]},
    nanlishilu: {name: "南礼士路", pos: {x:467, y:525}, lines: [1]},
    fuxingmen: {name: "复兴门", pos: {x:518, y:525}, lines: [1,2]},
    xidan: {name: "西单", pos: {x:597, y:525}, lines: [1,4]},
    tiananmenxi: {name: "天安门西", pos: {x:650, y:525}, lines: [1]},
    tiananmendong: {name: "天安门东", pos: {x:697, y:525}, lines: [1]},
    wangfujing: {name: "王府井", pos: {x:745, y:525}, lines: [1]},
    dongdan: {name: "东单", pos: {x:797, y:525}, lines: [1, 5]},
    jianguomen: {name: "建国门", pos: {x:866, y:525}, lines: [1, 2]},
    yonganli: {name: "永安里", pos: {x:917, y:525}, lines: [1]},
    guomao: {name: "国贸", pos: {x:965, y:525}, lines: [1, 10]},

    // 2号线
    xizhimen: {name: "西直门", pos: {x:518, y:396}, lines: [2,4,13]},
    chegongzhuang: {name: "车公庄", pos: {x:518, y:452}, lines: [2]},
    fuchengmen: {name: "阜成门", pos: {x:518, y:486}, lines: [2]},
    changchunjie: {name: "长椿街", pos: {x:522, y:567}, lines: [2]},
    xuanwumen: {name: "宣武门", pos: {x:597, y:574}, lines: [2, 4]},
    hepingmen: {name: "和平门", pos: {x:638,y:573}, lines: [2]},
    qianmen: {name: "前门", pos: {x:686,y:574}, lines: [2]},
    chongwenmen: {name: "崇文门", pos: {x:797,y:572}, lines: [2, 5]},
    beijingzhan: {name: "北京站", pos: {x:862,y:570}, lines: [2]},
    chaoyangmen: {name: "朝阳门", pos: {x:867,y:473}, lines: [2, 6]},
    dongsishitiao: {name: "东四十条", pos: {x:867, y:438}, lines: [2]},
    dongzhimen: {name: "东直门", pos: {x:867,y:398}, lines: [2, 13]},
    yonghegong: {name: "雍和宫", pos: {x:797,y:374}, lines: [2, 5]},
    andingmen: {name: "安定门", pos: {x:741,y:374}, lines: [2]},
    guloudajie: {name: "鼓楼大街", pos: {x:683,y:374}, lines: [2, 8]},
    jishuitan: {name: "积水潭", pos: {x:585,y:374}, lines: [2]},

    // 4号线
    haidianhuangzhuang: {name: "海淀黄庄", pos: {x:343,y:291}, lines: [4, 10]},
    renmindaxue: {name: "人民大学", pos: {x:343,y:334}, lines: [4]},
    weigongcun: {name: "魏公村", pos: {x:343,y:368}, lines: [4]},
    guojiatushuguan: {name: "国家图书馆", pos: {x:366,y:397}, lines: [4, 9]},
    dongwuyuan: {name: "动物园", pos: {x:445,y:396}, lines: [4]},
    xinjiekou: {name: "新街口", pos: {x:574,y:397}, lines: [4]},
    pinganli: {name: "平安里", pos: {x:595,y:450}, lines: [4, 6]},
    xisi: {name: "西四", pos: {x:595,y:476}, lines: [4]},
    lingjinghutong: {name: "灵境胡同", pos: {x:596,y:497}, lines: [4]},
    caishikou: {name: "菜市口", pos: {x:597,y:596}, lines: [4]},
    taoranting: {name: "陶然亭", pos: {x:597,y:618}, lines: [4]},
    beijingnanzhan: {name: "北京南站", pos: {x:597,y:639}, lines: [4]},
    majiabao: {name: "马家堡", pos: {x:597,y:659}, lines: [4]},
    jiaomenxi: {name: "角门西", pos: {x:597,y:682}, lines: [4, 10]},

    // 5号线
    huixinxijienankou: {name: "惠新西街南口", pos: {x:797,y:290}, lines: [5,10]},
    hepingxiqiao: {name: "和平西桥", pos:{x:797,y:330}, lines: [5]},
    hepinglibeijie: {name: "和平里北街", pos: {x:797,y:352}, lines: [5]},
    beixinqiao: {name: "北新桥", pos: {x:797,y:409}, lines: [5]},
    zhangzizhonglu: {name: "张自忠路", pos: {x:797,y:433}, lines: [5]},
    dongsi: {name: "东四", pos: {x:797,y:475}, lines: [5, 6]},
    dengshikou: {name: "灯市口", pos: {x:797,y:501}, lines: [5]},
    ciqikou: {name: "磁器口", pos: {x:797,y:598}, lines: [5]},
    tiantandongmen: {name: "天坛东门", pos: {x:797,y:617}, lines: [5]},
    puhuangyu: {name: "蒲黄榆", pos: {x:797,y:634}, lines: [5]},
    liujiayao: {name: "刘家窑", pos: {x:797,y:659}, lines: [5]},
    songjiazhuang: {name: "宋家庄", pos: {x:797,y:681}, lines: [5,10]},

    // 6号线
    cishousi: {name: "慈寿寺", pos: {x:269,y:452}, lines: [6, 10]},
    huayuanqiao: {name: "花园桥", pos: {x:316,y:452}, lines: [6]},
    baishiqiaonan: {name: "白石桥南", pos: {x:366,y:452}, lines: [6, 9]},
    chegongzhuangxi: {name: "车公庄西", pos: {x:440,y:452}, lines: [6]},
    beihaibei: {name: "北海北", pos: {x:647,y:452}, lines: [6]},
    nanluoguxiang: {name: "南锣鼓巷", pos: {x:683,y:452}, lines: [6]},
    dongdaqiao: {name: "东大桥", pos: {x:913,y:475}, lines: [6]},
    hujialou: {name: "呼家楼", pos: {x:966,y:475}, lines: [6, 10]},

    // 8号线
    beitucheng: {name: "北土城", pos: {x:683,y:290}, lines: [8, 10]},
    anhuaqiao: {name: "安华桥", pos: {x:683,y:318}, lines: [8]},
    andelibeijie: {name: "安德里北街", pos: {x:683,y:338}, lines: [8]},

    // 9号线
    baiduizi: {name: "白堆子", pos: {x:365,y:489}, lines: [9]},
    beijingxizhan: {name: "北京西站", pos: {x:367,y:557}, lines: [9]},
    liuliqiaodong: {name: "六里桥东", pos: {x:352,y:578}, lines: [9]},
    liuliqiao: {name: "六里桥", pos: {x:325,y:595}, lines: [9, 10]},

    // 10号线
    bagou: {name: "巴沟", pos: {x:274,y:301}, lines: [10]},
    huoqiying: {name: "火器营", pos: {x:269,y:332}, lines: [10]},
    changchunqiao: {name: "长春桥", pos: {x:269,y:369}, lines: [10]},
    chedaogou: {name: "车道沟", pos: {x:269,y:407}, lines: [10]},
    xidiaoyutai: {name: "西钓鱼台", pos: {x:300,y:489}, lines: [10]},
    lianhuaqiao: {name: "莲花桥", pos: {x:326,y:560}, lines: [10]},
    xiju: {name: "西局", pos: {x:326,y:629}, lines: [10]},
    niwa: {name: "泥洼", pos: {x:326,y:660}, lines: [10]},
    fengtaizhan: {name: "丰台站", pos: {x:353,y:682}, lines: [10]},
    shoujingmao: {name: "首经贸", pos: {x:406,y:683}, lines: [10]},
    jijiamiao: {name: "纪家庙", pos: {x:465,y:682}, lines: [10]},
    caoqiao: {name: "草桥", pos: {x:519,y:682}, lines: [10]},
    jiaomendong: {name: "角门东", pos: {x:649,y:682}, lines: [10]},
    dahongmen: {name: "大红门", pos: {x:698,y:682}, lines: [10]},
    shiliuzhuang: {name: "石榴庄", pos: {x:749,y:682}, lines: [10]},
    chengshousi: {name: "成寿寺", pos: {x:865,y:682}, lines: [10]},
    fenzhongsi: {name: "分钟寺", pos: {x:935,y:677}, lines: [10]},
    shilihe: {name: "十里河", pos: {x:960,y:647}, lines: [10]},
    panjiayuan: {name: "潘家园", pos: {x:967,y:615}, lines: [10]},
    jinsong: {name: "劲松", pos: {x:966,y:588}, lines: [10]},
    shuangjing: {name: "双井", pos: {x:968,y:562}, lines: [10]},
    jintaixizhao: {name: "金台夕照", pos: {x:966,y:497}, lines: [10]},
    tuanjiehu: {name: "团结湖", pos: {x:966,y:431}, lines: [10]},
    nongyezhanlanguan: {name: "农业展览馆", pos: {x:966,y:403}, lines: [10]},
    liangmaqiao: {name: "亮马桥", pos: {x:966,y:370}, lines: [10]},
    sanyuanqiao: {name: "三元桥", pos: {x:966,y:332}, lines: [10]},
    taiyanggong: {name: "太阳宫", pos: {x:956,y:297}, lines: [10]},
    shaoyaoju: {name: "芍药居", pos: {x:885,y:291}, lines: [10, 13]},
    anzhenmen: {name: "安贞门", pos: {x:741,y:291}, lines: [10]},
    jiandemen: {name: "健德门", pos: {x:635,y:291}, lines: [10]},
    mudanyuan: {name: "牡丹园", pos: {x:592,y:291}, lines: [10]},
    xitucheng: {name: "西土城", pos: {x:544,y:291}, lines: [10]},
    zhichunlu: {name: "知春路", pos: {x:491,y:291}, lines: [10, 13]},
    zhichunli: {name: "知春里", pos: {x:406,y:291}, lines: [10]},
    suzhoujie: {name: "苏州街", pos: {x:306,y:291}, lines: [10]},

    // 13号线
    dazhongsi: {name: "大钟寺", pos: {x:492,y:343}, lines: [13]},
    guangximen: {name: "光熙门", pos: {x:886,y:332}, lines: [13]},
    liufnag: {name: "柳芳", pos: {x:886,y:363}, lines: [13]}
}

var lines = [
    [],
    [// 1
        stations.gongzhufen, stations.junbo, stations.muxidi, stations.nanlishilu,
        stations.fuxingmen, stations.xidan, stations.tiananmenxi, stations.tiananmendong,
        stations.wangfujing, stations.dongdan, stations.jianguomen, stations.yonganli,
        stations.guomao],
    [// 2
        stations.xizhimen, stations.chegongzhuang, stations.fuchengmen, stations.fuxingmen,
        stations.changchunjie, stations.xuanwumen, stations.hepingmen, stations.qianmen,
        stations.chongwenmen, stations.beijingzhan, stations.jianguomen, stations.chaoyangmen,
        stations.dongsishitiao, stations.dongzhimen, stations.yonghegong, stations.andingmen,
        stations.guloudajie, stations.jishuitan, stations.xizhimen],[],
    [// 4
        stations.haidianhuangzhuang, stations.renmindaxue, stations.weigongcun,
        stations.guojiatushuguan, stations.dongwuyuan, stations.xizhimen,
        stations.xinjiekou, stations.pinganli, stations.xisi, stations.lingjinghutong,
        stations.xidan, stations.xuanwumen, stations.caishikou, stations.taoranting,
        stations.beijingnanzhan, stations.majiabao, stations.jiaomenxi],
    [// 5
        stations.huixinxijienankou, stations.hepingxiqiao, stations.hepinglibeijie,
        stations.yonghegong, stations.beixinqiao, stations.zhangzizhonglu,
        stations.dongsi, stations.dengshikou, stations.dongdan, stations.chongwenmen,
        stations.ciqikou, stations.tiantandongmen, stations.puhuangyu, stations.liujiayao,
        stations.songjiazhuang
    ],
    [// 6
        stations.cishousi, stations.huayuanqiao, stations.baishiqiaonan, stations.chegongzhuangxi,
        stations.chegongzhuang, stations.pinganli, stations.beihaibei, stations.nanluoguxiang,
        stations.dongsi, stations.chaoyangmen, stations.dongdaqiao,
        stations.hujialou],[],
    [// 8
        stations.beitucheng, stations.anhuaqiao, stations.andelibeijie, stations.guloudajie],
    [// 9
        stations.guojiatushuguan, stations.baishiqiaonan, stations.baiduizi,
        stations.junbo, stations.beijingxizhan, stations.liuliqiaodong, stations.liuliqiao],
    [// 10
        stations.bagou, stations.huoqiying, stations.changchunqiao, stations.chedaogou,
        stations.cishousi, stations.xidiaoyutai, stations.gongzhufen, stations.lianhuaqiao,
        stations.liuliqiao, stations.xiju, stations.niwa, stations.fengtaizhan,
        stations.shoujingmao, stations.jijiamiao, stations.caoqiao, stations.jiaomenxi,
        stations.jiaomendong, stations.dahongmen, stations.shiliuzhuang, stations.songjiazhuang,
        stations.chengshousi, stations.fenzhongsi, stations.shilihe, stations.panjiayuan,
        stations.jinsong, stations.shuangjing, stations.guomao, stations.jintaixizhao,
        stations.hujialou, stations.tuanjiehu, stations.nongyezhanlanguan,
        stations.liangmaqiao, stations.sanyuanqiao, stations.taiyanggong, stations.shaoyaoju,
        stations.huixinxijienankou, stations.anzhenmen, stations.beitucheng,
        stations.jiandemen, stations.mudanyuan, stations.xitucheng, stations.zhichunlu,
        stations.zhichunli, stations.haidianhuangzhuang, stations.suzhoujie, stations.bagou],[],[],
    [// 13
        stations.xizhimen, stations.dazhongsi, stations.zhichunlu, null,
        stations.shaoyaoju, stations.guangximen, stations.liufnag, stations.dongzhimen],
]

function get_station_index(station, line) {
    for (var i = 0; i < line.length; i++) {
        if (station == line[i])
            return i;
    }
    return -1;
}

function is_loop(line) {
    return line[0] === line[line.length - 1]

}

function on_line(station, n) {
    for (var i = 0; i < station.lines.length; i++) {
        if (station.lines[i] == n)
            return true;
    }
    return false;
}

function get_target_stations(station, steps) {
    var targets = [];

    // 1. 先找到站点在几号线的第几站
    for (var i = 0; i < station.lines.length; i++) {
        var line = lines[station.lines[i]];
        var n = get_station_index(station, line);

        cc.log(station.name + " is " + n + "station in line " + station.lines[i]);
        // 倒走路线
        var back = [];
        var end = n - steps;
        if (end < 0) end = end - 1;
        for (var j = n - 1; j >= end; j-- ) {
            var x = null;
            if (j < 0) {
                if (is_loop(line)) {
                    if (j == -1) continue;
                    x = line[line.length + j];
                }
            } else {
                x = line[j];
            }
            if (x)
                back.push(x);
            else
                break;
        }
        if (back.length > 0)
            targets.push(back);

        // 正走路线
        var front = [];
        end = n + steps;
        if (end > line.length - 1) end = end + 1;
        for (var k = n + 1; k <= end; k++) {
            var x = null;
            if (k >= line.length) {
                if (is_loop(line)) {
                    if (k == line.length) continue;
                    x = line[k - line.length];
                }
            } else {
                x = line[k];
            }
            if (x)
                front.push(x);
            else
                break;
        }
        if (front.length > 0)
            targets.push(front);
    }
    return targets;
}

function get_station_card(station) {
    var onLine = [2, 4, 6, 10];

    for(var i = 0; i < station.lines.length; i++) {
        var n = station.lines[i];
        var index = get_station_index(station, lines[n]);

        // 每隔两站一个卡站
        cc.log(station, index);
        if (index % 3 == 2) {
            var t = Math.floor(Math.random() * 3) + 1;  // 卡牌类型
            cc.log("CardType: ", t);
            if(t == CardType.STOP_LINE){
                var x = Math.floor(Math.random() * onLine.length);
                return new StopLineCard(onLine[x]);
            } else if(t == CardType.DIDI) {
                return new DiDiCard();
            } else if (t == CardType.DOUBE) {
                return new DoubleCard();
            }
        }
    }
    return null;
}

function get_line_by_station(from, to) {
    for(var i = 0; i < from.lines.length; i++){
        for(var j = 0; j < to.lines.length; j++) {
            if (from.lines[i] == to.lines[j]) {
                return from.lines[i];
            }
        }
    }
    return -1;
}

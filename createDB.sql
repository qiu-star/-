create database universe;
use universe;
set names utf8mb4;

create table phenomenon(
    id int not null primary key,
    name varchar(255),
    src_name varchar(255)
);
insert into phenomenon values(1,'日食','riShi');
insert into phenomenon values(2,'行星连珠','lianZhu');
insert into phenomenon values(3,'冲日','chongRi');
insert into phenomenon values(4,'凌日','lingRi');
insert into phenomenon values(5,'合日','heRi');

create table planet(
    id int not null primary key,
    pname varchar(31),
    pdesc varchar(255),
    pdesc_detail varchar(1023)
);
insert into planet values(1,'太阳','赫赫赤乌，惟日之精。','');
insert into planet values(2,'水星','辰星曰北方冬水，智也，听也。','水星是最接近太阳的行星，在太阳系中体积和质量最小。常和太阳同时出没，88天即可绕太阳一圈。然而，水星上并没有水，那么为什么要叫水星呢？在地球上，只能在日出或日落时看到水星，因此古人早上称它为“辰星”，晚上称它为“昏星”。《晋书》讲到：“辰星曰北方冬水，智也，听也。”后来，司马迁觉得一个行星叫两个名字不方便，于是就自己一合计，看着这个行星是灰色的，灰色在五行中属水，那就干脆叫水星。他在写《史记》的时候就把这个名字写进了《史记天官》。1973年11月3日，美国发射的水手10号宇宙飞船在人类历史上第一次“访问”水星。');
insert into planet values(3,'金星','东有启明，西有长庚。','金星，古名明星、大嚣、太白。光色银白，亮度特别强。除了太阳和月亮外，是天空看起来最亮的天体。金星于黎明见于东方叫启明，黄昏见于西方叫长庚。《诗•小雅•大东》中说，"东有启明，西有长庚。"');
insert into planet values(4,'地球','地为人之下，太虚之中者也。','');
insert into planet values(5,'火星','营惑谓之罚星，或谓之执法。','火星，古中国：取其“荧荧如火、亮度与位置变化甚大使人迷惑”之意，命名“荧惑”。火星又名罚星、执法。《广雅·释天》中记载道，"营惑谓之罚星，或谓之执法。"');
insert into planet values(6,'木星','岁星之所居，五谷丰昌。','木星是离太阳第五近的行星，也是太阳系行星中质量最大的一颗，它的质量是所有其他的7颗行星的总和的2.5倍，是地球的318倍，体积为地球的1316倍，被誉为“行星之王”。木星公转周期约12个地球年。这颗气态巨行星拥有多达79个卫星。古中国称其为岁星或岁。《史记•天官书》中提到的摄提、重华、应星、纪星等，都是岁星的别名。《淮南子•天文训》中记载道，"岁星之所居，五谷丰昌。其对为冲，岁乃有殃……故三岁而一饥，六岁而一衰，十二一康。”古人把木星的周期与农事联系起来，并用岁星所在的次名作为纪年的标准。1972年3月，美国宇航局发射的“先驱者”10号探测器，是第一个探测木星的使者。目前中国已经开始规划木星探测计划。');
insert into planet values(7,'土星','土曰镇星。','土星是离太阳第六远的行星，也是八大行星中第二大的行星。土星公转周期为29.46年。从地球上看，土星每约二十八年绕天一周，每年进入二十八宿中的一宿，叫岁镇一宿，故古人称之为“镇星”。土星是太阳系密度最小的行星，可以浮在水上。土星有一个显著的行星环，异常美丽。已经确认的土星卫星共有62颗。1973年发射的“先驱者11号”是第一个就近探测土星的人造天体。');
insert into planet values(8,'天王星','躺着旋转的天王星。','天王星是太阳系中离太阳第七远行星，从直径来看，是太阳系中第三大行星。天王星公转周期约为85年，最为特别的地方就在于它是躺着旋转的。天王星有27颗天然的卫星。1986年，NASA的航海家2号拜访了天王星。这次的拜访是唯一的一次近距离的探测，目前没有新的探测计划。');
insert into planet values(9,'海王星','荧荧的淡蓝色海王星。','海王星是环绕太阳运行的第八颗行星，也是太阳系中第四大天体，公转周期约为165个地球年。它拥有着荧荧的淡蓝色光，所以西方人用罗马神话中的海神"尼普顿"的名字来称呼它。在中文里，就把它译为海王星。海王星的亮度极低，在地球上是无法用肉眼看到的，必须借助天文望远镜。海王星的发现颇具传奇，它是唯一利用数学预测而非有计划的观测发现的行星。1846年，法国数学家、天文学家奥本·勒威耶在得不到同行的支持下，利用天王星轨道的摄动，以自己的热诚独立计算出了海王星的轨道。根据其计算，柏林天文台的德国天文学家伽勒，在同一年的9月23日晚间（9月23日恰好也是勒威耶逝世的日子），观测到了海王星，与勒维耶预测的位置相距不到1°。迄今只有美国的旅行者2号探测器曾经在1989年8月25日拜访过海王星。');

create table pvideo(
    pid int not null,
    vsrc_name varchar(31),
    vsrc_disc varchar(255),
    foreign key (pid) references planet(id)
);

insert into pvideo values(1,'../content/videos/taiyang.mp4','关于太阳的十大有趣事实');
insert into pvideo values(1,'../content/videos/houyisheri.mp4','一分钟了解后羿射日');
insert into pvideo values(1,'../content/videos/kuafu.mp4','夸父逐日有多快？');

insert into pvideo values(4,'../content/videos/weixing.mp4','卫星的二三事');
insert into pvideo values(4,'../content/videos/nongli.mp4','农历阴历不一样');
insert into pvideo values(4,'../content/videos/24.mp4','二十四节气的秘密');
insert into pvideo values(4,'../content/videos/tiangan.mp4','你所好奇的天干地支');

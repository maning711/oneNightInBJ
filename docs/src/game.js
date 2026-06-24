const SAVE_KEY = "beijing-hustle-save-v1";

const GOODS = [
  { id: "cases", name: "手机壳", base: 38, volatility: 12, bulk: 1, category: "快货" },
  { id: "powerbank", name: "充电宝", base: 88, volatility: 24, bulk: 2, category: "快货" },
  { id: "earbuds", name: "蓝牙耳机", base: 168, volatility: 36, bulk: 2, category: "快货" },
  { id: "bags", name: "帆布包", base: 62, volatility: 18, bulk: 1, category: "快货" },
  { id: "coupons", name: "咖啡券", base: 24, volatility: 10, bulk: 1, category: "快货" },
  {
    id: "ebike",
    name: "二手电动车",
    base: 1860,
    volatility: 280,
    bulk: 5,
    category: "大件",
    requires: (state) => state.tradeSkill >= 1 || state.contacts >= 1,
    requirementText: "需倒货眼力 1 或联系人 1",
  },
  {
    id: "microcar",
    name: "二手小车",
    base: 16800,
    volatility: 2300,
    bulk: 9,
    category: "大件",
    requires: (state) => state.careerSkill >= 2 || state.cash >= 12000,
    requirementText: "需履历 2 或现金 12000",
  },
  {
    id: "oldflat",
    name: "老房份额",
    base: 42800,
    volatility: 5200,
    bulk: 10,
    category: "房产",
    requires: (state) => state.contacts >= 3 && state.cash >= 20000,
    requirementText: "需联系人 3 且现金 20000",
  },
  {
    id: "reit",
    name: "公寓 REIT",
    base: 680,
    volatility: 90,
    bulk: 1,
    category: "金融",
    requires: (state) => state.contacts >= 2,
    requirementText: "需联系人 2",
  },
  {
    id: "indexfund",
    name: "指数基金",
    base: 480,
    volatility: 70,
    bulk: 1,
    category: "股票",
    requires: (state) => state.tradeSkill >= 2 || state.contacts >= 2,
    requirementText: "需倒货眼力 2 或联系人 2",
  },
  {
    id: "techstock",
    name: "科技股碎股",
    base: 920,
    volatility: 190,
    bulk: 1,
    category: "股票",
    requires: (state) => state.tradeSkill >= 2 || state.careerSkill >= 2,
    requirementText: "需倒货眼力 2 或履历 2",
  },
];

const DISTRICTS = [
  {
    id: "tiantongyuan",
    name: "天通苑",
    rentDelta: -80,
    jobBias: 4,
    tradeBias: { cases: -3, bags: -2, coupons: 2 },
    desc: "房租最友好，通勤最折磨。地铁上醒着，回屋时已经像电量 2%。",
  },
  {
    id: "xierqi",
    name: "西二旗",
    rentDelta: 70,
    jobBias: 10,
    tradeBias: { earbuds: 9, powerbank: 5, coupons: 3, techstock: 70, indexfund: 30 },
    desc: "工位灯光比夕阳稳定。临时工、外包岗和各种“先来聊聊”的机会很多。",
  },
  {
    id: "guomao",
    name: "国贸",
    rentDelta: 140,
    jobBias: 7,
    tradeBias: { bags: 8, coupons: 6, cases: 2, oldflat: 2200, reit: 60 },
    desc: "写字楼玻璃很亮，消费也很亮。赚到钱和花掉钱都很快。",
  },
  {
    id: "zhongguancun",
    name: "中关村",
    rentDelta: 40,
    jobBias: 8,
    tradeBias: { powerbank: -6, earbuds: -4, cases: 4, ebike: -120, microcar: -500, techstock: 40 },
    desc: "电子货流转快，倒腾数码周边最有机会，但价差也最透明。",
  },
];

const JOBS = [
  {
    id: "flyers",
    name: "商场发传单",
    energy: 18,
    mood: -5,
    health: -2,
    cash: [120, 180],
    rep: 1,
    minRep: 0,
    lane: "street",
    flavor: "站一整天后，你对路人的拒绝速度有了新认识。",
  },
  {
    id: "delivery",
    name: "外卖跑腿",
    energy: 28,
    mood: -2,
    health: -4,
    cash: [200, 320],
    rep: 2,
    minRep: 8,
    lane: "delivery",
    flavor: "电梯、楼梯、门禁和定位点一起考验你的腿。",
  },
  {
    id: "temp",
    name: "会务临时工",
    energy: 20,
    mood: 1,
    health: -1,
    cash: [180, 260],
    rep: 3,
    minRep: 12,
    lane: "ops",
    flavor: "你学会了如何在看起来很忙时，真的把事干完。",
  },
  {
    id: "studio",
    name: "直播场控",
    energy: 25,
    mood: 5,
    health: -2,
    cash: [260, 420],
    rep: 4,
    minRep: 20,
    lane: "media",
    flavor: "你盯着弹幕和倒计时，感觉整个晚上都是红点在跳。",
  },
  {
    id: "warehouse",
    name: "夜班理货",
    energy: 30,
    mood: -4,
    health: -4,
    cash: [280, 380],
    rep: 3,
    minRep: 18,
    requires: (state) => state.grit >= 1,
    lane: "delivery",
    flavor: "货箱、扫码枪和冷气一起把时间压成了凌晨。",
  },
  {
    id: "booth",
    name: "市集摆摊",
    energy: 17,
    mood: 4,
    health: -1,
    cash: [220, 340],
    rep: 3,
    minRep: 16,
    requires: (state) => state.tradeSkill >= 1,
    lane: "sales",
    flavor: "你学着看人停步的节奏，知道什么话该快，什么话该慢。",
  },
  {
    id: "editing",
    name: "短视频剪辑",
    energy: 16,
    mood: 6,
    health: -1,
    cash: [360, 520],
    rep: 5,
    minRep: 28,
    requires: (state) => state.careerSkill >= 2,
    lane: "media",
    flavor: "屏幕上是一条条时间线，屏幕外是你终于开始像个熟手。",
  },
  {
    id: "barista",
    name: "咖啡店代班",
    energy: 18,
    mood: 3,
    health: -1,
    cash: [210, 320],
    rep: 3,
    minRep: 14,
    requires: (state) => state.socialLife >= 1 || state.contacts >= 1,
    lane: "service",
    flavor: "你背菜单、拉奶泡、认人脸，发现笑脸也算一种硬技能。",
  },
  {
    id: "sales_call",
    name: "电话销售",
    energy: 14,
    mood: -3,
    health: -1,
    cash: [180, 380],
    rep: 4,
    minRep: 18,
    requires: (state) => state.contacts >= 1 || state.reputation >= 18,
    lane: "sales",
    flavor: "你把同一句开场白讲了上百遍，终于知道声音里也能带刀。 ",
  },
  {
    id: "exhibition",
    name: "展会执行",
    energy: 23,
    mood: 2,
    health: -2,
    cash: [320, 460],
    rep: 5,
    minRep: 24,
    requires: (state) => state.careerSkill >= 1 && state.contacts >= 1,
    lane: "ops",
    flavor: "你盯排期、盯物料、盯口径，现场乱得像风，但你得像钉子。",
  },
  {
    id: "camera_assist",
    name: "拍摄助理",
    energy: 20,
    mood: 5,
    health: -1,
    cash: [340, 500],
    rep: 5,
    minRep: 26,
    requires: (state) => state.careerSkill >= 2,
    lane: "media",
    flavor: "你扛脚架、盯机位、递卡和收线，第一次觉得自己离正经项目这么近。",
  },
  {
    id: "community",
    name: "社群运营",
    energy: 15,
    mood: 4,
    health: 0,
    cash: [260, 380],
    rep: 4,
    minRep: 22,
    requires: (state) => state.socialLife >= 2 || state.contacts >= 2,
    lane: "service",
    flavor: "群消息滚得飞快，你学会了怎么一句话把气氛往回拉。",
  },
  {
    id: "qa_test",
    name: "App 测试兼写脚本",
    energy: 14,
    mood: 2,
    health: 0,
    cash: [320, 460],
    rep: 4,
    minRep: 18,
    requires: (state) => state.careerSkill >= 1,
    lane: "tech",
    flavor: "你一边点页面一边补脚本，终于发现会提 bug 和会复现 bug 是两种能力。",
  },
  {
    id: "ops_script",
    name: "运营自动化脚本",
    energy: 16,
    mood: 3,
    health: 0,
    cash: [380, 560],
    rep: 5,
    minRep: 24,
    requires: (state) => state.careerSkill >= 2 && state.contacts >= 1,
    lane: "tech",
    flavor: "本来要重复点两百次的活，被你写成了一段脚本，大家看你的眼神终于不一样了。",
  },
  {
    id: "frontend_outsource",
    name: "前端外包切页",
    energy: 20,
    mood: 4,
    health: -1,
    cash: [520, 760],
    rep: 6,
    minRep: 28,
    requires: (state) => state.careerSkill >= 3,
    lane: "tech",
    flavor: "需求文档不完整、设计稿还在改，但页面明早就得能跑。",
  },
  {
    id: "miniapp_dev",
    name: "小程序开发",
    energy: 22,
    mood: 5,
    health: -1,
    cash: [680, 980],
    rep: 7,
    minRep: 34,
    requires: (state) => state.careerSkill >= 4 && state.contacts >= 2,
    lane: "tech",
    flavor: "你开始真正交付完整功能，而不是只补边角。代码也慢慢有了你的手感。",
  },
  {
    id: "oncall_support",
    name: "驻场工程支持",
    energy: 18,
    mood: 1,
    health: -1,
    cash: [620, 860],
    rep: 6,
    minRep: 30,
    requires: (state) => state.careerSkill >= 3 && state.grit >= 1,
    lane: "tech",
    flavor: "白天改需求，晚上救线上，真正让你值钱的是别人不想接的那部分混乱。",
  },
  {
    id: "luxury_consult",
    name: "商场导购顾问",
    energy: 19,
    mood: 3,
    health: -1,
    cash: [420, 680],
    rep: 6,
    minRep: 32,
    requires: (state) => state.socialLife >= 3 && state.contacts >= 2,
    lane: "sales",
    flavor: "你开始卖的不只是东西，还有人对自己生活方式的想象。",
  },
];

const EVENTS = [
  {
    id: "roommate",
    title: "合租室友",
    text: "室友突然说下个月想搬走，顺便把厨房那口锅也带走。",
    weight: 1,
    when: (state) => state.cash < 2500,
    choices: [
      {
        label: "请他吃夜宵缓一缓",
        effect: (state) => {
          state.cash -= 48;
          state.mood += 3;
          state.rent -= 60;
          return "你花了 48 元，室友答应多住一周，房租压力暂时缓了口气。";
        },
      },
      {
        label: "算了，自己扛",
        effect: (state) => {
          state.mood -= 6;
          state.reputation += 1;
          return "你装作很稳，实际上已经开始盘算下个缴租日怎么过。";
        },
      },
    ],
  },
  {
    id: "interview",
    title: "突发面试",
    text: "一个朋友转来消息：明天上午有家小公司缺人，要不要去试试？",
    weight: 1,
    when: (state) => state.reputation >= 10,
    choices: [
      {
        label: "去",
        effect: (state) => {
          const gain = 2 + randInt(0, 4);
          state.reputation += gain;
          state.energy -= 8;
          state.mood += 4;
          return `你去聊了聊，虽然没立刻拿到活，但人脉 +${gain}。`;
        },
      },
      {
        label: "继续打工更现实",
        effect: (state) => {
          state.cash += 80;
          state.energy -= 4;
          return "你把时间换成了 80 元现钱。北京不会因为理想停表。";
        },
      },
    ],
  },
  {
    id: "subway",
    title: "地铁故障",
    text: "早高峰地铁临停，站台像一锅刚揭盖的蒸汽。",
    weight: 0.9,
    choices: [
      {
        label: "打车保工作",
        effect: (state) => {
          state.cash -= 65;
          state.reputation += 2;
          return "你用钱换回了准时，甲方至少今天没挑你。";
        },
      },
      {
        label: "挤地面公交",
        effect: (state) => {
          state.energy -= 14;
          state.mood -= 5;
          return "你到了，但灵魂比人晚了一会儿。";
        },
      },
    ],
  },
  {
    id: "market",
    title: "熟人低价货源",
    text: "以前认识的摊主突然说有一批尾货，问你敢不敢接。",
    weight: 1.2,
    when: (state) => state.tradeSkill >= 1 || state.reputation >= 12,
    choices: [
      {
        label: "拿一批",
        effect: (state) => {
          const item = sample(["cases", "bags", "coupons"]);
          state.inventory[item] += 4;
          state.cash -= 90;
          return `你花 90 元拿下 4 件${getGood(item).name}，成败全看明后天行情。`;
        },
      },
      {
        label: "不压货",
        effect: (state) => {
          state.mood += 2;
          return "你保持克制。手里有现金，总比半夜抱着货睡不踏实强。";
        },
      },
    ],
  },
  {
    id: "broker",
    title: "黑中介消息",
    text: "一个中介说能给你换到更便宜的床位房，条件是先交手续费，而且环境别问太多。",
    weight: 0.7,
    when: (state) => state.cash < state.rent && state.cash >= 120 && !hasBuff(state, "cheap-bunk"),
    choices: [
      {
        label: "先活下来再说",
        effect: (state) => {
          state.cash -= 120;
          state.rent = clamp(state.rent - 160, 780, 1780);
          addBuff(state, {
            id: "cheap-bunk",
            label: "床位房",
            days: 5,
            description: "房租低了，但睡眠和卫生条件更差。",
            eachDay: { health: -2, mood: -1 },
          });
          return "你花 120 元换到了更便宜的落脚点。空气闷一点，账面能喘一点。";
        },
      },
      {
        label: "继续扛原来的房子",
        effect: (state) => {
          state.mood += 2;
          state.grit += 1;
          return "你没搬。贵是贵，但至少晚上回去时不用再多做一次心理建设。";
        },
      },
    ],
  },
  {
    id: "mentor_offer",
    title: "直播团队留人",
    text: "你连着几次把场控活做顺了，团队里有人问你愿不愿意接下来一周都跟班。",
    when: (state) => state.storyFlags.studioMentorReady && !state.storyFlags.studioMentorTaken,
    choices: [
      {
        label: "接，先把机会抓住",
        effect: (state) => {
          state.storyFlags.studioMentorReady = false;
          state.storyFlags.studioMentorTaken = true;
          addBuff(state, {
            id: "studio-crew",
            label: "直播班底",
            days: 6,
            description: "直播相关工作报酬更高，但节奏更伤神。",
            jobModifiers: {
              studio: { payout: 120, energy: 4, mood: 2 },
              editing: { payout: 80, mood: 1 },
            },
          });
          state.careerSkill += 1;
          return "你进了固定班底。钱会来得快一点，昼夜也会更乱一点。";
        },
      },
      {
        label: "不绑死，继续散接",
        effect: (state) => {
          state.storyFlags.studioMentorReady = false;
          state.reputation += 2;
          return "你留了个体面的口风，暂时没把自己绑进更长的班次里。";
        },
      },
    ],
  },
  {
    id: "supplier_chain",
    title: "档口合作",
    text: "批发市场的摊主看你最近走货还算稳，愿意给你一个短期保价名额。",
    when: (state) => state.storyFlags.supplierReady && !state.storyFlags.supplierContract && state.cash >= 260,
    choices: [
      {
        label: "交定金拿保价",
        effect: (state) => {
          state.storyFlags.supplierReady = false;
          state.storyFlags.supplierContract = true;
          state.cash -= 260;
          addBuff(state, {
            id: "supplier-deal",
            label: "档口保价",
            days: 4,
            description: "进货价更友好，尤其适合快进快出。",
            tradeBuyDelta: { cases: -8, bags: -10, powerbank: -12 },
          });
          state.tradeSkill += 1;
          return "你交了 260 元定金，接下来几天进货能便宜一点，手速也得跟上。";
        },
      },
      {
        label: "现金更重要",
        effect: (state) => {
          state.storyFlags.supplierReady = false;
          state.mood += 2;
          return "你没压这笔钱。对北漂来说，手上现金经常比理论利润更值钱。";
        },
      },
    ],
  },
  {
    id: "clinic_followup",
    title: "社区门诊",
    text: "你这阵子脸色实在太差，附近门诊说今晚有便宜号源。",
    when: (state) => state.health <= 35 && !state.storyFlags.clinicUsed && state.cash >= 90,
    choices: [
      {
        label: "去看",
        effect: (state) => {
          state.cash -= 90;
          state.health += 16;
          state.mood += 5;
          state.storyFlags.clinicUsed = true;
          return "医生没讲大道理，只让你别再把自己当一次性用品。";
        },
      },
      {
        label: "再撑几天",
        effect: (state) => {
          state.health -= 8;
          state.grit += 1;
          return "你说自己还行，但楼道镜子里那张脸并不太同意。";
        },
      },
    ],
  },
  {
    id: "social_connection",
    title: "朋友带来的局",
    text: "一个新认识的朋友说晚上有个局，可能能认识做项目的人，也可能只是单纯花钱聊天。",
    when: (state) => state.socialLife >= 2 && state.contacts >= 1 && !state.storyFlags.socialConnectionUsed,
    choices: [
      {
        label: "去，拓关系",
        effect: (state) => {
          state.cash -= 88;
          state.contacts += 1;
          state.socialLife += 1;
          state.storyFlags.socialConnectionUsed = true;
          scheduleEvent(state, 2, "dating_followup");
          return "你花 88 元买了入场感，但也真的把一个更靠谱的人脉留到了通讯录里。";
        },
      },
      {
        label: "不去，先保现金",
        effect: (state) => {
          state.storyFlags.socialConnectionUsed = true;
          state.mood += 1;
          return "你没去。钱留住了，机会也先从你身边滑过去了。";
        },
      },
    ],
  },
  {
    id: "dating_followup",
    title: "认识个搭子",
    text: "上次饭局里认识的人，今天约你下班后喝一杯，说想认真聊聊。",
    when: (state) => state.socialLife >= 3 && !state.storyFlags.hasPartner && state.cash >= 50,
    choices: [
      {
        label: "去见面",
        effect: (state) => {
          state.cash -= 50;
          state.socialLife += 1;
          state.storyFlags.hasPartner = true;
          addBuff(state, {
            id: "life-buddy",
            label: "生活搭子",
            days: 8,
            description: "有人一起吃饭聊天，心情更稳，偶尔还能带来消息。",
            eachDay: { mood: 1 },
          });
          return "你们还没到承诺什么的地步，但至少这座城里多了个会等你回消息的人。";
        },
      },
      {
        label: "先别牵扯太多",
        effect: (state) => {
          state.reputation += 1;
          return "你把分寸拿得很稳，也把一点可能性留在了身后。";
        },
      },
    ],
  },
  {
    id: "stock_tip",
    title: "朋友给的股市消息",
    text: "做投研的朋友私下提了一嘴，说最近科技线有波动，敢不敢上点仓位？",
    weight: 0.6,
    when: (state) => state.contacts >= 2 && state.socialLife >= 2,
    choices: [
      {
        label: "信一把，做准备",
        effect: (state) => {
          addBuff(state, {
            id: "market-tip",
            label: "股市消息",
            days: 3,
            description: "你对股票类买点更敏感了。",
            tradeBuyDelta: { techstock: -80, indexfund: -40, reit: -25 },
            tradeSellDelta: { techstock: 60, indexfund: 24 },
          });
          return "你没立刻梭哈，但把注意力盯到了股票类资产上。";
        },
      },
      {
        label: "算了，我更信看得见的货",
        effect: (state) => {
          state.tradeSkill += 1;
          return "你没跟。对你来说，看得见摸得着的东西更容易睡得着。";
        },
      },
    ],
  },
  {
    id: "delivery_captain",
    title: "骑手站长来挖你",
    text: "你最近跑单和理货都很稳，站长问你愿不愿意带新人、顺便负责一小片排班。",
    when: (state) => state.storyFlags.deliveryCaptainReady && !state.storyFlags.deliveryCaptainTaken,
    choices: [
      {
        label: "接，先把饭碗做厚",
        effect: (state) => {
          state.storyFlags.deliveryCaptainReady = false;
          state.storyFlags.deliveryCaptainTaken = true;
          addBuff(state, {
            id: "delivery-captain",
            label: "骑手站长线",
            days: 7,
            description: "配送类工作报酬更高，体力消耗略降。",
            jobModifiers: {
              delivery: { payout: 90, energy: -4, mood: 1 },
              warehouse: { payout: 70, energy: -3 },
            },
          });
          state.grit += 1;
          state.contacts += 1;
          return "你开始从单纯卖力气，变成有人愿意托一小段责任给你。";
        },
      },
      {
        label: "算了，我只想自己跑",
        effect: (state) => {
          state.storyFlags.deliveryCaptainReady = false;
          state.mood += 2;
          return "你暂时不想背额外责任，只想把自己的日子先跑顺。";
        },
      },
    ],
  },
  {
    id: "exhibition_agency",
    title: "会展公司留档",
    text: "你连着几次展会执行没掉链子，对方说以后有活会优先敲你。",
    when: (state) => state.storyFlags.opsAgencyReady && !state.storyFlags.opsAgencyTaken,
    choices: [
      {
        label: "留档，继续接",
        effect: (state) => {
          state.storyFlags.opsAgencyReady = false;
          state.storyFlags.opsAgencyTaken = true;
          addBuff(state, {
            id: "ops-agency",
            label: "会展名单",
            days: 8,
            description: "会务和展会类工作更容易接到，收益更高。",
            jobModifiers: {
              temp: { payout: 50, mood: 1 },
              exhibition: { payout: 120, mood: 1 },
            },
          });
          state.careerSkill += 1;
          return "你被记进了熟手名单，至少下一次别人想到人选时，会先翻到你。";
        },
      },
      {
        label: "不绑定，我再看看",
        effect: (state) => {
          state.storyFlags.opsAgencyReady = false;
          state.reputation += 2;
          return "你先留了后路。名片收下了，承诺先不做满。";
        },
      },
    ],
  },
  {
    id: "sales_big_client",
    title: "大客户机会",
    text: "你最近几次销售和导购表现不错，有人把一位更难缠、但佣金更高的客户递给了你。",
    when: (state) => state.storyFlags.salesClientReady && !state.storyFlags.salesClientTaken,
    choices: [
      {
        label: "接，赌一把佣金",
        effect: (state) => {
          state.storyFlags.salesClientReady = false;
          state.storyFlags.salesClientTaken = true;
          addBuff(state, {
            id: "sales-client",
            label: "大客户单",
            days: 5,
            description: "销售类工作奖励更高，但情绪波动更大。",
            jobModifiers: {
              booth: { payout: 70, mood: 1 },
              sales_call: { payout: 120, mood: -1 },
              luxury_consult: { payout: 160, mood: 2 },
            },
          });
          state.contacts += 1;
          return "你把自己往更贵也更尖的场子里推了一步。";
        },
      },
      {
        label: "算了，稳一点",
        effect: (state) => {
          state.storyFlags.salesClientReady = false;
          state.mood += 2;
          return "你放弃了那笔可能更大的钱，也避开了那种更快见输赢的对话。";
        },
      },
    ],
  },
  {
    id: "tech_contract",
    title: "技术长期合作",
    text: "你最近几个技术活都交得比较稳，对方问你要不要固定接他们的小项目和线上 support。",
    when: (state) => state.storyFlags.techContractReady && !state.storyFlags.techContractTaken,
    choices: [
      {
        label: "接，先把技术线做厚",
        effect: (state) => {
          state.storyFlags.techContractReady = false;
          state.storyFlags.techContractTaken = true;
          addBuff(state, {
            id: "tech-contract",
            label: "技术合作单",
            days: 8,
            description: "技术类工作更稳定、更值钱，但精神负担也更重。",
            jobModifiers: {
              qa_test: { payout: 80, mood: 1 },
              ops_script: { payout: 120, mood: 1 },
              frontend_outsource: { payout: 180, mood: 1 },
              miniapp_dev: { payout: 220, mood: 2 },
              oncall_support: { payout: 160, mood: -1 },
            },
          });
          state.careerSkill += 1;
          state.contacts += 1;
          return "你不再只是接一单算一单，技术这条线开始有连续性了。";
        },
      },
      {
        label: "不绑定，继续散接",
        effect: (state) => {
          state.storyFlags.techContractReady = false;
          state.mood += 2;
          return "你先保留机动性。钱可能慢一点，但生活还不至于被排班完全吃掉。";
        },
      },
    ],
  },
];

const ROOT = document.getElementById("game-root");

const style = document.createElement("style");
style.textContent = `
  :root {
    color-scheme: dark;
    --paper: #efe2c4;
    --ink: #1f1a17;
    --accent: #c75b39;
    --accent-deep: #8e3820;
    --panel: rgba(245, 232, 205, 0.88);
    --panel-strong: rgba(236, 220, 188, 0.95);
    --line: rgba(71, 45, 25, 0.18);
    --warn: #a5331e;
    --ok: #2f6b48;
  }

  * {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    height: 100%;
    overflow: hidden;
    font-family: "Songti SC", "STSong", "Noto Serif SC", serif;
    background: #15110f;
  }

  #game-root {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }

  canvas {
    display: block;
  }

  .ui-shell {
    position: absolute;
    inset: 0;
    padding: 18px;
    display: grid;
    grid-template-rows: auto 1fr auto;
    gap: 14px;
    pointer-events: none;
  }

  .bar, .panel, .footer, .modal-card {
    background: var(--panel);
    border: 1px solid var(--line);
    box-shadow: 0 18px 50px rgba(0, 0, 0, 0.22);
    backdrop-filter: blur(8px);
    pointer-events: auto;
  }

  .bar {
    border-radius: 18px;
    padding: 14px 18px;
    display: grid;
    grid-template-columns: 1.4fr 1fr auto;
    gap: 16px;
    align-items: center;
    color: var(--ink);
  }

  .title-block h1 {
    margin: 0;
    font-size: 34px;
    letter-spacing: 2px;
  }

  .title-block p {
    margin: 6px 0 0;
    font-size: 14px;
    opacity: 0.82;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(7, minmax(84px, 1fr));
    gap: 10px;
  }

  .stat {
    background: rgba(255, 255, 255, 0.42);
    border-radius: 12px;
    padding: 10px 12px;
  }

  .stat .label {
    font-size: 12px;
    opacity: 0.7;
  }

  .stat .value {
    margin-top: 4px;
    font-size: 22px;
    font-weight: 700;
  }

  .toolbar {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    flex-wrap: wrap;
  }

  button {
    border: 0;
    border-radius: 12px;
    background: var(--accent);
    color: #fffaf4;
    font: inherit;
    font-size: 14px;
    padding: 11px 14px;
    cursor: pointer;
    transition: transform 120ms ease, opacity 120ms ease, background 120ms ease;
  }

  button:hover {
    transform: translateY(-1px);
    background: #d66a45;
  }

  button.secondary {
    background: #6f655b;
  }

  button.ghost {
    background: rgba(80, 58, 41, 0.14);
    color: var(--ink);
  }

  button:disabled {
    opacity: 0.45;
    cursor: not-allowed;
    transform: none;
  }

  .content {
    display: grid;
    grid-template-columns: 1.15fr 1fr 1.1fr;
    gap: 14px;
    min-height: 0;
    overflow: hidden;
  }

  .panel {
    border-radius: 20px;
    padding: 16px;
    color: var(--ink);
    display: flex;
    flex-direction: column;
    min-height: 0;
    overflow: hidden;
  }

  .panel-scroll {
    display: grid;
    gap: 12px;
    min-height: 0;
    overflow: auto;
    padding-right: 6px;
  }

  .panel h2 {
    margin: 0;
    font-size: 22px;
  }

  .panel .sub {
    margin-top: 6px;
    margin-bottom: 14px;
    font-size: 13px;
    opacity: 0.78;
    line-height: 1.5;
  }

  .action-grid, .district-grid, .market-list, .inventory-list, .jobs-list {
    display: grid;
    gap: 10px;
  }

  .action-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .card {
    border-radius: 16px;
    padding: 14px;
    background: rgba(255, 255, 255, 0.44);
    border: 1px solid rgba(70, 41, 21, 0.08);
  }

  .card h3 {
    margin: 0 0 4px;
    font-size: 17px;
  }

  .card p {
    margin: 0 0 10px;
    font-size: 13px;
    line-height: 1.45;
    opacity: 0.85;
  }

  .meta {
    font-size: 12px;
    opacity: 0.75;
    margin-bottom: 10px;
  }

  .line-list {
    display: grid;
    gap: 8px;
  }

  .status-board {
    display: grid;
    gap: 10px;
    margin-bottom: 14px;
  }

  .status-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;
  }

  .status-box {
    padding: 12px;
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.42);
  }

  .status-box .label {
    font-size: 12px;
    opacity: 0.7;
  }

  .status-box .value {
    margin-top: 4px;
    font-size: 20px;
    font-weight: 700;
  }

  .buff-list {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .buff-chip {
    padding: 8px 10px;
    border-radius: 999px;
    background: rgba(62, 96, 71, 0.14);
    border: 1px solid rgba(52, 90, 61, 0.18);
    font-size: 12px;
  }

  .line {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    padding: 11px 12px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.42);
    align-items: center;
  }

  .line .name {
    font-weight: 700;
  }

  .line .detail {
    font-size: 12px;
    opacity: 0.72;
    margin-top: 2px;
  }

  .line .cta {
    display: flex;
    gap: 8px;
  }

  .log {
    min-height: 180px;
    display: grid;
    gap: 8px;
  }

  .log-entry {
    padding: 12px 14px;
    border-radius: 14px;
    background: rgba(36, 24, 17, 0.82);
    color: #f7edd7;
    line-height: 1.5;
    font-size: 13px;
  }

  .footer {
    border-radius: 16px;
    padding: 12px 16px;
    color: var(--ink);
    display: flex;
    justify-content: space-between;
    gap: 12px;
    align-items: center;
  }

  .footer strong {
    color: var(--accent-deep);
  }

  .modal {
    position: absolute;
    inset: 0;
    display: none;
    align-items: center;
    justify-content: center;
    background: rgba(16, 10, 8, 0.45);
    pointer-events: auto;
    padding: 18px;
  }

  .modal.open {
    display: flex;
  }

  .modal-card {
    width: min(680px, 100%);
    border-radius: 24px;
    padding: 22px;
    color: var(--ink);
    background: var(--panel-strong);
  }

  .modal-card h3 {
    margin: 0 0 10px;
    font-size: 28px;
  }

  .modal-card p {
    margin: 0 0 16px;
    line-height: 1.65;
    font-size: 15px;
  }

  .modal-actions {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  .ending {
    font-size: 15px;
    line-height: 1.7;
    padding: 12px 0 8px;
  }

  .good {
    color: var(--ok);
  }

  .bad {
    color: var(--warn);
  }

  @media (max-width: 1260px) {
    .bar {
      grid-template-columns: 1fr;
    }

    .stats-grid {
      grid-template-columns: repeat(3, minmax(90px, 1fr));
    }

    .content {
      grid-template-columns: 1fr;
    }

    .panel-scroll {
      max-height: 46vh;
    }

    .footer {
      flex-direction: column;
      align-items: flex-start;
    }
  }
`;
document.head.appendChild(style);

ROOT.innerHTML = `
  <div class="ui-shell">
    <section class="bar">
      <div class="title-block">
        <h1>北漂浮生</h1>
        <p>你带着一点现金和一身疲惫来到北京。60 天内，想办法活下去，再尽量站稳脚。</p>
      </div>
      <div class="stats-grid" id="stats"></div>
      <div class="toolbar">
        <button class="ghost" id="new-game-btn">重新开局</button>
        <button class="secondary" id="save-btn">保存</button>
        <button class="secondary" id="load-btn">读取</button>
      </div>
    </section>

    <section class="content">
      <section class="panel">
        <h2>生存动作</h2>
        <div class="panel-scroll">
          <div class="sub" id="district-summary"></div>
          <div class="action-grid" id="actions"></div>
          <div class="sub" style="margin-top: 4px;">今日零工。不同工种会把你往配送、执行、内容、销售、服务、技术等路线推，后面还能接出更高级的工作机会。</div>
          <div class="jobs-list" id="jobs"></div>
        </div>
      </section>

      <section class="panel">
        <h2>行情与背包</h2>
        <div class="panel-scroll">
          <div class="sub">倒腾小货能赚快钱，大件和股票会更猛，但也会把你的现金和心态一起锁进去。</div>
          <div class="market-list" id="market"></div>
          <div class="sub" style="margin-top: 4px;">持有物品</div>
          <div class="inventory-list" id="inventory"></div>
        </div>
      </section>

      <section class="panel">
        <h2>城市与记录</h2>
        <div class="panel-scroll">
          <div class="sub">在不同片区切换，会改变工作机会、房租压力和货品价格。</div>
          <div class="status-board" id="status-board"></div>
          <div class="district-grid" id="districts"></div>
          <div class="sub" style="margin-top: 4px;">今日记事</div>
          <div class="log" id="log"></div>
        </div>
      </section>
    </section>

    <section class="footer">
      <div id="footer-text"></div>
      <button id="next-day-btn">结束今天</button>
    </section>
  </div>

  <div class="modal" id="modal">
    <div class="modal-card" id="modal-card"></div>
  </div>
`;

const els = {
  stats: document.getElementById("stats"),
  actions: document.getElementById("actions"),
  jobs: document.getElementById("jobs"),
  market: document.getElementById("market"),
  inventory: document.getElementById("inventory"),
  statusBoard: document.getElementById("status-board"),
  districts: document.getElementById("districts"),
  log: document.getElementById("log"),
  footer: document.getElementById("footer-text"),
  nextDay: document.getElementById("next-day-btn"),
  save: document.getElementById("save-btn"),
  load: document.getElementById("load-btn"),
  newGame: document.getElementById("new-game-btn"),
  modal: document.getElementById("modal"),
  modalCard: document.getElementById("modal-card"),
  districtSummary: document.getElementById("district-summary"),
};

let state = buildInitialState();
let bgScene;

function buildInitialState() {
  return {
    day: 1,
    maxDays: 60,
    cash: 2200,
    debt: 3500,
    energy: 82,
    mood: 68,
    health: 78,
    reputation: 10,
    actionsLeft: 2,
    rent: 1180,
    rentCountdown: 7,
    district: "tiantongyuan",
    grit: 0,
    careerSkill: 0,
    tradeSkill: 0,
    contacts: 0,
    socialLife: 0,
    tradeVolume: 0,
    jobHistory: {},
    buffs: [],
    scheduledEvents: [],
    storyFlags: {
      studioMentorReady: false,
      studioMentorTaken: false,
      deliveryCaptainReady: false,
      deliveryCaptainTaken: false,
      opsAgencyReady: false,
      opsAgencyTaken: false,
      salesClientReady: false,
      salesClientTaken: false,
      techContractReady: false,
      techContractTaken: false,
      supplierReady: false,
      supplierContract: false,
      clinicUsed: false,
      socialConnectionUsed: false,
      hasPartner: false,
    },
    inventory: Object.fromEntries(GOODS.map((good) => [good.id, 0])),
    inventoryCost: Object.fromEntries(GOODS.map((good) => [good.id, 0])),
    prices: {},
    jobsToday: [],
    log: [],
    pendingEvent: null,
    gameOver: false,
    ending: null,
  };
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sample(list) {
  return list[randInt(0, list.length - 1)];
}

function hasBuff(state, id) {
  return state.buffs.some((buff) => buff.id === id);
}

function addBuff(state, buff) {
  state.buffs = state.buffs.filter((item) => item.id !== buff.id);
  state.buffs.push(buff);
}

function scheduleEvent(state, inDays, eventId, payload = {}) {
  state.scheduledEvents.push({
    day: state.day + inDays,
    eventId,
    payload,
  });
}

function getEventById(id) {
  return EVENTS.find((event) => event.id === id);
}

function getJobModifier(jobId, field) {
  return state.buffs.reduce((sum, buff) => {
    return sum + (buff.jobModifiers?.[jobId]?.[field] || 0);
  }, 0);
}

function getTradeBuyDelta(goodId) {
  return state.buffs.reduce((sum, buff) => sum + (buff.tradeBuyDelta?.[goodId] || 0), 0);
}

function getTradeSellDelta(goodId) {
  return state.buffs.reduce((sum, buff) => sum + (buff.tradeSellDelta?.[goodId] || 0), 0);
}

function canTradeGood(good) {
  return !good.requires || good.requires(state);
}

function getGood(id) {
  return GOODS.find((item) => item.id === id);
}

function getDistrict(id) {
  return DISTRICTS.find((item) => item.id === id);
}

function getPriceCap(good) {
  if (good.category === "快货") return 1200;
  if (good.category === "股票") return good.base * 3;
  if (good.category === "金融") return good.base * 2.6;
  if (good.category === "大件") return good.base * 1.9;
  if (good.category === "房产") return good.base * 1.7;
  return good.base * 2;
}

function getPriceFloor(good) {
  if (good.category === "快货") return Math.max(8, Math.floor(good.base * 0.45));
  if (good.category === "股票") return Math.max(60, Math.floor(good.base * 0.55));
  if (good.category === "金融") return Math.max(50, Math.floor(good.base * 0.65));
  if (good.category === "大件") return Math.max(500, Math.floor(good.base * 0.55));
  if (good.category === "房产") return Math.max(5000, Math.floor(good.base * 0.6));
  return Math.max(8, Math.floor(good.base * 0.5));
}

function getSpreadRange(good) {
  if (good.category === "快货") return [2, Math.max(6, Math.floor(good.base * 0.08))];
  if (good.category === "股票") return [Math.max(12, Math.floor(good.base * 0.05)), Math.max(48, Math.floor(good.base * 0.2))];
  if (good.category === "金融") return [Math.max(8, Math.floor(good.base * 0.04)), Math.max(32, Math.floor(good.base * 0.14))];
  if (good.category === "大件") return [Math.max(40, Math.floor(good.base * 0.03)), Math.max(220, Math.floor(good.base * 0.09))];
  if (good.category === "房产") return [Math.max(300, Math.floor(good.base * 0.02)), Math.max(2600, Math.floor(good.base * 0.08))];
  return [2, 12];
}

function getMaxActions() {
  let total = 2;
  if (state.careerSkill >= 2) total += 1;
  if (state.tradeSkill >= 3) total += 1;
  if (state.contacts >= 4 || state.socialLife >= 5) total += 1;
  if (hasBuff(state, "life-buddy")) total += 1;
  if (hasBuff(state, "cheap-bunk")) total -= 1;
  return clamp(total, 2, 5);
}

function nudgeQuoteAfterTrade(goodId, mode) {
  const good = getGood(goodId);
  const quote = state.prices[goodId];
  if (!good || !quote) return;

  const cap = getPriceCap(good);
  const floor = getPriceFloor(good);
  const volatilityScale = ["股票", "金融"].includes(good.category) ? 2.35 : ["大件", "房产"].includes(good.category) ? 1.05 : 0.8;
  const minJump = Math.max(1, Math.floor(good.volatility * (volatilityScale * 0.35)));
  const maxJump = Math.max(minJump + 1, Math.floor(good.volatility * volatilityScale));
  const directional = mode === "buy" ? randInt(minJump, maxJump) : -randInt(minJump, maxJump);
  const noise = randInt(-Math.max(1, Math.floor(minJump / 2)), Math.max(1, Math.floor(minJump / 2)));
  const newMid = clamp(quote.mid + directional + noise, floor, cap);
  const [minSpread, maxSpread] = getSpreadRange(good);
  const spread = randInt(minSpread, maxSpread);
  const nextBuy = clamp(newMid + spread + randInt(0, Math.max(1, Math.floor(spread / 2))), floor, cap);
  const rawSell = newMid - randInt(Math.max(1, Math.floor(spread / 2)), spread);
  const previousSell = quote.sell;
  let nextSell = clamp(Math.min(rawSell, nextBuy - 1), floor, cap);

  if (nextSell === previousSell) {
    const forcedStep = mode === "buy" ? minJump : -minJump;
    nextSell = clamp(Math.min(previousSell + forcedStep, nextBuy - 1), floor, cap);
  }

  state.prices[goodId] = {
    mid: newMid,
    buy: nextBuy,
    sell: nextSell,
    change: newMid - quote.mid,
  };
}

function money(value) {
  const prefix = value >= 0 ? "" : "-";
  return `${prefix}¥${Math.abs(Math.round(value))}`;
}

function statTone(value, low, high) {
  if (value <= low) return "bad";
  if (value >= high) return "good";
  return "";
}

function logEntry(text) {
  state.log.unshift(`第 ${state.day} 天: ${text}`);
  state.log = state.log.slice(0, 18);
}

function recalcDailyOffers() {
  const district = getDistrict(state.district);
  state.prices = Object.fromEntries(
    GOODS.map((good) => {
      const districtShift = district.tradeBias[good.id] || 0;
      const previousMid = state.prices?.[good.id]?.mid ?? good.base;
      const isFinance = ["股票", "金融"].includes(good.category);
      const isMajorAsset = ["大件", "房产"].includes(good.category);
      const momentum = Math.round((previousMid - good.base) * (isFinance ? 0.34 : 0.1));
      const drift = isFinance ? randInt(-good.volatility * 3, good.volatility * 3) : randInt(-good.volatility, good.volatility);
      const scarcity = isFinance ? randInt(-good.volatility * 2, good.volatility * 2) : isMajorAsset ? randInt(-80, 90) : randInt(-6, 10);
      const skillAdjust = state.tradeSkill >= 2 ? -2 : 0;
      const floor = getPriceFloor(good);
      const cap = getPriceCap(good);
      const mid = clamp(good.base + districtShift + drift + scarcity + momentum + skillAdjust, floor, cap);
      const [minSpread, maxSpread] = getSpreadRange(good);
      const spread = randInt(minSpread, maxSpread);
      const buy = clamp(mid + spread + randInt(0, Math.max(1, Math.floor(spread / 2))), floor, cap);
      const sell = clamp(mid - spread + randInt(-Math.max(1, Math.floor(spread / 3)), Math.max(1, Math.floor(spread / 3))), floor, cap);
      const change = mid - previousMid;
      const safeSell = clamp(Math.min(sell, buy - 1), floor, cap);
      return [
        good.id,
        {
          mid,
          buy,
          sell: safeSell,
          change,
        },
      ];
    }),
  );

  state.jobsToday = JOBS
    .filter((job) => state.reputation >= job.minRep)
    .filter((job) => !job.requires || job.requires(state))
    .map((job) => {
      const careerBoost = state.careerSkill * 16;
      const contactBoost = state.contacts * 8;
      const payout = randInt(job.cash[0] + district.jobBias, job.cash[1] + district.jobBias * 2)
        + careerBoost
        + contactBoost
        + getJobModifier(job.id, "payout");

      return {
        ...job,
        payout,
        liveEnergy: Math.max(6, job.energy - state.grit * 2 + getJobModifier(job.id, "energy")),
        liveMood: job.mood + getJobModifier(job.id, "mood"),
      };
    });
}

function consumeAction(cost = 1) {
  if (state.actionsLeft < cost || state.gameOver || state.pendingEvent) {
    return false;
  }
  state.actionsLeft -= cost;
  return true;
}

function applyNeeds() {
  state.energy = clamp(state.energy, 0, 100);
  state.mood = clamp(state.mood, 0, 100);
  state.health = clamp(state.health, 0, 100);
  state.reputation = clamp(state.reputation, 0, 100);
  state.contacts = clamp(state.contacts, 0, 100);
  state.socialLife = clamp(state.socialLife, 0, 100);
  state.grit = clamp(state.grit, 0, 6);
  state.careerSkill = clamp(state.careerSkill, 0, 6);
  state.tradeSkill = clamp(state.tradeSkill, 0, 6);
}

function syncBackground() {
  if (!bgScene) return;
  bgScene.updateMood(state.mood, state.day, state.cash);
}

function renderStats() {
  const stats = [
    ["天数", `${state.day}/${state.maxDays}`],
    ["现金", money(state.cash)],
    ["欠款", money(state.debt)],
    ["体力", `${state.energy}`],
    ["健康", `${state.health}`],
    ["心情", `${state.mood}`],
    ["人脉", `${state.reputation}`],
  ];

  els.stats.innerHTML = stats
    .map(([label, value]) => {
      let tone = "";
      if (label === "现金") tone = statTone(state.cash, 300, 4500);
      if (label === "欠款") tone = state.debt > 3500 ? "bad" : state.debt <= 0 ? "good" : "";
      if (label === "体力") tone = statTone(state.energy, 22, 75);
      if (label === "健康") tone = statTone(state.health, 26, 76);
      if (label === "心情") tone = statTone(state.mood, 25, 78);
      if (label === "人脉") tone = statTone(state.reputation, 8, 32);
      return `
        <div class="stat">
          <div class="label">${label}</div>
          <div class="value ${tone}">${value}</div>
        </div>
      `;
    })
    .join("");
}

function renderActions() {
  const actionDefs = [
    {
      id: "rest",
      name: "睡一觉",
      text: "恢复体力 28，心情 +4，错过一点挣钱时间。",
      meta: "消耗 1 次行动",
      onClick: () => {
        if (!consumeAction()) return;
        state.energy += 28;
        state.mood += 4;
        state.health += 3;
        logEntry("你在出租屋补了一觉，醒来时天色已经往晚里偏。");
        afterAction();
      },
    },
    {
      id: "meal",
      name: "认真吃饭",
      text: "花 35 元吃顿像样的，体力 +12，健康 +8，心情 +5。",
      meta: "消耗 1 次行动",
      onClick: () => {
        if (state.cash < 35 || !consumeAction()) return;
        state.cash -= 35;
        state.energy += 12;
        state.health += 8;
        state.mood += 5;
        logEntry("你终于不是靠便利店面包续命了，整个人像重新插上电。");
        afterAction();
      },
    },
    {
      id: "network",
      name: "跑关系",
      text: "去加群、问熟人、投消息，人脉 +4 到 +8，联系人 +1，体力 -10。",
      meta: "消耗 1 次行动",
      onClick: () => {
        if (!consumeAction()) return;
        const gain = randInt(4, 8);
        state.reputation += gain;
        state.contacts += 1;
        state.energy -= 10;
        state.mood += 1;
        logEntry(`你发了一圈消息、跑了两个地方，人脉 +${gain}。`);
        afterAction();
      },
    },
    {
      id: "repay",
      name: "还一点欠款",
      text: "手里有余钱时先降压力。每次还 300 元，心情 +3。",
      meta: "消耗 1 次行动",
      onClick: () => {
        if (state.cash < 300 || state.debt <= 0 || !consumeAction()) return;
        const amount = Math.min(300, state.debt);
        state.cash -= amount;
        state.debt -= amount;
        state.mood += 3;
        logEntry(`你咬牙先还了 ${money(amount)}，账还没清，但心口轻了一点。`);
        afterAction();
      },
    },
    {
      id: "study",
      name: "学点手艺",
      text: "刷教程、跟人偷师，履历 +1 或倒货眼力 +1，后期还能提高每日行动上限。",
      meta: "消耗 1 次行动",
      onClick: () => {
        if (!consumeAction()) return;
        state.energy -= 8;
        state.mood -= 1;
        if (state.tradeSkill <= state.careerSkill) {
          state.tradeSkill += 1;
          logEntry("你泡在批发群和短视频里，渐渐能看出哪种货只是看起来热闹。");
        } else {
          state.careerSkill += 1;
          logEntry("你对着教程反复练，至少下一次碰到活时不会再完全靠蒙。");
        }
        afterAction();
      },
    },
    {
      id: "recover",
      name: "去门诊/运动",
      text: "花 60 元做一次恢复，健康 +12，心情 +3。",
      meta: "消耗 1 次行动",
      onClick: () => {
        if (state.cash < 60 || !consumeAction()) return;
        state.cash -= 60;
        state.health += 12;
        state.mood += 3;
        logEntry("你总算把恢复当成正事做了一次，不再只是等身体自己缝合。");
        afterAction();
      },
    },
    {
      id: "social",
      name: "交友/约饭",
      text: "花 68 元见人、吃饭、参加小局，交友 +1，联系人有机会增加，关系网够大后能多争取出时间。",
      meta: "消耗 1 次行动",
      onClick: () => {
        if (state.cash < 68 || !consumeAction()) return;
        state.cash -= 68;
        state.socialLife += 1;
        state.mood += 6;
        if (Math.random() < 0.65) {
          state.contacts += 1;
        }
        if (state.socialLife >= 2 && state.contacts >= 1 && !state.storyFlags.socialConnectionUsed) {
          scheduleEvent(state, 1, "social_connection");
        }
        logEntry("你去见了几个人。未必都能帮上忙，但孤独感确实没那么贴身了。");
        afterAction();
      },
    },
  ];

  els.actions.innerHTML = actionDefs
    .map(
      (action) => `
        <div class="card">
          <h3>${action.name}</h3>
          <p>${action.text}</p>
          <div class="meta">${action.meta}</div>
          <button data-action="${action.id}" ${state.gameOver ? "disabled" : ""}>执行</button>
        </div>
      `,
    )
    .join("");

  els.actions.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      const action = actionDefs.find((item) => item.id === button.dataset.action);
      action?.onClick();
    });
  });
}

function renderJobs() {
  const laneLabel = {
    street: "街头",
    delivery: "配送",
    ops: "执行",
    media: "内容",
    sales: "销售",
    service: "服务",
    tech: "技术",
  };

  els.jobs.innerHTML = state.jobsToday
    .map(
      (job) => `
        <div class="card">
          <h3>${job.name}</h3>
          <p>${job.flavor}</p>
          <div class="meta">路线 ${laneLabel[job.lane] || "杂项"} | 报酬 ${money(job.payout)} | 体力 -${job.liveEnergy} | 心情 ${job.liveMood >= 0 ? "+" : ""}${job.liveMood}</div>
          <button data-job="${job.id}" ${state.gameOver ? "disabled" : ""}>接活</button>
        </div>
      `,
    )
    .join("");

  els.jobs.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => doJob(button.dataset.job));
  });
}

function renderMarket() {
  const groups = GOODS.reduce((acc, good) => {
    acc[good.category] ||= [];
    acc[good.category].push(good);
    return acc;
  }, {});

  els.market.innerHTML = Object.entries(groups)
    .map(([category, items]) => `
      <div class="card">
        <h3>${category}</h3>
        <div class="line-list">
          ${items.map((good) => {
        const quote = state.prices[good.id];
        const buyPrice = clamp(quote.buy + getTradeBuyDelta(good.id), 1, getPriceCap(good));
        const sellPrice = clamp(quote.sell + getTradeSellDelta(good.id), 1, getPriceCap(good));
        const unlocked = canTradeGood(good);
        const changeText = quote.change === 0 ? "平" : `${quote.change > 0 ? "+" : ""}${money(quote.change)}`;
        const spreadText = money(buyPrice - sellPrice);
        return `
          <div class="line">
            <div>
              <div class="name">${good.name}</div>
              <div class="detail">${unlocked ? `中间价 ${money(quote.mid)} | 买入 ${money(buyPrice)} / 卖出 ${money(sellPrice)} | 点差 ${spreadText} | 日波动 ${changeText}` : good.requirementText}</div>
            </div>
            <div class="cta">
              <button class="ghost" data-buy="${good.id}" ${(state.gameOver || !unlocked) ? "disabled" : ""}>买 1</button>
              <button class="ghost" data-sell="${good.id}" ${(state.gameOver || !unlocked) ? "disabled" : ""}>卖 1</button>
            </div>
          </div>
        `;
      }).join("")}
        </div>
      </div>
    `)
    .join("");

  els.market.querySelectorAll("[data-buy]").forEach((button) => {
    button.addEventListener("click", () => trade(button.dataset.buy, "buy"));
  });
  els.market.querySelectorAll("[data-sell]").forEach((button) => {
    button.addEventListener("click", () => trade(button.dataset.sell, "sell"));
  });
}

function renderInventory() {
  const owned = GOODS.filter((good) => state.inventory[good.id] > 0);
  if (!owned.length) {
    els.inventory.innerHTML = `<div class="card"><p>你目前还没压任何货，也还没把现金换成车、房或股票。</p></div>`;
    return;
  }

  els.inventory.innerHTML = `
    <div class="line-list">
      ${owned.map((good) => {
        const qty = state.inventory[good.id];
        const totalCost = state.inventoryCost[good.id] || 0;
        const avgCost = qty > 0 ? totalCost / qty : 0;
        const currentSell = state.prices[good.id].sell;
        const marketValue = qty * currentSell;
        const profit = marketValue - totalCost;
        return `
          <div class="line">
            <div>
              <div class="name">${good.name}</div>
              <div class="detail">${good.category} · 库存 ${qty} 件 · 成本均价 ${money(avgCost)} · 现卖价 ${money(currentSell)}</div>
            </div>
            <div>
              <div>${money(marketValue)}</div>
              <div class="detail ${profit >= 0 ? "good" : "bad"}">浮动${profit >= 0 ? "盈利" : "亏损"} ${money(profit)}</div>
            </div>
          </div>
        `;
      }).join("")}
    </div>
  `;
}

function renderStatusBoard() {
  const buffMarkup = state.buffs.length
    ? state.buffs
        .map((buff) => `<div class="buff-chip">${buff.label} · ${buff.days} 天<br>${buff.description}</div>`)
        .join("")
    : `<div class="buff-chip">当前没有持续状态，说明你还没把任何机会或麻烦带进明天。</div>`;

  els.statusBoard.innerHTML = `
    <div class="status-grid">
      <div class="status-box">
        <div class="label">抗压</div>
        <div class="value">${state.grit}</div>
      </div>
      <div class="status-box">
        <div class="label">履历</div>
        <div class="value">${state.careerSkill}</div>
      </div>
      <div class="status-box">
        <div class="label">倒货眼力</div>
        <div class="value">${state.tradeSkill}</div>
      </div>
      <div class="status-box">
        <div class="label">联系人</div>
        <div class="value">${state.contacts}</div>
      </div>
      <div class="status-box">
        <div class="label">交友</div>
        <div class="value">${state.socialLife}</div>
      </div>
      <div class="status-box">
        <div class="label">关系状态</div>
        <div class="value">${state.storyFlags.hasPartner ? "有搭子" : "单人硬扛"}</div>
      </div>
      <div class="status-box">
        <div class="label">市场温度</div>
        <div class="value">${state.day % 2 === 0 ? "波动" : "观望"}</div>
      </div>
      <div class="status-box">
        <div class="label">行动上限</div>
        <div class="value">${getMaxActions()}</div>
      </div>
    </div>
    <div class="buff-list">${buffMarkup}</div>
  `;
}

function renderDistricts() {
  const current = getDistrict(state.district);
  els.districtSummary.textContent = `当前片区：${current.name}。${current.desc}`;

  els.districts.innerHTML = DISTRICTS.map((district) => {
    const active = district.id === state.district;
    const rentHint = state.rent + district.rentDelta;
    return `
      <div class="card">
        <h3>${district.name}</h3>
        <p>${district.desc}</p>
        <div class="meta">参考房租 ${money(rentHint)} / 7 天 | 零工机会 ${district.jobBias > 7 ? "高" : "中"}</div>
        <button data-district="${district.id}" ${active || state.gameOver ? "disabled" : ""}>${active ? "当前所在" : "搬去这里"}</button>
      </div>
    `;
  }).join("");

  els.districts.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => moveDistrict(button.dataset.district));
  });
}

function renderLog() {
  els.log.innerHTML = state.log.map((text) => `<div class="log-entry">${text}</div>`).join("");
}

function renderFooter() {
  const housing = `${state.rentCountdown} 天后交租 ${money(state.rent)}`;
  const target = `目标：现金、履历、倒货眼力和人脉一起滚起来，60 天内把日子稳住。`;
  els.footer.innerHTML = `<strong>行动剩余 ${state.actionsLeft}/${getMaxActions()}</strong> | ${housing} | 联系人 ${state.contacts} / 交友 ${state.socialLife} | ${target}`;
  els.nextDay.disabled = state.gameOver || !!state.pendingEvent;
  els.nextDay.textContent = state.actionsLeft > 0 ? "提前结束今天" : "进入下一天";
}

function renderModal() {
  if (state.pendingEvent?.type === "choice") {
    const event = state.pendingEvent.data;
    els.modal.classList.add("open");
    els.modalCard.innerHTML = `
      <h3>${event.title}</h3>
      <p>${event.text}</p>
      <div class="modal-actions">
        ${event.choices
          .map((choice, index) => `<button data-choice="${index}">${choice.label}</button>`)
          .join("")}
      </div>
    `;
    els.modalCard.querySelectorAll("[data-choice]").forEach((button) => {
      button.addEventListener("click", () => resolveChoice(Number(button.dataset.choice)));
    });
    return;
  }

  if (state.pendingEvent?.type === "ending") {
    const ending = state.pendingEvent.data;
    els.modal.classList.add("open");
    els.modalCard.innerHTML = `
      <h3>${ending.title}</h3>
      <div class="ending">${ending.body}</div>
      <div class="modal-actions">
        <button id="restart-ending">重新开局</button>
      </div>
    `;
    document.getElementById("restart-ending").addEventListener("click", () => {
      resetGame();
    });
    return;
  }

  els.modal.classList.remove("open");
  els.modalCard.innerHTML = "";
}

function render() {
  applyNeeds();
  renderStats();
  renderActions();
  renderJobs();
  renderMarket();
  renderInventory();
  renderStatusBoard();
  renderDistricts();
  renderLog();
  renderFooter();
  renderModal();
  syncBackground();
}

function afterAction() {
  applyNeeds();
  if (!checkFailState()) {
    maybeTriggerEvent();
  }
  render();
}

function doJob(jobId) {
  const job = state.jobsToday.find((item) => item.id === jobId);
  if (!job || !consumeAction()) return;
  state.cash += job.payout;
  state.energy -= job.liveEnergy;
  state.mood += job.liveMood;
  state.health += job.health;
  state.reputation += job.rep;
  state.jobHistory[job.id] = (state.jobHistory[job.id] || 0) + 1;
  if (job.id === "studio" || job.id === "editing") {
    state.careerSkill += 1;
  }
  if (job.id === "camera_assist" || job.id === "exhibition") {
    state.careerSkill += 1;
  }
  if (job.id === "qa_test" || job.id === "ops_script" || job.id === "frontend_outsource" || job.id === "miniapp_dev" || job.id === "oncall_support") {
    state.careerSkill += 1;
    if (job.id !== "qa_test") {
      state.contacts += 1;
    }
  }
  if (job.id === "booth") {
    state.tradeSkill += 1;
  }
  if (job.id === "sales_call" || job.id === "luxury_consult") {
    state.tradeSkill += 1;
    state.contacts += 1;
  }
  if (job.id === "delivery" || job.id === "warehouse") {
    state.grit += 1;
  }
  if (job.id === "barista" || job.id === "community") {
    state.socialLife += 1;
  }
  if ((state.jobHistory.studio || 0) >= 2 && state.reputation >= 24 && !state.storyFlags.studioMentorReady && !state.storyFlags.studioMentorTaken) {
    state.storyFlags.studioMentorReady = true;
    scheduleEvent(state, 1, "mentor_offer");
  }
  if (((state.jobHistory.delivery || 0) + (state.jobHistory.warehouse || 0)) >= 4 && state.grit >= 2 && !state.storyFlags.deliveryCaptainReady && !state.storyFlags.deliveryCaptainTaken) {
    state.storyFlags.deliveryCaptainReady = true;
    scheduleEvent(state, 1, "delivery_captain");
  }
  if (((state.jobHistory.temp || 0) + (state.jobHistory.exhibition || 0)) >= 3 && state.careerSkill >= 2 && !state.storyFlags.opsAgencyReady && !state.storyFlags.opsAgencyTaken) {
    state.storyFlags.opsAgencyReady = true;
    scheduleEvent(state, 1, "exhibition_agency");
  }
  if (((state.jobHistory.booth || 0) + (state.jobHistory.sales_call || 0) + (state.jobHistory.luxury_consult || 0)) >= 3 && state.contacts >= 2 && !state.storyFlags.salesClientReady && !state.storyFlags.salesClientTaken) {
    state.storyFlags.salesClientReady = true;
    scheduleEvent(state, 1, "sales_big_client");
  }
  if (((state.jobHistory.qa_test || 0) + (state.jobHistory.ops_script || 0) + (state.jobHistory.frontend_outsource || 0) + (state.jobHistory.miniapp_dev || 0) + (state.jobHistory.oncall_support || 0)) >= 3
    && state.careerSkill >= 3
    && !state.storyFlags.techContractReady
    && !state.storyFlags.techContractTaken) {
    state.storyFlags.techContractReady = true;
    scheduleEvent(state, 1, "tech_contract");
  }
  logEntry(`你接了“${job.name}”，拿到 ${money(job.payout)}。${job.flavor}`);
  afterAction();
}

function trade(goodId, mode) {
  if (state.pendingEvent || state.gameOver) return;
  const good = getGood(goodId);
  if (!good || !canTradeGood(good)) {
    logEntry(`${good?.name || "这个资产"} 现在还碰不到，你的路子还没铺到这里。`);
    render();
    return;
  }
  const quote = state.prices[goodId];
  const buyPrice = clamp(quote.buy + getTradeBuyDelta(goodId), 1, getPriceCap(good));
  const sellPrice = clamp(quote.sell + getTradeSellDelta(goodId), 1, getPriceCap(good));
  if (mode === "buy") {
    if (state.cash < buyPrice) {
      logEntry(`你想买 ${good.name}，但现金不够。`);
      render();
      return;
    }
    state.cash -= buyPrice;
    state.inventory[goodId] += 1;
    state.inventoryCost[goodId] += buyPrice;
    state.mood += 1;
    state.tradeVolume += 1;
    logEntry(`你以 ${money(buyPrice)} 买入 1 件${good.name}。`);
    nudgeQuoteAfterTrade(goodId, "buy");
  } else {
    if (state.inventory[goodId] <= 0) {
      logEntry(`你想卖 ${good.name}，但背包里已经空了。`);
      render();
      return;
    }
    const avgCost = state.inventory[goodId] > 0 ? (state.inventoryCost[goodId] || 0) / state.inventory[goodId] : 0;
    state.inventory[goodId] -= 1;
    state.inventoryCost[goodId] = Math.max(0, (state.inventoryCost[goodId] || 0) - avgCost);
    state.cash += sellPrice;
    state.mood += 1;
    state.tradeVolume += 1;
    const realized = sellPrice - avgCost;
    logEntry(`你以 ${money(sellPrice)} 卖出 1 件${good.name}，本次${realized >= 0 ? "赚" : "亏"}了 ${money(realized)}。`);
    nudgeQuoteAfterTrade(goodId, "sell");
  }
  if (state.tradeVolume >= 8 && !state.storyFlags.supplierReady && !state.storyFlags.supplierContract) {
    state.storyFlags.supplierReady = true;
    scheduleEvent(state, 1, "supplier_chain");
  }
  render();
}

function moveDistrict(districtId) {
  if (districtId === state.district || !consumeAction()) return;
  const district = getDistrict(districtId);
  state.district = districtId;
  state.energy -= 12;
  state.mood -= 2;
  state.rent = clamp(1180 + district.rentDelta, 860, 1780);
  recalcDailyOffers();
  logEntry(`你搬到了${district.name}，重新开始适应这里的房租、通勤和人情味。`);
  afterAction();
}

function findTriggeredEvent() {
  const dueIndex = state.scheduledEvents.findIndex((item) => item.day <= state.day);
  if (dueIndex >= 0) {
    const due = state.scheduledEvents.splice(dueIndex, 1)[0];
    return getEventById(due.eventId);
  }

  const available = EVENTS.filter((event) => {
    if (event.when && !event.when(state)) {
      return false;
    }
    return !["mentor_offer", "supplier_chain", "clinic_followup", "social_connection", "dating_followup"].includes(event.id);
  });
  if (!available.length) {
    return null;
  }

  const pool = available.flatMap((event) => {
    const weight = Math.max(1, Math.round((event.weight || 1) * 2));
    return Array.from({ length: weight }, () => event);
  });
  return sample(pool);
}

function maybeTriggerEvent(force = false) {
  if (state.pendingEvent || state.gameOver) return;
  if (!force && (state.actionsLeft <= 0 || Math.random() > 0.34)) {
    return;
  }
  const event = findTriggeredEvent();
  if (!event) return;
  state.pendingEvent = {
    type: "choice",
    data: event,
  };
}

function resolveChoice(index) {
  const event = state.pendingEvent?.data;
  if (!event) return;
  const choice = event.choices[index];
  const result = choice.effect(state);
  state.pendingEvent = null;
  logEntry(result);
  applyNeeds();
  checkFailState();
  render();
}

function applyBuffsAtDayEnd() {
  const expired = [];
  state.buffs.forEach((buff) => {
    if (buff.eachDay) {
      state.cash += buff.eachDay.cash || 0;
      state.energy += buff.eachDay.energy || 0;
      state.health += buff.eachDay.health || 0;
      state.mood += buff.eachDay.mood || 0;
      state.reputation += buff.eachDay.reputation || 0;
    }
    buff.days -= 1;
    if (buff.days <= 0) {
      expired.push(buff.label);
    }
  });
  state.buffs = state.buffs.filter((buff) => buff.days > 0);
  if (expired.length) {
    logEntry(`持续状态结束：${expired.join("、")}。`);
  }
}

function endDay() {
  if (state.gameOver || state.pendingEvent) return;

  if (state.actionsLeft > 0) {
    state.mood -= 1;
  }

  state.day += 1;
  state.actionsLeft = getMaxActions();
  state.energy -= 8;
  state.mood -= 4;
  state.health -= state.energy < 26 ? 4 : 1;
  state.rentCountdown -= 1;
  applyBuffsAtDayEnd();

  if (state.debt > 0 && state.cash < 500) {
    state.mood -= 2;
  }

  if (state.reputation >= 18 && state.contacts <= 1) {
    state.contacts += 1;
  }
  if (state.socialLife >= 4 && !hasBuff(state, "life-buddy") && Math.random() < 0.2) {
    state.mood += 2;
  }

  if (state.rentCountdown <= 0) {
    if (state.cash >= state.rent) {
      state.cash -= state.rent;
      state.mood += 4;
      logEntry(`你交掉了 ${money(state.rent)} 房租，余额肉眼可见地瘦了一圈。`);
    } else {
      const shortfall = state.rent - state.cash;
      state.debt += shortfall + 160;
      state.cash = 0;
      state.mood -= 12;
      state.health -= 6;
      logEntry(`房租没凑齐。你被迫借了 ${money(shortfall + 160)}，压力继续往上压。`);
    }
    state.rentCountdown = 7;
  }

  recalcDailyOffers();

  if (!checkFailState()) {
    if (state.day > state.maxDays) {
      finishRun();
    } else {
      if (state.health <= 35 && !state.storyFlags.clinicUsed) {
        scheduleEvent(state, 0, "clinic_followup");
      }
      maybeTriggerEvent(true);
    }
  }

  render();
}

function finishRun() {
  state.gameOver = true;
  const stockValue = GOODS.reduce((sum, good) => sum + state.inventory[good.id] * state.prices[good.id].sell, 0);
  const netWorth = state.cash + stockValue - state.debt;
  const growthScore = state.careerSkill * 900
    + state.tradeSkill * 900
    + state.contacts * 120
    + state.socialLife * 90
    + state.reputation * 80;
  const finalScore = netWorth + growthScore;

  let title = "还在北京";
  let body = `60 天过去了。你手里还有 ${money(state.cash)}，库存估值 ${money(stockValue)}，欠款 ${money(state.debt)}，净身位大约 ${money(netWorth)}。履历 ${state.careerSkill}，倒货眼力 ${state.tradeSkill}，联系人 ${state.contacts}，交友 ${state.socialLife}。`;

  if (finalScore >= 32000 && state.debt <= 0) {
    title = "站住脚跟";
    body += " 你不只是活了下来，还把账抹平，攒出了一点真正能滚动起来的资本。北京暂时没把你甩下去。";
  } else if (finalScore >= 22000) {
    title = "勉强稳住";
    body += " 你还没轻松，但已经从单纯卖命，走到会挑机会、会留后手的阶段。";
  } else if (finalScore >= 12000) {
    title = "继续熬";
    body += " 钱没攒下太多，好在技术和路子开始长出来了。北京仍旧很贵，但你还留在牌桌上。";
  } else {
    title = "城市把你磨了一遍";
    body += " 你没输光，只是代价明显。也许该换一种活法，也许下一次会更早学会取舍。";
  }

  state.pendingEvent = { type: "ending", data: { title, body } };
}

function checkFailState() {
  if (state.health <= 0) {
    lose("身体扛不住了", "你把每一顿饭、每一觉和每一次硬撑都拖到了后面，最后是身体先提出了退出。");
    return true;
  }
  if (state.mood <= 0) {
    lose("情绪见底", "你仍在这座城里，但已经没有力气把明天往前推。先停下，也算一种自救。");
    return true;
  }
  if (state.debt >= 9000) {
    lose("债压上来了", "你一直试图用更快的钱解决更大的窟窿，但北京很少给人无限次翻盘。");
    return true;
  }
  return false;
}

function lose(title, body) {
  state.gameOver = true;
  state.pendingEvent = { type: "ending", data: { title, body } };
}

function saveGame() {
  if (state.pendingEvent?.type === "ending") return;
  localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  logEntry("已保存当前进度。");
  render();
}

function loadGame() {
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) {
    logEntry("没有找到存档。");
    render();
    return;
  }
  const parsed = JSON.parse(raw);
  const initial = buildInitialState();
  state = {
    ...initial,
    ...parsed,
    storyFlags: {
      ...initial.storyFlags,
      ...(parsed.storyFlags || {}),
    },
    inventoryCost: {
      ...initial.inventoryCost,
      ...(parsed.inventoryCost || {}),
    },
    pendingEvent: null,
  };
  const firstPrice = Object.values(state.prices)[0];
  if (!firstPrice || typeof firstPrice === "number") {
    recalcDailyOffers();
  }
  state.actionsLeft = clamp(state.actionsLeft, 0, getMaxActions());
  GOODS.forEach((good) => {
    if (state.inventory[good.id] > 0 && !(parsed.inventoryCost && parsed.inventoryCost[good.id] > 0)) {
      state.inventoryCost[good.id] = state.inventory[good.id] * state.prices[good.id].buy;
    }
  });
  logEntry("已读取存档。");
  render();
}

function resetGame() {
  state = buildInitialState();
  recalcDailyOffers();
  state.actionsLeft = getMaxActions();
  logEntry("你拖着箱子抵达北京，银行卡里有 2200，心里还剩一点不愿认输。");
  render();
}

els.nextDay.addEventListener("click", endDay);
els.save.addEventListener("click", saveGame);
els.load.addEventListener("click", loadGame);
els.newGame.addEventListener("click", resetGame);

class BackgroundScene extends Phaser.Scene {
  constructor() {
    super("background");
  }

  create() {
    bgScene = this;
    this.w = this.scale.width;
    this.h = this.scale.height;

    this.sky = this.add.rectangle(0, 0, this.w, this.h, 0x201d22).setOrigin(0);
    this.haze = this.add.graphics();
    this.lights = this.add.group();
    this.towers = [];

    this.drawCity(62);
    this.createLights();

    this.scale.on("resize", this.resize, this);
  }

  drawCity(mood) {
    this.haze.clear();
    const top = Phaser.Display.Color.GetColor(24, 28 + Math.floor(mood / 7), 38 + Math.floor(mood / 9));
    const bottom = Phaser.Display.Color.GetColor(88 + Math.floor(mood / 5), 56, 42);
    this.haze.fillGradientStyle(top, top, bottom, bottom, 1);
    this.haze.fillRect(0, 0, this.w, this.h);

    this.towers.forEach((tower) => tower.destroy());
    this.towers = [];

    const skylineBase = this.h * 0.7;
    let x = -20;
    while (x < this.w + 40) {
      const width = randInt(40, 110);
      const height = randInt(140, 360);
      const color = Phaser.Display.Color.GetColor(30 + randInt(0, 20), 24 + randInt(0, 18), 26 + randInt(0, 14));
      const building = this.add.rectangle(x, skylineBase, width, height, color).setOrigin(0, 1);
      this.towers.push(building);

      const windowsY = skylineBase - height + 18;
      for (let wx = x + 8; wx < x + width - 10; wx += 14) {
        for (let wy = windowsY; wy < skylineBase - 12; wy += 18) {
          if (Math.random() > 0.55) {
            const light = this.add.rectangle(wx, wy, 6, 8, 0xf4d38a, randInt(20, 90) / 100).setOrigin(0, 0);
            this.towers.push(light);
          }
        }
      }
      x += width - 4;
    }

    const road = this.add.rectangle(0, this.h * 0.83, this.w, this.h * 0.17, 0x191615).setOrigin(0);
    this.towers.push(road);
    const stripe = this.add.rectangle(this.w / 2, this.h * 0.92, this.w * 0.65, 6, 0xb78445, 0.7);
    this.towers.push(stripe);
  }

  createLights() {
    for (let i = 0; i < 36; i += 1) {
      const dot = this.add.circle(randInt(0, this.w), randInt(0, this.h * 0.5), randInt(1, 3), 0xfbe7b8, Math.random() * 0.7);
      dot.speed = Math.random() * 0.12 + 0.04;
      this.lights.add(dot);
    }
  }

  updateMood(mood, day, cash) {
    const warmth = clamp(Math.floor(mood * 1.2), 16, 100);
    this.sky.fillColor = Phaser.Display.Color.GetColor(16 + Math.floor(day / 2), 18 + Math.floor(warmth / 3), 28 + Math.floor(warmth / 2));
    this.drawCity(mood);
    this.cameras.main.setZoom(clamp(1 + cash / 70000, 1, 1.06));
  }

  resize(gameSize) {
    this.w = gameSize.width;
    this.h = gameSize.height;
    this.sky.setSize(this.w, this.h);
    this.drawCity(state.mood);
  }

  update() {
    this.lights.getChildren().forEach((dot, index) => {
      dot.x += dot.speed;
      dot.y += Math.sin((this.time.now / 800) + index) * 0.03;
      if (dot.x > this.w + 20) {
        dot.x = -10;
        dot.y = randInt(0, this.h * 0.48);
      }
    });
  }
}

const game = new Phaser.Game({
  type: Phaser.AUTO,
  parent: "game-root",
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: "#15110f",
  scene: [BackgroundScene],
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
});

window.addEventListener("resize", () => {
  game.scale.resize(window.innerWidth, window.innerHeight);
});

resetGame();

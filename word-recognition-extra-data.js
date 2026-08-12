(() => {
  const library = window.WORD_LIBRARY;
  if (!library) return;

  const descriptions = {
    animals: "是一種動物。",
    stationery: "是學習或做手工時會用到的文具。",
    festivals: "是香港公眾假期之一。",
    shapes: "是數學和生活中常見的圖形概念。",
    fruits: "是一種水果。",
    insects: "是一種昆蟲或小型節肢動物。",
    instruments: "是一種可以演奏音樂的樂器。",
    "daily-items": "是日常生活中常用的家庭用品。",
    furniture: "是家居中常見的家具或佈置用品。",
    appliances: "是使用電力操作的家用電器。",
    sports: "是一種運動或體育活動。",
    weather: "是描述天氣、氣溫或氣象的詞語。",
    feelings: "是描述人的感受、心情或情緒的詞語。",
    opposites: "是相反詞學習中常用的詞語。",
    food: "是一種食物。",
    drinks: "是一種飲品。",
    places: "是一個生活中常見的地點。",
    transport: "是一種交通工具。",
    jobs: "是一種職業。"
  };

  function makeWord(categoryId, [id, zh, jyutping, en]) {
    const chunks = en.split(/\s+/);
    const phonemes = chunks.map((chunk) => `拼讀 ${[...chunk].join("-")}`);
    const explanation = descriptions[categoryId];
    return {
      id,
      zh,
      jyutping,
      en,
      ipa: "",
      chunks,
      phonemes,
      alternatives: [],
      zhGuide: `先按喇叭聽清楚，再按粵拼 ${jyutping.split(" ").join(" · ")} 逐個音節讀，最後順暢讀成「${zh}」。`,
      enGuide: `先按「慢速讀音」聽清楚每個部分，再看字母由左至右拼讀：${chunks.map((chunk) => [...chunk].join(" · ")).join(" ｜ ")}，最後連成 ${en}。`,
      zhExplain: `「${zh}」${explanation}`,
      enExplain: `${en} 解作「${zh}」。${explanation}`
    };
  }

  const extra = {
    animals: [
      ["lion", "獅子", "si1 zi2", "lion"], ["tiger", "老虎", "lou5 fu2", "tiger"],
      ["elephant", "大象", "daai6 zoeng6", "elephant"], ["monkey", "猴子", "hau4 zi2", "monkey"],
      ["panda", "熊貓", "hung4 maau1", "panda"], ["koala", "樹熊", "syu6 hung4", "koala"],
      ["kangaroo", "袋鼠", "doi6 syu2", "kangaroo"], ["zebra", "斑馬", "baan1 maa5", "zebra"],
      ["horse", "馬", "maa5", "horse"], ["cow", "牛", "ngau4", "cow"],
      ["sheep", "綿羊", "min4 joeng4", "sheep"], ["pig", "豬", "zyu1", "pig"],
      ["chicken", "雞", "gai1", "chicken"], ["duck", "鴨", "aap3", "duck"],
      ["penguin", "企鵝", "kei5 ngo4", "penguin"], ["shark", "鯊魚", "saa1 jyu4", "shark"],
      ["whale", "鯨魚", "king4 jyu4", "whale"], ["crocodile", "鱷魚", "ngok6 jyu4", "crocodile"],
      ["snake", "蛇", "se4", "snake"], ["owl", "貓頭鷹", "maau1 tau4 jing1", "owl"]
    ],
    stationery: [
      ["pen", "原子筆", "jyun4 zi2 bat1", "pen"], ["marker", "箱頭筆", "soeng1 tau4 bat1", "marker"],
      ["highlighter", "螢光筆", "jing4 gwong1 bat1", "highlighter"], ["notebook", "筆記簿", "bat1 gei3 bou2", "notebook"],
      ["exercise-book", "練習簿", "lin6 zaap6 bou2", "exercise book"], ["paper", "紙", "zi2", "paper"],
      ["scissors", "剪刀", "zin2 dou1", "scissors"], ["stapler", "釘書機", "deng3 syu1 gei1", "stapler"],
      ["paper-clip", "萬字夾", "maan6 zi6 gaap3", "paper clip"], ["pencil-case", "筆袋", "bat1 doi2", "pencil case"],
      ["sharpener", "鉛筆刨", "jyun4 bat1 paau4", "sharpener"], ["calculator", "計數機", "gai3 sou3 gei1", "calculator"],
      ["paintbrush", "畫筆", "waa2 bat1", "paintbrush"], ["palette", "調色板", "tiu4 sik1 baan2", "palette"],
      ["folder", "文件夾", "man4 gin6 gaap3", "folder"], ["sticky-note", "便利貼", "bin6 lei6 tip3", "sticky note"],
      ["compass", "圓規", "jyun4 kwai1", "compass"], ["protractor", "量角器", "loeng4 gok3 hei3", "protractor"],
      ["set-square", "三角尺", "saam1 gok3 cek3", "set square"], ["correction-tape", "改錯帶", "goi2 co3 daai3", "correction tape"]
    ],
    festivals: [
      ["lantern", "燈籠", "dang1 lung4", "lantern"], ["fireworks", "煙花", "jin1 faa1", "fireworks"],
      ["dragon-dance", "舞龍", "mou5 lung4", "dragon dance"], ["red-packet", "利是", "lei6 si6", "red packet"],
      ["mooncake", "月餅", "jyut6 beng2", "mooncake"], ["christmas-tree", "聖誕樹", "sing3 daan3 syu6", "Christmas tree"],
      ["santa-claus", "聖誕老人", "sing3 daan3 lou5 jan4", "Santa Claus"], ["present", "禮物", "lai5 mat6", "present"],
      ["easter-egg", "復活蛋", "fuk6 wut6 daan2", "Easter egg"], ["carnival", "嘉年華", "gaa1 nin4 waa4", "carnival"],
      ["diwali", "排燈節", "paai4 dang1 zit3", "Diwali"], ["eid", "開齋節", "hoi1 zaai1 zit3", "Eid"],
      ["halloween", "萬聖節", "maan6 sing3 zit3", "Halloween"], ["thanksgiving", "感恩節", "gam2 jan1 zit3", "Thanksgiving"],
      ["valentines-day", "情人節", "cing4 jan4 zit3", "Valentine's Day"], ["birthday", "生日", "saang1 jat6", "birthday"],
      ["wedding", "婚禮", "fan1 lai5", "wedding"], ["parade", "巡遊", "ceon4 jau4", "parade"],
      ["costume", "節日服裝", "zit3 jat6 fuk6 zong1", "costume"], ["celebration", "慶祝活動", "hing3 zuk1 wut6 dung6", "celebration"]
    ],
    shapes: [
      ["oval", "橢圓形", "to5 jyun4 jing4", "oval"], ["diamond", "菱形", "ling4 jing4", "diamond"],
      ["pentagon", "五邊形", "ng5 bin1 jing4", "pentagon"], ["hexagon", "六邊形", "luk6 bin1 jing4", "hexagon"],
      ["octagon", "八邊形", "baat3 bin1 jing4", "octagon"], ["semicircle", "半圓形", "bun3 jyun4 jing4", "semicircle"],
      ["cube", "正方體", "zing3 fong1 tai2", "cube"], ["cuboid", "長方體", "coeng4 fong1 tai2", "cuboid"],
      ["sphere", "球體", "kau4 tai2", "sphere"], ["cylinder", "圓柱體", "jyun4 cyu5 tai2", "cylinder"],
      ["cone", "圓錐體", "jyun4 zeoi1 tai2", "cone"], ["pyramid", "角錐體", "gok3 zeoi1 tai2", "pyramid"],
      ["prism", "稜柱體", "ling4 cyu5 tai2", "prism"], ["straight-line", "直線", "zik6 sin3", "straight line"],
      ["curved-line", "曲線", "kuk1 sin3", "curved line"], ["angle", "角", "gok3", "angle"],
      ["side", "邊", "bin1", "side"], ["corner", "角位", "gok3 wai6", "corner"],
      ["symmetry", "對稱", "deoi3 cing3", "symmetry"], ["pattern", "圖案規律", "tou4 on3 kwai1 leot6", "pattern"]
    ],
    fruits: [
      ["pear", "梨", "lei4", "pear"], ["grape", "提子", "tai4 zi2", "grape"],
      ["mango", "芒果", "mong1 gwo2", "mango"], ["pineapple", "菠蘿", "bo1 lo4", "pineapple"],
      ["peach", "桃", "tou4", "peach"], ["plum", "李子", "lei5 zi2", "plum"],
      ["cherry", "車厘子", "ce1 lei4 zi2", "cherry"], ["kiwi-fruit", "奇異果", "kei4 ji6 gwo2", "kiwi fruit"],
      ["papaya", "木瓜", "muk6 gwaa1", "papaya"], ["lemon", "檸檬", "ning4 mung1", "lemon"],
      ["lime", "青檸", "ceng1 ning4", "lime"], ["coconut", "椰子", "je4 zi2", "coconut"],
      ["dragon-fruit", "火龍果", "fo2 lung4 gwo2", "dragon fruit"], ["lychee", "荔枝", "lai6 zi1", "lychee"],
      ["blueberry", "藍莓", "laam4 mui4", "blueberry"], ["raspberry", "紅桑子", "hung4 song1 zi2", "raspberry"],
      ["avocado", "牛油果", "ngau4 jau4 gwo2", "avocado"], ["guava", "番石榴", "faan1 sek6 lau4", "guava"],
      ["pomegranate", "石榴", "sek6 lau4", "pomegranate"], ["grapefruit", "西柚", "sai1 jau2", "grapefruit"]
    ],
    insects: [
      ["mosquito", "蚊", "man1", "mosquito"], ["fly", "蒼蠅", "cong1 jing4", "fly"],
      ["beetle", "甲蟲", "gaap3 cung4", "beetle"], ["grasshopper", "草蜢", "cou2 maang2", "grasshopper"],
      ["cricket", "蟋蟀", "sik1 seot1", "cricket"], ["caterpillar", "毛蟲", "mou4 cung4", "caterpillar"],
      ["moth", "飛蛾", "fei1 ngo4", "moth"], ["cockroach", "曱甴", "gaat6 zaat2", "cockroach"],
      ["mantis", "螳螂", "tong4 long4", "mantis"], ["wasp", "黃蜂", "wong4 fung1", "wasp"],
      ["termite", "白蟻", "baak6 ngai5", "termite"], ["flea", "跳蚤", "tiu3 zou2", "flea"],
      ["cicada", "蟬", "sim4", "cicada"], ["firefly", "螢火蟲", "jing4 fo2 cung4", "firefly"],
      ["stick-insect", "竹節蟲", "zuk1 zit3 cung4", "stick insect"], ["water-strider", "水黽", "seoi2 man5", "water strider"],
      ["weevil", "象鼻蟲", "zoeng6 bei6 cung4", "weevil"], ["silverfish", "衣魚", "ji1 jyu4", "silverfish"],
      ["earwig", "蠼螋", "keoi4 sau1", "earwig"], ["aphid", "蚜蟲", "ngaa4 cung4", "aphid"]
    ],
    instruments: [
      ["trumpet", "小號", "siu2 hou6", "trumpet"], ["trombone", "長號", "coeng4 hou6", "trombone"],
      ["saxophone", "色士風", "sik1 si6 fung1", "saxophone"], ["clarinet", "單簧管", "daan1 wong4 gun2", "clarinet"],
      ["oboe", "雙簧管", "soeng1 wong4 gun2", "oboe"], ["recorder", "牧童笛", "muk6 tung4 dek6", "recorder"],
      ["cello", "大提琴", "daai6 tai4 kam4", "cello"], ["harp", "豎琴", "syu6 kam4", "harp"],
      ["ukulele", "夏威夷小結他", "haa6 wai1 ji4 siu2 git3 taa1", "ukulele"], ["keyboard", "電子琴", "din6 zi2 kam4", "keyboard"],
      ["xylophone", "木琴", "muk6 kam4", "xylophone"], ["tambourine", "鈴鼓", "ling4 gu2", "tambourine"],
      ["triangle-instrument", "三角鐵", "saam1 gok3 tit3", "triangle"], ["cymbals", "鈸", "bat6", "cymbals"],
      ["maracas", "沙槌", "saa1 ceoi4", "maracas"], ["accordion", "手風琴", "sau2 fung1 kam4", "accordion"],
      ["harmonica", "口琴", "hau2 kam4", "harmonica"], ["bass-guitar", "低音結他", "dai1 jam1 git3 taa1", "bass guitar"],
      ["french-horn", "法國號", "faat3 gwok3 hou6", "French horn"], ["tuba", "大號", "daai6 hou6", "tuba"]
    ],
    "daily-items": [
      ["soap", "肥皂", "fei4 zou6", "soap"], ["shampoo", "洗頭水", "sai2 tau4 seoi2", "shampoo"],
      ["comb", "梳", "so1", "comb"], ["hairbrush", "髮刷", "faat3 caat2", "hairbrush"],
      ["toothpaste", "牙膏", "ngaa4 gou1", "toothpaste"], ["tissue", "紙巾", "zi2 gan1", "tissue"],
      ["toilet-paper", "廁紙", "ci3 zi2", "toilet paper"], ["slippers", "拖鞋", "to1 haai4", "slippers"],
      ["shoes", "鞋", "haai4", "shoes"], ["socks", "襪", "mat6", "socks"],
      ["hat", "帽", "mou6", "hat"], ["gloves", "手套", "sau2 tou3", "gloves"],
      ["belt", "皮帶", "pei4 daai3", "belt"], ["wallet", "銀包", "ngan4 baau1", "wallet"],
      ["key", "鎖匙", "so2 si4", "key"], ["lunch-box", "飯盒", "faan6 hap6", "lunch box"],
      ["bottle", "水樽", "seoi2 zeon1", "bottle"], ["shopping-bag", "購物袋", "kau3 mat6 doi2", "shopping bag"],
      ["clock", "時鐘", "si4 zung1", "clock"], ["mirror", "鏡", "geng3", "mirror"]
    ],
    furniture: [
      ["desk", "書桌", "syu1 coek3", "desk"], ["stool", "櫈仔", "dang3 zai2", "stool"],
      ["bookshelf", "書架", "syu1 gaa2", "bookshelf"], ["cabinet", "儲物櫃", "cyu5 mat6 gwai6", "cabinet"],
      ["drawer", "抽屜", "cau1 tai3", "drawer"], ["cupboard", "碗櫃", "wun2 gwai6", "cupboard"],
      ["dining-table", "餐桌", "caan1 coek3", "dining table"], ["coffee-table", "茶几", "caa4 gei1", "coffee table"],
      ["bedside-table", "床頭櫃", "cong4 tau4 gwai6", "bedside table"], ["armchair", "扶手椅", "fu4 sau2 ji2", "armchair"],
      ["bench", "長櫈", "coeng4 dang3", "bench"], ["bunk-bed", "碌架床", "luk1 gaa2 cong4", "bunk bed"],
      ["mattress", "床褥", "cong4 juk6", "mattress"], ["pillow", "枕頭", "zam2 tau4", "pillow"],
      ["blanket", "毛氈", "mou4 zin1", "blanket"], ["curtain", "窗簾", "coeng1 lim4", "curtain"],
      ["carpet", "地氈", "dei6 zin1", "carpet"], ["lamp", "座檯燈", "zo6 toi4 dang1", "lamp"],
      ["shelf", "層架", "cang4 gaa2", "shelf"], ["shoe-rack", "鞋架", "haai4 gaa2", "shoe rack"]
    ],
    appliances: [
      ["microwave", "微波爐", "mei4 bo1 lou4", "microwave"], ["oven", "焗爐", "guk6 lou4", "oven"],
      ["cooker", "煮食爐", "zyu2 sik6 lou4", "cooker"], ["rice-cooker", "電飯煲", "din6 faan6 bou1", "rice cooker"],
      ["kettle", "電熱水壺", "din6 jit6 seoi2 wu4", "kettle"], ["toaster", "多士爐", "do1 si2 lou4", "toaster"],
      ["blender", "攪拌機", "gaau2 bun6 gei1", "blender"], ["vacuum-cleaner", "吸塵機", "kap1 can4 gei1", "vacuum cleaner"],
      ["hair-dryer", "風筒", "fung1 tung2", "hair dryer"], ["iron", "熨斗", "tong3 dau2", "iron"],
      ["dishwasher", "洗碗碟機", "sai2 wun2 dip6 gei1", "dishwasher"], ["computer", "電腦", "din6 nou5", "computer"],
      ["laptop", "手提電腦", "sau2 tai4 din6 nou5", "laptop"], ["printer", "打印機", "daa2 jan3 gei1", "printer"],
      ["speaker", "揚聲器", "joeng4 seng1 hei3", "speaker"], ["radio", "收音機", "sau1 jam1 gei1", "radio"],
      ["camera", "相機", "soeng2 gei1", "camera"], ["electric-toothbrush", "電動牙刷", "din6 dung6 ngaa4 caat2", "electric toothbrush"],
      ["dehumidifier", "抽濕機", "cau1 sap1 gei1", "dehumidifier"], ["air-purifier", "空氣清新機", "hung1 hei3 cing1 san1 gei1", "air purifier"]
    ],
    sports: [
      ["tennis", "網球", "mong5 kau4", "tennis"], ["table-tennis", "乒乓球", "bing1 bam1 kau4", "table tennis"],
      ["volleyball", "排球", "paai4 kau4", "volleyball"], ["rugby", "欖球", "laam5 kau4", "rugby"],
      ["golf", "高爾夫球", "gou1 ji5 fu1 kau4", "golf"], ["cycling", "踏單車", "daap6 daan1 ce1", "cycling"],
      ["skipping", "跳繩", "tiu3 sing4", "skipping"], ["gymnastics", "體操", "tai2 cou1", "gymnastics"],
      ["dancing", "跳舞", "tiu3 mou5", "dancing"], ["hiking", "行山", "haang4 saan1", "hiking"],
      ["karate", "空手道", "hung1 sau2 dou6", "karate"], ["judo", "柔道", "jau4 dou6", "judo"],
      ["fencing", "劍擊", "gim3 gik1", "fencing"], ["archery", "射箭", "se6 zin3", "archery"],
      ["baseball", "棒球", "paang5 kau4", "baseball"], ["softball", "壘球", "leoi5 kau4", "softball"],
      ["hockey", "曲棍球", "kuk1 gwan3 kau4", "hockey"], ["ice-skating", "溜冰", "lau6 bing1", "ice skating"],
      ["surfing", "滑浪", "waat6 long6", "surfing"], ["bowling", "保齡球", "bou2 ling4 kau4", "bowling"]
    ],
    weather: [
      ["hot-weather", "炎熱", "jim4 jit6", "hot"], ["cold-weather", "寒冷", "hon4 laang5", "cold"],
      ["warm", "溫暖", "wan1 nyun5", "warm"], ["cool", "清涼", "cing1 loeng4", "cool"],
      ["dry-weather", "乾燥", "gon1 cou3", "dry"], ["humid", "潮濕", "ciu4 sap1", "humid"],
      ["foggy", "有霧", "jau5 mou6", "foggy"], ["snowy", "下雪", "haa6 syut3", "snowy"],
      ["stormy", "有暴風雨", "jau5 bou6 fung1 jyu5", "stormy"], ["lightning", "閃電", "sim2 din6", "lightning"],
      ["thunder", "雷聲", "leoi4 seng1", "thunder"], ["rainbow", "彩虹", "coi2 hung4", "rainbow"],
      ["drizzle", "毛毛雨", "mou4 mou4 jyu5", "drizzle"], ["shower", "驟雨", "zaau6 jyu5", "shower"],
      ["heavy-rain", "大雨", "daai6 jyu5", "heavy rain"], ["hail", "冰雹", "bing1 bok6", "hail"],
      ["typhoon", "颱風", "toi4 fung1", "typhoon"], ["temperature", "氣溫", "hei3 wan1", "temperature"],
      ["forecast", "天氣預報", "tin1 hei3 jyu6 bou3", "forecast"], ["season", "季節", "gwai3 zit3", "season"]
    ],
    feelings: [
      ["calm", "平靜", "ping4 zing6", "calm"], ["worried", "擔心", "daam1 sam1", "worried"],
      ["nervous", "緊張", "gan2 zoeng1", "nervous"], ["surprised", "驚訝", "ging1 ngaa6", "surprised"],
      ["bored", "沉悶", "cam4 mun6", "bored"], ["tired", "疲倦", "pei4 gyun6", "tired"],
      ["sleepy", "眼瞓", "ngaan5 fan3", "sleepy"], ["proud", "自豪", "zi6 hou4", "proud"],
      ["shy", "害羞", "hoi6 sau1", "shy"], ["lonely", "孤單", "gu1 daan1", "lonely"],
      ["confused", "困惑", "kwan3 waak6", "confused"], ["disappointed", "失望", "sat1 mong6", "disappointed"],
      ["jealous", "妒忌", "dou3 gei6", "jealous"], ["grateful", "感激", "gam2 gik1", "grateful"],
      ["hopeful", "有希望", "jau5 hei1 mong6", "hopeful"], ["curious", "好奇", "hou3 kei4", "curious"],
      ["relaxed", "放鬆", "fong3 sung1", "relaxed"], ["embarrassed", "尷尬", "gaam3 gaai3", "embarrassed"],
      ["frustrated", "挫敗", "co3 baai6", "frustrated"], ["brave", "勇敢", "jung5 gam2", "brave"],
      ["confident", "有信心", "jau5 seon3 sam1", "confident"], ["cheerful", "開朗", "hoi1 long5", "cheerful"],
      ["upset", "難過", "naan4 gwo3", "upset"], ["delighted", "欣喜", "jan1 hei2", "delighted"],
      ["miserable", "苦惱", "fu2 nou5", "miserable"], ["comfortable", "舒服", "syu1 fuk6", "comfortable"],
      ["uncomfortable", "不舒服", "bat1 syu1 fuk6", "uncomfortable"], ["interested", "感興趣", "gam2 hing3 ceoi3", "interested"],
      ["impatient", "不耐煩", "bat1 noi6 faan4", "impatient"], ["satisfied", "滿足", "mun5 zuk1", "satisfied"]
    ],
    opposites: [
      ["light", "輕", "hing1", "light"], ["heavy", "重", "cung5", "heavy"],
      ["full", "滿", "mun5", "full"], ["empty", "空", "hung1", "empty"],
      ["open", "打開", "daa2 hoi1", "open"], ["closed", "關閉", "gwaan1 bai3", "closed"],
      ["wet", "濕", "sap1", "wet"], ["dry", "乾", "gon1", "dry"],
      ["old", "年老", "nin4 lou5", "old"], ["young", "年輕", "nin4 hing1", "young"],
      ["hard", "硬", "ngaang6", "hard"], ["soft", "柔軟", "jau4 jyun5", "soft"],
      ["near", "近", "gan6", "near"], ["far", "遠", "jyun5", "far"],
      ["up", "上", "soeng6", "up"], ["down", "下", "haa6", "down"],
      ["inside", "裏面", "leoi5 min6", "inside"], ["outside", "外面", "ngoi6 min6", "outside"],
      ["same", "相同", "soeng1 tung4", "same"], ["different", "不同", "bat1 tung4", "different"]
    ],
    food: [
      ["chicken-food", "雞肉", "gai1 juk6", "chicken"], ["fish-food", "魚", "jyu4", "fish"],
      ["beef", "牛肉", "ngau4 juk6", "beef"], ["pork", "豬肉", "zyu1 juk6", "pork"],
      ["sausage", "香腸", "hoeng1 coeng2", "sausage"], ["cheese", "芝士", "zi1 si2", "cheese"],
      ["sandwich", "三文治", "saam1 man4 zi6", "sandwich"], ["pizza", "薄餅", "bok6 beng2", "pizza"],
      ["hamburger", "漢堡包", "hon3 bou2 baau1", "hamburger"], ["soup", "湯", "tong1", "soup"],
      ["salad", "沙律", "saa1 leot6", "salad"], ["dumpling", "餃子", "gaau2 zi2", "dumpling"],
      ["congee", "粥", "zuk1", "congee"], ["spaghetti", "意大利粉", "ji3 daai6 lei6 fan2", "spaghetti"],
      ["cereal", "穀物早餐", "guk1 mat6 zou2 caan1", "cereal"], ["biscuit", "餅乾", "beng2 gon1", "biscuit"],
      ["cake", "蛋糕", "daan6 gou1", "cake"], ["chocolate", "朱古力", "zyu1 gu2 lik6", "chocolate"],
      ["vegetable", "蔬菜", "so1 coi3", "vegetable"], ["tofu", "豆腐", "dau6 fu6", "tofu"]
    ],
    drinks: [
      ["tea", "茶", "caa4", "tea"], ["coffee", "咖啡", "gaa3 fe1", "coffee"],
      ["orange-juice", "橙汁", "caang2 zap1", "orange juice"], ["apple-juice", "蘋果汁", "ping4 gwo2 zap1", "apple juice"],
      ["soy-milk", "豆漿", "dau6 zoeng1", "soy milk"], ["chocolate-milk", "朱古力奶", "zyu1 gu2 lik6 naai5", "chocolate milk"],
      ["smoothie", "果昔", "gwo2 sik1", "smoothie"], ["milkshake", "奶昔", "naai5 sik1", "milkshake"],
      ["lemonade", "檸檬水", "ning4 mung1 seoi2", "lemonade"], ["coconut-water", "椰青水", "je4 ceng1 seoi2", "coconut water"],
      ["sparkling-water", "有氣水", "jau5 hei3 seoi2", "sparkling water"], ["herbal-tea", "涼茶", "loeng4 caa4", "herbal tea"],
      ["green-tea", "綠茶", "luk6 caa4", "green tea"], ["iced-tea", "凍茶", "dung3 caa4", "iced tea"],
      ["honey-water", "蜜糖水", "mat6 tong4 seoi2", "honey water"], ["yoghurt-drink", "乳酪飲品", "jyu5 lok6 jam2 ban2", "yoghurt drink"],
      ["barley-water", "薏米水", "ji3 mai5 seoi2", "barley water"], ["fruit-punch", "雜果賓治", "zaap6 gwo2 ban1 zi6", "fruit punch"],
      ["soda", "汽水", "hei3 seoi2", "soda"], ["hot-water", "熱水", "jit6 seoi2", "hot water"]
    ],
    places: [
      ["home", "家", "gaa1", "home"], ["classroom", "課室", "fo3 sat1", "classroom"],
      ["playground", "遊樂場", "jau4 lok6 coeng4", "playground"], ["restaurant", "餐廳", "caan1 teng1", "restaurant"],
      ["bakery", "麵包店", "min6 baau1 dim3", "bakery"], ["post-office", "郵政局", "jau4 zing3 guk6", "post office"],
      ["police-station", "警署", "ging2 cyu5", "police station"], ["fire-station", "消防局", "siu1 fong4 guk6", "fire station"],
      ["bank", "銀行", "ngan4 hong4", "bank"], ["market", "街市", "gaai1 si5", "market"],
      ["shopping-centre", "商場", "soeng1 coeng4", "shopping centre"], ["cinema", "戲院", "hei3 jyun2", "cinema"],
      ["museum", "博物館", "bok3 mat6 gun2", "museum"], ["zoo", "動物園", "dung6 mat6 jyun2", "zoo"],
      ["aquarium", "水族館", "seoi2 zuk6 gun2", "aquarium"], ["airport", "機場", "gei1 coeng4", "airport"],
      ["bus-stop", "巴士站", "baa1 si2 zaam6", "bus stop"], ["railway-station", "火車站", "fo2 ce1 zaam6", "railway station"],
      ["beach", "沙灘", "saa1 taan1", "beach"], ["swimming-pool", "游泳池", "jau4 wing6 ci4", "swimming pool"]
    ],
    transport: [
      ["car", "私家車", "si1 gaa1 ce1", "car"], ["minibus", "小巴", "siu2 baa1", "minibus"],
      ["tram", "電車", "din6 ce1", "tram"], ["ferry", "渡輪", "dou6 leon4", "ferry"],
      ["ship", "輪船", "leon4 syun4", "ship"], ["boat", "小船", "siu2 syun4", "boat"],
      ["van", "客貨車", "haak3 fo3 ce1", "van"], ["lorry", "貨車", "fo3 ce1", "lorry"],
      ["motorcycle", "電單車", "din6 daan1 ce1", "motorcycle"], ["scooter", "滑板車", "waat6 baan2 ce1", "scooter"],
      ["helicopter", "直升機", "zik6 sing1 gei1", "helicopter"], ["rocket", "火箭", "fo2 zin3", "rocket"],
      ["ambulance", "救護車", "gau3 wu6 ce1", "ambulance"], ["fire-engine", "消防車", "siu1 fong4 ce1", "fire engine"],
      ["police-car", "警車", "ging2 ce1", "police car"], ["school-bus", "校巴", "haau6 baa1", "school bus"],
      ["cable-car", "纜車", "laam6 ce1", "cable car"], ["light-rail", "輕鐵", "hing1 tit3", "light rail"],
      ["underground", "地鐵", "dei6 tit3", "underground"], ["coach", "旅遊巴", "leoi5 jau4 baa1", "coach"]
    ],
    jobs: [
      ["nurse", "護士", "wu6 si6", "nurse"], ["dentist", "牙醫", "ngaa4 ji1", "dentist"],
      ["veterinarian", "獸醫", "sau3 ji1", "veterinarian"], ["engineer", "工程師", "gung1 cing4 si1", "engineer"],
      ["architect", "建築師", "gin3 zuk1 si1", "architect"], ["farmer", "農夫", "nung4 fu1", "farmer"],
      ["baker", "麵包師傅", "min6 baau1 si1 fu2", "baker"], ["waiter", "侍應", "si6 jing3", "waiter"],
      ["driver", "司機", "si1 gei1", "driver"], ["pilot", "機師", "gei1 si1", "pilot"],
      ["flight-attendant", "空中服務員", "hung1 zung1 fuk6 mou6 jyun4", "flight attendant"], ["postman", "郵差", "jau4 caai1", "postman"],
      ["librarian", "圖書館員", "tou4 syu1 gun2 jyun4", "librarian"], ["scientist", "科學家", "fo1 hok6 gaa1", "scientist"],
      ["artist", "藝術家", "ngai6 seot6 gaa1", "artist"], ["musician", "音樂家", "jam1 ngok6 gaa1", "musician"],
      ["actor", "演員", "jin2 jyun4", "actor"], ["photographer", "攝影師", "sip3 jing2 si1", "photographer"],
      ["mechanic", "機械技工", "gei1 haai6 gei6 gung1", "mechanic"], ["shop-assistant", "售貨員", "sau6 fo3 jyun4", "shop assistant"]
    ]
  };

  Object.entries(extra).forEach(([categoryId, rows]) => {
    library.items[categoryId].push(...rows.map((row) => makeWord(categoryId, row)));
  });

  // Keep this topic focused on simple festival names that are observed as
  // Hong Kong general holidays. Substitute-day wording and dates change from
  // year to year, so children learn the festival name itself here.
  library.items.festivals = [
    ["hk2026-first-day-january", "一月一日", "jat1 jyut6 jat1 jat6", "The first day of January"],
    ["hk2026-lunar-new-years-day", "農曆年初一", "nung4 lik6 nin4 co1 jat1", "Lunar New Year’s Day"],
    ["hk2026-second-day-lunar-new-year", "農曆年初二", "nung4 lik6 nin4 co1 ji6", "The second day of Lunar New Year"],
    ["hk2026-third-day-lunar-new-year", "農曆年初三", "nung4 lik6 nin4 co1 saam1", "The third day of Lunar New Year"],
    ["hk2026-good-friday", "耶穌受難節", "je4 sou1 sau6 naan6 zit3", "Good Friday"],
    ["hk2026-day-following-good-friday", "耶穌受難節翌日", "je4 sou1 sau6 naan6 zit3 jik6 jat6", "The day following Good Friday"],
    ["hk2026-day-following-ching-ming", "清明節翌日", "cing1 ming4 zit3 jik6 jat6", "The day following Ching Ming Festival"],
    ["hk2026-day-following-easter-monday", "復活節星期一翌日", "fuk6 wut6 zit3 sing1 kei4 jat1 jik6 jat6", "The day following Easter Monday"],
    ["hk2026-labour-day", "勞動節", "lou4 dung6 zit3", "Labour Day"],
    ["hk2026-day-following-buddha", "佛誕翌日", "fat6 daan3 jik6 jat6", "The day following the Birthday of the Buddha"],
    ["hk2026-tuen-ng", "端午節", "dyun1 ng5 zit3", "Tuen Ng Festival"],
    ["hk2026-establishment-day", "香港特別行政區成立紀念日", "hoeng1 gong2 dak6 bit6 hang4 zing3 keoi1 sing4 lap6 gei2 nim6 jat6", "Hong Kong Special Administrative Region Establishment Day"],
    ["hk2026-day-following-mid-autumn", "中秋節翌日", "zung1 cau1 zit3 jik6 jat6", "The day following the Chinese Mid-Autumn Festival"],
    ["hk2026-national-day", "國慶日", "gwok3 hing3 jat6", "National Day"],
    ["hk2026-day-following-chung-yeung", "重陽節翌日", "cung4 joeng4 zit3 jik6 jat6", "The day following Chung Yeung Festival"],
    ["hk2026-christmas-day", "聖誕節", "sing3 daan3 zit3", "Christmas Day"],
    ["hk2026-first-weekday-after-christmas", "聖誕節後第一個周日", "sing3 daan3 zit3 hau6 dai6 jat1 go3 zau1 jat6", "The first weekday after Christmas Day"]
  ].map((row) => makeWord("festivals", row));
})();

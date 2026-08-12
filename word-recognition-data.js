(() => {
  const categories = [
    { id: "animals", zh: "動物名", en: "Animals", icon: "🐾" },
    { id: "stationery", zh: "文具", en: "Stationery", icon: "✏️" },
    { id: "festivals", zh: "節日", en: "Festivals", icon: "🎊" },
    { id: "shapes", zh: "圖形", en: "Shapes", icon: "🔷" },
    { id: "fruits", zh: "水果", en: "Fruits", icon: "🍎" },
    { id: "insects", zh: "昆蟲", en: "Insects", icon: "🐞" },
    { id: "instruments", zh: "樂器", en: "Instruments", icon: "🎵" },
    { id: "daily-items", zh: "家庭用品", en: "Daily Items", icon: "🪥" },
    { id: "furniture", zh: "家居用品", en: "Furniture", icon: "🛋️" },
    { id: "appliances", zh: "電器", en: "Appliances", icon: "🔌" },
    { id: "sports", zh: "運動", en: "Sports", icon: "⚽" },
    { id: "weather", zh: "天氣", en: "Weather", icon: "🌤️" },
    { id: "feelings", zh: "感覺", en: "Feelings", icon: "😊" },
    { id: "opposites", zh: "相反詞", en: "Opposites", icon: "↔️" },
    { id: "food", zh: "食物", en: "Food", icon: "🍽️" },
    { id: "drinks", zh: "飲品", en: "Drinks", icon: "🥛" },
    { id: "places", zh: "地點", en: "Places", icon: "🏫" },
    { id: "transport", zh: "交通工具", en: "Transport", icon: "🚌" },
    { id: "jobs", zh: "職業", en: "Jobs", icon: "👩‍🏫" }
  ];

  function word(id, zh, jyutping, en, ipa, chunks, phonemes, explain, note = "", alternatives = []) {
    const chunkList = chunks.split("|");
    const phonemeList = phonemes.split("|");
    return {
      id,
      zh,
      jyutping,
      en,
      ipa,
      chunks: chunkList,
      phonemes: phonemeList,
      alternatives,
      zhGuide: [...zh].length === 1
        ? `讀作「${zh}」（${jyutping}）。先聽清楚聲母、韻母和聲調，再完整讀一次。`
        : `先按粵拼 ${jyutping.split(" ").join(" · ")} 逐個音節讀，再順暢連成「${zh}」。`,
      enGuide: `先讀 ${phonemeList.join("、")}，再把 ${chunkList.join(" · ")} 連起來讀成 ${en}。${note}`,
      zhExplain: `「${zh}」${explain}`,
      enExplain: `${en} 解作「${zh}」。${explain}`
    };
  }

  const items = {
    animals: [
      word("cat", "貓", "maau1", "cat", "/kæt/", "c|a|t", "/k/|/æ/|/t/", "是一種常見寵物，會喵喵叫。"),
      word("dog", "狗", "gau2", "dog", "/dɒɡ/", "d|o|g", "/d/|/ɒ/|/ɡ/", "是一種常見寵物，嗅覺十分靈敏。"),
      word("rabbit", "兔", "tou3", "rabbit", "/ˈræbɪt/", "rab|bit", "/ræb/|/ɪt/", "有長耳朵，通常喜歡吃草和蔬菜。"),
      word("dolphin", "海豚", "hoi2 tyun4", "dolphin", "/ˈdɒlfɪn/", "dol|phin", "/dɒl/|/fɪn/", "生活在海中，是聰明的哺乳類動物。"),
      word("giraffe", "長頸鹿", "coeng4 geng2 luk6", "giraffe", "/dʒɪˈrɑːf/", "gi|raffe", "/dʒɪ/|/ˈrɑːf/", "頸部很長，可以吃到高處的樹葉。")
    ],
    stationery: [
      word("pencil", "鉛筆", "jyun4 bat1", "pencil", "/ˈpensəl/", "pen|cil", "/pen/|/səl/", "用來寫字或畫畫，寫錯時可以擦去。"),
      word("ruler", "間尺", "gaan3 cek3", "ruler", "/ˈruːlə/", "ru|ler", "/ruː/|/lə/", "用來量度長度，也可以畫直線。"),
      word("rubber", "擦膠", "caat3 gaau1", "rubber", "/ˈrʌbə/", "rub|ber", "/rʌb/|/ə/", "用來擦去鉛筆寫下的字。", "英式英語常用 rubber；美式英語常用 eraser。", ["eraser"]),
      word("glue", "膠水", "gaau1 seoi2", "glue", "/ɡluː/", "gl|ue", "/ɡl/|/uː/", "用來把紙張或物件黏在一起。"),
      word("crayon", "蠟筆", "laap6 bat1", "crayon", "/ˈkreɪɒn/", "cray|on", "/kreɪ/|/ɒn/", "是一種有顏色的畫筆，主要由蠟製成。")
    ],
    festivals: [
      word("lunar-new-year", "農曆新年", "nung4 lik6 san1 nin4", "Lunar New Year", "/ˌluːnə njuː ˈjɪə/", "Lu|nar|New|Year", "/luː/|/nə/|/njuː/|/jɪə/", "是按農曆慶祝新一年的重要節日。"),
      word("mid-autumn-festival", "中秋節", "zung1 cau1 zit3", "Mid-Autumn Festival", "/ˌmɪd ˈɔːtəm ˈfestɪvəl/", "Mid|Au|tumn|Festival", "/mɪd/|/ɔː/|/təm/|/ˈfestɪvəl/", "在農曆八月十五慶祝，人們會賞月和吃月餅。"),
      word("christmas", "聖誕節", "sing3 daan3 zit3", "Christmas", "/ˈkrɪsməs/", "Christ|mas", "/krɪs/|/məs/", "在十二月二十五日慶祝，常見聖誕樹和禮物。", "字母 t 在這個字中通常不讀出來。"),
      word("easter", "復活節", "fuk6 wut6 zit3", "Easter", "/ˈiːstə/", "East|er", "/iːst/|/ə/", "是春季節日，常見彩蛋和兔子圖案。"),
      word("dragon-boat-festival", "端午節", "dyun1 ng5 zit3", "Dragon Boat Festival", "/ˈdræɡən bəʊt ˈfestɪvəl/", "Drag|on|Boat|Festival", "/dræɡ/|/ən/|/bəʊt/|/ˈfestɪvəl/", "人們會觀看龍舟比賽和吃糉。")
    ],
    shapes: [
      word("circle", "圓形", "jyun4 jing4", "circle", "/ˈsɜːkəl/", "cir|cle", "/sɜː/|/kəl/", "是沒有角、外圍每一點到中心距離相同的圖形。"),
      word("square", "正方形", "zing3 fong1 jing4", "square", "/skweə/", "squ|are", "/skw/|/eə/", "有四條一樣長的邊和四個直角。"),
      word("triangle", "三角形", "saam1 gok3 jing4", "triangle", "/ˈtraɪæŋɡəl/", "tri|an|gle", "/traɪ/|/æŋ/|/ɡəl/", "有三條邊和三個角。"),
      word("rectangle", "長方形", "coeng4 fong1 jing4", "rectangle", "/ˈrektæŋɡəl/", "rec|tan|gle", "/rek/|/tæŋ/|/ɡəl/", "有四個直角，相對的邊一樣長。"),
      word("star", "星形", "sing1 jing4", "star", "/stɑː/", "st|ar", "/st/|/ɑː/", "是像星星一樣有尖角的圖形。")
    ],
    fruits: [
      word("apple", "蘋果", "ping4 gwo2", "apple", "/ˈæpəl/", "ap|ple", "/æp/|/əl/", "是一種爽脆水果，常見紅色或綠色。"),
      word("banana", "香蕉", "hoeng1 ziu1", "banana", "/bəˈnɑːnə/", "ba|na|na", "/bə/|/nɑː/|/nə/", "成熟時通常呈黃色，果肉柔軟香甜。"),
      word("orange", "橙", "caang2", "orange", "/ˈɒrɪndʒ/", "or|ange", "/ɒr/|/ɪndʒ/", "是一種多汁的柑橘類水果。"),
      word("watermelon", "西瓜", "sai1 gwaa1", "watermelon", "/ˈwɔːtəmelən/", "wa|ter|mel|on", "/wɔː/|/tə/|/mel/|/ən/", "外皮通常是綠色，果肉多汁。"),
      word("strawberry", "士多啤梨", "si6 do1 be1 lei2", "strawberry", "/ˈstrɔːbəri/", "straw|ber|ry", "/strɔː/|/bə/|/ri/", "是一種紅色小果實，表面有很多小籽。")
    ],
    insects: [
      word("butterfly", "蝴蝶", "wu4 dip6", "butterfly", "/ˈbʌtəflaɪ/", "but|ter|fly", "/bʌ/|/tə/|/flaɪ/", "有兩對翅膀，由毛蟲經過蛹期變成。"),
      word("bee", "蜜蜂", "mat6 fung1", "bee", "/biː/", "b|ee", "/b/|/iː/", "會採集花蜜，有些蜜蜂可以製造蜂蜜。"),
      word("ant", "螞蟻", "maa5 ngai5", "ant", "/ænt/", "a|n|t", "/æ/|/n/|/t/", "體型細小，通常成群生活。"),
      word("ladybird", "瓢蟲", "piu4 cung4", "ladybird", "/ˈleɪdibɜːd/", "la|dy|bird", "/leɪ/|/di/|/bɜːd/", "常見紅色翅膀和黑色圓點。", "英式英語叫 ladybird；美式英語常叫 ladybug。", ["ladybug"]),
      word("dragonfly", "蜻蜓", "cing1 ting4", "dragonfly", "/ˈdræɡənflaɪ/", "drag|on|fly", "/dræɡ/|/ən/|/flaɪ/", "有修長身體和兩對透明翅膀，常在水邊出現。")
    ],
    instruments: [
      word("piano", "鋼琴", "gong3 kam4", "piano", "/piˈænəʊ/", "pi|a|no", "/pi/|/æ/|/nəʊ/", "用琴鍵演奏，可以彈出高低不同的聲音。"),
      word("violin", "小提琴", "siu2 tai4 kam4", "violin", "/ˌvaɪəˈlɪn/", "vi|o|lin", "/vaɪ/|/ə/|/lɪn/", "用弓在琴弦上拉奏，聲音明亮。"),
      word("guitar", "結他", "git3 taa1", "guitar", "/ɡɪˈtɑː/", "gui|tar", "/ɡɪ/|/tɑː/", "通常有六條弦，可以用手指撥奏。"),
      word("drum", "鼓", "gu2", "drum", "/drʌm/", "dr|um", "/dr/|/ʌm/", "用手或鼓棍敲打，能奏出節拍。"),
      word("flute", "長笛", "coeng4 dek6", "flute", "/fluːt/", "fl|ute", "/fl/|/uːt/", "把氣吹過吹口來發聲，是木管樂器。")
    ],
    "daily-items": [
      word("toothbrush", "牙刷", "ngaa4 caat2", "toothbrush", "/ˈtuːθbrʌʃ/", "tooth|brush", "/tuːθ/|/brʌʃ/", "用來清潔牙齒，每天早晚都應使用。"),
      word("towel", "毛巾", "mou4 gan1", "towel", "/ˈtaʊəl/", "tow|el", "/taʊ/|/əl/", "用來抹乾身體、雙手或物件。"),
      word("cup", "水杯", "seoi2 bui1", "cup", "/kʌp/", "c|u|p", "/k/|/ʌ/|/p/", "是盛載飲品的小容器。"),
      word("umbrella", "雨傘", "jyu5 saan3", "umbrella", "/ʌmˈbrelə/", "um|brel|la", "/ʌm/|/brel/|/ə/", "下雨時用來遮雨，也可以遮陽。"),
      word("backpack", "背包", "bui3 baau1", "backpack", "/ˈbækpæk/", "back|pack", "/bæk/|/pæk/", "可以背在肩上，用來攜帶書本和物品。")
    ],
    furniture: [
      word("sofa", "梳化", "so1 faa2", "sofa", "/ˈsəʊfə/", "so|fa", "/səʊ/|/fə/", "是有軟墊、可以讓多人坐下的家具。"),
      word("bed", "睡床", "seoi6 cong4", "bed", "/bed/", "b|e|d", "/b/|/e/|/d/", "是用來睡覺和休息的家具。"),
      word("table", "飯桌", "faan6 coek3", "table", "/ˈteɪbəl/", "ta|ble", "/teɪ/|/bəl/", "有平面和桌腳，可用來吃飯、閱讀或放東西。"),
      word("chair", "椅子", "ji2 zi2", "chair", "/tʃeə/", "ch|air", "/tʃ/|/eə/", "是一種有座位的家具，通常供一人坐。"),
      word("wardrobe", "衣櫃", "ji1 gwai6", "wardrobe", "/ˈwɔːdrəʊb/", "ward|robe", "/wɔːd/|/rəʊb/", "用來掛起或收藏衣物。")
    ],
    appliances: [
      word("fridge", "雪櫃", "syut3 gwai6", "fridge", "/frɪdʒ/", "fr|idge", "/fr/|/ɪdʒ/", "用低溫保存食物和飲品。", "fridge 是 refrigerator 的常用簡稱。"),
      word("television", "電視", "din6 si6", "television", "/ˈtelɪvɪʒən/", "tel|e|vi|sion", "/tel/|/ɪ/|/vɪʒ/|/ən/", "可以播放影像和聲音，供人觀看節目。"),
      word("fan", "風扇", "fung1 sin3", "fan", "/fæn/", "f|a|n", "/f/|/æ/|/n/", "轉動扇葉令空氣流動，使人感到涼快。"),
      word("washing-machine", "洗衣機", "sai2 ji1 gei1", "washing machine", "/ˈwɒʃɪŋ məˌʃiːn/", "wash|ing|ma|chine", "/wɒʃ/|/ɪŋ/|/mə/|/ʃiːn/", "用水和清潔劑自動清洗衣物。"),
      word("air-conditioner", "冷氣機", "laang5 hei3 gei1", "air conditioner", "/ˈeə kəndɪʃənə/", "air|con|di|tion|er", "/eə/|/kən/|/dɪ/|/ʃən/|/ə/", "用來調節室內溫度和濕度。")
    ],
    sports: [
      word("football", "足球", "zuk1 kau4", "football", "/ˈfʊtbɔːl/", "foot|ball", "/fʊt/|/bɔːl/", "主要用腳踢球，目標是把球射入對方球門。"),
      word("basketball", "籃球", "laam4 kau4", "basketball", "/ˈbɑːskɪtbɔːl/", "bas|ket|ball", "/bɑːs/|/kɪt/|/bɔːl/", "用手運球和投籃的隊際運動。"),
      word("swimming", "游泳", "jau4 wing6", "swimming", "/ˈswɪmɪŋ/", "swim|ming", "/swɪm/|/ɪŋ/", "在水中利用手腳動作前進。"),
      word("running", "跑步", "paau2 bou6", "running", "/ˈrʌnɪŋ/", "run|ning", "/rʌn/|/ɪŋ/", "用雙腳快速向前移動的運動。"),
      word("badminton", "羽毛球", "jyu5 mou4 kau4", "badminton", "/ˈbædmɪntən/", "bad|min|ton", "/bæd/|/mɪn/|/tən/", "球員用球拍隔網擊打羽毛球。")
    ],
    weather: [
      word("sunny", "晴天", "cing4 tin1", "sunny", "/ˈsʌni/", "sun|ny", "/sʌn/|/i/", "表示天空明亮、陽光充足。"),
      word("rainy", "下雨", "haa6 jyu5", "rainy", "/ˈreɪni/", "rain|y", "/reɪn/|/i/", "表示有雨水從雲中落下。"),
      word("cloudy", "多雲", "do1 wan4", "cloudy", "/ˈklaʊdi/", "cloud|y", "/klaʊd/|/i/", "表示天空有很多雲。"),
      word("windy", "大風", "daai6 fung1", "windy", "/ˈwɪndi/", "wind|y", "/wɪnd/|/i/", "表示風勢明顯，空氣快速流動。"),
      word("thunderstorm", "雷暴", "leoi4 bou6", "thunderstorm", "/ˈθʌndəstɔːm/", "thun|der|storm", "/θʌn/|/də/|/stɔːm/", "是伴有閃電、雷聲和大雨的風暴。")
    ],
    feelings: [
      word("happy", "開心", "hoi1 sam1", "happy", "/ˈhæpi/", "hap|py", "/hæp/|/i/", "形容心情愉快、高興。"),
      word("sad", "傷心", "soeng1 sam1", "sad", "/sæd/", "s|a|d", "/s/|/æ/|/d/", "形容因失望或難過而不開心。"),
      word("angry", "生氣", "saang1 hei3", "angry", "/ˈæŋɡri/", "an|gry", "/æŋ/|/ɡri/", "形容因不滿或被冒犯而發怒。"),
      word("afraid", "害怕", "hoi6 paa3", "afraid", "/əˈfreɪd/", "a|fraid", "/ə/|/freɪd/", "形容遇到危險或陌生事物時感到恐懼。"),
      word("excited", "興奮", "hing1 fan5", "excited", "/ɪkˈsaɪtɪd/", "ex|cit|ed", "/ɪk/|/saɪt/|/ɪd/", "形容因期待或喜愛某事而十分雀躍。")
    ],
    opposites: [
      word("big", "大", "daai6", "big", "/bɪɡ/", "b|i|g", "/b/|/ɪ/|/ɡ/", "表示體積、數量或程度較多；相反詞是「小」。"),
      word("small", "小", "siu2", "small", "/smɔːl/", "sm|all", "/sm/|/ɔːl/", "表示體積、數量或程度較少；相反詞是「大」。"),
      word("tall", "高", "gou1", "tall", "/tɔːl/", "t|all", "/t/|/ɔːl/", "表示由下至上的距離較長；相反詞是「矮」。"),
      word("short", "矮", "ai2", "short", "/ʃɔːt/", "sh|or|t", "/ʃ/|/ɔː/|/t/", "用來形容身高不高；相反詞是「高」。"),
      word("fast", "快", "faai3", "fast", "/fɑːst/", "f|a|st", "/f/|/ɑː/|/st/", "表示速度高、所需時間短；相反詞是「慢」。"),
      word("slow", "慢", "maan6", "slow", "/sləʊ/", "sl|ow", "/sl/|/əʊ/", "表示速度低、需要較長時間；相反詞是「快」。"),
      word("hot", "熱", "jit6", "hot", "/hɒt/", "h|o|t", "/h/|/ɒ/|/t/", "表示溫度高；相反詞是「冷」。"),
      word("cold", "冷", "laang5", "cold", "/kəʊld/", "c|old", "/k/|/əʊld/", "表示溫度低；相反詞是「熱」。"),
      word("clean", "乾淨", "gon1 zing6", "clean", "/kliːn/", "cl|ean", "/kl/|/iːn/", "表示沒有污垢；相反詞是「骯髒」。"),
      word("dirty", "骯髒", "ong1 zong1", "dirty", "/ˈdɜːti/", "dir|ty", "/dɜː/|/ti/", "表示有污垢、不清潔；相反詞是「乾淨」。")
    ],
    food: [
      word("bread", "麵包", "min6 baau1", "bread", "/bred/", "br|ea|d", "/br/|/e/|/d/", "由麵粉和水製成，再經烘焙煮熟。"),
      word("rice", "米飯", "mai5 faan6", "rice", "/raɪs/", "r|ice", "/r/|/aɪs/", "是煮熟的米，亦是常見主食。"),
      word("egg", "雞蛋", "gai1 daan2", "egg", "/eɡ/", "e|gg", "/e/|/ɡ/", "由母雞生下，可以用多種方法烹調。"),
      word("noodles", "麵條", "min6 tiu4", "noodles", "/ˈnuːdəlz/", "noo|dles", "/nuː/|/dəlz/", "是用麵粉製成的長條狀食物。"),
      word("ice-cream", "雪糕", "syut3 gou1", "ice cream", "/ˌaɪs ˈkriːm/", "ice|cream", "/aɪs/|/kriːm/", "是冰凍而香甜的甜品。")
    ],
    drinks: [
      word("water", "清水", "cing1 seoi2", "water", "/ˈwɔːtə/", "wa|ter", "/wɔː/|/tə/", "是沒有添加糖分的水，身體每天都需要。"),
      word("milk", "牛奶", "ngau4 naai5", "milk", "/mɪlk/", "m|il|k", "/m/|/ɪl/|/k/", "是常見飲品，含有蛋白質和鈣。"),
      word("juice", "果汁", "gwo2 zap1", "juice", "/dʒuːs/", "j|ui|ce", "/dʒ/|/uː/|/s/", "是由水果榨出或製成的飲品。"),
      word("hot-chocolate", "熱朱古力", "jit6 zyu1 gu2 lik6", "hot chocolate", "/ˌhɒt ˈtʃɒklət/", "hot|choc|o|late", "/hɒt/|/tʃɒk/|/ə/|/lət/", "是用朱古力或可可製成的熱飲。"),
      word("lemon-tea", "檸檬茶", "ning4 mung1 caa4", "lemon tea", "/ˌlemən ˈtiː/", "lem|on|tea", "/lem/|/ən/|/tiː/", "是加入檸檬片或檸檬汁的茶。")
    ],
    places: [
      word("school", "學校", "hok6 haau6", "school", "/skuːl/", "sch|ool", "/sk/|/uːl/", "是學生上課、學習和參與活動的地方。"),
      word("park", "公園", "gung1 jyun2", "park", "/pɑːk/", "p|ar|k", "/p/|/ɑː/|/k/", "是供人休息、散步和玩耍的公共地方。"),
      word("library", "圖書館", "tou4 syu1 gun2", "library", "/ˈlaɪbrəri/", "li|bra|ry", "/laɪ/|/brə/|/ri/", "收藏書籍和資料，讓人閱讀或借閱。"),
      word("hospital", "醫院", "ji1 jyun2", "hospital", "/ˈhɒspɪtəl/", "hos|pi|tal", "/hɒs/|/pɪ/|/təl/", "是醫護人員為病人檢查和治療的地方。"),
      word("supermarket", "超級市場", "ciu1 kap1 si5 coeng4", "supermarket", "/ˈsuːpəmɑːkɪt/", "su|per|mar|ket", "/suː/|/pə/|/mɑː/|/kɪt/", "售賣食物、飲品和日常用品。")
    ],
    transport: [
      word("bus", "巴士", "baa1 si2", "bus", "/bʌs/", "b|u|s", "/b/|/ʌ/|/s/", "是按固定路線接載乘客的大型道路交通工具。"),
      word("train", "火車", "fo2 ce1", "train", "/treɪn/", "tr|ai|n", "/tr/|/eɪ/|/n/", "在鐵路上行駛，可以接載乘客或貨物。"),
      word("taxi", "的士", "dik1 si2", "taxi", "/ˈtæksi/", "tax|i", "/tæk/|/si/", "按乘客指定目的地行駛並收取車資。"),
      word("bicycle", "單車", "daan1 ce1", "bicycle", "/ˈbaɪsɪkəl/", "bi|cy|cle", "/baɪ/|/sɪ/|/kəl/", "有兩個車輪，靠人踩動腳踏前進。"),
      word("aeroplane", "飛機", "fei1 gei1", "aeroplane", "/ˈeərəpleɪn/", "aer|o|plane", "/eə/|/rə/|/pleɪn/", "有機翼，可以在空中飛行。", "英式英語常寫 aeroplane；airplane 多見於美式英語。", ["airplane"])
    ],
    jobs: [
      word("teacher", "老師", "lou5 si1", "teacher", "/ˈtiːtʃə/", "teach|er", "/tiːtʃ/|/ə/", "負責教導學生知識、技能和良好態度。"),
      word("doctor", "醫生", "ji1 sang1", "doctor", "/ˈdɒktə/", "doc|tor", "/dɒk/|/tə/", "為病人檢查身體、診斷和治療疾病。"),
      word("firefighter", "消防員", "siu1 fong4 jyun4", "firefighter", "/ˈfaɪəfaɪtə/", "fire|fight|er", "/faɪə/|/faɪt/|/ə/", "負責滅火、救援和保障市民安全。"),
      word("police-officer", "警察", "ging2 caat3", "police officer", "/pəˈliːs ˌɒfɪsə/", "po|lice|off|i|cer", "/pə/|/liːs/|/ɒf/|/ɪ/|/sə/", "維持治安、保護市民和調查案件。"),
      word("chef", "廚師", "cyu4 si1", "chef", "/ʃef/", "ch|e|f", "/ʃ/|/e/|/f/", "在廚房設計和烹調食物。", "這個字的 ch 讀 /ʃ/，不是 /tʃ/。")
    ]
  };

  window.WORD_LIBRARY = { categories, items };
})();

/* ==========================================================
   1. GENEL AYARLAR VE DİL VERİTABANI
   ========================================================== */
let currentLang = 'tr';
let activeCategory = null; 
let scale = 1;
let pointX = 0;
let pointY = 0;
let start = { x: 0, y: 0 };
let isDragging = false;

const translations = {
    tr: { 
        title: "Türk Devletleri Sağlık Turizmi Haritası", 
        subtitle: "Bilgi almak istediğiniz ülkeyi seçiniz.", 
        home: "Anasayfa", about: "Hakkımızda", langName: "Türkçe",
        flag: "https://flagcdn.com/w20/tr.png",
        welcomeTitle: "Hoş Geldiniz",
        welcomeSub: "Lütfen tıbbi analizler için bir kategori seçiniz.",
        analysisTitle: "📊 TIBBİ ANALİZ VE BAŞARI ORANLARI",
        callBtn: "HEMEN ARA",
        categories: ["CERRAHİ", "TERMAL", "BAKIM", "SPA"],
        countries: { "path3458": "Türkiye", "path3456": "Türkiye", "path5796": "Azerbaycan", "path3898": "Kazakistan", "path3470": "Özbekistan", "tm": "Türkmenistan", "kg": "Kırgızistan", "cy": "KKTC" }
    },
    en: { 
        title: "Turkic States Health Tourism Map", 
        subtitle: "Please select a country for information.", 
        home: "Home", about: "About Us", langName: "English",
        flag: "https://flagcdn.com/w20/gb.png",
        welcomeTitle: "Welcome",
        welcomeSub: "Please select a category for medical analysis.",
        analysisTitle: "📊 MEDICAL ANALYSIS",
        callBtn: "CALL NOW",
        categories: ["SURGERY", "THERMAL", "CARE", "SPA"],
        countries: { "path3458": "Turkey", "path3456": "Turkey", "path5796": "Azerbaijan", "path3898": "Kazakhstan", "path3470": "Uzbekistan", "tm": "Turkmenistan", "kg": "Kyrgyzstan", "cy": "TRNC" }
    },
    uz: { 
        title: "Turkiy Davlatlar Sog'liqni Saqlash Xaritasi", 
        subtitle: "Ma'lumot olish uchun davlatni tanlang.", 
        home: "Bosh sahifa", about: "Biz haqimizda", langName: "O'zbekcha",
        flag: "https://flagcdn.com/w20/uz.png",
        welcomeTitle: "Xush Kelibsiz",
        welcomeSub: "Iltimos, tahlil uchun toifani tanlang.",
        analysisTitle: "📊 TIBBIY TAHLIL",
        callBtn: "QO'NG'IROQ",
        categories: ["JARROHLIK", "TERMAL", "PARVARISH", "SPA"],
        countries: { "path3458": "Turkiya", "path3456": "Turkiya", "path5796": "Ozarbayjon", "path3898": "Qozog'iston", "path3470": "O'zbekiston", "tm": "Turkmaniston", "kg": "Qirg'iziston", "cy": "SHK" }
    }
};


/* ==========================================================
   2. BİLİMSEL VERİ MERKEZİ (AZERBAYCAN & KAZAKİSTAN - FULL DETAY)
   ========================================================== */
const countryDetailedData = {
    "Azerbaycan": {
        surgery: {
            img: "https://i.imgur.com/zNuNxEg.png", 
            phone: "+994 12 505 00 00",
            tr: {
                hospName: "Bona Dea International Hospital",
                analysis: `
                <div class="analysis-content">
                    <p>Azerbaycan, özellikle başkent Bakü'de yoğunlaşan JCI akreditasyonlu tesisleri ile Kafkasya'nın cerrahi üstüdür. Modern hastaneler, Avrupa ve Amerika eğitimli cerrah kadrosuyla yüksek başarı oranlarına sahiptir.</p>
                    <h4>👁️ Oftalmoloji ve Göz Cerrahisi</h4>
                    <p>Akademisyen Zarifa Aliyeva adına Ulusal Oftalmoloji Merkezi, dünya çapında bir ekoldür. Vitreoretinal cerrahi, kornea nakli ve bıçaksız lazer (Femto-Second) operasyonlarında bölgenin en yüksek vaka tecrübesine sahiptir. Miyopi, astigmat ve katarakt tedavilerinde başarı oranı %99'a yakındır.</p>
                    <h4>❤️ Kardiyovasküler Cerrahi</h4>
                    <p>Minimal invaziv yöntemlerle kalp kapakçığı onarımı ve robotik bypass operasyonları gerçekleştirilmektedir. Hibrit ameliyathaneler sayesinde, karmaşık vakalarda aynı anda hem girişimsel hem de cerrahi müdahale yapılabilmektedir.</p>
                    <h4>🔬 İleri Teknoloji</h4>
                    <ul>
                        <li><strong>Da Vinci Xi:</strong> Ürolojik ve onkolojik cerrahide milimetrik hassasiyet.</li>
                        <li><strong>PET-CT & 3 Tesla MR:</strong> En erken evrede tümör teşhisi ve cerrahi planlama.</li>
                    </ul>
                </div>`
            }
        },
        thermal: {
            img: "https://i.imgur.com/vHqQ9W3.jpg", 
            phone: "+994 50 205 10 10",
            tr: {
                hospName: "Chinar Hotel & Spa Naftalan",
                analysis: `
                <div class="analysis-content">
                    <p>Naftalan, dünyada tescillenmiş "iyileştirici petrolün" tek kaynağıdır. Naftenik petrol banyoları, kimyasal ilaçların yapamadığı biyolojik onarımı doğal yollarla sağlar.</p>
                    <h4>🩸 Biyolojik Etki Mekanizması</h4>
                    <p>Petrol banyosu sırasında naftenik hidrokarbonlar deri yoluyla emilerek kan dolaşımına katılır. Hücre yenilenmesini hızlandırır, bağışıklığı dengeler ve sinir uçlarındaki ağrı iletimini bloke eder.</p>
                    <h4>🩺 Tedavi Edilen Patolojiler</h4>
                    <ul>
                        <li><strong>Dermatoloji:</strong> Psoriasis (Sedef), kronik egzama ve nörodermatit. Genellikle 15 günlük kür sonrası ciltte %85 iyileşme gözlemlenir.</li>
                        <li><strong>Ortopedi:</strong> Romatoid artrit, ankilozan spondilit ve fıtık kaynaklı radikülitler.</li>
                        <li><strong>Vasküler:</strong> Alt ekstremite damar tıkanıklıkları (Endarterit).</li>
                    </ul>
                </div>`
            }
        },
        care: {
            img: "https://via.placeholder.com/300x200?text=Absheron+Rehabilitasyon", 
            phone: "+994 12 444 44 44",
            tr: {
                hospName: "Bakü Rehabilitasyon Merkezi",
                analysis: `
                <div class="analysis-content">
                    <p>Hazar Denizi'nin kıyısında, Absheron yarımadasının eşsiz mikro-klimasıyla birleşen rehabilitasyon protokolleri uygulanmaktadır.</p>
                    <h4>🧠 Nörolojik ve Fiziksel Rehabilitasyon</h4>
                    <p>İnme (felç) sonrası hastalar için Lokomat (Yürüme Robotu) ve su altı fizik tedavi yöntemleri ile motor fonksiyonların geri kazanılması hedeflenir. İyot ve brom açısından zengin deniz havası, akciğer kapasitesini artırarak iyileşme sürecini hızlandırır.</p>
                </div>`
            }
        },
        spa: {
            img: "https://via.placeholder.com/300x200?text=Galaalti+Bobrek+Sagligi",
            phone: "+994 12 999 99 99",
            tr: {
                hospName: "Galaaltı Hotel & Spa",
                analysis: `
                <div class="analysis-content">
                    <p>Galaaltı maden suyu, böbrek ve ürolojik sistem hastalıklarında dünya çapında bir üne sahiptir.</p>
                    <h4>💧 Nefrolojik Şifa</h4>
                    <p>Sodyum, kalsiyum ve magnezyum dengesi sayesinde Galaaltı suyu; böbrek kumlarının ve taşlarının (0.5 mm altı) cerrahi müdahale gerekmeden dökülmesine yardımcı olur. Aynı zamanda kronik sistit ve prostatit tedavilerinde destekleyicidir.</p>
                </div>`
            }
        }
    }, // AZERBAYCAN BİTİŞİ (VİRGÜL ÇOK ÖNEMLİ)

    "Kazakistan": {
        surgery: {
            img: "https://via.placeholder.com/300x200?text=Astana+Cardiac+Surgery", 
            phone: "+7 7172 70 31 00",
            tr: {
                hospName: "National Research Cardiac Surgery Center",
                analysis: `
                <div class="analysis-content">
                    <p>Astana'daki Ulusal Kalp Cerrahisi Merkezi, Orta Asya'da yapay kalp nakli yapabilen tek, dünyadaki sayılı merkezlerden biridir.</p>
                    <h4>🫀 İleri Kardiyoloji ve Organ Nakli</h4>
                    <ul>
                        <li><strong>HeartMate 3 (VAD):</strong> Terminal dönem kalp yetmezliği yaşayan hastalar için vücuda implante edilen kalp destek pompası teknolojisi.</li>
                        <li><strong>Hibrit Cerrahi:</strong> Tek bir seansta hem anjiyo hem de açık kalp ameliyatı yapılabilen 2024 model teknolojik odalar.</li>
                    </ul>
                    <p>Merkez, Avrupa Kalp Cerrahları Derneği (EACTS) tarafından akredite edilmiştir.</p>
                </div>`
            }
        },
        thermal: {
            img: "https://via.placeholder.com/300x200?text=Burabay+Kimiz+Tedavisi", 
            phone: "+7 716 367 16 00",
            tr: {
                hospName: "Okzhetpes Wellness & Sanatorium",
                analysis: `
                <div class="analysis-content">
                    <p>Kazakistan'ın Burabay (Borovoe) bölgesi, "Doğal Biyo-Stimülasyon" merkezi olarak kabul edilir.</p>
                    <h4>🐎 Kymyzotherapy (Kımız Tedavisi)</h4>
                    <p>Kısrak sütünün fermente edilmesiyle elde edilen Kımız, doğal bir antibiyotik ve probiyotiktir. İçeriğindeki A, B, C ve E vitaminleri ile biyolojik olarak aktif maddeler, bağışıklık sistemini "şok"layarak aktive eder.</p>
                    <h4>🫁 Pulmoner Sağlık</h4>
                    <p>Çam ormanlarından gelen reçine kokulu hava (fitonsitler) ile birleşen kımız kürleri; kronik bronşit, astım ve tüberküloz sonrası akciğer rehabilitasyonunda mucizevi sonuçlar verir.</p>
                </div>`
            }
        },
        care: {
            img: "https://via.placeholder.com/300x200?text=Altay+Pantotherapy", 
            phone: "+7 727 300 34 00",
            tr: {
                hospName: "Almaty Pantotherapy Center",
                analysis: `
                <div class="analysis-content">
                    <p>Doğu Kazakistan'ın Altay dağlarında yaşayan Maral geyiklerinin boynuzlarından elde edilen özütler (Pantokrin), dünyadaki en güçlü doğal adaptojenlerden biridir.</p>
                    <h4>🦌 Pantotherapy (Geyik Boynuzu Banyosu)</h4>
                    <ul>
                        <li><strong>Gençleşme:</strong> Hücresel bazda serbest radikallerle savaşır ve DNA onarımını destekler.</li>
                        <li><strong>Kas ve İskelet:</strong> Ameliyat sonrası doku iyileşmesini %300 oranında hızlandırır.</li>
                        <li><strong>Hormonal Denge:</strong> Endokrin sistemini düzenleyerek yaşam enerjisini (libido ve stres yönetimi) artırır.</li>
                    </ul>
                </div>`
            }
        },
        spa: {
            img: "https://via.placeholder.com/300x200?text=Almaty+High+Altitude+Spa", 
            phone: "+7 727 332 88 88",
            tr: {
                hospName: "The Ritz-Carlton Almaty Wellness",
                analysis: `
                <div class="analysis-content">
                    <p>Almatı, yüksek irtifa SPA turizminde öncüdür. Tanrı Dağları'ndan gelen saf kaynak suları ile modern wellness teknikleri birleştirilir.</p>
                    <h4>🧖 Yüksek İrtifa Terapisi</h4>
                    <p>Düşük oksijenli yüksek irtifa havası, metabolizmayı doğal olarak hızlandırır ve yağ yakımını destekler. Mineralli tuz banyoları ile cilt detoksu yapılarak vücut şehir stresinden arındırılır.</p>
                </div>`
            }
        }
    },
    "Özbekistan": {
        surgery: {
            img: "https://via.placeholder.com/300x200?text=Akfa+Medline+Tashkent", 
            phone: "+998 71 203 00 00",
            tr: {
                hospName: "Akfa Medline Tertiary Care Center (Taşkent)",
                analysis: `
                <div class="analysis-content">
                    <p>Özbekistan, Orta Asya'da "Özel Sağlık Girişimi" konusunda en hızlı büyüyen ülkedir. Taşkent'teki merkezler, özellikle Güney Kore ve Alman hastane yönetim sistemlerini rol model alarak cerrahi standartları stabilize etmiştir.</p>
                    
                    <h4>🏥 Modern Cerrahi Branşlar</h4>
                    <ul>
                        <li><strong>Robotik ve Laparoskopik Cerrahi:</strong> Genel cerrahi ve ürolojide doku hasarını minimize eden laparoskopik yöntemler %95 başarıyla uygulanmaktadır.</li>
                        <li><strong>Ortopedi ve Travmatoloji:</strong> Kalça ve diz protezi ameliyatlarında titanyum alaşımlı modern implantlar kullanılmakta, hastalar ameliyattan 24 saat sonra mobilize edilmektedir.</li>
                        <li><strong>Nöroşirürji:</strong> Beyin tümörleri ve omurga cerrahisinde mikro-nöroşirürji teknikleri kullanılmaktadır.</li>
                    </ul>

                    <h4>İbn-i Sina Mirası</h4>
                    <p>Modern cerrahi müdahaleler, fitoterapi (bitkisel tedavi) destekli post-operatif bakım programlarıyla birleştirilerek iyileşme süreci biyolojik olarak desteklenir.</p>
                </div>`
            }
        },
        thermal: {
            img: "https://via.placeholder.com/300x200?text=Khodja+Obi+Garm", 
            phone: "+998 70 202 01 01",
            tr: {
                hospName: "Humson Buloq Wellness Resort",
                analysis: `
                <div class="analysis-content">
                    <p>Özbekistan'ın termal turizmi, yer altından çıkan radyoaktif olmayan, mineralli termal suların yanı sıra "Helioterapi" (Güneş tedavisi) ile öne çıkar.</p>

                    <h4>☀️ Helioterapi ve Termal Sinerji</h4>
                    <ul>
                        <li><strong>Dermatolojik Onarım:</strong> Yılın 300 günü güneş alan bölgelerde, özel filtreli güneş banyoları ve kükürtlü termal sular; sedef, vitiligo ve kronik akne tedavilerinde %90'a varan klinik başarı sağlar.</li>
                        <li><strong>Kas-İskelet Sistemi:</strong> Sodyum-klorürlü ve kalsiyum içerikli termal havuzlar, osteokondroz ve kronik eklem iltihaplarını doğal yolla tedavi eder.</li>
                    </ul>
                </div>`
            }
        },
        care: {
            img: "https://via.placeholder.com/300x200?text=Zarkent+Tuz+Magarasi", 
            phone: "+998 90 123 45 67",
            tr: {
                hospName: "Zarkent Speleoterapi Merkezi",
                analysis: `
                <div class="analysis-content">
                    <p>Özbekistan, dünyadaki en etkili **Speleoterapi** (Tuz Mağarası Tedavisi) merkezlerinden birine ev sahipliği yapar. Yerin 300 metre altındaki doğal tuz madenleri, solunum hastaları için ilaçsız bir şifa kaynağıdır.</p>

                    <h4>🧂 Speleoterapi (Tuz Mağarası) Nasıl Çalışır?</h4>
                    <ul>
                        <li><strong>Negatif İyonize Hava:</strong> Mağara içindeki hava, alerjenlerden ve bakterilerden tamamen arınmıştır. Havada asılı kalan mikroskobik tuz partikülleri akciğerlerin en derinlerine (alveollere) ulaşır.</li>
                        <li><strong>Endikasyonlar:</strong> Kronik Astım, KOAH, Alerjik Rinit ve kronik bronşit hastalarında nefes darlığını ilk seanstan itibaren azaltır.</li>
                        <li><strong>Bağışıklık:</strong> Tuzun doğal antiseptik özelliği, üst solunum yolu enfeksiyonlarına karşı vücut direncini kalıcı olarak artırır.</li>
                    </ul>
                </div>`
            }
        },
        spa: {
            img: "https://via.placeholder.com/300x200?text=Amirsoy+Resort+Spa", 
            phone: "+998 71 200 22 90",
            tr: {
                hospName: "Amirsoy Luxury Wellness & Spa",
                analysis: `
                <div class="analysis-content">
                    <p>Özbekistan'ın dağlık bölgelerinde yer alan modern tesisler, geleneksel "Özbek Hamamı" ritüellerini modern SPA teknolojileriyle harmanlar.</p>

                    <h4>💆 Öne Çıkan Ritüeller</h4>
                    <ul>
                        <li><strong>Bahor Terapisi:</strong> Bölgesel dağ otları ve baharatlar kullanılarak yapılan detoks sarmalamaları.</li>
                        <li><strong>Yüksek Rakım Terapisi:</strong> Amirsoy bölgesinin temiz havası sayesinde yapılan nefes egzersizleri, kan oksijen seviyesini stabilize eder.</li>
                    </ul>
                </div>`
            }
        }
    },
    "Türkmenistan": {
        surgery: {
            img: "https://via.placeholder.com/300x200?text=Ashgabat+International+Medical+Center", 
            phone: "+993 12 40 03 00",
            tr: {
                hospName: "Aşkabat Uluslararası Kardiyoloji Merkezi",
                analysis: `
                <div class="analysis-content">
                    <p>Türkmenistan, başkent Aşkabat'ı bir "Sağlık Şehri"ne dönüştürerek Orta Asya'nın en teknolojik tıbbi cihaz parkurlarından birini kurmuştur. Alman ve Avusturyalı uzmanlarla ortak yürütülen cerrahi programlar, yüksek standartlarda güvenlik sunar.</p>
                    
                    <h4>💎 Cerrahi Standartlar ve Branşlar</h4>
                    <ul>
                        <li><strong>Uluslararası Tanı Merkezi:</strong> Siemens ve Philips'in en son model görüntüleme cihazlarıyla donatılmış, hata payı sıfıra yakın teşhis altyapısı mevcuttur.</li>
                        <li><strong>Kardiyovasküler Cerrahi:</strong> Akut miyokard infarktüsü ve kapak hastalıkları, minimal invaziv (kapalı) yöntemlerle, bölgedeki en modern ameliyathanelerde tedavi edilir.</li>
                        <li><strong>Göz ve Diş Cerrahisi:</strong> Ülke, bölgedeki en büyük ağız ve diş sağlığı komplekslerinden birine sahiptir; dental implant ve estetik cerrahide uzmanlaşmıştır.</li>
                    </ul>
                </div>`
            }
        },
        thermal: {
            img: "https://via.placeholder.com/300x200?text=Mollakara+Mud+Therapy", 
            phone: "+993 243 5 01 01",
            tr: {
                hospName: "Mollakara Sağlık ve Rehabilitasyon Merkezi",
                analysis: `
                <div class="analysis-content">
                    <p>Mollakara, Türkmenistan'ın batısında yer alan ve "Ölü Deniz" (Lut Gölü) ile benzer özelliklere sahip olan dünyaca ünlü bir çamur terapi merkezidir. Buradaki göl suyu ve çamur, yüksek yoğunlukta klorür, sodyum ve magnezyum içerir.</p>

                    <h4>🖤 Mollakara Çamurunun Tıbbi Mucizesi</h4>
                    <ul>
                        <li><strong>Rehabilitasyon Gücü:</strong> Çamur banyoları, ısıyı uzun süre tutarak kemik ve kas dokusuna nüfuz eder. Omurga yaralanmaları ve ameliyat sonrası skar dokularının yumuşatılmasında benzersizdir.</li>
                        <li><strong>Hangi Hastalıklar İçin?:</strong> Özellikle Kronik Prostatit, Kısırlık (Jinekolojik iltihaplar), Siyatik ve çocuklarda görülen Polio (Çocuk Felci) sekellerinin tedavisinde %92 oranında iyileşme raporlanmıştır.</li>
                    </ul>
                </div>`
            }
        },
        care: {
            img: "https://via.placeholder.com/300x200?text=Yylly+Suw+Sanatorium", 
            phone: "+993 12 39 00 00",
            tr: {
                hospName: "Yylly Suw (Sıcak Su) Kaplıca Merkezi",
                analysis: `
                <div class="analysis-content">
                    <p>Türkmenistan'ın güneyinde yer alan Yylly Suw, yer altından çıkan doğal hidrojen sülfürlü suları ile solunum ve sinir sistemi hastalıklarında uzmanlaşmış bir bakım merkezidir.</p>

                    <h4>🌬️ Neden Bu Bölge Tercih Edilmeli?</h4>
                    <ul>
                        <li><strong>Hangi Hastalıklar İçin?:</strong> Kronik rinit, sinüzit, kronik yorgunluk sendromu ve uyku bozuklukları.</li>
                        <li><strong>Sinir Sistemi:</strong> Suyun içindeki mineraller ve doğal gazlar, periferik sinir sistemi üzerinde yatıştırıcı bir etki yaratarak nevralji ve stres kaynaklı kas spazmlarını çözer.</li>
                    </ul>
                </div>`
            }
        },
        spa: {
            img: "https://via.placeholder.com/300x200?text=Awaza+Wellness+Resort", 
            phone: "+993 243 7 06 00",
            tr: {
                hospName: "Awaza Deniz Kenarı Wellness Kompleksi",
                analysis: `
                <div class="analysis-content">
                    <p>Hazar Denizi kıyısındaki Awaza bölgesi, devasa yatırımlarla inşa edilmiş lüks otelleri ve SPA merkezleri ile "Deniz Terapisi" (Thalassotherapy) sunar.</p>

                    <h4>🌊 Thalassotherapy (Deniz Terapisi)</h4>
                    <ul>
                        <li><strong>Detoks Etkisi:</strong> Isıtılmış deniz suyu havuzları ve yosun sarmalamaları ile vücuttaki toksinlerin atılması sağlanır.</li>
                        <li><strong>Klimaterapi:</strong> Hazar Denizi'nin tuzlu ve temiz havası, bağışıklık sistemini güçlendirir ve tiroid bezi fonksiyonlarını stabilize eder.</li>
                    </ul>
                </div>`
            }
        }
    },
    "KIRGIZİSTAN": {
        surgery: {
            img: "https://via.placeholder.com/300x200?text=Bishkek+Cardiac+Surgery", 
            phone: "+996 312 62 01 02",
            tr: {
                hospName: "Ulusal Kardiyoloji ve Dahiliye Merkezi (Bişkek)",
                analysis: `
                <div class="analysis-content">
                    <p>Kırgızistan, özellikle dağlık coğrafyasının getirdiği tecrübe ile "Yüksek İrtifa Tıbbı" ve kardiyovasküler sistem üzerindeki basınç etkileri konusunda uzmanlaşmış cerrahi merkezlere sahiptir.</p>
                    
                    <h4>🩺 Cerrahi ve Girişimsel Alanlar</h4>
                    <ul>
                        <li><strong>Kardiyoloji ve Anjiyoplasti:</strong> Bişkek'teki merkezler, koroner arter hastalıklarının tedavisinde ve kalp pili implantasyonlarında uluslararası protokolleri takip etmektedir.</li>
                        <li><strong>Genel Cerrahi:</strong> Safra kesesi, fıtık ve mide-bağırsak sistemine yönelik laparoskopik (kapalı) ameliyatlar, Türkiye ve Rusya'da eğitim almış uzman cerrahlar tarafından gerçekleştirilir.</li>
                        <li><strong>Göz Mikrocerrahisi:</strong> Katarakt ve refraktif cerrahi operasyonlarında uygun maliyetli ve güvenilir çözümler sunulmaktadır.</li>
                    </ul>
                </div>`
            }
        },
        thermal: {
            img: "https://via.placeholder.com/300x200?text=Issyk+Kul+Thermal", 
            phone: "+996 3943 4 33 33",
            tr: {
                hospName: "Aurora Sanatorium (Issık Göl)",
                analysis: `
                <div class="analysis-content">
                    <p>Kırgızistan denince akla gelen ilk sağlık destinasyonu Issık Göl'dür. Gölün suyu hafif tuzlu ve minerallidir; kışın bile donmaz, bu da onu eşsiz bir "Thalassoterapi" merkezi yapar.</p>

                    <h4>🌊 Issık Göl Termal Kürleri</h4>
                    <ul>
                        <li><strong>Radon ve Maden Suları:</strong> Bölgedeki sıcak su kaynakları, düşük dozlu radon ve silisik asit içerir. Bu bileşim, kronik iltihaplı eklem hastalıklarını (Artrit) ve kas ağrılarını dindirmede son derece etkilidir.</li>
                        <li><strong>Hangi Hastalıklar İçin?:</strong> Özellikle Kronik Adneksit (kadın hastalıkları), sedef, egzama ve periferik sinir sistemi bozuklukları olan hastalar için 12-21 günlük kürler önerilir.</li>
                    </ul>
                </div>`
            }
        },
        care: {
            img: "https://via.placeholder.com/300x200?text=Kumtor+Rehabilitation", 
            phone: "+996 312 66 00 11",
            tr: {
                hospName: "Yüksek İrtifa Rehabilitasyon Merkezi",
                analysis: `
                <div class="analysis-content">
                    <p>Kırgızistan, deniz seviyesinden 1600 metre ve üzeri yükseklikteki konumuyla "Hipoksik Terapi" (Düşük oksijenle tedavi) alanında öncüdür.</p>

                    <h4>🌬️ Dağ Havası ve Solunum Rehabilitasyonu</h4>
                    <ul>
                        <li><strong>Hangi Hastalıklar İçin?:</strong> Bronşiyal Astım, KOAH ve ağır akciğer enfeksiyonları sonrası toparlanma süreci.</li>
                        <li><strong>Biyolojik Etkisi:</strong> Yüksek irtifadaki temiz ve seyrek hava, kemik iliğini uyararak alyuvar (eritrosit) üretimini doğal olarak artırır. Bu durum, dokuların oksijenlenme kapasitesini yükseltir ve vücuda genel bir direnç kazandırır.</li>
                        <li><strong>Çocuk Sağlığı:</strong> Sık hastalanan, bağışıklığı düşük çocuklar için bölgedeki dağ sanatoryumları doğal bir bağışıklık aşısı etkisi yaratır.</li>
                    </ul>
                </div>`
            }
        },
        spa: {
            img: "https://via.placeholder.com/300x200?text=Jeti+Oguz+Spa", 
            phone: "+996 3922 5 10 20",
            tr: {
                hospName: "Jeti-Oguz (Yedi Öküz) Termal Tesisleri",
                analysis: `
                <div class="analysis-content">
                    <p>Dünyaca ünlü "Yedi Öküz" kaya oluşumlarının hemen yanında yer alan bu merkez, geleneksel Kırgız SPA kültürü ile termal suyu birleştirir.</p>

                    <h4>💆 Öne Çıkan Terapiler</h4>
                    <ul>
                        <li><strong>Maden Suyu Banyoları:</strong> Radyoaktif olmayan mineral banyoları ile sinirsel gerginliğin (stres ve anksiyete) giderilmesi sağlanır.</li>
                        <li><strong>Fitoterapi:</strong> Tanrı Dağları'ndan (Tien Shan) toplanan endemik bitkilerle yapılan bitki çayı kürleri ve sarmalamalar ile vücut detoksu gerçekleştirilir.</li>
                    </ul>
                </div>`
            }
        }
    }
};
const cityDetailedData = {
    "ADANA": {
        surgery: {
            img: "https://i.imgur.com/adana-cerrahi.jpg",
            phone: "+90 322 123 45 67",
            tr: {
                hospName: "Adana Şehir Eğitim ve Araştırma Hastanesi",
                analysis: `
                <div class="analysis-content">
                    <h4>🔍 Klinik Analiz</h4>
                    <p>Adana, Güney Türkiye'nin en gelişmiş cerrahi merkezidir. Özellikle **Onkoloji** ve **Yüksek Teknoloji Cerrahisi** alanında Ortadoğu'dan bile hasta kabul etmektedir.</p>
                    <h4>🩺 Öne Çıkan Tedaviler</h4>
                    <ul>
                        <li><strong>Robotik Cerrahi:</strong> Da Vinci robotu ile ürolojik ve genel cerrahi operasyonları.</li>
                        <li><strong>Kardiyoloji:</strong> Karmaşık anjiyo ve stent uygulamaları.</li>
                    </ul>
                    <h4>⚠️ Dürüst Not</h4>
                    <p>Adana'da termal turizm ve kurumsal yaşlı bakım turizmi (Geriatri), Ege ve Marmara bölgelerine kıyasla henüz ticari sağlık turizmi standartlarında değildir.</p>
                </div>`
            }
        },
        // ... diğer kategoriler (thermal, care, spa)
    },
    "Adıyaman": {
        // ...
    },
    "ADANA": {
        surgery: {
            img: "https://via.placeholder.com/300x200?text=Adana+Sehir+Hastanesi",
            phone: "+90 322 344 44 44",
            tr: {
                hospName: "Adana Şehir Eğitim ve Araştırma Hastanesi",
                analysis: `
                <div class="analysis-content">
                    <p>Adana, Güney Türkiye ve Orta Doğu için kritik bir cerrahi kavşaktır. Kamu-Özel işbirliği ile açılan Şehir Hastanesi, bölgenin en büyük kapasitesine sahiptir.</p>
                    <h4>🩺 Cerrahi Yetkinlikler</h4>
                    <ul>
                        <li><strong>Onkoloji:</strong> Radyasyon onkolojisinde Cyberknife ve Lazer teknolojileri ile tümör tedavisi.</li>
                        <li><strong>Travmatoloji:</strong> Bölgesel konumu nedeniyle ileri derece cerrahi travma tecrübesi.</li>
                    </ul>
                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Adana, cerrahi operasyonlar için mükemmel bir tercih olsa da, hava sıcaklığı ve nem oranı nedeniyle yaz aylarında post-op (ameliyat sonrası) iyileşme süreci yaşlı hastalar için yorucu olabilir.</p>
                </div>`
            }
        },
        thermal: {
            img: "",
            tr: {
                hospName: "Yerel Kaplıcalar",
                analysis: `
                <div class="analysis-content">
                    <h4>⚠️ Dürüst Uyarı</h4>
                    <p>Adana'da (Yumurtalık gibi bölgelerde) yerel kaynaklar bulunsa da, Afyon veya Bursa seviyesinde uluslararası sağlık turizmine uygun termal tesisleşme <strong>bulunmamaktadır.</strong> Termal tedavi için bu bölge önerilmez.</p>
                </div>`
            }
        },
        care: {
            tr: {
                hospName: "Bilgi Kısıtlı",
                analysis: `<p>Adana'da yaşlı ve engelli bakımı için sağlık turizmi odaklı özel bir akredite tesis bulunmamaktadır. Rehabilitasyon daha çok cerrahi sonrası fizik tedavi odaklıdır.</p>`
            }
        },
        spa: {
            tr: {
                hospName: "Şehir Otelleri",
                analysis: `<p>SPA hizmetleri sadece 5 yıldızlı şehir otelleriyle sınırlıdır. Medikal bir SPA altyapısı yoktur.</p>`
            }
        }
    },
    "ADIYAMAN": {
        surgery: {
            img: "https://via.placeholder.com/300x200?text=Adiyaman+Egitim+Arastirma",
            phone: "+90 416 216 10 15",
            tr: {
                hospName: "Adıyaman Eğitim ve Araştırma Hastanesi",
                analysis: `
                <div class="analysis-content">
                    <p>Adıyaman, temel cerrahi branşlarda (Genel Cerrahi, Ortopedi, Kadın Doğum) bölge halkına hizmet veren modern bir Eğitim Araştırma Hastanesine sahiptir.</p>
                    
                    <h4>🔍 Mevcut Durum</h4>
                    <ul>
                        <li><strong>Temel Cerrahi:</strong> Safra kesesi, fıtık ve standart ortopedik operasyonlar başarıyla gerçekleştirilmektedir.</li>
                        <li><strong>Dijital Hastane:</strong> Hastane, kağıtsız hastane (HIMSS 6) kriterlerine uygun teknolojik altyapıya sahiptir.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Adıyaman, üst düzey onkolojik cerrahi, organ nakli veya robotik cerrahi gibi **kompleks sağlık turizmi operasyonları için henüz bir referans merkezi değildir.** Bu tür ileri seviye müdahaleler için hastalar genellikle komşu il olan Gaziantep veya Adana'daki merkezlere yönlendirilmektedir.</p>
                </div>`
            }
        },
        thermal: {
            tr: {
                hospName: "Çelikhan Kaplıcaları",
                analysis: `
                <div class="analysis-content">
                    <h4>♨️ Yerel Şifa Kaynakları</h4>
                    <p>Adıyaman'ın Çelikhan ilçesinde bulunan "Çelikhan İçmesi", özellikle sindirim sistemi ve böbrek hastalıklarına iyi gelmesiyle bilinen yerel bir kaynaktır.</p>
                    
                    <h4>⚠️ Dürüst Bilgilendirme</h4>
                    <p>Bölgedeki tesisleşme tamamen yerel ihtiyaçlara yöneliktir. Uluslararası bir turistin konaklama ve tıbbi bakım beklentisini karşılayacak **5 yıldızlı veya akredite bir termal kompleks bulunmamaktadır.**</p>
                </div>`
            }
        },
        care: {
            tr: {
                hospName: "Sosyal Hizmet Odaklı",
                analysis: `<div class="analysis-content"><p>Şehirde sağlık turizmi kapsamında yabancı hasta kabul edebilecek, ileri düzey rehabilitasyon teknolojilerine (Robotik yürüme vb.) sahip özel bir bakım merkezi bulunmamaktadır.</p></div>`
            }
        },
        spa: {
            tr: {
                hospName: "Sınırlı İmkanlar",
                analysis: `<div class="analysis-content"><p>Modern anlamda medikal veya turistik bir SPA kültürü gelişmemiştir. Hizmetler sınırlı sayıdaki şehir otellerinin imkanları ile kısıtlıdır.</p></div>`
            }
        }
    },
    "AFYONKARAHISAR": {
        surgery: {
            img: "https://via.placeholder.com/300x200?text=Afyon+Kocatepe+Uni",
            phone: "+90 272 246 33 33",
            tr: {
                hospName: "Afyon Kocatepe Üniversitesi (AKÜ) Hastanesi",
                analysis: `
                <div class="analysis-content">
                    <p>Afyonkarahisar, bölge hastaneleri ve üniversite tıp fakültesi ile temel cerrahi branşlarda güvenilir bir hizmet sunmaktadır.</p>
                    
                    <h4>🔍 Cerrahi Odak Noktası</h4>
                    <ul>
                        <li><strong>Ortopedik Cerrahi:</strong> Şehrin rehabilitasyon gücüyle birleşen başarılı kalça, diz protezi ve travma cerrahisi operasyonları öne çıkar.</li>
                        <li><strong>Fiziksel Tıp Desteği:</strong> Ameliyat sonrası (Post-Op) süreçlerin termal sularla desteklenmesi iyileşme hızını artırır.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Afyon, çok yüksek riskli ve spesifik onkolojik veya pediatrik kalp cerrahileri için birincil global merkez değildir. Ancak cerrahi sonrası **iyileşme ve rehabilitasyon** için Türkiye'nin 1 numaralı tercihidir.</p>
                </div>`
            }
        },
        thermal: {
            img: "https://via.placeholder.com/300x200?text=Afyon+Termal+Sifa",
            phone: "+90 272 214 50 91",
            tr: {
                hospName: "Gazlıgöl ve Ömer-Gecek Termal Havzaları",
                analysis: `
                <div class="analysis-content">
                    <p>Afyon, Avrupa'nın en zengin mineral içeriğine sahip termal su kaynaklarından birine sahiptir. "Termal Başkent" unvanını sonuna kadar hak eden tesisleşmeye sahiptir.</p>
                    
                    <h4>♨️ Neden Afyon Termal?</h4>
                    <ul>
                        <li><strong>Zengin Mineral:</strong> Sodyum, kalsiyum ve magnezyum sülfatlı suları, hücre içi sıvı dengesini düzenler ve kronik ağrıları dindirir.</li>
                        <li><strong>Hangi Hastalıklar?:</strong> Romatoid Artrit, Bel ve Boyun Fıtığı, Ameliyat sonrası yapışıklıklar ve cilt hastalıkları (Psoriasis) tedavisinde %95 klinik başarı sağlar.</li>
                        <li><strong>Peloidoterapi (Çamur):</strong> Doğal mineralli çamur banyoları ile toksin atımı ve bölgesel kan dolaşımı hızlandırılır.</li>
                    </ul>
                </div>`
            }
        },
        care: {
            img: "https://via.placeholder.com/300x200?text=Afyon+Fizik+Tedavi",
            phone: "+90 272 213 19 14",
            tr: {
                hospName: "Afyon Karahisar Fizik Tedavi ve Rehabilitasyon Merkezi",
                analysis: `
                <div class="analysis-content">
                    <p>Afyon, Türkiye'de "Geriatrik Bakım" (Yaşlı Bakımı) ve "Fizik Tedavi"nin kalbidir. 5 yıldızlı termal otellerin çoğu, bünyesinde tam teşekküllü fizik tedavi üniteleri barındırır.</p>

                    <h4>♿ Robotik Rehabilitasyon ve Bakım</h4>
                    <ul>
                        <li><strong>Hidroterapi:</strong> Termal havuzlar içinde uzman fizyoterapistler eşliğinde yapılan egzersizler, eklem yükünü sıfırlayarak iyileşmeyi hızlandırır.</li>
                        <li><strong>İnme Rehabilitasyonu:</strong> Felçli hastalar için termal destekli nörolojik rehabilitasyon programları dünya standartlarındadır.</li>
                    </ul>
                </div>`
            }
        },
        spa: {
            img: "https://via.placeholder.com/300x200?text=Afyon+Luxury+Spa",
            tr: {
                hospName: "5 Yıldızlı Termal Wellness Merkezleri",
                analysis: `
                <div class="analysis-content">
                    <p>Afyon'daki SPA kültürü sadece dinlenme değil, "şifa" odaklıdır. Türkiye'nin en iyi termal otelleri bu bölgede toplanmıştır.</p>
                    <ul>
                        <li><strong>Ozon Terapisi:</strong> Termal kürlerle birleşen ozon ve detoks programları.</li>
                        <li><strong>Geleneksel Türk Hamamı:</strong> Mermer sıcaklığı ve şifalı suların birleştiği otantik arınma ritüelleri.</li>
                    </ul>
                </div>`
            }
        }
    },
    "AGRI": {
        surgery: {
            img: "https://via.placeholder.com/300x200?text=Agri+Egitim+Arastirma",
            phone: "+90 472 215 10 56",
            tr: {
                hospName: "Ağrı Eğitim ve Araştırma Hastanesi",
                analysis: `
                <div class="analysis-content">
                    <p>Ağrı, temel sağlık hizmetleri ve acil cerrahi müdahaleler konusunda bölge halkına hizmet veren bir devlet hastanesi altyapısına sahiptir.</p>
                    
                    <h4>🔍 Mevcut Kapasite</h4>
                    <ul>
                        <li><strong>Genel Sağlık:</strong> Temel cerrahi branşlar ve poliklinik hizmetleri modern binasında sunulmaktadır.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Ağrı, uluslararası sağlık turizmi kapsamında **cerrahi bir destinasyon değildir.** Kompleks ameliyatlar, onkolojik tedaviler veya robotik cerrahi arayışındaki hastalar için bu bölge uygun değildir; hastalar genellikle Erzurum veya Van'daki bölge merkezlerine yönlendirilir.</p>
                </div>`
            }
        },
        thermal: {
            img: "https://via.placeholder.com/300x200?text=Diyadin+Kaplicalari",
            tr: {
                hospName: "Diyadin Kaplıcaları",
                analysis: `
                <div class="analysis-content">
                    <p>Ağrı'nın en büyük sağlık potansiyeli Diyadin ilçesindeki termal kaynaklardır. Burası "Doğu'nun Ihlara Vadisi" olarak adlandırılan doğal bir oluşumdur.</p>
                    
                    <h4>♨️ Jeotermal Potansiyel</h4>
                    <ul>
                        <li><strong>Su Özellikleri:</strong> Kalsiyum, magnezyum ve sülfat açısından zengindir. Yerel halk tarafından romatizma, cilt hastalıkları ve siyatik tedavisinde yüzyıllardır kullanılmaktadır.</li>
                        <li><strong>Yılanlı Kaynağı:</strong> Bölgeye özgü efsanelerle birleşen şifalı suların cilt yaralarını iyileştirdiğine inanılır.</li>
                    </ul>

                    <h4>⚠️ Dürüst Bilgilendirme</h4>
                    <p>Diyadin'deki termal tesisleşme şu an için **yerel ve butik düzeydedir.** Batıdaki (Afyon, Bursa) lüks termal otel konsepti burada mevcut değildir. Doğa ile iç içe, izole ve tamamen doğal bir deneyim arayanlar için uygundur ancak medikal turizm standartları kısıtlıdır.</p>
                </div>`
            }
        },
        care: {
            tr: {
                hospName: "Bilgi Bulunmuyor",
                analysis: `<div class="analysis-content"><p>Şehirde sağlık turizmine uygun, uluslararası akreditasyonu olan bir rehabilitasyon veya geriatrik bakım merkezi bulunmamaktadır.</p></div>`
            }
        },
        spa: {
            tr: {
                hospName: "Kısıtlı İmkanlar",
                analysis: `<div class="analysis-content"><p>Modern anlamda profesyonel bir SPA merkezi veya sağlıklı yaşam kompleksi bulunmamaktadır.</p></div>`
            }
        }
    },
    "AMASYA": {
        surgery: {
            img: "https://via.placeholder.com/300x200?text=Amasya+Sabuncuoglu+Hastanesi",
            phone: "+90 358 218 40 00",
            tr: {
                hospName: "Amasya Üniversitesi Sabuncuoğlu Şerefeddin E.A.H.",
                analysis: `
                <div class="analysis-content">
                    <p>Amasya, dünya tıp tarihinin en önemli isimlerinden biri olan ve ilk cerrahi el yazmasını yazan <strong>Sabuncuoğlu Şerefeddin</strong>'in mirasını taşır. Şehir, orta ölçekli cerrahi operasyonlarda bölgenin güvenli limanıdır.</p>
                    
                    <h4>🔍 Cerrahi Yetkinlik Alanları</h4>
                    <ul>
                        <li><strong>Genel Cerrahi:</strong> Laparoskopik yöntemlerle yapılan <strong>safra kesesi</strong> ve <strong>fıtık ameliyatları</strong> rutin olarak yüksek başarıyla uygulanır.</li>
                        <li><strong>KBB ve Plastik Cerrahi:</strong> Şehirde burun estetiği (<strong>rinoplasti</strong>) ve kronik sinüzit cerrahileri konusunda deneyimli bir hekim kadrosu mevcuttur.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Amasya; <strong>organ nakli</strong> veya kompleks <strong>onkolojik robotik cerrahi</strong> gibi ileri seviye müdahaleler için birincil global merkez değildir. Bu tür vakalar genellikle komşu il olan Samsun'daki tam teşekküllü merkezlere yönlendirilir.</p>
                </div>`
            }
        },
        thermal: {
            img: "https://via.placeholder.com/300x200?text=Amasya+Gozlek+Kaplicasi",
            phone: "+90 358 242 00 01",
            tr: {
                hospName: "Terziler (Gözlek) ve Hamamözü Kaplıcaları",
                analysis: `
                <div class="analysis-content">
                    <p>Amasya, antik çağlardan beri bilinen, kükürt ve sodyum açısından zengin şifalı su kaynaklarına sahiptir. Özellikle <strong>Gözlek Kaplıcaları</strong> butik termal hizmet sunar.</p>
                    
                    <h4>♨️ Hangi Hastalıklara İyi Gelir?</h4>
                    <ul>
                        <li><strong>Romatizmal Hastalıklar:</strong> Suyun anti-enflamatuar etkisi sayesinde <strong>eklem kireçlenmeleri</strong> ve <strong>yumuşak doku romatizması</strong> ağrılarında belirgin azalma sağlar.</li>
                        <li><strong>Cilt Problemleri:</strong> Kükürt içeriği, <strong>akne</strong>, <strong>kronik egzama</strong> ve <strong>sedef</strong> lezyonlarının kurutulmasına yardımcı olur.</li>
                        <li><strong>Kas Spazmları:</strong> Termal suyun sedatif (sakinleştirici) etkisi, <strong>siyatik</strong> ve <strong>bel ağrısı</strong> çeken hastalarda kasları gevşetir.</li>
                    </ul>

                    <h4>⚠️ Dürüst Bilgilendirme</h4>
                    <p>Tesisler genellikle orta ölçekli ve butiktir. Afyon'daki devasa <strong>termal kompleks</strong> konsepti yerine daha sakin, doğa ile iç içe ve mütevazı bir şifa süreci sunar.</p>
                </div>`
            }
        },
        care: {
            tr: {
                hospName: "Müzik ve Meşguliyet Terapisi Odağı",
                analysis: `
                <div class="analysis-content">
                    <p>Amasya, tarihi <strong>Bimarhane (Darüşşifa)</strong> geleneğiyle uyumlu olarak, psikolojik rahatlama ve hafif rehabilitasyon süreçleri için uygun bir atmosfere sahiptir.</p>
                    <h4>🧠 Ruhsal Rehabilitasyon</h4>
                    <p>Özellikle <strong>anksiyete</strong> ve <strong>hafif depresyon</strong> sonrası dinlenme süreçlerinde, şehrin Yeşilırmak kenarındaki mikro-kliması ve tarihi dokusu pozitif etki yaratır. Ancak ileri düzey <strong>robotik fizik tedavi</strong> merkezleri sınırlıdır.</p>
                </div>`
            }
        },
        spa: {
            tr: {
                hospName: "Butik Wellness",
                analysis: `<div class="analysis-content"><p>Amasya'daki SPA hizmetleri genellikle <strong>nehir manzaralı butik oteller</strong> bünyesinde sunulur. Geleneksel Türk hamamı ritüelleri, modern masaj teknikleriyle birleştirilerek yerli ve yabancı turistlere sunulmaktadır.</p></div>`
            }
        }
    },
    "ANKARA": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Ankara+Sehir+Hastanesi",
            phone: "+90 312 552 60 00",
            tr: {
                hospName: "Ankara Bilkent ve Etlik Şehir Hastaneleri",
                analysis: `
                <div class="analysis-content">
                    <p><strong>ANKARA</strong>, Türkiye'nin tıbbi başkentidir. Avrupa'nın tek kampüste en fazla yatağına sahip hastaneleri burada bulunur. Özellikle <strong>akademik cerrahi</strong> ve <strong>üniversite hastaneleri</strong> ekolü ile dünyada referans merkezidir.</p>
                    
                    <h4>🔍 Cerrahi ve Teknolojik Zirve</h4>
                    <ul>
                        <li><strong>Onkolojik Cerrahi:</strong> Tüm kanser türlerinde <strong>Da Vinci Xi Robotik Cerrahi</strong> ve <strong>HIFU</strong> teknolojileri ile kansız/kesisiz müdahaleler yapılır.</li>
                        <li><strong>Kardiyovasküler Cerrahi:</strong> Dünyanın en iyi kalp cerrahlarının bulunduğu Ankara'da, <strong>yapay kalp nakli</strong> ve <strong>hibrit ameliyatlar</strong> rutin başarıyla uygulanmaktadır.</li>
                        <li><strong>Organ Nakli:</strong> Karaciğer, böbrek ve <strong>kornea nakli</strong> konusunda uluslararası akreditasyona sahip merkezler %98 başarı oranıyla çalışır.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Ankara, cerrahi kalite ve tıbbi sonuçlar bakımından kusursuzdur. Ancak İstanbul kadar popüler bir <strong>turizm destinasyonu</strong> olmadığı için, hasta yakınları için sosyal etkinlik ve eğlence imkanları daha kısıtlıdır. Burası tamamen <strong>bilim ve tedavi</strong> odaklıdır.</p>
                </div>`
            }
        },
        thermal: {
            img: "https://via.placeholder.com/400x250?text=Kizilcahamam+Termal",
            phone: "+90 312 736 11 00",
            tr: {
                hospName: "Kızılcahamam ve Haymana Termal Tesisleri",
                analysis: `
                <div class="analysis-content">
                    <p>Ankara, termal su kalitesi bakımından dünyada ilk 5 içinde gösterilen <strong>Haymana</strong> ve <strong>Kızılcahamam</strong> bölgelerine sahiptir.</p>
                    
                    <h4>♨️ Hangi Hastalıklara İyi Gelir?</h4>
                    <ul>
                        <li><strong>Haymana Suyu:</strong> Dünyanın en kaliteli ikinci suyu kabul edilir. <strong>Böbrek taşları</strong>, <strong>idrar yolları</strong> ve <strong>kronik romatizmal</strong> hastalıklarda mucizevi etkiye sahiptir.</li>
                        <li><strong>Kızılcahamam:</strong> Yüksek mineral yapısı ile <strong>eklem ağrıları</strong>, <strong>kadın hastalıkları</strong> ve <strong>metabolizma hızlandırma</strong> için idealdir.</li>
                    </ul>

                    <h4>⚠️ Dürüst Bilgilendirme</h4>
                    <p>Tesisleşme Afyon kadar lüks olmasa da, <strong>tıbbi su kalitesi</strong> bakımından Ankara bölgeleri daha üstündür. Şifa odaklı gelenler için Haymana dünyadaki en iyi seçeneklerden biridir.</p>
                </div>`
            }
        },
        care: {
            img: "https://via.placeholder.com/400x250?text=Ankara+Rehabilitasyon",
            phone: "+90 312 444 00 00",
            tr: {
                hospName: "TSK Rehabilitasyon ve Bakım Merkezi",
                analysis: `
                <div class="analysis-content">
                    <p>Ankara, fizik tedavi ve rehabilitasyon alanında Türkiye'nin <strong>tartışmasız lideridir.</strong></p>
                    <h4>♿ İleri Rehabilitasyon</h4>
                    <p>Özellikle <strong>omurilik yaralanmaları</strong>, <strong>nörolojik rehabilitasyon</strong> ve <strong>uzuv kaybı sonrası protez</strong> uyum süreçlerinde <strong>robotik yürüme teknolojileri</strong> (Lokomat) ile en kapsamlı hizmet sunulur. <strong>Yaşlı bakımı</strong> ve tıbbi gözetim için en güvenli şehirdir.</p>
                </div>`
            }
        },
        spa: {
            tr: {
                hospName: "Medikal Wellness",
                analysis: `<div class="analysis-content"><p>Ankara'daki SPA hizmetleri genellikle <strong>termal wellness</strong> odaklıdır. Şehirdeki 5 yıldızlı oteller, iş dünyası ve bürokrasiye yönelik profesyonel ve ciddi bir hizmet sunar.</p></div>`
            }
        }
    },
    "ANTALYA": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Antalya+Dis+ve+Cerrahisi",
            phone: "+90 242 249 60 00",
            tr: {
                hospName: "Antalya Uluslararası Sağlık Kompleksleri",
                analysis: `
                <div class="analysis-content">
                    <p><strong>ANTALYA</strong>, tatil ile tedaviyi birleştiren dünyadaki en başarılı şehirdir. Özellikle <strong>ESTETİK</strong> ve <strong>REPRODÜKTİF</strong> tıp alanında uzmanlaşmıştır.</p>
                    
                    <h4 style="color:#e67e22;">⭐ DÜNYA LİDERİ: DİŞ SAĞLIĞI VE ESTETİĞİ</h4>
                    <p>Antalya, <strong>Gülüş Tasarımı (Hollywood Smile)</strong>, <strong>Zirkonyum Kaplama</strong> ve <strong>All-on-4 İmplant</strong> teknolojilerinde Avrupa'nın en çok tercih edilen merkezidir. Dijital laboratuvarlar sayesinde 5-7 gün içinde tam ağız restorasyonu yapılabilmektedir.</p>
                    
                    <h4>🔍 Diğer Güçlü Cerrahi Alanlar</h4>
                    <ul>
                        <li><strong>Organ Nakli:</strong> Akdeniz Üniversitesi, dünyada ilk <strong>yüz nakli</strong> ve <strong>kol nakli</strong> operasyonlarını gerçekleştiren, nakil konusunda global bir otoritedir.</li>
                        <li><strong>Tüp Bebek (IVF):</strong> İleri yaş gebelik ve genetik taramalı tüp bebek tedavilerinde %70'e varan başarı oranları sunulur.</li>
                        <li><strong>Plastik Cerrahi:</strong> Liposuction ve göğüs estetiği için en modern klinik altyapısına sahiptir.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Antalya; diş, estetik ve organ naklinde zirvedir. Ancak çok kompleks <strong>pediatrik beyin cerrahisi</strong> veya nadir görülen <strong>genetik hastalıkların</strong> tedavisi için hala İstanbul veya Ankara'daki akademik merkezler daha öncelikli tercih edilmektedir.</p>
                </div>`
            }
        },
        thermal: {
            img: "https://via.placeholder.com/400x250?text=Demre+Termal",
            tr: {
                hospName: "Demre ve Kaş Bölgesi Doğal Kaynakları",
                analysis: `
                <div class="analysis-content">
                    <h4>♨️ Bölgesel Kaynaklar</h4>
                    <p>Antalya merkezinde büyük termal tesisler olmasa da, <strong>Demre</strong> bölgesindeki "Barutçu" suyu gibi kükürtlü doğal kaynaklar yerel şifa sunar.</p>
                    
                    <h4>⚠️ Dürüst Bilgilendirme</h4>
                    <p>Antalya bir <strong>termal şehir</strong> değildir. Termal tedavi arayan hastaların rotayı <strong>Afyon</strong> veya <strong>Denizli</strong> tarafına kırması daha doğru bir tıbbi karar olacaktır.</p>
                </div>`
            }
        },
        care: {
            img: "https://via.placeholder.com/400x250?text=Antalya+Yasli+Bakimi",
            phone: "+90 242 444 00 07",
            tr: {
                hospName: "Akdeniz Geriatri ve Bakım Turizmi Merkezleri",
                analysis: `
                <div class="analysis-content">
                    <p>Antalya, 300 gün güneş alan iklimiyle Avrupa'daki yaşlı popülasyonun <strong>rehabilitasyon</strong> ve <strong>bakım</strong> için bir numaralı adresidir.</p>
                    <h4>☀️ İklimle Gelen Şifa</h4>
                    <p>Özellikle kış aylarındaki yumuşak hava; <strong>KOAH</strong>, <strong>astım</strong> ve <strong>romatizma</strong> hastalarının yaşam kalitesini artırır. Şehirde yabancı dil bilen personelin bulunduğu lüks <strong>bakımevleri</strong> ve <strong>fizik tedavi</strong> otelleri yaygındır.</p>
                </div>`
            }
        },
        spa: {
            img: "https://via.placeholder.com/400x250?text=Belek+Luxury+Spa",
            tr: {
                hospName: "Belek ve Kundu Luxury Wellness",
                analysis: `<div class="analysis-content"><p>Antalya, dünyadaki en lüks ve en büyük <strong>SPA ve Thalassoterapi</strong> (Deniz suyu terapisi) merkezlerine sahiptir. Belek bölgesindeki tesisler, sporcu sağlığı ve genel wellness konusunda dünya standartlarının üzerindedir.</p></div>`
            }
        }
    },
    "ARTVIN": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Artvin+Devlet+Hastanesi",
            phone: "+90 466 212 10 39",
            tr: {
                hospName: "Artvin Devlet Hastanesi",
                analysis: `
                <div class="analysis-content">
                    <p><strong>ARTVİN</strong>, coğrafi yapısı nedeniyle butik sağlık hizmetleri sunan bir merkezdir.</p>
                    
                    <h4>🔍 Cerrahi Durum</h4>
                    <ul>
                        <li><strong>Temel Müdahaleler:</strong> Acil cerrahi, apandisit, fıtık ve standart ortopedik operasyonlar modern cihazlarla yapılmaktadır.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Artvin, uluslararası bir <strong>cerrahi merkezi</strong> değildir. Karmaşık ameliyatlar, bypass veya onkoloji vakaları genellikle bölgenin sağlık üssü olan <strong>Rize</strong> veya <strong>Trabzon</strong>'daki üniversite hastanelerine sevk edilir.</p>
                </div>`
            }
        },
        thermal: {
            img: "https://via.placeholder.com/400x250?text=Otingo+Kaplicasi",
            tr: {
                hospName: "Otingo (Alabalık) Kaplıcası",
                analysis: `
                <div class="analysis-content">
                    <p>Artvin'in Borçka ilçesinde bulunan tarihi <strong>Otingo Kaplıcası</strong>, 300 yıldır şifa dağıtan bir kaynaktır.</p>
                    
                    <h4>♨️ Hangi Hastalıklara İyi Gelir?</h4>
                    <ul>
                        <li><strong>Romatizma:</strong> Suyun sıcaklığı ve mineral yapısı kronik <strong>eklem ağrılarına</strong> iyi gelir.</li>
                        <li><strong>Halsizlik:</strong> Bölgedeki yüksek oksijen ve suyun birleşimi <strong>kronik yorgunluk</strong> sendromuna karşı etkilidir.</li>
                    </ul>

                    <h4>⚠️ Dürüst Bilgilendirme</h4>
                    <p>Tesisler "doğa turizmi" odaklıdır. Lüks bir termal otel konsepti yoktur; daha çok <strong>doğa tutkunları</strong> ve şifayı yerinde arayanlar içindir.</p>
                </div>`
            }
        },
        care: {
            img: "https://via.placeholder.com/400x250?text=Artvin+Yayla+Havasi",
            tr: {
                hospName: "Apiterapi ve Yayla Rehabilitasyonu",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#f1c40f;">🍯 DÜNYA MARKASI: APİTERAPİ (Arı Ürünleri Tedavisi)</h4>
                    <p>Artvin, özellikle <strong>Macahel</strong> bölgesiyle arı ürünlerinde bir devdir. <strong>Kestane balı</strong> ve <strong>arı zehri</strong> ile yapılan tamamlayıcı tedaviler bağışıklık sistemi için eşsizdir.</p>
                    
                    <h4>🌬️ Solunum Rehabilitasyonu</h4>
                    <p><strong>Artvin Yaylaları</strong>, tertemiz havası ve sıfır nem oranıyla <strong>astım</strong> ve <strong>bronşit</strong> hastaları için doğal bir bakım merkezidir.</p>
                </div>`
            }
        },
        spa: {
            tr: {
                hospName: "Doğa Otelleri & Wellness",
                analysis: `<div class="analysis-content"><p>Modern SPA merkezleri yerine, orman içerisinde bulunan butik otellerde <strong>doğal masajlar</strong> ve <strong>bitki banyoları</strong> yapılmaktadır.</p></div>`
            }
        }
    },
    "AYDIN": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Aydin+Adnan+Menderes+Uni",
            phone: "+90 256 212 00 00",
            tr: {
                hospName: "Aydın Adnan Menderes Üniversitesi Hastanesi",
                analysis: `
                <div class="analysis-content">
                    <p><strong>AYDIN</strong>, üniversite hastanesi ve donanımlı özel klinikleriyle Ege bölgesinin önemli sağlık duraklarından biridir.</p>
                    
                    <h4>🔍 Cerrahi Yetkinlikler</h4>
                    <ul>
                        <li><strong>Göz Cerrahisi:</strong> Özellikle Kuşadası bölgesindeki merkezlerde <strong>Katarakt</strong> ve <strong>Akıllı Lens</strong> operasyonları yabancı hastalar için popülerdir.</li>
                        <li><strong>Obezite Cerrahisi:</strong> <strong>Tüp Mide</strong> ve <strong>Mide Balonu</strong> operasyonlarında deneyimli cerrah kadrosuna sahiptir.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Aydın, başarılı bir cerrahi altyapıya sahip olsa da, çok ileri derece <strong>organ nakli</strong> veya spesifik <strong>çocuk kalp cerrahisi</strong> vakaları genellikle çok yakın olan İzmir'e (Ege ve Dokuz Eylül Üni.) sevk edilir.</p>
                </div>`
            }
        },
        thermal: {
            img: "https://via.placeholder.com/400x250?text=Germencik+Termal",
            phone: "+90 256 563 11 00",
            tr: {
                hospName: "Germencik, Buharkent ve Ortaklar Termal Havzaları",
                analysis: `
                <div class="analysis-content">
                    <p>Aydın, Türkiye'nin en yüksek enerjiye sahip jeotermal kaynaklarına ev sahipliği yapar. Su sıcaklığı ve mineral yoğunluğu bakımından dünya standartlarındadır.</p>
                    
                    <h4 style="color:#2980b9;">♨️ Hangi Hastalıklara İyi Gelir?</h4>
                    <ul>
                        <li><strong>Romatizmal Ağrılar:</strong> Yüksek mineral içeren sular, <strong>ankilozan spondilit</strong> ve <strong>osteoporoz</strong> (kemik erimesi) ağrılarında çok etkilidir.</li>
                        <li><strong>Kadın Hastalıkları:</strong> Germencik bölgesindeki sular, kronik <strong>pelvik iltihaplar</strong> ve infertilite (kısırlık) destek süreçlerinde kullanılır.</li>
                    </ul>

                    <h4>⚠️ Dürüst Bilgilendirme</h4>
                    <p>Bölgedeki bazı tesisler çok modern olsa da, bir kısmı hala yerel işletme düzeyindedir. Medikal bir kür programı istiyorsanız, profesyonel fizik tedavi doktoru barındıran kompleksleri seçmeniz önerilir.</p>
                </div>`
            }
        },
        care: {
            img: "https://via.placeholder.com/400x250?text=Kusadasi+Yasli+Turizmi",
            tr: {
                hospName: "Kuşadası ve Didim Klimaterapi Merkezleri",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#27ae60;">💨 DÜNYA MARKASI: KLİMATERAPİ (İklim Tedavisi)</h4>
                    <p>Didim ve Kuşadası bölgesi, dünyada <strong>astım</strong> ve <strong>KOAH</strong> hastaları için en düşük nem oranına sahip nadir bölgelerden biridir. Heredot'un "Gökyüzünün altındaki en güzel yeryüzü" dediği bu yer, doğal bir solunum bakım merkezidir.</p>
                    
                    <h4>👵 Yaşlı ve Engelli Bakımı</h4>
                    <p>Avrupa'dan gelen yaşlılar için özel rehabilitasyon köyleri mevcuttur. Düşük nem oranı, <strong>kalp yetmezliği</strong> olan hastaların efor kapasitesini doğal olarak artırır.</p>
                </div>`
            }
        },
        spa: {
            tr: {
                hospName: "Ege Wellness & Spa",
                analysis: `<div class="analysis-content"><p>Aydın'da SPA kültürü, Kuşadası'ndaki lüks otellerde <strong>Deniz Suyu Terapisi (Thalassotherapy)</strong> ile birleşir. Ege'nin zeytinyağı ve aromatik bitkileriyle yapılan <strong>detoks programları</strong> oldukça gelişmiştir.</p></div>`
            }
        }
    },
    "BALIKESIR": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Balikesir+Sehir+Hastanesi",
            phone: "+90 266 444 40 10",
            tr: {
                hospName: "Balıkesir Atatürk Şehir Hastanesi",
                analysis: `
                <div class="analysis-content">
                    <p><strong>BALIKESİR</strong>, son yıllarda açılan modern Şehir Hastanesi ile Güney Marmara'nın cerrahi operasyon ihtiyacını yüksek teknolojiyle karşılamaktadır.</p>
                    
                    <h4>🔍 Cerrahi Yetkinlikler</h4>
                    <ul>
                        <li><strong>Genel Cerrahi:</strong> Laparoskopik (kapalı) ameliyatlarda ve <strong>mide-bağırsak cerrahisinde</strong> tecrübeli bir kadroya sahiptir.</li>
                        <li><strong>Üroloji:</strong> Taş kırma (ESWL) ve modern prostat cerrahileri başarıyla uygulanmaktadır.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Balıkesir cerrahide güvenilir olsa da, <strong>karaciğer nakli</strong> veya çok ileri düzey <strong>genetik cerrahi</strong> gibi spesifik vakalar genellikle komşu iller olan Bursa veya İzmir'deki akademik merkezlere yönlendirilir.</p>
                </div>`
            }
        },
        thermal: {
            img: "https://via.placeholder.com/400x250?text=Gonen+Kaplicalari",
            phone: "+90 266 762 18 40",
            tr: {
                hospName: "Gönen ve Edremit (Güre) Termal Tesisleri",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#2980b9;">♨️ DÜNYA DEVİ: GÖNEN KAPLICALARI</h4>
                    <p>Gönen, 3000 mg/lt mineral yoğunluğu ile dünyadaki en zengin ve saf şifalı su kaynaklarından biri kabul edilir. Suyun çıkış sıcaklığı ve mineral yapısı tıbbi olarak tescillidir.</p>
                    
                    <h4>🧪 Hangi Hastalıklara İyi Gelir?</h4>
                    <ul>
                        <li><strong>Ortopedik Rehabilitasyon:</strong> Ameliyat sonrası <strong>eklem kısıtlılıkları</strong> ve <strong>kas zayıflıkları</strong> için su içi egzersizlerde rakipsizdir.</li>
                        <li><strong>Nörolojik Sorunlar:</strong> Felç (İnme) sonrası <strong>nöro-rehabilitasyon</strong> süreçlerinde suyun kaldırma kuvveti ve mineral desteği iyileşmeyi hızlandırır.</li>
                        <li><strong>Cilt ve Sedef:</strong> Edremit-Güre hattındaki kükürtlü sular <strong>sedef (psoriasis)</strong> tedavisinde etkilidir.</li>
                    </ul>
                </div>`
            }
        },
        care: {
            img: "https://via.placeholder.com/400x250?text=Kaz+Daglari+Oksijen",
            tr: {
                hospName: "Kaz Dağları (Edremit) Solunum Bakım Alanı",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#27ae60;">🍃 ALPS'TEN SONRA İKİNCİ: KAZ DAĞLARI</h4>
                    <p>Balıkesir, dünyada Alpler'den sonra oksijen oranı en yüksek ikinci bölge olan <strong>Kaz Dağları</strong>'na ev sahipliği yapar.</p>
                    
                    <h4>🌬️ Solunum ve Kalp Bakımı</h4>
                    <p>Özellikle <strong>KOAH</strong>, <strong>astım</strong> ve <strong>kalp damar tıkanıklığı</strong> olan hastalar için bu bölgedeki hava, doğal bir ilaç gibidir. Kandaki oksijen satürasyonunu artırarak hastaların ilaç kullanım ihtiyacını azaltır.</p>
                </div>`
            }
        },
        spa: {
            tr: {
                hospName: "Körfez Wellness & Hamam",
                analysis: `<div class="analysis-content"><p>Balıkesir'de SPA kültürü, Edremit körfezindeki otellerde geleneksel <strong>Türk Hamamı</strong> ile modern <strong>Termal SPA</strong> konseptinin birleşimiyle sunulur. Çamur banyosu ve deniz yosunu sarmalamaları popülerdir.</p></div>`
            }
        }
    },
    "BILECIK": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Bilecik+Egitim+Arastirma",
            phone: "+90 228 212 10 33",
            tr: {
                hospName: "Bilecik Eğitim ve Araştırma Hastanesi",
                analysis: `
                <div class="analysis-content">
                    <p><strong>BİLECİK</strong>, yeni inşa edilen modern hastane binası ile temel cerrahi branşlarda bölge halkına hizmet vermektedir.</p>
                    
                    <h4>🔍 Mevcut Kapasite</h4>
                    <ul>
                        <li><strong>Temel Operasyonlar:</strong> Kadın doğum, üroloji ve genel cerrahide standart <strong>laparoskopik</strong> müdahaleler başarıyla yapılmaktadır.</li>
                        <li><strong>Ortopedi:</strong> Kırık-çıkık ve temel eklem cerrahileri gerçekleştirilmektedir.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Bilecik, uluslararası sağlık turizmi kapsamında karmaşık <strong>beyin cerrahisi</strong>, <strong>kalp nakli</strong> veya ileri <strong>onkoloji</strong> vakaları için bir destinasyon değildir. Bu tür durumlar genellikle komşu iller olan <strong>Eskişehir</strong> veya <strong>Bursa</strong>'daki üniversite hastanelerine yönlendirilir.</p>
                </div>`
            }
        },
        thermal: {
            img: "https://via.placeholder.com/400x250?text=Osmaneli+Icmeleri",
            phone: "+90 228 461 41 02",
            tr: {
                hospName: "Osmaneli Selçik İçmeleri ve Söğüt Kaynarca",
                analysis: `
                <div class="analysis-content">
                    <p>Bilecik, özellikle <strong>Osmaneli</strong> bölgesindeki doğal maden suyu kaynakları ile bilinen yerel bir termal noktadır.</p>
                    
                    <h4 style="color:#2980b9;">💧 İçme Kürü ve Şifa</h4>
                    <ul>
                        <li><strong>Mide ve Sindirim:</strong> Osmaneli içmeleri, yüksek mineral yapısı ile <strong>kronik gastrit</strong> ve <strong>sindirim bozuklukları</strong>na iyi gelmektedir.</li>
                        <li><strong>Böbrek Taşları:</strong> Suyun diüretik (idrar söktürücü) etkisi, küçük <strong>böbrek kumlarının</strong> dökülmesine yardımcı olur.</li>
                        <li><strong>Cilt:</strong> Söğüt bölgesindeki sıcak sular, hafif düzeydeki <strong>cilt kaşıntıları</strong> için tercih edilir.</li>
                    </ul>

                    <h4>⚠️ Dürüst Bilgilendirme</h4>
                    <p>Bilecik'teki termal altyapı lüks konaklama turizminden ziyade, günübirlik veya mütevazı tesislerde <strong>şifa arayışı</strong> odaklıdır. Profesyonel bir termal rehabilitasyon programı beklentisi olanlar için kısıtlıdır.</p>
                </div>`
            }
        },
        care: {
            tr: {
                hospName: "Yerel Bakım Hizmetleri",
                analysis: `<div class="analysis-content"><p>Bilecik'te uluslararası standartlarda yabancı dil destekli veya yüksek teknolojili bir <strong>geriatrik bakım merkezi</strong> bulunmamaktadır. Rehabilitasyon hizmetleri devlet hastanesi bünyesinde genel kapsamlıdır.</p></div>`
            }
        },
        spa: {
            tr: {
                hospName: "Sınırlı SPA İmkanları",
                analysis: `<div class="analysis-content"><p>Modern medikal SPA konsepti gelişmemiştir. Sadece Osmaneli bölgesindeki belediye tesislerinde ve birkaç şehir otelinde temel hamam ve sauna imkanları mevcuttur.</p></div>`
            }
        }
    },
    "BINGÖL": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Bingol+Devlet+Hastanesi",
            phone: "+90 426 213 10 43",
            tr: {
                hospName: "Bingöl Devlet Hastanesi",
                analysis: `
                <div class="analysis-content">
                    <p><strong>BİNGÖL</strong>, temel sağlık hizmetleri ve acil cerrahi müdahaleler konusunda bölgeye hizmet veren bir altyapıya sahiptir.</p>
                    
                    <h4>🔍 Mevcut Kapasite</h4>
                    <ul>
                        <li><strong>Temel Operasyonlar:</strong> Genel cerrahi, ortopedi ve çocuk cerrahisi branşlarında standart ameliyatlar yapılmaktadır.</li>
                        <li><strong>Diyaliz Ünitesi:</strong> Bölge için önemli bir diyaliz kapasitesine sahiptir.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Bingöl, uluslararası bir <strong>cerrahi destinasyonu</strong> değildir. Onkoloji, açık kalp cerrahisi veya gelişmiş robotik müdahaleler için hastalar genellikle <strong>Elazığ</strong> veya <strong>Erzurum</strong>'daki üniversite hastanelerine yönlendirilmektedir.</p>
                </div>`
            }
        },
        thermal: {
            img: "https://via.placeholder.com/400x250?text=Kos+Kaplicalari",
            phone: "+90 426 213 12 18",
            tr: {
                hospName: "KÖS (Ilıcalar) Kaplıcaları",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#2980b9;">♨️ BÖLGESEL EFSANE: KÖS KAPLICALARI</h4>
                    <p>Bingöl-Erzurum yolu üzerinde bulunan KÖS Kaplıcaları, mineralli yapısı ve ideal sıcaklığı ile Doğu Anadolu'nun en önemli termal kaynaklarından biridir.</p>
                    
                    <h4>🧪 Hangi Hastalıklara İyi Gelir?</h4>
                    <ul>
                        <li><strong>Romatizma ve Kireçlenme:</strong> Suyun kimyasal bileşimi, şiddetli <strong>eklem ağrıları</strong> ve <strong>hareket kısıtlılığı</strong> olan hastalar üzerinde rahatlatıcı etkiye sahiptir.</li>
                        <li><strong>Felç (İnme) Rehabilitasyonu:</strong> Yerel tıbbi tecrübe, suyun kaldırma kuvveti ile birleşen mineral desteğinin <strong>felçli hastaların</strong> motor fonksiyonlarını desteklediğini göstermektedir.</li>
                        <li><strong>Kadın Hastalıkları:</strong> Kronik inflamatuar süreçlerde destekleyici tedavi olarak tercih edilir.</li>
                    </ul>

                    <h4>⚠️ Dürüst Bilgilendirme</h4>
                    <p>KÖS Kaplıcaları'ndaki tesisleşme modern olsa da, Batı'daki "ultra lüks" konseptten ziyade <strong>şifa ve konaklama</strong> odaklıdır. Medikal denetimli kür programları sınırlı düzeydedir.</p>
                </div>`
            }
        },
        care: {
            tr: {
                hospName: "Rehabilitasyon Potansiyeli",
                analysis: `<div class="analysis-content"><p>Bingöl'de yaşlı bakımı ve rehabilitasyon hizmetleri daha çok devlet kanalıyla yürütülmektedir. Uluslararası sağlık turizmine uygun, yüksek teknolojili bir <strong>bakım merkezi</strong> henüz bulunmamaktadır.</p></div>`
            }
        },
        spa: {
            tr: {
                hospName: "Termal Odaklı Dinlenme",
                analysis: `<div class="analysis-content"><p>SPA hizmetleri tamamen termal tesislerin bünyesindeki hamam ve sauna olanakları ile sınırlıdır. Kozmetik veya medikal SPA konsepti mevcut değildir.</p></div>`
            }
        }
    },
    "BITLIS": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Bitlis+Tatvan+Devlet+Hastanesi",
            phone: "+90 434 827 63 11",
            tr: {
                hospName: "Bitlis-Tatvan Devlet Hastanesi",
                analysis: `
                <div class="analysis-content">
                    <p><strong>BİTLİS</strong>, özellikle Tatvan ilçesindeki modern hastanesi ile bölgeye hizmet vermektedir. Temel sağlık hizmetlerinde standartlara sahiptir.</p>
                    
                    <h4>🔍 Mevcut Kapasite</h4>
                    <ul>
                        <li><strong>Temel Branşlar:</strong> Genel cerrahi, çocuk sağlığı ve <strong>kadın doğum</strong> alanlarında günlük operasyonlar başarıyla yapılmaktadır.</li>
                        <li><strong>Diyaliz ve Acil:</strong> Bölgesel trafik ve coğrafi koşullar nedeniyle acil tıp ve travma müdahalelerinde tecrübelidir.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Bitlis, uluslararası bir <strong>cerrahi üssü</strong> değildir. <strong>Organ nakli</strong>, <strong>robotik cerrahi</strong> veya karmaşık <strong>beyin ameliyatları</strong> için hastalar genellikle komşu il olan <strong>VAN</strong> veya <strong>ERZURUM</strong>'daki bölge hastanelerine yönlendirilir.</p>
                </div>`
            }
        },
        thermal: {
            img: "https://via.placeholder.com/400x250?text=Bitlis+Budakli+Kaplicasi",
            tr: {
                hospName: "Güroymak (Budaklı) ve Nemrut Kaplıcaları",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#2980b9;">♨️ DOĞAL VOLKANİK ŞİFA: BUDAKLI</h4>
                    <p>Bitlis, sönmüş bir volkan olan Nemrut Dağı'nın etkisiyle çok yüksek mineral yoğunluğuna sahip sulara sahiptir.</p>
                    
                    <h4>🧪 Hangi Hastalıklara İyi Gelir?</h4>
                    <ul>
                        <li><strong>Cilt Hastalıkları:</strong> Suyun kükürt ve sodyum dengesi, <strong>egzama</strong>, <strong>sedef</strong> ve inatçı <strong>cilt yaraları</strong> üzerinde tedavi edici etki gösterir.</li>
                        <li><strong>Kas ve Eklem:</strong> 40 derecenin üzerindeki doğal su sıcaklığı, <strong>kronik kireçlenme</strong> ve <strong>yumuşak doku romatizması</strong> için gevşetici etki sağlar.</li>
                    </ul>

                    <h4>⚠️ Dürüst Bilgilendirme</h4>
                    <p>Bitlis'teki kaplıcalar genellikle <strong>doğal ve el değmemiş</strong> haldedir. Batıdaki 5 yıldızlı otel konforunda medikal SPA konsepti burada yoktur. Daha çok <strong>otantik ve doğal şifa</strong> arayanlar için uygundur.</p>
                </div>`
            }
        },
        care: {
            tr: {
                hospName: "Yerel Sosyal Hizmetler",
                analysis: `<div class="analysis-content"><p>Bitlis'te uluslararası sağlık turizmine hitap eden, ileri teknoloji rehabilitasyon imkanlarına sahip bir <strong>geriatrik bakım merkezi</strong> bulunmamaktadır. Bakım hizmetleri genel kamu hizmetleri çerçevesindedir.</p></div>`
            }
        },
        spa: {
            tr: {
                hospName: "Geleneksel Hamam Kültürü",
                analysis: `<div class="analysis-content"><p>Modern SPA hizmetleri yerine Bitlis'in tarihi dokusuna uygun <strong>geleneksel Türk hamamları</strong> ve kaplıca tesislerindeki basit buhar odaları hizmet vermektedir.</p></div>`
            }
        }
    },
    "BOLU": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Bolu+Izzet+Baysal+Hastanesi",
            phone: "+90 374 253 46 56",
            tr: {
                hospName: "Bolu İzzet Baysal Üniversitesi Eğitim ve Araştırma Hastanesi",
                analysis: `
                <div class="analysis-content">
                    <p><strong>BOLU</strong>, üniversite hastanesi ve köklü tıp geleneği ile Batı Karadeniz ve Marmara arasında güvenilir bir cerrahi köprüdür.</p>
                    
                    <h4>🔍 Cerrahi Yetkinlikler</h4>
                    <ul>
                        <li><strong>Ortopedik Cerrahi:</strong> Şehrin rehabilitasyon gücüyle paralel olarak, <strong>spor yaralanmaları</strong>, <strong>menisküs</strong> ve <strong>eklem protezleri</strong> konusunda uzmanlaşmıştır.</li>
                        <li><strong>Genel Cerrahi:</strong> Laparoskopik (kapalı) yöntemle yapılan <strong>obezite cerrahisi</strong> ve metabolik cerrahi uygulamaları başarılıdır.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Bolu, cerrahi olarak çok güçlüdür ancak <strong>yapay kalp nakli</strong> veya çok spesifik <strong>genetik tedaviler</strong> için hastalar genellikle 1.5 saat mesafedeki İstanbul veya Ankara merkezlerine yönlendirilir.</p>
                </div>`
            }
        },
        thermal: {
            img: "https://via.placeholder.com/400x250?text=Bolu+Karacasu+Termal",
            phone: "+90 374 262 84 50",
            tr: {
                hospName: "Karacasu ve Mudurnu (Babas) Kaplıcaları",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#2980b9;">♨️ TESCİLLİ ŞİFA: KARACASU</h4>
                    <p>Bolu-Karacasu termal suyu, Sağlık Bakanlığı tarafından "tıbbi tedavi edici" olarak tescil edilmiş, kokusuz ve içilebilir derecede temiz bir sudur.</p>
                    
                    <h4>🧪 Hangi Hastalıklara İyi Gelir?</h4>
                    <ul>
                        <li><strong>İltihaplı Romatizma:</strong> Suyun biyokimyasal yapısı <strong>Ankilozan Spondilit</strong> ve <strong>Romatoid Artrit</strong> hastalarında inflamasyonu (yangıyı) baskılar.</li>
                        <li><strong>Nörolojik Rehabilitasyon:</strong> <strong>İnme (Felç)</strong>, <strong>MS (Multiple Skleroz)</strong> ve <strong>Parkinson</strong> hastaları için su içi egzersizlerde Türkiye'nin en iyi sonuç veren sularından biridir.</li>
                        <li><strong>Bel ve Boyun Fıtığı:</strong> Termal suyun kas gevşetici etkisi, fıtık kaynaklı <strong>siyatik ağrılarını</strong> %70 oranında azaltır.</li>
                    </ul>
                </div>`
            }
        },
        care: {
            img: "https://via.placeholder.com/400x250?text=Bolu+Fizik+Tedavi",
            phone: "+90 374 262 84 62",
            tr: {
                hospName: "Bolu İzzet Baysal Fizik Tedavi ve Rehabilitasyon Hastanesi",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#27ae60;">♿ TÜRKİYE'NİN REHABİLİTASYON ÜSSÜ</h4>
                    <p>Bolu, <strong>Fizik Tedavi</strong> alanında Türkiye'nin referans merkezidir. Şehirdeki hastaneler, kaplıca suyunu tıbbi tedavi ile birleştiren (Balneoterapi) nadir yerlerdendir.</p>
                    
                    <h4>🌲 Klimaterapi ve Doğa Bakımı</h4>
                    <p>Geniş orman varlığı ve tertemiz havası sayesinde <strong>post-op (ameliyat sonrası) iyileşme</strong> ve <strong>yaşlı bakımı</strong> için ideal bir mikro-klimaya sahiptir. <strong>Solunum rehabilitasyonu</strong> için doğal bir merkezdir.</p>
                </div>`
            }
        },
        spa: {
            tr: {
                hospName: "Abant ve Karacasu Wellness",
                analysis: `<div class="analysis-content"><p>Bolu'da SPA kültürü, özellikle <strong>Abant</strong> ve <strong>Gölcük</strong> çevresindeki lüks otellerde orman manzaralı Wellness konseptiyle sunulur. <strong>Detoks</strong> ve <strong>anti-stress</strong> programları oldukça popülerdir.</p></div>`
            }
        }
    },
    "BURDUR": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Burdur+Devlet+Hastanesi",
            phone: "+90 248 233 13 34",
            tr: {
                hospName: "Burdur Devlet Hastanesi",
                analysis: `
                <div class="analysis-content">
                    <p><strong>BURDUR</strong>, yeni hizmete giren modern hastane binası ile temel cerrahi ihtiyaçları karşılayan bir altyapıya sahiptir.</p>
                    
                    <h4>🔍 Mevcut Kapasite</h4>
                    <ul>
                        <li><strong>Temel Cerrahi:</strong> Genel cerrahi, üroloji ve ortopedi branşlarında standart <strong>laparoskopik</strong> (kapalı) ameliyatlar yapılmaktadır.</li>
                        <li><strong>Diyaliz:</strong> Şehirde modern cihazlarla donatılmış geniş bir diyaliz ünitesi mevcuttur.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Burdur, uluslararası sağlık turizmi kapsamında <strong>kalp cerrahisi</strong>, <strong>onkoloji</strong> veya <strong>robotik cerrahi</strong> gibi ileri seviye müdahaleler için bir durak değildir. Bu tip vakalar genellikle 1 saat mesafedeki <strong>Antalya</strong> veya <strong>Isparta</strong> (Süleyman Demirel Üni.) merkezlerine sevk edilir.</p>
                </div>`
            }
        },
        thermal: {
            img: "https://via.placeholder.com/400x250?text=Burdur+Salda+Magunzyum",
            tr: {
                hospName: "Salda ve İnsuyu Doğal Kaynakları",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#2980b9;">🧪 DOĞAL MİNERAL DEPOSU</h4>
                    <p>Burdur'da klasik "sıcak su" kaplıcasından ziyade, mineralli yapısı çok güçlü doğal oluşumlar öne çıkar.</p>
                    
                    <h4>💧 Hangi Hastalıklara İyi Gelir?</h4>
                    <ul>
                        <li><strong>İnsuyu Mağarası (Mikroklima):</strong> Mağara içindeki nemli ve mineralli hava, <strong>kronik bronşit</strong> ve <strong>nefes darlığı</strong> çeken hastalarda doğal bir rahatlama sağlar.</li>
                        <li><strong>Magnezyum Odağı:</strong> Salda Gölü çevresindeki hidromanyezit yapı, magnezyum açısından zengindir. Bu mineraller <strong>cilt sağlığı</strong> ve <strong>yumuşak doku romatizması</strong> için destekleyicidir.</li>
                    </ul>

                    <h4>⚠️ Dürüst Bilgilendirme</h4>
                    <p>Burdur'da Afyon veya Denizli tarzı medikal denetimli, 5 yıldızlı bir <strong>termal kompleks</strong> bulunmamaktadır. Burası daha çok doğal mineralli kaynakların yerinde deneyimlendiği butik bir noktadır.</p>
                </div>`
            }
        },
        care: {
            tr: {
                hospName: "Doğa ile Rehabilitasyon",
                analysis: `<div class="analysis-content"><p>Burdur'da profesyonel sağlık turizmine uygun <strong>geriatrik bakım merkezi</strong> yoktur. Ancak <strong>Salda Gölü</strong> çevresindeki oksijen kalitesi, yaşlılar için sakin ve huzurlu bir <strong>post-op dinlenme</strong> (ameliyat sonrası toparlanma) ortamı sunar.</p></div>`
            }
        },
        spa: {
            tr: {
                hospName: "Butik Wellness",
                analysis: `<div class="analysis-content"><p>Modern medikal SPA hizmetleri kısıtlıdır. Sadece şehir merkezindeki birkaç otelde standart hamam ve dinlenme alanları mevcuttur.</p></div>`
            }
        }
    },
    "BURSA": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Bursa+Sehir+Hastanesi",
            phone: "+90 224 975 00 00",
            tr: {
                hospName: "Bursa Şehir Hastanesi ve Uludağ Üniversitesi Tıp Fakültesi",
                analysis: `
                <div class="analysis-content">
                    <p><strong>BURSA</strong>, Güney Marmara'nın en büyük tıbbi üssüdür. Modern Şehir Hastanesi ve köklü üniversitesiyle karmaşık tüm vakalarda global bir merkezdir.</p>
                    
                    <h4>🔍 Cerrahi Güç Alanları</h4>
                    <ul>
                        <li><strong>Kardiyoloji ve KVC:</strong> <strong>Açık kalp ameliyatları</strong> ve <strong>robotik kalp cerrahisi</strong> konusunda Türkiye'nin en deneyimli illerinden biridir.</li>
                        <li><strong>Onkoloji:</strong> Gelişmiş <strong>radyoterapi</strong> (LİNAK) ve <strong>akıllı ilaç</strong> uygulamalarıyla kanser cerrahisinde tam donanımlıdır.</li>
                        <li><strong>Ortopedi:</strong> Özellikle <strong>skolyoz cerrahisi</strong> ve <strong>robotik diz protezi</strong> ameliyatlarında uzmanlaşmış kliniklere sahiptir.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Bursa, her branşta dünya standartlarındadır. Ancak şehrin yoğun trafiği ve sanayi bölgelerinden kaynaklı hava kalitesi, ameliyat sonrası açık havada uzun süre kalması gereken <strong>solunum hastaları</strong> için bir dezavantaj olabilir.</p>
                </div>`
            }
        },
        thermal: {
            img: "https://via.placeholder.com/400x250?text=Bursa+Cekirge+Termal",
            phone: "+90 224 233 93 00",
            tr: {
                hospName: "Tarihi Çekirge ve Oylat Kaplıcaları",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#2980b9;">👑 OSMANLI'DAN GELEN ŞİFA: ÇEKİRGE</h4>
                    <p>Bursa'nın suları, radyoaktivite içermesi ve zengin mineral yapısıyla "Gümüş Suyu" olarak adlandırılır.</p>
                    
                    <h4>🧪 Hangi Hastalıklara İyi Gelir?</h4>
                    <ul>
                        <li><strong>Oylat Suyu:</strong> Dünyada eşi benzeri az bulunan bir bileşime sahiptir; <strong>tansiyonu dengeleyici</strong> ve <strong>sinir sistemini</strong> yatıştırıcı etkisiyle bilinir.</li>
                        <li><strong>Kireçlenme ve Romatizma:</strong> Çekirge suları, <strong>kronik bel ağrıları</strong> ve <strong>eklem kireçlenmeleri</strong> tedavisinde 600 yıldır tescilli bir şifa kaynağıdır.</li>
                        <li><strong>Cilt Yenileme:</strong> Sodyum bikarbonatlı yapısı, ameliyat izlerinin ve <strong>yanık nedbelerinin</strong> iyileşmesini hızlandırır.</li>
                    </ul>
                </div>`
            }
        },
        care: {
            img: "https://via.placeholder.com/400x250?text=Bursa+Rommer+Fizik+Tedavi",
            phone: "+90 224 233 50 40",
            tr: {
                hospName: "ROMMER ve Kurumsal Rehabilitasyon Merkezleri",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#27ae60;">♿ ROBOTİK REHABİLİTASYONUN MERKEZİ</h4>
                    <p>Bursa, özel ve kamuya ait ileri düzey <strong>fizik tedavi</strong> merkezleriyle bir rehabilitasyon devidir.</p>
                    
                    <h4>🧠 Nörolojik Bakım</h4>
                    <p><strong>İnme (Felç)</strong>, <strong>Serebral Palsi</strong> ve <strong>Omurilik Yaralanmaları</strong> sonrası kullanılan <strong>Yürüme Robotları</strong> ve <strong>El-Kol Robotları</strong> konusunda Türkiye'nin en yoğun teknoloji parkına sahip illerinden biridir.</p>
                </div>`
            }
        },
        spa: {
            tr: {
                hospName: "Geleneksel Bursa Hamamı & Wellness",
                analysis: `<div class="analysis-content"><p>Bursa'da SPA kültürü, tarihi <strong>Vakıfbahçe</strong> ve <strong>Kervansaray</strong> gibi Osmanlı mimarisiyle birleşir. Termal suyun doğrudan kullanıldığı <strong>Otantik Türk Hamamı</strong> deneyimi dünyada tektir.</p></div>`
            }
        }
    },
    "ÇANAKKALE": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Canakkale+Onsekiz+Mart+Uni",
            phone: "+90 286 263 59 50",
            tr: {
                hospName: "Çanakkale Onsekiz Mart Üniversitesi Hastanesi",
                analysis: `
                <div class="analysis-content">
                    <p><strong>ÇANAKKALE</strong>, üniversite hastanesi ile bölgede güvenilir bir akademik cerrahi hizmet sunmaktadır.</p>
                    
                    <h4>🔍 Cerrahi Yetkinlikler</h4>
                    <ul>
                        <li><strong>Göz Cerrahisi:</strong> Modern teknoloji ile <strong>katarakt</strong> ve <strong>lazerle göz çizdirme</strong> operasyonları yaygın olarak yapılır.</li>
                        <li><strong>Ortopedi:</strong> Özellikle <strong>sporcu sağlığı</strong> ve eklem cerrahisi konularında deneyimli bir kadroya sahiptir.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Çanakkale cerrahi altyapısı güçlü olsa da, <strong>karaciğer-akciğer nakli</strong> veya çok ileri <strong>çocuk kalp cerrahisi</strong> gibi operasyonlar için hastalar genellikle İstanbul veya İzmir'deki merkezlere sevk edilmektedir.</p>
                </div>`
            }
        },
        thermal: {
            img: "https://via.placeholder.com/400x250?text=Ezine+Kestbolu+Termal",
            phone: "+90 286 618 10 03",
            tr: {
                hospName: "Kestbolu (Ezine) ve Çan Kaplıcaları",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#2980b9;">♨️ ANTİK ÇAĞDAN GELEN ŞİFA: KESTBOLU</h4>
                    <p>Ezine bölgesindeki Kestbolu suları, tarihte büyük filozofların ve askerlerin tedavi olduğu, sodyum klorür oranı yüksek bir kaynaktır.</p>
                    
                    <h4>🧪 Hangi Hastalıklara İyi Gelir?</h4>
                    <ul>
                        <li><strong>Solunum Yolları:</strong> Kestbolu suyunun buharı <strong>kronik sinüzit</strong>, <strong>faranjit</strong> ve <strong>hafif astım</strong> vakalarında hava yollarını açar.</li>
                        <li><strong>Eklem Romatizması:</strong> <strong>Çan</strong> ilçesindeki kükürtlü sular, <strong>diz kireçlenmesi</strong> ve <strong>bel ağrısı</strong> olanlarda ağrı eşiğini yükseltir.</li>
                    </ul>

                    <h4>⚠️ Dürüst Bilgilendirme</h4>
                    <p>Çanakkale'deki termal tesislerin bir kısmı tarihi ve doğal yapısını korumuştur. Lüks bir termal saray konsepti yerine daha çok <strong>antik ve butik</strong> bir deneyim bekleyenler için uygundur.</p>
                </div>`
            }
        },
        care: {
            img: "https://via.placeholder.com/400x250?text=Kaz+Daglari+Oksijen",
            tr: {
                hospName: "Kaz Dağları Kuzey Yamacı Rehabilitasyon Alanı",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#27ae60;">💨 NEFESİN MERKEZİ</h4>
                    <p>Çanakkale, Kaz Dağları'nın kuzey yamaçlarında olduğu için hava akımı en temiz olan şehirlerden biridir.</p>
                    
                    <h4>🌬️ Klimaterapi ve Post-Op Bakım</h4>
                    <p>Özellikle <strong>kalp ameliyatı</strong> veya <strong>akciğer operasyonu</strong> sonrası hastaların oksijen desteğine ihtiyaç duyduğu <strong>iyileşme dönemleri</strong> için Türkiye'deki en dürüst ve verimli rotadır. Düşük nem oranı hastaların kalp yükünü azaltır.</p>
                </div>`
            }
        },
        spa: {
            tr: {
                hospName: "Butik Wellness & Thalasso",
                analysis: `<div class="analysis-content"><p>Boğaz manzaralı butik otellerde sunulan <strong>deniz suyu terapileri</strong> ve <strong>yosun bakımları</strong> popülerdir. Şehirde huzur ve dinlenme odaklı bir SPA anlayışı hakimdir.</p></div>`
            }
        }
    },
    "ÇANKIRI": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Cankiri+Devlet+Hastanesi",
            phone: "+90 376 213 27 27",
            tr: {
                hospName: "Çankırı Devlet Hastanesi",
                analysis: `
                <div class="analysis-content">
                    <p><strong>ÇANKIRI</strong>, temel cerrahi branşlarda ve acil tıp hizmetlerinde yerel ihtiyaçları karşılayan bir donanıma sahiptir.</p>
                    
                    <h4>🔍 Cerrahi Kapasite</h4>
                    <ul>
                        <li><strong>Genel Cerrahi:</strong> Safra kesesi, fıtık ve apandisit gibi rutin <strong>laparoskopik</strong> ameliyatlar güvenle yapılır.</li>
                        <li><strong>Ortopedi:</strong> Temel travma cerrahisi ve kapalı eklem müdahaleleri mevcuttur.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Çankırı, uluslararası bir <strong>cerrahi üssü</strong> değildir. Kalp damar cerrahisi, beyin cerrahisi veya onkolojik operasyonlar için hastalar genellikle 1 saat mesafedeki <strong>ANKARA</strong>'ya sevk edilir.</p>
                </div>`
            }
        },
        thermal: {
            img: "https://via.placeholder.com/400x250?text=Cankiri+Cavundur+Termal",
            phone: "+90 376 465 23 50",
            tr: {
                hospName: "Kurşunlu Çavundur Kaplıcası",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#2980b9;">♨️ YÜKSEK MİNERALLİ ÇAVUNDUR</h4>
                    <p>Çankırı'nın Kurşunlu ilçesinde çıkan bu su, çok yüksek debili ve mineral açısından oldukça zengindir.</p>
                    
                    <h4>🧪 Hangi Hastalıklara İyi Gelir?</h4>
                    <ul>
                        <li><strong>Sindirim Sistemi:</strong> Suyun bikarbonatlı yapısı <strong>kronik mide rahatsızlıkları</strong> ve karaciğer fonksiyonlarını destekler.</li>
                        <li><strong>Romatizma:</strong> Suyun sıcaklığı ve kimyasal yapısı <strong>kireçlenme</strong> ağrılarında hızlı rahatlama sağlar.</li>
                    </ul>

                    <h4>⚠️ Dürüst Bilgilendirme</h4>
                    <p>Tesisler genellikle yerel ve butik düzeydedir. Lüks bir termal tatil köyü beklentisiyle değil, doğrudan <strong>su şifası</strong> odaklı gelinmelidir.</p>
                </div>`
            }
        },
        care: {
            img: "https://via.placeholder.com/400x250?text=Cankiri+Tuz+Magarasi",
            tr: {
                hospName: "Yer Altı Tuz Şehri (Tuz Mağarası) Rehabilitasyonu",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#27ae60;">🧂 DÜNYA MİRASI: SPELEOTERAPİ (Mağara Tedavisi)</h4>
                    <p>Çankırı'daki 5000 yıllık devasa <strong>Tuz Mağarası</strong>, havasındaki negatif iyonlar ve sıfır bakteri ortamıyla doğal bir şifa merkezidir.</p>
                    
                    <h4>🌬️ Solunum İçin Mucize</h4>
                    <ul>
                        <li><strong>Astım ve KOAH:</strong> Mağara içindeki hava, solunum yollarını temizler ve <strong>kronik öksürük</strong> şikayetlerini azaltır.</li>
                        <li><strong>Alerjik Rinit:</strong> Polen ve tozdan arınmış bu ortam, ağır <strong>alerji</strong> hastaları için en dürüst doğal çözümdür.</li>
                        <li><strong>Cilt Sağlığı:</strong> Tuz yüklü havanın <strong>egzama</strong> üzerinde kurutucu ve iyileştirici etkisi gözlemlenmiştir.</li>
                    </ul>
                </div>`
            }
        },
        spa: {
            tr: {
                hospName: "Tuz Odası Wellness",
                analysis: `<div class="analysis-content"><p>Modern SPA anlayışı yerine, kaya tuzu ile yapılan <strong>tuz odası terapileri</strong> ve tuz lambaları eşliğinde meditasyon programları şehrin özgün wellness konseptidir.</p></div>`
            }
        }
    },
    "ÇORUM": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Corum+Erol+Olcok+Hastanesi",
            phone: "+90 364 219 30 00",
            tr: {
                hospName: "Hitit Üniversitesi Erol Olçok Eğitim ve Araştırma Hastanesi",
                analysis: `
                <div class="analysis-content">
                    <p><strong>ÇORUM</strong>, Hitit Üniversitesi ile entegre çalışan modern hastanesi sayesinde bölgenin güçlü bir cerrahi merkezidir.</p>
                    
                    <h4>🔍 Cerrahi Odak Noktaları</h4>
                    <ul>
                        <li><strong>Kardiyovasküler Cerrahi:</strong> Şehirde <strong>açık kalp ameliyatları</strong> (Bypass) ve kapak değişimleri rutin olarak başarıyla uygulanmaktadır.</li>
                        <li><strong>Üroloji:</strong> Kapalı böbrek taşı ameliyatları ve <strong>prostat cerrahisi</strong> konusunda teknolojik altyapıya sahiptir.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Çorum, genel cerrahi ve kalp damar alanında çok başarılıdır. Ancak <strong>organ nakli</strong> veya çok ileri düzey <strong>çocuk onkolojisi</strong> gibi spesifik vakalar genellikle Ankara veya Samsun'daki üniversite hastanelerine yönlendirilir.</p>
                </div>`
            }
        },
        thermal: {
            img: "https://via.placeholder.com/400x250?text=Mecitozu+Beke+Kaplicasi",
            phone: "+90 364 461 24 24",
            tr: {
                hospName: "Mecitözü Figani (Beke) Kaplıcaları",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#2980b9;">♨️ TARİHİ BEKE ŞİFASI</h4>
                    <p>Mecitözü ilçesinde bulunan bu kaynak, antik dönemlerden beri kullanılan, sodyum ve bikarbonat açısından zengin bir sudur.</p>
                    
                    <h4>🧪 Hangi Hastalıklara İyi Gelir?</h4>
                    <ul>
                        <li><strong>Kronik Romatizma:</strong> Suyun doğal sıcaklığı, <strong>eklem kireçlenmesi</strong> ve kas sertleşmesi yaşayan hastalar için doğal bir fizik tedavi sağlar.</li>
                        <li><strong>Sinir Sistemi:</strong> Suyun içindeki minerallerin yatıştırıcı etkisiyle <strong>nevralji</strong> (sinir ağrısı) şikayetlerini azaltır.</li>
                        <li><strong>Metabolizma:</strong> Kan dolaşımını hızlandırarak vücuttaki <strong>ödemin</strong> atılmasına yardımcı olur.</li>
                    </ul>
                </div>`
            }
        },
        care: {
            tr: {
                hospName: "Yaşlı Bakımı ve Rehabilitasyon",
                analysis: `<div class="analysis-content"><p>Çorum'da yaşlı bakım hizmetleri devlet ve yerel yönetimler tarafından yürütülmektedir. Uluslararası sağlık turizmine uygun lüks bir <strong>geriatri köyü</strong> bulunmamaktadır; ancak temel rehabilitasyon hizmetleri modern hastane bünyesinde mevcuttur.</p></div>`
            }
        },
        spa: {
            tr: {
                hospName: "Şehir Otelleri Wellness",
                analysis: `<div class="analysis-content"><p>Modern SPA imkanları genellikle şehir merkezindeki 4 ve 5 yıldızlı iş otellerinde standart hamam, sauna ve masaj hizmetleri olarak sunulmaktadır.</p></div>`
            }
        }
    },
    "DENIZLI": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Denizli+Pamukkale+Uni",
            phone: "+90 258 296 60 00",
            tr: {
                hospName: "Pamukkale Üniversitesi Hastaneleri ve Özel Sağlık Merkezleri",
                analysis: `
                <div class="analysis-content">
                    <p><strong>DENİZLİ</strong>, Ege Bölgesi'nin en gelişmiş tıp fakültelerinden birine ve yüksek teknolojili özel hastanelere ev sahipliği yapar.</p>
                    
                    <h4>🔍 Cerrahi Yetkinlikler</h4>
                    <ul>
                        <li><strong>Göz Cerrahisi:</strong> Akıllı lens, <strong>katarakt</strong> ve lazer operasyonlarında uluslararası hasta trafiği çok yüksektir.</li>
                        <li><strong>Ortopedi ve Travmatoloji:</strong> Şehrin rehabilitasyon kimliğiyle birleşen <strong>kalça ve diz protezi</strong> ameliyatları dünya standartlarındadır.</li>
                        <li><strong>Kardiyoloji:</strong> Anjiyo ve kapalı kalp kapakçığı değişimleri (TAVI) başarıyla uygulanır.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Denizli cerrahide çok güçlüdür ancak çok nadir görülen <strong>pediatrik onkoloji</strong> veya ileri <strong>genetik araştırmalar</strong> için hastalar bazen İzmir veya Ankara'ya yönlendirilebilir.</p>
                </div>`
            }
        },
        thermal: {
            img: "https://via.placeholder.com/400x250?text=Karahayit+Kirmizi+Su",
            phone: "+90 258 272 20 20",
            tr: {
                hospName: "Karahayıt Kırmızı Su ve Pamukkale Termal Havzası",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#e74c3c;">🔴 DÜNYADA TEK: KARAHAYIT KIRMIZI SU</h4>
                    <p>Pamukkale'nin beyaz suyunun aksine Karahayıt'taki 58 derece sıcaklığındaki <strong>Kırmızı Su</strong>, demir ve yüksek mineral içeriğiyle benzersizdir.</p>
                    
                    <h4>🧪 Hangi Hastalıklara İyi Gelir?</h4>
                    <ul>
                        <li><strong>Bel ve Boyun Fıtığı:</strong> Suyun radyoaktif ve mineral yapısı, <strong>fıtık ağrılarını</strong> ve siyatik sızılarını dindirmede %90 başarı sağlar.</li>
                        <li><strong>Ameliyat Sonrası Yapışıklıklar:</strong> Cerrahi müdahale sonrası oluşan doku sertleşmelerini yumuşatır.</li>
                        <li><strong>Mide ve Bağırsak:</strong> İçme kürü olarak kullanıldığında <strong>ülser</strong> ve <strong>gastrit</strong> şikayetlerini azaltır.</li>
                    </ul>
                </div>`
            }
        },
        care: {
            img: "https://via.placeholder.com/400x250?text=Denizli+Rehabilitasyon",
            tr: {
                hospName: "Nobel Fizik Tedavi ve Rehabilitasyon Merkezi",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#27ae60;">♿ ROBOTİK TERMAL REHABİLİTASYON</h4>
                    <p>Denizli, Türkiye'de <strong>Robotik Fizik Tedavi</strong> ile <strong>Termal Suyu</strong> birleştiren en profesyonel şehirdir.</p>
                    
                    <h4>🧠 Nörolojik Tedavi</h4>
                    <p><strong>İnme (Felç)</strong>, <strong>MS</strong> ve <strong>Parkinson</strong> hastaları için su içinde yapılan robotik yürüme terapileri sayesinde hastaların iyileşme hızı 2 katına çıkar. Yaşlı bakımı için lüks ve medikal denetimli tesisler yaygındır.</p>
                </div>`
            }
        },
        spa: {
            tr: {
                hospName: "Termal Wellness & Mud Bath",
                analysis: `<div class="analysis-content"><p>Denizli'deki SPA kültürü <strong>Çamur Banyosu (Peloidoterapi)</strong> ile ünlüdür. Cildi yenileyen ve toksin atan termal çamur kürleri, lüks otellerde medikal gözetim altında sunulur.</p></div>`
            }
        }
    },
    "DIYARBAKIR": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Diyarbakir+Dicle+Uni",
            phone: "+90 412 248 80 01",
            tr: {
                hospName: "Dicle Üniversitesi Tıp Fakültesi ve Gazi Yaşargil E.A.H.",
                analysis: `
                <div class="analysis-content">
                    <p><strong>DİYARBAKIR</strong>, Güneydoğu'nun en ileri cerrahi altyapısına sahip şehridir. Özellikle <strong>akademik cerrahi</strong> ve <strong>travma müdahalelerinde</strong> uzmanlaşmıştır.</p>
                    
                    <h4>🔍 Cerrahi Güç Alanları</h4>
                    <ul>
                        <li><strong>Beyin ve Sinir Cerrahisi:</strong> Şehir, mikro-cerrahi yöntemlerle yapılan <strong>beyin tümörü</strong> ve omurga operasyonlarında bölgenin referans merkezidir.</li>
                        <li><strong>Pediatrik Cerrahi:</strong> Çocuk cerrahisi ve yenidoğan operasyonlarında çok yüksek bir vaka deneyimine sahiptir.</li>
                        <li><strong>Kardiyovasküler Cerrahi:</strong> <strong>Açık kalp ameliyatları</strong> ve anjiyo üniteleri 24 saat kesintisiz hizmet verir.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Diyarbakır cerrahi operasyonlarda çok tecrübelidir. Ancak tıbbi teknoloji (robotik cerrahi vb.) İstanbul kadar yaygın değildir. Çok spesifik <strong>genetik tedaviler</strong> için hastalar bazen Ankara’ya yönlendirilebilir.</p>
                </div>`
            }
        },
        thermal: {
            img: "https://via.placeholder.com/400x250?text=Cermik+Kaplicalari",
            phone: "+90 412 461 21 02",
            tr: {
                hospName: "Çermik Hamambaşı Kaplıcaları",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#2980b9;">♨️ TARİHİ ÇERMİK ŞİFASI</h4>
                    <p>Çermik kaplıcaları, dünyada <strong>iyot</strong> oranı en yüksek kaplıcalardan biri olarak kabul edilir.</p>
                    
                    <h4>🧪 Hangi Hastalıklara İyi Gelir?</h4>
                    <ul>
                        <li><strong>İnfertilite (Kısırlık):</strong> Bölgedeki suların, kadın hastalıkları ve <strong>iltihabi durumlar</strong> üzerindeki olumlu etkisi halk arasında ve klinik gözlemlerde bilinmektedir.</li>
                        <li><strong>Cilt Hastalıkları:</strong> Suyun içindeki iyot ve mineraller <strong>kronik yaraların</strong> iyileşmesini hızlandırır.</li>
                        <li><strong>Romatizma:</strong> Şiddetli <strong>eklem kireçlenmesi</strong> ve iltihaplı romatizma için doğal bir ağrı kesicidir.</li>
                    </ul>
                </div>`
            }
        },
        care: {
            tr: {
                hospName: "Bölgesel Rehabilitasyon Merkezi",
                analysis: `<div class="analysis-content"><p>Diyarbakır, büyük bir fizik tedavi ve rehabilitasyon kapasitesine sahiptir. Ancak lüks <strong>yaşlı bakım turizmi</strong> odaklı tesislerden ziyade, tıbbi tedavi ve iyileştirme odaklı kamu tesisleri ön plandadır.</p></div>`
            }
        },
        spa: {
            tr: {
                hospName: "Geleneksel Hamam ve Modern Spa",
                analysis: `<div class="analysis-content"><p>Şehirde köklü bir <strong>Osmanlı Hamam kültürü</strong> vardır. Modern oteller bünyesinde bu kültür, profesyonel masaj ve aromaterapi ile birleştirilerek sunulmaktadır.</p></div>`
            }
        }
    },
    "EDIRNE": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Edirne+Trakya+Uni",
            phone: "+90 284 235 76 41",
            tr: {
                hospName: "Trakya Üniversitesi Tıp Fakültesi Hastanesi",
                analysis: `
                <div class="analysis-content">
                    <p><strong>EDİRNE</strong>, Balkanlar'dan gelen hastaların ilk durağı olan, akademik cerrahide uzmanlaşmış bir şehirdir.</p>
                    
                    <h4>🔍 Cerrahi Odak Noktaları</h4>
                    <ul>
                        <li><strong>Nefroloji ve Üroloji:</strong> Böbrek nakli ve karmaşık <strong>böbrek taşı</strong> ameliyatlarında Türkiye'nin en köklü merkezlerinden biridir.</li>
                        <li><strong>Gastroenteroloji Cerrahisi:</strong> Sindirim sistemi kanserleri ve obezite cerrahisinde yüksek başarı oranlarına sahiptir.</li>
                        <li><strong>Göz Hastalıkları:</strong> Modern cerrahi yöntemlerle Balkan coğrafyasına hizmet veren bir merkezdir.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Edirne cerrahi olarak tam donanımlıdır. Ancak çok ileri seviye <strong>pediatrik kalp cerrahisi</strong> gibi spesifik durumlar için hastalar genellikle 2 saat mesafedeki İstanbul'a yönlendirilir.</p>
                </div>`
            }
        },
        thermal: {
            tr: {
                hospName: "Edirne Bölgesi Jeotermal Kaynaklar",
                analysis: `
                <div class="analysis-content">
                    <h4>♨️ Bölgesel Durum</h4>
                    <p>Edirne, komşusu Tekirdağ ve Kırklareli gibi yoğun bir termal turizm merkezi değildir.</p>
                    
                    <h4>⚠️ Dürüst Bilgilendirme</h4>
                    <p>Şehirde bazı yerel kaplıca kaynakları olsa da, tıbbi bir termal kür için tesisleşme sınırlıdır. Termal tedavi arayanlara genellikle yakın bölgedeki <strong>Yalova</strong> veya <strong>Balıkesir</strong> önerilir.</p>
                </div>`
            }
        },
        care: {
            img: "https://via.placeholder.com/400x250?text=Sultan+II+Bayezid+Kulliyesi",
            tr: {
                hospName: "Sultan II. Bayezid Külliyesi Sağlık Müzesi",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#27ae60;">🎼 DÜNYA TARİHİNDE BİR İLK: MÜZİK VE SU TERAPİSİ</h4>
                    <p>Edirne, psikiyatrik ve nörolojik hastalıkların müzik, su sesi ve güzel kokularla tedavi edildiği tarihi bir mirasa sahiptir.</p>
                    
                    <h4>🧠 Modern Psikolojik Rehabilitasyon</h4>
                    <p>Bu kadim gelenek bugün modern psikiyatri ve <strong>rehabilitasyon</strong> klinikleriyle devam etmektedir. Sakin şehir yapısı, <strong>depresyon</strong> ve <strong>anksiyete</strong> sonrası toparlanma süreçleri için doğal bir iyileşme ortamı sunar.</p>
                </div>`
            }
        },
        spa: {
            tr: {
                hospName: "Geleneksel Balkan Hamamları",
                analysis: `<div class="analysis-content"><p>Edirne'de SPA kültürü, Mimar Sinan eseri olan tarihi <strong>Saray Hamamı</strong> ve <strong>Sokullu Hamamı</strong> gibi mekanlarda yaşatılır. Gerçek bir Osmanlı banyo kültürü ve kese-köpük masajı için dünyadaki en dürüst adreslerden biridir.</p></div>`
            }
        }
    },
    "ELAZIG": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Elazig+Fethi+Sekin+Sehir+Hastanesi",
            phone: "+90 424 606 60 00",
            tr: {
                hospName: "Fethi Sekin Şehir Hastanesi ve Fırat Üniversitesi Tıp Fakültesi",
                analysis: `
                <div class="analysis-content">
                    <p><strong>ELAZIĞ</strong>, Doğu ve Güneydoğu Anadolu'nun en gelişmiş tıbbi teknoloji parkına sahip şehirlerinden biridir.</p>
                    
                    <h4>🔍 Cerrahi Güç Alanları</h4>
                    <ul>
                        <li><strong>Girişimsel Radyoloji:</strong> Bölgede beyin damar tıkanıklıkları ve <strong>anevrizma</strong> müdahalelerinde en gelişmiş merkezdir.</li>
                        <li><strong>Onkolojik Cerrahi:</strong> Kanser cerrahisinde ve <strong>nükleer tıp</strong> (PET-CT) taramalarında bölge referans noktasıdır.</li>
                        <li><strong>Ortopedi:</strong> Karmaşık kalça ve omurga cerrahilerinde yüksek vaka tecrübesine sahiptir.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Elazığ, cerrahi kapasite olarak çok güçlüdür. Ancak çok nadir görülen <strong>genetik bozukluklar</strong> veya deneysel faz aşamasındaki tedaviler için hastalar genellikle Ankara'daki merkez üniversitelere yönlendirilir.</p>
                </div>`
            }
        },
        thermal: {
            img: "https://via.placeholder.com/400x250?text=Karakocan+Golan+Kaplicalari",
            phone: "+90 424 511 20 22",
            tr: {
                hospName: "Karakoçan Golan Kaplıcaları",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#2980b9;">♨️ BÖLGESEL ŞİFA: GOLAN</h4>
                    <p>Peri Çayı kıyısında bulunan Golan Kaplıcaları, kükürtlü yapısı ve yüksek mineral değerleriyle Doğu'nun gizli bir hazinesidir.</p>
                    
                    <h4>🧪 Hangi Hastalıklara İyi Gelir?</h4>
                    <ul>
                        <li><strong>Dermatoloji:</strong> Suyun kükürt dengesi <strong>akne</strong>, <strong>sedef</strong> ve mantar tipi cilt rahatsızlıklarında kurutucu ve yenileyici etkiye sahiptir.</li>
                        <li><strong>Kadın Hastalıkları:</strong> Kronik inflamatuar pelvis hastalıklarında destekleyici kür olarak kullanılır.</li>
                        <li><strong>Romatizma:</strong> Hareket kısıtlılığına yol açan <strong>eklem iltihapları</strong> için ideal sıcaklık sunar.</li>
                    </ul>
                </div>`
            }
        },
        care: {
            tr: {
                hospName: "Gelişmiş Fizik Tedavi Üniteleri",
                analysis: `<div class="analysis-content"><p>Elazığ Şehir Hastanesi, Türkiye'nin en modern <strong>Rehabilitasyon ve Fizik Tedavi</strong> ünitelerinden birine sahiptir. İnme sonrası bakım ve yürüme robotları ile bölgedeki en dürüst ve donanımlı bakım hizmetini sunar.</p></div>`
            }
        },
        spa: {
            tr: {
                hospName: "Modern & Termal SPA",
                analysis: `<div class="analysis-content"><p>Elazığ'da SPA hizmetleri, yeni nesil termal oteller ve Şehir Hastanesi'nin wellness birimlerinde birleştirilerek sunulur. Geleneksel hamam kültürü modern tıbbi masajla desteklenmektedir.</p></div>`
            }
        }
    },
    "ERZINCAN": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Erzincan+Binali+Yildirim+Uni",
            phone: "+90 446 212 22 22",
            tr: {
                hospName: "Erzincan Binali Yıldırım Üniversitesi Mengücek Gazi E.A.H.",
                analysis: `
                <div class="analysis-content">
                    <p><strong>ERZİNCAN</strong>, modern hastane kampüsü ile Doğu Anadolu'da güvenilir ve erişilebilir sağlık hizmeti sunan bir merkezdir.</p>
                    
                    <h4>🔍 Cerrahi Kapasite</h4>
                    <ul>
                        <li><strong>Genel Cerrahi:</strong> Laparoskopik safra kesesi ve fıtık ameliyatlarında yüksek başarı oranına sahiptir.</li>
                        <li><strong>Göz Cerrahisi:</strong> Bölge halkı için modern teknoloji ile katarakt ve temel göz operasyonları yapılmaktadır.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Erzincan, temel ve orta ölçekli cerrahide çok başarılıdır. Ancak <strong>açık kalp cerrahisi</strong> (bazı kompleks vakalar), <strong>organ nakli</strong> veya ileri <strong>çocuk onkolojisi</strong> için hastalar genellikle 2 saat mesafedeki Erzurum Atatürk Üniversitesi'ne sevk edilir.</p>
                </div>`
            }
        },
        thermal: {
            img: "https://via.placeholder.com/400x250?text=Erzincan+Eksisu+Kaplicasi",
            phone: "+90 446 231 10 10",
            tr: {
                hospName: "Ekşisu Mesire Alanı ve Jeotermal Kaynaklar",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#2980b9;">💧 DOĞAL MADEN SUYU ŞİFASI: EKŞİSU</h4>
                    <p>Erzincan'ın en meşhur noktası olan Ekşisu, hem içilebilir maden suyu hem de banyo kürü olarak kullanılan eşsiz bir kaynaktır.</p>
                    
                    <h4>🧪 Hangi Hastalıklara İyi Gelir?</h4>
                    <ul>
                        <li><strong>Dolaşım Sistemi:</strong> Suyun içindeki doğal karbondioksit, banyo sırasında damarları genişleterek <strong>yüksek tansiyon</strong> ve <strong>dolaşım bozukluklarına</strong> iyi gelir.</li>
                        <li><strong>Mide ve Sindirim:</strong> İçme kürü olarak <strong>gastrit</strong> ve <strong>hazımsızlık</strong> problemlerinde tıbbi destek sağlar.</li>
                        <li><strong>Romatizma:</strong> 33 derecelik ideal sıcaklığıyla kronik <strong>eklem ağrılarını</strong> hafifletir.</li>
                    </ul>
                </div>`
            }
        },
        care: {
            tr: {
                hospName: "Yayla ve Doğa Rehabilitasyonu",
                analysis: `<div class="analysis-content"><p>Erzincan, düşük nem oranı ve yüksek oksijeni ile <strong>astım</strong> hastaları için doğal bir bakım ortamı sunar. Profesyonel sağlık turizmi odaklı lüks bir bakım merkezi yoktur, ancak huzurlu yapısı iyileşme süreçlerini (konvalasans) destekler.</p></div>`
            }
        },
        spa: {
            tr: {
                hospName: "Geleneksel ve Yerel Wellness",
                analysis: `<div class="analysis-content"><p>Modern SPA konsepti sınırlıdır. Ancak Ekşisu bölgesindeki havuzlar ve şehir merkezindeki geleneksel hamamlar, yerel mineralli sularla özgün bir deneyim sunar.</p></div>`
            }
        }
    },
    "ERZURUM": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Erzurum+Ataturk+Uni",
            phone: "+90 442 344 66 66",
            tr: {
                hospName: "Atatürk Üniversitesi Araştırma Hastanesi ve Erzurum Şehir Hastanesi",
                analysis: `
                <div class="analysis-content">
                    <p><strong>ERZURUM</strong>, Doğu Anadolu, Kafkaslar ve Orta Asya'dan gelen hastalar için en ileri cerrahi merkezdir.</p>
                    
                    <h4>🔍 Cerrahi Güç Alanları</h4>
                    <ul>
                        <li><strong>Organ Nakli:</strong> Karaciğer ve böbrek nakli konusunda Türkiye'nin en yüksek başarı oranına sahip eğitim kurumlarından biridir.</li>
                        <li><strong>Göz Cerrahisi:</strong> Kornea nakli ve karmaşık vitreoretinal cerrahilerde bölgesel bir otoritedir.</li>
                        <li><strong>Kalp Damar Cerrahisi:</strong> Çocuk ve yetişkin <strong>bypass</strong> ameliyatlarında devasa bir vaka tecrübesi bulunur.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Erzurum cerrahi olarak eksiksizdir. Ancak şehrin <strong>yüksek rakımı (1900m)</strong>, çok ileri derece kalp yetmezliği veya ağır solunum sıkıntısı olan bazı hastaların ameliyat sonrası adaptasyon sürecini zorlaştırabilir.</p>
                </div>`
            }
        },
        thermal: {
            img: "https://via.placeholder.com/400x250?text=Pasinler+Kaplicalari",
            phone: "+90 442 661 23 23",
            tr: {
                hospName: "Pasinler ve Ilıca (Aziziye) Termal Tesisleri",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#2980b9;">♨️ YÜKSEK MİNERALLİ DOĞU ŞİFASI</h4>
                    <p>Erzurum kaplıcaları, bikarbonat ve klorür açısından zengin, 40-45 derece sıcaklığa sahip doğal şifa kaynaklarıdır.</p>
                    
                    <h4>🧪 Hangi Hastalıklara İyi Gelir?</h4>
                    <ul>
                        <li><strong>Eklem ve Kas:</strong> Soğuk iklimin tetiklediği <strong>siyatik</strong> ve <strong>lumbago</strong> (bel tutulması) ağrılarında anında gevşetici etki yapar.</li>
                        <li><strong>Kırık Sonrası Rehabilitasyon:</strong> Ameliyat veya alçı sonrası <strong>eklem kısıtlılıklarını</strong> açmak için su içi egzersizlerde çok etkilidir.</li>
                    </ul>

                    <h4>⚠️ Dürüst Bilgilendirme</h4>
                    <p>Erzurum'daki tesisler "termal otel"den ziyade "sağlık tesisi" odaklıdır. Kar tatili ile kaplıcayı birleştirmek isteyenler için dünyada nadir bulunan bir konuma sahiptir.</p>
                </div>`
            }
        },
        care: {
            img: "https://via.placeholder.com/400x250?text=Palandoken+Klimaterapi",
            tr: {
                hospName: "Palandöken Yüksek Rakım Rehabilitasyonu",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#27ae60;">🏔️ SPORCU VE SOLUNUM BAKIMI</h4>
                    <p>Erzurum, <strong>Yüksek Rakım Antrenman Merkezi</strong> olmasıyla sporcu sağlığı ve rehabilitasyonunda dünyaca ünlüdür.</p>
                    
                    <h4>❄️ İklimle Gelen Temizlik</h4>
                    <p>Havadaki polen ve nem oranının sıfıra yakın olması, <strong>alerjik astım</strong> hastaları için en dürüst doğal terapiyi sunar. Ayrıca kış aylarındaki kristal kar yapısı, psikolojik rehabilitasyon için huzurlu bir ortam sağlar.</p>
                </div>`
            }
        },
        spa: {
            tr: {
                hospName: "Modern Kış Wellness",
                analysis: `<div class="analysis-content"><p>Erzurum'da SPA kültürü, Palandöken'deki lüks kayak otellerinde kış sporları sonrası <strong>kas rahatlatma</strong> masajları ve termal sularla harmanlanmış modern seanslar şeklinde sunulur.</p></div>`
            }
        }
    },
    "ESKISEHIR": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Eskisehir+Osmangazi+Uni",
            phone: "+90 222 239 29 79",
            tr: {
                hospName: "Eskişehir Osmangazi Üniversitesi Tıp Fakültesi ve Şehir Hastanesi",
                analysis: `
                <div class="analysis-content">
                    <p><strong>ESKİŞEHİR</strong>, tıp eğitimi ve cerrahi disiplin konusunda Türkiye'nin en saygın şehirlerinden biridir.</p>
                    
                    <h4>🔍 Cerrahi Yetkinlikler</h4>
                    <ul>
                        <li><strong>Girişimsel Kardiyoloji:</strong> <strong>TAVI</strong> (ameliyatsız kapak değişimi) ve kompleks anjiyo işlemlerinde ulusal çapta bir merkezdir.</li>
                        <li><strong>Beyin Cerrahisi:</strong> Özellikle <strong>Parkinson Cerrahisi (Beyin Pili)</strong> ve epilepsi cerrahisinde uzmanlaşmış ekiplere sahiptir.</li>
                        <li><strong>Tüp Bebek (IVF):</strong> Başarı oranları ve laboratuvar altyapısı ile İç Anadolu'nun en çok tercih edilen noktalarındandır.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Eskişehir cerrahide çok dürüst ve başarılı bir çizgidedir. Ancak çok nadir görülen <strong>çocuk metabolizma hastalıkları</strong> veya aşırı ileri seviye <strong>genetik mühendislik</strong> gerektiren vakalar için Ankara hala ana merkezdir.</p>
                </div>`
            }
        },
        thermal: {
            img: "https://via.placeholder.com/400x250?text=Eskisehir+Sicaksu",
            phone: "+90 222 233 05 08",
            tr: {
                hospName: "Tarihi Sıcaksu ve Sakaryabaşı Jeotermal Kaynakları",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#2980b9;">♨️ ŞEHRİN KALBİNDEKİ ŞİFA: SICAKSU</h4>
                    <p>Eskişehir'in suları kükürtlü, radyoaktif ve magnezyumlu yapısıyla "tıbbi tedavi" sınıfındadır.</p>
                    
                    <h4>🧪 Hangi Hastalıklara İyi Gelir?</h4>
                    <ul>
                        <li><strong>Metabolik Rahatlantı:</strong> Suyun içindeki magnezyum, <strong>şeker hastalığı</strong> ve <strong>gut</strong> hastalarında metabolizmayı düzenlemeye yardımcı olur.</li>
                        <li><strong>Romatizmal Tedavi:</strong> Şehir merkezindeki kaplıcalar, <strong>yumuşak doku romatizması</strong> ve kronik bel ağrıları için dürüst bir çözüm sunar.</li>
                        <li><strong>Nörolojik Destek:</strong> Radyoaktif özelliği sayesinde sinir uçları iltihaplanmalarında (nevrit) iyileşmeyi destekler.</li>
                    </ul>
                </div>`
            }
        },
        care: {
            img: "https://via.placeholder.com/400x250?text=Eskisehir+Yasli+Bakimi",
            tr: {
                hospName: "Geriatrik ve Psikososyal Bakım Merkezleri",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#27ae60;">🏙️ YAŞANABİLİR ŞEHİR REHABİLİTASYONU</h4>
                    <p>Eskişehir, düz ayak bir şehir olması ve geniş parklarıyla (Sazova, Kentpark) yaşlılar ve engelliler için Türkiye'nin en dürüst rehabilitasyon alanıdır.</p>
                    
                    <h4>🧠 Ruhsal Bakım</h4>
                    <p>Özellikle <strong>Alzheimer</strong> ve <strong>Demans</strong> hastaları için güvenli sokak yapısı ve sosyal belediyecilik imkanlarıyla psikolojik bakım kalitesi çok yüksektir.</p>
                </div>`
            }
        },
        spa: {
            tr: {
                hospName: "Lüks Termal Wellness & Spa",
                analysis: `<div class="analysis-content"><p>Eskişehir'de SPA kültürü, Odunpazarı bölgesindeki lüks butik otellerde geleneksel hamamın modern mimari ve medikal masajla birleşmesiyle sunulur. <strong>Kese-köpük</strong> ritüeli burada bir sanat halindedir.</p></div>`
            }
        }
    },
    "GAZIANTEP": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Gaziantep+Sehir+Hastanesi",
            phone: "+90 342 606 00 00",
            tr: {
                hospName: "Gaziantep Şehir Hastanesi ve SANKO Üniversitesi Hastanesi",
                analysis: `
                <div class="analysis-content">
                    <p><strong>GAZIANTEP</strong>, sanayi gücünü sağlık teknolojisine aktarmış, devasa yatak kapasitesine sahip bir cerrahi merkezdir.</p>
                    
                    <h4>🔍 Cerrahi Uzmanlıklar</h4>
                    <ul>
                        <li><strong>Saç Ekimi ve Estetik:</strong> Bölgenin en büyük <strong>saç ekim</strong> merkezlerine sahiptir; fiyat/performans açısından uluslararası bir duraktır.</li>
                        <li><strong>Obezite Cerrahisi:</strong> Tüp mide ve <strong>mide baypası</strong> operasyonlarında çok yüksek bir vaka tecrübesi bulunur.</li>
                        <li><strong>Diş Sağlığı:</strong> İmplant ve gülüş tasarımı konusunda teknolojik laboratuvar altyapısı çok gelişmiştir.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Gaziantep cerrahi hız ve kapasitede dünya devidir. Ancak çok karmaşık <strong>pediatrik genetik cerrahi</strong> vakaları için hastalar bazen Ankara'daki spesifik üniversite hastanelerine yönlendirilebilir.</p>
                </div>`
            }
        },
        thermal: {
            img: "https://via.placeholder.com/400x250?text=Gaziantep+Islahiye+Kaplicasi",
            tr: {
                hospName: "Gaziantep Termal Kaynakları",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#2980b9;">♨️ YEREL ŞİFA: İSLAHİYE</h4>
                    <p>Gaziantep'te termal turizm, İslahiye çevresindeki yerel kaynaklarla sınırlıdır.</p>
                    
                    <h4>🧪 Hangi Hastalıklara İyi Gelir?</h4>
                    <ul>
                        <li><strong>Cilt ve Egzama:</strong> Suyun kükürtlü yapısı yerel halk tarafından <strong>cilt kaşıntıları</strong> için tercih edilmektedir.</li>
                        <li><strong>Kas Ağrıları:</strong> Standart romatizmal ağrılar için destekleyici sıcaklığa sahiptir.</li>
                    </ul>

                    <h4>⚠️ Dürüst Bilgilendirme</h4>
                    <p>Gaziantep bir "termal şehir" değildir. Profesyonel medikal termal kür arayanlara komşu il <strong>Kahramanmaraş</strong> veya <strong>Hatay</strong>'daki spesifik tesisler önerilir.</p>
                </div>`
            }
        },
        care: {
            tr: {
                hospName: "Modern Bakım ve Geriatri",
                analysis: `<div class="analysis-content"><p>Gaziantep, yeni kurulan Şehir Hastanesi ile çok güçlü bir <strong>fizik tedavi</strong> kapasitesine ulaşmıştır. <strong>İnme (Felç) rehabilitasyonu</strong> için bölgenin en modern cihaz parkuruna sahip illerinden biridir.</p></div>`
            }
        },
        spa: {
            tr: {
                hospName: "Geleneksel Gaziantep Hamam Kültürü",
                analysis: `<div class="analysis-content"><p>Gaziantep'te SPA yerine <strong>Tarihi Hamam</strong> kültürü hakimdir. Naib Hamamı gibi tarihi mekanlarda yapılan geleneksel kese-sabun masajı, medikal anlamda deri gözeneklerini açmak için en dürüst yöntemdir.</p></div>`
            }
        }
    },
    "GIRESUN": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Giresun+Uni+EAH",
            phone: "+90 454 310 16 00",
            tr: {
                hospName: "Giresun Üniversitesi Eğitim ve Araştırma Hastanesi",
                analysis: `
                <div class="analysis-content">
                    <p><strong>GIRESUN</strong>, özellikle yeni kurulan modern hastane kompleksi ile Doğu Karadeniz'de cerrahi standartları yükseltmiş bir şehirdir.</p>
                    
                    <h4>🔍 Cerrahi Yetkinlikler</h4>
                    <ul>
                        <li><strong>Kardiyoloji:</strong> Anjiyo ve stent uygulamaları ile temel <strong>kalp cerrahisi</strong> operasyonları başarıyla yapılmaktadır.</li>
                        <li><strong>Genel Cerrahi:</strong> Kanser cerrahisi ve kapalı (laparoskopik) ameliyatlarda uzman kadroya sahiptir.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Giresun, temel cerrahi ihtiyaçların tamamını karşılar. Ancak <strong>organ nakli</strong> veya çok spesifik <strong>çocuk kalp cerrahisi</strong> gibi operasyonlar için hastalar genellikle komşu il olan <strong>TRABZON</strong>'daki üniversite hastanelerine yönlendirilir.</p>
                </div>`
            }
        },
        thermal: {
            img: "https://via.placeholder.com/400x250?text=Giresun+Acisu+Kaplicasi",
            tr: {
                hospName: "Giresun Acısu ve İnişdibi Maden Suları",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#2980b9;">💧 DOĞAL SODA ŞİFASI: ACISU</h4>
                    <p>Giresun, "içme kürü" denilince Türkiye'nin en dürüst ve etkili doğal kaynaklarından birine sahiptir.</p>
                    
                    <h4>🧪 Hangi Hastalıklara İyi Gelir?</h4>
                    <ul>
                        <li><strong>Böbrek ve Safra Kesesi:</strong> İnişdibi ve Acısu kaynakları, <strong>böbrek taşlarının</strong> dökülmesine ve safra yollarının temizlenmesine yardımcı olan zengin minerallere sahiptir.</li>
                        <li><strong>Sindirim Sistemi:</strong> Doğal karbondioksitli yapısı <strong>mide asidini</strong> dengeler ve hazımsızlığa iyi gelir.</li>
                        <li><strong>Deri Hastalıkları:</strong> Mineralli su banyoları <strong>alerjik kaşıntıları</strong> yatıştırır.</li>
                    </ul>
                </div>`
            }
        },
        care: {
            tr: {
                hospName: "Doğa ve Yayla Bakımı",
                analysis: `<div class="analysis-content"><p>Giresun, yüksek oksijenli yaylaları (Kümbet, Bektaş) ile <strong>akciğer rehabilitasyonu</strong> ve <strong>KOAH</strong> hastaları için doğal bir iyileşme merkezidir. Profesyonel geriatri merkezlerinden ziyade, temiz hava odaklı bir bakım avantajı sunar.</p></div>`
            }
        },
        spa: {
            tr: {
                hospName: "Yerel Hamam Kültürü",
                analysis: `<div class="analysis-content"><p>SPA hizmetleri butik düzeydedir. Şehir merkezindeki tarihi ve modern hamamlar, Karadeniz'in temiz suyu ve yerel bitki özleriyle harmanlanmış temel masaj hizmetleri sunar.</p></div>`
            }
        }
    },
    "GÜMÜSHANE": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Gumushane+Devlet+Hastanesi",
            phone: "+90 456 213 15 56",
            tr: {
                hospName: "Gümüşhane Devlet Hastanesi",
                analysis: `
                <div class="analysis-content">
                    <p><strong>GUMUSHANE</strong>, modern devlet hastanesi ile temel sağlık ve cerrahi hizmetleri sunan bir altyapıya sahiptir.</p>
                    
                    <h4>🔍 Mevcut Kapasite</h4>
                    <ul>
                        <li><strong>Temel Branşlar:</strong> Genel cerrahi, kadın doğum ve ortopedi alanlarında standart operasyonlar başarıyla yapılmaktadır.</li>
                        <li><strong>Acil Müdahale:</strong> Bölgesel konumu gereği acil tıp ve travma ilk yardım üniteleri aktiftir.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Gümüşhane, ileri düzey <strong>onkolojik cerrahi</strong>, <strong>kalp ameliyatları</strong> veya <strong>organ nakli</strong> gibi spesifik alanlarda bir merkez değildir. Bu tür vakalar genellikle 1 saat mesafedeki <strong>TRABZON</strong>'a sevk edilmektedir.</p>
                </div>`
            }
        },
        thermal: {
            tr: {
                hospName: "Gümüşhane Doğal Kaynak Suları",
                analysis: `
                <div class="analysis-content">
                    <h4>♨️ Bölgesel Durum</h4>
                    <p>Gümüşhane'de gelişmiş, konaklamalı bir medikal termal tesis bulunmamaktadır.</p>
                    
                    <h4>⚠️ Dürüst Bilgilendirme</h4>
                    <p>Bazı yerel içmeler bulunsa da, profesyonel bir termal kür programı için şehir uygun değildir. Termal tedavi arayanlar genellikle komşu illerdeki tesisleri tercih eder.</p>
                </div>`
            }
        },
        care: {
            img: "https://via.placeholder.com/400x250?text=Karaca+Magarasi",
            tr: {
                hospName: "Karaca Mağarası Doğal Speleoterapi",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#27ae60;">🌬️ DOĞAL ASTIM ODASI: KARACA MAĞARASI</h4>
                    <p>Dünyanın en güzel mağaralarından biri olan Karaca Mağarası, sadece görsel bir şölen değil, aynı zamanda doğal bir rehabilitasyon merkezidir.</p>
                    
                    <h4>🧪 Hangi Hastalıklara İyi Gelir?</h4>
                    <ul>
                        <li><strong>Solunum Yolları:</strong> Mağara içindeki sabit sıcaklık (15°C) ve yüksek nem oranı, <strong>astım</strong> ve <strong>kronik bronşit</strong> hastalarının nefes almasını kolaylaştırır.</li>
                        <li><strong>Polen Alerjisi:</strong> Mağara havası dış dünyadan tamamen izoledir ve <strong>alerjen içermez</strong>, bu da ağır alerji vakalarında akciğerlerin dinlenmesini sağlar.</li>
                    </ul>
                </div>`
            }
        },
        spa: {
            tr: {
                hospName: "Yayla ve Doğa Wellness",
                analysis: `<div class="analysis-content"><p>Modern SPA tesisleri kısıtlıdır. Ancak Gümüşhane yaylalarında yapılan yürüyüşler ve doğal yaşam, <strong>mental detoks</strong> ve <strong>anti-stres</strong> odaklı bir wellness deneyimi sunar.</p></div>`
            }
        }
    },
    "HAKKARI": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Hakkari+Devlet+Hastanesi",
            phone: "+90 438 211 60 67",
            tr: {
                hospName: "Hakkari Devlet Hastanesi",
                analysis: `
                <div class="analysis-content">
                    <p><strong>HAKKARI</strong>, coğrafi zorluklara rağmen temel sağlık hizmetlerinde bölge halkı için hayati bir operasyonel güce sahiptir.</p>
                    
                    <h4>🔍 Cerrahi Mevcut Durum</h4>
                    <ul>
                        <li><strong>Acil ve Travma:</strong> Bölgesel konum ve kış şartları nedeniyle acil cerrahi müdahaleler ve <strong>travma cerrahisi</strong> konusunda doktorlar yüksek pratik deneyime sahiptir.</li>
                        <li><strong>Genel Cerrahi:</strong> Temel laparoskopik ameliyatlar ve kadın doğum operasyonları rutin olarak yapılmaktadır.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Hakkari, uluslararası bir <strong>cerrahi destinasyonu</strong> değildir. Onkoloji, açık kalp cerrahisi veya gelişmiş mikro-cerrahi gerektiren vakalar, teknolojik altyapı ve uzman yoğunluğu nedeniyle genellikle <strong>VAN</strong>'daki bölge hastanelerine sevk edilir.</p>
                </div>`
            }
        },
        thermal: {
            tr: {
                hospName: "Doğal Maden ve Kaplıca Kaynakları",
                analysis: `
                <div class="analysis-content">
                    <h4>♨️ Keşfedilmemiş Şifa</h4>
                    <p>Hakkari'de Şemdinli ve Çukurca bölgelerinde yerel halkın kullandığı kükürtlü sıcak su kaynakları bulunmaktadır.</p>
                    
                    <h4>⚠️ Dürüst Bilgilendirme</h4>
                    <p>Bu kaynaklar üzerinde henüz modern, medikal denetimli bir <strong>termal tesis</strong> inşa edilmemiştir. Profesyonel bir termal kür programı arayanlar için şehir şu aşamada uygun bir turizm altyapısına sahip değildir.</p>
                </div>`
            }
        },
        care: {
            img: "https://via.placeholder.com/400x250?text=Hakkari+Yuksek+Rakim",
            tr: {
                hospName: "Yüksek Rakım Kondisyon ve Rehabilitasyon",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#27ae60;">🏔️ DOĞAL ANTRENMAN ÜSSÜ</h4>
                    <p>Hakkari'nin 2000 metreyi aşan rakımı, profesyonel sporcular ve sağlıklı yaşam tutkunları için benzersiz bir <strong>kondisyon artırma</strong> merkezidir.</p>
                    
                    <h4>🌬️ Alyuvar Gelişimi ve Solunum</h4>
                    <p>Yüksek rakımda oksijenin azlığı, vücudun daha fazla alyuvar üretmesini sağlar. Bu durum, <strong>sporcu rehabilitasyonu</strong> ve bazı kan hastalıklarının doğal destek süreci için dürüst bir avantaj sunar. Ancak ağır kalp yetmezliği olanlar için bu rakım risklidir.</p>
                </div>`
            }
        },
        spa: {
            tr: {
                hospName: "Otantik ve Doğal Wellness",
                analysis: `<div class="analysis-content"><p>Modern SPA merkezlerinden ziyade, tertemiz yayla havası ve Zap Suyu kıyısındaki doğal yürüyüş rotaları ile <strong>zihinsel arınma (detoks)</strong> odaklı bir deneyim yaşanabilir.</p></div>`
            }
        }
    },
    "HATAY": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Hatay+Egitim+Arastirma",
            phone: "+90 326 229 44 00",
            tr: {
                hospName: "Hatay Eğitim ve Araştırma Hastanesi (Modern Kampüs)",
                analysis: `
                <div class="analysis-content">
                    <p><strong>HATAY</strong>, yaşadığı büyük deprem sonrası sağlık altyapısını hızla yenileyerek modern çelik konstrüksiyon hastaneleriyle cerrahi kapasitesini geri kazanmıştır.</p>
                    
                    <h4>🔍 Cerrahi Güç Alanları</h4>
                    <ul>
                        <li><strong>Ortopedi ve Travmatoloji:</strong> Şehir, yaşadığı büyük afet sonrası <strong>protez cerrahisi</strong> ve ekstremite yaralanmaları konusunda Türkiye'nin en tecrübeli uzman kadrolarından birine sahip olmuştur.</li>
                        <li><strong>Göz Cerrahisi:</strong> Özel ve kamu hastanelerinde lazer ve katarakt ameliyatları ileri teknoloji ile devam etmektedir.</li>
                        <li><strong>Plastik Cerrahi:</strong> Hem estetik hem de rekonstrüktif (onarım) cerrahi alanında Ortadoğu'dan ciddi bir hasta trafiği çekmektedir.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Hatay sağlıkta hızla toparlanmıştır ancak <strong>yapay kalp nakli</strong> gibi aşırı spesifik ve nadir operasyonlar için hala Adana veya Ankara'daki merkez üniversitelerle koordineli çalışılmaktadır.</p>
                </div>`
            }
        },
        thermal: {
            img: "https://via.placeholder.com/400x250?text=Hatay+Reyhanli+Hamamat",
            phone: "+90 326 433 10 50",
            tr: {
                hospName: "Reyhanlı Hamamat Kaplıcaları ve Kumlu Kaynakları",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#2980b9;">♨️ MİNERAL REKORTMENİ: HAMAMAT</h4>
                    <p>Hatay'daki Hamamat kaplıcası, içindeki mineral çeşitliliği ve yoğunluğu (yaklaşık 30.000 mg/lt) ile Türkiye'nin en dürüst ve zengin sularından biridir.</p>
                    
                    <h4>🧪 Hangi Hastalıklara İyi Gelir?</h4>
                    <ul>
                        <li><strong>Ağır Romatizmal Hastalıklar:</strong> Yüksek mineral yoğunluğu sayesinde <strong>Ankilozan Spondilit</strong> ve kireçlenmelerde ağrıları dramatik şekilde azaltır.</li>
                        <li><strong>Nörolojik Rehabilitasyon:</strong> Felçli hastaların su içi egzersizlerinde mineral emilimi sayesinde sinir iletimini destekler.</li>
                        <li><strong>Kronik Cilt Sorunları:</strong> Egzama ve inatçı <strong>sedef</strong> plakları üzerinde temizleyici etkisi tescillidir.</li>
                    </ul>
                </div>`
            }
        },
        care: {
            tr: {
                hospName: "Fizik Tedavi ve Psikososyal Bakım",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#27ae60;">♿ YENİ NESİL REHABİLİTASYON</h4>
                    <p>Hatay'da yeni kurulan hastaneler, geniş kapsamlı <strong>Fizik Tedavi</strong> ünitelerine sahiptir. Özellikle deprem sonrası gelişen <strong>psikolojik rehabilitasyon</strong> ve travma sonrası bakım programları konusunda şehir, ulusal çapta bir uzmanlık merkezine dönüşmüştür.</p>
                </div>`
            }
        },
        spa: {
            tr: {
                hospName: "Antakya Hamam Kültürü",
                analysis: `<div class="analysis-content"><p>Hatay'da SPA anlayışı tarihi hamamlarla başlar. Dünyaca ünlü <strong>defne sabunu</strong> ve zeytinyağı ile yapılan geleneksel masajlar, cildi besleyen en doğal ve dürüst wellness yöntemidir.</p></div>`
            }
        }
    },
    "ISPARTA": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Isparta+SDU+Tip+Fakultesi",
            phone: "+90 246 211 20 00",
            tr: {
                hospName: "Süleyman Demirel Üniversitesi Tıp Fakültesi ve Şehir Hastanesi",
                analysis: `
                <div class="analysis-content">
                    <p><strong>ISPARTA</strong>, bir üniversite şehri olmanın avantajıyla Batı Akdeniz'in en köklü sağlık merkezlerinden biridir.</p>
                    
                    <h4>🔍 Cerrahi Odak Alanları</h4>
                    <ul>
                        <li><strong>Kalp ve Damar Cerrahisi:</strong> Bypass ve kapak ameliyatlarında akademik düzeyde yüksek başarı oranına sahiptir.</li>
                        <li><strong>Göz Cerrahisi:</strong> Akıllı lens uygulamaları ve <strong>retina cerrahisi</strong> konusunda bölge halkı için güvenilir bir duraktır.</li>
                        <li><strong>Tüp Bebek (IVF):</strong> Üniversite bünyesindeki ünite, bölgenin en eski ve dürüst sonuç veren merkezlerinden biridir.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Isparta cerrahide çok yetkindir. Ancak çok spesifik <strong>çocuk onkolojisi</strong> veya <strong>yapay organ</strong> çalışmaları gibi vakalar genellikle 1.5 saat mesafedeki Antalya'ya yönlendirilir.</p>
                </div>`
            }
        },
        thermal: {
            img: "https://via.placeholder.com/400x250?text=Isparta+Kasnak+Mesesi",
            tr: {
                hospName: "Isparta Kaplıcaları ve Doğal Mineralli Kaynaklar",
                analysis: `
                <div class="analysis-content">
                    <h4>♨️ Bölgesel Termal Potansiyel</h4>
                    <p>Isparta'da yerel düzeyde kükürtlü ve mineralli su kaynakları bulunmakta olup, bu kaynaklar daha çok fiziksel rahatlama amacıyla kullanılır.</p>
                    
                    <h4>🧪 Şifa Alanları</h4>
                    <p>Özellikle <strong>cilt rahatsızlıkları</strong> ve hafif <strong>romatizmal ağrılar</strong> için yerel tesisler tercih edilmektedir. Ancak şehri asıl farklı kılan termal suyun kendisinden ziyade, bu suyun <strong>Gül ve Lavanta</strong> özleriyle birleştirildiği terapi yöntemleridir.</p>
                </div>`
            }
        },
        care: {
            img: "https://via.placeholder.com/400x250?text=Isparta+Gul+Terapi",
            tr: {
                hospName: "Aromaterapi ve Geriatrik Bakım",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#27ae60;">🌸 DÜNYANIN KOZMETİK ŞİFASI</h4>
                    <p>Isparta, dünyanın en kaliteli <strong>Gül Yağı</strong> üretim merkezidir. Bu durum şehri <strong>Aromaterapi</strong> ve tıbbi kozmetik bakımda benzersiz kılar.</p>
                    
                    <h4>🌿 Nörolojik ve Ruhsal Bakım</h4>
                    <p>Gül ve Lavanta özlerinin <strong>anksiyete</strong>, <strong>uyku bozuklukları</strong> ve yaşlılardaki <strong>demans</strong> semptomları üzerindeki sakinleştirici etkisi, Isparta'daki bakım süreçlerinde dürüst bir yardımcı tedavi olarak kullanılır.</p>
                </div>`
            }
        },
        spa: {
            tr: {
                hospName: "Gül Kokulu Wellness",
                analysis: `<div class="analysis-content"><p>Isparta'daki SPA deneyimi, taze gül yaprakları ve lavanta yağları ile yapılan <strong>detoks masajları</strong> üzerine kuruludur. Cilt yenileme ve anti-aging odaklı Wellness için Türkiye'nin en dürüst adresidir.</p></div>`
            }
        }
    },
    "MERSIN": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Mersin+Sehir+Hastanesi",
            phone: "+90 324 225 10 00",
            tr: {
                hospName: "Mersin Şehir Hastanesi ve Mersin Üniversitesi Tıp Fakültesi",
                analysis: `
                <div class="analysis-content">
                    <p><strong>MERSIN</strong>, Türkiye'nin ilk ve en büyük Şehir Hastanelerinden birine sahip olup, Akdeniz havzasının dijital sağlık ve cerrahi üssüdür.</p>
                    
                    <h4>🔍 Cerrahi Güç Alanları</h4>
                    <ul>
                        <li><strong>Onkolojik Cerrahi:</strong> Gelişmiş <strong>Radyoterapi</strong> (Cyberknife, Tomoterapi) ve kapalı kanser cerrahisinde uluslararası standartlardadır.</li>
                        <li><strong>Obezite ve Metabolik Cerrahi:</strong> Şehirde <strong>mide küçültme</strong> ve diyabet cerrahisi yapan çok deneyimli ekipler bulunmaktadır.</li>
                        <li><strong>Üroloji:</strong> Taş kırma (ESWL) ve prostat cerrahisinde en son lazer teknolojileri kullanılmaktadır.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Mersin cerrahide devasa bir kapasiteye sahiptir. Ancak <strong>karaciğer nakli</strong> gibi bazı çok spesifik transplantasyon vakaları genellikle komşu şehir Adana'daki merkezlere koordine edilmektedir.</p>
                </div>`
            }
        },
        thermal: {
            img: "https://via.placeholder.com/400x250?text=Mersin+Icmeler",
            tr: {
                hospName: "Çamlıyayla ve Mut İçmeleri",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#2980b9;">💧 DOĞAL SODA VE İÇMELER</h4>
                    <p>Mersin'de termal sudan ziyade, soğuk ve mineralli "içme" kaynakları ön plandadır.</p>
                    
                    <h4>🧪 Hangi Hastalıklara İyi Gelir?</h4>
                    <ul>
                        <li><strong>Sindirim ve Böbrek:</strong> Mut ve Çamlıyayla'daki içmeler, <strong>hazımsızlık</strong> ve <strong>idrar yolları</strong> kumlarının dökülmesinde yardımcıdır.</li>
                        <li><strong>Cilt Bakımı:</strong> Bölgedeki doğal kaynak suları yüksek kükürt oranıyla <strong>akne</strong> tedavisine destek verir.</li>
                    </ul>
                </div>`
            }
        },
        care: {
            tr: {
                hospName: "Klimaterapi ve Geriatri",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#27ae60;">🌴 AKDENİZ İKLİMİYLE İYİLEŞME</h4>
                    <p>Mersin, kış aylarının çok yumuşak geçmesi nedeniyle <strong>yaşlı bakımı</strong> ve <strong>felç rehabilitasyonu</strong> için ideal bir iklime sahiptir.</p>
                    
                    <h4>☀️ Güneş ve Kemik Sağlığı</h4>
                    <p>Yılın 300 günü güneş alan şehir, <strong>osteoporoz (kemik erimesi)</strong> hastaları ve güneş ışığına ihtiyaç duyan kronik hastalar için dürüst bir D vitamini deposudur.</p>
                </div>`
            }
        },
        spa: {
            tr: {
                hospName: "Deniz ve Wellness",
                analysis: `<div class="analysis-content"><p>Mersin'de SPA kültürü, deniz kıyısındaki modern otellerde <strong>Thalassoterapi</strong> (deniz suyu terapisi) ve Akdeniz bitkileriyle yapılan aromatik masajlarla sunulur.</p></div>`
            }
        }
    },
    "ISTANBUL": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Istanbul+Global+Surgery+Hub",
            phone: "+90 212 453 04 53",
            tr: {
                hospName: "İstanbul Tıp Fakülteleri ve Uluslararası Akredite Merkezler",
                analysis: `
                <div class="analysis-content">
                    <h3 style="color:#e67e22;">🌟 DÜNYA SAĞLIK TURİZMİNİN BAŞKENTİ</h3>
                    <p><strong>ISTANBUL</strong>, dünyada JCI akreditasyonuna sahip en fazla hastaneyi barındıran, tıbbın "Şampiyonlar Ligi" finalidir.</p>
                    
                    <h4>💎 Öne Çıkan Uzmanlık Alanları</h4>
                    <ul>
                        <li><strong>💇‍♂️ Saç Ekimi:</strong> Dünyanın 1 numaralı merkezidir. FUE, DHI ve Safir tekniklerinde en yüksek greft sayısı ve doğal görünüm garantisi burada dürüstçe sunulur.</li>
                        <li><strong>🦷 Diş Estetiği (Hollywood Smile):</strong> Zirkonyum kaplama, implant ve dijital gülüş tasarımında dünyanın en hızlı ve estetik sonuç veren laboratuvarlarına sahiptir.</li>
                        <li><strong>👁️ Göz Cerrahisi:</strong> Akıllı lens ve No-Touch lazerde dünyanın en büyük vaka havuzuna sahip hastaneleri buradadır.</li>
                        <li><strong>🦾 Robotik Cerrahi (Da Vinci):</strong> Kanser ameliyatlarında robotik sistemleri Avrupa'da en aktif kullanan şehirdir.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>İstanbul'da çözüm bulamayacağınız tıbbi vaka yok gibidir. Ancak <strong>sağlık turizmi aracıları</strong> konusunda dürüst bir araştırma yapılması şarttır. Ameliyat sonrası huzurlu bir iyileşme süreci için şehrin gürültüsünden uzak, butik butik klinikler tercih edilebilir.</p>
                </div>`
            }
        },
        thermal: {
            img: "https://via.placeholder.com/400x250?text=Tuzla+Icmeleri",
            phone: "+90 216 395 53 88",
            tr: {
                hospName: "Tuzla İçmeleri ve Yalova Termal Hattı",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#2980b9;">♨️ METROPOLÜN GİZLİ ŞİFASI</h4>
                    <p>İstanbul'un Tuzla bölgesindeki doğal mineralli sular, klorürlü ve sodyumlu yapısıyla dürüst bir tedavi desteği sunar.</p>
                    
                    <h4>🧪 Şifa Alanları</h4>
                    <ul>
                        <li><strong>Sindirim Detoksu:</strong> Tuzla suları, <strong>safra kesesi</strong> ve bağırsak temizliğinde Türkiye'nin tescilli doğal ilacıdır.</li>
                        <li><strong>Solunum:</strong> Denizle birleşen kaplıca havası, kronik <strong>farenjit</strong> ve <strong>sinüzit</strong> için doğal bir spreydir.</li>
                    </ul>
                </div>`
            }
        },
        care: {
            tr: {
                hospName: "VIP Geriatri ve Robotik Rehabilitasyon",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#27ae60;">🏥 LÜKS BAKIMIN ZİRVESİ</h4>
                    <p>Özellikle Avrupa yakasındaki lüks bakım köyleri; <strong>Alzheimer</strong>, <strong>Parkinson</strong> ve ağır felç rehabilitasyonunda <strong>yürüme robotları</strong> ile dünya çapında hizmet verir.</p>
                </div>`
            }
        },
        spa: {
            tr: {
                hospName: "Saray Usulü Hamam & Medikal Spa",
                analysis: `<div class="analysis-content"><p>Boğaz kıyısındaki tarihi yalı otellerde, gerçek altın ve ipek kese ritüelleriyle birleşen, medikal denetimli <strong>Anti-Aging</strong> kürleri sunulur.</p></div>`
            }
        }
    },
    "IZMIR": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Izmir+Advanced+Medicine",
            phone: "+90 232 412 22 22",
            tr: {
                hospName: "Ege Üniversitesi, Dokuz Eylül ve İleri Teknoloji Klinikleri",
                analysis: `
                <div class="analysis-content">
                    <h3 style="color:#e67e22;">🌟 NİTELİKLİ TIP VE BİYOTEKNOLOJİ ÜSSÜ</h3>
                    <p><strong>IZMIR</strong>, tıp etiğine en sadık, ticari kaygıdan ziyade hasta sağlığını odağa alan profesörlerin şehridir.</p>
                    
                    <h4>💎 Öne Çıkan Uzmanlık Alanları</h4>
                    <ul>
                        <li><strong>🦴 Ortopedi ve Skolyoz:</strong> Omurga cerrahisi ve mikro-el cerrahisinde dünyaca ünlü cerrahlara sahiptir.</li>
                        <li><strong>♋ Onkoloji (Kanser Tedavisi):</strong> Moleküler onkoloji ve immunoterapi gibi <strong>kişiye özel</strong> kanser tedavilerinde Türkiye'nin öncüsüdür.</li>
                        <li><strong>🦷 Diş ve Çene Cerrahisi:</strong> Özellikle <strong>all-on-4</strong> implant tekniklerinde dürüst ve kalıcı çözümler sunar.</li>
                        <li><strong>👶 Tüp Bebek (IVF):</strong> Ege Üniversitesi bünyesindeki birimler, zor vakalarda en dürüst başarı oranlarını verir.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>İzmir'de sağlık hizmeti "insan odaklıdır". İstanbul kadar hızlı sirkülasyon yoktur, bu da doktora soru sormak ve detaylı bilgi almak isteyen hastalar için büyük bir dürüstlük avantajıdır.</p>
                </div>`
            }
        },
        thermal: {
            img: "https://via.placeholder.com/400x250?text=Izmir+Balcova+Termal",
            phone: "+90 232 259 01 02",
            tr: {
                hospName: "Balçova (Agamemnon) ve Çeşme Termal",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#2980b9;">♨️ AVRUPA ONAYLI MEDİKAL TERMAL</h4>
                    <p>Balçova, Avrupa Kaplıcalar Birliği (ESPA) üyesidir ve buradaki tedavi protokolleri tıp doktorları tarafından denetlenir.</p>
                    
                    <h4>🧪 Şifa Alanları</h4>
                    <ul>
                        <li><strong>Fizik Tedavi:</strong> <strong>Fıtık</strong> ve eklem kısıtlılıklarında su içi robotik rehabilitasyon ile %90 üzerinde başarı sağlanır.</li>
                        <li><strong>Cilt Şifası:</strong> Çeşme'deki sıcak deniz suyu (Thalasso) ve termal birleşimi, <strong>sedef</strong> hastalığını dürüstçe gerileten nadir yöntemlerdendir.</li>
                    </ul>
                </div>`
            }
        },
        care: {
            tr: {
                hospName: "Urla Yaşam ve Akciğer Rehabilitasyonu",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#27ae60;">🌊 EGE NEFESİ</h4>
                    <p>Urla ve Karaburun'un iyot yüklü havası, <strong>kalp ameliyatı sonrası</strong> ve <strong>akciğer kanseri</strong> sonrası toparlanma süreci için Türkiye'nin en dürüst "Doğal Bakım" merkezidir.</p>
                </div>`
            }
        },
        spa: {
            tr: {
                hospName: "Kozmetik Wellness & Thalasso",
                analysis: `<div class="analysis-content"><p>Ege'nin saf zeytinyağı ve Çeşme'nin şifalı çamuru ile yapılan <strong>detoks</strong> seansları, modern SPA dünyasının en doğal halidir.</p></div>`
            }
        }
    },
    "KARS": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Kars+Kafkas+Uni",
            phone: "+90 474 225 11 90",
            tr: {
                hospName: "Kafkas Üniversitesi Tıp Fakültesi Hastanesi",
                analysis: `
                <div class="analysis-content">
                    <p><strong>KARS</strong>, Doğu Anadolu'nun en yüksek rakımlı şehirlerinden biri olarak temel cerrahi ve travma hizmetlerinde yetkindir.</p>
                    
                    <h4>🔍 Cerrahi Mevcut Durum</h4>
                    <ul>
                        <li><strong>Ortopedi:</strong> Kış şartları nedeniyle kemik kırıkları ve eklem cerrahisinde ciddi bir operasyonel deneyim mevcuttur.</li>
                        <li><strong>Genel Cerrahi:</strong> Safra kesesi ve fıtık gibi laparoskopik işlemler rutin olarak yapılır.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Kars'ta <strong>saç ekimi</strong>, <strong>diş estetiği</strong> veya <strong>organ nakli</strong> gibi spesifik alanlarda uzmanlaşmış klinikler bulunmamaktadır. Bu tarz talepler ve ileri onkolojik vakalar için adres genellikle Erzurum'dur.</p>
                </div>`
            }
        },
        thermal: {
            tr: {
                hospName: "Kars Doğal Maden Suları",
                analysis: `<div class="analysis-content"><p>Kars bir termal turizm merkezi değildir. Ancak Kağızman bölgesindeki yerel kaynaklar, yüksek mineral içeriğiyle yerel halk tarafından mide rahatlatıcı olarak kullanılır.</p></div>`
            }
        },
        care: {
            img: "https://via.placeholder.com/400x250?text=Kars+Sarikamis+Hava",
            tr: {
                hospName: "Sarıkamış Yüksek Rakım ve Kristal Kar Bakımı",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#27ae60;">🛡️ DOĞAL BAĞIŞIKLIK (IMMUNOTERAPI)</h4>
                    <p>Kars, özellikle <strong>Sarıkamış</strong> bölgesi, sıfır nem oranı ve kristal kar yapısı ile bambaşka bir şifa sunar.</p>
                    
                    <h4>🧪 Şifa Alanları</h4>
                    <ul>
                        <li><strong>Bağışıklık Güçlendirme:</strong> Yüksek rakım ve temiz hava, vücudun savunma mekanizmalarını aktive eder.</li>
                        <li><strong>Psikolojik Rehabilitasyon:</strong> Şehrin sessizliği ve beyaz örtüsü, <strong>tükenmişlik sendromu</strong> ve ağır stres sonrası zihinsel dinlenme için en dürüst doğal reçetedir.</li>
                    </ul>
                </div>`
            }
        },
        spa: {
            tr: {
                hospName: "Kış Wellness",
                analysis: `<div class="analysis-content"><p>Sarıkamış'taki kayak otellerinde kış sporları sonrası sunulan sauna ve masaj hizmetleri mevcuttur. Burada wellness, soğuk hava ile sıcak suyun kontrast etkisinden faydalanılarak yapılır.</p></div>`
            }
        }
    },
    "KASTAMONU": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Kastamonu+EAH",
            phone: "+90 366 214 10 53",
            tr: {
                hospName: "Kastamonu Eğitim ve Araştırma Hastanesi",
                analysis: `
                <div class="analysis-content">
                    <p><strong>KASTAMONU</strong>, son yıllarda yenilenen hastane altyapısı ile cerrahi branşlarda Batı Karadeniz'in güvenilir duraklarından biridir.</p>
                    
                    <h4>🔍 Cerrahi Yetkinlikler</h4>
                    <ul>
                        <li><strong>Kardiyoloji:</strong> Anjiyo ve temel kalp müdahaleleri başarıyla uygulanmaktadır.</li>
                        <li><strong>Üroloji:</strong> Kapalı böbrek taşı ameliyatları konusunda teknolojik donanıma sahiptir.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Kastamonu'da <strong>estetik cerrahi</strong> ve <strong>kompleks beyin ameliyatları</strong> kapasitesi sınırlıdır. Bu tür ağır cerrahi vakalar genellikle Ankara'ya sevk edilir.</p>
                </div>`
            }
        },
        thermal: {
            tr: {
                hospName: "Kastamonu Jeotermal Kaynakları",
                analysis: `<div class="analysis-content"><p>Şehirde profesyonel bir termal tesisleşme bulunmamaktadır. Şifa kaynağı olarak su değil, orman havası (Aerosol) ön plandadır.</p></div>`
            }
        },
        care: {
            img: "https://via.placeholder.com/400x250?text=Kastamonu+Kure+Daglari",
            tr: {
                hospName: "Küre Dağları Akciğer Rehabilitasyon Alanı",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#27ae60;">🌲 DÜNYANIN AKCİĞERİ: KÜRE DAĞLARI</h4>
                    <p>Kastamonu, Avrupa'nın biyolojik çeşitlilik açısından en değerli ormanlarına sahiptir.</p>
                    
                    <h4>🌬️ Solunum Rehabilitasyonu</h4>
                    <ul>
                        <li><strong>KOAH ve Astım:</strong> Ormandaki çam ve köknar ağaçlarının salgıladığı fitonsitler, doğal bir antibiyotik etkisi yaratarak <strong>akciğerleri temizler</strong>.</li>
                        <li><strong>Post-Op Bakım:</strong> Ağır ameliyatlardan çıkan hastaların oksijen desteği alarak hızlı iyileşmesi için en dürüst doğa adresidir.</li>
                    </ul>
                </div>`
            }
        },
        spa: {
            tr: {
                hospName: "Doğa Wellness",
                analysis: `<div class="analysis-content"><p>Kastamonu'da SPA kültürü yerini "orman banyosu"na (Shinrin-yoku) bırakır. Ağaçlar arasında yapılan yürüyüşler, tansiyonu düşürür ve stres hormonlarını dürüstçe azaltır.</p></div>`
            }
        }
    },
    "KAYSERI": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Kayseri+Erciyes+Uni",
            phone: "+90 352 207 66 66",
            tr: {
                hospName: "Erciyes Üniversitesi Tıp Fakültesi ve Kayseri Şehir Hastanesi",
                analysis: `
                <div class="analysis-content">
                    <h3 style="color:#e67e22;">🌟 İÇ ANADOLU'NUN SAĞLIK ÜSSÜ</h3>
                    <p><strong>KAYSERI</strong>, devasa hastane kompleksleri ve köklü tıp fakültesi ile bölgenin en gelişmiş cerrahi kapasitesine sahip şehridir.</p>
                    
                    <h4>💎 Öne Çıkan Uzmanlık Alanları</h4>
                    <ul>
                        <li><strong>🩸 İlik ve Kök Hücre Nakli:</strong> Erciyes Üniversitesi bünyesindeki merkez, Türkiye'nin ve Avrupa'nın en büyük <strong>kemik iliği nakli</strong> ünitelerinden biridir.</li>
                        <li><strong>🦷 Diş Sağlığı ve Estetiği:</strong> Kayseri, bölgedeki en gelişmiş diş hastanelerine sahiptir. İmplant ve protez cerrahisinde uluslararası hasta kabul eder.</li>
                        <li><strong>💆‍♂️ Saç Ekimi ve Estetik:</strong> Şehirde son teknoloji ile hizmet veren çok sayıda özel klinik bulunmakta, İstanbul'a dürüst bir alternatif sunmaktadır.</li>
                        <li><strong>🧒 Çocuk Kalp Cerrahisi:</strong> Doğu ve İç Anadolu'nun en zorlu pediatrik kalp ameliyatları burada başarıyla gerçekleştirilir.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Kayseri cerrahide kusursuz bir altyapıya sahiptir. Ancak şehirdeki aşırı hasta sirkülasyonu nedeniyle devlet ve üniversite hastanelerinde randevu süreçleri uzayabilir; bu nedenle planlı cerrahilerde önceden aksiyon alınması kritiktir.</p>
                </div>`
            }
        },
        thermal: {
            img: "https://via.placeholder.com/400x250?text=Kayseri+Bayramhaci+Termal",
            phone: "+90 352 320 00 00",
            tr: {
                hospName: "Bayramhacı ve Tekgöz Kaplıcaları",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#2980b9;">♨️ MİNERALLİ VOLKANİK ŞİFA</h4>
                    <p>Erciyes Dağı'nın volkanik yapısıyla beslenen Kayseri termal suları, sülfat ve klorür açısından oldukça zengindir.</p>
                    
                    <h4>🧪 Hangi Hastalıklara İyi Gelir?</h4>
                    <ul>
                        <li><strong>Eklem Romatizması:</strong> Suyun sıcaklığı ve kimyasal bileşimi <strong>kireçlenme</strong> ve kronik iltihabi eklem ağrılarında dürüst bir iyileşme sağlar.</li>
                        <li><strong>Cilt Problemleri:</strong> Bayramhacı kaplıcalarının suyu, <strong>akne</strong> ve <strong>kronik egzama</strong> üzerinde tedavi edici etkiye sahiptir.</li>
                    </ul>
                </div>`
            }
        },
        care: {
            tr: {
                hospName: "İleri Fizik Tedavi ve Rehabilitasyon",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#27ae60;">🦾 ROBOTİK REHABİLİTASYON</h4>
                    <p>Kayseri Şehir Hastanesi bünyesindeki fizik tedavi ünitesi, <strong>yürüme robotları</strong> ve uzay terapi cihazları ile Türkiye'nin en modern bakım merkezlerinden biridir. Felçli hastaların ayağa kalkma sürecinde dürüstçe en yüksek teknolojiyi sunar.</p>
                </div>`
            }
        },
        spa: {
            tr: {
                hospName: "Kayseri Geleneksel Hamam Kültürü",
                analysis: `<div class="analysis-content"><p>Modern otellerdeki SPA merkezlerinin yanı sıra, tarihi Selçuklu ve Osmanlı hamamları ile <strong>medikal kese-köpük</strong> terapileri şehrin vazgeçilmezidir.</p></div>`
            }
        }
    },
    "KIRKLARELI": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Kirklareli+EAH",
            phone: "+90 288 214 43 42",
            tr: {
                hospName: "Kırklareli Eğitim ve Araştırma Hastanesi",
                analysis: `
                <div class="analysis-content">
                    <p><strong>KIRKLARELI</strong>, modern tıp teknolojisine entegre olmuş, butik ve sakin bir cerrahi altyapı sunar.</p>
                    
                    <h4>🔍 Cerrahi Yetkinlikler</h4>
                    <ul>
                        <li><strong>Genel Cerrahi:</strong> Laparoskopik yöntemlerle yapılan <strong>safra kesesi</strong> ve <strong>fıtık</strong> ameliyatlarında başarılı sonuçlar alınmaktadır.</li>
                        <li><strong>Göz Hastalıkları:</strong> Standart katarakt ve temel göz cerrahisi operasyonları donanımlı ünitelerde yapılmaktadır.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Kırklareli; <strong>saç ekimi</strong>, <strong>diş estetiği</strong> veya çok ileri <strong>kardiyovasküler cerrahi</strong> için bir merkez değildir. Çok ağır vakalar genellikle 45 dakika mesafedeki Edirne Trakya Üniversitesi'ne veya İstanbul'a sevk edilir.</p>
                </div>`
            }
        },
        thermal: {
            tr: {
                hospName: "Kırklareli Yerel Termal Kaynaklar",
                analysis: `<div class="analysis-content"><p>Şehirde kapsamlı ve medikal denetimli bir termal kür tesisi bulunmamaktadır. Şifa arayışı daha çok doğa ve hava kalitesi üzerinedir.</p></div>`
            }
        },
        care: {
            img: "https://via.placeholder.com/400x250?text=Kirklareli+Longoz+Ormanlari",
            tr: {
                hospName: "Longoz Ormanları ve Doğa Rehabilitasyonu",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#27ae60;">🌳 DOĞAL NEFES VE ZİHİNSEL ARINMA</h4>
                    <p>Dünyanın nadir ekosistemlerinden olan <strong>İğneada Longoz Ormanları</strong>, Kırklareli'nin en büyük şifa kaynağıdır.</p>
                    
                    <h4>🌬️ Solunum ve Mental Bakım</h4>
                    <ul>
                        <li><strong>Anksiyete ve Stres:</strong> Orman ve deniz havasının birleştiği bu ortam, <strong>depresyon</strong> ve modern çağ hastalıklarının iyileşme sürecinde dürüst bir yardımcıdır.</li>
                        <li><strong>Detoks:</strong> Endüstriden uzak, yüksek oksijenli yapısı vücudun toksin atma sürecini hızlandırır.</li>
                    </ul>
                </div>`
            }
        },
        spa: {
            tr: {
                hospName: "Doğa Wellness",
                analysis: `<div class="analysis-content"><p>İğneada ve çevresindeki butik otellerde, yerel aromatik bitkilerle yapılan masajlar ve doğa ile iç içe wellness seansları popülerdir.</p></div>`
            }
        }
    },
    "KIRSEHIR": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Kirsehir+Egitim+Arastirma",
            phone: "+90 386 213 45 15",
            tr: {
                hospName: "Kırşehir Eğitim ve Araştırma Hastanesi",
                analysis: `
                <div class="analysis-content">
                    <p><strong>KIRSEHIR</strong>, İç Anadolu'nun ortasında butik ama modern bir cerrahi altyapıya sahiptir.</p>
                    
                    <h4>🔍 Cerrahi Kapasite</h4>
                    <ul>
                        <li><strong>Ortopedi:</strong> Termal kaynaklarla entegre çalışan ortopedi birimi, eklem ve kemik ameliyatlarında başarılıdır.</li>
                        <li><strong>Genel Cerrahi:</strong> Temel laparoskopik işlemler ve safra kesesi operasyonları rutin olarak yapılır.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Kırşehir; <strong>saç ekimi</strong> veya ileri <strong>organ nakli</strong> gibi çok spesifik alanlarda uzmanlaşmış bir merkez değildir. Bu tarz kompleks vakalar genellikle 2 saat mesafedeki Ankara'ya sevk edilir.</p>
                </div>`
            }
        },
        thermal: {
            img: "https://via.placeholder.com/400x250?text=Kirsehir+Termal+Sular",
            phone: "+90 386 213 10 10",
            tr: {
                hospName: "Terme, Karakurt ve Bulamaçlı Kaplıcaları",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#2980b9;">♨️ TIBBİ TESCİLLİ TERMAL ŞEHİR</h4>
                    <p>Kırşehir'in termal suları, yüksek mineralizasyonu ve florür içeriğiyle Türkiye'nin en dürüst "Şifa" kaynaklarındandır.</p>
                    
                    <h4>🧪 Hangi Hastalıklara İyi Gelir?</h4>
                    <ul>
                        <li><strong>Kronik Romatizma:</strong> Suyun kimyasal yapısı <strong>Ankilozan Spondilit</strong> ve kireçlenme ağrılarında bilimsel olarak kanıtlanmış iyileşme sağlar.</li>
                        <li><strong>Felç Sonrası Rehabilitasyon:</strong> Kas spazmlarını çözücü etkisiyle nörolojik hastaların su içi terapisinde çok etkilidir.</li>
                        <li><strong>Böbrek ve İdrar Yolları:</strong> İçme kürü olarak kullanıldığında taş dökme sürecini dürüstçe destekler.</li>
                    </ul>
                </div>`
            }
        },
        care: {
            img: "https://via.placeholder.com/400x250?text=Kirsehir+Fizik+Tedavi",
            tr: {
                hospName: "Jandarma ve Devlet Fizik Tedavi Merkezleri",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#27ae60;">♿ FİZİK TEDAVİ MERKEZİ</h4>
                    <p>Kırşehir, sadece termal suyla değil, bu suyu tıp doktoru gözetiminde sunan gelişmiş <strong>Fizik Tedavi ve Rehabilitasyon</strong> hastaneleriyle ünlüdür. Yaşlı bakımı ve ameliyat sonrası fiziksel toparlanma için İç Anadolu'nun en dürüst adresidir.</p>
                </div>`
            }
        },
        spa: {
            tr: {
                hospName: "Medikal Termal Wellness",
                analysis: `<div class="analysis-content"><p>Buradaki SPA kültürü eğlence değil, sağlık odaklıdır. Termal çamur (Peloid) maskeleri ve mineral banyoları en dürüst haliyle uygulanır.</p></div>`
            }
        }
    },
    "KOCAELI": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Kocaeli+Sehir+Hastanesi",
            phone: "+90 262 225 10 00",
            tr: {
                hospName: "Kocaeli Şehir Hastanesi ve Kocaeli Üniversitesi Tıp Fakültesi",
                analysis: `
                <div class="analysis-content">
                    <h3 style="color:#e67e22;">🌟 SANAYİ VE TEKNOLOJİNİN SAĞLIK ÜSSÜ</h3>
                    <p><strong>KOCAELI</strong>, İstanbul'un yükünü hafifleten, ileri teknoloji ve akademik birikimiyle "yıldızlı" bir cerrahi destinasyondur.</p>
                    
                    <h4>💎 Öne Çıkan Uzmanlık Alanları</h4>
                    <ul>
                        <li><strong>🦴 Ortopedi ve El Cerrahisi:</strong> Sanayi şehri olmasının getirdiği vaka tecrübesiyle, <strong>mikro cerrahi</strong> ve el-kol cerrahisinde Türkiye'nin en iyilerinden biridir.</li>
                        <li><strong>🧠 Nöroşirürji (Beyin Cerrahisi):</strong> Beyin tümörü ve omurga cerrahisinde dünyaca ünlü akademik kadrolara sahiptir.</li>
                        <li><strong>🦷 Diş Sağlığı ve Estetiği:</strong> Bölgenin en modern diş hastaneleri buradadır; implant ve estetik diş hekimliğinde İstanbul kalitesinde ve daha dürüst fiyatlarla hizmet sunar.</li>
                        <li><strong>💇‍♂️ Saç Ekimi:</strong> İstanbul'a alternatif, butik ve uzman doktor kontrollü saç ekim merkezleri yaygındır.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Kocaeli cerrahi olarak eksiksizdir. Tek handikapı, sanayi kenti olması sebebiyle şehir merkezindeki hava kalitesinin kronik akciğer hastaları için İstanbul'dan çok farklı olmamasıdır.</p>
                </div>`
            }
        },
        thermal: {
            img: "https://via.placeholder.com/400x250?text=Kocaeli+Yuvacik+Kaplica",
            tr: {
                hospName: "Başiskele Yeniköy ve Gölcük Yazlık Ilıcaları",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#2980b9;">♨️ TARİHİ ROMA ŞİFASI</h4>
                    <p>Kocaeli'ndeki sülfatlı ve klorürlü sular, Roma döneminden beri "gençlik suyu" olarak bilinir.</p>
                    
                    <h4>🧪 Şifa Alanları</h4>
                    <p>Özellikle <strong>sedef, egzama</strong> ve sivilce gibi cilt sorunlarında kükürtlü yapısı dürüst sonuçlar verir. Romatizmal hastalıklarda ağrı eşiğini yükseltir.</p>
                </div>`
            }
        },
        care: {
            tr: {
                hospName: "Kartepe Klimaterapi ve Rehabilitasyon",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#27ae60;">🏔️ DAĞ HAVASIYLA REHABİLİTASYON</h4>
                    <p>Kocaeli'nin Kartepe bölgesi, yüksek oksijen oranıyla <strong>kalp ve damar ameliyatları sonrası</strong> hastaların akciğerlerini dinlendirmesi için en dürüst noktadır.</p>
                </div>`
            }
        },
        spa: {
            tr: {
                hospName: "Modern Endüstriyel Wellness",
                analysis: `<div class="analysis-content"><p>Şehirdeki lüks iş otelleri, bölgenin iş stresini atmak için tasarlanmış en üst düzey SPA ve masaj teknolojilerine sahiptir.</p></div>`
            }
        }
    },
    "KONYA": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Konya+Selcuk+Uni+Tip",
            phone: "+90 332 224 40 00",
            tr: {
                hospName: "Selçuk Üniversitesi Tıp Fakültesi ve Konya Şehir Hastanesi",
                analysis: `
                <div class="analysis-content">
                    <h3 style="color:#e67e22;">🌟 ANADOLU'NUN CERRAHİ VE AKADEMİK DEVİ</h3>
                    <p><strong>KONYA</strong>, sadece bölgenin değil, Ortadoğu'nun en önemli cerrahi destinasyonlarından biri haline gelmiştir.</p>
                    
                    <h4>💎 Öne Çıkan Uzmanlık Alanları</h4>
                    <ul>
                        <li><strong>🧬 Organ Nakli:</strong> Karaciğer ve böbrek naklinde Türkiye'nin en yüksek vaka tecrübesine sahip akademik kadrolarından birine sahiptir.</li>
                        <li><strong>🦾 Robotik Cerrahi:</strong> Üroloji ve Genel Cerrahide <strong>Da Vinci</strong> robotik sistemlerini en dürüst ve etkin kullanan merkezlerdendir.</li>
                        <li><strong>🦷 Diş Sağlığı Üssü:</strong> Şehirde devasa bir Diş Hekimliği Fakültesi ve çok sayıda modern özel hastane bulunur; <strong>implant</strong> ve çene cerrahisinde bir markadır.</li>
                        <li><strong>💇‍♂️ Saç Ekimi ve Estetik:</strong> Konya, son yıllarda İstanbul'a gitmek istemeyen hastalar için yüksek teknolojili ve dürüst fiyatlı bir estetik merkezi olmuştur.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Konya cerrahide kusursuzdur. Ancak şehrin düz ve bozkır yapısı, deniz havası arayan hastalar için ameliyat sonrası psikolojik iyileşme sürecinde monoton gelebilir. Tıbbi açıdan ise hiçbir eksiği yoktur.</p>
                </div>`
            }
        },
        thermal: {
            img: "https://via.placeholder.com/400.x250?text=Konya+Ilgın+Termal",
            phone: "+90 332 881 60 40",
            tr: {
                hospName: "Ilgın ve İsmil Kaplıcaları",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#2980b9;">♨️ GÖZ VE CİLT ŞİFASI: ILGIN</h4>
                    <p>Ilgın kaplıcaları, Selçuklu sultanlarının "Şifa Yurdu" olarak kullandığı, radyoaktif ve mineralli sulara sahiptir.</p>
                    
                    <h4>🧪 Şifa Alanları</h4>
                    <ul>
                        <li><strong>Göz Hastalıkları:</strong> Suyun özel mineral yapısı, antik çağlardan beri bazı <strong>göz iltihapları</strong> için destekleyici banyo kürü olarak kullanılır.</li>
                        <li><strong>Romatizmal Ağrılar:</strong> Yüksek sıcaklığıyla kronik bel ve diz ağrılarında dürüst bir gevşeme sağlar.</li>
                    </ul>
                </div>`
            }
        },
        care: {
            tr: {
                hospName: "Gelişmiş Fizik Tedavi ve Manevi Bakım",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#27ae60;">🧘 HUZURLU REHABİLİTASYON</h4>
                    <p>Konya, Mevlana şehri olmanın getirdiği huzur iklimiyle, <strong>psikolojik rehabilitasyon</strong> ve yaşlı bakımı için dürüst bir manevi atmosfer sunar. Şehir Hastanesi'ndeki fizik tedavi üniteleri en üst seviye teknoloji ile donatılmıştır.</p>
                </div>`
            }
        },
        spa: {
            tr: {
                hospName: "Modern & Geleneksel Wellness",
                analysis: `<div class="analysis-content"><p>Konya'daki beş yıldızlı oteller, iş dünyası ve sağlık turistleri için tasarlanmış geniş SPA alanlarına ve geleneksel Selçuklu hamam kültürüne sahiptir.</p></div>`
            }
        }
    },
    "KUTAHYA": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Kutahya+Saglik+Bilimleri+Uni",
            phone: "+90 274 231 66 60",
            tr: {
                hospName: "Kütahya Sağlık Bilimleri Üniversitesi Evliya Çelebi E.A.H.",
                analysis: `
                <div class="analysis-content">
                    <p><strong>KUTAHYA</strong>, özellikle fizik tedavi ve rehabilitasyon odaklı cerrahi süreçlerde uzmanlaşmış bir şehirdir.</p>
                    
                    <h4>🔍 Cerrahi Yetkinlikler</h4>
                    <ul>
                        <li><strong>Ortopedi:</strong> Termal tedavi ile desteklenen ortopedik cerrahilerde (eklem protezleri vb.) yüksek başarı oranına sahiptir.</li>
                        <li><strong>Genel Cerrahi:</strong> Temel ve orta ölçekli tüm cerrahi operasyonlar akademik kadro gözetiminde yapılmaktadır.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Kütahya; <strong>saç ekimi</strong> veya <strong>karmaşık onkolojik cerrahiler</strong> için bir ana üs değildir. Bu tarz vakalar genellikle yakın mesafedeki Eskişehir veya Bursa'ya koordine edilir.</p>
                </div>`
            }
        },
        thermal: {
            img: "https://via.placeholder.com/400x250?text=Kutahya+Yoncali+Termal",
            phone: "+90 274 249 42 12",
            tr: {
                hospName: "Yoncalı, Simav, Emet ve Tavşanlı Kaplıcaları",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#2980b9;">♨️ TÜRKİYE'NİN TERMAL KRALLIĞI</h4>
                    <p>Kütahya, her biri farklı hastalıklara iyi gelen onlarca farklı termal kaynağa sahip dürüst bir şifa deposudur.</p>
                    
                    <h4>🧪 Hangi Bölge Neye İyi Gelir?</h4>
                    <ul>
                        <li><strong>Yoncalı:</strong> Felçli hastaların rehabilitasyonu ve <strong>kireçlenme</strong> için Türkiye'nin en iyi fizik tedavi merkezlerinden biridir.</li>
                        <li><strong>Emet (Yosun Banyosu):</strong> Doğal yosunlu suyuyla <strong>zayıflama</strong> ve cilt yenilemede eşsizdir.</li>
                        <li><strong>Simav:</strong> Yüksek sıcaklığıyla <strong>romatoid artrit</strong> hastaları için dürüst bir doğal ilaçtır.</li>
                    </ul>
                </div>`
            }
        },
        care: {
            tr: {
                hospName: "Hidroterapi ve Uzun Dönem Bakım",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#27ae60;">💧 SUYLA GELEN YENİLENME</h4>
                    <p>Kütahya, Türkiye'de <strong>Hidroterapi</strong> (su ile tedavi) denilince akla gelen ilk şehirdir. Ameliyat sonrası eklem kısıtlılığı yaşayanlar için en dürüst rehabilitasyon sürecini termal sularıyla sunar.</p>
                </div>`
            }
        },
        spa: {
            tr: {
                hospName: "Termal Wellness & Çamur Terapi",
                analysis: `<div class="analysis-content"><p>Kütahya'da SPA, lüksten ziyade sağlıktır. Meşhur <strong>termal çamur</strong> banyoları, cildi minerallerle doyururken toksinlerin atılmasını sağlar.</p></div>`
            }
        }
    },
    "MALATYA": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Malatya+Turgut+Ozal+Tip",
            phone: "+90 422 341 06 60",
            tr: {
                hospName: "İnönü Üniversitesi Turgut Özal Tıp Merkezi ve Eğitim Araştırma Hastanesi",
                analysis: `
                <div class="analysis-content">
                    <h3 style="color:#e67e22;">🌟 DÜNYANIN KARACİĞER NAKLİ MERKEZİ</h3>
                    <p><strong>MALATYA</strong>, sadece Türkiye'nin değil, dünyanın en önemli transplantasyon merkezlerinden biridir. Karaciğer nakli operasyon sayısında dünyada ikinci sıradadır.</p>
                    
                    <h4>💎 Öne Çıkan Uzmanlık Alanları</h4>
                    <ul>
                        <li><strong>🧬 Karaciğer Nakli:</strong> Turgut Özal Tıp Merkezi, aynı anda 5 nakil yapabilen kapasitesiyle bu alanda global bir otoritedir.</li>
                        <li><strong>🦷 Diş ve Çene Cerrahisi:</strong> Şehir, bölgedeki en geniş kapsamlı Diş Fakültesi'ne sahip olup, <strong>implant</strong> ve karmaşık diş operasyonlarında bir üstür.</li>
                        <li><strong>🩸 Hematoloji ve İlik Nakli:</strong> Kanser tedavisinde ve kemik iliği naklinde Doğu Anadolu'nun en gelişmiş altyapısına sahiptir.</li>
                        <li><strong>💇‍♂️ Estetik ve Saç Ekimi:</strong> Büyük bir tıp şehri olmasının getirisiyle, profesyonel kliniklerde saç ekimi hizmetleri dürüst fiyatlarla sunulur.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Malatya cerrahide bir devdir. Ancak şehirdeki sağlık trafiği çok yoğundur; özellikle karaciğer nakli gibi süreçler için tüm dünyadan hasta geldiği için randevu ve hazırlık süreçleri ciddi disiplin gerektirir.</p>
                </div>`
            }
        },
        thermal: {
            tr: {
                hospName: "İspendere İçmeleri",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#2980b9;">♨️ GELENEKSEL ŞİFA KAYNAĞI</h4>
                    <p>Malatya'da İspendere içmeleri, yüzyıllardır böbrek ve sindirim sistemi rahatsızlıkları için kullanılan dürüst bir duraktır.</p>
                    
                    <h4>🧪 Şifa Alanları</h4>
                    <p>Özellikle <strong>böbrek taşları</strong> ve <strong>gastrit</strong> gibi mide sorunlarında içme kürü olarak etkilidir. Su içeriğindeki zengin mineraller, idrar yollarını temizleme özelliğine sahiptir.</p>
                </div>`
            }
        },
        care: {
            tr: {
                hospName: "Fizik Tedavi ve Rehabilitasyon Üniteleri",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#27ae60;">🦾 MODERN REHABİLİTASYON</h4>
                    <p>Turgut Özal Tıp Merkezi bünyesindeki fizik tedavi üniteleri, inme (felç) ve omurga yaralanmaları sonrası bakımda bölgedeki en dürüst ve donanımlı hizmeti sunar.</p>
                </div>`
            }
        },
        spa: {
            tr: {
                hospName: "Şehir Otelleri Wellness",
                analysis: `<div class="analysis-content"><p>Malatya'da SPA kültürü, lüks şehir otellerinde kış aylarında yoğunlaşan sauna ve buhar banyosu hizmetleri ile sınırlıdır; sağlık odaklı bir yaklaşım hakimdir.</p></div>`
            }
        }
    },
    "MANISA": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Manisa+CBÜ+Tip",
            phone: "+90 236 233 19 00",
            tr: {
                hospName: "Manisa Celal Bayar Üniversitesi Tıp Fakültesi ve Şehir Hastanesi",
                analysis: `
                <div class="analysis-content">
                    <h3 style="color:#e67e22;">🌟 EGE'NİN TIP VE CERRAHİ KALESİ</h3>
                    <p><strong>MANISA</strong>, İzmir'e çok yakın olmasının avantajını kullanarak, kendi akademik ve teknolojik cerrahi gücünü zirveye taşımıştır.</p>
                    
                    <h4>💎 Öne Çıkan Uzmanlık Alanları</h4>
                    <ul>
                        <li><strong>🧠 Nöroşirürji:</strong> Beyin ve sinir cerrahisinde, özellikle <strong>mikro cerrahi</strong> yöntemleriyle zorlu tümör operasyonlarında bölgenin referans merkezidir.</li>
                        <li><strong>🦴 Ortopedi:</strong> Sporcu sağlığı ve bağ yaralanmaları cerrahisinde yüksek vaka tecrübesine sahiptir.</li>
                        <li><strong>🦷 Diş Estetiği:</strong> Modern kliniklerde gülüş tasarımı ve implant uygulamaları, İzmir'e alternatif olarak daha butik ve dürüst hizmetlerle sunulur.</li>
                        <li><strong>💇‍♂️ Saç Ekimi:</strong> Ege bölgesinde profesyonel doktorlar eşliğinde saç ekimi yapan güvenilir kliniklere ev sahipliği yapar.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Manisa cerrahide çok güçlüdür. Ancak çok çok spesifik <strong>çocuk kalp cerrahisi</strong> gibi uç vakalarda genellikle protokol gereği 30 dakika mesafedeki İzmir Ege Üniversitesi'ne pas verilebilir.</p>
                </div>`
            }
        },
        thermal: {
            img: "https://via.placeholder.com/400x250?text=Manisa+Salihli+Termal",
            phone: "+90 236 713 51 00",
            tr: {
                hospName: "Salihli Kurşunlu ve Turgutlu Urganlı Kaplıcaları",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#2980b9;">♨️ DOĞAL ANTİBİYOTİK: KURŞUNLU</h4>
                    <p>Manisa Salihli'deki Kurşunlu kaplıcaları, kükürt ve sülfat yoğunluğuyla Türkiye'nin en dürüst cilt şifası merkezlerinden biridir.</p>
                    
                    <h4>🧪 Hangi Hastalıklara İyi Gelir?</h4>
                    <ul>
                        <li><strong>Cilt Şifası:</strong> Egzama, <strong>sedef</strong> ve mantar tipi deri hastalıklarında kurutucu ve yenileyici etkisi tescillidir.</li>
                        <li><strong>Kadın Hastalıkları:</strong> Kronik pelvik ağrılar ve iltihabi durumlarda destekleyici banyo kürü olarak kullanılır.</li>
                    </ul>
                </div>`
            }
        },
        care: {
            tr: {
                hospName: "Geriatri ve Onkolojik Bakım",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#27ae60;">🍬 MESİR MACUNU MİRASI: BAĞIŞIKLIK</h4>
                    <p>Manisa, geleneksel 41 çeşit baharatlı <strong>Mesir Macunu</strong> kültürüyle, tıbbi tedaviyi destekleyen doğal bağışıklık kürlerinde dürüst bir tarihsel mirasa sahiptir. Bu durum yaşlı bakımı ve nekahet dönemlerini destekleyen bir unsurdur.</p>
                </div>`
            }
        },
        spa: {
            tr: {
                hospName: "Vadi Wellness & Spa",
                analysis: `<div class="analysis-content"><p>Salihli ve çevresindeki termal vadilerde, doğa ile iç içe meditasyon ve termal masaj seansları sunan butik tesisler mevcuttur.</p></div>`
            }
        }
    },
    "K.MARAS": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Kahramanmaras+Necip+Fazil+Hastanesi",
            phone: "+90 344 228 28 00",
            tr: {
                hospName: "Necip Fazıl Şehir Hastanesi ve Sütçü İmam Üniversitesi Tıp Fakültesi",
                analysis: `
                <div class="analysis-content">
                    <h3 style="color:#e67e22;">🌟 DEPREM SONRASI YENİ NESİL SAĞLIK ÜSSÜ</h3>
                    <p><strong>KAHRAMANMARAS</strong>, yaşadığı büyük afetin ardından Türkiye'nin en modern ve deprem izolatörlü hastane komplekslerinden birine sahip olmuştur.</p>
                    
                    <h4>💎 Öne Çıkan Uzmanlık Alanları</h4>
                    <ul>
                        <li><strong>🦴 Ortopedi ve Travmatoloji:</strong> Şehir, yaşadığı büyük vaka tecrübesiyle <strong>ekstremite cerrahisi</strong> ve protez uygulamalarında bölge referans merkezidir.</li>
                        <li><strong>🦷 Diş Sağlığı Merkezi:</strong> Yeni kurulan diş hastaneleri, dijital gülüş tasarımı ve implantta en son teknolojiyi kullanmaktadır.</li>
                        <li><strong>🦾 Robotik Fizik Tedavi:</strong> Şehir hastanesi bünyesinde Türkiye'nin en dürüst ve modern <strong>rehabilitasyon robotları</strong> hizmet vermektedir.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Kahramanmaraş cerrahi altyapısını tamamen yenilemiştir. Ancak <strong>karaciğer nakli</strong> gibi dünya çapında spesifikasyon gerektiren ameliyatlar için hala komşu şehir Malatya ile koordineli çalışılmaktadır.</p>
                </div>`
            }
        },
        thermal: {
            img: "https://via.placeholder.com/400x250?text=Illica+Kaplicalari",
            phone: "+90 344 215 15 15",
            tr: {
                hospName: "Ilıca ve Döngele Kaplıcaları",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#2980b9;">♨️ DOĞU AKDENİZ'İN TERMAL KALBİ</h4>
                    <p>Kahramanmaraş Ilıca bölgesi, yüksek kükürt oranı ve ideal sıcaklığıyla Türkiye'nin en dürüst şifa kaynaklarından biridir.</p>
                    
                    <h4>🧪 Hangi Hastalıklara İyi Gelir?</h4>
                    <ul>
                        <li><strong>Kronik Eklem Ağrıları:</strong> Suyun mineral yoğunluğu <strong>kireçlenme</strong> ve bel fıtığı kaynaklı ağrıları dürüstçe dindirir.</li>
                        <li><strong>Dermatolojik Şifa:</strong> Kükürtlü yapısı sayesinde <strong>sedef ve egzama</strong> tedavisinde Türkiye'nin en çok tercih edilen doğal duraklarındandır.</li>
                    </ul>
                </div>`
            }
        },
        care: {
            tr: {
                hospName: "Yaylakent Rehabilitasyon Alanları",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#27ae60;">🏔️ YÜKSEK OKSİJEN VE BAKIM</h4>
                    <p>Şehrin yüksek rakımlı yaylaları, <strong>astım</strong> ve solunum yetmezliği çeken hastalar için doğal bir oksijen çadırı görevi görür. Temiz hava, ameliyat sonrası toparlanma sürecini hızlandırır.</p>
                </div>`
            }
        },
        spa: {
            tr: {
                hospName: "Geleneksel Termal Spa",
                analysis: `<div class="analysis-content"><p>Buradaki SPA kültürü, termal suların şifasını geleneksel hamam ritüelleriyle birleştirir. Özellikle <strong>termal çamur</strong> uygulamaları deri gözeneklerini temizlemede çok etkilidir.</p></div>`
            }
        }
    },
    "MARDIN": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Mardin+Egitim+Arastirma",
            phone: "+90 482 212 10 48",
            tr: {
                hospName: "Mardin Eğitim ve Araştırma Hastanesi ve Özel Mezopotamya Klinikleri",
                analysis: `
                <div class="analysis-content">
                    <h3 style="color:#e67e22;">🌟 MEZOPOTAMYA'NIN ESTETİK VE DİŞ KAPISI</h3>
                    <p><strong>MARDIN</strong>, son yıllarda sınır ötesi sağlık turizminde ve bölge cerrahisinde parlayan bir yıldız haline gelmiştir.</p>
                    
                    <h4>💎 Öne Çıkan Uzmanlık Alanları</h4>
                    <ul>
                        <li><strong>🦷 Diş Sağlığı ve İmplant:</strong> Mardin, bölgenin en hızlı büyüyen diş sağlığı merkezlerine sahiptir. Özellikle <strong>zirkonyum</strong> kaplama ve implantta uzmanlaşmış butik kliniklere sahiptir.</li>
                        <li><strong>👃 Rinoplasti ve Estetik:</strong> Yüz cerrahisi ve burun estetiğinde bölge insanının anatomik yapısına hakim uzman cerrahlar görev yapmaktadır.</li>
                        <li><strong>💇‍♂️ Saç Ekimi:</strong> Mardin, Ortadoğu'dan gelen hastalar için profesyonel ve dürüst saç ekim operasyonlarının yapıldığı stratejik bir noktadır.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Mardin estetik ve temel cerrahide çok başarılıdır. Ancak <strong>açık kalp cerrahisi</strong> veya karmaşık <strong>beyin ameliyatları</strong> için teknolojik derinlik açısından hastalar genellikle Diyarbakır'daki üniversite hastanelerine yönlendirilir.</p>
                </div>`
            }
        },
        thermal: {
            img: "https://via.placeholder.com/400x250?text=Mardin+Germ-i+Ab",
            tr: {
                hospName: "Dargeçit Ilısu (Germ-i Ab) Kaynakları",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#2980b9;">♨️ TARİHİ SULARIN ŞİFASI</h4>
                    <p>Dargeçit bölgesindeki Ilısu kaplıcaları, binlerce yıldır Mezopotamya halkı tarafından şifa niyetine kullanılan dürüst bir kaynaktır.</p>
                    
                    <h4>🧪 Şifa Alanları</h4>
                    <p>Özellikle <strong>böbrek taşları</strong> ve idrar yolları iltihaplarında içme kürleri meşhurdur. Suyun mineral yapısı deri hastalıklarında kurutucu etkiye sahiptir.</p>
                </div>`
            }
        },
        care: {
            tr: {
                hospName: "Güneş ve İklim Terapisi",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#27ae60;">☀️ D VİTAMİNİ VE KURU İKLİM</h4>
                    <p>Mardin'in kuru sıcağı ve yoğun güneş ışığı, <strong>osteoporoz</strong> (kemik erimesi) ve <strong>D vitamini eksikliği</strong> olan hastalar için dürüst bir doğal takviyedir. Ayrıca nemin düşük olması, eklem ağrılarını hafifleten bir unsurdur.</p>
                </div>`
            }
        },
        spa: {
            tr: {
                hospName: "Otantik Mezopotamya Hamamı",
                analysis: `<div class="analysis-content"><p>Mardin'de SPA yerine, tarihi <strong>sabun üretim</strong> merkezi olmasının avantajıyla, gerçek bıttım sabunları ve ipek keselerle yapılan otantik hamam terapileri ön plandadır.</p></div>`
            }
        }
    },
    "MUGLA": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Mugla+Sidki+Kocman+Uni",
            phone: "+90 252 214 13 26",
            tr: {
                hospName: "Muğla Sıtkı Koçman Üni. E.A.H. ve Bodrum-Fethiye Özel Hastaneleri",
                analysis: `
                <div class="analysis-content">
                    <h3 style="color:#e67e22;">🌟 DÜNYA STANDARTLARINDA TATİL VE CERRAHİ ÜSSÜ</h3>
                    <p><strong>MUGLA</strong>, özellikle Bodrum ve Fethiye aksında, Avrupa'nın en kaliteli butik hastanelerine ve cerrahi kliniklerine ev sahipliği yapar.</p>
                    
                    <h4>💎 Öne Çıkan Uzmanlık Alanları</h4>
                    <ul>
                        <li><strong>👃 VIP Estetik ve Plastik Cerrahi:</strong> Özellikle Bodrum'daki klinikler, dünyanın her yerinden gelen hastalara <strong>burun estetiği</strong> ve vücut şekillendirmede gizlilik ve yüksek kalite sunar.</li>
                        <li><strong>🦷 Diş Turizmi:</strong> Fethiye ve Marmaris, "Dental Holiday" konseptinde bir dünya markasıdır. <strong>İmplant</strong> ve <strong>Zirkonyum</strong> kaplamada İngiltere ve Avrupa'nın en dürüst alternatifidir.</li>
                        <li><strong>👁️ Göz Cerrahisi:</strong> Tatil döneminde lazerle göz çizdirme (LASIK) operasyonları çok popülerdir ve teknolojik altyapı çok gelişmiştir.</li>
                        <li><strong>💇‍♂️ Saç Ekimi:</strong> Ege'nin huzurlu ortamında, butik ve doktor odaklı saç ekimi hizmeti sunulur.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Muğla'da özel sağlık hizmetleri çok lükstür ancak fiyatlar döviz odaklı olduğu için yerli hasta için bazen maliyetli olabilir. Çok ileri düzey <strong>onkolojik araştırmalar</strong> için hastalar bazen İzmir'e yönlendirilir.</p>
                </div>`
            }
        },
        thermal: {
            img: "https://via.placeholder.com/400x250?text=Koycegiz+Sultaniye+Kaplicalari",
            phone: "+90 252 262 24 24",
            tr: {
                hospName: "Köyceğiz Sultaniye ve Dalaman Kaplıcaları",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#2980b9;">♨️ RADYOAKTİF ŞİFA: SULTANİYE</h4>
                    <p>Muğla Köyceğiz'deki Sultaniye kaplıcaları, Türkiye'nin en yüksek radyoaktivite oranına sahip dürüst bir "Gençlik Suyu" kaynağıdır.</p>
                    
                    <h4>🧪 Hangi Hastalıklara İyi Gelir?</h4>
                    <ul>
                        <li><strong>Kas ve İskelet Sistemi:</strong> Ameliyat sonrası <strong>eklem kilitlenmelerini</strong> açmada ve kronik romatizmada mucizevi sonuçlar verir.</li>
                        <li><strong>Cilt Bakımı:</strong> Meşhur <strong>çamur banyoları</strong>, deri gözeneklerini derinlemesine temizler ve toksin atımını hızlandırır.</li>
                    </ul>
                </div>`
            }
        },
        care: {
            tr: {
                hospName: "Post-Operatif VIP Bakım",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#27ae60;">🌿 DENİZ VE ÇAM HAVASIYLA REHABİLİTASYON</h4>
                    <p>Muğla, kışın bile ılık geçen iklimi ve yüksek iyot-oksijen dengesiyle <strong>bypass ameliyatı sonrası</strong> ve <strong>onkolojik nekahet</strong> dönemi için Türkiye'nin en dürüst rehabilitasyon adresidir.</p>
                </div>`
            }
        },
        spa: {
            tr: {
                hospName: "Lüks Thalasso & Wellness",
                analysis: `<div class="analysis-content"><p>Muğla'da SPA kültürü, lüks otellerde deniz suyunun ısıtılarak kullanıldığı <strong>Thalassoterapi</strong> ve bitkisel aromaterapi masajları üzerine uzmanlaşmıştır.</p></div>`
            }
        }
    },
    "MUS": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Mus+Devlet+Hastanesi",
            phone: "+90 436 212 06 66",
            tr: {
                hospName: "Muş Devlet Hastanesi",
                analysis: `
                <div class="analysis-content">
                    <p><strong>MUS</strong>, Doğu Anadolu'da temel sağlık hizmetlerini dürüstçe sunan butik bir cerrahi altyapıya sahiptir.</p>
                    
                    <h4>🔍 Mevcut Kapasite</h4>
                    <ul>
                        <li><strong>Genel Cerrahi:</strong> Temel acil müdahaleler ve rutin operasyonlar yapılmaktadır.</li>
                        <li><strong>Kadın Doğum:</strong> Şehirdeki yeni hastane ile kadın ve çocuk sağlığı branşlarında kapasite artırılmıştır.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Muş; <strong>saç ekimi</strong>, <strong>diş estetiği</strong> veya <strong>ileri beyin cerrahisi</strong> için bir merkez değildir. Kompleks ameliyatlar ve onkolojik süreçler için hastalar genellikle Erzurum veya Elazığ'daki üniversite hastanelerine yönlendirilir.</p>
                </div>`
            }
        },
        thermal: {
            tr: {
                hospName: "Muş Yerel Kaplıcaları",
                analysis: `<div class="analysis-content"><p>Varto çevresinde yerel halkın kullandığı sıcak su kaynakları bulunsa da, profesyonel anlamda konaklamalı bir medikal termal tesis henüz mevcut değildir.</p></div>`
            }
        },
        care: {
            img: "https://via.placeholder.com/400x250?text=Mus+Ovasi+Hava",
            tr: {
                hospName: "Yayla ve Ova Terapisi",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#27ae60;">🌬️ NEMDEN UZAK SOLUNUM DESTEĞİ</h4>
                    <p>Muş Ovası'nın kendine has mikro-kliması, düşük nem oranı sayesinde <strong>astım</strong> ve <strong>bronşit</strong> hastaları için dürüst bir doğal rahatlama alanı sağlar.</p>
                </div>`
            }
        },
        spa: {
            tr: {
                hospName: "Geleneksel Hamam Hizmetleri",
                analysis: `<div class="analysis-content"><p>Şehir merkezindeki yerel hamamlarda sunulan geleneksel hizmetler, bölgedeki tek wellness aktivitesidir.</p></div>`
            }
        }
    },
    "NEVSEHIR": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Nevsehir+Devlet+Hastanesi",
            phone: "+90 384 228 50 50",
            tr: {
                hospName: "Nevşehir Devlet Hastanesi ve Kapadokya Özel Sağlık Merkezleri",
                analysis: `
                <div class="analysis-content">
                    <h3 style="color:#e67e22;">🌟 KAPADOKYA'NIN BUTİK SAĞLIK KAPISI</h3>
                    <p><strong>NEVSEHIR</strong>, Kapadokya turizmi ile entegre olmuş, özellikle estetik ve göz cerrahisinde butik ve kaliteli hizmet sunan bir merkezdir.</p>
                    
                    <h4>💎 Öne Çıkan Uzmanlık Alanları</h4>
                    <ul>
                        <li><strong>👁️ Göz Cerrahisi:</strong> Şehirdeki özel klinikler, akıllı lens ve katarakt ameliyatlarında yabancı turistlere de hitap eden yüksek bir teknolojiye sahiptir.</li>
                        <li><strong>🦷 Diş Estetiği:</strong> "Dental Holiday" kapsamında, Kapadokya tatili ile birleştirilen <strong>implant</strong> ve <strong>zirkonyum</strong> tedavilerinde dürüst ve estetik çözümler sunulur.</li>
                        <li><strong>👃 Estetik Cerrahi:</strong> Bölgenin mistik dokusuyla birleşen post-operatif (ameliyat sonrası) dinlenme süreci, burun ve yüz estetiği hastaları için tercih sebebidir.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Nevşehir, belirli alanlarda çok başarılıdır. Ancak <strong>açık kalp cerrahisi</strong> veya karmaşık <strong>beyin ameliyatları</strong> gibi büyük müdahaleler için hastalar genellikle 1 saat mesafedeki Kayseri Erciyes Üniversitesi'ne yönlendirilir.</p>
                </div>`
            }
        },
        thermal: {
            img: "https://via.placeholder.com/400x250?text=Kozakli+Termal",
            phone: "+90 384 471 24 94",
            tr: {
                hospName: "Kozaklı Termal Kaplıcaları",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#2980b9;">♨️ TÜRKİYE'NİN "SÜPER" RADON GAZI KAYNAĞI</h4>
                    <p>Kozaklı suları, içindeki yüksek <strong>Radon gazı</strong> sayesinde dünyada nadir bulunan "gençleştirici" su sınıfındadır.</p>
                    
                    <h4>🧪 Şifa Alanları</h4>
                    <ul>
                        <li><strong>Gençleşme ve Cilt:</strong> Radon gazı hücre yenilenmesini tetikler, <strong>anti-aging</strong> etkisi dürüstçe en yüksek sulardan biridir.</li>
                        <li><strong>Romatizma ve Kireçlenme:</strong> Suyun sıcaklığı ve mineralleri, eklem hareket kısıtlılıklarını açmada dürüst bir yardımcıdır.</li>
                    </ul>
                </div>`
            }
        },
        care: {
            tr: {
                hospName: "Klimaterapi ve Mağara Rehabilitasyonu",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#27ae60;">🌬️ DOĞAL TERAPİ ALANLARI</h4>
                    <p>Nevşehir'in nemsiz havası ve doğal kaya yapısı, <strong>astım</strong> hastaları için dürüst bir nefes alma alanı sunar. Bölgedeki lüks oteller, ameliyat sonrası sessiz ve kaliteli bir dinlenme süreci için idealdir.</p>
                </div>`
            }
        },
        spa: {
            tr: {
                hospName: "Kaya Spa & Çamur Banyoları",
                analysis: `<div class="analysis-content"><p>Nevşehir'de SPA, yer altı kaya otellerinin içinde sunulan mistik bir deneyimdir. Bölgeden çıkan volkanik çamurla yapılan <strong>peloid</strong> maskeleri cilt detoksu için rakipsizdir.</p></div>`
            }
        }
    },
    "NIGDE": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Nigde+Omer+Halisdemir+Uni",
            phone: "+90 388 221 00 00",
            tr: {
                hospName: "Niğde Ömer Halisdemir Üni. Eğitim Araştırma Hastanesi",
                analysis: `
                <div class="analysis-content">
                    <p><strong>NIGDE</strong>, İç Anadolu'nun sakin ama sağlık altyapısını hızla modernize eden dürüst bir şehridir.</p>
                    
                    <h4>🔍 Cerrahi Yetkinlikler</h4>
                    <ul>
                        <li><strong>Genel Cerrahi:</strong> Laparoskopik fıtık ve safra kesesi ameliyatlarında güvenilir bir hizmet sunulmaktadır.</li>
                        <li><strong>Ortopedi:</strong> Travma cerrahisi ve temel eklem ameliyatları başarıyla yapılır.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Niğde; <strong>saç ekimi</strong>, <strong>diş estetiği</strong> veya ileri <strong>onkolojik cerrahi</strong> için bir ana merkez değildir. Kompleks vakalar genellikle Kayseri'ye koordine edilir.</p>
                </div>`
            }
        },
        thermal: {
            img: "https://via.placeholder.com/400x250?text=Ciftehan+Kaplicalari",
            phone: "+90 388 531 22 90",
            tr: {
                hospName: "Çiftehan Kaplıcaları",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#2980b9;">♨️ ADANA-KONYA YOLUNUN ŞİFASI: ÇİFTEHAN</h4>
                    <p>Çiftehan, sodyum sülfatlı yapısıyla yüzyıllardır kullanılan, Türkiye'nin en dürüst ve güvenilir termal duraklarından biridir.</p>
                    
                    <h4>🧪 Hangi Hastalıklara İyi Gelir?</h4>
                    <ul>
                        <li><strong>Bel ve Boyun Fıtığı:</strong> Suyun doğal kaldırma kuvvetiyle yapılan egzersizler fıtık ağrılarını dürüstçe hafifletir.</li>
                        <li><strong>Sindirim:</strong> İçme kürü olarak kullanıldığında <strong>karaciğer ve safra</strong> yollarını dezenfekte eder.</li>
                    </ul>
                </div>`
            }
        },
        care: {
            tr: {
                hospName: "Yüksek Rakım ve Geriatri",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#27ae60;">🏔️ DAĞ HAVASI VE BAKIM</h4>
                    <p>Niğde'nin Bolkar ve Aladağlar eteklerindeki temiz hava kalitesi, <strong>koah</strong> ve akciğer hastaları için dürüst bir rehabilitasyon imkanı sunar.</p>
                </div>`
            }
        },
        spa: {
            tr: {
                hospName: "Butik Termal Wellness",
                analysis: `<div class="analysis-content"><p>Çiftehan bölgesindeki modern tesislerde sunulan sauna ve mineral banyosu hizmetleri mevcuttur; odak noktası tamamen sağlıktır.</p></div>`
            }
        }
    },
    "ORDU": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Ordu+Devlet+Hastanesi",
            phone: "+90 452 225 01 50",
            tr: {
                hospName: "Ordu Üniversitesi Eğitim ve Araştırma Hastanesi ve Modern Özel Klinikler",
                analysis: `
                <div class="analysis-content">
                    <h3 style="color:#e67e22;">🌟 KARADENİZ'İN MODERN CERRAHİ VE DİŞ KAPISI</h3>
                    <p><strong>ORDU</strong>, özellikle teknolojik altyapısını hızla yenileyen özel hastaneleriyle bölgenin sağlık parlayan yıldızıdır.</p>
                    
                    <h4>💎 Öne Çıkan Uzmanlık Alanları</h4>
                    <ul>
                        <li><strong>👁️ Göz Cerrahisi:</strong> Karadeniz bölgesinde katarakt, akıllı lens ve <strong>lazerle göz çizdirme</strong> operasyonlarında dürüst ve teknolojik bir merkezdir.</li>
                        <li><strong>🦷 Diş Sağlığı ve Estetiği:</strong> Ordu, dijital diş hekimliği ve <strong>implant</strong> uygulamalarında bölgedeki en iddialı ve modern kliniklere sahiptir.</li>
                        <li><strong>👃 Estetik Cerrahi:</strong> Şehirde burun ve yüz estetiği üzerine uzmanlaşmış, çevre illerden de yoğun hasta kabul eden cerrahlar bulunmaktadır.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Ordu temel ve orta ölçekli cerrahide çok başarılıdır. Ancak <strong>açık kalp ameliyatları</strong> veya ileri <strong>onkolojik araştırmalar</strong> için hastalar genellikle Samsun veya Trabzon'daki köklü üniversite hastanelerine yönlendirilebilir.</p>
                </div>`
            }
        },
        thermal: {
            img: "https://via.placeholder.com/400x250?text=Ordu+Fatsa+Sarimsakli+Kaplica",
            tr: {
                hospName: "Fatsa Sarısakal ve Ilıca Kaplıcaları",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#2980b9;">♨️ FATSA'NIN ŞİFALI SULARI</h4>
                    <p>Ordu'nun Fatsa ilçesindeki kaplıcalar, klorürlü ve sodyumlu yapısıyla dürüst bir fizik tedavi desteği sunar.</p>
                    
                    <h4>🧪 Şifa Alanları</h4>
                    <p>Özellikle <strong>romatizmal hastalıklar</strong> ve kireçlenme şikayeti olanlar için suyun ısısı ve mineral dengesi dürüstçe rahatlatıcı etkiye sahiptir. Cilt yaralarının kapanma sürecini hızlandırır.</p>
                </div>`
            }
        },
        care: {
            tr: {
                hospName: "Yayla ve Deniz Havası Rehabilitasyonu",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#27ae60;">🌲 BOZTEPE NEFESİ</h4>
                    <p>Ordu'nun yüksek oksijenli yaylaları, <strong>akciğer rehabilitasyonu</strong> ve nekahet dönemi hastaları için doğal bir iyileşme laboratuvarıdır. Nemli ama temiz havası solunumu destekler.</p>
                </div>`
            }
        },
        spa: {
            tr: {
                hospName: "Fındık ve Bitki Özlü Wellness",
                analysis: `<div class="analysis-content"><p>Ordu'daki modern otellerde, bölgeye has fındık yağı ve yerel bitki özleriyle yapılan masajlar cildi canlandırmak için en dürüst ve doğal yöntemdir.</p></div>`
            }
        }
    },
    "RIZE": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Rize+Sehir+Hastanesi",
            phone: "+90 464 213 04 91",
            tr: {
                hospName: "Recep Tayyip Erdoğan Üniversitesi Eğitim ve Araştırma Hastanesi",
                analysis: `
                <div class="analysis-content">
                    <h3 style="color:#e67e22;">🌟 DOĞU KARADENİZ'İN YENİ CERRAHİ ÜSSÜ</h3>
                    <p><strong>RIZE</strong>, yeni kurulan devasa tıp kompleksleri ve üniversite altyapısıyla cerrahi olarak büyük bir ivme yakalamıştır.</p>
                    
                    <h4>💎 Öne Çıkan Uzmanlık Alanları</h4>
                    <ul>
                        <li><strong>❤️ Kalp ve Damar Cerrahisi:</strong> Bypass ve kapak ameliyatlarında bölgenin en gelişmiş akademik kadrolarından birine sahiptir.</li>
                        <li><strong>🧠 Nöroşirürji (Beyin Cerrahisi):</strong> Mikro-cerrahi yöntemlerle yapılan beyin ve sinir operasyonlarında teknolojik donanımı dürüstçe üst seviyededir.</li>
                        <li><strong>🦷 Diş ve Çene Cerrahisi:</strong> Fakülte bünyesindeki modern üniteler, karmaşık çene operasyonları ve implant tedavilerinde uzmanlaşmıştır.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Rize cerrahide çok güçlüdür. Ancak <strong>organ nakli</strong> gibi dünya çapında aşırı spesifikasyon gerektiren vakalar için komşu il Trabzon ile koordineli bir sistem yürütülmektedir.</p>
                </div>`
            }
        },
        thermal: {
            img: "https://via.placeholder.com/400x250?text=Rize+Ayder+Kaplica",
            phone: "+90 464 657 21 02",
            tr: {
                hospName: "Ayder Yaylası ve İkizdere Şimşirli Kaplıcaları",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#2980b9;">♨️ 1300 METREDE TERMAL ŞİFA: AYDER</h4>
                    <p>Rize Ayder kaplıcaları, yüksek rakım ve termal suyun birleştiği dünyadaki nadir noktalardan biridir.</p>
                    
                    <h4>🧪 Hangi Hastalıklara İyi Gelir?</h4>
                    <ul>
                        <li><strong>Eklem Romatizması:</strong> Suyun sülfatlı yapısı iltihaplı romatizmalarda dürüst bir gerileme sağlar.</li>
                        <li><strong>Mide ve Bağırsak:</strong> İkizdere'deki şifalı sular içme kürü olarak <strong>gastrit</strong> ve ülser şikayetlerini hafifletmede çok etkilidir.</li>
                    </ul>
                </div>`
            }
        },
        care: {
            tr: {
                hospName: "Ayder ve Anzer Akciğer Terapisi",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#27ae60;">🐝 ANZER BALI VE OKSİJEN</h4>
                    <p>Rize yaylaları, <strong>KOAH</strong> ve <strong>kronik bronşit</strong> hastaları için dünyanın en kaliteli havasına sahiptir. Ayrıca meşhur <strong>Anzer Balı</strong>, medikal tedaviyi destekleyen dürüst bir bağışıklık güçlendiricidir.</p>
                </div>`
            }
        },
        spa: {
            tr: {
                hospName: "Yayla Wellness & Rize Çayı Terapisi",
                analysis: `<div class="analysis-content"><p>Rize'de SPA, yayla otellerinde siyah çay banyosu ve orman bitkileriyle yapılan aromaterapi seansları ile sunulan özgün bir wellness deneyimidir.</p></div>`
            }
        }
    },
    "SAKARYA": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Sakarya+Egitim+Arastirma",
            phone: "+90 264 888 40 00",
            tr: {
                hospName: "Sakarya Eğitim ve Araştırma Hastanesi ve Modern Özel Hastaneler",
                analysis: `
                <div class="analysis-content">
                    <h3 style="color:#e67e22;">🌟 MARMARA'NIN LOJİSTİK SAĞLIK DURAĞI</h3>
                    <p><strong>SAKARYA</strong>, İstanbul'a yakınlığı ve yeni kurulan tıp fakültesi altyapısıyla cerrahide bölgenin güvenilir bir kalesidir.</p>
                    
                    <h4>💎 Öne Çıkan Uzmanlık Alanları</h4>
                    <ul>
                        <li><strong>🦴 Ortopedi ve Travmatoloji:</strong> Şehir, özellikle eklem cerrahisi ve <strong>protez ameliyatlarında</strong> yüksek vaka tecrübesine sahiptir.</li>
                        <li><strong>🦷 Diş Sağlığı:</strong> Sakarya, modern diş hastaneleriyle <strong>implant</strong> ve estetik gülüş tasarımında İstanbul kalitesini dürüst fiyatlarla sunar.</li>
                        <li><strong>🧠 Genel Cerrahi:</strong> Laparoskopik onkolojik cerrahilerde akademik kadro desteğiyle başarılı operasyonlar yürütülmektedir.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Sakarya temel ve orta-üst segment cerrahide çok iyidir. Ancak <strong>yapay kalp nakli</strong> veya çok nadir görülen genetik hastalıkların tedavisi için hastalar genellikle 1 saat mesafedeki İstanbul merkezlerine yönlendirilir.</p>
                </div>`
            }
        },
        thermal: {
            img: "https://via.placeholder.com/400x250?text=Sakarya+Tarakli+Termal",
            phone: "+90 264 418 10 10",
            tr: {
                hospName: "Taraklı ve Akyazı Kuzuluk Kaplıcaları",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#2980b9;">♨️ MARMARA'NIN ŞİFA NEFESİ: KUZULUK</h4>
                    <p>Kuzuluk kaplıcaları, yüksek karbondioksit ve mineral yapısıyla Türkiye'nin en dürüst rehabilitasyon sularından biridir.</p>
                    
                    <h4>🧪 Hangi Hastalıklara İyi Gelir?</h4>
                    <ul>
                        <li><strong>Solunum ve Kalp:</strong> Suyun buharı <strong>astım</strong> ve bronşit hastalarını rahatlatırken, banyoları kan dolaşımını düzenler.</li>
                        <li><strong>Romatizma:</strong> Taraklı'nın çamurlu suları, kronik <strong>eklem kireçlenmelerinde</strong> dürüst bir ağrı kesicidir.</li>
                    </ul>
                </div>`
            }
        },
        care: {
            tr: {
                hospName: "Sapanca Wellness ve Rehabilitasyon",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#27ae60;">🌿 DOĞA İLE İYİLEŞME</h4>
                    <p>Sapanca'nın mikro-kliması, ameliyat sonrası <strong>psikolojik toparlanma</strong> ve fiziksel bakım için en dürüst adreslerden biridir. Bölgedeki lüks tesisler, tıbbi rehabilitasyonu doğa ile birleştirir.</p>
                </div>`
            }
        },
        spa: {
            tr: {
                hospName: "Lüks Orman Spa",
                analysis: `<div class="analysis-content"><p>Sakarya Sapanca, Türkiye'nin en lüks SPA otellerine ev sahipliği yapar. Burada wellness; orman terapisi, medikal masajlar ve detoks kürleri ile en üst seviyededir.</p></div>`
            }
        }
    },
    "SAMSUN": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Samsun+Ondokuz+Mayis+Uni",
            phone: "+90 362 312 19 19",
            tr: {
                hospName: "Ondokuz Mayıs Üniversitesi Tıp Fakültesi ve Samsun Şehir Hastanesi",
                analysis: `
                <div class="analysis-content">
                    <h3 style="color:#e67e22;">🌟 KARADENİZ'İN SAĞLIK BAŞKENTİ</h3>
                    <p><strong>SAMSUN</strong>, Karadeniz hattının en büyük cerrahi, diş ve estetik üssüdür. Şehir, binlerce yatak kapasiteli hastaneleriyle tam bir "Süper Yıldız"dır.</p>
                    
                    <h4>💎 Öne Çıkan Uzmanlık Alanları</h4>
                    <ul>
                        <li><strong>💇‍♂️ Saç Ekimi ve Estetik:</strong> Karadeniz ve yurtdışından gelen hastalar için Samsun, <strong>saç ekiminde</strong> İstanbul'un en dürüst ve güçlü rakibidir.</li>
                        <li><strong>🦷 Diş Hastaneleri:</strong> Türkiye'nin en modern Diş Fakültelerinden birine sahiptir. <strong>Çene cerrahisi</strong> ve implantta uluslararası otoritedir.</li>
                        <li><strong>❤️ Kalp ve Damar Cerrahisi:</strong> Çocuk ve yetişkin kalp ameliyatlarında bölgenin referans merkezidir.</li>
                        <li><strong>🦾 Onkoloji ve Robotik Cerrahi:</strong> Kanser tedavisinde en ileri radyoterapi cihazları ve kapalı cerrahi yöntemleri dürüstçe uygulanır.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Samsun'da çözülemeyecek tıbbi vaka neredeyse yoktur. Ancak şehrin büyüklüğü ve sağlık trafiğinin yoğunluğu nedeniyle, özellikle üniversite hastanesinde randevu süreçleri için sabırlı olunmalıdır.</p>
                </div>`
            }
        },
        thermal: {
            img: "https://via.placeholder.com/400x250?text=Samsun+Ladik+Hamamayagi",
            phone: "+90 362 771 20 10",
            tr: {
                hospName: "Ladik Hamamayağı ve Havza Kaplıcaları",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#2980b9;">♨️ ATATÜRK'ÜN ŞİFA BULDUĞU YER: HAVZA</h4>
                    <p>Havza kaplıcaları, tarihi ve dürüst mineral yapısıyla Karadeniz'in en kıymetli termal kaynağıdır.</p>
                    
                    <h4>🧪 Şifa Alanları</h4>
                    <ul>
                        <li><strong>Ladik (Gençlik Suyu):</strong> Dünyada mineral değeri en yüksek sulardan biri olup, hücre yenilenmesini dürüstçe destekler.</li>
                        <li><strong>Nörolojik Rehabilitasyon:</strong> Havza suları, <strong>felç</strong> ve sinirsel hastalıkların su içi terapisinde Türkiye'nin en başarılı noktalarındandır.</li>
                    </ul>
                </div>`
            }
        },
        care: {
            tr: {
                hospName: "Geriatrik Bakım ve Onkolojik Rehabilitasyon",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#27ae60;">🏥 BÖLGESEL BAKIM ÜSSÜ</h4>
                    <p>Samsun, yaşlı bakımı ve <strong>kanser sonrası bakım</strong> ünitelerinde Karadeniz'in en dürüst ve donanımlı tesislerine sahiptir. Evde bakım hizmetleri ve palyatif bakımda uzmanlaşmıştır.</p>
                </div>`
            }
        },
        spa: {
            tr: {
                hospName: "Medikal ve Termal Spa",
                analysis: `<div class="analysis-content"><p>Samsun'da SPA, Havza'nın termal gücü ile modern deniz otellerinin konforunu birleştirir. Ladik'in mineral sularıyla yapılan cilt bakımları çok meşhurdur.</p></div>`
            }
        }
    },
    "SIIRT": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Siirt+Egitim+Arastirma",
            phone: "+90 484 223 10 12",
            tr: {
                hospName: "Siirt Eğitim ve Araştırma Hastanesi",
                analysis: `
                <div class="analysis-content">
                    <p><strong>SIIRT</strong>, bölgesel düzeyde temel ve orta ölçekli cerrahi operasyonlarda uzmanlaşmış, hızla modernize olan bir sağlık yapısına sahiptir.</p>
                    
                    <h4>🔍 Cerrahi Yetkinlikler</h4>
                    <ul>
                        <li><strong>Genel Cerrahi:</strong> Laparoskopik (kapalı) ameliyatlar ve temel travma müdahalelerinde deneyimli bir kadro mevcuttur.</li>
                        <li><strong>Kadın Doğum ve Pediatri:</strong> Şehirde anne ve çocuk sağlığına yönelik cerrahi üniteler ön plandadır.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Siirt; <strong>saç ekimi</strong>, <strong>diş estetiği</strong> veya ileri <strong>kardiyovasküler cerrahi</strong> için bir ana destinasyon değildir. Bu tarz talepler ve onkolojik vakalar genellikle 1.5 saat mesafedeki Batman veya Diyarbakır'a yönlendirilir.</p>
                </div>`
            }
        },
        thermal: {
            img: "https://via.placeholder.com/400x250?text=Siirt+Billoris+Kaplicasi",
            phone: "+90 484 223 11 11",
            tr: {
                hospName: "Billoris (Sağlarca) Kaplıcası",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#2980b9;">♨️ CİLT DOSTU: BİLLORİS</h4>
                    <p>Siirt'in en dürüst şifa kaynağı olan Billoris kaplıcası, yüksek kükürt ve sodyum klorür içeriğiyle Mezopotamya'nın meşhur sularındandır.</p>
                    
                    <h4>🧪 Şifa Alanları</h4>
                    <ul>
                        <li><strong>Dermatolojik Tedavi:</strong> Kükürtlü yapısı sayesinde <strong>sedef, egzama</strong> ve inatçı akne sorunlarında dürüst bir iyileştirici güce sahiptir.</li>
                        <li><strong>Romatizmal Rahatlama:</strong> Suyun sıcaklığı, kronik eklem ve kireçlenme ağrılarında kasları gevşeterek mobiliteyi artırır.</li>
                    </ul>
                </div>`
            }
        },
        care: {
            tr: {
                hospName: "Doğal Bağışıklık ve Bıttım Şifası",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#27ae60;">🌿 BITTIM VE DOĞAL BAKIM</h4>
                    <p>Siirt, dünyaca ünlü <strong>Bıttım (yabani fıstık) yağı</strong> merkezidir. Bu yağ ile yapılan bakımlar, ameliyat sonrası yara iyileşmesi ve saç derisi sağlığı için dürüst bir doğal destek sunar.</p>
                </div>`
            }
        },
        spa: {
            tr: {
                hospName: "Geleneksel Mezopotamya Banyosu",
                analysis: `<div class="analysis-content"><p>Siirt'te wellness deneyimi, Billoris suyunun termal gücü ile gerçek bıttım sabunlarının birleştiği geleneksel hamam ritüellerinden ibarettir.</p></div>`
            }
        }
    },
    "SINOP": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Sinop+Ataturk+Devlet",
            phone: "+90 368 222 55 55",
            tr: {
                hospName: "Sinop Atatürk Devlet Hastanesi",
                analysis: `
                <div class="analysis-content">
                    <p><strong>SINOP</strong>, sağlık hizmetlerinde butik, sakin ve hasta memnuniyeti odaklı dürüst bir duraktır.</p>
                    
                    <h4>🔍 Cerrahi Mevcut Durum</h4>
                    <ul>
                        <li><strong>Diyaliz ve İç Hastalıkları:</strong> Yaşlı nüfusun yoğunluğu nedeniyle bu alanlarda cerrahi ve medikal destek çok gelişmiştir.</li>
                        <li><strong>Genel Cerrahi:</strong> Standart operasyonlar (fıtık, safra kesesi vb.) modern ünitelerde güvenle yapılmaktadır.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Sinop; <strong>organ nakli</strong>, <strong>saç ekimi</strong> veya karmaşık <strong>beyin cerrahisi</strong> için uygun altyapıya sahip değildir. Bu tür vakalar genellikle bölgenin sağlık devi Samsun'a sevk edilir.</p>
                </div>`
            }
        },
        thermal: {
            tr: {
                hospName: "Sinop Doğal Kaynaklar",
                analysis: `<div class="analysis-content"><p>Sinop'ta profesyonel bir medikal termal tesis bulunmamaktadır. Şehrin asıl termali, denizi ve ormanının birleştiği doğal atmosferidir.</p></div>`
            }
        },
        care: {
            img: "https://via.placeholder.com/400x250?text=Sinop+Huzur+Rehabilitasyon",
            tr: {
                hospName: "Zihinsel Arınma ve Geriatri Merkezi",
                analysis: `
                <div class="analysis-content">
                    <h3 style="color:#27ae60;">🌟 TÜRKİYE'NİN MUTLULUK VE NEFES ÜSSÜ</h3>
                    <p>Sinop, Türkiye'nin en mutlu şehri seçilmesiyle <strong>Mental Wellness</strong> ve ameliyat sonrası <strong>psikolojik iyileşme</strong> için 1 numaralı dürüst adrestir.</p>
                    
                    <h4>🌬️ Akciğer ve Zihin Terapisi</h4>
                    <ul>
                        <li><strong>Oksijen Deposu:</strong> İnceburun ve çevresindeki hava kalitesi, <strong>astım ve KOAH</strong> hastaları için dürüst bir doğal ilaçtır.</li>
                        <li><strong>Stres Yönetimi:</strong> Şehrin yavaş yaşam temposu (Cittaslow adayı), kalp krizi sonrası nekahet dönemi için eşsiz bir rehabilitasyon sunar.</li>
                    </ul>
                </div>`
            }
        },
        spa: {
            tr: {
                hospName: "Deniz Havası ve Wellness",
                analysis: `<div class="analysis-content"><p>Sinop'ta SPA anlayışı, sahil boyunca yapılan uzun yürüyüşler ve denizden gelen iyotla yapılan doğal solunum detoksuna dayanır.</p></div>`
            }
        }
    },
    "SIVAS": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Sivas+Cumhuriyet+Uni",
            phone: "+90 346 258 00 00",
            tr: {
                hospName: "Sivas Cumhuriyet Üniversitesi Tıp Fakültesi ve Numune Hastanesi",
                analysis: `
                <div class="analysis-content">
                    <h3 style="color:#e67e22;">🌟 ANADOLU'NUN KÖKLÜ TIP VE CERRAHİ MERKEZİ</h3>
                    <p><strong>SIVAS</strong>, Türkiye'nin en eski tıp fakültelerinden birine sahip olup, özellikle akademik cerrahide bir ekoldür.</p>
                    
                    <h4>💎 Öne Çıkan Uzmanlık Alanları</h4>
                    <ul>
                        <li><strong>👁️ Göz Cerrahisi:</strong> Kornea nakli ve karmaşık göz operasyonlarında bölgenin en tecrübeli akademik kadrosuna sahiptir.</li>
                        <li><strong>🦴 Ortopedi ve Travmatoloji:</strong> Kemik hastalıkları ve eklem cerrahisinde (kalça-diz protezi) dürüst ve yüksek başarı oranlı bir merkezdir.</li>
                        <li><strong>❤️ Kalp ve Damar Cerrahisi:</strong> Bypass ve kapalı kalp ameliyatlarında İç Anadolu'nun en güvenilir duraklarından biridir.</li>
                        <li><strong>🦷 Diş Hekimliği:</strong> Devasa diş fakültesiyle <strong>çene cerrahisi</strong> ve estetik gülüş tasarımında uzmanlaşmıştır.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Sivas cerrahi olarak çok güçlüdür. Ancak kış aylarındaki aşırı soğuklar, ameliyat sonrası açık havada iyileşme süreci bekleyen hastalar için zorlayıcı olabilir. Operasyon takvimi mevsimsel olarak planlanmalıdır.</p>
                </div>`
            }
        },
        thermal: {
            img: "https://via.placeholder.com/400x250?text=Sivas+Kangal+Balikli+Kaplica",
            phone: "+90 346 469 11 51",
            tr: {
                hospName: "Kangal Balıklı Kaplıca ve Sıcak Çermik",
                analysis: `
                <div class="analysis-content">
                    <h3 style="color:#2980b9;">🌟 DÜNYA MİRASI: DOKTOR BALIKLAR</h3>
                    <p>Sivas Kangal, dünyada <strong>Sedef Hastalığı (Psoriasis)</strong> tedavisinde %100 dürüst ve doğal çözüm sunan tek noktadır.</p>
                    
                    <h4>🧪 Tıbbi Mucize</h4>
                    <ul>
                        <li><strong>Sedef ve Egzama:</strong> 37 derece suda yaşayan "Doktor Balıklar", ciltteki pulları temizleyerek yara iyileşmesini sağlar. Bu, dünya tıp literatürüne girmiş bir başarıdır.</li>
                        <li><strong>Romatizma:</strong> Sıcak Çermik suları, yüksek kükürt oranıyla kronik ağrılarda dürüst bir şifa kaynağıdır.</li>
                    </ul>
                </div>`
            }
        },
        care: {
            tr: {
                hospName: "Geriatri ve Onkolojik Rehabilitasyon",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#27ae60;">🏥 AKADEMİK BAKIM Desteği</h4>
                    <p>Üniversite bünyesindeki palyatif bakım merkezleri, ağır cerrahi sonrası veya <strong>kanser hastaları</strong> için akademik düzeyde rehabilitasyon sunan en dürüst adreslerdendir.</p>
                </div>`
            }
        },
        spa: {
            tr: {
                hospName: "Selçuklu Hamam Terapisi",
                analysis: `<div class="analysis-content"><p>Sivas'ta SPA, tarihi Selçuklu hamamlarında mineral sularla yapılan kese ve köpük masajlarıyla dürüst bir vücut detoksuna dönüşür.</p></div>`
            }
        }
    },
    "TEKIRDAG": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Tekirdag+Sehir+Hastanesi",
            phone: "+90 282 204 00 00",
            tr: {
                hospName: "Tekirdağ Dr. İsmail Fehmi Cumalıoğlu Şehir Hastanesi ve NKÜ Tıp Fakültesi",
                analysis: `
                <div class="analysis-content">
                    <h3 style="color:#e67e22;">🌟 TRAKYA'NIN SAĞLIK VE ONKOLOJİ ÜSSÜ</h3>
                    <p><strong>TEKIRDAG</strong>, özellikle yeni açılan Şehir Hastanesi ile Balkanlar'ın ve Trakya'nın en teknolojik cerrahi merkezi konumuna gelmiştir.</p>
                    
                    <h4>💎 Öne Çıkan Uzmanlık Alanları</h4>
                    <ul>
                        <li><strong>♋ İleri Onkoloji:</strong> Kanser cerrahisinde ve radyoterapide İstanbul'daki en lüks hastanelerle yarışan bir teknolojik donanıma sahiptir.</li>
                        <li><strong>🦾 Robotik Cerrahi:</strong> Minimal invaziv (kapalı) operasyonlarda bölgenin en dürüst ve modern cihazları kullanılmaktadır.</li>
                        <li><strong>🦷 Diş ve Saç Ekimi:</strong> İstanbul'un trafik ve maliyetinden kaçanlar için modern kliniklerde <strong>saç ekimi</strong> ve <strong>implant</strong> hizmetleri çok gelişmiştir.</li>
                        <li><strong>❤️ Kardiyovasküler Cerrahi:</strong> Şehir hastanesi, kalp kapağı ve damar ameliyatlarında üst düzey başarı oranına sahiptir.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Tekirdağ cerrahide eksiksizdir. Ancak çok yoğun bir Balkan göçmen hastası trafiği vardır. Planlı ameliyatlar için bu yoğunluğun önceden yönetilmesi gerekir.</p>
                </div>`
            }
        },
        thermal: {
            tr: {
                hospName: "Tekirdağ Doğal Kaynaklar",
                analysis: `<div class="analysis-content"><p>Şehirde kapsamlı bir termal tesis bulunmamaktadır; ancak Şarköy ve Marmaraereğlisi hattındaki iyotlu deniz havası solunum için en dürüst şifadır.</p></div>`
            }
        },
        care: {
            img: "https://via.placeholder.com/400x250?text=Tekirdag+Sarkoy+Hava",
            tr: {
                hospName: "Şarköy Klimaterapi Alanı",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#27ae60;">🌬️ DÜNYA SAĞLIK ÖRGÜTÜ ONAYLI HAVA</h4>
                    <p>Tekirdağ Şarköy, dünyada <strong>hava kalitesi</strong> en yüksek noktalarından biri olarak <strong>KOAH, Astım</strong> ve kalp hastalarının rehabilitasyonu için dürüst bir cennettir.</p>
                </div>`
            }
        },
        spa: {
            tr: {
                hospName: "Modern Medikal Wellness",
                analysis: `<div class="analysis-content"><p>Şehirdeki beş yıldızlı oteller, özellikle onkoloji ve cerrahi hastaları için tasarlanmış özel <strong>lenfatik drenaj</strong> ve detoks masajları sunan SPA merkezlerine sahiptir.</p></div>`
            }
        }
    },
    "TOKAT": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Tokat+Gaziosmanpasa+Uni",
            phone: "+90 356 212 95 00",
            tr: {
                hospName: "Tokat Gaziosmanpaşa Üniversitesi Hastanesi",
                analysis: `
                <div class="analysis-content">
                    <p><strong>TOKAT</strong>, özellikle tıp fakültesinin bölgeye kazandırdığı akademik ivme ile cerrahi branşlarda dürüst bir hizmet sunar.</p>
                    
                    <h4>🔍 Cerrahi Yetkinlikler</h4>
                    <ul>
                        <li><strong>Genel Cerrahi:</strong> Obezite cerrahisi ve kapalı (laparoskopik) ameliyatlarda bölge halkı için güvenilir bir merkezdir.</li>
                        <li><strong>Üroloji:</strong> Böbrek taşı ve prostat cerrahisinde modern donanıma sahiptir.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Tokat; <strong>saç ekimi</strong> veya çok ileri <strong>kalp nakli</strong> gibi spesifik işlemler için bir ana üs değildir. Bu tür vakalar genellikle Sivas veya Samsun'a koordine edilir.</p>
                </div>`
            }
        },
        thermal: {
            img: "https://via.placeholder.com/400x250?text=Tokat+Sulusaray+Termal",
            phone: "+90 356 471 60 40",
            tr: {
                hospName: "Sulusaray ve Reşadiye Kaplıcaları",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#2980b9;">♨️ ANTİK ROMA ŞİFASI: SULUSARAY</h4>
                    <p>Sulusaray kaplıcaları, içindeki yoğun mineral yapısıyla antik çağlardan beri "şifa şehri" olarak bilinir.</p>
                    
                    <h4>🧪 Şifa Alanları</h4>
                    <ul>
                        <li><strong>Romatizma:</strong> Suyun sülfatlı yapısı, kronik <strong>eklem ağrılarını</strong> ve kireçlenmeyi dürüstçe hafifletir.</li>
                        <li><strong>Cilt Şifası:</strong> Reşadiye'deki sular, sedef ve benzeri deri lezyonlarının kurutulmasında destekleyici tedavi sunar.</li>
                    </ul>
                </div>`
            }
        },
        care: {
            tr: {
                hospName: "Doğal Klimaterapi Alanları",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#27ae60;">🌿 YEŞİL IRMAK REHABİLİTASYONU</h4>
                    <p>Tokat'ın mikro-kliması, özellikle ameliyat sonrası <strong>akciğer dinlenmesi</strong> ve huzurlu bir nekahet dönemi geçirmek isteyenler için dürüst bir doğa reçetesidir.</p>
                </div>`
            }
        },
        spa: {
            tr: {
                hospName: "Geleneksel Tokat Hamamları",
                analysis: `<div class="analysis-content"><p>Şehirdeki tarihi Paşa Hamamı gibi mekanlarda, mineral sularla harmanlanmış geleneksel Türk hamamı ritüelleri wellness hizmeti olarak sunulur.</p></div>`
            }
        }
    },
    "TRABZON": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Trabzon+KTU+Farabi",
            phone: "+90 462 377 50 00",
            tr: {
                hospName: "KTÜ Farabi Hastanesi ve Trabzon Şehir Hastanesi",
                analysis: `
                <div class="analysis-content">
                    <h3 style="color:#e67e22;">🌟 DOĞU KARADENİZ'İN TIBBİ LİDERİ</h3>
                    <p><strong>TRABZON</strong>, köklü tıp geçmişi ve dev hastaneleriyle sadece bölgenin değil, Kafkasya'nın en önemli cerrahi ve organ nakli merkezidir.</p>
                    
                    <h4>💎 Öne Çıkan Uzmanlık Alanları</h4>
                    <ul>
                        <li><strong>🧬 Organ Nakli:</strong> Karaciğer ve böbrek naklinde Türkiye'nin en başarılı akademik kadrolarından birine sahiptir.</li>
                        <li><strong>❤️ Kalp ve Damar Cerrahisi:</strong> Bypass ve kapalı kalp ameliyatlarında dünya standartlarında başarı oranları dürüstçe sunulur.</li>
                        <li><strong>💇‍♂️ Saç Ekimi ve Estetik:</strong> Trabzon, özellikle Gürcistan ve Rusya'dan gelen hastalar için <strong>saç ekiminde</strong> "Karadeniz'in İstanbul'u"dur.</li>
                        <li><strong>🦷 Diş Sağlığı Üssü:</strong> Modern fakülte ve özel poliklinikler; <strong>implant</strong> ve dijital diş hekimliğinde son teknolojiyi kullanır.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Trabzon cerrahide kusursuzdur. Tek handikapı, sağlık trafiğinin çok yoğun olmasıdır. Yurtdışından gelen hastaların yoğunluğu nedeniyle randevuların önceden planlanması dürüst bir gerekliliktir.</p>
                </div>`
            }
        },
        thermal: {
            tr: {
                hospName: "Trabzon Maden Suları ve Yerel Kaynaklar",
                analysis: `<div class="analysis-content"><p>Trabzon bir termal tesis merkezi değildir; ancak Kisarna (Kuzguncuk) maden suyu gibi doğal kaynaklar sindirim sistemi için yüzyıllardır dürüst bir destekçidir.</p></div>`
            }
        },
        care: {
            img: "https://via.placeholder.com/400x250?text=Trabzon+Uzungol+Hava",
            tr: {
                hospName: "Maçka ve Yayla Rehabilitasyon Merkezleri",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#27ae60;">🌲 LADİN ORMANLARIYLA SOLUNUM ŞİFASI</h4>
                    <p>Maçka ve çevresindeki yüksek rakımlı yaylalar, <strong>Astım ve KOAH</strong> hastaları için dürüst bir akciğer detoks merkezidir.</p>
                </div>`
            }
        },
        spa: {
            tr: {
                hospName: "Modern & Deniz Wellness",
                analysis: `<div class="analysis-content"><p>Trabzon'daki lüks sahil otelleri, deniz suyunun mineral gücünü kullanan SPA ve masaj terapileriyle Karadeniz'in en modern wellness hizmetlerini sunar.</p></div>`
            }
        }
    },
    "TUNCELI": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Tunceli+Devlet+Hastanesi",
            phone: "+90 428 213 10 30",
            tr: {
                hospName: "Tunceli Devlet Hastanesi",
                analysis: `
                <div class="analysis-content">
                    <p><strong>TUNCELI</strong>, sağlık hizmetlerinde butik ve erişilebilir bir yapıya sahiptir. Temel cerrahi branşlarda güvenilir hizmet sunar.</p>
                    
                    <h4>🔍 Mevcut Altyapı</h4>
                    <ul>
                        <li><strong>Genel Cerrahi ve Travma:</strong> Acil müdahale ve rutin operasyonlar (fıtık, apandisit vb.) modern ünitelerde yapılmaktadır.</li>
                        <li><strong>Diyaliz Ünitesi:</strong> Kronik böbrek hastaları için dürüst ve düzenli bir bakım hizmeti sunulur.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Tunceli; <strong>açık kalp cerrahisi</strong>, <strong>saç ekimi</strong> veya <strong>organ nakli</strong> gibi ileri uzmanlık alanlarında bir merkez değildir. Bu tür vakalar için hastalar genellikle 1.5 saat mesafedeki Elazığ Fırat Üniversitesi'ne koordine edilir.</p>
                </div>`
            }
        },
        thermal: {
            tr: {
                hospName: "Pülümür ve Nazımiye Doğal Kaynakları",
                analysis: `<div class="analysis-content"><p>Tunceli'de profesyonel bir termal tesis bulunmamaktadır. Ancak bölgedeki doğal su kaynakları, yerel halk tarafından sindirim sistemi rahatsızlıkları için dürüst bir takviye olarak bilinir.</p></div>`
            }
        },
        care: {
            img: "https://via.placeholder.com/400x250?text=Munzur+Vadisi+Hava",
            tr: {
                hospName: "Munzur Vadisi Doğal Rehabilitasyon",
                analysis: `
                <div class="analysis-content">
                    <h3 style="color:#27ae60;">🌟 DOĞANIN REÇETESİ: MUNZUR</h3>
                    <p>Tunceli, <strong>Munzur Vadisi</strong>'nin sunduğu inanılmaz hava kalitesiyle, ameliyat sonrası <strong>zihinsel arınma</strong> ve solunum desteği için dürüst bir cennettir.</p>
                    
                    <h4>🌬️ Akciğer ve Ruh Sağlığı</h4>
                    <p>Nem oranının düşüklüğü ve yüksek oksijen, <strong>koah</strong> hastalarının nefes kapasitesini dürüstçe artırır. Şehirdeki huzur, post-travmatik iyileşme için eşsizdir.</p>
                </div>`
            }
        },
        spa: {
            tr: {
                hospName: "Nehir Kıyısı Wellness",
                analysis: `<div class="analysis-content"><p>Tunceli'de SPA kültürü, Munzur çayı kıyısındaki doğal yürüyüş yolları ve buz gibi suyun sunduğu doğal "cold-plunge" (soğuk duş) terapisi ile sınırlıdır.</p></div>`
            }
        }
    },
    "SANLIURFA": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Sanliurfa+Sehir+Hastanesi",
            phone: "+90 414 317 21 00",
            tr: {
                hospName: "Harran Üniversitesi Tıp Fakültesi ve Şanlıurfa Şehir Hastanesi",
                analysis: `
                <div class="analysis-content">
                    <h3 style="color:#e67e22;">🌟 MEZOPOTAMYA'NIN CERRAHİ VE ESTETİK ÜSSÜ</h3>
                    <p><strong>SANLIURFA</strong>, bölgenin en büyük sağlık komplekslerinden birine sahip olup, özellikle Ortadoğu ülkelerinden gelen hastalar için dürüst bir çekim merkezidir.</p>
                    
                    <h4>💎 Öne Çıkan Uzmanlık Alanları</h4>
                    <ul>
                        <li><strong>👁️ Göz Cerrahisi:</strong> Şehirde göz üzerine uzmanlaşmış devasa klinikler bulunur; <strong>akıllı lens</strong> ve lazer operasyonlarında bölge lideridir.</li>
                        <li><strong>🦷 Diş Sağlığı ve İmplant:</strong> Şanlıurfa, modern diş hastaneleriyle <strong>implant</strong> ve estetik gülüş tasarımında dürüst fiyatlar ve yüksek kalite sunar.</li>
                        <li><strong>💇‍♂️ Saç Ekimi:</strong> Güneydoğu'nun en aktif saç ekim merkezlerinden biridir; profesyonel ekipler dürüst sonuçlar üretir.</li>
                        <li><strong>❤️ Kardiyoloji:</strong> Anjiyo ve stent uygulamalarında bölgedeki en yüksek vaka tecrübesine sahip şehirlerden biridir.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Şanlıurfa cerrahide çok güçlüdür. Ancak iklimin aşırı sıcak olması nedeniyle, ameliyat sonrası iyileşme süreci için yaz ayları yerine ilkbahar ve sonbahar dönemleri dürüstçe daha uygun görülmektedir.</p>
                </div>`
            }
        },
        thermal: {
            img: "https://via.placeholder.com/400x250?text=Sanliurfa+Karaali+Termal",
            phone: "+90 414 339 11 01",
            tr: {
                hospName: "Karaali Kaplıcaları",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#2980b9;">♨️ ROMATİZMA VE CİLT ŞİFASI: KARAALİ</h4>
                    <p>Şanlıurfa'daki Karaali kaplıcaları, mineral zenginliğiyle İç Anadolu ve Ege'deki büyük merkezlerle dürüstçe yarışır.</p>
                    
                    <h4>🧪 Şifa Alanları</h4>
                    <ul>
                        <li><strong>Romatizmal Ağrılar:</strong> Eklem kireçlenmesi ve bel ağrılarında su içi egzersizlerle dürüst bir rahatlama sağlar.</li>
                        <li><strong>Cilt Tedavisi:</strong> Suyun yapısı, <strong>akne ve deri döküntüleri</strong> için dürüst bir temizleyicidir.</li>
                    </ul>
                </div>`
            }
        },
        care: {
            tr: {
                hospName: "Geriatri ve Manevi Destek",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#27ae60;">🧘 PEYGAMBERLER ŞEHRİNDE HUZUR</h4>
                    <p>Urfa'nın manevi atmosferi, yaşlı bakımı ve <strong>palyatif bakım</strong> hastaları için dürüst bir psikolojik destek unsuru oluşturur. Şehir hastanesi bünyesindeki bakım üniteleri en üst teknolojidedir.</p>
                </div>`
            }
        },
        spa: {
            tr: {
                hospName: "Otantik Hamam ve Sabun Terapisi",
                analysis: `<div class="analysis-content"><p>Şanlıurfa'da SPA, tarihi Gümrük Hanı çevresindeki hamamlarda, bölgeye özgü saf zeytinyağı sabunlarıyla yapılan geleneksel bir wellness deneyimidir.</p></div>`
            }
        }
    },
    "USAK": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Usak+EAH",
            phone: "+90 276 223 33 00",
            tr: {
                hospName: "Uşak Eğitim ve Araştırma Hastanesi",
                analysis: `
                <div class="analysis-content">
                    <p><strong>USAK</strong>, Ege Bölgesi'nin iç kesimlerinde, özellikle ortopedik ve genel cerrahi alanlarında dürüst bir hizmet kapasitesine sahiptir.</p>
                    
                    <h4>🔍 Cerrahi Mevcut Durum</h4>
                    <ul>
                        <li><strong>Ortopedi:</strong> Termal rehabilitasyon imkanlarıyla desteklenen <strong>eklem cerrahisi</strong> (diz ve kalça protezi) operasyonları başarıyla yapılmaktadır.</li>
                        <li><strong>Genel Cerrahi:</strong> Laparoskopik yöntemlerle yapılan fıtık ve safra kesesi ameliyatları rutindir.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Uşak; <strong>saç ekimi</strong> veya ileri <strong>onkolojik cerrahi</strong> için büyük bir merkez değildir. Bu tür vakalar genellikle 1.5 saat mesafedeki Afyonkarahisar veya İzmir'e koordine edilir.</p>
                </div>`
            }
        },
        thermal: {
            img: "https://via.placeholder.com/400x250?text=Usak+Kayaagil+Termal",
            phone: "+90 276 223 39 10",
            tr: {
                hospName: "Kayağıl ve Hamamboğazı Kaplıcaları",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#2980b9;">♨️ MİNERAL ZENGİNİ REHABİLİTASYON</h4>
                    <p>Uşak'ın termal suları, yüksek kükürt ve sodyum içeriğiyle Ege'nin en dürüst şifa duraklarından biridir.</p>
                    
                    <h4>🧪 Şifa Alanları</h4>
                    <ul>
                        <li><strong>Fizik Tedavi:</strong> Hamamboğazı suları, <strong>felç sonrası rehabilitasyon</strong> ve kas hastalıklarında dürüst bir destek sunar.</li>
                        <li><strong>Cilt Şifası:</strong> Kükürtlü yapısı sayesinde <strong>kronik egzama</strong> ve akne problemlerinde tedavi edicidir.</li>
                    </ul>
                </div>`
            }
        },
        care: {
            tr: {
                hospName: "Sakin Şehir Rehabilitasyonu",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#27ae60;">🏔️ TEMİZ HAVA VE SÜKUNET</h4>
                    <p>Uşak'ın nemsiz ve temiz havası, özellikle <strong>kalp ve damar ameliyatları sonrası</strong> hastaların dinlenmesi ve akciğerlerini toparlaması için dürüst bir ortam sunar.</p>
                </div>`
            }
        },
        spa: {
            tr: {
                hospName: "Termal Wellness",
                analysis: `<div class="analysis-content"><p>Uşak'ta SPA, Kayağıl bölgesindeki tesislerde termal suyun dinlendirici etkisiyle harmanlanan klasik masaj hizmetleri üzerine odaklanmıştır.</p></div>`
            }
        }
    },
    "VAN": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Van+YYU+Dursun+Odabas",
            phone: "+90 432 215 04 70",
            tr: {
                hospName: "Van Yüzüncü Yıl Üniversitesi Dursun Odabaş Tıp Merkezi ve Van Eğitim Araştırma Hastanesi",
                analysis: `
                <div class="analysis-content">
                    <h3 style="color:#e67e22;">🌟 DOĞU'NUN ULUSLARARASI SAĞLIK ÜSSÜ</h3>
                    <p><strong>VAN</strong>, devasa tıp fakültesi ve bölge hastaneleriyle sadece Doğu Anadolu'nun değil, komşu ülkelerin de en önemli cerrahi merkezidir.</p>
                    
                    <h4>💎 Öne Çıkan Uzmanlık Alanları</h4>
                    <ul>
                        <li><strong>❤️ Kalp ve Damar Cerrahisi:</strong> Bypass ve kompleks kapak ameliyatlarında bölgenin en yüksek vaka tecrübesine ve dürüst başarı oranına sahiptir.</li>
                        <li><strong>🧬 Organ Nakli:</strong> Böbrek nakli konusunda dürüstçe uluslararası standartlarda bir başarı grafiği çizen akademik bir kadro mevcuttur.</li>
                        <li><strong>👁️ Göz Cerrahisi:</strong> Retina hastalıkları ve katarakt operasyonlarında bölgenin en teknolojik merkezidir.</li>
                        <li><strong>🦷 Diş Estetiği ve Saç Ekimi:</strong> Son yıllarda artan taleple birlikte, <strong>saç ekimi</strong> ve <strong>implant</strong> tedavilerinde dürüst ve modern klinikler gelişmiştir.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Van cerrahide bir devdir. Ancak kış aylarında ulaşım şartları ve rakım, kalp hastaları için ameliyat sonrası süreçte dikkat edilmesi gereken bir unsurdur. Tıbbi teknoloji olarak hiçbir eksiği yoktur.</p>
                </div>`
            }
        },
        thermal: {
            img: "https://via.placeholder.com/400x250?text=Van+Erciis+Kaplica",
            tr: {
                hospName: "Erciş Çermik ve Başkale Kaplıcaları",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#2980b9;">♨️ VOLKANİK ŞİFA: ERCİŞ</h4>
                    <p>Van Gölü havzasının volkanik yapısından gelen termal sular, dürüst bir mineral yoğunluğuna sahiptir.</p>
                    
                    <h4>🧪 Şifa Alanları</h4>
                    <p>Özellikle <strong>kronik romatizma</strong> ve <strong>kadın hastalıkları</strong> üzerinde etkili olan bu sular, bölge halkı ve çevre illerden gelenler için dürüst bir tedavi desteği sağlar.</p>
                </div>`
            }
        },
        care: {
            img: "https://via.placeholder.com/400x250?text=Van+Golu+Hava",
            tr: {
                hospName: "Van Gölü (Denizi) İklim Terapisi",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#27ae60;">🌊 SODALI GÖL VE NEFES</h4>
                    <p>Van Gölü'nün sodalı suyu ve çevresindeki yüksek iyot oranı, <strong>cilt hastalıkları</strong> ve <strong>üst solunum yolu</strong> enfeksiyonları sonrası iyileşme için dürüst bir doğal ilaçtır.</p>
                </div>`
            }
        },
        spa: {
            tr: {
                hospName: "Modern Göl Wellness",
                analysis: `<div class="analysis-content"><p>Van'daki beş yıldızlı oteller, Van Gölü manzarası eşliğinde sunulan modern SPA, Türk hamamı ve medikal masaj hizmetleriyle bölgenin en lüks wellness imkanlarını sunar.</p></div>`
            }
        }
    },
    "YOZGAT": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Yozgat+Sehir+Hastanesi",
            phone: "+90 354 212 10 10",
            tr: {
                hospName: "Yozgat Şehir Hastanesi ve Bozok Üniversitesi Tıp Fakültesi",
                analysis: `
                <div class="analysis-content">
                    <h3 style="color:#e67e22;">🌟 TÜRKİYE'NİN İLK ŞEHİR HASTANESİ DİSİPLİNİ</h3>
                    <p><strong>YOZGAT</strong>, Türkiye'deki "Şehir Hastanesi" modelinin öncüsüdür ve bu sayede cerrahi süreçlerde dürüst, hızlı ve dijital bir yönetim sistemine sahiptir.</p>
                    
                    <h4>💎 Öne Çıkan Uzmanlık Alanları</h4>
                    <ul>
                        <li><strong>🦴 Ortopedi ve Rehabilitasyon:</strong> Modern hastane altyapısı ile birleşen <strong>fizik tedavi robotları</strong>, eklem ameliyatları sonrası dürüst bir iyileşme sağlar.</li>
                        <li><strong>🩸 Genel Cerrahi:</strong> Laparoskopik (kapalı) yöntemle yapılan obezite ve safra kesesi ameliyatlarında bölgenin güvenilir adresidir.</li>
                        <li><strong>🦷 Diş Sağlığı:</strong> Modern ünitelerde implant ve temel estetik operasyonlar dürüst fiyatlarla sunulmaktadır.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Yozgat, modern bir hastane altyapısına sahip olsa da; <strong>saç ekimi</strong> veya <strong>organ nakli</strong> gibi çok ileri uzmanlık gerektiren vakalar genellikle 2 saat mesafedeki Ankara'ya yönlendirilir.</p>
                </div>`
            }
        },
        thermal: {
            img: "https://via.placeholder.com/400x250?text=Yozgat+Sarikkaya+Roma+Hamami",
            phone: "+90 354 714 10 32",
            tr: {
                hospName: "Sarıkaya Roma Hamamı (Basilica Therma) ve Sorgun Kaplıcaları",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#2980b9;">♨️ 2000 YILLIK DİRİLİŞ SUYU: SARIKAYA</h4>
                    <p>Dünyanın en eski termal tedavi merkezlerinden biri olan Sarıkaya, UNESCO geçici miras listesindedir.</p>
                    
                    <h4>🧪 Şifa Alanları</h4>
                    <ul>
                        <li><strong>Kronik Romatizma:</strong> Suyun florürlü yapısı, antik çağlardan beri <strong>kireçlenme</strong> ve eklem iltihaplarında dürüst bir şifacıdır.</li>
                        <li><strong>Cilt Yenileme:</strong> Doğal sıcaklığıyla deri altı kan dolaşımını hızlandırır ve hücre yenilenmesini destekler.</li>
                    </ul>
                </div>`
            }
        },
        care: {
            tr: {
                hospName: "Dijital Takipli Bakım Üniteleri",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#27ae60;">🏥 TEKNOLOJİK NEKAHET</h4>
                    <p>Yozgat Şehir Hastanesi, "HIMSS 7" (Tam Dijital Hastane) unvanıyla, ameliyat sonrası hastaların medikal takibini en dürüst ve hatasız şekilde yapan nadir merkezlerdendir.</p>
                </div>`
            }
        },
        spa: {
            tr: {
                hospName: "Antik Termal Spa",
                analysis: `<div class="analysis-content"><p>Sorgun ve Sarıkaya bölgelerindeki tesislerde, termal suyun gücüyle harmanlanan geleneksel masaj ve çamur terapileri mevcuttur.</p></div>`
            }
        }
    },
    "ZONGULDAK": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Zonguldak+BEÜ+Tip",
            phone: "+90 372 261 20 00",
            tr: {
                hospName: "Zonguldak Bülent Ecevit Üni. Tıp Fakültesi ve Atatürk Devlet Hastanesi",
                analysis: `
                <div class="analysis-content">
                    <h3 style="color:#e67e22;">🌟 AKCİĞER VE MESLEK HASTALIKLARI ÜSSÜ</h3>
                    <p><strong>ZONGULDAK</strong>, maden sanayisinin getirdiği birikimle solunum yolları ve akciğer cerrahisinde Türkiye'nin en tecrübeli akademik kadrolarından birine sahiptir.</p>
                    
                    <h4>💎 Öne Çıkan Uzmanlık Alanları</h4>
                    <ul>
                        <li><strong>🫁 Göğüs Cerrahisi:</strong> Akciğer tümörleri, <strong>KOAH</strong> cerrahisi ve amfizem ameliyatlarında dürüstçe en yüksek vaka tecrübesine sahip şehirlerden biridir.</li>
                        <li><strong>🦾 Mikro Cerrahi ve Travma:</strong> Sanayi ve maden kazalarına yönelik acil müdahale ve mikro cerrahi operasyonlarında uzmanlaşmıştır.</li>
                        <li><strong>🦷 Diş Hekimliği:</strong> Modern fakülte bünyesinde <strong>çene cerrahisi</strong> ve implant tedavileri dürüst standartlarda sunulur.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Zonguldak; <strong>saç ekimi</strong> veya <strong>VIP estetik turizmi</strong> için bir merkez değildir. Odak noktası tamamen medikal cerrahi ve solunum sağlığıdır.</p>
                </div>`
            }
        },
        thermal: {
            img: "https://via.placeholder.com/400x250?text=Zonguldak+Gokcebey+Kaplica",
            tr: {
                hospName: "Gökçebey ve Kozlu Ilıcaları",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#2980b9;">♨️ YEREL ŞİFA KAYNAKLARI</h4>
                    <p>Zonguldak çevresindeki ılıcalar, kükürtlü yapısıyla özellikle <strong>cilt kaşıntıları</strong> ve hafif eklem ağrıları için dürüst bir destekçidir.</p>
                </div>`
            }
        },
        care: {
            img: "https://via.placeholder.com/400x250?text=Zonguldak+Gokgol+Magarasi",
            tr: {
                hospName: "Gökgöl Mağarası Haloterapi (Tuz Terapisi)",
                analysis: `
                <div class="analysis-content">
                    <h3 style="color:#27ae60;">🌟 DÜNYACA ÜNLÜ MAĞARA REHABİLİTASYONU</h3>
                    <p>Zonguldak, Türkiye'nin en önemli <strong>mağara terapisi</strong> (Speleoterapi) merkezidir.</p>
                    
                    <h4>🌬️ Nefes Açan Şifa</h4>
                    <p>Gökgöl Mağarası'nın sahip olduğu mikro-klima, sabit sıcaklık ve nem oranı; <strong>astım, kronik bronşit</strong> ve nefes darlığı çeken hastalar için dürüst bir doğal ilaçtır. Ameliyat sonrası akciğer kapasitesini artırmada eşsizdir.</p>
                </div>`
            }
        },
        spa: {
            tr: {
                hospName: "Endüstriyel Wellness",
                analysis: `<div class="analysis-content"><p>Şehir merkezindeki otellerde, günün yorgunluğunu atmaya yönelik profesyonel sauna ve buhar odası hizmetleri mevcuttur.</p></div>`
            }
        }
    },
    "AKSARAY": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Aksaray+Egitim+Arastirma",
            phone: "+90 382 502 20 00",
            tr: {
                hospName: "Aksaray Eğitim ve Araştırma Hastanesi",
                analysis: `
                <div class="analysis-content">
                    <h3 style="color:#e67e22;">🌟 İÇ ANADOLU'NUN YÜKSELEN CERRAHİ ÜSSÜ</h3>
                    <p><strong>AKSARAY</strong>, özellikle son yıllarda tamamlanan modern hastane kompleksi ile cerrahide bölgenin dürüst ve güvenilir bir merkezi olmuştur.</p>
                    
                    <h4>💎 Öne Çıkan Uzmanlık Alanları</h4>
                    <ul>
                        <li><strong>🦴 Ortopedi:</strong> Yeni nesil görüntüleme sistemleri desteğiyle <strong>eklem protezi</strong> ve kırık cerrahisinde yüksek başarı oranına sahiptir.</li>
                        <li><strong>🧠 Genel Cerrahi:</strong> Safra kesesi, fıtık ve obezite cerrahisinde kapalı (laparoskopik) yöntemleri dürüstçe uygulayan uzman bir kadro mevcuttur.</li>
                        <li><strong>🦷 Diş Sağlığı:</strong> Şehirdeki modern diş üniteleri, implant ve estetik dolgu işlemlerinde dürüst fiyatlı çözümler sunar.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Aksaray temel ve orta-üst cerrahide çok başarılıdır. Ancak <strong>açık kalp cerrahisi</strong> veya <strong>organ nakli</strong> gibi spesifik operasyonlar için hastalar genellikle Konya veya Ankara'daki merkezlere koordine edilir.</p>
                </div>`
            }
        },
        thermal: {
            img: "https://via.placeholder.com/400x250?text=Aksaray+Ziga+Kaplicalari",
            phone: "+90 382 453 70 70",
            tr: {
                hospName: "Ziga Kaplıcaları (Ihlara Vadisi)",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#2980b9;">♨️ IHLARA'NIN ŞİFALI DOKUSU: ZİGA</h4>
                    <p>Ihlara Vadisi'nin hemen girişinde yer alan Ziga suları, mineral yoğunluğu bakımından Avrupa'nın sayılı kaynaklarından biridir.</p>
                    
                    <h4>🧪 Şifa Alanları</h4>
                    <ul>
                        <li><strong>Romatizmal Hastalıklar:</strong> Suyun kalsiyum ve magnezyum dengesi, <strong>eklem iltihaplarını</strong> ve ağrılarını dürüstçe dindirir.</li>
                        <li><strong>Metabolizma Desteği:</strong> İçme kürü olarak kullanıldığında mide ve bağırsak hareketlerini düzenleyici etkisi mevcuttur.</li>
                    </ul>
                </div>`
            }
        },
        care: {
            tr: {
                hospName: "Vadi ve Doğa Rehabilitasyonu",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#27ae60;">🌿 IHLARA NEFESİ</h4>
                    <p>Aksaray, Ihlara Vadisi'nin sunduğu yüksek oksijen ve mikro-klima sayesinde, <strong>astım</strong> hastaları ve ameliyat sonrası dinlenme ihtiyacı olanlar için dürüst bir nekahet alanıdır.</p>
                </div>`
            }
        },
        spa: {
            tr: {
                hospName: "Termal Wellness & Çamur Terapi",
                analysis: `<div class="analysis-content"><p>Ziga bölgesindeki tesislerde sunulan doğal termal çamur banyoları, cildi toksinlerden arındırmak ve gözenekleri sıkılaştırmak için dürüst bir yöntemdir.</p></div>`
            }
        }
    },
    "BAYBURT": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Bayburt+Devlet+Hastanesi",
            phone: "+90 458 211 91 91",
            tr: {
                hospName: "Bayburt Devlet Hastanesi",
                analysis: `
                <div class="analysis-content">
                    <p><strong>BAYBURT</strong>, temel sağlık hizmetlerini dürüstçe sunan, sakin ve butik bir sağlık yapısına sahiptir.</p>
                    
                    <h4>🔍 Mevcut Kapasite</h4>
                    <ul>
                        <li><strong>Dahiliye ve Genel Cerrahi:</strong> Rutin kontrol ve standart operasyonlar modern poliklinik şartlarında yapılmaktadır.</li>
                        <li><strong>Acil Müdahale:</strong> Bölgedeki yol ağları üzerinde kritik bir noktada olması nedeniyle travma müdahalelerinde hızlı bir yapıya sahiptir.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Bayburt; <strong>saç ekimi</strong>, <strong>diş estetiği</strong> veya ileri <strong>kardiyovasküler cerrahi</strong> merkezi değildir. Kompleks vakalar genellikle 1.5 saat mesafedeki Erzurum veya Trabzon'daki üniversite hastanelerine sevk edilir.</p>
                </div>`
            }
        },
        thermal: {
            tr: {
                hospName: "Bayburt Yerel Kaynakları",
                analysis: `<div class="analysis-content"><p>Bayburt'ta şu an için profesyonel, konaklamalı bir medikal termal tesis bulunmamaktadır; yerel kaynaklar daha çok günübirlik kullanım içindir.</p></div>`
            }
        },
        care: {
            img: "https://via.placeholder.com/400x250?text=Bayburt+Havası",
            tr: {
                hospName: "Zihinsel Arınma ve Yayla Havası",
                analysis: `
                <div class="analysis-content">
                    <h3 style="color:#27ae60;">🌟 HUZURUN MERKEZİ</h3>
                    <p>Bayburt, kalabalıktan uzak yapısı ve tertemiz havasıyla <strong>psikolojik rehabilitasyon</strong> ve ameliyat sonrası zihinsel dinlenme için dürüst bir seçenektir.</p>
                    
                    <h4>🌬️ Akciğer Detoksu</h4>
                    <p>Yüksek rakımlı yaylalarındaki düşük nem ve sıfır sanayi kirliliği, solunum yolları için doğal bir iyileşme sağlar.</p>
                </div>`
            }
        },
        spa: {
            tr: {
                hospName: "Geleneksel Hamam Kültürü",
                analysis: `<div class="analysis-content"><p>Bayburt'ta wellness deneyimi, şehir merkezindeki tarihi ve modern hamamlarda sunulan geleneksel banyo hizmetleri ile sınırlıdır.</p></div>`
            }
        }
    },
    "KARAMAN": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Karaman+Egitim+Arastirma",
            phone: "+90 338 226 30 00",
            tr: {
                hospName: "Karaman Eğitim ve Araştırma Hastanesi",
                analysis: `
                <div class="analysis-content">
                    <p><strong>KARAMAN</strong>, temel cerrahi branşlarda güvenilir ve dürüst bir hizmet kapasitesine sahip, sakin bir Anadolu şehridir.</p>
                    
                    <h4>🔍 Cerrahi Yetkinlikler</h4>
                    <ul>
                        <li><strong>Genel Cerrahi:</strong> Laparoskopik (kapalı) yöntemle yapılan safra kesesi ve fıtık ameliyatlarında tecrübelidir.</li>
                        <li><strong>Ortopedi:</strong> Temel protez ameliyatları ve travma cerrahisi başarıyla uygulanmaktadır.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Karaman; <strong>saç ekimi</strong>, <strong>karmaşık onkolojik cerrahi</strong> veya <strong>organ nakli</strong> için bir merkez değildir. Bu tür vakalar genellikle 1 saat mesafedeki Konya'daki dev üniversite hastanelerine yönlendirilir.</p>
                </div>`
            }
        },
        thermal: {
            tr: {
                hospName: "Karaman Yerel Kaynakları",
                analysis: `<div class="analysis-content"><p>Karaman'da profesyonel anlamda büyük bir termal tesis bulunmamaktadır; ancak bölgedeki bazı yerel sular halk arasında sindirim sistemi için dürüst bir yardımcı olarak kullanılır.</p></div>`
            }
        },
        care: {
            tr: {
                hospName: "Huzurlu Nekahet Alanları",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#27ae60;">🧘 SESSİZ İYİLEŞME</h4>
                    <p>Karaman, düşük nem oranı ve gürültüden uzak yapısıyla, ameliyat sonrası <strong>zihinsel dinlenme</strong> ve yaşlı bakımı için dürüst ve ekonomik bir tercihtir.</p>
                </div>`
            }
        },
        spa: {
            tr: {
                hospName: "Geleneksel Hamam Hizmetleri",
                analysis: `<div class="analysis-content"><p>Karaman'da wellness hizmetleri, şehir merkezindeki tarihi Selçuklu mimarisini yaşatan hamamlarda sunulan klasik hizmetlerle sınırlıdır.</p></div>`
            }
        }
    },
    "KIRIKKALE": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Kirikkale+Uni+Tip",
            phone: "+90 318 225 24 85",
            tr: {
                hospName: "Kırıkkale Üniversitesi Tıp Fakültesi ve Yüksek İhtisas Hastanesi",
                analysis: `
                <div class="analysis-content">
                    <h3 style="color:#e67e22;">🌟 TRAVMA VE ACİL CERRAHİ ÜSSÜ</h3>
                    <p><strong>KIRIKKALE</strong>, Türkiye'nin ulaşım kavşağında yer alması sebebiyle travma cerrahisinde dürüstçe en yüksek vaka tecrübesine sahip şehirlerden biridir.</p>
                    
                    <h4>💎 Öne Çıkan Uzmanlık Alanları</h4>
                    <ul>
                        <li><strong>🦴 Travma Cerrahisi:</strong> Ağır kazalar ve yaralanmalar sonrası yapılan <strong>rekonstrüktif cerrahi</strong> operasyonlarında dürüst bir otoritedir.</li>
                        <li><strong>🧠 Nöroşirürji:</strong> Beyin kanamaları ve omurga cerrahisinde üniversite kadrosuyla Ankara standartlarında hizmet verir.</li>
                        <li><strong>❤️ Kalp ve Damar Cerrahisi:</strong> Bypass ve anjiyo işlemlerinde bölgedeki en yoğun ve dürüst merkezlerden biridir.</li>
                        <li><strong>🦷 Diş Hekimliği:</strong> Üniversite bünyesindeki modern kliniklerde <strong>çene cerrahisi</strong> ve implant tedavileri dürüstçe uygulanır.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Kırıkkale cerrahide çok güçlüdür; ancak şehirde <strong>saç ekimi</strong> veya <strong>VIP estetik turizmi</strong> pek gelişmemiştir. Odak noktası tamamen hayat kurtaran medikal cerrahidir.</p>
                </div>`
            }
        },
        thermal: {
            tr: {
                hospName: "Kırıkkale Şifalı Su Kaynakları",
                analysis: `<div class="analysis-content"><p>İl genelinde profesyonel termal otel konsepti yaygın değildir; ancak bazı yerel kaynaklar cilt rahatsızlıkları için dürüst birer yardımcıdır.</p></div>`
            }
        },
        care: {
            tr: {
                hospName: "Klinik Rehabilitasyon",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#27ae60;">🏥 ANKARA'YA ALTERNATİF BAKIM</h4>
                    <p>Ankara'daki hastanelerin yoğunluğundan kaçan hastalar için Kırıkkale, ameliyat sonrası takip ve <strong>klinik rehabilitasyon</strong> süreçlerinde daha dürüst ve hızlı bir alternatif sunar.</p>
                </div>`
            }
        },
        spa: {
            tr: {
                hospName: "Şehir Otelleri Wellness",
                analysis: `<div class="analysis-content"><p>Kırıkkale'deki modern otellerde sunulan sauna ve fitness hizmetleri, daha çok iş seyahati yapanların dinlenmesine yönelik tasarlanmıştır.</p></div>`
            }
        }
    },
    "BATMAN": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Batman+Egitim+Arastirma",
            phone: "+90 488 213 10 00",
            tr: {
                hospName: "Batman Eğitim ve Araştırma Hastanesi ve Bölge Özel Hastaneleri",
                analysis: `
                <div class="analysis-content">
                    <h3 style="color:#e67e22;">🌟 GÜNEYDOĞU'NUN ÖZEL SAĞLIK ÜSSÜ</h3>
                    <p><strong>BATMAN</strong>, nüfusuna oranla en fazla özel hastane ve cerrahi merkez yatırımı alan şehirlerden biridir. Bölgenin sağlık lojistiğinde dürüst bir devdir.</p>
                    
                    <h4>💎 Öne Çıkan Uzmanlık Alanları</h4>
                    <ul>
                        <li><strong>❤️ Kardiyoloji ve KVC:</strong> Batman, anjiyo ve bypass operasyonlarında bölgenin en yüksek vaka tecrübesine sahip, dürüst sonuçlar alan merkezlerindendir.</li>
                        <li><strong>👃 Estetik Cerrahi:</strong> Özellikle <strong>burun estetiği (rinoplasti)</strong> ve vücut şekillendirmede çevre illerden ve yurtdışından hasta kabul eden uzman klinikleri mevcuttur.</li>
                        <li><strong>🦷 Diş İmplant ve Estetik:</strong> Modern diş hastaneleri, en son teknolojiyle <strong>Zirkonyum</strong> ve implant tedavilerini İstanbul kalitesinde sunar.</li>
                        <li><strong>💇‍♂️ Saç Ekimi:</strong> Şehirde profesyonel ekiplerce yönetilen, dürüst fiyat politikasına sahip saç ekim merkezleri parlayan bir sektördür.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Batman cerrahide çok hızlı ve pratiktir. Ancak çok çok spesifik <strong>çocuk onkolojisi</strong> veya nadir genetik hastalıklar için hastalar genellikle Diyarbakır veya Ankara'daki üniversite hastanelerine yönlendirilir.</p>
                </div>`
            }
        },
        thermal: {
            tr: {
                hospName: "Batman Şifalı Su Kaynakları",
                analysis: `<div class="analysis-content"><p>Batman'da henüz Mardin veya Siirt'teki gibi büyük bir termal tesisleşme yoktur; ancak yerel kaynaklar cilt hastalıkları için halk arasında dürüst bir yardımcı olarak kullanılır.</p></div>`
            }
        },
        care: {
            tr: {
                hospName: "Yeni Nesil Bakım Üniteleri",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#27ae60;">🏥 MODERN REHABİLİTASYON</h4>
                    <p>Batman'daki yeni hastane kompleksleri, ameliyat sonrası <strong>palyatif bakım</strong> ve fizik tedavi süreçlerinde bölgedeki en dürüst ve donanımlı hizmeti sunan merkezler arasındadır.</p>
                </div>`
            }
        },
        spa: {
            tr: {
                hospName: "Modern Wellness Merkezleri",
                analysis: `<div class="analysis-content"><p>Batman'daki beş yıldızlı oteller, bölge iş dünyasına ve sağlık turistlerine yönelik modern SPA, hamam ve sauna hizmetlerini yüksek standartta sunar.</p></div>`
            }
        }
    },
    "SIRNAK": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Sirnak+Devlet+Hastanesi",
            phone: "+90 486 216 10 33",
            tr: {
                hospName: "Şırnak Devlet Hastanesi",
                analysis: `
                <div class="analysis-content">
                    <p><strong>SIRNAK</strong>, zorlu coğrafyasında temel sağlık ve acil cerrahi hizmetlerini dürüstçe sunan, altyapısı sürekli güçlendirilen bir şehrimizdir.</p>
                    
                    <h4>🔍 Cerrahi Mevcut Durum</h4>
                    <ul>
                        <li><strong>Travma Cerrahisi:</strong> Acil vakalar ve genel cerrahi operasyonlarında deneyimli bir ekip görev yapmaktadır.</li>
                        <li><strong>Göz Sağlığı:</strong> Temel katarakt ve rutin göz ameliyatları başarıyla uygulanmaktadır.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Şırnak; <strong>saç ekimi</strong>, <strong>diş estetiği</strong> veya ileri düzey <strong>beyin cerrahisi</strong> için bir merkez değildir. Bu tür vakalar genellikle Batman veya Diyarbakır'a sevk edilir.</p>
                </div>`
            }
        },
        thermal: {
            img: "https://via.placeholder.com/400x250?text=Sirnak+Belkis+Ana+Termal",
            phone: "+90 486 518 10 10",
            tr: {
                hospName: "Güçlükonak Belkıs Ana Kaplıcası ve Cizre Kaynakları",
                analysis: `
                <div class="analysis-content">
                    <h3 style="color:#2980b9;">🌟 TARİHİ ŞİFA: BELKIS ANA</h3>
                    <p>Şırnak Güçlükonak'taki Belkıs Ana kaplıcası, Mezopotamya'nın en dürüst ve en eski termal kaynaklarından biridir.</p>
                    
                    <h4>🧪 Hangi Hastalıklara İyi Gelir?</h4>
                    <ul>
                        <li><strong>Kadın Hastalıkları:</strong> Bölgede yüzyıllardır kadın hastalıkları ve kısırlık tedavisine destek olarak kullanılan dürüst bir sudur.</li>
                        <li><strong>Romatizma:</strong> Suyun radyoaktif ve mineral yapısı, <strong>eklem ağrılarını</strong> dindirmede dürüst bir etki sağlar.</li>
                    </ul>
                </div>`
            }
        },
        care: {
            tr: {
                hospName: "Kuru İklim Terapisi",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#27ae60;">☀️ D VİTAMİNİ VE ROMATİZMA KONFORU</h4>
                    <p>Şırnak'ın nemsiz ve kuru sıcağı, özellikle <strong>iltihaplı romatizma</strong> hastaları için eklem ağrılarının minimize edildiği dürüst bir iklimsel avantaj sunar.</p>
                </div>`
            }
        },
        spa: {
            tr: {
                hospName: "Geleneksel Termal Hamam",
                analysis: `<div class="analysis-content"><p>Şırnak'ta SPA yerine, termal suyun çıktığı bölgelerdeki geleneksel taş hamamlarda sunulan doğal şifa seansları ön plandadır.</p></div>`
            }
        }
    },
    "BARTIN": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Bartin+Devlet+Hastanesi",
            phone: "+90 378 227 15 51",
            tr: {
                hospName: "Bartın Devlet Hastanesi",
                analysis: `
                <div class="analysis-content">
                    <p><strong>BARTIN</strong>, Batı Karadeniz'de temel ve orta ölçekli cerrahi operasyonların dürüstçe yapıldığı modern bir altyapıya sahiptir.</p>
                    
                    <h4>🔍 Cerrahi Mevcut Durum</h4>
                    <ul>
                        <li><strong>Genel Cerrahi:</strong> Laparoskopik fıtık ve safra kesesi operasyonlarında güvenilir bir hizmet sunulur.</li>
                        <li><strong>Göz Sağlığı:</strong> Katarakt ve temel göz cerrahisinde şehirdeki üniteler oldukça aktiftir.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Bartın; <strong>saç ekimi</strong>, <strong>diş estetiği</strong> veya ileri <strong>kardiyovasküler cerrahi</strong> için bir ana merkez değildir. Kompleks ameliyatlar genellikle 1 saat mesafedeki Zonguldak Bülent Ecevit Üniversitesi Hastanesi'ne yönlendirilir.</p>
                </div>`
            }
        },
        thermal: {
            tr: {
                hospName: "Bartın Tuzlu Su ve Mineral Kaynakları",
                analysis: `<div class="analysis-content"><p>Bartın'da profesyonel bir termal tesis bulunmasa da, deniz suyunun mineral yoğunluğu ve yerel kaynaklar cilt yüzeyindeki tahrişleri dürüstçe rahatlatır.</p></div>`
            }
        },
        care: {
            img: "https://via.placeholder.com/400x250?text=Amasra+Hava+Rehabilitasyon",
            tr: {
                hospName: "Amasra ve İnkumu Solunum Terapisi",
                analysis: `
                <div class="analysis-content">
                    <h3 style="color:#27ae60;">🌟 AKCİĞERLERİN DOĞAL İLACI: AMASRA</h3>
                    <p>Bartın, özellikle Amasra'nın sahip olduğu yüksek iyotlu deniz havası ve orman oksijeniyle <strong>Astım, KOAH ve Bronşit</strong> rehabilitasyonu için Türkiye'nin en dürüst yıldızıdır.</p>
                    
                    <h4>🌬️ Hava Terapisi (Klimaterapi)</h4>
                    <p>Ameliyat sonrası akciğer kapasitesini artırmak isteyenler için bu bölge, nem ve oksijen dengesiyle dürüst bir iyileşme laboratuvarıdır.</p>
                </div>`
            }
        },
        spa: {
            tr: {
                hospName: "Doğa Wellness & Deniz Spa",
                analysis: `<div class="analysis-content"><p>Bartın'da SPA deneyimi, butik otellerde sunulan ve Karadeniz'in temiz havasıyla birleşen doğal bitki terapileri ve deniz tuzu masajlarından oluşur.</p></div>`
            }
        }
    },
    "ARDAHAN": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Ardahan+Devlet+Hastanesi",
            phone: "+90 478 211 30 48",
            tr: {
                hospName: "Ardahan Devlet Hastanesi",
                analysis: `
                <div class="analysis-content">
                    <p><strong>ARDAHAN</strong>, Türkiye'nin en yüksek rakımlı şehirlerinden biri olarak temel sağlık hizmetlerini dürüst ve butik bir yapıda sunar.</p>
                    
                    <h4>🔍 Cerrahi Yetkinlikler</h4>
                    <ul>
                        <li><strong>Acil ve Travma Müdahalesi:</strong> Sert iklim ve coğrafi şartlar nedeniyle acil cerrahi müdahalelerde pratik bir deneyime sahiptir.</li>
                        <li><strong>Diyaliz ve İç Hastalıkları:</strong> Şehirdeki yeni hastane binasıyla bu alanlarda dürüst bir bakım sunulmaktadır.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Ardahan; <strong>estetik cerrahi</strong>, <strong>saç ekimi</strong> veya <strong>onkolojik operasyonlar</strong> için uygun bir altyapıya sahip değildir. Bu tür vakalar genellikle 1.5 saat mesafedeki Erzurum ve Kars'taki üniversite hastanelerine koordine edilir.</p>
                </div>`
            }
        },
        thermal: {
            tr: {
                hospName: "Ardahan Yerel Şifa Kaynakları",
                analysis: `<div class="analysis-content"><p>Ardahan'da profesyonel termal tesis yoktur; ancak bölgedeki yüksek mineralli toprak yapısı ve su kaynakları yerel halk tarafından dürüst birer destekçi olarak kullanılır.</p></div>`
            }
        },
        care: {
            img: "https://via.placeholder.com/400x250?text=Ardahan+Yayla+Hava",
            tr: {
                hospName: "Yüksek Rakım ve Arı Ürünleri Terapisi",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#27ae60;">🏔️ METABOLİZMA HIZLANDIRAN RAKIM</h4>
                    <p>Ardahan'ın 1800+ rakımı, vücuttaki alyuvar üretimini dürüstçe artırır. Bu durum, ameliyat sonrası <strong>kan değerlerini toplamak</strong> isteyenler için doğal bir dopingdir.</p>
                    
                    <h4>🐝 Kafkas Arısı Şifası</h4>
                    <p>Bölgeye has Kafkas arılarından elde edilen dürüst propolis ve ballar, bağışıklık sistemini cerrahi sonrası en dürüst şekilde güçlendirir.</p>
                </div>`
            }
        },
        spa: {
            tr: {
                hospName: "Geleneksel Yayla Banyosu",
                analysis: `<div class="analysis-content"><p>Ardahan'da wellness, yüksek rakımlı yaylalarda yapılan uzun yürüyüşler ve ardından geleneksel hamam ritüelleriyle sağlanan doğal bir zindelik sürecidir.</p></div>`
            }
        }
    },
    "IGDIR": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Igdir+Devlet+Hastanesi",
            phone: "+90 476 226 03 01",
            tr: {
                hospName: "Iğdır Devlet Hastanesi",
                analysis: `
                <div class="analysis-content">
                    <p><strong>IGDIR</strong>, üç ülkeye sınırı olan stratejik konumuyla temel cerrahi branşlarda dürüst ve hızlı bir hizmet kapasitesine sahiptir.</p>
                    
                    <h4>🔍 Cerrahi Yetkinlikler</h4>
                    <ul>
                        <li><strong>Genel Cerrahi:</strong> Şehirdeki modern hastane bünyesinde rutin operasyonlar ve acil cerrahi müdahaleler başarıyla yapılmaktadır.</li>
                        <li><strong>Kadın Doğum:</strong> Bölgesel yoğunluk nedeniyle bu branşta tecrübeli bir cerrahi ekip mevcuttur.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Iğdır; <strong>saç ekimi</strong>, <strong>ileri kalp cerrahisi</strong> veya <strong>organ nakli</strong> gibi uzmanlıklar için bir merkez değildir. Bu tür vakalar genellikle Erzurum veya Van'daki bölge hastanelerine sevk edilir.</p>
                </div>`
            }
        },
        thermal: {
            tr: {
                hospName: "Iğdır Tuzluca Tuz Mağaraları",
                analysis: `<div class="analysis-content"><p>Iğdır'da termal tesis yoktur ancak Tuzluca'daki tuz mağaraları, medikal anlamda solunum yolları için Türkiye'nin en dürüst doğal tedavi alanlarından biridir.</p></div>`
            }
        },
        care: {
            img: "https://via.placeholder.com/400x250?text=Igdir+Mikroklima+Hava",
            tr: {
                hospName: "Doğu'nun Çukurova'sı: Klimaterapi",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#27ae60;">🍎 MİKRO-KLİMA ŞİFASI</h4>
                    <p>Iğdır'ın çevresindeki yüksek dağlara rağmen sahip olduğu alçak rakım ve yumuşak iklim, <strong>KOAH ve kalp hastaları</strong> için kış aylarında dürüst bir sığınaktır.</p>
                </div>`
            }
        },
        spa: {
            tr: {
                hospName: "Geleneksel Hamam Hizmetleri",
                analysis: `<div class="analysis-content"><p>Şehir merkezinde sunulan klasik hamam ve kese hizmetleri, yerel halkın ve gezginlerin tercih ettiği temel wellness imkanlarıdır.</p></div>`
            }
        }
    },
    "YALOVA": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Yalova+Egitim+Arastirma",
            phone: "+90 226 811 00 20",
            tr: {
                hospName: "Yalova Eğitim ve Araştırma Hastanesi ve Özel Uzmanlık Klinikleri",
                analysis: `
                <div class="analysis-content">
                    <h3 style="color:#e67e22;">🌟 MEDİKAL TERMAL VE FİZİK TEDAVİ BAŞKENTİ</h3>
                    <p><strong>YALOVA</strong>, cerrahi başarıyı termal rehabilitasyonla birleştiren, dünyaca ünlü bir "Sağlık Yıldızı"dır.</p>
                    
                    <h4>💎 Öne Çıkan Uzmanlık Alanları</h4>
                    <ul>
                        <li><strong>🦴 Robotik Fizik Tedavi:</strong> Ameliyat sonrası <strong>felçli hasta rehabilitasyonu</strong> ve eklem hareket kısıtlılıklarında Türkiye'nin en dürüst ve ileri merkezlerine sahiptir.</li>
                        <li><strong>🦷 Diş Turizmi:</strong> Yalova, özellikle Ortadoğu ve Avrupa'dan gelen hastalar için <strong>implant</strong> ve estetik gülüş tasarımında dürüst bir üstür.</li>
                        <li><strong>👃 VIP Estetik Cerrahi:</strong> İstanbul'a yakınlığı sayesinde, ameliyat sonrası sessiz bir iyileşme arayanlar için lüks estetik cerrahi hizmeti sunulur.</li>
                        <li><strong>💇‍♂️ Saç Ekimi:</strong> Termal otellerle entegre çalışan profesyonel saç ekim merkezleri çok gelişmiştir.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Yalova rehabilitasyonda dünya devidir. Ancak çok karmaşık <strong>beyin tümörü cerrahisi</strong> gibi vakalarda, üniversite hastanesi desteği için hastalar genellikle 45 dakika mesafedeki İstanbul veya Kocaeli'ne yönlendirilebilir.</p>
                </div>`
            }
        },
        thermal: {
            img: "https://via.placeholder.com/400x250?text=Yalova+Termal+Kaplicalari",
            phone: "+90 226 675 74 00",
            tr: {
                hospName: "Yalova Termal Tesisleri ve Armutlu Kaplıcaları",
                analysis: `
                <div class="analysis-content">
                    <h3 style="color:#2980b9;">🌟 DÜNYA SAĞLIK ÖRGÜTÜ ÖDÜLLÜ SULAR</h3>
                    <p>Yalova Termal, sodyum, kalsiyum ve florür dengesiyle "mükemmel şifa suyu" olarak tescillenmiş dürüst bir hazinedir.</p>
                    
                    <h4>🧪 Şifa Alanları</h4>
                    <ul>
                        <li><strong>Ürolojik Şifa:</strong> Armutlu suları, <strong>böbrek taşları</strong> ve idrar yolu rahatsızlıklarında içme kürleri ile dürüst sonuçlar verir.</li>
                        <li><strong>Romatizma ve Nevralji:</strong> Kas ve sinir sıkışmalarında Yalova suları dünyadaki en etkili 3 kaynaktan biri olarak gösterilir.</li>
                    </ul>
                </div>`
            }
        },
        care: {
            tr: {
                hospName: "Geriatrik ve Post-Operatif Bakım",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#27ae60;">🌿 ORMAN VE DENİZ BİRLEŞİMİNDE NEKAHET</h4>
                    <p>Yalova, hem denizden gelen iyotu hem de orman oksijenini aynı anda sunarak, ameliyat sonrası <strong>iyileşme hızını dürüstçe iki katına çıkaran</strong> bir iklime sahiptir.</p>
                </div>`
            }
        },
        spa: {
            tr: {
                hospName: "Medikal Spa & Thalasso",
                analysis: `<div class="analysis-content"><p>Yalova'da SPA, sadece rahatlama değil tedavi odaklıdır. Sülfatlı sularla yapılan banyolar ve profesyonel medikal masajlar dürüst bir yenilenme sağlar.</p></div>`
            }
        }
    },
    "KARABUK": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Karabuk+Uni+EAH",
            phone: "+90 370 415 80 00",
            tr: {
                hospName: "Karabük Üniversitesi Eğitim ve Araştırma Hastanesi",
                analysis: `
                <div class="analysis-content">
                    <p><strong>KARABUK</strong>, ağır sanayi kenti olmasının getirdiği disiplinle, son yıllarda tıp fakültesi üzerinden cerrahi kapasitesini dürüstçe artırmıştır.</p>
                    
                    <h4>🔍 Cerrahi Yetkinlikler</h4>
                    <ul>
                        <li><strong>❤️ Kardiyoloji:</strong> Sanayi çalışanlarının yoğunluğu nedeniyle kalp sağlığı ve anjiyo üniteleri oldukça gelişmiş ve tecrübelidir.</li>
                        <li><strong>🦴 Ortopedi:</strong> İş kazaları ve travma cerrahisinde dürüst bir müdahale kapasitesine sahiptir.</li>
                        <li><strong>🦷 Diş Sağlığı:</strong> Üniversite bünyesindeki modern ünitelerde rutin ve estetik diş tedavileri başarıyla uygulanmaktadır.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Karabük; <strong>saç ekimi</strong> veya <strong>ileri onkolojik robotik cerrahi</strong> için bir ana destinasyon değildir. Bu tip vakalar genellikle Ankara veya Bolu'daki merkezlere sevk edilir.</p>
                </div>`
            }
        },
        thermal: {
            tr: {
                hospName: "Eskipazar ve Yerel Şifa Kaynakları",
                analysis: `<div class="analysis-content"><p>Karabük'te profesyonel büyük bir termal tesis bulunmasa da, Eskipazar bölgesindeki yerel sular mineral yapısıyla eklem ağrıları için dürüst bir yardımcıdır.</p></div>`
            }
        },
        care: {
            img: "https://via.placeholder.com/400x250?text=Safranbolu+Huzur+Rehabilitasyon",
            tr: {
                hospName: "Safranbolu Zihinsel ve Kültürel Rehabilitasyon",
                analysis: `
                <div class="analysis-content">
                    <h3 style="color:#27ae60;">🌟 TARİHİN İÇİNDE İYİLEŞME: SAFRANBOLU</h3>
                    <p>Safranbolu, sahip olduğu tarihi doku ve sessiz yaşamıyla, ameliyat sonrası <strong>psikolojik toparlanma</strong> ve zihinsel dinlenme için dürüst bir "yıldızdır".</p>
                    
                    <h4>🌬️ Hava Kalitesi</h4>
                    <p>Bölgedeki çam ormanları ve temiz hava, özellikle kalp ve akciğer hastalarının nekahet dönemini dürüstçe hızlandırır.</p>
                </div>`
            }
        },
        spa: {
            tr: {
                hospName: "Geleneksel Safranbolu Hamamları",
                analysis: `<div class="analysis-content"><p>Karabük'te wellness, Safranbolu'nun tarihi Cinci Hamamı gibi mekanlarda sunulan geleneksel kese-köpük ve aromaterapi hizmetleriyle eşsiz bir deneyime dönüşür.</p></div>`
            }
        }
    },
    "KILIS": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Kilis+Devlet+Hastanesi",
            phone: "+90 348 813 10 10",
            tr: {
                hospName: "Kilis Prof. Dr. Alaeddin Yavaşca Devlet Hastanesi",
                analysis: `
                <div class="analysis-content">
                    <h3 style="color:#e67e22;">🌟 TRAVMA VE SAHA CERRAHİSİ TECRÜBESİ</h3>
                    <p><strong>KILIS</strong>, coğrafi konumu gereği acil cerrahi ve travma yönetiminde dürüstçe "savaş cerrahisi" düzeyinde bir hıza ve tecrübeye ulaşmıştır.</p>
                    
                    <h4>🔍 Öne Çıkan Branşlar</h4>
                    <ul>
                        <li><strong>🦾 Ortopedik Travma:</strong> Çoklu yaralanmalar ve kompleks kırıklarda hızlı ve dürüst müdahale kapasitesi çok yüksektir.</li>
                        <li><strong>🩸 Genel Cerrahi:</strong> Acil karın içi operasyonlarda şehirdeki ekipler bölge standartlarının üzerinde bir pratikliğe sahiptir.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Kilis; <strong>diş estetiği</strong>, <strong>saç ekimi</strong> veya <strong>lüks estetik operasyonlar</strong> için tasarlanmış bir şehir değildir. İleri onkoloji ve planlı büyük ameliyatlar için hastalar genellikle 45 dakika mesafedeki Gaziantep'e yönlendirilir.</p>
                </div>`
            }
        },
        thermal: {
            tr: {
                hospName: "Kilis Yerel Kaynakları",
                analysis: `<div class="analysis-content"><p>Kilis'te profesyonel bir medikal termal altyapı bulunmamaktadır.</p></div>`
            }
        },
        care: {
            tr: {
                hospName: "Zeytin ve Güneş Terapisi",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#27ae60;">🌿 DOĞAL BAĞIŞIKLIK DESTEĞİ</h4>
                    <p>Kilis'in meşhur zeytinyağı ve nemsiz kuru sıcağı, ameliyat sonrası yara iyileşmesi ve romatizmal rahatlama için dürüst bir doğal destek sunar.</p>
                </div>`
            }
        },
        spa: {
            tr: {
                hospName: "Geleneksel Kilis Hamamları",
                analysis: `<div class="analysis-content"><p>Kilis'te wellness hizmeti, bölge kültürünün parçası olan tarihi hamamlarda sunulan geleneksel banyo ve masaj ritüellerinden ibarettir.</p></div>`
            }
        }
    },
    "OSMANIYE": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Osmaniye+Devlet+Hastanesi",
            phone: "+90 328 826 12 00",
            tr: {
                hospName: "Osmaniye Devlet Hastanesi ve Özel Sevgi Hastanesi",
                analysis: `
                <div class="analysis-content">
                    <p><strong>OSMANIYE</strong>, Çukurova bölgesinde sağlık altyapısını hızla geliştiren, dürüst ve erişilebilir cerrahi hizmet sunan bir şehrimizdir.</p>
                    
                    <h4>🔍 Cerrahi Yetkinlikler</h4>
                    <ul>
                        <li><strong>Genel Cerrahi:</strong> Laparoskopik ameliyatlar ve temel onkolojik girişimler başarıyla yapılmaktadır.</li>
                        <li><strong>Kadın Doğum ve Çocuk:</strong> Bölgedeki yüksek nüfus yoğunluğu nedeniyle bu alanda tecrübeli cerrahi ekipler mevcuttur.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Osmaniye; <strong>saç ekimi</strong>, <strong>diş estetiği</strong> veya ileri <strong>organ nakli</strong> için bir ana üs değildir. Kompleks vakalar genellikle 1 saat mesafedeki Adana veya Gaziantep'e yönlendirilir.</p>
                </div>`
            }
        },
        thermal: {
            img: "https://via.placeholder.com/400x250?text=Osmaniye+Haruniye+Kaplicasi",
            phone: "+90 328 718 10 11",
            tr: {
                hospName: "Haruniye Kaplıcaları (Düziçi)",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#2980b9;">♨️ AMANOSLARIN ŞİFASI: HARUNİYE</h4>
                    <p>Berke Barajı kıyısında, Amanos Dağları'nın eteğinde yer alan Haruniye, dürüst bir mineral zenginliğine sahiptir.</p>
                    
                    <h4>🧪 Şifa Alanları</h4>
                    <ul>
                        <li><strong>Deri Hastalıkları:</strong> Suyun sülfürlü yapısı, <strong>sedef ve mantar</strong> gibi cilt sorunlarında dürüst bir kurutucu ve iyileştirici etki yapar.</li>
                        <li><strong>Romatizmal Ağrılar:</strong> Kireçlenme ve bel ağrıları için bölge halkının yüzyıllardır kullandığı dürüst bir kaynaktır.</li>
                    </ul>
                </div>`
            }
        },
        care: {
            tr: {
                hospName: "Amanos Yayla Terapisi",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#27ae60;">🌲 YAYLA HAVASI VE REHABİLİTASYON</h4>
                    <p>Osmaniye'nin yüksek rakımlı yaylaları, özellikle yaz sıcaklarında kalp hastaları ve ameliyat sonrası dinlenme ihtiyacı olanlar için dürüst bir kaçış noktasıdır.</p>
                </div>`
            }
        },
        spa: {
            tr: {
                hospName: "Doğal Termal Spa",
                analysis: `<div class="analysis-content"><p>Haruniye bölgesindeki tesislerde, doğa ile iç içe sunulan geleneksel banyo ve çamur maskesi hizmetleri mevcuttur.</p></div>`
            }
        }
    },
    "DÜZCE": {
        surgery: {
            img: "https://via.placeholder.com/400x250?text=Duzce+Uni+Tip",
            phone: "+90 380 542 13 90",
            tr: {
                hospName: "Düzce Üniversitesi Tıp Fakültesi ve Atatürk Devlet Hastanesi",
                analysis: `
                <div class="analysis-content">
                    <h3 style="color:#e67e22;">🌟 İKİ METROPOL ARASINDAKİ CERRAHİ KÖPRÜ</h3>
                    <p><strong>DUZCE</strong>, hem akademik kadrosu hem de modern hastane imkanlarıyla cerrahide dürüst bir bölge lideridir.</p>
                    
                    <h4>💎 Öne Çıkan Uzmanlık Alanları</h4>
                    <ul>
                        <li><strong>🦴 Mikro Cerrahi ve Ortopedi:</strong> El cerrahisi ve kompleks kemik ameliyatlarında bölgenin en tecrübeli akademik ekiplerinden birine sahiptir.</li>
                        <li><strong>🧠 Nöroşirürji:</strong> Bel ve boyun fıtığı operasyonlarında dürüstçe İstanbul standartlarında başarı oranları sunulur.</li>
                        <li><strong>🦷 Diş Hekimliği:</strong> Fakülte bünyesindeki <strong>Ağız ve Çene Cerrahisi</strong> üniteleri en son teknoloji ile donatılmıştır.</li>
                    </ul>

                    <h4>⚠️ Dürüst Analiz</h4>
                    <p>Düzce cerrahide çok güçlüdür. Ancak <strong>saç ekimi</strong> gibi kozmetik alanlarda, hemen yanındaki İstanbul veya Kocaeli kadar yoğun bir klinik çeşitliliğine henüz sahip değildir.</p>
                </div>`
            }
        },
        thermal: {
            img: "https://via.placeholder.com/400x250?text=Efteni+Kaplicalari",
            phone: "+90 380 541 41 41",
            tr: {
                hospName: "Efteni ve Derdin Kaplıcaları",
                analysis: `
                <div class="analysis-content">
                    <h3 style="color:#2980b9;">🌟 TÜRKİYE'NİN "DERDİN"E DEVA SUYU</h3>
                    <p>Düzce'nin termal suları, özellikle Efteni Gölü çevresindeki tesislerle medikal bir şifa merkezidir.</p>
                    
                    <h4>🧪 Şifa Alanları</h4>
                    <ul>
                        <li><strong>Fizik Tedavi ve Felç:</strong> Efteni suları, <strong>nörolojik rehabilitasyon</strong> ve felç sonrası iyileşmede dürüst bir tıbbi yardımcıdır.</li>
                        <li><strong>Mide ve Bağırsak:</strong> Derdin kaplıcası, içme kürü olarak kullanıldığında <strong>gastrit ve ülser</strong> şikayetlerini dürüstçe minimize eder.</li>
                    </ul>
                </div>`
            }
        },
        care: {
            img: "https://via.placeholder.com/400x250?text=Duzce+Yayla+Rehabilitasyon",
            tr: {
                hospName: "Nörolojik ve Fiziksel Rehabilitasyon Üssü",
                analysis: `
                <div class="analysis-content">
                    <h4 style="color:#27ae60;">🌲 DOĞANIN KALBİNDE ŞİFA</h4>
                    <p>Düzce yaylaları (Güzeldere, Samandere), ameliyat sonrası <strong>psikolojik rehabilitasyon</strong> ve akciğer temizliği için dürüst bir "yıldızdır".</p>
                </div>`
            }
        },
        spa: {
            tr: {
                hospName: "Orman ve Termal Wellness",
                analysis: `<div class="analysis-content"><p>Düzce'de SPA, termal suyun mineral gücünü, orman havasıyla birleştiren lüks wellness otellerinde sunulan profesyonel masaj terapileridir.</p></div>`
            }
        }
    },
};
/* ==========================================================
   3. BAŞLATMA VE HARİTA YÖNETİMİ
   ========================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.getElementById('svg-wrapper');
    if (wrapper && typeof worldMapSVG !== 'undefined') {
        renderWorldMap();
        setupDragEvents(wrapper);
    }
});

function renderWorldMap() {
    const wrapper = document.getElementById('svg-wrapper');
    wrapper.innerHTML = worldMapSVG;
    document.getElementById('back-to-world').style.display = "none";
    colorizeMap();
    resetZoom();
}

function renderTurkeyMap() {
    const wrapper = document.getElementById('svg-wrapper');
    if (typeof turkeyMapSVG === 'undefined') return;
    wrapper.style.opacity = "0";
    setTimeout(() => {
        wrapper.innerHTML = turkeyMapSVG;
        document.getElementById('back-to-world').style.display = "block";
        wrapper.style.opacity = "1";
        colorizeTurkeyProvinces();
        resetZoom();
    }, 200);
}

function goBackToWorld() {
    const wrapper = document.getElementById('svg-wrapper');
    wrapper.style.opacity = "0";
    setTimeout(() => { renderWorldMap(); wrapper.style.opacity = "1"; }, 200);
}

/* ==========================================================
   4. BOYAMA VE DİL MOTORU (İYİLEŞTİRİLMİŞ)
   ========================================================== */
function colorizeMap() {
    const paths = document.querySelectorAll('#svg-wrapper svg path');
    const t = translations[currentLang].countries;

    paths.forEach(path => {
        const countryName = t[path.id];
        if (countryName) {
            const isTR = (countryName === "Türkiye" || countryName === "Turkey" || countryName === "Turkiya");
            path.style.fill = isTR ? "#c0392b" : "#b38b1d";
            path.style.cursor = "pointer";
            path.onclick = (e) => {
                e.stopPropagation();
                if (isTR) renderTurkeyMap(); else openModal(countryName);
            };
            path.onmouseenter = function() { this.style.filter = "brightness(1.2)"; };
            path.onmouseleave = function() { this.style.filter = "none"; };
        } else {
            path.style.fill = "#d1d8e0";
        }
    });
}

function colorizeTurkeyProvinces() {
    const provinces = document.querySelectorAll('#svg-wrapper svg path');
    provinces.forEach(p => {
        p.style.fill = "#27ae60"; p.style.stroke = "#fff"; p.style.strokeWidth = "0.3"; p.style.cursor = "pointer";
        p.onclick = (e) => {
            e.stopPropagation();
            const provinceName = p.getAttribute('name') || p.id;
            openModal(provinceName.toUpperCase());
        };
        p.onmouseenter = function() { this.style.fill = "#c0392b"; };
        p.onmouseleave = function() { this.style.fill = "#27ae60"; };
    });
}

function changeLang(lang) {
    currentLang = lang;
    const t = translations[lang];
    document.querySelector('h1').textContent = t.title;
    document.querySelector('#map-container p').textContent = t.subtitle;
    document.getElementById('nav-home').textContent = t.home;
    document.getElementById('nav-about').textContent = t.about;
    document.getElementById('current-lang-text').textContent = t.langName;
    document.getElementById('current-flag').src = t.flag;

    // --- PANEL İÇİ DİL SENKRONİZASYONU ---
    const modal = document.getElementById('countryModal');
    if (modal.style.display === 'flex') {
        const catSpans = document.querySelectorAll('.cat-card span');
        catSpans.forEach((span, index) => { if (t.categories[index]) span.textContent = t.categories[index]; });
        if (activeCategory) loadDetail(activeCategory);
        else openModal(document.getElementById('modal-country-name').textContent);
    }

    const isTurkeyVisible = document.getElementById('back-to-world').style.display === "block";
    if (isTurkeyVisible) colorizeTurkeyProvinces(); else colorizeMap();
}
const cityRankings = {
    hair: [
        { city: "İSTANBUL", score: "10", world: "DÜNYA #1", desc: "Dünyanın en yüksek vaka hacmi ve uluslararası JCI akreditasyonlu klinik ağı." },
        { city: "ANTALYA", score: "9.8", world: "GLOBAL DESTİNASYON", desc: "Tedavi sonrası iyileşme sürecini turizm olanaklarıyla birleştiren lider merkez." },
        { city: "İZMİR", score: "9.5", world: "AVRUPA STANDARDI", desc: "Butik sağlık hizmeti ve kişiye özel saç tasarımında uzmanlaşmış akademik kadro." }
    ],
    eye: [
        { city: "İSTANBUL", score: "10", world: "TEKNOLOJİ LİDERİ", desc: "Robotik lazer cerrahisi ve akıllı lens uygulamalarında dünya çapında vaka rekoru." },
        { city: "ANKARA", score: "9.7", world: "AKADEMİK ÜS", desc: "Karmaşık retina hastalıkları ve kornea nakli operasyonlarında referans noktası." },
        { city: "ŞANLIURFA", score: "9.2", world: "BÖLGESEL MERKEZ", desc: "Güneydoğu ve Ortadoğu'nun en geniş kapasiteli özel göz hastaneleri zinciri." }
    ],
    dental: [
        { city: "ANTALYA", score: "10", world: "DÜNYA #3", desc: "Dijital diş hekimliği ve 'Hollywood Smile' tasarımında Avrupa'nın ana merkezi." },
        { city: "İSTANBUL", score: "9.9", world: "GLOBAL MERKEZ", desc: "İmplant cerrahisi ve çene cerrahisinde en ileri teknolojik donanım ve tecrübe." },
        { city: "İZMİR", score: "9.6", world: "BÖLGESEL YILDIZ", desc: "Lamine ve zirkonyum uygulamalarında dürüst fiyat ve yüksek estetik başarı oranı." }
    ],
    heart: [
        { city: "İSTANBUL", score: "10", world: "DÜNYA STANDARDI", desc: "Açık kalp ve robotik cerrahide global başarı oranlarına sahip üniversite hastaneleri." },
        { city: "ANKARA", score: "9.9", world: "MİLLİ REFERANS", desc: "Kalp nakli ve pediatrik kardiyolojide Türkiye'nin en köklü ve güvenilir akademik üssü." },
        { city: "SAMSUN", score: "9.3", world: "BÖLGESEL LİDER", desc: "Karadeniz ve komşu ülkeler için kompleks vasküler cerrahi operasyon merkezi." }
    ],
    physio: [
        { city: "YALOVA", score: "10", world: "REHABİLİTASYON ÜSSÜ", desc: "Robotik fizik tedavi cihazları ile termal suyun birleştiği dünya çapında bir merkez." },
        { city: "DENİZLİ", score: "9.5", world: "AVRUPA ONAYLI", desc: "Osteoporoz ve felç sonrası rehabilitasyonda medikal termal su desteğiyle yüksek başarı." },
        { city: "BOLU", score: "9.2", world: "DOĞAL ŞİFA", desc: "Sporcu yaralanmaları ve post-operatif fizik tedavide doğa ile iç içe rehabilitasyon." }
    ],
    thermal: [
        { city: "AFYONKARAHİSAR", score: "10", world: "DÜNYA TERMAL BAŞKENTİ", desc: "Mineral yoğunluğu ve medikal çamur banyoları ile tescilli Avrupa şifa noktası." },
        { city: "YALOVA", score: "9.8", world: "TARİHİ ŞİFA", desc: "Dünya Sağlık Örgütü onaylı içilebilir ve banyo yapılabilir altın madalyalı sular." },
        { city: "KÜTAHYA", score: "9.4", world: "BÖLGESEL ŞİFA", desc: "Cilt hastalıkları ve romatizmal ağrılarda dürüst ve doğal çözüm sunan köklü tesisler." }
    ]
};

function updateRankings() {
    const category = document.getElementById('categorySelect').value;
    const grid = document.getElementById('rankingGrid');
    
    // Önce temizle
    grid.innerHTML = '';
    
    if (!category) return;

    cityRankings[category].forEach((data, index) => {
        const card = document.createElement('div');
        card.className = 'rank-card';
        
        card.innerHTML = `
            <div class="rank-badge">#${index + 1}</div>
            <h3>${data.city}</h3>
            <p class="description">${data.desc}</p>
            <div class="score-wrapper">
                <div class="score-container">
                    <span class="score-label">Sağlık Puanı</span>
                    <div class="score-value">${data.score}<small style="font-size:1rem; color:#94a3b8">/10</small></div>
                </div>
                <div class="world-status">${data.world}</div>
            </div>
        `;
        
        grid.appendChild(card);
        
        // Animasyonlu giriş
        setTimeout(() => {
            card.classList.add('show');
        }, index * 100);
    });
}
/* ==========================================================
   5. PANEL VE DETAY KONTROLÜ
   ========================================================== */
function openModal(name) {
    const modal = document.getElementById('countryModal');
    document.getElementById('modal-country-name').textContent = name.toUpperCase();
    activeCategory = null; 
    
    const t = translations[currentLang];
    document.getElementById('main-description').innerHTML = `
        <div class="welcome-msg" style="text-align:center; padding:20px;">
            <h3>${t.welcomeTitle}</h3><p>${t.welcomeSub}</p>
        </div>`;
    document.getElementById('hospital-card').style.display = 'none';
    modal.style.display = 'flex';
}
function loadDetail(category) {
    activeCategory = category;
    
    // Tıklanan yerin adını al (Adana, Türkiye vb.)
    const rawName = document.getElementById('modal-country-name').textContent.trim();
    
    // Önce Ülke havuzuna bak, bulamazsan Şehir havuzuna bak
    let data = countryDetailedData[rawName] || cityDetailedData[rawName];
    
    // Kategori verisini çek
    const categoryData = data ? data[category] : null;
    const t = translations[currentLang];

    if (!categoryData || !categoryData[currentLang]) {
        document.getElementById('main-description').innerHTML = `
            <div style="padding:30px; text-align:center; color:#e74c3c;">
                <h3>⚠️ Veri Hazırlanıyor</h3>
                <p>${rawName} için bu kategoride dürüst analiz çalışmaları devam etmektedir.</p>
            </div>`;
        document.getElementById('hospital-card').style.display = 'none';
        return;
    }

    const langContent = categoryData[currentLang];
    
    // Sol Tarafa Analizi Yaz
    document.getElementById('main-description').innerHTML = langContent.analysis;

    // Sağ Tarafa Kartı Bas
    const card = document.getElementById('hospital-card');
    card.style.display = 'block';
    const imgSrc = categoryData.img || "https://via.placeholder.com/300x200?text=Gorsel+Hazirlaniyor";
    
    card.innerHTML = `
        <div style="height:160px; overflow:hidden; border-radius:10px; margin-bottom:12px; border:1px solid #ddd;">
            <img src="${imgSrc}" style="width:100%; height:100%; object-fit:cover;">
        </div>
        <h4 style="margin:8px 0; font-family:'Montserrat'; font-weight:800; font-size:14px; color:#1e293b;">
            🏥 ${langContent.hospName}
        </h4>
        <div style="margin-top:10px;">
            <a href="tel:${categoryData.phone || '#'}" class="call-btn" style="display:block; background:#27ae60; color:white; text-align:center; padding:10px; border-radius:6px; text-decoration:none; font-weight:700; font-size:13px;">
                📞 ${t.callBtn || 'İLETİŞİME GEÇ'}
            </a>
        </div>
    `;
}

function closeModal() { document.getElementById('countryModal').style.display = 'none'; }
// Sayfa yüklendiğinde select kutularını 81 ille doldur
function populateCompareSelects() {
    const s1 = document.getElementById('cityOne');
    const s2 = document.getElementById('cityTwo');
    const cities = Object.keys(cityDetailedData).sort();

    cities.forEach(city => {
        let opt1 = document.createElement('option');
        opt1.value = city;
        opt1.innerHTML = city;
        s1.appendChild(opt1);

        let opt2 = document.createElement('option');
        opt2.value = city;
        opt2.innerHTML = city;
        s2.appendChild(opt2);
    });
}

function runComparison() {
    const c1Key = document.getElementById('cityOne').value;
    const c2Key = document.getElementById('cityTwo').value;
    const resultDiv = document.getElementById('comparisonResult');

    if (!c1Key || !c2Key) return;

    const c1 = cityDetailedData[c1Key];
    const c2 = cityDetailedData[c2Key];

    resultDiv.innerHTML = `
        <table class="compare-table">
            <thead>
                <tr>
                    <th class="feature-title">ÖZELLİK</th>
                    <th><div class="compare-city-name">${c1Key}</div></th>
                    <th><div class="compare-city-name">${c2Key}</div></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="feature-title">🏥 Cerrahi Altyapı & Hastane</td>
                    <td>
                        <strong>${c1.surgery.tr.hospName}</strong>
                        <div class="compare-desc">${c1.surgery.tr.analysis}</div>
                    </td>
                    <td>
                        <strong>${c2.surgery.tr.hospName}</strong>
                        <div class="compare-desc">${c2.surgery.tr.analysis}</div>
                    </td>
                </tr>
                <tr>
                    <td class="feature-title">♨️ Termal & Şifa Kaynakları</td>
                    <td>
                        <strong>${c1.thermal.tr.hospName}</strong>
                        <div class="compare-desc">${c1.thermal.tr.analysis}</div>
                    </td>
                    <td>
                        <strong>${c2.thermal.tr.hospName}</strong>
                        <div class="compare-desc">${c2.thermal.tr.analysis}</div>
                    </td>
                </tr>
                <tr>
                    <td class="feature-title">🌿 Bakım & Rehabilitasyon</td>
                    <td>
                        <strong>${c1.care.tr.hospName}</strong>
                        <div class="compare-desc">${c1.care.tr.analysis}</div>
                    </td>
                    <td>
                        <strong>${c2.care.tr.hospName}</strong>
                        <div class="compare-desc">${c2.care.tr.analysis}</div>
                    </td>
                </tr>
                <tr>
                    <td class="feature-title">💆 Wellness & SPA</td>
                    <td>
                        <div class="compare-desc">${c1.spa.tr.analysis}</div>
                    </td>
                    <td>
                        <div class="compare-desc">${c2.spa.tr.analysis}</div>
                    </td>
                </tr>
            </tbody>
        </table>
    `;
}

// Başlat
populateCompareSelects();
// Şehirlerin cerrahi gücünü puanlayan yardımcı motor (Statik veri tabanlı)
const surgicalScores = {
    "İSTANBUL": 5, "ANKARA": 5, "ANTALYA": 4, "İZMİR": 4, "BURSA": 4, 
    "KOCAELİ": 4, "ADANA": 3, "SAMSUN": 3, "GAZİANTEP": 3
    // Diğerleri varsayılan 2 veya 3 dönecek
};

function getStars(city) {
    const score = surgicalScores[city] || 3;
    return "★".repeat(score) + "☆".repeat(5 - score);
}

function runComparison() {
    const c1Key = document.getElementById('cityOne').value;
    const c2Key = document.getElementById('cityTwo').value;
    const resultDiv = document.getElementById('comparisonResult');

    if (!c1Key || !c2Key) return;

    const c1 = cityDetailedData[c1Key];
    const c2 = cityDetailedData[c2Key];

    // Öne çıkarma mantığı (Puanı yüksek olanı belirle)
    const score1 = surgicalScores[c1Key] || 3;
    const score2 = surgicalScores[c2Key] || 3;

    resultDiv.innerHTML = `
        <div class="compare-actions">
            <button class="pdf-btn" onclick="exportToPDF()">
                <span>📄</span> Tıbbi Rapor Olarak İndir (PDF)
            </button>
        </div>
        <table class="compare-table" id="comparisonTable">
            <thead>
                <tr>
                    <th class="feature-title">MEDİKAL ANALİZ</th>
                    <th class="${score1 > score2 ? 'recommended-cell' : ''}">
                        ${score1 > score2 ? '<span class="recommended-badge">Önerilen</span>' : ''}
                        <div class="compare-city-name">${c1Key}</div>
                        <div class="star-rating">${getStars(c1Key)}</div>
                    </th>
                    <th class="${score2 > score1 ? 'recommended-cell' : ''}">
                        ${score2 > score1 ? '<span class="recommended-badge">Önerilen</span>' : ''}
                        <div class="compare-city-name">${c2Key}</div>
                        <div class="star-rating">${getStars(c2Key)}</div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="feature-title">🏥 Cerrahi Yetkinlik</td>
                    <td class="${score1 > score2 ? 'recommended-cell' : ''}">
                        <strong>${c1.surgery.tr.hospName}</strong>
                        <div class="compare-desc">${c1.surgery.tr.analysis}</div>
                    </td>
                    <td class="${score2 > score1 ? 'recommended-cell' : ''}">
                        <strong>${c2.surgery.tr.hospName}</strong>
                        <div class="compare-desc">${c2.surgery.tr.analysis}</div>
                    </td>
                </tr>
                <tr>
                    <td class="feature-title">♨️ Termal Destek</td>
                    <td>
                        <strong>${c1.thermal.tr.hospName}</strong>
                        <div class="compare-desc">${c1.thermal.tr.analysis}</div>
                    </td>
                    <td>
                        <strong>${c2.thermal.tr.hospName}</strong>
                        <div class="compare-desc">${c2.thermal.tr.analysis}</div>
                    </td>
                </tr>
                <tr>
                    <td class="feature-title">🌿 Rehabilitasyon</td>
                    <td>
                        <strong>${c1.care.tr.hospName}</strong>
                        <div class="compare-desc">${c1.care.tr.analysis}</div>
                    </td>
                    <td>
                        <strong>${c2.care.tr.hospName}</strong>
                        <div class="compare-desc">${c2.care.tr.analysis}</div>
                    </td>
                </tr>
            </tbody>
        </table>
    `;
}

// PDF Export Fonksiyonu (Kurumsal çıktı için optimize edilmiş print)
function exportToPDF() {
    const originalContent = document.body.innerHTML;
    const printContent = document.getElementById('comparisonTable').outerHTML;
    const c1Name = document.getElementById('cityOne').value;
    const c2Name = document.getElementById('cityTwo').value;

    document.body.innerHTML = `
        <div style="padding:40px; font-family:Arial;">
            <h1 style="color:#1e293b; border-bottom:2px solid #3b82f6; padding-bottom:10px;">Medikal Şehir Karşılaştırma Raporu</h1>
            <p>Rapor Tarihi: ${new Date().toLocaleDateString('tr-TR')}</p>
            <p>Analiz Edilen Şehirler: ${c1Name} ve ${c2Name}</p>
            <br>
            ${printContent}
            <footer style="margin-top:30px; font-size:12px; color:#64748b;">
                * Bu rapor Türkiye Sağlık Turizmi Bilgi Portalı tarafından otomatik oluşturulmuştur.
            </footer>
        </div>
    `;
    window.print();
    document.body.innerHTML = originalContent;
    // Sayfayı tekrar çalışır hale getir
    populateCompareSelects();
}

/* --- KURUMSAL RANDEVU SİSTEMİ JS --- */
let slideInterval;
let currentIndex = 0;
const totalSlides = 3;

// Sayfayı Aç
function openPremiumAppointment() {
    document.getElementById('premiumOverlay').style.display = 'block';
    document.body.style.overflow = 'hidden'; // Arka planı kilitle
    
    // Şehirleri Doldur (Sadece bir kez)
    const citySelect = document.getElementById('premCitySelect');
    if(citySelect.options.length === 1) {
        Object.keys(cityDetailedData).sort().forEach(city => {
            let option = document.createElement('option');
            option.value = city;
            option.text = city;
            citySelect.appendChild(option);
        });
    }

    // Video Slider'ı Başlat
    startSlider();
}

// Sayfayı Kapat
function closePremiumAppointment() {
    document.getElementById('premiumOverlay').style.display = 'none';
    document.body.style.overflow = 'auto'; // Kaydırmayı aç
    stopSlider();
}

// Slider Mantığı (Soldan sağa kayma)
function startSlider() {
    // İlk videoyu oynat
    document.getElementById(`vid${currentIndex + 1}`).play();
    
    slideInterval = setInterval(() => {
        currentIndex++;
        if (currentIndex >= totalSlides) currentIndex = 0;
        
        // Kaydırma İşlemi (Transform Translate)
        const track = document.getElementById('videoTrack');
        track.style.transform = `translateX(-${currentIndex * 33.333}%)`;
        
        // Yeni videoyu oynat, öncekileri durdur (Performans için)
        document.querySelectorAll('.video-item video').forEach(v => v.pause());
        const nextVideo = document.getElementById(`vid${currentIndex + 1}`);
        nextVideo.currentTime = 0;
        nextVideo.play();
        
        // Yazı Animasyonlarını Sıfırla (Yeniden tetiklenmesi için)
        resetTextAnimations();
        
    }, 6000); // 6 saniyede bir geçiş
}

function stopSlider() {
    clearInterval(slideInterval);
    document.querySelectorAll('.video-item video').forEach(v => v.pause());
}

function resetTextAnimations() {
    // Yazı animasyonlarını DOM'dan kaldırıp tekrar ekleyerek "Replay" etkisi yaratıyoruz
    const contents = document.querySelectorAll('.hero-content');
    contents.forEach(el => {
        el.style.animation = 'none';
        el.offsetHeight; /* Trigger reflow */
        el.style.animation = null; 
    });
}

// Şehir Seçilince Hastane Getir
function loadHospitals() {
    const cityKey = document.getElementById('premCitySelect').value;
    const hospSelect = document.getElementById('premHospSelect');
    
    hospSelect.innerHTML = '<option value="">Hastane Seçiniz...</option>';
    hospSelect.disabled = true;

    if (cityKey && cityDetailedData[cityKey]) {
        hospSelect.disabled = false;
        
        // Ana Hastane
        let opt1 = document.createElement('option');
        opt1.value = "hosp_main";
        opt1.text = cityDetailedData[cityKey].surgery.tr.hospName;
        hospSelect.appendChild(opt1);

        // Varsayılan Termal Tesis (Varsa)
        if(cityDetailedData[cityKey].thermal.tr.hospName) {
            let opt2 = document.createElement('option');
            opt2.value = "hosp_thermal";
            opt2.text = cityDetailedData[cityKey].thermal.tr.hospName + " (Termal Ünite)";
            hospSelect.appendChild(opt2);
        }
    }
}

// Uyarı Modalı
function openWarningModal() {
    const city = document.getElementById('premCitySelect').value;
    const hosp = document.getElementById('premHospSelect').value;

    if(!city || !hosp) {
        alert("Lütfen önce şehir ve kurum seçimi yapınız.");
        return;
    }
    document.getElementById('infoModal').style.display = 'flex';
}

function closeWarningModal() {
    document.getElementById('infoModal').style.display = 'none';
}
/* --- AKILLI VE GERÇEKÇİ ULAŞIM ASİSTANI --- */
let transSlideInterval;
let transIndex = 0;

// Sayfayı Açma Fonksiyonu
function openTransportModal() {
    document.getElementById('transportOverlay').style.display = 'block';
    document.body.style.overflow = 'hidden';

    // Şehir Seçeneklerini Doldur (Eğer boşsa)
    const destSelect = document.getElementById('destCitySelect');
    if(destSelect.options.length === 1) {
        // cityDetailedData senin ana verinden illeri çeker
        Object.keys(cityDetailedData).sort().forEach(city => {
            let option = document.createElement('option');
            option.value = city;
            option.text = city;
            destSelect.appendChild(option);
        });
    }
    startTransportSlider();
}

// Sayfayı Kapatma
function closeTransportModal() {
    document.getElementById('transportOverlay').style.display = 'none';
    document.body.style.overflow = 'auto';
    stopTransportSlider();
}

/* --- VİDEO SLIDER MOTORU --- */
function startTransportSlider() {
    const vids = [document.getElementById('transVid1'), document.getElementById('transVid2'), document.getElementById('transVid3')];
    vids[transIndex].play();
    
    transSlideInterval = setInterval(() => {
        transIndex++;
        if (transIndex >= 3) transIndex = 0;
        
        const track = document.getElementById('transportVideoTrack');
        track.style.transform = `translateX(-${transIndex * 33.333}%)`;
        
        vids.forEach(v => { v.pause(); v.currentTime = 0; });
        vids[transIndex].play();
    }, 6000);
}

function stopTransportSlider() {
    clearInterval(transSlideInterval);
    document.querySelectorAll('#transportVideoTrack video').forEach(v => v.pause());
}

/* --- GERÇEKÇİ ROTA MOTORU (LOJİSTİK ZEKA) --- */

// Türkiye Havalimanı ve Lojistik Veri Tabanı
const logisticsMasterData = {
    // DOĞU & GÜNEYDOĞU
    "SİİRT": { airport: "Siirt Havalimanı (SXZ)", alt: "Batman Havalimanı", note: "Havalimanından merkeze belediye servisleri ve taksi ile 15 dakikada ulaşabilirsiniz." },
    "BATMAN": { airport: "Batman Havalimanı (BAL)", alt: "Diyarbakır Havalimanı", note: "Belediye otobüsleri uçuş saatlerine göre servis düzenlemektedir." },
    "DİYARBAKIR": { airport: "Diyarbakır Havalimanı (DIY)", alt: "Direkt Uçuş Mevcut", note: "Belediye otobüsleri ve ticari taksilerle 20 dakikada merkezdesiniz." },
    "VAN": { airport: "Van Ferit Melen Havalimanı (VAN)", alt: "Direkt Uçuş", note: "HAVAŞ ve belediye otobüsleri aktif olarak çalışmaktadır." },
    "MARDİN": { airport: "Mardin Prof. Dr. Aziz Sancar Havalimanı (MQM)", alt: "Direkt Uçuş", note: "Kızıltepe ve Merkez istikametine HAVAŞ servisleri bulunur." },
    "ŞANLIURFA": { airport: "Şanlıurfa GAP Havalimanı (GNY)", alt: "Direkt Uçuş", note: "HAVAŞ servisleri ile şehir merkezi yaklaşık 45-50 dakikadır." },
    "ADIYAMAN": { airport: "Adıyaman Havalimanı (ADF)", alt: "Direkt Uçuş", note: "Halk otobüsleri ile ulaşım sağlanabilir." },
    "GAZİANTEP": { airport: "Gaziantep Havalimanı (GZT)", alt: "Direkt Uçuş", note: "Otobüs servisleri ile şehir merkezi yaklaşık 25-30 dakikadır." },
    // BATI & MERKEZ
    "İSTANBUL": { airport: "İstanbul (IST) veya Sabiha Gökçen (SAW)", alt: "Hızlı Tren", note: "HAVAİST, Metro veya Marmaray ile her noktaya kesintisiz ulaşım." },
    "ANKARA": { airport: "Esenboğa Havalimanı (ESB)", alt: "Yüksek Hızlı Tren", note: "BelkoAir ve EGO otobüsleri ile Kızılay/AŞTİ noktalarına ulaşım." },
    "İZMİR": { airport: "Adnan Menderes Havalimanı (ADB)", alt: "İZBAN", note: "İZBAN banliyö hattı veya HAVAŞ ile şehir merkezine kolay erişim." },
    "BİLECİK": { airport: "Havalimanı Bulunmuyor", alt: "Yüksek Hızlı Tren (YHT)", note: "İstanbul veya Ankara'dan YHT ile en hızlı ulaşım sağlanan ildir." },
    "YALOVA": { airport: "Sabiha Gökçen Havalimanı (SAW)", alt: "İDO / Deniz Otobüsü", note: "Havalimanından servislerle Pendik İDO iskelesine geçip deniz yoluyla ulaşabilirsiniz." },
    "BURSA": { airport: "Yenişehir Havalimanı (YEI)", alt: "Sabiha Gökçen (SAW)", note: "Sabiha Gökçen'den kalkan BBBUS otobüsleri ile direkt Bursa Terminali'ne geçilir." },
    "BALIKESİR": { airport: "Balıkesir Koca Seyit Havalimanı (EDO)", alt: "Direkt Uçuş", note: "HAVAŞ servisleri ile şehir merkezi yaklaşık 20-25 dakikadır." },
    "ANTALYA": { airport: "Antalya Havalimanı (AYT)", alt: "Direkt Uçuş", note: "Antray (Tramvay) veya HAVAŞ ile şehir merkezine ulaşım çok rahattır." }
};

function calculateSmartRoute() {
    const originCity = document.getElementById('originCity').value.trim();
    const destCity = document.getElementById('destCitySelect').value;
    const resultDiv = document.getElementById('routeResult');

    if(!destCity || !originCity) {
        alert("Lütfen nereden geldiğinizi yazın ve hedef şehri seçin.");
        return;
    }

    // Veriyi Çek (Eğer listede yoksa genel bir şablon oluştur)
    let info = logisticsMasterData[destCity] || { 
        airport: `${destCity} ve çevre illerdeki Havalimanları`, 
        alt: "Şehirlerarası Otobüs", 
        note: "Bölgedeki yerel ulaşım hatları ve otogar servislerini kullanabilirsiniz." 
    };

    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
        <div style="border-bottom: 2px solid #2c3e50; margin-bottom: 20px; padding-bottom: 10px;">
            <h4 style="color:#2c3e50; font-family:'Montserrat';">
                <i class="fa-solid fa-route"></i> ${originCity.toUpperCase()} ➔ ${destCity} Ulaşım Rehberi
            </h4>
        </div>
        
        <div class="timeline">
            <div class="timeline-item">
                <div class="timeline-icon"><i class="fa-solid fa-plane-up"></i></div>
                <div class="timeline-content">
                    <h4>Hava Yolu Planı</h4>
                    <p>Tercih Edilmesi Gereken: <strong>${info.airport}</strong></p>
                    <small style="color:#7f8c8d;">Alternatif / Bağlantı: ${info.alt}</small>
                </div>
            </div>

            <div class="timeline-item">
                <div class="timeline-icon"><i class="fa-solid fa-bus"></i></div>
                <div class="timeline-content">
                    <h4>Şehir İçi Aktarma (Kamu)</h4>
                    <p>${info.note}</p>
                    <p style="font-size: 0.8rem; color: #d35400; font-weight: 600;">
                        <i class="fa-solid fa-circle-info"></i> Not: Kurumumuzun özel transfer hizmeti bulunmamaktadır.
                    </p>
                </div>
            </div>

            <div class="timeline-item">
                <div class="timeline-icon"><i class="fa-solid fa-location-dot"></i></div>
                <div class="timeline-content">
                    <h4>Varış</h4>
                    <p>${destCity} merkezindeki sağlık merkezine toplu taşıma veya ticari taksi ile ulaşım tamamlanır.</p>
                </div>
            </div>
        </div>

        <div style="text-align:center; margin-top:25px; padding-top:20px; border-top:1px solid #eee;">
            <p style="font-size:0.85rem; margin-bottom:15px;">Anlık bilet fiyatları ve toplu taşıma saatleri için dış bağlantı:</p>
            <a href="https://www.google.com/maps/dir/${originCity}/${destCity}" target="_blank" class="live-map-btn">
                <i class="fa-brands fa-google"></i> Google Haritalar'da Rotayı İncele
            </a>
        </div>
    `;

    // Sonuca yumuşakça kaydır
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

const globalStats = {
    dental: { tr: 600, uk: 3200, usa: 4800, ger: 2500, label: "Diş İmplantı" },
    hair: { tr: 2200, uk: 14000, usa: 18000, ger: 12000, label: "Saç Ekimi" },
    gastric: { tr: 4500, uk: 12500, usa: 20000, ger: 13000, label: "Mide Tüpü" },
    rhino: { tr: 3200, uk: 9000, usa: 13000, ger: 8500, label: "Burun Estetiği" },
    eye: { tr: 1300, uk: 4800, usa: 6500, ger: 4200, label: "Göz Lazer" }
};

function toggleSideMenu() { document.getElementById('sideMenu').classList.toggle('open'); }
function closeSideMenu() { document.getElementById('sideMenu').classList.remove('open'); }

function openAnalysis() {
    closeSideMenu();
    document.getElementById('analysisPage').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeAnalysis() {
    document.getElementById('analysisPage').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function updateRealTimeData() {
    const val = document.getElementById('treatmentSelect').value;
    const display = document.getElementById('dataDisplay');
    if(!val) { display.style.display = 'none'; return; }

    const d = globalStats[val];
    display.style.display = 'block';
    
    // Türkiye'nin ortalama tasarruf yüzdesi (Dünya ortalamasına göre)
    const avgGlobal = (d.uk + d.usa + d.ger) / 3;
    const savePercent = Math.round(((avgGlobal - d.tr) / avgGlobal) * 100);

    display.innerHTML = `
        <div class="data-card-grid">
            <div class="val-card turkey">
                <label>TÜRKİYE</label>
                <h3>$${d.tr.toLocaleString()}</h3>
                <small>Hastaneler Ortalama</small>
            </div>
            <div class="val-card">
                <label>İNGİLTERE</label>
                <h3>$${d.uk.toLocaleString()}</h3>
                <span style="color:#ef4444">+%${Math.round((d.uk-d.tr)/d.tr*100)} Fazla</span>
            </div>
            <div class="val-card">
                <label>ABD</label>
                <h3>$${d.usa.toLocaleString()}</h3>
                <span style="color:#ef4444">+%${Math.round((d.usa-d.tr)/d.tr*100)} Fazla</span>
            </div>
        </div>
        
        <div style="margin-top:40px; text-align:center; padding:30px; border:2px dashed #10b981; border-radius:10px;">
            <p style="margin:0; font-weight:700; color:#065f46;">
                <i class="fa-solid fa-check"></i> Seçtiğiniz operasyonda Türkiye, global ortalamaya göre <span class="savings-badge">%${savePercent}</span> daha avantajlıdır.
            </p>
        </div>
    `;
}
function updateRealTimeData() {
    const val = document.getElementById('treatmentSelect').value;
    const display = document.getElementById('dataDisplay');
    
    if(!val) {
        display.style.opacity = '0';
        setTimeout(() => display.style.display = 'none', 300);
        return;
    }

    const d = globalStats[val];
    display.style.display = 'block';
    display.style.opacity = '1';
    
    const avgGlobal = (d.uk + d.usa + d.ger) / 3;
    const savePercent = Math.round(((avgGlobal - d.tr) / avgGlobal) * 100);

    display.innerHTML = `
        <div class="data-card-grid">
            <div class="val-card turkey">
                <label><i class="fa-solid fa-star"></i> TÜRKİYE (Avantaj)</label>
                <h3>$${d.tr.toLocaleString()}</h3>
                <p>Uluslararası Standart</p>
            </div>
            <div class="val-card">
                <label>BİRLEŞİK KRALLIK</label>
                <h3>$${d.uk.toLocaleString()}</h3>
                <span class="diff-badge">+%${Math.round((d.uk-d.tr)/d.tr*100)} Maliyet</span>
            </div>
            <div class="val-card">
                <label>ABD</label>
                <h3>$${d.usa.toLocaleString()}</h3>
                <span class="diff-badge">+%${Math.round((d.usa-d.tr)/d.tr*100)} Maliyet</span>
            </div>
        </div>
        
        <div class="savings-info-box" style="margin-top:50px; padding:30px; background:#ecfdf5; border-radius:12px; border:1px solid #10b981; text-align:center; animation: fadeIn 1s ease;">
            <h4 style="color:#065f46; margin:0;">
                <i class="fa-solid fa-shield-heart"></i> 
                Bu tedavide Türkiye'yi seçerek ortalama <span style="font-size:1.5rem; font-weight:900;">%${savePercent}</span> oranında tasarruf sağlıyorsunuz.
            </h4>
        </div>
    `;
}
/* ==========================================================
   6. ZOOM VE DRAG (KORUNAN FONKSİYONLAR)
   ========================================================== */
function updateTransform() {
    const svg = document.querySelector('#svg-wrapper svg');
    if (svg) svg.style.transform = `translate(${pointX}px, ${pointY}px) scale(${scale})`;
}
function zoomMap(direction) {
    if (direction === 'in') scale += 0.4; else { scale -= 0.4; if (scale <= 1) resetZoom(); }
    updateTransform();
}
function resetZoom() { scale = 1; pointX = 0; pointY = 0; updateTransform(); }
function setupDragEvents(wrapper) {
    wrapper.onmousedown = (e) => { if (scale > 1) { isDragging = true; start = { x: e.clientX - pointX, y: e.clientY - pointY }; } };
    window.onmousemove = (e) => { if (!isDragging) return; pointX = e.clientX - start.x; pointY = e.clientY - start.y; updateTransform(); };
    window.onmouseup = () => { isDragging = false; };
}

window.onclick = (e) => { if (e.target == document.getElementById('countryModal')) closeModal(); };
/* --- FAQ (Sıkça Sorulan Sorular) Açma/Kapama --- */

function openFAQ() {
    // Menüden tıklanınca tam ekran açılır
    document.getElementById("faqOverlay").classList.add("active");
    // Arka plandaki sayfanın kaymasını engelleyelim
    document.body.style.overflow = "hidden";
}

function closeFAQ() {
    // Geri dön butonuna basınca kapanır
    document.getElementById("faqOverlay").classList.remove("active");
    // Arka plan tekrar kaydırılabilir olsun
    document.body.style.overflow = "auto";
}

/* --- Akordiyon Çalışma Mantığı --- */
const accordions = document.querySelectorAll(".accordion-header");

accordions.forEach(acc => {
    acc.addEventListener("click", function() {
        // Tıklanan soruyu aktif yap (rengini değiştir, ikonu döndür)
        this.classList.toggle("active");

        // Cevap kısmını bul
        const panel = this.nextElementSibling;

        // Eğer açıksa kapat, kapalıysa aç (Yükseklik ayarı ile animasyon)
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            // Önce diğer tüm açık olanları kapat (Opsiyonel: İstersen bu bloğu silebilirsin)
            document.querySelectorAll(".accordion-body").forEach(body => body.style.maxHeight = null);
            document.querySelectorAll(".accordion-header").forEach(header => header.classList.remove("active"));
            this.classList.add("active");
            
            // Şimdi tıklananı aç
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
});
function toggleCulturePanel() {
    const overlay = document.getElementById('culture-overlay');
    // Eğer kapalıysa aç, açıksa kapat
    if (overlay.style.display === 'flex') {
        overlay.style.display = 'none';
    } else {
        overlay.style.display = 'flex';
    }
}

function toggleHighContrast() {
    // Body etiketine 'high-contrast' ismini ekleyip çıkarır
    document.body.classList.toggle('high-contrast');
    
    // Konsola bilgi verelim (Çalışıp çalışmadığını anlamak için F12'den bakabilirsin)
    console.log("Erişilebilirlik Modu: " + (document.body.classList.contains('high-contrast') ? "AÇIK" : "KAPALI"));
}

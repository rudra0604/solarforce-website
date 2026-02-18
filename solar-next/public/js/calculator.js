/**
 * SolarForce Solar Calculator
 * Converted from React component to vanilla JavaScript
 * Features: Pincode validation, tabbed results, EMI calculator, environmental impact
 */

(function () {
  'use strict';

  // ============================================
  // STATE MANAGEMENT
  // ============================================
  const state = {
    pincode: '',
    location: '',
    electricityBill: '',
    showResults: false,
    activeTab: 'system',
    emiTenure: 60,

    // Calculated values
    systemSize: 0,
    roofArea: 0,
    monthlySavings: 0,
    yearlySavings: 0,
    fiveYearSavings: 0,
    totalCost: 0,
    subsidy: 0,
    netCost: 0,
    emi: 0,
    downPayment: 0,
    netDownPayment: 0,
    co2Mitigated: 0,
    treesPlanted: 0,
    distanceKm: 0,
  };

  // ============================================
  // PINCODE DATABASE
  // ============================================
  const pincodeDatabase = {
    // Delhi
    '110001': 'New Delhi', '110002': 'New Delhi', '110003': 'New Delhi', '110004': 'New Delhi',
    '110005': 'New Delhi', '110006': 'New Delhi', '110007': 'New Delhi', '110008': 'New Delhi',
    '110009': 'New Delhi', '110010': 'New Delhi', '110011': 'New Delhi', '110012': 'New Delhi',
    '110013': 'New Delhi', '110014': 'New Delhi', '110015': 'New Delhi', '110016': 'New Delhi',
    '110017': 'New Delhi', '110018': 'New Delhi', '110019': 'New Delhi', '110020': 'New Delhi',
    '110021': 'New Delhi', '110022': 'New Delhi', '110023': 'New Delhi', '110024': 'New Delhi',
    '110025': 'New Delhi', '110026': 'New Delhi', '110027': 'New Delhi', '110028': 'New Delhi',
    '110029': 'New Delhi', '110030': 'New Delhi', '110031': 'New Delhi', '110032': 'New Delhi',
    '110033': 'New Delhi', '110034': 'New Delhi', '110035': 'New Delhi', '110036': 'New Delhi',
    '110037': 'New Delhi', '110038': 'New Delhi', '110039': 'New Delhi', '110040': 'New Delhi',
    '110041': 'New Delhi', '110042': 'New Delhi', '110043': 'New Delhi', '110044': 'New Delhi',
    '110045': 'New Delhi', '110046': 'New Delhi', '110047': 'New Delhi', '110048': 'New Delhi',
    '110049': 'New Delhi', '110051': 'New Delhi', '110052': 'New Delhi', '110053': 'New Delhi',
    '110054': 'New Delhi', '110055': 'New Delhi', '110056': 'New Delhi', '110057': 'New Delhi',
    '110058': 'New Delhi', '110059': 'New Delhi', '110060': 'New Delhi', '110061': 'New Delhi',
    '110062': 'New Delhi', '110063': 'New Delhi', '110064': 'New Delhi', '110065': 'New Delhi',
    '110066': 'New Delhi', '110067': 'New Delhi', '110068': 'New Delhi', '110069': 'New Delhi',
    '110070': 'New Delhi', '110071': 'New Delhi', '110072': 'New Delhi', '110073': 'New Delhi',
    '110074': 'New Delhi', '110075': 'New Delhi', '110076': 'New Delhi', '110077': 'New Delhi',
    '110078': 'New Delhi', '110080': 'New Delhi', '110081': 'New Delhi', '110082': 'New Delhi',
    '110083': 'New Delhi', '110084': 'New Delhi', '110085': 'New Delhi', '110086': 'New Delhi',
    '110087': 'New Delhi', '110088': 'New Delhi', '110089': 'New Delhi', '110091': 'New Delhi',
    '110092': 'New Delhi', '110093': 'New Delhi', '110094': 'New Delhi', '110095': 'New Delhi',
    '110096': 'New Delhi',
    
    // Noida
    '201301': 'Noida', '201302': 'Noida', '201303': 'Noida', '201304': 'Noida', '201305': 'Noida',
    '201306': 'Noida', '201307': 'Noida', '201308': 'Noida', '201309': 'Noida', '201310': 'Noida',
    

    // ============================================
    // HARYANA PINCODE DATABASE
    // ============================================

    // Gurugram (Gurgaon)
    '122001': 'Gurugram', '122002': 'Gurugram', '122003': 'Gurugram', '122004': 'Gurugram',
    '122005': 'Gurugram', '122006': 'Gurugram', '122007': 'Gurugram', '122008': 'Gurugram',
    '122009': 'Gurugram', '122010': 'Gurugram', '122011': 'Gurugram', '122015': 'Gurugram',
    '122016': 'Gurugram', '122017': 'Gurugram', '122018': 'Gurugram', '122022': 'Gurugram',
    '122050': 'Gurugram', '122051': 'Gurugram', '122052': 'Gurugram', '122101': 'Gurugram',
    '122102': 'Gurugram', '122103': 'Gurugram', '122104': 'Gurugram', '122105': 'Gurugram',
    '122413': 'Gurugram', '122502': 'Gurugram', '122503': 'Gurugram', '122504': 'Gurugram',
    '122505': 'Gurugram', '122506': 'Gurugram',

    // Faridabad
    '121001': 'Faridabad', '121002': 'Faridabad', '121003': 'Faridabad', '121004': 'Faridabad',
    '121005': 'Faridabad', '121006': 'Faridabad', '121007': 'Faridabad', '121008': 'Faridabad',
    '121009': 'Faridabad', '121010': 'Faridabad', '121011': 'Faridabad', '121012': 'Faridabad',
    '121013': 'Faridabad', '121101': 'Faridabad', '121102': 'Faridabad', '121103': 'Faridabad',
    '121104': 'Faridabad', '121105': 'Faridabad', '121106': 'Faridabad',

    // Hisar
    '125001': 'Hisar', '125004': 'Hisar', '125005': 'Hisar', '125006': 'Hisar',
    '125007': 'Hisar', '125011': 'Hisar', '125033': 'Hisar', '125044': 'Hisar',
    '125047': 'Hisar', '125048': 'Hisar', '125050': 'Hisar', '125051': 'Hisar',
    '125052': 'Hisar', '125053': 'Hisar', '125055': 'Hisar', '125075': 'Hisar',
    '125076': 'Hisar', '125077': 'Hisar', '125078': 'Hisar', '125101': 'Hisar',
    '125103': 'Hisar', '125104': 'Hisar', '125106': 'Hisar', '125111': 'Hisar',
    '125113': 'Hisar', '125120': 'Hisar', '125121': 'Hisar',

    // Rohtak
    '124001': 'Rohtak', '124010': 'Rohtak', '124021': 'Rohtak', '124022': 'Rohtak',
    '124102': 'Rohtak', '124103': 'Rohtak', '124104': 'Rohtak', '124105': 'Rohtak',
    '124106': 'Rohtak', '124107': 'Rohtak', '124108': 'Rohtak', '124109': 'Rohtak',
    '124110': 'Rohtak', '124111': 'Rohtak', '124112': 'Rohtak', '124113': 'Rohtak',
    '124141': 'Rohtak', '124142': 'Rohtak', '124146': 'Rohtak',

    // Panipat
    '132101': 'Panipat', '132102': 'Panipat', '132103': 'Panipat', '132104': 'Panipat',
    '132105': 'Panipat', '132106': 'Panipat', '132107': 'Panipat', '132108': 'Panipat',
    '132109': 'Panipat', '132110': 'Panipat', '132113': 'Panipat', '132114': 'Panipat',
    '132115': 'Panipat', '132116': 'Panipat', '132140': 'Panipat', '132145': 'Panipat',
    '132157': 'Panipat',

    // Karnal
    '132001': 'Karnal', '132021': 'Karnal', '132022': 'Karnal', '132024': 'Karnal',
    '132037': 'Karnal', '132039': 'Karnal', '132040': 'Karnal', '132041': 'Karnal',
    '132042': 'Karnal', '132044': 'Karnal', '132046': 'Karnal', '132054': 'Karnal',
    '132055': 'Karnal', '132056': 'Karnal', '132114': 'Karnal', '132116': 'Karnal',
    '132117': 'Karnal', '132118': 'Karnal',

    // Ambala
    '133001': 'Ambala', '133002': 'Ambala', '133003': 'Ambala', '133004': 'Ambala',
    '133005': 'Ambala', '133006': 'Ambala', '133101': 'Ambala', '133102': 'Ambala',
    '133103': 'Ambala', '133104': 'Ambala', '133105': 'Ambala', '134002': 'Ambala',
    '134003': 'Ambala', '134007': 'Ambala',

    // Yamuna Nagar
    '135001': 'Yamuna Nagar', '135002': 'Yamuna Nagar', '135003': 'Yamuna Nagar',
    '135101': 'Yamuna Nagar', '135102': 'Yamuna Nagar', '135103': 'Yamuna Nagar',
    '135106': 'Yamuna Nagar', '135133': 'Yamuna Nagar',

    // Kurukshetra
    '136115': 'Kurukshetra', '136116': 'Kurukshetra', '136117': 'Kurukshetra',
    '136118': 'Kurukshetra', '136119': 'Kurukshetra', '136128': 'Kurukshetra',
    '136129': 'Kurukshetra', '136130': 'Kurukshetra', '136131': 'Kurukshetra',
    '136132': 'Kurukshetra', '136135': 'Kurukshetra', '136136': 'Kurukshetra',
    '136156': 'Kurukshetra',

    // Sonipat
    '131001': 'Sonipat', '131021': 'Sonipat', '131022': 'Sonipat', '131023': 'Sonipat',
    '131024': 'Sonipat', '131027': 'Sonipat', '131028': 'Sonipat', '131029': 'Sonipat',
    '131030': 'Sonipat', '131039': 'Sonipat', '131101': 'Sonipat', '131102': 'Sonipat',
    '131103': 'Sonipat', '131104': 'Sonipat', '131301': 'Sonipat', '131302': 'Sonipat',
    '131402': 'Sonipat', '131403': 'Sonipat', '131408': 'Sonipat', '131409': 'Sonipat',

    // Bhiwani
    '127021': 'Bhiwani', '127022': 'Bhiwani', '127025': 'Bhiwani', '127026': 'Bhiwani',
    '127027': 'Bhiwani', '127028': 'Bhiwani', '127030': 'Bhiwani', '127031': 'Bhiwani',
    '127032': 'Bhiwani', '127040': 'Bhiwani', '127042': 'Bhiwani', '127043': 'Bhiwani',
    '127045': 'Bhiwani', '127046': 'Bhiwani', '127111': 'Bhiwani', '127201': 'Bhiwani',
    '127306': 'Bhiwani', '127307': 'Bhiwani', '127308': 'Bhiwani', '127309': 'Bhiwani',

    // Jind
    '126101': 'Jind', '126102': 'Jind', '126110': 'Jind', '126112': 'Jind',
    '126115': 'Jind', '126116': 'Jind', '126125': 'Jind', '126152': 'Jind',

    // Sirsa
    '125055': 'Sirsa', '125075': 'Sirsa', '125077': 'Sirsa', '125078': 'Sirsa',
    '125102': 'Sirsa', '125133': 'Sirsa', '125141': 'Sirsa', '125149': 'Sirsa',

    // Rewari
    '123101': 'Rewari', '123110': 'Rewari', '123401': 'Rewari', '123411': 'Rewari',
    '123501': 'Rewari', '123502': 'Rewari',

    // Jhajjar
    '124101': 'Jhajjar', '124103': 'Jhajjar', '124104': 'Jhajjar', '124105': 'Jhajjar',
    '124106': 'Jhajjar', '124107': 'Jhajjar', '124108': 'Jhajjar', '124141': 'Jhajjar',
    '124142': 'Jhajjar', '124146': 'Jhajjar', '124201': 'Jhajjar', '124507': 'Jhajjar',

    // Kaithal
    '136027': 'Kaithal', '136033': 'Kaithal', '136034': 'Kaithal', '136035': 'Kaithal',
    '136042': 'Kaithal', '136043': 'Kaithal', '136044': 'Kaithal',

    // Fatehabad
    '125050': 'Fatehabad', '125051': 'Fatehabad', '125111': 'Fatehabad', '125120': 'Fatehabad',
    '125121': 'Fatehabad', '125122': 'Fatehabad',

    // Mahendragarh
    '123023': 'Mahendragarh', '123024': 'Mahendragarh', '123028': 'Mahendragarh',
    '123029': 'Mahendragarh', '123034': 'Mahendragarh', '123035': 'Mahendragarh',

    // Nuh (Mewat)
    '122101': 'Nuh', '122102': 'Nuh', '122103': 'Nuh', '122104': 'Nuh',
    '122105': 'Nuh', '122107': 'Nuh', '122108': 'Nuh',

    // Panchkula
    '134101': 'Panchkula', '134102': 'Panchkula', '134107': 'Panchkula', '134108': 'Panchkula',
    '134109': 'Panchkula', '134112': 'Panchkula', '134113': 'Panchkula', '134114': 'Panchkula',
    '134115': 'Panchkula', '134116': 'Panchkula', '134117': 'Panchkula', '134118': 'Panchkula',

    // Palwal
    '121101': 'Palwal', '121102': 'Palwal', '121104': 'Palwal', '121105': 'Palwal',
    '121106': 'Palwal', '121107': 'Palwal', '121108': 'Palwal',

    // Charkhi Dadri
    '127306': 'Charkhi Dadri', '127308': 'Charkhi Dadri', '127310': 'Charkhi Dadri',
    
    // ============================================
  // MADHYA PRADESH PINCODE DATABASE (55 Districts)
  // ============================================ 
    // INDORE DIVISION (8 districts)
    
    // Indore
    '452001': 'Indore', '452002': 'Indore', '452003': 'Indore', '452004': 'Indore',
    '452005': 'Indore', '452006': 'Indore', '452007': 'Indore', '452008': 'Indore',
    '452009': 'Indore', '452010': 'Indore', '452011': 'Indore', '452012': 'Indore',
    '452013': 'Indore', '452014': 'Indore', '452015': 'Indore', '452016': 'Indore',
    '452017': 'Indore', '452018': 'Indore', '452020': 'Indore',
    
    // Dhar
    '454001': 'Dhar', '454110': 'Dhar', '454111': 'Dhar', '454116': 'Dhar',
    '454331': 'Dhar', '454441': 'Dhar', '454446': 'Dhar', '454552': 'Dhar',
    
    // Jhabua
    '457001': 'Jhabua', '457114': 'Jhabua', '457222': 'Jhabua', '457226': 'Jhabua',
    '457333': 'Jhabua', '457339': 'Jhabua', '457441': 'Jhabua', '457550': 'Jhabua',
    
    // Alirajpur
    '457114': 'Alirajpur', '457222': 'Alirajpur', '457333': 'Alirajpur', '457887': 'Alirajpur',
    
    // Barwani
    '451001': 'Barwani', '451111': 'Barwani', '451113': 'Barwani', '451115': 'Barwani',
    '451220': 'Barwani', '451221': 'Barwani', '451226': 'Barwani', '451440': 'Barwani',
    
    // Khargone
    '451001': 'Khargone', '451115': 'Khargone', '451220': 'Khargone', '451331': 'Khargone',
    '451332': 'Khargone', '451440': 'Khargone', '451556': 'Khargone', '451660': 'Khargone',
    
    // Khandwa
    '450001': 'Khandwa', '450110': 'Khandwa', '450116': 'Khandwa', '450117': 'Khandwa',
    '450221': 'Khandwa', '450331': 'Khandwa', '450337': 'Khandwa', '450551': 'Khandwa',
    
    // Burhanpur
    '450331': 'Burhanpur', '450441': 'Burhanpur', '450551': 'Burhanpur', '450661': 'Burhanpur',
    
    // BHOPAL DIVISION (5 districts)
    
    // Bhopal
    '462001': 'Bhopal', '462002': 'Bhopal', '462003': 'Bhopal', '462004': 'Bhopal',
    '462005': 'Bhopal', '462006': 'Bhopal', '462007': 'Bhopal', '462008': 'Bhopal',
    '462009': 'Bhopal', '462010': 'Bhopal', '462011': 'Bhopal', '462012': 'Bhopal',
    '462013': 'Bhopal', '462016': 'Bhopal', '462020': 'Bhopal', '462021': 'Bhopal',
    '462022': 'Bhopal', '462023': 'Bhopal', '462024': 'Bhopal', '462026': 'Bhopal',
    '462030': 'Bhopal', '462031': 'Bhopal', '462032': 'Bhopal', '462033': 'Bhopal',
    '462036': 'Bhopal', '462037': 'Bhopal', '462038': 'Bhopal', '462039': 'Bhopal',
    '462041': 'Bhopal', '462042': 'Bhopal', '462043': 'Bhopal', '462044': 'Bhopal',
    '462046': 'Bhopal', '462047': 'Bhopal',
    
    // Sehore
    '466001': 'Sehore', '466111': 'Sehore', '466113': 'Sehore', '466114': 'Sehore',
    '466116': 'Sehore', '466221': 'Sehore', '466331': 'Sehore', '466445': 'Sehore',
    
    // Raisen
    '464001': 'Raisen', '464111': 'Raisen', '464220': 'Raisen', '464221': 'Raisen',
    '464224': 'Raisen', '464331': 'Raisen', '464337': 'Raisen', '464551': 'Raisen',
    
    // Rajgarh
    '465001': 'Rajgarh', '465106': 'Rajgarh', '465220': 'Rajgarh', '465223': 'Rajgarh',
    '465331': 'Rajgarh', '465441': 'Rajgarh', '465550': 'Rajgarh', '465661': 'Rajgarh',
    
    // Vidisha
    '464001': 'Vidisha', '464111': 'Vidisha', '464221': 'Vidisha', '464337': 'Vidisha',
    '464551': 'Vidisha', '464668': 'Vidisha', '464770': 'Vidisha', '464881': 'Vidisha',
    
    // GWALIOR DIVISION (5 districts)
    
    // Gwalior
    '474001': 'Gwalior', '474002': 'Gwalior', '474003': 'Gwalior', '474004': 'Gwalior',
    '474005': 'Gwalior', '474006': 'Gwalior', '474007': 'Gwalior', '474008': 'Gwalior',
    '474009': 'Gwalior', '474010': 'Gwalior', '474011': 'Gwalior', '474012': 'Gwalior',
    '474013': 'Gwalior', '474020': 'Gwalior',
    
    // Shivpuri
    '473551': 'Shivpuri', '473661': 'Shivpuri', '473770': 'Shivpuri', '473781': 'Shivpuri',
    '473880': 'Shivpuri', '473885': 'Shivpuri', '473990': 'Shivpuri', '473995': 'Shivpuri',
    
    // Guna
    '473001': 'Guna', '473111': 'Guna', '473113': 'Guna', '473226': 'Guna',
    '473331': 'Guna', '473335': 'Guna', '473444': 'Guna', '473551': 'Guna',
    
    // Ashoknagar
    '473331': 'Ashoknagar', '473444': 'Ashoknagar', '473551': 'Ashoknagar', '473662': 'Ashoknagar',
    
    // Datia
    '475001': 'Datia', '475110': 'Datia', '475115': 'Datia', '475221': 'Datia',
    '475330': 'Datia', '475335': 'Datia', '475441': 'Datia', '475661': 'Datia',
    
    // CHAMBAL DIVISION (3 districts)
    
    // Morena
    '476001': 'Morena', '476111': 'Morena', '476115': 'Morena', '476219': 'Morena',
    '476221': 'Morena', '476332': 'Morena', '476337': 'Morena', '476444': 'Morena',
    
    // Bhind
    '477001': 'Bhind', '477105': 'Bhind', '477111': 'Bhind', '477116': 'Bhind',
    '477222': 'Bhind', '477227': 'Bhind', '477333': 'Bhind', '477441': 'Bhind',
    '477555': 'Bhind', '477557': 'Bhind', '477660': 'Bhind', '477670': 'Bhind',
    
    // Sheopur
    '476001': 'Sheopur', '476111': 'Sheopur', '476221': 'Sheopur', '476332': 'Sheopur',
    
    // JABALPUR DIVISION (8 districts)
    
    // Jabalpur
    '482001': 'Jabalpur', '482002': 'Jabalpur', '482003': 'Jabalpur', '482004': 'Jabalpur',
    '482005': 'Jabalpur', '482006': 'Jabalpur', '482007': 'Jabalpur', '482008': 'Jabalpur',
    '482009': 'Jabalpur', '482010': 'Jabalpur', '482011': 'Jabalpur', '482020': 'Jabalpur',
    '482021': 'Jabalpur', '482051': 'Jabalpur',
    
    // Katni
    '483001': 'Katni', '483110': 'Katni', '483113': 'Katni', '483220': 'Katni',
    '483225': 'Katni', '483332': 'Katni', '483334': 'Katni', '483440': 'Katni',
    '483501': 'Katni', '483504': 'Katni',
    
    // Narsinghpur
    '487001': 'Narsinghpur', '487118': 'Narsinghpur', '487221': 'Narsinghpur', '487330': 'Narsinghpur',
    '487441': 'Narsinghpur', '487551': 'Narsinghpur', '487661': 'Narsinghpur', '487770': 'Narsinghpur',
    
    // Seoni
    '480001': 'Seoni', '480105': 'Seoni', '480110': 'Seoni', '480223': 'Seoni',
    '480331': 'Seoni', '480334': 'Seoni', '480441': 'Seoni', '480557': 'Seoni',
    
    // Balaghat
    '481001': 'Balaghat', '481051': 'Balaghat', '481101': 'Balaghat', '481105': 'Balaghat',
    '481111': 'Balaghat', '481115': 'Balaghat', '481222': 'Balaghat', '481331': 'Balaghat',
    
    // Mandla
    '481661': 'Mandla', '481768': 'Mandla', '481879': 'Mandla', '481881': 'Mandla',
    '481990': 'Mandla', '481995': 'Mandla',
    
    // Chhindwara
    '480001': 'Chhindwara', '480002': 'Chhindwara', '480106': 'Chhindwara', '480109': 'Chhindwara',
    '480110': 'Chhindwara', '480115': 'Chhindwara', '480221': 'Chhindwara', '480223': 'Chhindwara',
    '480331': 'Chhindwara', '480334': 'Chhindwara', '480441': 'Chhindwara', '480551': 'Chhindwara',
    
    // Dindori
    '481880': 'Dindori', '481881': 'Dindori', '481990': 'Dindori', '481995': 'Dindori',
    
    // REWA DIVISION (5 districts)
    
    // Rewa
    '486001': 'Rewa', '486002': 'Rewa', '486003': 'Rewa', '486004': 'Rewa',
    '486005': 'Rewa', '486006': 'Rewa', '486115': 'Rewa', '486220': 'Rewa',
    '486223': 'Rewa', '486331': 'Rewa', '486334': 'Rewa', '486440': 'Rewa',
    
    // Satna
    '485001': 'Satna', '485005': 'Satna', '485111': 'Satna', '485221': 'Satna',
    '485226': 'Satna', '485331': 'Satna', '485441': 'Satna', '485446': 'Satna',
    
    // Sidhi
    '486661': 'Sidhi', '486669': 'Sidhi', '486771': 'Sidhi', '486775': 'Sidhi',
    '486881': 'Sidhi', '486885': 'Sidhi', '486886': 'Sidhi', '486890': 'Sidhi',
    
    // Singrauli
    '486886': 'Singrauli', '486889': 'Singrauli', '486890': 'Singrauli', '486894': 'Singrauli',
    
    // Mauganj (New - 2023)
    '486001': 'Mauganj', '486115': 'Mauganj', '486220': 'Mauganj', '486331': 'Mauganj',
    
    // SAGAR DIVISION (4 districts)
    
    // Sagar
    '470001': 'Sagar', '470002': 'Sagar', '470003': 'Sagar', '470004': 'Sagar',
    '470113': 'Sagar', '470115': 'Sagar', '470117': 'Sagar', '470221': 'Sagar',
    '470223': 'Sagar', '470227': 'Sagar', '470335': 'Sagar', '470441': 'Sagar',
    
    // Damoh
    '470661': 'Damoh', '470663': 'Damoh', '470671': 'Damoh', '470772': 'Damoh',
    '470775': 'Damoh', '470880': 'Damoh', '470881': 'Damoh', '470886': 'Damoh',
    
    // Panna
    '488001': 'Panna', '488220': 'Panna', '488221': 'Panna', '488222': 'Panna',
    '488333': 'Panna', '488441': 'Panna', '488446': 'Panna', '488555': 'Panna',
    
    // Niwari (New - 2018)
    '472001': 'Niwari', '472111': 'Niwari', '472221': 'Niwari', '472331': 'Niwari',
    
    // SHAHDOL DIVISION (5 districts)
    
    // Shahdol
    '484001': 'Shahdol', '484110': 'Shahdol', '484114': 'Shahdol', '484117': 'Shahdol',
    '484220': 'Shahdol', '484224': 'Shahdol', '484331': 'Shahdol', '484334': 'Shahdol',
    
    // Umaria
    '484661': 'Umaria', '484770': 'Umaria', '484776': 'Umaria', '484881': 'Umaria',
    
    // Anuppur
    '484224': 'Anuppur', '484330': 'Anuppur', '484334': 'Anuppur', '484440': 'Anuppur',
    '484441': 'Anuppur', '484551': 'Anuppur', '484661': 'Anuppur', '484886': 'Anuppur',
    
    // Maihar (New - 2023)
    '485001': 'Maihar', '485331': 'Maihar', '485441': 'Maihar', '485771': 'Maihar',
    
    // UJJAIN DIVISION (7 districts)
    
    // Ujjain
    '456001': 'Ujjain', '456006': 'Ujjain', '456010': 'Ujjain', '456221': 'Ujjain',
    '456224': 'Ujjain', '456331': 'Ujjain', '456335': 'Ujjain', '456440': 'Ujjain',
    '456441': 'Ujjain', '456550': 'Ujjain', '456664': 'Ujjain', '456771': 'Ujjain',
    
    // Dewas
    '455001': 'Dewas', '455110': 'Dewas', '455115': 'Dewas', '455116': 'Dewas',
    '455221': 'Dewas', '455223': 'Dewas', '455227': 'Dewas', '455330': 'Dewas',
    '455336': 'Dewas', '455339': 'Dewas', '455440': 'Dewas', '455551': 'Dewas',
    
    // Shajapur
    '465001': 'Shajapur', '465110': 'Shajapur', '465220': 'Shajapur', '465223': 'Shajapur',
    '465337': 'Shajapur', '465441': 'Shajapur', '465550': 'Shajapur', '465661': 'Shajapur',
    
    // Ratlam
    '457001': 'Ratlam', '457114': 'Ratlam', '457222': 'Ratlam', '457226': 'Ratlam',
    '457331': 'Ratlam', '457336': 'Ratlam', '457441': 'Ratlam', '457550': 'Ratlam',
    
    // Mandsaur
    '458001': 'Mandsaur', '458110': 'Mandsaur', '458220': 'Mandsaur', '458226': 'Mandsaur',
    '458330': 'Mandsaur', '458336': 'Mandsaur', '458441': 'Mandsaur', '458667': 'Mandsaur',
    
    // Neemuch
    '458001': 'Neemuch', '458110': 'Neemuch', '458220': 'Neemuch', '458330': 'Neemuch',
    '458441': 'Neemuch', '458470': 'Neemuch', '458556': 'Neemuch', '458667': 'Neemuch',
    
    // Agar Malwa
    '465441': 'Agar Malwa', '465550': 'Agar Malwa', '465661': 'Agar Malwa', '465677': 'Agar Malwa',
    
    // NARMADAPURAM DIVISION (3 districts)
    
    // Narmadapuram (Hoshangabad)
    '461001': 'Narmadapuram', '461110': 'Narmadapuram', '461111': 'Narmadapuram', '461221': 'Narmadapuram',
    '461228': 'Narmadapuram', '461331': 'Narmadapuram', '461441': 'Narmadapuram', '461551': 'Narmadapuram',
    
    // Betul
    '460001': 'Betul', '460110': 'Betul', '460220': 'Betul', '460221': 'Betul',
    '460330': 'Betul', '460440': 'Betul', '460449': 'Betul', '460551': 'Betul',
    
    // Harda
    '461331': 'Harda', '461228': 'Harda', '461441': 'Harda', '461551': 'Harda',
    
    // Pandhurna (New - 2023)
    '480110': 'Pandhurna', '480334': 'Pandhurna', '480441': 'Pandhurna', '480551': 'Pandhurna',


  };

  // ============================================
  // DOM ELEMENTS
  // ============================================
  const elements = {
    form: document.getElementById('calculatorForm'),
    pincodeInput: document.getElementById('pincodeInput'),
    billInput: document.getElementById('billInput'),
    calculateBtn: document.getElementById('calculateBtn'),
    resultsSection: document.getElementById('resultsSection'),
    locationSuccess: document.getElementById('locationSuccess'),
    locationError: document.getElementById('locationError'),
    locationText: document.getElementById('locationText'),
    emiTenureSlider: document.getElementById('emiTenureSlider'),
    emiTenureDisplay: document.getElementById('emiTenureDisplay'),
    quoteForm: document.getElementById('quoteForm'),
    quoteModal: document.getElementById('getQuoteModal'),
  };

  // ============================================
  // INITIALIZATION
  // ============================================
  function init() {
    if (!elements.form) return;
    setupEventListeners();
  }

  // ============================================
  // EVENT LISTENERS
  // ============================================
  function setupEventListeners() {
    // Pincode input
    if (elements.pincodeInput) {
      elements.pincodeInput.addEventListener('input', handlePincodeChange);
    }

    // Bill input
    if (elements.billInput) {
      elements.billInput.addEventListener('input', handleBillChange);
    }

    // Form submission
    if (elements.form) {
      elements.form.addEventListener('submit', (e) => {
        e.preventDefault();
        calculateSolar();
      });
    }

    // EMI tenure slider
    if (elements.emiTenureSlider) {
      elements.emiTenureSlider.addEventListener('input', handleEmiTenureChange);
    }

    // Quote form submission
    if (elements.quoteForm) {
      elements.quoteForm.addEventListener('submit', handleQuoteSubmit);
    }
  }

  // ============================================
  // PINCODE VALIDATION
  // ============================================
  function handlePincodeChange(e) {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    e.target.value = value;
    state.pincode = value;

    // Reset states
    elements.locationSuccess.classList.add('hidden');
    elements.locationError.classList.add('hidden');
    state.location = '';

    // Update input styling
    elements.pincodeInput.classList.remove('border-green-500', 'bg-green-50', 'border-red-500');
    elements.pincodeInput.classList.add('border-gray-200');

    if (value.length === 6) {
      validatePincode(value);
    }

    updateCalculateButton();
  }

  function validatePincode(value) {
    const detectedLocation = pincodeDatabase[value];

    if (detectedLocation) {
      state.location = detectedLocation;
      elements.locationText.textContent = detectedLocation;
      elements.locationSuccess.classList.remove('hidden');
      elements.locationError.classList.add('hidden');

      // Update input styling
      elements.pincodeInput.classList.remove('border-gray-200', 'border-red-500');
      elements.pincodeInput.classList.add('border-green-500', 'bg-green-50');

      return true;
    } else {
      state.location = '';
      elements.locationSuccess.classList.add('hidden');
      elements.locationError.classList.remove('hidden');

      // Update input styling
      elements.pincodeInput.classList.remove('border-gray-200', 'border-green-500', 'bg-green-50');
      elements.pincodeInput.classList.add('border-red-500');

      return false;
    }
  }

  // ============================================
  // BILL INPUT HANDLING
  // ============================================
  function handleBillChange(e) {
    state.electricityBill = e.target.value;
    updateCalculateButton();
  }

  // ============================================
  // BUTTON STATE
  // ============================================
  function updateCalculateButton() {
    const isValid = state.location && state.electricityBill && parseFloat(state.electricityBill) >= 500;

    if (isValid) {
      elements.calculateBtn.disabled = false;
      elements.calculateBtn.classList.remove('bg-gray-300', 'text-gray-500', 'cursor-not-allowed');
      elements.calculateBtn.classList.add('bg-primary', 'hover:bg-blue-700', 'text-white', 'shadow-lg', 'hover:shadow-xl', 'transform', 'hover:scale-[1.02]', 'active:scale-[0.98]');
    } else {
      elements.calculateBtn.disabled = true;
      elements.calculateBtn.classList.add('bg-gray-300', 'text-gray-500', 'cursor-not-allowed');
      elements.calculateBtn.classList.remove('bg-primary', 'hover:bg-blue-700', 'text-white', 'shadow-lg', 'hover:shadow-xl', 'transform', 'hover:scale-[1.02]', 'active:scale-[0.98]');
    }
  }

  // ============================================
  // SOLAR CALCULATION
  // ============================================
  let isCalculating = false;

  function calculateSolar() {
    if (!state.location || !state.electricityBill || parseFloat(state.electricityBill) < 500) {
      return;
    }

    // Prevent double calculations
    if (isCalculating) return;
    isCalculating = true;

    // Show loading state
    const btnText = elements.calculateBtn.querySelector('span:last-child');
    const originalText = btnText ? btnText.textContent : 'Calculate Solar Savings';
    if (btnText) btnText.textContent = 'Calculating...';
    elements.calculateBtn.disabled = true;

    const bill = parseFloat(state.electricityBill);

    // System sizing based on pricing structure
    let selectedSystemSize = 3;
    let selectedSystemCost = 200000;

    if (bill < 2000) {
      selectedSystemSize = 3;
      selectedSystemCost = 200000;
    } else if (bill < 3000) {
      selectedSystemSize = 4;
      selectedSystemCost = 230000;
    } else if (bill < 4000) {
      selectedSystemSize = 5;
      selectedSystemCost = 300000;
    } else if (bill < 5000) {
      selectedSystemSize = 7;
      selectedSystemCost = 350000;
    } else {
      selectedSystemSize = 10;
      selectedSystemCost = 450000;
    }

    state.systemSize = selectedSystemSize;
    state.roofArea = Math.round(selectedSystemSize * 100);

    // Savings calculation
    let cumulativeSavings = 0;
    let fiveYearTotal = 0;

    for (let year = 1; year <= 25; year++) {
      const degradation = Math.pow(0.99, year - 1);
      const inflation = Math.pow(1.03, year - 1);
      const yearSavings = bill * 12 * degradation * inflation;
      cumulativeSavings += yearSavings;
      if (year <= 5) fiveYearTotal += yearSavings;
    }

    const avgYearlySavings = cumulativeSavings / 25;
    const avgMonthlySavings = avgYearlySavings / 12;

    state.monthlySavings = Math.round(avgMonthlySavings);
    state.yearlySavings = Math.round(avgYearlySavings);
    state.fiveYearSavings = Math.round(fiveYearTotal);

    state.totalCost = selectedSystemCost;

    // Subsidy calculation - ₹78,000 for systems >= 3kW
    let subsidyCalc = 0;
    if (selectedSystemSize >= 3) {
      subsidyCalc = 78000;
    } else {
      subsidyCalc = (selectedSystemSize / 3) * 78000;
    }
    state.subsidy = Math.round(subsidyCalc);
    state.netCost = Math.round(selectedSystemCost - subsidyCalc);

    const minDownPaymentCalc = Math.round(selectedSystemCost * 0.2);
    state.downPayment = minDownPaymentCalc;
    state.netDownPayment = Math.max(0, minDownPaymentCalc - subsidyCalc);

    calculateEMI(state.netCost, state.emiTenure);

    // Environmental impact
    const yearlyGeneration = selectedSystemSize * 1400;
    const lifetimeGeneration = yearlyGeneration * 25;

    state.co2Mitigated = Math.round(lifetimeGeneration * 0.7);
    state.treesPlanted = Math.round(lifetimeGeneration * 0.7 / 20);
    state.distanceKm = Math.round(lifetimeGeneration * 2.5);

    state.showResults = true;

    // Reset loading state
    isCalculating = false;
    const calcBtnText = elements.calculateBtn.querySelector('span:last-child');
    if (calcBtnText) calcBtnText.textContent = 'Calculate Solar Savings';
    elements.calculateBtn.disabled = false;

    displayResults();
    scrollToResults();
  }

  // ============================================
  // EMI CALCULATION
  // ============================================
  function calculateEMI(principal, months) {
    const rate = 0.095 / 12; // 9.5% annual rate
    const emiCalc = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
    state.emi = Math.round(emiCalc);
  }

  function handleEmiTenureChange(e) {
    state.emiTenure = parseInt(e.target.value);
    const years = Math.round(state.emiTenure / 12);
    elements.emiTenureDisplay.textContent = `${years} year${years > 1 ? 's' : ''}`;

    if (state.showResults) {
      calculateEMI(state.netCost, state.emiTenure);
      updateEMIDisplay();
    }
  }

  // ============================================
  // DISPLAY RESULTS
  // ============================================
  function displayResults() {
    // Update all result values
    document.getElementById('systemSizeValue').textContent = `${state.systemSize} kW`;
    document.getElementById('roofAreaValue').textContent = `${state.roofArea} sq. ft.`;
    document.getElementById('monthlySavingsValue').textContent = `₹${formatNumber(state.monthlySavings)}`;
    document.getElementById('yearlySavingsValue').textContent = `₹${formatNumber(state.yearlySavings)}`;
    document.getElementById('fiveYearSavingsValue').textContent = `₹${formatNumber(state.fiveYearSavings)}`;
    document.getElementById('totalCostValue').textContent = `₹${formatNumber(state.totalCost)}`;
    document.getElementById('subsidyValue').textContent = `-₹${formatNumber(state.subsidy)}`;
    document.getElementById('netCostValue').textContent = `₹${formatNumber(state.netCost)}`;

    updateEMIDisplay();

    document.getElementById('co2Value').textContent = formatNumber(state.co2Mitigated);
    document.getElementById('treesValue').textContent = formatNumber(state.treesPlanted);
    document.getElementById('distanceValue').textContent = formatNumber(state.distanceKm);

    // Show results section
    elements.resultsSection.classList.remove('hidden');
  }

  function updateEMIDisplay() {
    document.getElementById('downPaymentValue').textContent = `₹${formatNumber(state.downPayment)}`;
    document.getElementById('emiSubsidyValue').textContent = `-₹${formatNumber(state.subsidy)}`;
    document.getElementById('netDownPaymentValue').textContent = `₹${formatNumber(state.netDownPayment)}`;
    document.getElementById('emiValue').textContent = `₹${formatNumber(state.emi)}`;
  }

  // ============================================
  // TAB SWITCHING
  // ============================================
  window.switchTab = function (tab) {
    state.activeTab = tab;

    // Update tab buttons
    ['System', 'Savings', 'Investment'].forEach(t => {
      const btn = document.getElementById(`tab${t}`);
      const content = document.getElementById(`content${t}`);

      if (t.toLowerCase() === tab) {
        btn.classList.add('tab-active');
        btn.classList.remove('text-gray-500');
        content.classList.remove('hidden');
      } else {
        btn.classList.remove('tab-active');
        btn.classList.add('text-gray-500');
        content.classList.add('hidden');
      }
    });
  };

  // ============================================
  // QUOTE MODAL
  // ============================================
  window.showQuoteModal = function () {
    elements.quoteModal.classList.remove('hidden');
  };

  window.closeQuoteModal = function () {
    elements.quoteModal.classList.add('hidden');
  };

  // Flag to prevent double submissions
  let isSubmitting = false;

  async function handleQuoteSubmit(e) {
    e.preventDefault();

    // Prevent double submission
    if (isSubmitting) {
      console.log('Form already submitting, ignoring duplicate submit');
      return;
    }

    isSubmitting = true;

    // Get the submit button and show loading state
    const submitBtn = elements.quoteForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';

    const formData = {
      name: document.getElementById('quoteName').value,
      phone: document.getElementById('quotePhone').value,
      email: document.getElementById('quoteEmail').value,
      pincode: state.pincode,
      city: state.location,
      monthlyBill: state.electricityBill,
      systemSize: state.systemSize,
      estimatedCost: state.netCost,
      customerType: 'residential',
      source: 'calculator',
      saveLead: true,
    };

    try {
      // Call /api/calculate with saveLead: true to save both calculator result AND lead
      const response = await fetch('/api/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // Required fields for calculation
          monthlyBill: state.electricityBill,
          city: state.location,
          customerType: 'residential',
          pincode: state.pincode,
          // Flag to save lead
          saveLead: true,
          // User contact info for lead
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert('Thank you! Our team will contact you within 24 hours.');
        closeQuoteModal();
        elements.quoteForm.reset();
      } else {
        alert(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Lead submission error:', error);
      alert('Failed to submit. Please try again.');
    } finally {
      // Reset submission state
      isSubmitting = false;
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
    }
  }

  // ============================================
  // UTILITY FUNCTIONS
  // ============================================
  function formatNumber(num) {
    return num.toLocaleString('en-IN');
  }

  function scrollToResults() {
    if (elements.resultsSection) {
      setTimeout(() => {
        elements.resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }

  // ============================================
  // INITIALIZE ON DOM READY
  // ============================================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

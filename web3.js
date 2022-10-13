var provider;
var address;
var chainId;
var network;
var contractAddress;
var contractAbi;
var contractGetter;

var selectedGoalkeepers = [];
var selectedDefenders = [];
var selectedMidfielders = [];
var selectedStrikers = [];

var totalPrice = 0;

var players = {
  0: { name: "Meret", price: 18 },
  1: { name: "Maignan", price: 17 },
  2: { name: "Silvestri", price: 15 },
  3: { name: "Provedel", price: 15 },
  4: { name: "Musso", price: 14 },
  5: { name: "Vicario", price: 14 },
  6: { name: "Sepe", price: 13 },
  7: { name: "Consigli", price: 13 },
  8: { name: "Falcone", price: 12 },
  9: { name: "Szczesny", price: 11 },
  10: { name: "Rui Patricio", price: 11 },
  11: { name: "Montipo", price: 11 },
  12: { name: "Handanovic", price: 10 },
  13: { name: "Milinkovic-Savic V.", price: 10 },
  14: { name: "Skorupski", price: 9 },
  15: { name: "Perin", price: 9 },
  16: { name: "Di Gregorio", price: 9 },
  17: { name: "Gollini", price: 8 },
  18: { name: "Terracciano", price: 7 },
  19: { name: "Sportiello", price: 6 },
  20: { name: "Berisha", price: 6 },
  21: { name: "Audero", price: 6 },
  22: { name: "Radu I.", price: 6 },
  23: { name: "Dragowski", price: 6 },
  24: { name: "Cragno", price: 6 },
  25: { name: "Luis Maximiano", price: 6 },
  26: { name: "Tatarusanu", price: 4 },
  27: { name: "Onana", price: 2 },
  28: { name: "Mirante", price: 1 },
  29: { name: "Sarr M.", price: 1 },
  30: { name: "Lamanna", price: 1 },
  31: { name: "Ujkani", price: 1 },
  32: { name: "Pegolo", price: 1 },
  33: { name: "Perilli", price: 1 },
  34: { name: "Padelli", price: 1 },
  35: { name: "Perisan", price: 1 },
  36: { name: "Bardi", price: 1 },
  37: { name: "Cordaz", price: 1 },
  38: { name: "Pinsoglio", price: 1 },
  39: { name: "Fiorillo", price: 1 },
  40: { name: "Sirigu", price: 1 },
  41: { name: "Cerofolini", price: 1 },
  42: { name: "Rossi F.", price: 1 },
  43: { name: "Contini", price: 1 },
  44: { name: "Brancolini", price: 1 },
  45: { name: "Carnesecchi", price: 1 },
  46: { name: "Bleve", price: 1 },
  47: { name: "Berardi A.", price: 1 },
  48: { name: "Russo A.", price: 1 },
  49: { name: "Gemello", price: 1 },
  50: { name: "Ravaglia", price: 1 },
  51: { name: "Zoet", price: 1 },
  52: { name: "Boer", price: 1 },
  53: { name: "Adamonis", price: 1 },
  54: { name: "Marfella", price: 1 },
  55: { name: "Zovko", price: 1 },
  56: { name: "Piana", price: 1 },
  57: { name: "Bagnolini", price: 1 },
  58: { name: "Svilar", price: 1 },
  59: { name: "Sorrentino A.", price: 1 },
  60: { name: "Ciezkowski", price: 1 },
  61: { name: "Micai", price: 1 },
  62: { name: "Chiesa M.", price: 1 },
  63: { name: "Saro", price: 1 },
  64: { name: "Smalling", price: 20 },
  65: { name: "Hernandez T.", price: 19 },
  66: { name: "Bastoni S.", price: 17 },
  67: { name: "Dumfries", price: 17 },
  68: { name: "Kim", price: 17 },
  69: { name: "Udogie", price: 16 },
  70: { name: "Bremer", price: 15 },
  71: { name: "Demiral", price: 15 },
  72: { name: "Rodrigo Becao", price: 15 },
  73: { name: "Romagnoli", price: 14 },
  74: { name: "Ibanez", price: 14 },
  75: { name: "Parisi", price: 14 },
  76: { name: "Toloi", price: 13 },
  77: { name: "Gosens", price: 13 },
  78: { name: "Di Lorenzo", price: 13 },
  79: { name: "Rrahmani", price: 13 },
  80: { name: "Tomori", price: 13 },
  81: { name: "Mazzocchi", price: 13 },
  82: { name: "Doig", price: 13 },
  83: { name: "Valeri", price: 13 },
  84: { name: "Mario Rui", price: 12 },
  85: { name: "Dimarco", price: 12 },
  86: { name: "Kalulu", price: 12 },
  87: { name: "Calabria", price: 11 },
  88: { name: "Skriniar", price: 11 },
  89: { name: "Spinazzola", price: 11 },
  90: { name: "Vojvoda", price: 11 },
  91: { name: "Bijol", price: 11 },
  92: { name: "Bonucci", price: 10 },
  93: { name: "Bastoni", price: 10 },
  94: { name: "Lazzari", price: 10 },
  95: { name: "Mancini", price: 10 },
  96: { name: "Danilo", price: 10 },
  97: { name: "Mari", price: 10 },
  98: { name: "Scalvini", price: 10 },
  99: { name: "Carlos Augusto", price: 10 },
  100: { name: "Patric", price: 9 },
  101: { name: "Rodriguez R.", price: 9 },
  102: { name: "Darmian", price: 9 },
  103: { name: "Singo", price: 9 },
  104: { name: "Martinez Quarta", price: 9 },
  105: { name: "Maehle", price: 9 },
  106: { name: "Dodo", price: 9 },
  107: { name: "Schuurs", price: 9 },
  108: { name: "Biraghi", price: 8 },
  109: { name: "Medel", price: 8 },
  110: { name: "Faraoni", price: 8 },
  111: { name: "Milenkovic", price: 8 },
  112: { name: "Perez N.", price: 8 },
  113: { name: "Baschirotto", price: 8 },
  114: { name: "Lucumi", price: 8 },
  115: { name: "Masina", price: 7 },
  116: { name: "Hysaj", price: 7 },
  117: { name: "De Vrij", price: 7 },
  118: { name: "Zappacosta", price: 7 },
  119: { name: "Bianchetti", price: 7 },
  120: { name: "Rogerio", price: 7 },
  121: { name: "Sernicola", price: 7 },
  122: { name: "Toljan", price: 7 },
  123: { name: "Kyriakopoulos", price: 7 },
  124: { name: "Celik", price: 7 },
  125: { name: "Erlic", price: 7 },
  126: { name: "Ismajli", price: 7 },
  127: { name: "Daniliuc", price: 7 },
  128: { name: "Kiwior", price: 7 },
  129: { name: "Olivera", price: 7 },
  130: { name: "Posch", price: 7 },
  131: { name: "Ghiglione", price: 6 },
  132: { name: "De Silvestri", price: 6 },
  133: { name: "Alex Sandro", price: 6 },
  134: { name: "Pezzella Giu.", price: 6 },
  135: { name: "Ferrari G.", price: 6 },
  136: { name: "Hateboer", price: 6 },
  137: { name: "Depaoli", price: 6 },
  138: { name: "Karsdorp", price: 6 },
  139: { name: "Marusic", price: 6 },
  140: { name: "Nuytinck", price: 6 },
  141: { name: "Umtiti", price: 6 },
  142: { name: "Lykogiannis", price: 6 },
  143: { name: "Reca", price: 6 },
  144: { name: "Colley", price: 6 },
  145: { name: "Djidji", price: 6 },
  146: { name: "Ampadu", price: 6 },
  147: { name: "Bellanova", price: 6 },
  148: { name: "Stojanovic", price: 6 },
  149: { name: "Casale", price: 6 },
  150: { name: "Cambiaso", price: 6 },
  151: { name: "Pongracic", price: 6 },
  152: { name: "Kasius", price: 6 },
  153: { name: "Bronn", price: 6 },
  154: { name: "Hien", price: 6 },
  155: { name: "Izzo", price: 5 },
  156: { name: "D ambrosio", price: 5 },
  157: { name: "Juan Jesus", price: 5 },
  158: { name: "De Sciglio", price: 5 },
  159: { name: "Acerbi", price: 5 },
  160: { name: "Chiriches", price: 5 },
  161: { name: "Fazio", price: 5 },
  162: { name: "Palomino", price: 5 },
  163: { name: "Buongiorno", price: 5 },
  164: { name: "Aina", price: 5 },
  165: { name: "Nikolaou", price: 5 },
  166: { name: "Lazaro", price: 5 },
  167: { name: "Igor", price: 5 },
  168: { name: "Augello", price: 5 },
  169: { name: "Gallo", price: 5 },
  170: { name: "Caldirola", price: 5 },
  171: { name: "Ayhan", price: 5 },
  172: { name: "Dest", price: 5 },
  173: { name: "Holm", price: 5 },
  174: { name: "Soppy", price: 5 },
  175: { name: "Birindelli", price: 5 },
  176: { name: "Gendrey", price: 5 },
  177: { name: "Ferrari A.", price: 4 },
  178: { name: "Luperto", price: 4 },
  179: { name: "Florenzi", price: 4 },
  180: { name: "Sala", price: 4 },
  181: { name: "Gyomber", price: 4 },
  182: { name: "Djimsiti", price: 4 },
  183: { name: "Caldara", price: 4 },
  184: { name: "Ceccherini", price: 4 },
  185: { name: "Bereszynski", price: 4 },
  186: { name: "Bonifazi", price: 4 },
  187: { name: "Hristov", price: 4 },
  188: { name: "Marlon", price: 4 },
  189: { name: "Kjaer", price: 4 },
  190: { name: "Gunter", price: 4 },
  191: { name: "Walukiewicz", price: 4 },
  192: { name: "Okoli", price: 4 },
  193: { name: "Soumaoro", price: 4 },
  194: { name: "Ballo-Toure", price: 4 },
  195: { name: "Amian", price: 4 },
  196: { name: "Ebuehi", price: 4 },
  197: { name: "Bradaric", price: 4 },
  198: { name: "De Winter", price: 4 },
  199: { name: "Ostigard", price: 4 },
  200: { name: "Sambia", price: 4 },
  201: { name: "Quagliata", price: 4 },
  202: { name: "Ebosse", price: 4 },
  203: { name: "Lochoshvili", price: 4 },
  204: { name: "Ehizibue", price: 4 },
  205: { name: "Thiaw", price: 4 },
  206: { name: "Marrone", price: 3 },
  207: { name: "Rugani", price: 3 },
  208: { name: "Murru", price: 3 },
  209: { name: "Terzic", price: 3 },
  210: { name: "Kumbulla", price: 3 },
  211: { name: "Lovato", price: 3 },
  212: { name: "Tuia", price: 3 },
  213: { name: "Vasquez", price: 3 },
  214: { name: "Zima", price: 3 },
  215: { name: "Aiwu", price: 3 },
  216: { name: "Hendry", price: 3 },
  217: { name: "Conti", price: 2 },
  218: { name: "Radovanovic", price: 2 },
  219: { name: "Murillo", price: 2 },
  220: { name: "Venuti", price: 2 },
  221: { name: "Donati", price: 2 },
  222: { name: "Gabbia", price: 2 },
  223: { name: "Zortea", price: 2 },
  224: { name: "Dawidowicz", price: 2 },
  225: { name: "Cetin", price: 2 },
  226: { name: "Muldur", price: 2 },
  227: { name: "Adopo", price: 2 },
  228: { name: "Pirola", price: 2 },
  229: { name: "Carboni", price: 2 },
  230: { name: "Amione", price: 2 },
  231: { name: "Vina", price: 2 },
  232: { name: "Coppola D.", price: 2 },
  233: { name: "Gatti", price: 2 },
  234: { name: "Gila", price: 2 },
  235: { name: "Cabal", price: 2 },
  236: { name: "Dermaku", price: 1 },
  237: { name: "Tonelli", price: 1 },
  238: { name: "Radu", price: 1 },
  239: { name: "Paletta", price: 1 },
  240: { name: "Fares", price: 1 },
  241: { name: "Marchizza", price: 1 },
  242: { name: "Romagna", price: 1 },
  243: { name: "Magnani", price: 1 },
  244: { name: "Ranieri L.", price: 1 },
  245: { name: "Ferrer", price: 1 },
  246: { name: "Ruggeri", price: 1 },
  247: { name: "Antov", price: 1 },
  248: { name: "Amey", price: 1 },
  249: { name: "Ferrarini", price: 1 },
  250: { name: "Kamenovic", price: 1 },
  251: { name: "Zanoli", price: 1 },
  252: { name: "Zanotti", price: 1 },
  253: { name: "Ruan", price: 1 },
  254: { name: "Motoc", price: 1 },
  255: { name: "Cacace", price: 1 },
  256: { name: "Bayeye", price: 1 },
  257: { name: "Ebosele", price: 1 },
  258: { name: "Buta", price: 1 },
  259: { name: "Ndiaye", price: 1 },
  260: { name: "Abankwah", price: 1 },
  261: { name: "Guessand A.", price: 1 },
  262: { name: "Sosa", price: 1 },
  263: { name: "Guarino", price: 1 },
  264: { name: "Milinkovic-Savic", price: 32 },
  265: { name: "Kvaratskhelia", price: 26 },
  266: { name: "Zielinski", price: 25 },
  267: { name: "Zaccagni", price: 24 },
  268: { name: "Barella", price: 24 },
  269: { name: "Luis Alberto", price: 24 },
  270: { name: "Koopmeiners", price: 23 },
  271: { name: "Pereyra", price: 22 },
  272: { name: "Politano", price: 22 },
  273: { name: "Frattesi", price: 22 },
  274: { name: "Felipe Anderson", price: 21 },
  275: { name: "Vlasic", price: 21 },
  276: { name: "Pellegrini Lo.", price: 20 },
  277: { name: "Calhanoglu", price: 20 },
  278: { name: "Zambo Anguissa", price: 19 },
  279: { name: "Malinovskyi", price: 19 },
  280: { name: "Strefezza", price: 19 },
  281: { name: "Candreva", price: 17 },
  282: { name: "Chiesa", price: 17 },
  283: { name: "Pasalic", price: 17 },
  284: { name: "Lobotka", price: 17 },
  285: { name: "De Ketelaere", price: 17 },
  286: { name: "Pogba", price: 16 },
  287: { name: "Bennacer", price: 16 },
  288: { name: "Diaz B.", price: 16 },
  289: { name: "Barak", price: 15 },
  290: { name: "Kostic", price: 15 },
  291: { name: "Samardzic", price: 15 },
  292: { name: "Brozovic", price: 14 },
  293: { name: "Bonaventura", price: 14 },
  294: { name: "Sensi", price: 14 },
  295: { name: "Radonjic", price: 14 },
  296: { name: "Lovric", price: 14 },
  297: { name: "Lazovic", price: 13 },
  298: { name: "Tonali", price: 13 },
  299: { name: "Ikone", price: 13 },
  300: { name: "Bajrami", price: 13 },
  301: { name: "Cristante", price: 12 },
  302: { name: "Mandragora", price: 12 },
  303: { name: "Bandinelli", price: 12 },
  304: { name: "Mkhitaryan", price: 12 },
  305: { name: "Soriano", price: 12 },
  306: { name: "Pessina", price: 12 },
  307: { name: "Zaniolo", price: 12 },
  308: { name: "Sottil", price: 12 },
  309: { name: "Elmas", price: 12 },
  310: { name: "Arslan", price: 12 },
  311: { name: "Paredes", price: 11 },
  312: { name: "Djuricic", price: 11 },
  313: { name: "Lukic", price: 11 },
  314: { name: "Traore Hj.", price: 11 },
  315: { name: "Messias", price: 11 },
  316: { name: "Thorstvedt", price: 11 },
  317: { name: "Vilhena", price: 11 },
  318: { name: "Cuadrado", price: 10 },
  319: { name: "Locatelli", price: 10 },
  320: { name: "Wijnaldum", price: 10 },
  321: { name: "Tameze", price: 10 },
  322: { name: "Sabiri", price: 10 },
  323: { name: "Miretti", price: 10 },
  324: { name: "Vecino", price: 9 },
  325: { name: "Verdi", price: 9 },
  326: { name: "Orsolini", price: 9 },
  327: { name: "Dominguez", price: 9 },
  328: { name: "Miranchuk", price: 9 },
  329: { name: "Ederson D.s.", price: 9 },
  330: { name: "Colpani", price: 9 },
  331: { name: "De Roon", price: 8 },
  332: { name: "Saponara", price: 8 },
  333: { name: "Walace", price: 8 },
  334: { name: "Matic", price: 8 },
  335: { name: "Meite", price: 8 },
  336: { name: "Ndombele", price: 8 },
  337: { name: "Ascacibar", price: 8 },
  338: { name: "Henderson L.", price: 8 },
  339: { name: "Mckennie", price: 8 },
  340: { name: "Maggiore", price: 8 },
  341: { name: "Ilic", price: 8 },
  342: { name: "Makengo", price: 8 },
  343: { name: "Zalewski", price: 8 },
  344: { name: "Ricci S.", price: 8 },
  345: { name: "Coulibaly L.", price: 8 },
  346: { name: "El Shaarawy", price: 7 },
  347: { name: "Rabiot", price: 7 },
  348: { name: "Agudelo", price: 7 },
  349: { name: "Amrabat", price: 7 },
  350: { name: "Gyasi", price: 7 },
  351: { name: "Kovalenko", price: 7 },
  352: { name: "Hjulmand", price: 7 },
  353: { name: "Ciurria", price: 7 },
  354: { name: "Gonzalez J.", price: 7 },
  355: { name: "Grassi", price: 6 },
  356: { name: "Krunic", price: 6 },
  357: { name: "Rincon", price: 6 },
  358: { name: "Cataldi", price: 6 },
  359: { name: "Miguel Veloso", price: 6 },
  360: { name: "Haas", price: 6 },
  361: { name: "Bourabia", price: 6 },
  362: { name: "Zurkowski", price: 6 },
  363: { name: "Schouten", price: 6 },
  364: { name: "Rovella", price: 6 },
  365: { name: "Lopez M.", price: 6 },
  366: { name: "Saelemaekers", price: 6 },
  367: { name: "Pobega", price: 6 },
  368: { name: "Harroui", price: 6 },
  369: { name: "Ceide", price: 6 },
  370: { name: "Marcos Antonio", price: 6 },
  371: { name: "Blin", price: 6 },
  372: { name: "Camara Ma.", price: 6 },
  373: { name: "Verre", price: 5 },
  374: { name: "Barberis", price: 5 },
  375: { name: "Linetty", price: 5 },
  376: { name: "Ekdal", price: 5 },
  377: { name: "Vieira", price: 5 },
  378: { name: "Castrovilli", price: 5 },
  379: { name: "Villar", price: 5 },
  380: { name: "Marin", price: 5 },
  381: { name: "Maleh", price: 5 },
  382: { name: "Vranckx", price: 5 },
  383: { name: "Basic", price: 5 },
  384: { name: "Asllani", price: 5 },
  385: { name: "Pickel", price: 5 },
  386: { name: "Bistrovic", price: 5 },
  387: { name: "Duncan", price: 4 },
  388: { name: "Gagliardini", price: 4 },
  389: { name: "Valoti", price: 4 },
  390: { name: "Leris", price: 4 },
  391: { name: "Winks", price: 4 },
  392: { name: "Matheus Henrique", price: 4 },
  393: { name: "Aebischer", price: 4 },
  394: { name: "Ferguson", price: 4 },
  395: { name: "Adli", price: 4 },
  396: { name: "Hrustic", price: 4 },
  397: { name: "Moro N.", price: 4 },
  398: { name: "Oudin", price: 4 },
  399: { name: "D alessandro", price: 3 },
  400: { name: "Baez", price: 3 },
  401: { name: "Molina S.", price: 3 },
  402: { name: "Kastanos", price: 3 },
  403: { name: "Gaetano", price: 3 },
  404: { name: "Maldini", price: 3 },
  405: { name: "Escalante", price: 3 },
  406: { name: "Bohinen", price: 3 },
  407: { name: "Terracciano F.", price: 3 },
  408: { name: "Baldanzi", price: 3 },
  409: { name: "Milanese", price: 3 },
  410: { name: "Listkowski", price: 3 },
  411: { name: "Benassi", price: 2 },
  412: { name: "Vignato", price: 2 },
  413: { name: "Askildsen", price: 2 },
  414: { name: "Hongla", price: 2 },
  415: { name: "Castagnetti", price: 2 },
  416: { name: "Helgason", price: 2 },
  417: { name: "Ranocchia F.", price: 2 },
  418: { name: "Ellertsson", price: 2 },
  419: { name: "Capezzi", price: 1 },
  420: { name: "Jajalo", price: 1 },
  421: { name: "Machin", price: 1 },
  422: { name: "Bakayoko", price: 1 },
  423: { name: "Scozzarella", price: 1 },
  424: { name: "Fagioli", price: 1 },
  425: { name: "Obiang", price: 1 },
  426: { name: "Demme", price: 1 },
  427: { name: "Akpa Akpro", price: 1 },
  428: { name: "Darboe", price: 1 },
  429: { name: "Bove", price: 1 },
  430: { name: "Urbanski", price: 1 },
  431: { name: "Bertini", price: 1 },
  432: { name: "Cortinovis", price: 1 },
  433: { name: "Romero L.", price: 1 },
  434: { name: "Bianco", price: 1 },
  435: { name: "Yepes", price: 1 },
  436: { name: "Sher", price: 1 },
  437: { name: "Nguiamba", price: 1 },
  438: { name: "Volpato", price: 1 },
  439: { name: "Praszelik", price: 1 },
  440: { name: "Trimboli", price: 1 },
  441: { name: "Pafundi", price: 1 },
  442: { name: "Bjorkengren", price: 1 },
  443: { name: "Vignato S.", price: 1 },
  444: { name: "Bondo", price: 1 },
  445: { name: "Samek", price: 1 },
  446: { name: "Zerbin", price: 1 },
  447: { name: "Ilkhan", price: 1 },
  448: { name: "Degli Innocenti", price: 1 },
  449: { name: "Fazzini", price: 1 },
  450: { name: "Acella", price: 1 },
  451: { name: "Tripi", price: 1 },
  452: { name: "D andrea", price: 1 },
  453: { name: "Garbett", price: 1 },
  454: { name: "Immobile", price: 39 },
  455: { name: "Vlahovic", price: 39 },
  456: { name: "Dybala", price: 34 },
  457: { name: "Rafael Leao", price: 33 },
  458: { name: "Arnautovic", price: 32 },
  459: { name: "Giroud", price: 31 },
  460: { name: "Martinez L.", price: 30 },
  461: { name: "Beto", price: 30 },
  462: { name: "Lukaku", price: 29 },
  463: { name: "Abraham", price: 27 },
  464: { name: "Osimhen", price: 27 },
  465: { name: "Berardi", price: 25 },
  466: { name: "Deulofeu", price: 25 },
  467: { name: "Zapata D.", price: 23 },
  468: { name: "Milik", price: 23 },
  469: { name: "Pedro", price: 23 },
  470: { name: "Dia", price: 23 },
  471: { name: "Simeone", price: 22 },
  472: { name: "Muriel", price: 21 },
  473: { name: "Sanabria", price: 20 },
  474: { name: "Correa", price: 20 },
  475: { name: "Caprari", price: 20 },
  476: { name: "Di Maria", price: 20 },
  477: { name: "Lookman", price: 20 },
  478: { name: "Bonazzoli", price: 18 },
  479: { name: "Dzeko", price: 18 },
  480: { name: "Pinamonti", price: 18 },
  481: { name: "Nzola", price: 18 },
  482: { name: "Henry", price: 18 },
  483: { name: "Jovic", price: 17 },
  484: { name: "Gonzalez N.", price: 17 },
  485: { name: "Lauriente", price: 17 },
  486: { name: "Rebic", price: 16 },
  487: { name: "Piatek", price: 16 },
  488: { name: "Caputo", price: 16 },
  489: { name: "Ceesay", price: 16 },
  490: { name: "Raspadori", price: 15 },
  491: { name: "Lozano", price: 15 },
  492: { name: "Lammers", price: 15 },
  493: { name: "Dessers", price: 15 },
  494: { name: "Belotti", price: 14 },
  495: { name: "Kouame", price: 14 },
  496: { name: "Okereke", price: 14 },
  497: { name: "Gabbiadini", price: 13 },
  498: { name: "Destro", price: 13 },
  499: { name: "Barrow", price: 13 },
  500: { name: "Botheim", price: 13 },
  501: { name: "Alvarez A.", price: 13 },
  502: { name: "Verde", price: 12 },
  503: { name: "Satriano", price: 12 },
  504: { name: "Cabral", price: 12 },
  505: { name: "Origi", price: 11 },
  506: { name: "Mota", price: 11 },
  507: { name: "Hojlund", price: 11 },
  508: { name: "Lasagna", price: 10 },
  509: { name: "Pjaca", price: 10 },
  510: { name: "Success", price: 10 },
  511: { name: "Banda", price: 10 },
  512: { name: "Petagna", price: 9 },
  513: { name: "Nestorovski", price: 9 },
  514: { name: "Kean", price: 9 },
  515: { name: "Gytkjaer", price: 9 },
  516: { name: "Di Francesco F.", price: 8 },
  517: { name: "Pellegri", price: 8 },
  518: { name: "Ibrahimovic", price: 8 },
  519: { name: "Boga", price: 8 },
  520: { name: "Zanimacchia", price: 8 },
  521: { name: "Piccoli", price: 8 },
  522: { name: "Shomurodov", price: 8 },
  523: { name: "Djuric", price: 8 },
  524: { name: "Quagliarella", price: 7 },
  525: { name: "Zirkzee", price: 6 },
  526: { name: "Kallon", price: 6 },
  527: { name: "Antiste", price: 6 },
  528: { name: "Strelec", price: 6 },
  529: { name: "Seck", price: 6 },
  530: { name: "Buonaiuto", price: 6 },
  531: { name: "Pussetto", price: 5 },
  532: { name: "Afena-Gyan", price: 5 },
  533: { name: "Ciofani D.", price: 4 },
  534: { name: "Sansone", price: 4 },
  535: { name: "Defrel", price: 4 },
  536: { name: "Cambiaghi", price: 4 },
  537: { name: "Colombo", price: 4 },
  538: { name: "Cancellieri", price: 4 },
  539: { name: "Tsadjout", price: 4 },
  540: { name: "Karamoh", price: 3 },
  541: { name: "Ribery", price: 3 },
  542: { name: "De Luca", price: 2 },
  543: { name: "Rodriguez P.", price: 2 },
  544: { name: "Sanca", price: 2 },
  545: { name: "Edera", price: 1 },
  546: { name: "Oddei", price: 1 },
  547: { name: "Raimondo", price: 1 },
  548: { name: "Kristoffersen", price: 1 },
  549: { name: "Kaio Jorge", price: 1 },
  550: { name: "Soule", price: 1 },
  551: { name: "Lazetic", price: 1 },
  552: { name: "Voelkerling Persson", price: 1 },
  553: { name: "Valencia D.", price: 1 },
};

const connectBtn = document.getElementById("connect_wallet");
const registerBtn = document.getElementById("register_player");
const allPlayers = document.getElementById("all_players");
const createTeamBtn = document.getElementById("create_team");
const showBalanceBtn = document.getElementById("show_balance");
const showTeamBtn = document.getElementById("show_team");
const teamPlayers = document.getElementById("team_players");
const goalkeepersPlayers = document.getElementById("goalkeepers_all_players");
const defendersPlayers = document.getElementById("defenders_all_players");
const midfieldersPlayers = document.getElementById("midfielders_all_players");
const strikersPlayers = document.getElementById("strikers_all_players");
const goalkeepersTeam = document.getElementById("goalkeepers_team");
const defendersTeam = document.getElementById("defenders_team");
const midfieldersTeam = document.getElementById("midfielders_team");
const strikersTeam = document.getElementById("strikers_team");

connectBtn.addEventListener("click", () => connectWallet());

async function connectWallet() {
  provider = new ethers.providers.Web3Provider(window.ethereum);
  let addresses = await provider.send("eth_requestAccounts", []);
  console.log("Addresses : ", addresses);
  address = addresses[0];
  signer = provider.getSigner();
  network = await provider.getNetwork();
  chainId = network["chainId"];
  if (chainId != 80001) {
    alert("Switch to Polygon Testnet!");
  } else {
    connectBtn.innerHTML = address;
    connectBtn.disabled = true;
    contractInit();
    showRegistration();
    showBalanceButton();
  }
}

function contractInit() {
  contractAddress = "0xdb6E23B437EdfEc00Aa7caAc2dF10ca0281C2E84";
  contractAbi = [
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "account",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          indexed: false,
          internalType: "bool",
          name: "approved",
          type: "bool",
        },
      ],
      name: "ApprovalForAll",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "player",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint8[]",
          name: "team",
          type: "uint8[]",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "cost",
          type: "uint256",
        },
      ],
      name: "TeamCreated",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256[]",
          name: "ids",
          type: "uint256[]",
        },
        {
          indexed: false,
          internalType: "uint256[]",
          name: "values",
          type: "uint256[]",
        },
      ],
      name: "TransferBatch",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "id",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "TransferSingle",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "string",
          name: "value",
          type: "string",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "id",
          type: "uint256",
        },
      ],
      name: "URI",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "id",
          type: "uint256",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address[]",
          name: "accounts",
          type: "address[]",
        },
        {
          internalType: "uint256[]",
          name: "ids",
          type: "uint256[]",
        },
      ],
      name: "balanceOfBatch",
      outputs: [
        {
          internalType: "uint256[]",
          name: "",
          type: "uint256[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "checkPlayerRegistration",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256[]",
          name: "goalkeepers",
          type: "uint256[]",
        },
        {
          internalType: "uint256[]",
          name: "defenders",
          type: "uint256[]",
        },
        {
          internalType: "uint256[]",
          name: "midfielders",
          type: "uint256[]",
        },
        {
          internalType: "uint256[]",
          name: "strikers",
          type: "uint256[]",
        },
      ],
      name: "createTeam",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "endContract",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "id",
          type: "uint256",
        },
      ],
      name: "exists",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256[]",
          name: "scores",
          type: "uint256[]",
        },
      ],
      name: "fillChampionshipDayRecord",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256[]",
          name: "prices",
          type: "uint256[]",
        },
      ],
      name: "fillPlayersPrice",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "day",
          type: "uint256",
        },
      ],
      name: "getChampionshipDayScore",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "getPlayerBudget",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getPlayerTeam",
      outputs: [
        {
          internalType: "uint256[]",
          name: "",
          type: "uint256[]",
        },
        {
          internalType: "uint256[]",
          name: "",
          type: "uint256[]",
        },
        {
          internalType: "uint256[]",
          name: "",
          type: "uint256[]",
        },
        {
          internalType: "uint256[]",
          name: "",
          type: "uint256[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256[]",
          name: "players",
          type: "uint256[]",
        },
      ],
      name: "getPlayersPrice",
      outputs: [
        {
          internalType: "uint256[]",
          name: "",
          type: "uint256[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
        {
          internalType: "address",
          name: "operator",
          type: "address",
        },
      ],
      name: "isApprovedForAll",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "module",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "day",
          type: "uint256",
        },
        {
          internalType: "uint256[]",
          name: "goalkeepers",
          type: "uint256[]",
        },
        {
          internalType: "uint256[]",
          name: "defenders",
          type: "uint256[]",
        },
        {
          internalType: "uint256[]",
          name: "midfielders",
          type: "uint256[]",
        },
        {
          internalType: "uint256[]",
          name: "strikers",
          type: "uint256[]",
        },
      ],
      name: "registerChampionshipDayTeam",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "registerPlayer",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256[]",
          name: "ids",
          type: "uint256[]",
        },
        {
          internalType: "uint256[]",
          name: "amounts",
          type: "uint256[]",
        },
        {
          internalType: "bytes",
          name: "data",
          type: "bytes",
        },
      ],
      name: "safeBatchTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "id",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
        {
          internalType: "bytes",
          name: "data",
          type: "bytes",
        },
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          internalType: "bool",
          name: "approved",
          type: "bool",
        },
      ],
      name: "setApprovalForAll",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes4",
          name: "interfaceId",
          type: "bytes4",
        },
      ],
      name: "supportsInterface",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "id",
          type: "uint256",
        },
      ],
      name: "totalSupply",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "id",
          type: "uint256",
        },
      ],
      name: "uri",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];
  contractGetter = new ethers.Contract(contractAddress, contractAbi, provider);
  contractSetter = new ethers.Contract(contractAddress, contractAbi, signer);
}

function showTeamButton() {
  showTeamBtn.style.display = "block";
  showTeamBtn.addEventListener("click", () => {
    showTeam();
  });
}

function showBalanceButton() {
  showBalanceBtn.style.display = "block";
  showBalanceBtn.addEventListener("click", () => showBalance());
}

async function showBalance() {
  let balance = await contractGetter.getPlayerBudget({ from: address });
  showBalanceBtn.innerHTML = `${balance} MLN`;
  showBalanceBtn.disabled = true;
}

async function showTeam() {
  let team = await contractGetter.getPlayerTeam({ from: address });
  if (team[0].length == 0) {
    alert("Team ancora non creato!");
  } else {
    showTeamBtn.disabled = true;
    teamPlayers.style.display = "block";
    for (let i = 0; i < team.length; i++) {
      for (let j = 0; j < team[i].length; j++) {
        let player = document.createElement("p");
        player.innerHTML = players[team[i][j]].name;
        if (i == 0) {
          //let space = document.createElement("br");
          goalkeepersTeam.appendChild(player);
          //allPlayers.appendChild(space);
        } else if (i == 1) {
          defendersTeam.appendChild(player);
        } else if (i == 2) {
          midfieldersTeam.appendChild(player);
        } else {
          strikersTeam.appendChild(player);
        }
      }
    }
  }
}

async function showRegistration() {
  let check = await checkRegistration();
  console.log("Registered : " + check);
  if (check) {
    registerBtn.style.display = "block";
    registerBtn.disabled = true;
    registerBtn.innerHTML = "REGISTERED";
    showAllPlayers();
  } else {
    registerBtn.style.display = "block";
    registerBtn.innerHTML = "REGISTER";
    registerBtn.addEventListener("click", () => registerPlayer());
  }
}

async function checkTeamCreation() {
  let team = await contractGetter.getPlayerTeam({ from: address });
  if (team[0].length == 0) {
  }
}

async function showAllPlayers() {
  let team = await contractGetter.getPlayerTeam({ from: address });
  if (team[0].length == 0) {
    createTeamBtn.style.display = "block";
    createTeamBtn.addEventListener("click", () => createTeam());
    allPlayers.style.display = "block";
    for (let i = 0; i < 554; i++) {
      let btn = document.createElement("button");
      btn.classList.add("btn");
      btn.classList.add("btn-primary");
      btn.value = i;
      btn.style.marginLeft = "10px";
      btn.style.marginTop = "10px";
      btn.style.marginBottom = "10px";
      btn.innerHTML = `${players[i].name} - ${players[i].price} MLN`;
      btn.addEventListener("click", () => {
        if (i < 64) {
          if (selectedGoalkeepers.length > 2) {
            alert("Massimo per ruolo gia raggiunto!");
          } else {
            selectedGoalkeepers.push(i);
            totalPrice += players[i].price;
            btn.disabled = true;
            console.log(totalPrice);
          }
        } else if (i >= 64 && i < 264) {
          if (selectedDefenders.length > 7) {
            alert("Massimo per ruolo gia raggiunto!");
          } else {
            selectedDefenders.push(i);
            totalPrice += players[i].price;
            btn.disabled = true;
            console.log(totalPrice);
          }
        } else if (i >= 264 && i < 454) {
          if (selectedMidfielders.length > 7) {
            alert("Massimo per ruolo gia raggiunto!");
          } else {
            selectedMidfielders.push(i);
            totalPrice += players[i].price;
            btn.disabled = true;
            console.log(totalPrice);
          }
        } else {
          if (selectedStrikers.length > 5) {
            alert("Massimo per ruolo gia raggiunto!");
          } else {
            selectedStrikers.push(i);
            totalPrice += players[i].price;
            btn.disabled = true;
            console.log(totalPrice);
          }
        }
      });
      if (i < 64) {
        //let space = document.createElement("br");
        goalkeepersPlayers.appendChild(btn);
        //allPlayers.appendChild(space);
      } else if (i >= 64 && i < 264) {
        defendersPlayers.appendChild(btn);
      } else if (i >= 264 && i < 454) {
        midfieldersPlayers.appendChild(btn);
      } else {
        strikersPlayers.appendChild(btn);
      }
    }
  } else {
    showTeamButton();
    console.log("Already created!");
  }
}

// CONTRACT FUNCTIONS

// GETTERS
async function checkRegistration() {
  let check = await contractGetter.checkPlayerRegistration({ from: address });
  return check;
}

// SETTERS
async function registerPlayer() {
  let overrides = {
    from: await signer.getAddress(),
    value: ethers.utils.parseEther("0.1"),
  };
  let tx = await contractSetter.registerPlayer(overrides);
  let receipt = await tx.wait();
  return receipt.transactionHash;
}

async function createTeam() {
  console.log(selectedGoalkeepers);
  console.log(selectedDefenders);
  console.log(selectedMidfielders);
  console.log(selectedStrikers);
  let overrides = {
    from: await signer.getAddress(),
  };
  let tx = await contractSetter.createTeam(
    selectedGoalkeepers,
    selectedDefenders,
    selectedMidfielders,
    selectedStrikers,
    overrides
  );
  let receipt = await tx.wait();
  return receipt.transactionHash;
}

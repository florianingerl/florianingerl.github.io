import{f as i}from"./app-bausteine.js";import{d as a,G as s,H as r,a as l,e,f as n,D as o}from"./app-vendor.js";import{_ as c}from"./app-quiz.js";const h=a({__name:"Angebot",setup(d){return(u,t)=>(l(),s(i,{id:"angebot",titel:"Mein Nachhilfeangebot"},{default:r(()=>[...t[0]||(t[0]=[e("div",{class:"row"},[e("div",{class:"col-12","data-aos":"fade-left","data-aos-delay":"100"},[e("p",null,`
          Brauchst du Hilfe in Mathe für die nächste Schulaufgabe? Oder in Englisch und Französisch,
          weil die Grammatik einfach nicht sitzen will? Dann bist du hier richtig: Ich bin Lena,
          Gymnasiallehrerin mit zehn Jahren Erfahrung, und gebe Nachhilfe online und bei mir zu Hause.
        `),n(),e("p",null,`
          Schick mir einfach ein paar Aufgaben oder das Thema, das gerade dran ist, dann machen wir
          einen Termin aus. Preise, Ablauf und Kontakt stehen weiter unten auf der Seite.
        `)])],-1)])]),_:1}))}}),m=a({__name:"Mathe",setup(d){return(u,t)=>(l(),s(i,{id:"mathe",titel:"Mathematik"},{default:r(()=>[...t[0]||(t[0]=[e("div",{class:"row"},[e("div",{class:"col-lg-6 pt-4 pt-lg-0 content","data-aos":"fade-right","data-aos-delay":"100"},[e("p",null,`
          Mathe ist kein Hexenwerk. Meistens fehlt nur ein Baustein, und alles danach wackelt.
          In der Nachhilfe suchen wir genau diesen Baustein und bauen ihn wieder ein.
        `),n(),e("p",null,"Themen, die wir üben können:"),n(),e("ul",null,[e("li",null,"Unterstufe: Bruchrechnen, Prozentrechnung, Terme und Gleichungen"),n(),e("li",null,"Mittelstufe: lineare und quadratische Funktionen, Geometrie, Satz des Pythagoras"),n(),e("li",null,"Oberstufe: Analysis, Stochastik, Vektorrechnung, Vorbereitung auf das Abitur")])]),n(),e("div",{class:"col-lg-6 order-1 order-lg-2 content","data-aos":"fade-left","data-aos-delay":"100"},[e("p",null,`
          Zu jeder Stunde bekommst du ein kurzes Übungsblatt mit Lösungen, damit du das Gelernte
          bis zum nächsten Mal festigen kannst.
        `),n(),e("p",null,`
          Für die Abiturvorbereitung arbeiten wir mit den Originalaufgaben der letzten Jahre.
        `)])],-1)])]),_:1}))}}),f={class:"row"},g={class:"col-lg-6 order-2 order-lg-2","data-aos":"fade-left","data-aos-delay":"100"},p=a({__name:"Englisch",setup(d){return(u,t)=>(l(),s(i,{id:"englisch",titel:"Englisch"},{default:r(()=>[e("div",f,[e("div",g,[o(c,{quiz:"english",lg:"de"})]),t[0]||(t[0]=n()),t[1]||(t[1]=e("div",{class:"col-lg-6 pt-4 pt-lg-0 order-1 order-lg-1 content"},[e("p",null,`
          Vokabeln, Zeiten, if-Sätze: Im Englischunterricht geht es oft schnell, und wer einmal
          den Anschluss verliert, kommt schwer wieder hinein. Wir üben in kleinen Schritten,
          bis du dich sicher fühlst.
        `),n(),e("p",null,`
          Probier gleich das Quiz nebenan aus. Es zeigt dir, wo du stehst, und wir fangen
          genau dort an.
        `),n(),e("p",null,"Mögliche Inhalte: Grammatik, Textverständnis, Aufsätze, mündliche Prüfung.")],-1))])]),_:1}))}}),b={class:"row"},_={class:"col-lg-6 order-2 order-lg-2","data-aos":"fade-left","data-aos-delay":"100"},z=a({__name:"Franzoesisch",setup(d){return(u,t)=>(l(),s(i,{id:"franzoesisch",titel:"Französisch"},{default:r(()=>[e("div",b,[e("div",_,[o(c,{quiz:"french",lg:"de"})]),t[0]||(t[0]=n()),t[1]||(t[1]=e("div",{class:"col-lg-6 pt-4 pt-lg-0 order-1 order-lg-1 content"},[e("p",null,`
          Tu ne comprends rien? Pas de panique. Französisch braucht vor allem Übung beim Sprechen,
          und genau dafür ist die Nachhilfe da.
        `),n(),e("p",null,`
          Wir lesen kurze Texte, sprechen über den Alltag und üben nebenbei die Grammatik, die
          gerade in der Schule dran ist: passé composé, Pronomen, Verneinung und mehr.
        `),n(),e("p",null,"Das Quiz nebenan kannst du jederzeit ausprobieren.")],-1))])]),_:1}))}}),k=a({__name:"Preise",setup(d){return(u,t)=>(l(),s(i,{id:"preise",titel:"Preise und Termine"},{default:r(()=>[...t[0]||(t[0]=[e("div",{class:"row"},[e("div",{class:"col-lg-6 content","data-aos":"fade-right","data-aos-delay":"100"},[e("ul",null,[e("li",null,"Einzelstunde (60 Minuten): 35 Euro"),n(),e("li",null,"Doppelstunde (120 Minuten): 65 Euro"),n(),e("li",null,"Probestunde (30 Minuten): kostenlos")]),n(),e("p",null,"Bezahlt wird nach der Stunde per Überweisung oder bar.")]),n(),e("div",{class:"col-lg-6 content","data-aos":"fade-left","data-aos-delay":"100"},[e("p",null,`
          Termine gibt es unter der Woche ab 15 Uhr und samstags vormittags. Online treffen wir
          uns per Videokonferenz mit gemeinsamem Whiteboard, du brauchst nur einen Laptop mit Kamera.
        `),n(),e("p",null,"Absagen sind bis 24 Stunden vor dem Termin kostenlos.")])],-1)])]),_:1}))}}),v=a({__name:"UeberMich",setup(d){return(u,t)=>(l(),s(i,{id:"uebermich",titel:"Über mich"},{default:r(()=>[...t[0]||(t[0]=[e("div",{class:"row"},[e("div",{class:"col-lg-4","data-aos":"fade-right","data-aos-delay":"100"},[e("img",{src:"assets/img/vorlage/lena.svg",class:"img-fluid",alt:"Lena Muster"})]),n(),e("div",{class:"col-lg-8 pt-4 pt-lg-0 content","data-aos":"fade-left","data-aos-delay":"100"},[e("p",null,`
          Ich habe Mathematik und Französisch auf Lehramt studiert und unterrichte seit zehn Jahren
          am Gymnasium. Nachhilfe gebe ich, weil ich dort Zeit für die eine Frage habe, die im
          Unterricht untergeht.
        `),n(),e("p",null,`
          Wenn ich nicht unterrichte, bin ich in den Bergen oder lese französische Krimis.
        `)])],-1)])]),_:1}))}}),w=a({__name:"Impressum",setup(d){return(u,t)=>(l(),s(i,{id:"impressum",titel:"Impressum"},{default:r(()=>[...t[0]||(t[0]=[e("div",{class:"row"},[e("div",{class:"col-12 content","data-aos":"fade-up"},[e("p",null,[n("Lena Muster"),e("br"),n("Musterstraße 1"),e("br"),n("12345 Musterstadt")]),n(),e("p",null,[n("E-Mail: lena@beispiel.de"),e("br"),n("Telefon: 0123/456789")]),n(),e("p",null,"Diese Seite ist eine Beispielseite. Alle Angaben sind erfunden.")])],-1)])]),_:1}))}}),S={start:"vorlage.html",heroBild:"assets/img/vorlage/hero.svg",menue:[{titel:"Fächer",ziel:"#mathe",eintraege:[{titel:"Mathematik",ziel:"#mathe"},{titel:"Englisch",ziel:"#englisch"},{titel:"Französisch",ziel:"#franzoesisch"}]},{titel:"Preise und Infos",ziel:"#preise",eintraege:[{titel:"Preise und Termine",ziel:"#preise"},{titel:"Impressum",ziel:"#impressum"}]},{titel:"Über mich",ziel:"#uebermich",eintraege:[]}],kontakt:{karteHoehe:"200px",containerId:"schreibmirnachricht",strasse:"Musterstraße 1",ort:"12345 Musterstadt",mailadresse:"lena@beispiel.de",formular:{action:"https://api.web3forms.com/submit",botcheck:!0}},fuss:{telefonnummer:"0123/456789",mailadresse:"lena@beispiel.de",sozial:!1},schach:"de",abschnitte:[h,m,p,z,k,v,w]},x={titel:"Frag Lena! - Nachhilfe in Mathe, Englisch und Französisch",logo:"Frag Lena!",knopf:"Schreib mir eine Nachricht",kontakt:{adresse:"Adresse:",email:"Email:",absatz:"Schreib mir am besten eine E-Mail mit dem Thema, das gerade dran ist, oder benutze dieses Kontaktformular. Ich melde mich innerhalb eines Tages zurück."},formular:{name:"Dein Name",mail:"Deine Email",betreff:"Betreff",nachricht:"Nachricht",knopf:"Nachricht senden"},fuss:{telefon:"Telefon:"}};export{S as default,x as nachrichten};

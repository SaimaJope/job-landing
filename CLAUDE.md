JOB Kiinteistötekniikka Oy | Landing Page Brief
Konteksti
JOB Kiinteistötekniikka Oy on Pohjois-Savossa toimiva 25 hengen sähköurakointiyritys. Yritys lopettaa verkkokauppansa ja tarvitsee uuden landing pagen joka toimii palveluyrityksen pääsivuna. Verkkotunnus jobkauppa.fi siirretään uudelle palveluntarjoajalle ja sivut deployataan ensin Vercelin alidomainille ja vaihdetaan jobkauppa.fi:hin kun domain on käsillä.
Logo löytyy projektin juuresta: logo.png. Logon hallitsevat värit ja bokeh-tausta ohjaavat koko sivun visuaalista kieltä.
Stack
Next.js 15 (App Router, TypeScript)
Tailwind CSS v4
shadcn/ui komponenttikirjasto
Framer Motion subtiileihin animaatioihin
next/font: Mozilla Text (otsikot, navigaatio ja leipä), JetBrains Mono (pienet tekniset yksityiskohdat)
Lucide-react ikoneille
Deploy: Vercel
Visuaalinen suunta
Suunta on hillitty vectorheart / cyber-y2k -estetiikka, jossa hero-sektio kantaa "wow" -puolen ja muu sivu on luettava ja konventionaalinen. Sähköurakointiyritys ei voi näyttää epäluotettavalta hankintapäätöksen tekijän silmissä, mutta saa erottua siitä että kaikki kilpailijat näyttävät 2014-bootstrap-templaateilta.
Paletti (lukittu)
--background:        #050810
--background-alt:    #0A0E1A
--surface:           #0F1623
--primary:           #008dc8   /* JOB-logon sininen, ota tarkka arvo logo.png:stä jos eroaa */
--primary-deep:      #0B3A5C
--accent-glow:       #67E8F9   /* käytä vain hovereissa ja CTA-glowissa */
--text-primary:      #F5F8FC
--text-secondary:    #94A3B8
--text-tertiary:     #475569
--border:            rgba(31, 168, 224, 0.15)
--border-strong:     rgba(31, 168, 224, 0.3)

Ei muita värejä. Erityisesti ei punaista, vihreää tai keltaista aksenttia.
Typografia
Otsikot H1, H2: Mozilla Text, font-weight 600, tight letter-spacing (-0.02em)
Leipäteksti: Mozilla Text, font-weight 400, line-height 1.6
Pienet tekniset yksityiskohdat (osio-indeksit, koordinaatit, sertifikaattikoodit): JetBrains Mono, uppercase, letter-spacing 0.1em, koko 11-12px
Bokeh-tausta
Tärkein visuaalinen elementti. Toteutus:
Hero-sektion ja sivun pohjalla fixed -positioned canvas tai useita absoluuttisesti aseteltuja <div> elementtejä joissa border-radius: 50%, voimakas filter: blur(80-120px), opacity 0.15-0.35, primary-värisävyissä
4-6 palloa, kokoja 200-500px, hajautettuna eri puolille
Hidas float-animaatio Framer Motionilla: liikkuu 20-40 sekunnin sykleissä, amplitudi 30-60px
Ei dominoiva, vaan tunnelmaa luova kerros
// pseudokoodi BokehBackground-komponentille
const orbs = [
  { size: 480, x: '15%', y: '20%', delay: 0, duration: 28 },
  { size: 320, x: '75%', y: '40%', delay: 4, duration: 35 },
  { size: 280, x: '40%', y: '80%', delay: 8, duration: 22 },
  { size: 200, x: '85%', y: '15%', delay: 12, duration: 30 },
  { size: 380, x: '5%', y: '70%', delay: 6, duration: 40 },
];

Muut visuaaliset elementit
Subtiili dot-grid tausta (3 % opacity, valkoinen, 24px ruudukko) tietyissä osioissa
Hero-sektiossa ei enää käytetä raskaita wireframe-koristeita. Logon oma bokeh-kuvakieli ja tumma valo kantavat ilmeen.
Korteilla 1px border primary-värisävyissä, hover-tilassa border-strong + hillitty cyan-glow
CTA-painikkeissa subtiili glow primary-värisävyissä
Sivun rakenne
1. Navigaatio
Kiinteä yläpalkki, mutta läpinäkyvä (backdrop-blur-md, taustalla bg-background/60). Vasemmalla logo, oikealla linkit (Palvelut, Yritys, Toiminta-alue, Yhteystiedot) ja oikealla yhteydenotto-painike. Mobiilissa hamburger.
2. Hero-sektio
Korkeus n. 90vh
Bokeh-tausta
Pieni mono-teksti yläosassa: JOB / 01 tai [POHJOIS-SAVO] -tyyppinen indikaattori
Pääotsikko (H1): "Sähkö, tele ja turva-asennukset Pohjois-Savossa." TAI vaihtoehtoinen suora muotoilu, älä keksi mitään yltiömäistä markkinointihöttöä
Alateksti: "Suunnittelusta asennukseen. 25 ammattilaista. Iisalmesta Varkauteen, ja tarvittaessa koko Suomi."
Kaksi CTA:ta: pää-CTA "Pyydä tarjous" (primary, glow), toissijainen "Tutustu palveluihin" (outline)
Hero-grafiikka oikealle puolelle: joko logo isona bokeh-tehosteilla, tai abstrakti geometrinen wireframe-elementti (esim. pyörivä isometrinen kuutio Three.js:llä TAI staattinen SVG-grafiikka linjoista). Jos käytät Three.js:ää, varmista että FPS pysyy nätisti.
3. Palvelut
Otsikko: "Palvelut" + pieni mono-numerointi 02 / PALVELUT
Neljä korttia 2x2 -gridissä desktopilla, pinottu mobiilissa:
Sähköasennukset: Sähköjärjestelmien suunnittelu ja asennus uudis- ja saneerauskohteisiin. TUKES-luvalla.
Tele- ja antennijärjestelmät: Antenni-, satelliitti- ja tietoverkkojen rakentaminen. Seti Oy:n telepätevyys.
Turvajärjestelmät: Paloilmoittimet, valvonta ja kulunvalvonta. Poliisihallituksen elinkeinolupa.
Kiinteistöhuolto ja kylmälaitteet: Lämpöpumput, kylmälaitteet ja jatkuva huoltopalvelu. SULPU-jäsen.
Jokaisessa kortissa: Lucide-ikoni, otsikko, kuvaus, ja pieni "Lue lisää" -tyylinen linkki vaikka ei vielä johdakaan minnekään (placeholder).
4. Kenelle
Lyhyt kolmen kortin tai inline-osion sektio: "Yksityishenkilöt", "Yritykset", "Julkinen sektori". Pari riviä kuvausta kustakin.
5. Sertifikaatit ja jäsenyydet
Otsikko: "Luvat ja jäsenyydet" + 03 / LUOTTAMUS
Logoseinä tai listaus:
TUKES (sähköurakointi, paloilmoitin, kylmälaiteasennus)
STUL: Sähkö- ja teleurakoitsijaliitto
SANT: Satelliitti- ja antenniliitto
SULPU: Suomen lämpöpumppuyhdistys
Seti Oy: Telepätevyys
Poliisihallitus: turvallisuusalan elinkeinolupa
Tilaajavastuu.fi Luotettava Kumppani
Elektria-ketjun jäsenliike
Logot grayscale, hover-tilassa täysväri. Jos logoja ei ole saatavilla, käytä tekstipohjaisia "badgeja" joissa primary-värisävy border.
6. Toiminta-alue
Otsikko: "Toiminta-alue" + 04 / ALUE
Lyhyt teksti: "Pääasiallinen toiminta-alueemme on Pohjois-Savo (Iisalmi, Siilinjärvi, Kuopio, Leppävirta, Varkaus). Tarvittaessa teemme asennuksia koko Suomen alueella."
Visuaalisesti: käytä Google Maps -embeddiä toiminta-alueen hahmottamiseen. Älä tee käsin piirrettyä feikkikarttaa, ellei käytössä ole oikeaa kartta-aineistoa. Maps voidaan tyylitellä hillitysti tummaksi CSS-filterillä niin, että se istuu sivun värimaailmaan.
7. Yhteystiedot ja yhteydenotto
Otsikko: "Yhteydenotto" + 05 / KONTAKTI
Kahteen palstaan jaettu:
Vasemmalla: yhteydenottolomake (nimi, sähköposti, puhelin, viesti), toimii Formspreen tai Resend-integraation kautta. Tee placeholder-implementaatio joka logaa konsoliin, integraatio voidaan tehdä myöhemmin.
Oikealla: suorat yhteystiedot
Puh. 044 572 3200
info@jobkauppa.fi (HUOM: tämä sähköposti on siirtymässä, jätä placeholderiksi kunnes uusi tieto vahvistuu)
JOB Kiinteistötekniikka Oy
Myllärintie 5, 71470 Oravikoski
Y-tunnus: 2295210-9
8. Footer
Minimaalinen. Vasemmalla logo pienempänä, oikealla copyright ja Y-tunnus. Linkit tarpeen mukaan (Tietosuojaseloste, placeholder).
Tekstuaalinen sävy
Suomi
Asiallinen, ammattimainen, ei markkinointihöttöä
Älä lisää geneerisiä "luotettava kumppanisi" tai "vuosien kokemuksella" -fraaseja
Tekninen termistö suoraan, ei selitellen (asiakas ymmärtää mitä "telepätevyys" tai "kylmälaiteasennus" tarkoittaa)
Lyhyitä lauseita
Vältettävää
Kuvituskuvat genericistä stockista (kättelyt, headset-asiakaspalvelijat, jne): älä lisää näitä
Animaatiot jotka häiritsevät lukemista
Liikaa glow-efektejä yhdellä näkymällä
"Tervetuloa ostoksille" tai mitään verkkokauppakieltä: verkkokauppa on lopetettu
Punainen, vihreä tai keltainen UI-aksentti. Bokeh-taustassa saa olla hallittua monivärisyyttä, kunhan käyttöliittymä pysyy JOB-sininen/cyan-vetoisena.
Suoritusjärjestys
Pystytä Next.js -projekti, asenna riippuvuudet
Konfiguroi Tailwind paletti ja fonttitokenit
Rakenna BokehBackground-komponentti ja varmista että suorituskyky on hyvä (ei lag mobiilissa)
Layout ja navigaatio
Hero-sektio kaikkine elementteineen
Loput sektiot järjestyksessä
Responsiivisuus mobiilille
Suorituskykytarkistus (Lighthouse, mobile)
Deploy Verceliin

Uudistus 2026-05-25
Ensimmäinen toteutus näytti liian tekoälymäiseltä: liikaa geneeristä wireframea, korttiseinää ja epäuskottava toiminta-alueen feikkikartta. Uusi suunta:
- Pidä lukittu tumma sininen/cyan-värimaailma.
- Vie estetiikka lähemmäs logon bokeh-taustaa: tumma, pehmeä, vähän valoa, ei teknistä koristelua koristelun vuoksi.
- Landing pagen pitää tuntua kokeneen palveluyrityksen sivulta, ei SaaS-dashboardilta.
- Heroon ensisijainen myyntiviesti, puhelinnumero ja nopea yhteydenottolomake.
- Palvelut listataan selkeinä palveluriveinä, ei liian geneerisinä isoina AI-kortteina.
- Lisää toteutusprosessi, koska urakointipalvelussa ostaja haluaa ymmärtää miten työ etenee.
- Toiminta-alue tehdään Google Mapsilla ja kaupunkilistalla. Käsin piirretty Suomen/Pohjois-Savon kartta poistetaan.
- Teksti on asiallista ja lyhyttä. Ei geneerisiä superlatiiveja, ei verkkokauppakieltä.

Uudistus 2026-05-25 / Modern Bokeh Control Panel
Suunta tarkennettu vanhan JOB Kaupan estetiikan moderniksi tulkinnaksi:
- Taustana käytetään projektin omaa bitmap-assetia `public/bokeh-hero.webp`, ei pelkkiä CSS-radial-gradientteja.
- Bokeh saa olla hallitusti monivärinen: cyan, sininen, violetti, magenta, teal ja lämpimät valopisteet. UI-komponentit pysyvät primary/cyan-linjassa.
- Hero ei saa olla geneerinen "teksti vasemmalla, glass card oikealla" -SaaS-layout. Hero on yksi interaktiivinen palveluohjauspaneeli.
- Hero-paneelissa palveluvälilehdet Sähkö, Tele, Turva ja Huolto päivittävät aktiivisen palvelun sisällön, pätevyyden ja kohderajauksen.
- Palvelut esitetään tiiviinä riveinä/paneeleina, ei neljänä identtisenä AI-korttina.
- Toteutusprosessi on slim timeline. Luvat ovat kompakti badge-seinä.
- Toiminta-alue käyttää Google Maps -embediä ja aktiivisia city-pillejä, jotka vaihtavat kartan kohteen.
- Interaktiivisuus on hillitty mutta tuntuva: palveluvalinnat, city-valinnat, hoverit, pointer-parallax bokeh-taustassa ja reduced-motion fallback.

Tarkennus 2026-05-25 / Bokeh ja lasi
- Bokeh ei saa olla räikeä blur-efekti. Sen pitää tuntua optiselta: useita hillittyjä läpikuultavia valokiekkoja, pehmeä reuna, pieni linssimäinen rim-highlight ja hidas liike.
- Vältä neonmaisia alpha-arvoja ja isoja voimakkaita glow-palloja. Pienempi saturaatio ja matalampi opacity ovat parempi kuin kirkas blur.
- Lasiefekti on moderni iOS-tyyppinen: translucent fill, backdrop blur + saturate, 1px vaalea/cyan hairline, sisäinen yläreunan highlight ja pehmeä varjo.
- Glassmorphism ei saa muuttua raskaaksi korttiseinäksi. Käytä lasia lomakkeissa, mapissa, headerissa ja pienissä pinnoissa, ei jokaisen sisältölohkon koristeena.
- Scroll reveal ei saa piilottaa sisältöä ennen animaation laukeamista. Sisällön pitää olla näkyvissä myös jos IntersectionObserver tai JS viivästyy.

Tarkennus 2026-05-25 / Viimeistely
- Älä käytä näkyviä decorative divider -viivoja otsikon eyebrow-teksteissä tai prosessitimelinessa. Ilme pysyy puhtaampana ilman niitä.
- Älä käytä em dash -merkkiä sivun teksteissä tai ohjetiedostossa. Käytä pistettä, pilkkua, kaksoispistettä tai lyhyttä yhdysmerkkiä tilanteen mukaan.
- Cursor saa olla kevyesti interaktiivinen desktopissa: pieni cyan glass glow, hoverissa hieman isompi ja painalluksessa pienempi. Ei custom-cursoria mobiilissa eikä reduced-motion-tilassa.
- Hero-taustassa saa olla himmeitä dust-partikkeleita canvas-kerroksessa. Niiden pitää olla pieniä, optisia ja melkein huomaamattomia, sekä reagoida hiireen ilman että ne vievät huomiota otsikolta.

Tarkennus 2026-05-25 / Suorituskyky
- Bokeh-canvas ei saa pyöriä täydellä 60fps-silmukalla koko sivun ajan. Pidä animaatio noin 24-30fps tasolla ja pauseta se IntersectionObserverilla, kun hero ei ole näkyvissä.
- Canvas-DPR pidetään matalana, koska bokeh on tarkoituksella pehmeää. Mobiilissa 1 ja desktopissa noin 1.25 riittää.
- Partikkeli- ja bokeh-määrät skaalataan viewportin mukaan. Mobiilissa käytetään selvästi vähemmän objekteja.
- Älä lisää uusia jatkuvasti pyöriviä animaatioita ilman näkyvyys- ja reduced-motion-rajoja.

Tarkennus 2026-05-25 / Header ja tuotteet
- Logo vie aina etusivulle (`/`), myös tuotesivulta.
- Hero-alueen CTA-rivillä on `Pyydä tarjous` ja sen vieressä `Selaa tuotteita`.
- Yläpalkin oikeassa reunassa ei näytetä tekstillistä `Selaa tuotteita` -nappia. Tuotesivu löytyy päävalikon `Tuotteet`-linkistä ja hero-CTA:sta.
- Tilauslistaikoni näytetään headerissa vain, jos listalla on tuotteita.

Tarkennus 2026-05-25 / GitHub Pages
- GitHub Pages vaatii staattisen exportin. `next.config.ts` käyttää `output: "export"`, `trailingSlash: true` ja `images.unoptimized: true`.
- Deployaa GitHub Pagesiin `out/`-kansion sisältö, ei `.next/`-kansiota eikä pelkkää projektin juurta.
- `public/.nojekyll` pitää olla mukana, jotta Pages ei suodata `_next`-asset-kansiota.
- Sisäiset sivulinkit kuten tuotteet kirjoitetaan trailing slashilla (`/tuotteet/`), jotta ne vastaavat staattista hakemistorakennetta.
- GitHub Actions -deploy käyttää automaattisesti repon nimeä basePathina, esimerkiksi `SaimaJope/job-landing` tuottaa linkit `/job-landing/tuotteet/`.
- Jos sivu julkaistaan myöhemmin omalla domainilla tai Vercelissä, basePath jää tyhjäksi ellei `NEXT_PUBLIC_BASE_PATH`-ympäristömuuttujaa aseteta.
- Public-kansion assetit kuten `logo.png` pitää renderöidä `publicPath("/logo.png")`-helperillä, jotta GitHub Pagesin `/job-landing`-basePath tulee mukaan.
- Sama koskee tuotekuvia. Katalogin `image`-arvot ovat muotoa `/products/<id>.jpg`, joten renderöinnissä pitää käyttää `publicPath(product.image)` eikä raakaa `product.image`-arvoa.

Tarkennus 2026-05-25 / Tuotesivun mobiili
- Tuotesivulla ei saa olla vaakasuuntaista scrollia mobiilissa. Älä yhdistä ulomman `main`-elementin vaakapaddingia kiinteäleveyksiseen `.container-shell`-asetukseen.
- Mobiilissa alle Tailwindin `sm`-rajan (640px) tuotekortit näytetään yhtenä keskitettynä sarakkeena. Kahden sarakkeen grid alkaa vasta, kun kortit ja painikkeet mahtuvat ilman tekstin ylivuotoa.
- Kategoriat eivät saa venyttää mobiilileveyttä. Käytä mobiilissa täysleveää grid-listaa, `min-w-0`-suojia ja tekstin truncatea pitkille kategorianimille.


Uudistus 2026-06-10 / Verkkokaupan poisto ja premium-ilme
- Kauppaominaisuus on poistettu kokonaan: ei /tuotteet-reittiä, ei tilauslistaa, ei cart-providereita eikä Selaa tuotteita -nappeja missään.
- Tuotedata säilytetään repossa tulevaa käyttöä varten: src/data/catalog.json, src/lib/products.ts, public/products ja scripts-kansio. Näitä ei poisteta.
- Hero-CTA:t ovat Pyydä tarjous (primary) ja Tutustu palveluihin (outline). Heron alla on hiljainen puhelinnumerorivi.
- Typografia on briefin mukainen: Mozilla Headline display-otsikoissa, Mozilla Text leivässä ja navigaatiossa, JetBrains Mono teknisissä yksityiskohdissa. Inter ja Space Grotesk on poistettu.
- Bokeh-paletti painottuu tummaan siniseen, indigoon ja syvään violettiin. Cyan esiintyy vain pieninä harvinaisina valopisteinä.
- Sivulla on kiinteä, lähes huomaamaton film grain -kerros (.grain), joka estää gradienttien banding-ilmiön. Opacity pidetään 0.05 tasolla tai alle.
- Heron sisääntuloanimaatio on puhdasta CSS:ää (hero-rise), joten sisältö ei koskaan jää piiloon JS:n viivästyessä. Scroll reveal piilottaa elementin vain jos se on varmasti foldin alapuolella mountin hetkellä.
- Heron alla on stats-kaista (25 ammattilaista, 4 osaamisaluetta, 10 lupaa, 5 kaupunkia). Luvut pidetään faktisina.
- Toiminta-alueen city-pillit ovat interaktiivisia ja vaihtavat Google Maps -embedin kohteen.
- Framer Motion ei ole enää käytössä landing-sivulla. Revealit ovat omaa kevyttä IntersectionObserver-toteutusta.

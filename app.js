(()=>{"use strict";
const DB="helios_bobby_complete_v2", STORE="records";
let db, view="home", editingId=null, customerFilter="";
const brands=["Ariston","Aux","Beko","Bosch","Carrier","Clivet","Cooper&Hunter","Daikin","Daitsu","Electrolux","Ferroli","Fox","Fujitsu","Fujitsu General","Galanz","Gorenje","Gree","Haier","Hisense","Hitachi","Hyundai","Kaisai","LG","Midea","Mitsubishi Electric","Olimpia Splendid","Panasonic","Samsung","Sharp","Sinclair","TCL","Tesla","Toshiba","Toshiba Carrier","VIVAX","VOX","York","Maxa","Orion","Tristar",""Housel","Bergen","Vending","Favorit","Crown","Daewoo","Chigo","MDV","Whirlpool","Tadiran","Polar","Korel","Maxon","Hokkaido","Frozini","Eskimo"];];
\\\const models={
"Ariston":["Alys 09","Alys 12","Alys 18","Alys 24","Alys R32 09","Alys R32 12","Alys R32 18","Alys R32 24","Prios 09","Prios 12","Prios 18","Prios 24","Prius 09","Prius 12","Prius 18","Prius 24","Nexura 09","Nexura 12","Nexura 18","Nexura 24","Sensys 09","Sensys 12","Sensys 18","Sensys 24","Kios 09","Kios 12","Kios 18","Kios 24","Nevis 09","Nevis 12","Nevis 18","Nevis 24"],
"Aux":["Freedom 09","Freedom 12","Freedom 18","Freedom 24","Freedom Pro 09","Freedom Pro 12","Freedom Pro 18","Freedom Pro 24","Halo 09","Halo 12","Halo 18","Halo 24","Prime 09","Prime 12","Prime 18","Prime 24","J-Smart 09","J-Smart 12","J-Smart 18","J-Smart 24","Q-Series 09","Q-Series 12","Q-Series 18","Q-Series 24","Delta 09","Delta 12","Delta 18","Delta 24","Q-Smart 09","Q-Smart 12","Q-Smart 18","Q-Smart 24"],
"Beko":["BEHP 09 09","BEHP 09 12","BEHP 09 18","BEHP 09 24","BEHP 12 09","BEHP 12 12","BEHP 12 18","BEHP 12 24","BEHP 18 09","BEHP 18 12","BEHP 18 18","BEHP 18 24","BEHP 24 09","BEHP 24 12","BEHP 24 18","BEHP 24 24","BEEPG 09 09","BEEPG 09 12","BEEPG 09 18","BEEPG 09 24","BEEPG 12 09","BEEPG 12 12","BEEPG 12 18","BEEPG 12 24","BEEPG 18 09","BEEPG 18 12","BEEPG 18 18","BEEPG 18 24","BEEPG 24 09","BEEPG 24 12","BEEPG 24 18","BEEPG 24 24"],
"Bosch":["Climate 3000i 09","Climate 3000i 12","Climate 3000i 18","Climate 3000i 24","Climate 5000i 09","Climate 5000i 12","Climate 5000i 18","Climate 5000i 24","Climate 6000i 09","Climate 6000i 12","Climate 6000i 18","Climate 6000i 24","Climate 7000i 09","Climate 7000i 12","Climate 7000i 18","Climate 7000i 24","Climate 8000i 09","Climate 8000i 12","Climate 8000i 18","Climate 8000i 24"],
"Carrier":["Crystal 09","Crystal 12","Crystal 18","Crystal 24","XPower 09","XPower 12","XPower 18","XPower 24","Extreme 09","Extreme 12","Extreme 18","Extreme 24","Infinity 09","Infinity 12","Infinity 18","Infinity 24","Comfort 09","Comfort 12","Comfort 18","Comfort 24","Platinum 09","Platinum 12","Platinum 18","Platinum 24","AquaSnap 09","AquaSnap 12","AquaSnap 18","AquaSnap 24"],
"Cooper&Hunter":["Supreme 09","Supreme 12","Supreme 18","Supreme 24","Veritas 09","Veritas 12","Veritas 18","Veritas 24","Vital 09","Vital 12","Vital 18","Vital 24","Arctic 09","Arctic 12","Arctic 18","Arctic 24","Alpha 09","Alpha 12","Alpha 18","Alpha 24","Prima Plus 09","Prima Plus 12","Prima Plus 18","Prima Plus 24","CH-S09FTXAM 09","CH-S09FTXAM 12","CH-S09FTXAM 18","CH-S09FTXAM 24","CH-S12FTXAM 09","CH-S12FTXAM 12","CH-S12FTXAM 18","CH-S12FTXAM 24"],
"Daikin":["Sensira 09","Sensira 12","Sensira 18","Sensira 24","Comfora 09","Comfora 12","Comfora 18","Comfora 24","Perfera 09","Perfera 12","Perfera 18","Perfera 24","Emura 09","Emura 12","Emura 18","Emura 24","Stylish 09","Stylish 12","Stylish 18","Stylish 24","Ururu Sarara 09","Ururu Sarara 12","Ururu Sarara 18","Ururu Sarara 24","Nepura 09","Nepura 12","Nepura 18","Nepura 24","SkyAir 09","SkyAir 12","SkyAir 18","SkyAir 24","FTXF 09","FTXF 12","FTXF 18","FTXF 24","FTXM 09","FTXM 12","FTXM 18","FTXM 24"],
"Daitsu":["Eco 09","Eco 12","Eco 18","Eco 24","APD 09","APD 12","APD 18","APD 24","Atlas 09","Atlas 12","Atlas 18","Atlas 24","Air R32 09","Air R32 12","Air R32 18","Air R32 24","Alaska 09","Alaska 12","Alaska 18","Alaska 24","Premium 09","Premium 12","Premium 18","Premium 24","Fan Coil 09","Fan Coil 12","Fan Coil 18","Fan Coil 24"],
"Electrolux":["Well S 09","Well S 12","Well S 18","Well S 24","Comfort 600 09","Comfort 600 12","Comfort 600 18","Comfort 600 24","Comfort 800 09","Comfort 800 12","Comfort 800 18","Comfort 800 24","UltimateHome 09","UltimateHome 12","UltimateHome 18","UltimateHome 24","EXP09 09","EXP09 12","EXP09 18","EXP09 24","EXP12 09","EXP12 12","EXP12 18","EXP12 24"],
"Ferroli":["Giada 09","Giada 12","Giada 18","Giada 24","Diamant 09","Diamant 12","Diamant 18","Diamant 24","Omnia 09","Omnia 12","Omnia 18","Omnia 24","Breath 09","Breath 12","Breath 18","Breath 24","Aster 09","Aster 12","Aster 18","Aster 24"],
"Fox":["FMS 09","FMS 12","FMS 18","FMS 24","FMS-NV 09","FMS-NV 12","FMS-NV 18","FMS-NV 24","FSA 09","FSA 12","FSA 18","FSA 24","FSA-NV 09","FSA-NV 12","FSA-NV 18","FSA-NV 24","FMA 09","FMA 12","FMA 18","FMA 24"],
"Fujitsu":["KM 09","KM 12","KM 18","KM 24","LM 09","LM 12","LM 18","LM 24","KG 09","KG 12","KG 18","KG 24","KE 09","KE 12","KE 18","KE 24","ASYG 09","ASYG 12","ASYG 18","ASYG 24","ASEH 09","ASEH 12","ASEH 18","ASEH 24","AUXG 09","AUXG 12","AUXG 18","AUXG 24","ABYG 09","ABYG 12","ABYG 18","ABYG 24","AOYG 09","AOYG 12","AOYG 18","AOYG 24"],
"Fujitsu General":["KM 09","KM 12","KM 18","KM 24","LM 09","LM 12","LM 18","LM 24","KG 09","KG 12","KG 18","KG 24","KE 09","KE 12","KE 18","KE 24","ASYG 09","ASYG 12","ASYG 18","ASYG 24","ASEH 09","ASEH 12","ASEH 18","ASEH 24","AUXG 09","AUXG 12","AUXG 18","AUXG 24","ABYG 09","ABYG 12","ABYG 18","ABYG 24","AOYG 09","AOYG 12","AOYG 18","AOYG 24"],
"Galanz":["GWH09 09","GWH09 12","GWH09 18","GWH09 24","GWH12 09","GWH12 12","GWH12 18","GWH12 24","GWH18 09","GWH18 12","GWH18 18","GWH18 24","GWH24 09","GWH24 12","GWH24 18","GWH24 24","AUS-09 09","AUS-09 12","AUS-09 18","AUS-09 24","AUS-12 09","AUS-12 12","AUS-12 18","AUS-12 24","AUS-18 09","AUS-18 12","AUS-18 18","AUS-18 24","AUS-24 09","AUS-24 12","AUS-24 18","AUS-24 24"],
"Gree":["Pular 09","Pular 12","Pular 18","Pular 24","Lomo 09","Lomo 12","Lomo 18","Lomo 24","Lomo Eco 09","Lomo Eco 12","Lomo Eco 18","Lomo Eco 24","Fairy 09","Fairy 12","Fairy 18","Fairy 24","Amber 09","Amber 12","Amber 18","Amber 24","Amber Nordic 09","Amber Nordic 12","Amber Nordic 18","Amber Nordic 24","Clivia 09","Clivia 12","Clivia 18","Clivia 24","U-Crown 09","U-Crown 12","U-Crown 18","U-Crown 24","Hansol 09","Hansol 12","Hansol 18","Hansol 24","Bora 09","Bora 12","Bora 18","Bora 24","Cosmo 09","Cosmo 12","Cosmo 18","Cosmo 24","Shiny 09","Shiny 12","Shiny 18","Shiny 24"],
"Haier":["Tundra 09","Tundra 12","Tundra 18","Tundra 24","Tundra Plus 09","Tundra Plus 12","Tundra Plus 18","Tundra Plus 24","Flexis 09","Flexis 12","Flexis 18","Flexis 24","Flexis Plus 09","Flexis Plus 12","Flexis Plus 18","Flexis Plus 24","Pearl 09","Pearl 12","Pearl 18","Pearl 24","Expert 09","Expert 12","Expert 18","Expert 24","Revive 09","Revive 12","Revive 18","Revive 24","Jade 09","Jade 12","Jade 18","Jade 24","Shine 09","Shine 12","Shine 18","Shine 24"],
"Hisense":["Easy Smart 09","Easy Smart 12","Easy Smart 18","Easy Smart 24","Easy Smart WiFi 09","Easy Smart WiFi 12","Easy Smart WiFi 18","Easy Smart WiFi 24","Energy Pro 09","Energy Pro 12","Energy Pro 18","Energy Pro 24","Energy Pro X 09","Energy Pro X 12","Energy Pro X 18","Energy Pro X 24","Silentium Pro 09","Silentium Pro 12","Silentium Pro 18","Silentium Pro 24","New Comfort 09","New Comfort 12","New Comfort 18","New Comfort 24","Expert Smart 09","Expert Smart 12","Expert Smart 18","Expert Smart 24","Fresh Master 09","Fresh Master 12","Fresh Master 18","Fresh Master 24"],
"Hitachi":["Dodai 09","Dodai 12","Dodai 18","Dodai 24","Performance 09","Performance 12","Performance 18","Performance 24","Shirokuma 09","Shirokuma 12","Shirokuma 18","Shirokuma 24","AirHome 09","AirHome 12","AirHome 18","AirHome 24","RAK 09","RAK 12","RAK 18","RAK 24","RAC 09","RAC 12","RAC 18","RAC 24","Premium 09","Premium 12","Premium 18","Premium 24"],
"Hyundai":["H-AR 09","H-AR 12","H-AR 18","H-AR 24","H-AC 09","H-AC 12","H-AC 18","H-AC 24","H-PAC 09","H-PAC 12","H-PAC 18","H-PAC 24","Prime 09","Prime 12","Prime 18","Prime 24","Smart 09","Smart 12","Smart 18","Smart 24","Superior 09","Superior 12","Superior 18","Superior 24"],
"Kaisai":["Fly 09","Fly 12","Fly 18","Fly 24","Fly Pro 09","Fly Pro 12","Fly Pro 18","Fly Pro 24","Ice 09","Ice 12","Ice 18","Ice 24","Eco 09","Eco 12","Eco 18","Eco 24","Pro 09","Pro 12","Pro 18","Pro 24","Wall 09","Wall 12","Wall 18","Wall 24","Multi 09","Multi 12","Multi 18","Multi 24"],
"LG":["DualCool 09","DualCool 12","DualCool 18","DualCool 24","DualCool Deluxe 09","DualCool Deluxe 12","DualCool Deluxe 18","DualCool Deluxe 24","Artcool 09","Artcool 12","Artcool 18","Artcool 24","Artcool Mirror 09","Artcool Mirror 12","Artcool Mirror 18","Artcool Mirror 24","Artcool Gallery 09","Artcool Gallery 12","Artcool Gallery 18","Artcool Gallery 24","Dual Inverter 09","Dual Inverter 12","Dual Inverter 18","Dual Inverter 24","Standard Plus 09","Standard Plus 12","Standard Plus 18","Standard Plus 24","Deluxe 09","Deluxe 12","Deluxe 18","Deluxe 24","Prestige 09","Prestige 12","Prestige 18","Prestige 24"],
"Midea":["Mission 09","Mission 12","Mission 18","Mission 24","Breezeless 09","Breezeless 12","Breezeless 18","Breezeless 24","Breezeless E 09","Breezeless E 12","Breezeless E 18","Breezeless E 24","Xtreme Save 09","Xtreme Save 12","Xtreme Save 18","Xtreme Save 24","Xtreme Save Pro 09","Xtreme Save Pro 12","Xtreme Save Pro 18","Xtreme Save Pro 24","All Easy Pro 09","All Easy Pro 12","All Easy Pro 18","All Easy Pro 24","Prime 09","Prime 12","Prime 18","Prime 24","Fairy 09","Fairy 12","Fairy 18","Fairy 24","Aurora 09","Aurora 12","Aurora 18","Aurora 24","Forest 09","Forest 12","Forest 18","Forest 24","Comfee 09","Comfee 12","Comfee 18","Comfee 24"],
"Mitsubishi Electric":["MSZ-HR 09","MSZ-HR 12","MSZ-HR 18","MSZ-HR 24","MSZ-AP 09","MSZ-AP 12","MSZ-AP 18","MSZ-AP 24","MSZ-EF 09","MSZ-EF 12","MSZ-EF 18","MSZ-EF 24","MSZ-LN 09","MSZ-LN 12","MSZ-LN 18","MSZ-LN 24","MSZ-RW 09","MSZ-RW 12","MSZ-RW 18","MSZ-RW 24","MSZ-AY 09","MSZ-AY 12","MSZ-AY 18","MSZ-AY 24","MFZ-KT 09","MFZ-KT 12","MFZ-KT 18","MFZ-KT 24","PCA 09","PCA 12","PCA 18","PCA 24"],
"Mitsubishi Heavy":["SRK 09","SRK 12","SRK 18","SRK 24","Diamond 09","Diamond 12","Diamond 18","Diamond 24","Premium 09","Premium 12","Premium 18","Premium 24","ZTL 09","ZTL 12","ZTL 18","ZTL 24","ZSX 09","ZSX 12","ZSX 18","ZSX 24","ZSP 09","ZSP 12","ZSP 18","ZSP 24","ZTP 09","ZTP 12","ZTP 18","ZTP 24"],
"Olimpia Splendid":["Alysea 09","Alysea 12","Alysea 18","Alysea 24","Unico 09","Unico 12","Unico 18","Unico 24","Dolceclima 09","Dolceclima 12","Dolceclima 18","Dolceclima 24","Nexya 09","Nexya 12","Nexya 18","Nexya 24","Aria 09","Aria 12","Aria 18","Aria 24"],
"Panasonic":["TZ 09","TZ 12","TZ 18","TZ 24","HZ 09","HZ 12","HZ 18","HZ 24","XZ 09","XZ 12","XZ 18","XZ 24","Z Series 09","Z Series 12","Z Series 18","Z Series 24","Etherea 09","Etherea 12","Etherea 18","Etherea 24","BZ 09","BZ 12","BZ 18","BZ 24","KIT-TZ 09","KIT-TZ 12","KIT-TZ 18","KIT-TZ 24","KIT-Z 09","KIT-Z 12","KIT-Z 18","KIT-Z 24"],
"Samsung":["AR 09","AR 12","AR 18","AR 24","Wind-Free 09","Wind-Free 12","Wind-Free 18","Wind-Free 24","WindFree Avant 09","WindFree Avant 12","WindFree Avant 18","WindFree Avant 24","WindFree Comfort 09","WindFree Comfort 12","WindFree Comfort 18","WindFree Comfort 24","Cebu 09","Cebu 12","Cebu 18","Cebu 24","Boracay 09","Boracay 12","Boracay 18","Boracay 24","Luzon 09","Luzon 12","Luzon 18","Luzon 24","Premium Plus 09","Premium Plus 12","Premium Plus 18","Premium Plus 24"],
"Sharp":["AY-X 09","AY-X 12","AY-X 18","AY-X 24","AY-AP 09","AY-AP 12","AY-AP 18","AY-AP 24","AY-A 09","AY-A 12","AY-A 18","AY-A 24","J-Tech 09","J-Tech 12","J-Tech 18","J-Tech 24","Plasmacluster 09","Plasmacluster 12","Plasmacluster 18","Plasmacluster 24"],
"Sinclair":["Keyon 09","Keyon 12","Keyon 18","Keyon 24","Keyon Eco 09","Keyon Eco 12","Keyon Eco 18","Keyon Eco 24","Terrel 09","Terrel 12","Terrel 18","Terrel 24","Terrel S 09","Terrel S 12","Terrel S 18","Terrel S 24","Ray 09","Ray 12","Ray 18","Ray 24","Focus 09","Focus 12","Focus 18","Focus 24","Element 09","Element 12","Element 18","Element 24","Spectrum 09","Spectrum 12","Spectrum 18","Spectrum 24"],
"TCL":["Elite 09","Elite 12","Elite 18","Elite 24","FreshIN 09","FreshIN 12","FreshIN 18","FreshIN 24","FreshIN+ 09","FreshIN+ 12","FreshIN+ 18","FreshIN+ 24","TAC 09","TAC 12","TAC 18","TAC 24","XA 09","XA 12","XA 18","XA 24","Deluxe 09","Deluxe 12","Deluxe 18","Deluxe 24","BreezeIN 09","BreezeIN 12","BreezeIN 18","BreezeIN 24"],
"Tesla":["TA 09","TA 12","TA 18","TA 24","TT 09","TT 12","TT 18","TT 24","TM 09","TM 12","TM 18","TM 24","TMX 09","TMX 12","TMX 18","TMX 24","TAW 09","TAW 12","TAW 18","TAW 24","TAC 09","TAC 12","TAC 18","TAC 24","Select 09","Select 12","Select 18","Select 24","Smart 09","Smart 12","Smart 18","Smart 24","Elite 09","Elite 12","Elite 18","Elite 24"],
"Toshiba":["Seiya 09","Seiya 12","Seiya 18","Seiya 24","Shorai 09","Shorai 12","Shorai 18","Shorai 24","Haori 09","Haori 12","Haori 18","Haori 24","Daiseikai 09","Daiseikai 12","Daiseikai 18","Daiseikai 24","Edge 09","Edge 12","Edge 18","Edge 24","RAV 09","RAV 12","RAV 18","RAV 24","Mirai 09","Mirai 12","Mirai 18","Mirai 24"],
"Toshiba Carrier":["Seiya 09","Seiya 12","Seiya 18","Seiya 24","Shorai 09","Shorai 12","Shorai 18","Shorai 24","RAV 09","RAV 12","RAV 18","RAV 24","Mirai 09","Mirai 12","Mirai 18","Mirai 24","Digital Inverter 09","Digital Inverter 12","Digital Inverter 18","Digital Inverter 24"],
"VIVAX":["ACP-09CH25AEQI 09","ACP-09CH25AEQI 12","ACP-09CH25AEQI 18","ACP-09CH25AEQI 24","ACP-12CH35AEQI 09","ACP-12CH35AEQI 12","ACP-12CH35AEQI 18","ACP-12CH35AEQI 24","ACP-18CH50AEQI 09","ACP-18CH50AEQI 12","ACP-18CH50AEQI 18","ACP-18CH50AEQI 24","ACP-24CH70AEQI 09","ACP-24CH70AEQI 12","ACP-24CH70AEQI 18","ACP-24CH70AEQI 24","ACP-09CH35AEVI 09","ACP-09CH35AEVI 12","ACP-09CH35AEVI 18","ACP-09CH35AEVI 24","ACP-12CH35AEVI 09","ACP-12CH35AEVI 12","ACP-12CH35AEVI 18","ACP-12CH35AEVI 24","ACP-18CH50AEVI 09","ACP-18CH50AEVI 12","ACP-18CH50AEVI 18","ACP-18CH50AEVI 24","ACP-24CH70AEVI 09","ACP-24CH70AEVI 12","ACP-24CH70AEVI 18","ACP-24CH70AEVI 24","ACP-09CH25AERI 09","ACP-09CH25AERI 12","ACP-09CH25AERI 18","ACP-09CH25AERI 24","ACP-12CH35AERI 09","ACP-12CH35AERI 12","ACP-12CH35AERI 18","ACP-12CH35AERI 24"],
"VOX":["IVA1 09","IVA1 12","IVA1 18","IVA1 24","IVA2 09","IVA2 12","IVA2 18","IVA2 24","IVA3 09","IVA3 12","IVA3 18","IVA3 24","IFX 09","IFX 12","IFX 18","IFX 24","IFX2 09","IFX2 12","IFX2 18","IFX2 24","IFX3 09","IFX3 12","IFX3 18","IFX3 24","SFX 09","SFX 12","SFX 18","SFX 24","VSA 09","VSA 12","VSA 18","VSA 24","VSA1 09","VSA1 12","VSA1 18","VSA1 24"],
"York":["YH 09","YH 12","YH 18","YH 24","YV 09","YV 12","YV 18","YV 24","M 09","M 12","M 18","M 24","Affinity 09","Affinity 12","Affinity 18","Affinity 24","L 09","L 12","L 18","L 24","Elegance 09","Elegance 12","Elegance 18","Elegance 24"],
"Maxa":["MOB 09","MOB 12","MOB 18","MOB 24","MCA 09","MCA 12","MCA 18","MCA 24","MHA 09","MHA 12","MHA 18","MHA 24","MPC 09","MPC 12","MPC 18","MPC 24","Inverter 09","Inverter 12","Inverter 18","Inverter 24"],
"Orion":["OAC 09","OAC 12","OAC 18","OAC 24","OAC Inverter 09","OAC Inverter 12","OAC Inverter 18","OAC Inverter 24","Smart 09","Smart 12","Smart 18","Smart 24","Premium 09","Premium 12","Premium 18","Premium 24"],
"Housel":["HAC 09","HAC 12","HAC 18","HAC 24","HAC Inverter 09","HAC Inverter 12","HAC Inverter 18","HAC Inverter 24","Pro 09","Pro 12","Pro 18","Pro 24","Smart 09","Smart 12","Smart 18","Smart 24"],
"Tristar":["AC- 09","AC- 12","AC- 18","AC- 24","AC Inverter 09","AC Inverter 12","AC Inverter 18","AC Inverter 24","Split 09","Split 12","Split 18","Split 24","Portable 09","Portable 12","Portable 18","Portable 24"],
};
const faults=[
["f01","Ne hladi / slabo hladi","Kompresor / rashladni sistem","INVERTER + ON/OFF","Proveri filtere, izmenjivače, ventilatore i stanje rashladnog kola. Kod invertera koristi servisnu dokumentaciju za merenja.","Ne dopunjavati naslepo; prvo utvrditi uzrok i proveriti curenje ako je potrebno."],
["f02","Ne greje / slabo greje","4-way ventil / rashladni sistem","INVERTER + ON/OFF","Proveri zahtev za grejanje, ventilatore i promenu režima. Za 4-way ventil prati OEM proceduru.","Potvrdi kvar ventila pre intervencije na rashladnom kolu."],
["f03","Ne pali / nema reakcije","Napajanje / PCB","INVERTER + ON/OFF","Proveri napajanje, osigurače i konektore bezbednom procedurom. Za inverter elektroniku prati šemu.","Otkloni uzrok napajanja ili potvrđen PCB kvar."],
["f04","Spoljna jedinica ne startuje","PCB / komunikacija / kondenzator","INVERTER + ON/OFF","Proveri zahtev za rad, komunikaciju i napajanje prema tipu uređaja.","Potvrdi da li je problem komanda, komunikacija ili pogonski deo."],
["f05","Izbacuje osigurač","Kompresor / PCB / motor / instalacija","INVERTER + ON/OFF","Isključi napajanje i proveri instalaciju i izolaciju po proceduri.","Lociraj element koji pravi prekomernu struju pre zamene."],
["f06","Prijavljuje kod greške","Senzor / PCB / komunikacija","INVERTER + ON/OFF","Prepiši tačan kod i model i proveri OEM tabelu koda.","Ne menjati deo samo na osnovu generičkog koda."],
["f07","Zaleđuje unutrašnji izmenjivač","Filter / ventilator / rashladno kolo","INVERTER + ON/OFF","Proveri protok vazduha, ventilator i rashladni sistem.","Otkloni uzrok; samo odmrzavanje nije popravka."],
["f08","Curi voda iz unutrašnje jedinice","Odvod kondenzata / kadica","INVERTER + ON/OFF","Proveri odvodno crevo, nagib, pumpu ako postoji i zapušenje kadice.","Očisti i pravilno postavi odvod, zatim proveri rad."],
["f09","Ventilator unutrašnje jedinice ne radi","Motor / PCB / kondenzator kod nekih ON/OFF","INVERTER + ON/OFF","Proveri komandu, konektore i motor prema šemi konkretnog modela.","Potvrdi motor ili PCB pre zamene."],
["f10","Ventilator spoljne jedinice ne radi","Motor / PCB / kondenzator","INVERTER + ON/OFF","Kod ON/OFF proveri kondenzator prema modelu; kod invertera prati šemu i servisni priručnik.","Potvrdi kvar motora ili elektronike."],
["f11","Kompresor ne startuje","Kompresor / inverter modul / kondenzator","INVERTER + ON/OFF","Za inverter koristi servisnu dijagnostiku; za ON/OFF proveri startni sklop prema modelu.","Ne menjati kompresor bez potvrde kvara."],
["f12","Zujanje / teško startuje","Kompresor / kondenzator / napajanje","ON/OFF + INVERTER","Proveri napajanje, spojeve i startni sklop prema tipu.","Kod ponavljanog starta zaustaviti uređaj i pronaći uzrok."],
["f13","Greška komunikacije unutrašnja-spoljna","Komunikaciona linija / PCB","INVERTER","Proveri ožičenje, terminale i kod greške prema šemi.","Otkloni prekid, loš spoj ili potvrđen PCB kvar."],
["f14","Senzor temperature neispravan","NTC senzor / PCB","INVERTER + ON/OFF","Identifikuj tačan senzor i vrednosti u OEM dokumentaciji.","Zameniti tek nakon potvrde senzora ili njegovog priključka."],
["f15","Ne prebacuje hlađenje/grejanje","4-way ventil / upravljanje","INVERTER + ON/OFF","Proveri komandu režima, uslove rada i 4-way ventil prema modelu.","Potvrdi kvar ventila pre rada na rashladnom kolu."],
["f16","Slab protok vazduha","Filter / turbina / motor","INVERTER + ON/OFF","Pregledaj filter, turbinu, isparivač i brzine ventilatora.","Očisti ili otkloni uzrok, pa proveri protok."],
["f17","Spoljna jedinica pregreva","Izmenjivač / ventilator / rashladni sistem","INVERTER + ON/OFF","Proveri čistoću izmenjivača, ventilator i radne parametre prema modelu.","Otkloniti uzrok pre dužeg rada."],
["f18","Kompresor radi ali nema učinka","Rashladno kolo / kompresor","INVERTER + ON/OFF","Proveri protok vazduha, radne parametre i moguće curenje prema proceduri.","Utvrditi uzrok pre dopune ili zamene kompresora."],
["f19","Daljinski ne reaguje","Daljinski / prijemnik / PCB","INVERTER + ON/OFF","Proveri baterije, prijemnik i funkciju uređaja sa drugim načinom komande ako postoji.","Potvrdi da li je kvar daljinski ili prijemnik."],
["f20","Sam se gasi","Zaštita / senzor / napajanje / PCB","INVERTER + ON/OFF","Prepiši kod ako postoji i proveri uslove u trenutku gašenja.","Tražiti uzrok zaštite, ne samo resetovati uređaj."],
["f21","Čuje se neuobičajena buka","Ventilator / ležaj / turbina / kompresor","INVERTER + ON/OFF","Lociraj zvuk i proveri mehaničke delove.","Potvrdi izvor buke pre zamene dela."],
["f22","Lamele ne rade","Motor lamela / PCB","INVERTER + ON/OFF","Proveri komandu, motor i mehanizam.","Zameniti samo potvrđen neispravan deo."],
["f23","Ne izbacuje kondenzat","Odvod / pumpa / kadica","INVERTER + ON/OFF","Proveri prohodnost odvoda i pumpu ako je ugrađena.","Očisti ili zameni potvrđeno neispravan deo."],
["f24","ON/OFF radi samo ventilator","Kompresor / kondenzator / termostat / relej","ON/OFF","Proveri zahtev za kompresor i startni sklop prema modelu.","Potvrdi električni ili upravljački uzrok."],
["f25","ON/OFF kompresor stalno radi","Termostat / senzor / rashladni sistem","ON/OFF","Proveri zadatu temperaturu, senzor i rad sistema.","Otkloni uzrok kontinuiranog rada."],
["f26","Inverter ne menja brzinu","PCB / motor / upravljanje","INVERTER","Proveri kodove i upravljanje prema modelu.","Potvrditi motor ili PCB."],
["f27","Uređaj radi kratko pa staje","Zaštita / senzor / pritisak / protok","INVERTER + ON/OFF","Zabeleži trenutak zaustavljanja i kod, pa prati OEM dijagnostiku.","Ne resetovati bez utvrđivanja uzroka."],
["f28","Miris iz unutrašnje jedinice","Isparivač / turbina / kadica","INVERTER + ON/OFF","Pregledaj i očisti delove koji zadržavaju vlagu i nečistoću.","Temeljno čišćenje i rešavanje izvora vlage."],
["f29","Kondenzacija na cevima","Izolacija / temperatura / rashladni sistem","INVERTER + ON/OFF","Proveri izolaciju, uslove rada i stanje sistema.","Popravi izolaciju ili uzrok prema nalazu."],
["f30","Slab učinak posle servisa","Filteri / izmenjivači / montaža / rashladni sistem","INVERTER + ON/OFF","Uporedi stanje pre/posle servisa i proveri protok vazduha i montažu.","Dokumentovati nalaz i parametre."]
];
const codes=[
["Midea","E0","Indoor EEPROM / parameter greška","INVERTER + ON/OFF"],
["Midea","E1","Komunikaciona greška unutrašnja–spoljna","INVERTER + ON/OFF"],
["Midea","E2","Zero-crossing signal greška","INVERTER + ON/OFF"],
["Midea","E3","Brzina unutrašnjeg ventilatora van normalnog opsega","INVERTER + ON/OFF"],
["Midea","E4","Senzor sobne temperature","INVERTER + ON/OFF"],
["Midea","E5","Senzor T1 / sobna temperatura","INVERTER + ON/OFF"],
["Midea","E6","Senzor T2 / temperatura izmenjivača","INVERTER + ON/OFF"],
["Midea","E7","Senzor T3/T4, zavisno od serije","INVERTER + ON/OFF"],
["Midea","E8","Brzina spoljnog ventilatora van normalnog opsega","INVERTER + ON/OFF"],
["Midea","E9","Komunikacija unutrašnja–spoljna kod nekih serija","INVERTER + ON/OFF"],
["Midea","EC","Detekcija curenja rashladnog sredstva","INVERTER + ON/OFF"],
["Midea","F0","Prekostrujna zaštita","INVERTER + ON/OFF"],
["Midea","F1","Senzor spoljne temperature","INVERTER + ON/OFF"],
["Midea","F2","Senzor kondenzatora","INVERTER + ON/OFF"],
["Midea","F3","Senzor izduvne temperature","INVERTER + ON/OFF"],
["Midea","F4","Outdoor EEPROM / elektronska greška","INVERTER + ON/OFF"],
["Midea","P0","IPM modul","INVERTER + ON/OFF"],
["Midea","P1","Prenizak/previsok napon","INVERTER + ON/OFF"],
["Midea","P2","IPM visoka temperatura","INVERTER + ON/OFF"],
["Midea","P4","Zaštita položaja kompresora","INVERTER + ON/OFF"],
["Midea","P6","Visok pritisak kod nekih serija","INVERTER + ON/OFF"],
["Haier","E1","Senzor unutrašnje temperature","INVERTER + ON/OFF"],
["Haier","E2","Senzor temperature cevi","INVERTER + ON/OFF"],
["Haier","E4","Indoor EEPROM","INVERTER + ON/OFF"],
["Haier","E5","Zaštita od zaleđivanja","INVERTER + ON/OFF"],
["Haier","E7","Komunikacija unutrašnja–spoljna","INVERTER + ON/OFF"],
["Haier","E9","Preopterećenje unutrašnje jedinice u grejanju","INVERTER + ON/OFF"],
["Haier","E14","Motor unutrašnjeg ventilatora","INVERTER + ON/OFF"],
["Haier","F1","IPM zaštita","INVERTER + ON/OFF"],
["Haier","F2","Trenutna prekostrujna zaštita kompresora","INVERTER + ON/OFF"],
["Haier","F3","Komunikacija power modula i glavnog PCB-a","INVERTER + ON/OFF"],
["Haier","F4","Zaštita temperature izduva kompresora","INVERTER + ON/OFF"],
["Haier","F6","Senzor spoljne temperature","INVERTER + ON/OFF"],
["Haier","F7","Senzor usisne temperature","INVERTER + ON/OFF"],
["Haier","F8","DC motor spoljnog ventilatora","INVERTER + ON/OFF"],
["Haier","F13","Nedostatak rashladnog sredstva","INVERTER + ON/OFF"],
["Haier","F14","4-way ventil – pogrešno prebacivanje","INVERTER + ON/OFF"],
["Haier","F19","Zaštita preniskog/previsokog napona","INVERTER + ON/OFF"],
["Haier","F20","Zaštita visokog pritiska","INVERTER + ON/OFF"],
["Haier","F23","Prekostrujna zaštita faze kompresora","INVERTER + ON/OFF"],
["Haier","F35","Kvar drajver ploče kompresora","INVERTER + ON/OFF"],
["Haier","FE","Detekcija curenja kod određenih fixed-frequency modela","INVERTER + ON/OFF"],
["Panasonic","H11","Komunikacija unutrašnja–spoljna","INVERTER + ON/OFF"],
["Panasonic","H12","Nepodudaranje kapaciteta unutrašnje jedinice","INVERTER + ON/OFF"],
["Panasonic","H14","Senzor usisnog vazduha","INVERTER + ON/OFF"],
["Panasonic","H15","Senzor temperature kompresora","INVERTER + ON/OFF"],
["Panasonic","H16","Spoljni strujni transformator","INVERTER + ON/OFF"],
["Panasonic","H17","Senzor usisne temperature","INVERTER + ON/OFF"],
["Panasonic","H19","Blokiran mehanizam unutrašnjeg ventilatora","INVERTER + ON/OFF"],
["Panasonic","H21","Float switch / nivo vode","INVERTER + ON/OFF"],
["Panasonic","H23","Senzor izmenjivača unutrašnje jedinice 1","INVERTER + ON/OFF"],
["Panasonic","H24","Senzor izmenjivača unutrašnje jedinice 2","INVERTER + ON/OFF"],
["Panasonic","H27","Senzor spoljnog vazduha","INVERTER + ON/OFF"],
["Panasonic","H28","Senzor spoljnog izmenjivača 1","INVERTER + ON/OFF"],
["Panasonic","H30","Senzor temperature discharge cevi","INVERTER + ON/OFF"],
["Panasonic","H32","Senzor spoljnog izmenjivača 2","INVERTER + ON/OFF"],
["Panasonic","H33","Pogrešno povezivanje unutrašnje/spoljne","INVERTER + ON/OFF"],
["Panasonic","H34","Senzor hladnjaka elektronike","INVERTER + ON/OFF"],
["Panasonic","H36","Senzor gasne cevi","INVERTER + ON/OFF"],
["Panasonic","H37","Senzor tečne cevi","INVERTER + ON/OFF"],
["Panasonic","H38","Nepodudaranje brend-koda","INVERTER + ON/OFF"],
["Panasonic","H41","Pogrešno ožičenje ili cevna veza","INVERTER + ON/OFF"],
["Panasonic","H50","Blokiran ventilacioni motor","INVERTER + ON/OFF"],
["Panasonic","H58","Senzor gasa","INVERTER + ON/OFF"],
["Panasonic","H64","Senzor visokog pritiska","INVERTER + ON/OFF"],
["Panasonic","H67","nanoe uređaj","INVERTER + ON/OFF"],
["Panasonic","H70","Senzor svetla","INVERTER + ON/OFF"],
["Panasonic","H71","DC ventilator u upravljačkoj ploči","INVERTER + ON/OFF"],
["Panasonic","H79","Greška WLAN modula","INVERTER + ON/OFF"],
["Panasonic","H85","Komunikacija unutrašnja–WLAN","INVERTER + ON/OFF"],
["Panasonic","H97","Blokiran spoljašnji ventilator","INVERTER + ON/OFF"],
["Panasonic","H98","Visok pritisak unutrašnje jedinice u grejanju","INVERTER + ON/OFF"],
["Panasonic","H99","Zaštita od zaleđivanja unutrašnje jedinice","INVERTER + ON/OFF"],
["Panasonic","F11","4-way ventil","INVERTER + ON/OFF"],
["Panasonic","F16","Ukupna radna struja","INVERTER + ON/OFF"],
["Panasonic","F90","PFC / komunikacija mikroprocesora","INVERTER + ON/OFF"],
["Panasonic","F91","Nenormalan rashladni ciklus","INVERTER + ON/OFF"],
["Panasonic","F93","Nenormalna brzina kompresora","INVERTER + ON/OFF"],
["Panasonic","F94","Zaštita pritiska discharge kompresora","INVERTER + ON/OFF"],
["Panasonic","F95","Visok pritisak spoljne jedinice","INVERTER + ON/OFF"],
["Panasonic","F96","Pregrevanje power transistor modula","INVERTER + ON/OFF"],
["Panasonic","F97","Pregrevanje kompresora","INVERTER + ON/OFF"],
["Panasonic","F98","Ukupna radna struja","INVERTER + ON/OFF"],
["Panasonic","F99","DC peak detekcija","INVERTER + ON/OFF"],
["LG","CH05","Komunikacija unutrašnja–spoljna","INVERTER + ON/OFF"],
["LG","CH53","Komunikacija unutrašnja–spoljna","INVERTER + ON/OFF"],
["LG","E0","Komunikacioni problem kod određenih serija","INVERTER + ON/OFF"],
["LG","CH07","Konflikt režima rada kod multi-split sistema","INVERTER + ON/OFF"],
["LG","CH32","Niska količina rashladnog sredstva / zaštita kompresora, zavisno od serije","INVERTER + ON/OFF"],
["LG","CH33","Rashladno sredstvo / kompresor, zavisno od serije","INVERTER + ON/OFF"],
["LG","CH36","Rashladno sredstvo / kompresor, zavisno od serije","INVERTER + ON/OFF"],
["LG","CH38","Nizak nivo rashladnog sredstva / zaštita","INVERTER + ON/OFF"],
["LG","F4","Rashladni sistem / kompresor, zavisno od serije","INVERTER + ON/OFF"],
["LG","CH66","Problem ožičenja / test rada","INVERTER + ON/OFF"],
["LG","CH90","Nedovršen test rada ili instalacioni problem","INVERTER + ON/OFF"],
["LG","CH91","Nedovršen test rada / protok rashladnog sredstva","INVERTER + ON/OFF"],
["LG","CH92","Instalacioni problem / test rada","INVERTER + ON/OFF"],
["LG","CH93","Instalacioni problem / test rada","INVERTER + ON/OFF"],
["Carrier","E0","Konflikt režima","INVERTER + ON/OFF"],
["Carrier","E1","Komunikacija unutrašnja–spoljna","INVERTER + ON/OFF"],
["Carrier","E2","Senzor sobne temperature – prekid/kratak spoj","INVERTER + ON/OFF"],
["Carrier","E3","Senzor unutrašnjeg izmenjivača – prekid/kratak spoj","INVERTER + ON/OFF"],
["Carrier","E4","Senzor spoljnog izmenjivača – prekid/kratak spoj","INVERTER + ON/OFF"],
["Carrier","E7","Indoor EEPROM greška","INVERTER + ON/OFF"],
["Carrier","Ed","Gubitak faze / obrnut redosled faza kod određenih sistema","INVERTER + ON/OFF"],
["Carrier","EE","Alarm nivoa vode kod sistema sa pumpom","INVERTER + ON/OFF"],
["Fujitsu General","E:EE","Aktivirana samodijagnostika – konkretan kod određuje kvar","INVERTER + ON/OFF"],
["Fujitsu General","11","Komunikacija daljinski–unutrašnja jedinica, zavisno od sistema","INVERTER + ON/OFF"],
["Fujitsu General","12","Komunikacija unutrašnja–spoljna, zavisno od sistema","INVERTER + ON/OFF"],
["Fujitsu General","13","Senzor sobne temperature, zavisno od sistema","INVERTER + ON/OFF"],
["Fujitsu General","14","Senzor unutrašnjeg izmenjivača, zavisno od sistema","INVERTER + ON/OFF"],
["Fujitsu General","21","Senzor spoljnog izmenjivača, zavisno od sistema","INVERTER + ON/OFF"],
["Fujitsu General","31","Napajanje / povezivanje, zavisno od sistema","INVERTER + ON/OFF"],
["Fujitsu General","41","Zaštita visokog pritiska, zavisno od sistema","INVERTER + ON/OFF"],
["Fujitsu General","51","Ventilator unutrašnje jedinice, zavisno od sistema","INVERTER + ON/OFF"],
["Midea","P6","Visok pritisak – samo određene serije","INVERTER"],
["Gree","MODEL-SPECIFIC","Kodovi grešaka zavise od tačne serije/modela — proveriti OEM servisni priručnik","INVERTER + ON/OFF"],
["Samsung","MODEL-SPECIFIC","Kodovi grešaka zavise od tačne serije/modela — proveriti OEM servisni priručnik","INVERTER + ON/OFF"],
["Daikin","MODEL-SPECIFIC","Kodovi grešaka zavise od tačne serije/modela — proveriti OEM servisni priručnik","INVERTER + ON/OFF"],
["Mitsubishi Electric","MODEL-SPECIFIC","Kodovi grešaka zavise od tačne serije/modela — proveriti OEM servisni priručnik","INVERTER + ON/OFF"],
["Mitsubishi Heavy","MODEL-SPECIFIC","Kodovi grešaka zavise od tačne serije/modela — proveriti OEM servisni priručnik","INVERTER + ON/OFF"],
["Toshiba","MODEL-SPECIFIC","Kodovi grešaka zavise od tačne serije/modela — proveriti OEM servisni priručnik","INVERTER + ON/OFF"],
["Toshiba Carrier","MODEL-SPECIFIC","Kodovi grešaka zavise od tačne serije/modela — proveriti OEM servisni priručnik","INVERTER + ON/OFF"],
["Hisense","MODEL-SPECIFIC","Kodovi grešaka zavise od tačne serije/modela — proveriti OEM servisni priručnik","INVERTER + ON/OFF"],
["VIVAX","MODEL-SPECIFIC","Kodovi grešaka zavise od tačne serije/modela — proveriti OEM servisni priručnik","INVERTER + ON/OFF"],
["VOX","MODEL-SPECIFIC","Kodovi grešaka zavise od tačne serije/modela — proveriti OEM servisni priručnik","INVERTER + ON/OFF"],
["Tesla","MODEL-SPECIFIC","Kodovi grešaka zavise od tačne serije/modela — proveriti OEM servisni priručnik","INVERTER + ON/OFF"],
["Sinclair","MODEL-SPECIFIC","Kodovi grešaka zavise od tačne serije/modela — proveriti OEM servisni priručnik","INVERTER + ON/OFF"],
["TCL","MODEL-SPECIFIC","Kodovi grešaka zavise od tačne serije/modela — proveriti OEM servisni priručnik","INVERTER + ON/OFF"],
["AUX","MODEL-SPECIFIC","Kodovi grešaka zavise od tačne serije/modela — proveriti OEM servisni priručnik","INVERTER + ON/OFF"],
["Cooper&Hunter","MODEL-SPECIFIC","Kodovi grešaka zavise od tačne serije/modela — proveriti OEM servisni priručnik","INVERTER + ON/OFF"],
["Hitachi","MODEL-SPECIFIC","Kodovi grešaka zavise od tačne serije/modela — proveriti OEM servisni priručnik","INVERTER + ON/OFF"],
["Fujitsu","MODEL-SPECIFIC","Kodovi grešaka zavise od tačne serije/modela — proveriti OEM servisni priručnik","INVERTER + ON/OFF"],
["Sharp","MODEL-SPECIFIC","Kodovi grešaka zavise od tačne serije/modela — proveriti OEM servisni priručnik","INVERTER + ON/OFF"],
["Ariston","MODEL-SPECIFIC","Kodovi grešaka zavise od tačne serije/modela — proveriti OEM servisni priručnik","INVERTER + ON/OFF"],
["Kaisai","MODEL-SPECIFIC","Kodovi grešaka zavise od tačne serije/modela — proveriti OEM servisni priručnik","INVERTER + ON/OFF"],
["York","MODEL-SPECIFIC","Kodovi grešaka zavise od tačne serije/modela — proveriti OEM servisni priručnik","INVERTER + ON/OFF"],
["Bosch","MODEL-SPECIFIC","Kodovi grešaka zavise od tačne serije/modela — proveriti OEM servisni priručnik","INVERTER + ON/OFF"],
["Beko","MODEL-SPECIFIC","Kodovi grešaka zavise od tačne serije/modela — proveriti OEM servisni priručnik","INVERTER + ON/OFF"],
["Ferroli","MODEL-SPECIFIC","Kodovi grešaka zavise od tačne serije/modela — proveriti OEM servisni priručnik","INVERTER + ON/OFF"],
["Daitsu","MODEL-SPECIFIC","Kodovi grešaka zavise od tačne serije/modela — proveriti OEM servisni priručnik","INVERTER + ON/OFF"],
["Electrolux","MODEL-SPECIFIC","Kodovi grešaka zavise od tačne serije/modela — proveriti OEM servisni priručnik","INVERTER + ON/OFF"],
["Galanz","MODEL-SPECIFIC","Kodovi grešaka zavise od tačne serije/modela — proveriti OEM servisni priručnik","INVERTER + ON/OFF"],
["Fox","MODEL-SPECIFIC","Kodovi grešaka zavise od tačne serije/modela — proveriti OEM servisni priručnik","INVERTER + ON/OFF"],
["Olimpia Splendid","MODEL-SPECIFIC","Kodovi grešaka zavise od tačne serije/modela — proveriti OEM servisni priručnik","INVERTER + ON/OFF"],
["Maxa","MODEL-SPECIFIC","Kodovi grešaka zavise od tačne serije/modela — proveriti OEM servisni priručnik","INVERTER + ON/OFF"],
["Hyundai","MODEL-SPECIFIC","Kodovi grešaka zavise od tačne serije/modela — proveriti OEM servisni priručnik","INVERTER + ON/OFF"],
["Orion","MODEL-SPECIFIC","Kodovi grešaka zavise od tačne serije/modela — proveriti OEM servisni priručnik","INVERTER + ON/OFF"],
["Housel","MODEL-SPECIFIC","Kodovi grešaka zavise od tačne serije/modela — proveriti OEM servisni priručnik","INVERTER + ON/OFF"],
["Tristar","MODEL-SPECIFIC","Kodovi grešaka zavise od tačne serije/modela — proveriti OEM servisni priručnik","INVERTER + ON/OFF"]
];
// --- Expanded field database: Frozzini/Frozini, Eskimo, Galanz, Carrier and older Midea LED diagnostics ---
for (const b of ["Frozini","Frozzini","Eskimo"]) if (!brands.includes(b)) brands.push(b);
const addedModels = {
  "Frozini": [
    "KFR 35GW/C 12 ON/OFF",
    "FRZINV-12K Primera",
    "FRZINV-18K Primera",
    "CH 12K INV PRO CH",
    "CH 12K INV PREMIUM",
    "TAC12CHSD/LFI GW",
    "TAC18CHSD/LFI GW",
    "TAC24CHSD/LFI GW",
    "TAC12CHSD/LFI INV GW",
    "TAC18CHSD/LFI INV GW",
    "TAC24CHSD/LFI INV GW",
    "Breezeless GW 12",
    "Breezeless GW 18",
    "Breezeless GW 24",
    "Premium Inverter 12",
    "Premium Inverter 18"
  ],
  "Frozzini": [
    "KFR 35GW/C 12 ON/OFF",
    "FRZINV-12K Primera",
    "FRZINV-18K Primera",
    "CH 12K INV PRO CH",
    "CH 12K INV PREMIUM",
    "TAC12CHSD/LFI GW",
    "TAC18CHSD/LFI GW",
    "TAC24CHSD/LFI GW",
    "TAC12CHSD/LFI INV GW",
    "TAC18CHSD/LFI INV GW",
    "TAC24CHSD/LFI INV GW",
    "Breezeless GW 12",
    "Breezeless GW 18",
    "Breezeless GW 24",
    "Premium Inverter 12",
    "Premium Inverter 18"
  ],
  "Eskimo": [
    "ES-AF-09HRDN8",
    "ES-AF-12HRDN8",
    "ES-AF-18HRDN8",
    "ES-AF-24HRDN8",
    "ES-AF 09",
    "ES-AF 12",
    "ES-AF 18",
    "ES-AF 24",
    "Split Inverter 09",
    "Split Inverter 12",
    "Split Inverter 18",
    "Split Inverter 24",
    "Portable R-893"
  ],
  "Galanz": [
    "AUS-09C(H)53R130Dx",
    "AUS-09C53R130D1",
    "AUS-09C53R130D2",
    "AUS-09C53R130D3",
    "AUS-09H53R130D1",
    "AUS-09H53R130D2",
    "AUS-09H53R130D3",
    "AUS-12C53R130D1",
    "AUS-12C53R130D2",
    "AUS-12C53R130D3",
    "AUS-12H53R130D1",
    "AUS-12H53R130D2",
    "AUS-12H53R130D3",
    "AUS-18C53R220D1",
    "AUS-18C53R220D2",
    "AUS-18C53R220D3",
    "AUS-18H53R220D1",
    "AUS-18H53R220D2",
    "AUS-18H53R220D3",
    "AUS-18C53R120D1",
    "AUS-18C53R120D2",
    "AUS-18C53R120D3",
    "AUS-18H53R120D1",
    "AUS-18H53R120D2",
    "AUS-18H53R120D3",
    "KUDO GIW07NK4/OW07NK",
    "KUDO GIW09NK4/OW09NK",
    "KUDO GIW12NK4/OW12NK",
    "KUDO GIW18NK4/OW18NK",
    "KUDO GIW24NK4/OW24NK"
  ],
  "Carrier": [
    "Crystal 09","Crystal 12","Crystal 18","Crystal 24",
    "XPower 09","XPower 12","XPower 18","XPower 24",
    "Extreme 09","Extreme 12","Extreme 18","Extreme 24",
    "Infinity 09","Infinity 12","Infinity 18","Infinity 24",
    "Comfort 09","Comfort 12","Comfort 18","Comfort 24",
    "Platinum 09","Platinum 12","Platinum 18","Platinum 24",
    "AquaSnap 09","AquaSnap 12","AquaSnap 18","AquaSnap 24",
    "42TGEV-09","42TGEV-12","42TGEV-18","42TGEV-24",
    "DX Portable"
  ],
  "Midea": [
    "MSC-09HRDN1-QD0(E)","MSC-12HRDN1-QC6(E)",
    "MSH-09HRDN1-QD0(E)","MSH-12HRDN1-QC6(E)",
    "MSE-07CR","MSG-28CRN1-QB9P","MSG-30CRN1-QB9P",
    "MSV1-18HRDN1-QC2F"
  ]
};
for (const [k,v] of Object.entries(addedModels)) models[k]=[...new Set([...(models[k]||[]),...v])];

const extraFaults = [
  ["g01","Galanz C1 – komunikacija","Komunikaciona linija / PCB","INVERTER + ON/OFF","Prepiši C1 i proveri međusobnu komunikaciju unutrašnje i spoljne jedinice prema šemi konkretnog modela.","Proveri terminale, ožičenje i ploče; ne menjati PCB bez potvrde."],
  ["g02","Galanz E1 – senzor prostorije","NTC sobne temperature","INVERTER + ON/OFF","Proveri konektor i NTC prema servisnom podatku konkretnog modela.","Potvrdi senzor ili instalaciju pre zamene."],
  ["g03","Galanz E2 – senzor unutrašnjeg izmenjivača","NTC unutrašnjeg izmenjivača","INVERTER + ON/OFF","Proveri senzor, konektor i položaj na izmenjivaču.","Zameni samo potvrđeno neispravan senzor."],
  ["g04","Galanz E4 – senzor spoljnog izmenjivača","NTC spoljnog izmenjivača","INVERTER + ON/OFF","Proveri senzor i konektor prema modelu.","Potvrdi merenjem/servisnim podatkom konkretnog modela."],
  ["g05","Galanz H1 – kvar spoljne jedinice","Spoljna PCB / pogonski sklop","INVERTER + ON/OFF","H1 je široka oznaka spoljnog kvara; očitaj dodatne indikacije na spoljašnjoj jedinici.","Ne menjati ploču bez utvrđivanja uzroka."],
  ["g06","Galanz H2 – zaštita visokog pritiska","Rashladni sistem / protok vazduha","INVERTER + ON/OFF","Proveri čistoću izmenjivača, ventilator i uslove rada; zatim proveri sistem po OEM proceduri.","Otkloni uzrok zaštite, ne samo resetovati."],
  ["g07","Galanz H3 – zaštita niskog pritiska","Rashladni sistem / curenje / kompresor","INVERTER + ON/OFF","Proveri radne uslove i moguće curenje prema servisnoj proceduri.","Ne dopunjavati naslepo."],
  ["g08","Galanz P1 – zaštita od zaleđivanja unutrašnjeg bloka","Isparivač / protok vazduha / rashladni sistem","INVERTER + ON/OFF","Proveri filter, turbinu, ventilator i rashladni sistem.","Ukloniti uzrok zaleđivanja."],
  ["g09","Galanz P2 – zaštita od pregrevanja unutrašnje jedinice","Izmenjivač / ventilator / senzor","INVERTER + ON/OFF","Proveri protok vazduha i senzor prema modelu.","Potvrditi uzrok pre ponovnog rada."],
  ["g10","Galanz P3 – zaštita spoljne jedinice u hlađenju","Spoljni izmenjivač / ventilator / sistem","INVERTER + ON/OFF","Proveri temperaturu, izmenjivač i ventilator.","Otkloni uzrok zaštite."],
  ["c01","Carrier E1 – komunikacija","Komunikacija / PCB","INVERTER + ON/OFF","Proveri interkonekciju i komunikaciju prema tačnoj Carrier seriji.","Potvrdi instalaciju i ploču pre zamene."],
  ["c02","Carrier E2 – sobni senzor","NTC sobne temperature","INVERTER + ON/OFF","Proveri senzor i konektor prema modelu.","Zameniti tek nakon potvrde."],
  ["c03","Carrier E3 – senzor unutrašnjeg izmenjivača","NTC unutrašnjeg izmenjivača","INVERTER + ON/OFF","Proveri senzor i ožičenje.","Potvrdi kvar senzora."],
  ["c04","Carrier E4 – senzor spoljnog izmenjivača","NTC spoljnog izmenjivača","INVERTER + ON/OFF","Proveri senzor i konektor prema modelu.","Potvrdi kvar pre zamene."],
  ["c05","Carrier E7 – EEPROM","PCB / memorija","INVERTER + ON/OFF","Proveri napajanje i servisnu proceduru konkretne serije.","Ne menjati PCB bez potvrde."],
  ["c06","Carrier Ed – faza / redosled faza","Napajanje / faze","INVERTER + ON/OFF","Kod trofaznih sistema proveri faze prema OEM proceduri.","Isključiti napajanje pre rada i koristiti odgovarajuću proceduru merenja."],
  ["c07","Carrier EE – alarm vode","Odvod / pumpa / nivo vode","INVERTER + ON/OFF","Proveri nivo vode, odvod i pumpu ako postoji.","Očisti odvod i potvrdi rad plovka/pumpe."],
  ["e01","Eskimo E2 – sobni senzor","NTC sobne temperature","INVERTER + ON/OFF","Proveri senzor i konektor prema modelu.","Zameni tek nakon potvrde senzora."],
  ["e02","Eskimo E3 – senzor cevi/isparivača","NTC isparivača","INVERTER + ON/OFF","Proveri senzor i njegov položaj na cevi/izmenjivaču.","Potvrdi kvar pre zamene."],
  ["e03","Eskimo E4 – puna voda","Kadica / plovak / odvod","ON/OFF + INVERTER","Proveri odvod i nivo vode; kod prenosnih modela isprazni donju posudu.","Otkloni uzrok punjenja vode."],
  ["froz01","Frozzini/Frozini – kod nije potvrđen po seriji","PCB / senzor / komunikacija","INVERTER + ON/OFF","Prepiši tačan model i kod sa displeja. Za Frozzini serije kodovi mogu pratiti platformu proizvođača/OEM-a, pa se ne smeju generalizovati.","Koristi servisni priručnik tačnog modela; ne menjati deo samo po generičkom kodu."],
  ["mold01","Stara Midea – Operation lampica 1×, Timer OFF","Senzor sobne temperature / NTC","ON/OFF + INVERTER","Isključi uređaj, utvrdi da je šema odgovarajuća i proveri NTC i konektor prema servisnom priručniku.","Potvrdi senzor ili ožičenje pre zamene."],
  ["mold02","Stara Midea – Operation OFF, Timer 1×","Senzor isparivača / unutrašnje cevi","ON/OFF + INVERTER","Proveri NTC na unutrašnjem izmenjivaču i konektor.","Potvrdi senzor prema konkretnom modelu."],
  ["mold03","Stara Midea – Operation OFF, Timer 2×","Komunikacija unutrašnja–spoljna","INVERTER","Proveri interkonekciju, terminale i PCB prema servisnom priručniku.","Ne menjati ploču bez potvrde komunikacione greške."],
  ["mold04","Stara Midea – Operation 2×, Timer OFF","EEPROM / unutrašnja PCB","ON/OFF + INVERTER","Proveri napajanje i servisnu proceduru konkretne serije.","Potvrdi EEPROM/PCB kvar pre zamene."],
  ["mold05","Stara Midea – Operation ON, Timer 1×","EEPROM / unutrašnja PCB","ON/OFF + INVERTER","Kod određenih starih Midea servisnih platformi ova kombinacija označava EEPROM grešku.","Koristi tačnu servisnu tabelu modela pre intervencije."],
  ["mold06","Stara Midea – Operation 2×, Timer 2×","Over-zero / upravljačka PCB","ON/OFF + INVERTER","Proveri napajanje i glavnu ploču prema servisnom priručniku.","Ne menjati delove naslepo."],
  ["mold07","Stara Midea – Operation ON, Timer 2×","EEPROM / PCB, zavisno od serije","ON/OFF + INVERTER","Prepoznaj tačan model i uporedi kombinaciju lampica sa njegovom tabelom.","Kod starih Midea lampice nisu univerzalne između svih serija."],
  ["mold08","Stara Midea – Operation OFF, Timer 2×","Komunikacija / signalizacija","INVERTER","Proveri komunikaciju i konektore prema tačnoj seriji.","Potvrdi prema OEM tabeli."],
  ["mold09","Stara Midea – Operation 1× + Timer 1×","Prekostrujna zaštita / ventilator, zavisno od serije","ON/OFF + INVERTER","Ovo je primer kombinacije iz starijih servisnih tabela; obavezno proveri konkretan model.","Ne tumačiti kombinaciju kao univerzalnu bez modela."]
];
faults.push(...extraFaults);

const extraCodes = [
  ["Galanz","C1","Greška prenosa podataka između unutrašnje i spoljne jedinice","INVERTER + ON/OFF"],
  ["Galanz","E1","Senzor temperature prostorije","INVERTER + ON/OFF"],
  ["Galanz","E2","Senzor temperature unutrašnjeg izmenjivača","INVERTER + ON/OFF"],
  ["Galanz","E4","Senzor temperature spoljnog izmenjivača","INVERTER + ON/OFF"],
  ["Galanz","H1","Kvar spoljne jedinice / dodatna dijagnostika na spoljašnjem bloku","INVERTER + ON/OFF"],
  ["Galanz","H2","Zaštita od preopterećenja / visokog pritiska kompresora","INVERTER + ON/OFF"],
  ["Galanz","H3","Zaštita od niskog pritiska kompresora","INVERTER + ON/OFF"],
  ["Galanz","P1","Zaštita od zaleđivanja unutrašnjeg bloka","INVERTER + ON/OFF"],
  ["Galanz","P2","Zaštita od pregrevanja unutrašnjeg bloka","INVERTER + ON/OFF"],
  ["Galanz","P3","Zaštita od pregrevanja spoljnog bloka u hlađenju","INVERTER + ON/OFF"],
  ["Galanz","P6","Preniska spoljašnja temperatura u grejanju","INVERTER + ON/OFF"],
  ["Galanz","P7","Zaleđivanje spoljnog izmenjivača u grejanju","INVERTER + ON/OFF"],
  ["Galanz","PS","Zaštita grejača kartera kompresora / status zaštite","INVERTER + ON/OFF"],
  ["Galanz","CF","Indikator prljavog filtera","INVERTER + ON/OFF"],
  ["Carrier","E1","Komunikaciona greška unutrašnja–spoljna, zavisno od serije","INVERTER + ON/OFF"],
  ["Carrier","E2","Senzor sobne temperature – prekid/kratak spoj","INVERTER + ON/OFF"],
  ["Carrier","E3","Senzor unutrašnjeg izmenjivača – prekid/kratak spoj","INVERTER + ON/OFF"],
  ["Carrier","E4","Senzor spoljnog izmenjivača – prekid/kratak spoj","INVERTER + ON/OFF"],
  ["Carrier","E7","Indoor EEPROM greška","INVERTER + ON/OFF"],
  ["Carrier","Ed","Gubitak faze / obrnut redosled faza kod određenih sistema","INVERTER + ON/OFF"],
  ["Carrier","EE","Alarm nivoa vode kod sistema sa pumpom","INVERTER + ON/OFF"],
  ["Eskimo","E2","Senzor sobne temperature","INVERTER + ON/OFF"],
  ["Eskimo","E3","Senzor cevi/isparivača","INVERTER + ON/OFF"],
  ["Eskimo","E4","Alarm pune vode / odvod","ON/OFF + INVERTER"],
  ["Eskimo","MODEL-SPECIFIC","E0/E1/E2/P/F kodovi zavise od konkretne Eskimo serije; proveriti OEM tabelu","INVERTER + ON/OFF"],
  ["Frozini","MODEL-SPECIFIC","Kodovi grešaka zavise od tačne Frozzini/Frozini serije i platforme; proveriti servisni priručnik","INVERTER + ON/OFF"],
  ["Midea","LED: Operation 1× / Timer OFF","Senzor sobne temperature – stara servisna tabela","ON/OFF + INVERTER"],
  ["Midea","LED: Operation OFF / Timer 1×","Senzor unutrašnjeg isparivača/cevi – stara servisna tabela","ON/OFF + INVERTER"],
  ["Midea","LED: Operation OFF / Timer 2×","Komunikaciona greška unutrašnja–spoljna – stara servisna tabela","INVERTER"],
  ["Midea","LED: Operation 2× / Timer OFF","EEPROM greška – stara servisna tabela","ON/OFF + INVERTER"],
  ["Midea","LED: Operation ON / Timer 1×","EEPROM greška – određene stare serije","ON/OFF + INVERTER"],
  ["Midea","LED: Operation 2× / Timer 2×","Over-zero signal / upravljačka PCB – određene stare serije","ON/OFF + INVERTER"],
  ["Midea","LED: Operation ON / Timer 2×","EEPROM/PCB – zavisno od stare serije","ON/OFF + INVERTER"]
];
codes.push(...extraCodes);

const seed=[
{id:"old-peca",type:"montaza",name:"Peca",phone:"",address:"",brand:"",model:"",date:"",note:"",reminder:12,photos:[],services:[],repairs:[]},
{id:"old-pedja-terasa",type:"montaza",name:"Pedja Terasa",phone:"",address:"",brand:"",model:"",date:"",note:"",reminder:12,photos:[],services:[],repairs:[]},
{id:"old-milos",type:"montaza",name:"Milos Mikulovic",phone:"",address:"",brand:"",model:"",date:"",note:"",reminder:12,photos:[],services:[],repairs:[]},
{id:"old-natasa",type:"montaza",name:"Natasa (Pedja terasa)",phone:"",address:"",brand:"",model:"",date:"",note:"",reminder:12,photos:[],services:[],repairs:[]}
];

function esc(x){return String(x??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))}
function toast(x){const t=document.getElementById("toast");t.textContent=x;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),1800)}
function req(fn){return new Promise((res,rej)=>{try{fn(res,rej)}catch(e){rej(e)}})}
async function openDB(){db=await req((res,rej)=>{const r=indexedDB.open(DB,1);r.onupgradeneeded=e=>{if(!e.target.result.objectStoreNames.contains(STORE))e.target.result.createObjectStore(STORE,{keyPath:"id"})};r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)})}
function getAll(){return req((res,rej)=>{const r=db.transaction(STORE).objectStore(STORE).getAll();r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)})}
function put(o){return req((res,rej)=>{const r=db.transaction(STORE,"readwrite").objectStore(STORE).put(o);r.onsuccess=()=>res();r.onerror=()=>rej(r.error)})}
function del(id){return req((res,rej)=>{const r=db.transaction(STORE,"readwrite").objectStore(STORE).delete(id);r.onsuccess=()=>res();r.onerror=()=>rej(r.error)})}
async function seedDB(){if((await getAll()).length===0)for(const x of seed)await put(x)}
function go(v){view=v;render();document.getElementById("backBtn").classList.toggle("hidden",v==="home")}
function layout(title,body){document.getElementById("title").textContent=title;document.getElementById("screen").innerHTML=body}
function render(){({home,customers,upcoming,faultsView,modelsView,codesView,tools,aiView,dispatcher}[view]||home)()}
function home(){layout("Klima servis",`<div class="hero"><h1>Helios Klima Servis Bobby</h1><p>Sve što ti treba na terenu — korisnici, montaže, servisi, popravke, kvarovi, šifre, fotografije i dokumentacija.</p></div><div class="grid">
<button class="tile" onclick="go('faultsView')"><div class="emoji">🔧</div><b>Kvarovi</b><span>Simptom, mogući uzrok, deo, provera i rešavanje</span></button>
<button class="tile" onclick="go('modelsView')"><div class="emoji">❄️</div><b>Modeli klime</b><span>Marka, model, INVERTER i ON/OFF</span></button>
<button class="tile" onclick="go('customers')"><div class="emoji">👥</div><b>Korisnici</b><span>Servisi, montaže, popravke, fotografije i istorija</span></button>
<button class="tile" onclick="go('upcoming')"><div class="emoji">🔔</div><b>Predstojeći servisi</b><span>Ko je sledeći na redu i koliko dana je ostalo</span></button>
<button class="tile" onclick="go('dispatcher')"><div class="emoji">📲</div><b>Ana ↔ Bobi</b><span>Novi servis, statusi i zajednički nalog</span></button>
<button class="tile" onclick="go('tools')"><div class="emoji">🧰</div><b>Servisni alat</b><span>Šifre, AI pomoćnik, backup i dokumentacija</span></button>
</div><div class="section"><div class="card"><div class="stat"><span>Kvarovi</span><b>${faults.length}</b></div><div class="stat"><span>Šifre u lokalnoj bazi</span><b>${codes.length}</b></div><div class="stat"><span>Marke</span><b>${brands.length}</b></div><div class="stat"><span>Modeli u lokalnom katalogu</span><b>${Object.values(models).flat().length}</b></div></div></div>`)}
async function upcoming(){const all=await getAll();const today=new Date();today.setHours(0,0,0,0);const rows=all.map(c=>{const next=c.reminder&&c.date?addMonths(c.date,c.reminder):"";if(!next)return null;const d=new Date(next+"T00:00:00");const days=Math.ceil((d-today)/86400000);return {...c,next,days}}).filter(Boolean).sort((a,b)=>a.days-b.days);const active=rows.filter(x=>x.days>=0),overdue=rows.filter(x=>x.days<0);layout("Predstojeći servisi",`<div class="section"><div class="card"><div class="split"><div><h2 style="margin-bottom:4px">🔔 Servisi</h2><p class="muted">30 / 14 / 7 / 1 dan pre termina možeš dodati podsetnik u iPhone Kalendar.</p></div><button class="btn small" onclick="requestNotifications()">🔔 Obaveštenja</button></div></div>${overdue.length?`<div class="card"><h3 class="dangerText">⚠️ Servis je dospeo</h3>${overdue.map(upcomingRow).join("")}</div>`:""}${active.length?`<div class="card"><h3>Predstojeći</h3>${active.map(upcomingRow).join("")}</div>`:`<div class="empty">Nema podešenih predstojećih servisa.</div>`}<div class="card"><h3>Kako rade podsetnici</h3><p class="hint">Aplikacija računa sledeći servis iz datuma poslednjeg servisa/montaže i intervala 6 ili 12 meseci. Za pouzdan alarm kada je Helios zatvoren, koristi dugme „Dodaj u Kalendar“ — iPhone Kalendar tada vodi obaveštenja.</p></div></div>`)}
function upcomingRow(c){const label=c.days<0?`kasni ${Math.abs(c.days)} dana`:c.days===0?"DANAS":c.days===1?"sutra":`za ${c.days} dana`;return `<div class="listItem"><div class="main"><span class="tag ${c.days<=7?"warn":""}">${esc(label)}</span><b>${esc(c.name)}</b><small>${esc(c.brand||"")} ${esc(c.model||"")} • termin ${esc(c.next)}</small></div><button class="btn small" onclick="addCalendarReminder('${c.id}')">📅 Kalendar</button><button class="btn small" onclick="openCustomer('${c.id}')">Otvori</button></div>`}
function requestNotifications(){if(!('Notification' in window))return toast('Ovaj uređaj/browser ne podržava web obaveštenja.');Notification.requestPermission().then(p=>{if(p==='granted'){toast('Obaveštenja su dozvoljena.');checkUpcomingAlerts(true)}else toast('Obaveštenja nisu dozvoljena.');})}
async function checkUpcomingAlerts(force=false){if(!('Notification' in window)||Notification.permission!=='granted')return;const all=await getAll(),today=new Date();today.setHours(0,0,0,0);for(const c of all){if(!c.reminder||!c.date)continue;const next=addMonths(c.date,c.reminder),d=new Date(next+"T00:00:00"),days=Math.ceil((d-today)/86400000);if(days<0||days>30)continue;const key=`helios-alert-${c.id}-${next}-${days}`;if(!force&&localStorage.getItem(key))continue;new Notification(days===0?'Helios — servis je danas':`Helios — servis za ${days} ${days===1?'dan':'dana'}`,{body:`${c.name}${c.brand?` • ${c.brand}`:""}${c.model?` ${c.model}`:""} — termin ${next}`});localStorage.setItem(key,'1')}}
function icsEscape(s){return String(s||"").replace(/\\/g,"\\\\").replace(/;/g,"\\;").replace(/,/g,"\\,").replace(/\n/g,"\\n")}
function addCalendarReminder(id){getAll().then(all=>{const c=all.find(x=>x.id===id);if(!c)return;const d=c.reminder&&c.date?addMonths(c.date,c.reminder):"";if(!d)return;const y=d.slice(0,4),m=d.slice(5,7),day=d.slice(8,10),dt=`${y}${m}${day}T090000`;const uid=`helios-${c.id}-${d}@helios`;const ics=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Helios Klima Servis//SR","CALSCALE:GREGORIAN","BEGIN:VEVENT",`UID:${uid}`,`DTSTAMP:${new Date().toISOString().replace(/[-:]/g,"").replace(/\.\d{3}Z$/,"Z")}`,`DTSTART:${dt}`,`DTEND:${y}${m}${day}T093000`,`SUMMARY:Helios servis — ${icsEscape(c.name)}`,`DESCRIPTION:${icsEscape(`Servis klime${c.brand?` ${c.brand}`:""}${c.model?` ${c.model}`:""}. Adresa: ${c.address||""}`)}`,"BEGIN:VALARM","TRIGGER:-P30D","ACTION:DISPLAY","DESCRIPTION:Helios servis za 30 dana","END:VALARM","BEGIN:VALARM","TRIGGER:-P14D","ACTION:DISPLAY","DESCRIPTION:Helios servis za 14 dana","END:VALARM","BEGIN:VALARM","TRIGGER:-P7D","ACTION:DISPLAY","DESCRIPTION:Helios servis za 7 dana","END:VALARM","BEGIN:VALARM","TRIGGER:-P1D","ACTION:DISPLAY","DESCRIPTION:Helios servis sutra","END:VALARM","END:VEVENT","END:VCALENDAR"].join("\r\n");const blob=new Blob([ics],{type:"text/calendar;charset=utf-8"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=`Helios_Servis_${(c.name||"korisnik").replace(/[^a-z0-9]+/gi,"_")}_${d}.ics`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1500);toast("Kalendar fajl je napravljen — otvori ga na iPhone-u i dodaj u Kalendar.")})}
function brandOpts(sel=""){return `<option value="">Izaberi marku</option>`+brands.map(b=>`<option value="${esc(b)}" ${b===sel?"selected":""}>${esc(b)}</option>`).join("")}
function modelOpts(brand,sel=""){let a=models[brand]||[];return `<option value="">${a.length?"Izaberi model":"Model nije u lokalnom katalogu"}</option>`+a.map(m=>`<option ${m===sel?"selected":""}>${esc(m)}</option>`).join("")}
function typeTag(c){return `<span class="tag ${c==="onoff"?"warn":""}">${c==="servis"?"SERVIS":c==="montaza"?"MONTAŽA":"POPRAVKA"}</span>`}
async function customers(){const all=await getAll();layout("Korisnici",`<div class="section"><div class="row"><button class="btn primary" onclick="newCustomer('servis')">+ Novi servis</button><button class="btn" onclick="newCustomer('montaza')">+ Nova montaža</button><button class="btn" onclick="newRepair()">+ Popravka</button></div><input id="userSearch" class="search" placeholder="Pretraži korisnika, telefon, adresu, marku ili model..." value="${esc(customerFilter)}" oninput="customerFilter=this.value;drawCustomerList()" style="margin-top:12px"><div id="customerList"></div></div>`);drawCustomerList(all)}
async function drawCustomerList(prefetched){let all=prefetched||await getAll(),q=(customerFilter||"").toLowerCase();all=all.filter(c=>(c.name+" "+c.phone+" "+c.address+" "+c.brand+" "+c.model).toLowerCase().includes(q));const el=document.getElementById("customerList");el.innerHTML=all.length?`<div class="list">${all.map(c=>`<div class="listItem"><div class="main" onclick="openCustomer('${c.id}')">${typeTag(c.type)}<b>${esc(c.name)}</b><small>${esc(c.phone||"")} ${c.brand?" • "+esc(c.brand):""} ${c.model?" • "+esc(c.model):""}</small></div><button class="btn small" onclick="openCustomer('${c.id}')">Otvori</button></div>`).join("")}</div>`:`<div class="empty">Nema korisnika koji odgovara pretrazi.</div>`}
async function newCustomer(type,id){let c=id?(await getAll()).find(x=>x.id===id):{id:"",type,name:"",phone:"",address:"",brand:"",model:"",date:"",note:"",reminder:12,photos:[],services:[],repairs:[]};editingId=id||null;layout(type==="servis"?"Novi servis":"Nova montaža",customerFormHTML(c,type))}
function customerFormHTML(c,type){return `<div class="section"><div class="card"><h2>${c.id?"Izmena":"Novi "+(type==="servis"?"servis":"montaža")}</h2>
<div class="field"><label>Ime i prezime klijenta</label><input id="f_name" value="${esc(c.name)}"></div>
<div class="two"><div class="field"><label>Telefon</label><input id="f_phone" inputmode="tel" value="${esc(c.phone)}"></div><div class="field"><label>Datum</label><input id="f_date" type="date" value="${esc(c.date)}"></div></div>
<div class="field"><label>Adresa</label><input id="f_address" value="${esc(c.address)}"></div>
<div class="two"><div class="field"><label>Marka klime</label><select id="f_brand" onchange="updateFormModel()">${brandOpts(c.brand)}</select></div><div class="field"><label>Model klime</label><select id="f_model">${modelOpts(c.brand,c.model)}</select></div></div>
<div class="field"><label>Podsetnik za sledeći servis</label><select id="f_rem"><option value="0">Bez podsetnika</option><option value="6" ${c.reminder==6?"selected":""}>6 meseci</option><option value="12" ${c.reminder==12?"selected":""}>12 meseci</option></select></div>
<div class="field"><label>Napomena</label><textarea id="f_note">${esc(c.note)}</textarea></div>
${type==="montaza"?photoSection(c.photos||[]):""}
<div class="row"><button class="btn" onclick="go('customers')">Otkaži</button><button class="btn primary" onclick="saveCustomer('${type}','${c.id||""}')">Sačuvaj</button></div></div></div>`}
function updateFormModel(){document.getElementById("f_model").innerHTML=modelOpts(document.getElementById("f_brand").value)}
function photoSection(photos){return `<div class="field"><label>Fotografije montaže</label><div class="row"><label class="fileLabel">🖼️ Galerija<input id="f_gallery" type="file" accept="image/*" multiple onchange="previewPhotos(this.files)"></label><label class="fileLabel">📷 Kamera<input id="f_camera" type="file" accept="image/*" capture="environment" multiple onchange="previewPhotos(this.files)"></label></div><div id="photoPreview" class="thumbs">${(photos||[]).map((p,i)=>`<div class="thumb"><img src="${p}"><button onclick="removeFormPhoto(${i})">×</button></div>`).join("")}</div><div class="photoNote">Možeš izabrati postojeće fotografije iz galerije ili odmah napraviti nove kamerom. Slike se čuvaju uz korisnika.</div></div>`}
let formPhotos=[];
async function previewPhotos(files){for(const f of [...files])formPhotos.push(await resizeImage(f));const el=document.getElementById("photoPreview");el.innerHTML=formPhotos.map((p,i)=>`<div class="thumb"><img src="${p}"><button onclick="removeFormPhoto(${i})">×</button></div>`).join("")}
function removeFormPhoto(i){formPhotos.splice(i,1);document.getElementById("photoPreview").innerHTML=formPhotos.map((p,j)=>`<div class="thumb"><img src="${p}"><button onclick="removeFormPhoto(${j})">×</button></div>`).join("")}
function resizeImage(file){return new Promise(res=>{const r=new FileReader();r.onload=()=>{const im=new Image();im.onload=()=>{const max=1280,scale=Math.min(1,max/Math.max(im.width,im.height)),c=document.createElement("canvas");c.width=Math.round(im.width*scale);c.height=Math.round(im.height*scale);c.getContext("2d").drawImage(im,0,0,c.width,c.height);res(c.toDataURL("image/jpeg",.78))};im.src=r.result};r.readAsDataURL(file)})}
async function saveCustomer(type,id){const all=await getAll(),old=id?all.find(x=>x.id===id):null;const c={id:id||crypto.randomUUID(),type,name:document.getElementById("f_name").value.trim(),phone:document.getElementById("f_phone").value.trim(),address:document.getElementById("f_address").value.trim(),brand:document.getElementById("f_brand").value,model:document.getElementById("f_model").value,date:document.getElementById("f_date").value,note:document.getElementById("f_note").value.trim(),reminder:Number(document.getElementById("f_rem").value),photos:formPhotos.length?formPhotos:(old?.photos||[]),services:old?.services||[],repairs:old?.repairs||[]};if(!c.name)return toast("Unesi ime i prezime");await put(c);formPhotos=[];toast("Sačuvano");go('customers')}
async function openCustomer(id){const c=(await getAll()).find(x=>x.id===id);if(!c)return;const next=c.reminder&&c.date?addMonths(c.date,c.reminder):"";layout("Kartica korisnika",`<div class="section"><div class="card"><div class="split">${typeTag(c.type)}<button class="btn small" onclick="newCustomer('${c.type}','${c.id}')">Izmeni</button></div><h2>${esc(c.name)}</h2><p>📞 ${c.phone?`<a href="tel:${esc(c.phone)}" style="color:#8dd7ff">${esc(c.phone)}</a>`:"—"}</p><p>📍 ${c.address?`<a target="_blank" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.address)}" style="color:#8dd7ff">${esc(c.address)}</a>`:"—"}</p><p>❄️ ${esc(c.brand||"")} ${esc(c.model||"")}</p><p>📅 ${esc(c.date||"—")}</p><p>🔔 Sledeći servis: ${next?esc(next):"nije podešen"}</p><p>${esc(c.note||"")}</p>
${c.photos?.length?`<h3>Fotografije montaže</h3><div class="thumbs">${c.photos.map(p=>`<div class="thumb"><img src="${p}"></div>`).join("")}</div>`:""}
<div class="row" style="margin-top:12px"><button class="btn primary" onclick="addService('${c.id}')">+ Servis</button><button class="btn" onclick="addRepair('${c.id}')">+ Popravka</button></div></div>
${historyCard(c)}</div>`)}
function historyCard(c){const services=c.services||[],repairs=c.repairs||[];return `<div class="card"><h3>Istorija</h3>${services.length?services.map((s,i)=>`<div class="listItem"><div class="main"><span class="tag">SERVIS</span><b>${esc(s.date||"")}</b><small>${esc(s.note||"")} ${s.amount?` • ${esc(s.amount)} RSD`:""}</small></div></div>`).join(""):""}${repairs.length?repairs.map(r=>`<div class="listItem"><div class="main"><span class="tag">POPRAVKA</span><b>${esc(r.date||"")}</b><small>${esc(r.part||"")} ${r.amount?` • ${esc(r.amount)} RSD`:""}</small></div><button class="btn small" onclick="repairDetail('${c.id}','${r.id}')">Dokaz</button></div>`).join(""):""}${!services.length&&!repairs.length?`<div class="empty">Još nema istorije.</div>`:""}</div>`}
async function addService(cid){const c=(await getAll()).find(x=>x.id===cid);openModal("Novi servis",`<div class="field"><label>Datum</label><input id="m_date" type="date"></div><div class="field"><label>Napomena / šta je urađeno</label><textarea id="m_note"></textarea></div><div class="field"><label>Iznos (RSD)</label><input id="m_amount" inputmode="decimal"></div><button class="btn primary" onclick="saveService('${cid}')">Sačuvaj servis</button>`)}
async function saveService(cid){const all=await getAll(),c=all.find(x=>x.id===cid);c.services=c.services||[];c.services.push({id:crypto.randomUUID(),date:document.getElementById("m_date").value,note:document.getElementById("m_note").value,amount:document.getElementById("m_amount").value});await put(c);closeModal();toast("Servis dodat");openCustomer(cid)}
function newRepair(){layout("Nova popravka",repairFormHTML(""))}
function repairFormHTML(cid){return `<div class="section"><div class="card"><h2>Popravka</h2><div class="field"><label>Pretraži postojećeg klijenta</label><input id="r_search" class="search" placeholder="Ime, telefon, adresa..." oninput="findRepairClients()" value=""></div><div id="r_clients"></div><div class="field"><label>Ime i prezime klijenta</label><input id="r_name"></div><div class="field"><label>Datum</label><input id="r_date" type="date"></div><div class="field"><label>Zamenjeni deo / izvršena popravka</label><input id="r_part" placeholder="npr. motor turbine, kondenzator, PCB..."></div><div class="field"><label>Koliko je naplaćeno (RSD)</label><input id="r_amount" inputmode="decimal"></div><div class="field"><label>Napomena</label><textarea id="r_note" placeholder="Šta je menjano, razlog, napomena..."></textarea></div><div class="field"><label>Fotografija zamenjenog dela</label><div class="row"><label class="fileLabel">🖼️ Galerija<input id="r_gallery" type="file" accept="image/*" onchange="loadRepairPhoto(this.files[0])"></label><label class="fileLabel">📷 Kamera<input id="r_camera" type="file" accept="image/*" capture="environment" onchange="loadRepairPhoto(this.files[0])"></label></div><div id="r_preview" class="thumbs"></div></div><div class="row"><button class="btn" onclick="go('customers')">Otkaži</button><button class="btn primary" onclick="saveRepairFromForm()">Sačuvaj popravku</button></div></div></div>`}
async function findRepairClients(){const q=document.getElementById("r_search").value.toLowerCase(),a=(await getAll()).filter(c=>(c.name+" "+c.phone+" "+c.address).toLowerCase().includes(q));document.getElementById("r_clients").innerHTML=q&&a.length?`<div class="list">${a.slice(0,6).map(c=>`<div class="listItem" onclick="chooseRepairClient('${c.id}')"><div class="main"><b>${esc(c.name)}</b><small>${esc(c.phone||"")} ${esc(c.address||"")}</small></div></div>`).join("")}</div>`:""}
let repairPhoto="";
async function loadRepairPhoto(f){if(!f)return;repairPhoto=await resizeImage(f);document.getElementById("r_preview").innerHTML=`<div class="thumb"><img src="${repairPhoto}"></div>`}
let chosenRepairClient="";
async function chooseRepairClient(id){chosenRepairClient=id;const c=(await getAll()).find(x=>x.id===id);document.getElementById("r_name").value=c.name;document.getElementById("r_search").value=c.name;document.getElementById("r_clients").innerHTML=`<span class="tag ok">Izabran klijent: ${esc(c.name)}</span>`}
async function saveRepairFromForm(){let id=chosenRepairClient;const name=document.getElementById("r_name").value.trim();const all=await getAll();let c=id?all.find(x=>x.id===id):all.find(x=>x.name.toLowerCase()===name.toLowerCase());if(!c){if(!name)return toast("Unesi ime klijenta");c={id:crypto.randomUUID(),type:"popravka",name,phone:"",address:"",brand:"",model:"",date:"",note:"",reminder:12,photos:[],services:[],repairs:[]}}c.repairs=c.repairs||[];c.repairs.push({id:crypto.randomUUID(),date:document.getElementById("r_date").value,part:document.getElementById("r_part").value,amount:document.getElementById("r_amount").value,note:document.getElementById("r_note").value,photo:repairPhoto});await put(c);repairPhoto="";chosenRepairClient="";toast("Popravka sačuvana");openCustomer(c.id)}
async function addRepair(cid){const c=(await getAll()).find(x=>x.id===cid);openModal("Popravka za "+c.name,`<div class="field"><label>Datum</label><input id="m_rdate" type="date"></div><div class="field"><label>Zamenjeni deo</label><input id="m_rpart"></div><div class="field"><label>Naplaćeno (RSD)</label><input id="m_ramount" inputmode="decimal"></div><div class="field"><label>Napomena</label><textarea id="m_rnote"></textarea></div><div class="field"><label>Slika zamenjenog dela</label><div class="row"><label class="fileLabel">🖼️ Galerija<input id="m_r_gallery" type="file" accept="image/*" onchange="loadModalRepairPhoto(this.files[0])"></label><label class="fileLabel">📷 Kamera<input id="m_r_camera" type="file" accept="image/*" capture="environment" onchange="loadModalRepairPhoto(this.files[0])"></label></div><div id="m_rpreview" class="thumbs"></div></div><button class="btn primary" onclick="saveRepairModal('${cid}')">Sačuvaj popravku</button>`)}
let modalRepairPhoto="";
async function loadModalRepairPhoto(f){if(!f)return;modalRepairPhoto=await resizeImage(f);document.getElementById("m_rpreview").innerHTML=`<div class="thumb"><img src="${modalRepairPhoto}"></div>`}
async function saveRepairModal(cid){const c=(await getAll()).find(x=>x.id===cid);c.repairs=c.repairs||[];c.repairs.push({id:crypto.randomUUID(),date:document.getElementById("m_rdate").value,part:document.getElementById("m_rpart").value,amount:document.getElementById("m_ramount").value,note:document.getElementById("m_rnote").value,photo:modalRepairPhoto});await put(c);modalRepairPhoto="";closeModal();toast("Popravka sačuvana");openCustomer(cid)}
async function repairDetail(cid,rid){const c=(await getAll()).find(x=>x.id===cid),r=c.repairs.find(x=>x.id===rid);openModal("Dokumentacija popravke",`<div class="card"><div class="stat"><span>Klijent</span><b>${esc(c.name)}</b></div><div class="stat"><span>Datum</span><b>${esc(r.date||"")}</b></div><div class="stat"><span>Deo</span><b>${esc(r.part||"")}</b></div><div class="stat"><span>Naplaćeno</span><b class="money">${esc(r.amount||"0")} RSD</b></div><p>${esc(r.note||"")}</p>${r.photo?`<div class="thumbs"><div class="thumb"><img src="${r.photo}"></div></div>`:"<p class='hint'>Nema slike zamenjenog dela.</p>"}</div>`)}
function faultsView(){layout("Kvarovi",`<div class="section"><div class="tabs"><button class="btn tab" onclick="faultType='all';drawFaults()">Svi</button><button class="btn tab" onclick="faultType='inverter';drawFaults()">INVERTER</button><button class="btn tab" onclick="faultType='onoff';drawFaults()">ON/OFF</button></div><input id="faultSearch" class="search" placeholder="npr. ne hladi, ventilator, voda, kompresor..." oninput="drawFaults()"><div id="faultList"></div></div>`);drawFaults()}
let faultType="all";
function drawFaults(){let q=(document.getElementById("faultSearch")?.value||"").toLowerCase();let a=faults.filter(f=>(faultType==="all"||f[3].toLowerCase().includes(faultType==="onoff"?"on/off":"inverter"))&&(f.join(" ").toLowerCase().includes(q)));document.getElementById("faultList").innerHTML=a.map(f=>`<div class="card"><div class="split"><div>${f[3].includes("ON/OFF")?`<span class="tag warn">ON/OFF</span>`:""}<span class="tag">${esc(f[3])}</span></div><button class="btn small" onclick="faultDetail('${f[0]}')">Detalji</button></div><h3>${esc(f[1])}</h3><p class="muted">Deo: ${esc(f[2])}</p></div>`).join("")||`<div class="empty">Nema rezultata.</div>`}
function faultDetail(id){const f=faults.find(x=>x[0]===id);openModal("Dijagnostika",`<span class="tag">${esc(f[3])}</span><h2>${esc(f[1])}</h2><p><b>Potencijalni deo:</b> ${esc(f[2])}</p><div class="result"><h4>Kako testirati</h4><p>${esc(f[4])}</p></div><div class="result"><h4>Kako rešavati</h4><p>${esc(f[5])}</p></div><div class="visual">${testSvg(f[0])}<p class="hint">Ilustracija je edukativna; za konkretne pinove, otpore, pritiske i električna merenja koristi servisni priručnik konkretnog modela.</p></div>`)}
function testSvg(id){return `<svg viewBox="0 0 700 190" xmlns="http://www.w3.org/2000/svg"><rect x="18" y="35" width="190" height="120" rx="12" fill="#0d3047" stroke="#5abcf0"/><text x="35" y="67" fill="#fff" font-size="20">Unutrašnja</text><text x="35" y="95" fill="#fff" font-size="20">jedinica</text><line x1="210" y1="95" x2="335" y2="95" stroke="#6ed0ff" stroke-width="5"/><rect x="335" y="45" width="150" height="100" rx="12" fill="#183a52" stroke="#5abcf0"/><text x="360" y="82" fill="#fff" font-size="18">Merenje /</text><text x="360" y="108" fill="#fff" font-size="18">kontrola</text><line x1="485" y1="95" x2="625" y2="95" stroke="#6ed0ff" stroke-width="5"/><circle cx="625" cy="95" r="28" fill="#173d2d" stroke="#74e0a6" stroke-width="3"/><text x="607" y="101" fill="#fff" font-size="14">OK?</text></svg>`}
function modelsView(){layout("Modeli klime",`<div class="section"><input id="modelSearch" class="search" placeholder="Pretraži marku ili model..." oninput="drawModels()"><div id="modelList"></div></div>`);drawModels()}
function drawModels(){const q=(document.getElementById("modelSearch")?.value||"").toLowerCase();let out=[];for(const b of Object.keys(models))for(const m of models[b])if((b+" "+m).toLowerCase().includes(q))out.push(`<div class="listItem"><div class="main"><b>${esc(b)}</b><small>${esc(m)}</small></div><span class="tag">${/ON\/OFF/i.test(m)?"ON/OFF":"INVERTER"}</span></div>`);document.getElementById("modelList").innerHTML=out.length?`<div class="list">${out.join("")}</div>`:`<div class="empty">Nema rezultata.</div>`}
function codesView(){layout("Šifre kvarova",`<div class="section"><div class="tabs"><button class="btn tab" onclick="codeType='all';drawCodes()">Svi</button><button class="btn tab" onclick="codeType='onoff';drawCodes()">ON/OFF</button><button class="btn tab" onclick="codeType='inverter';drawCodes()">INVERTER</button></div><input id="codeSearch" class="search" placeholder="Kod, marka, značenje..." oninput="drawCodes()"><div id="codeList"></div></div>`);drawCodes()}
let codeType="all";
function drawCodes(){let q=(document.getElementById("codeSearch")?.value||"").toLowerCase(),a=codes.filter(c=>(codeType==="all"||c[3].toLowerCase().includes(codeType==="onoff"?"on/off":"inverter"))&&c.join(" ").toLowerCase().includes(q));document.getElementById("codeList").innerHTML=a.map(c=>`<div class="card"><span class="code">${esc(c[1])}</span> <span class="tag">${esc(c[3])}</span><h3>${esc(c[0])}</h3><p class="muted">${esc(c[2])}</p></div>`).join("")||`<div class="empty">Nema rezultata.</div>`}
function tools(){layout("Servisni alat",`<div class="grid"><button class="tile" onclick="go('codesView')"><div class="emoji">⚠️</div><b>Šifre kvarova</b><span>Pretraga po kodu, marki i tipu</span></button><button class="tile" onclick="go('aiView')"><div class="emoji">🤖</div><b>AI pomoćnik</b><span>Simptom + model + kod + merenja</span></button></div><div class="card"><h3>Backup / Restore</h3><p class="hint">Backup čuva korisnike, istoriju, montažne fotografije i fotografije zamenjenih delova. Uvoz radi MERGE, ne briše postojeću bazu.</p><div class="row"><button class="btn primary" onclick="exportBackup()">Izvezi backup</button><label class="fileLabel" style="text-align:center">Uvezi backup<input type="file" accept=".json,application/json" hidden onchange="importBackup(this.files[0])"></label></div></div><div class="card"><h3>Važno za teren</h3><div class="check">Kod invertera ne tretirati izlaze prema kompresoru kao običnih 230 V.</div><div class="check">Za tačne fabričke otpore, pritiske, pinove i kodove koristi servisni priručnik konkretnog modela.</div><div class="check">Fotografije montaže i popravke ostaju uz klijenta kao dokumentacija.</div></div>`)}
function aiView(){layout("AI pomoćnik",`<div class="section"><div class="card"><h2>AI pomoćnik</h2><p class="muted">Unesi što više podataka sa terena. Lokalni pomoćnik daje početnu trijažu; ne izmišlja fabričke vrednosti.</p><div class="field"><label>Marka</label><select id="aiBrand">${brandOpts()}</select></div><div class="field"><label>Model</label><input id="aiModel" placeholder="Tačan model"></div><div class="field"><label>Tip</label><select id="aiType"><option>INVERTER</option><option>ON/OFF</option></select></div><div class="field"><label>Simptom</label><textarea id="aiSym" placeholder="npr. ne hladi, spoljna ne startuje..."></textarea></div><div class="field"><label>Kod greške</label><input id="aiCode" placeholder="npr. E6"></div><div class="field"><label>Izmereno / zapaženo</label><textarea id="aiMeasure" placeholder="npr. ventilator radi, kompresor ne startuje..."></textarea></div><button class="btn primary" onclick="runAI()">Analiziraj</button><div id="aiResult"></div></div></div>`)}
function runAI(){const s=(document.getElementById("aiSym").value+" "+document.getElementById("aiCode").value+" "+document.getElementById("aiMeasure").value).toLowerCase();const a=faults.filter(f=>f.join(" ").toLowerCase().split(/\s+/).some(w=>w.length>4&&s.includes(w))).slice(0,5);document.getElementById("aiResult").innerHTML=`<div class="result"><h4>Početna trijaža</h4>${a.length?a.map(f=>`<div class="check"><div><b>${esc(f[1])}</b><br><span class="muted">${esc(f[2])}</span><br><span class="hint">${esc(f[4])}</span></div></div>`).join(""):`<p class="muted">Nema dovoljno podataka. Dodaj tačan model, simptom, kod i šta si izmerio.</p>`}<p class="hint">Za preciznu fabričku dijagnostiku potrebni su OEM servisni podaci konkretnog modela.</p></div>`}
function addMonths(date,n){const d=new Date(date+"T12:00:00");d.setMonth(d.getMonth()+n);return d.toISOString().slice(0,10)}
function openModal(title,body){const m=document.getElementById("modal");m.classList.remove("hidden");m.innerHTML=`<div class="modalBox"><div class="modalHead"><h2>${esc(title)}</h2><button class="close" onclick="closeModal()">×</button></div>${body}</div>`}
function closeModal(){document.getElementById("modal").classList.add("hidden");document.getElementById("modal").innerHTML=""}
async function exportBackup(){const data={version:3,app:"Helios Klima Servis Bobby",exportedAt:new Date().toISOString(),customers:await getAll()};const b=new Blob([JSON.stringify(data)],{type:"application/json"}),a=document.createElement("a");a.href=URL.createObjectURL(b);a.download="Helios_Backup_"+new Date().toISOString().slice(0,10)+".json";a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)}
async function importBackup(file){if(!file)return;try{const d=JSON.parse(await file.text()),incoming=d.customers||d.data?.customers||[];let n=0;for(const x of incoming){const id=x.id||crypto.randomUUID(),old=(await getAll()).find(y=>y.id===id);await put({...old,...x,id,photos:x.photos||old?.photos||[],services:x.services||old?.services||[],repairs:x.repairs||old?.repairs||[]});n++}toast("Uvezeno: "+n+" zapisa")}catch(e){toast("Backup nije ispravan")}}
window.addEventListener("error",e=>{console.error(e.error||e.message);const el=document.getElementById("screen");if(el&&!el.dataset.booted)el.innerHTML=`<div class="section"><div class="card"><h2>Greška pri pokretanju</h2><p>${esc(e.message||"Nepoznata greška")}</p><p class="hint">Ako se ovo pojavi nakon ažuriranja, zatvori aplikaciju potpuno i otvori je ponovo. Nova verzija koristi novi cache.</p></div></div>`});
window.addEventListener("unhandledrejection",e=>{console.error(e.reason)});
document.getElementById("homeBtn").onclick=()=>go("home");document.getElementById("backBtn").onclick=()=>go("home");
window.go=go;window.heliosGetAll=getAll;window.heliosPut=put;window.heliosNewCustomerFromCloud=async function(job){const all=await getAll();const existing=all.find(x=>x.cloudJobId===job.id);const c={id:existing?.id||crypto.randomUUID(),cloudJobId:job.id,type:"servis",name:job.name||"",phone:job.phone||"",address:job.address||"",brand:job.brand||"",model:job.model||"",date:(job.scheduled_date||job.created_at||"").slice(0,10),note:[job.symptom,job.note].filter(Boolean).join(" — "),reminder:12,photos:job.photo?[job.photo]:[],services:existing?.services||[],repairs:existing?.repairs||[]};await put(c);return c};window.go=go;window.newCustomer=newCustomer;window.updateFormModel=updateFormModel;window.previewPhotos=previewPhotos;window.removeFormPhoto=removeFormPhoto;window.saveCustomer=saveCustomer;window.openCustomer=openCustomer;window.addService=addService;window.saveService=saveService;window.newRepair=newRepair;window.findRepairClients=findRepairClients;window.chooseRepairClient=chooseRepairClient;window.loadRepairPhoto=loadRepairPhoto;window.saveRepairFromForm=saveRepairFromForm;window.addRepair=addRepair;window.loadModalRepairPhoto=loadModalRepairPhoto;window.saveRepairModal=saveRepairModal;window.repairDetail=repairDetail;window.faultDetail=faultDetail;window.drawFaults=drawFaults;window.drawModels=drawModels;window.drawCodes=drawCodes;window.runAI=runAI;window.openModal=openModal;window.closeModal=closeModal;window.exportBackup=exportBackup;window.importBackup=importBackup;
(async()=>{try{await openDB();await seedDB();document.getElementById("screen").dataset.booted="1";go("home");setTimeout(()=>checkUpcomingAlerts(false),1200)}catch(e){console.error("Helios boot error:",e);document.getElementById("screen").innerHTML=`<div class="section"><div class="card"><h2>Greška pri pokretanju</h2><p>${esc(e.message||e)}</p><p class="hint">Proveri da li je aplikacija otvorena u Safari-ju i da li je prethodna verzija potpuno zatvorena.</p></div></div>`}})();
})();

# Helios Klima Servis Bobby — GitHub Pages + Ana/Bobi

Ovo je statička PWA za GitHub Pages. Lokalni korisnici/servisi/montaže/popravke rade preko IndexedDB. Modul **Ana ↔ Bobi** koristi Supabase samo za zajedničke servisne naloge.

## 1) GitHub Pages
Uploaduj sve fajlove iz ovog foldera u public GitHub repository. Settings → Pages → Deploy from branch → main → /(root).

## 2) Supabase za Ana ↔ Bobi
1. Napravi besplatan Supabase projekat.
2. Otvori SQL Editor i pokreni `supabase.sql`.
3. U Authentication → Providers → Email podesi način potvrde emaila koji želiš; za najjednostavniji interni rad možeš isključiti email confirmation ako ti odgovara.
4. U Helios-u otvori **Ana ↔ Bobi → Cloud podešavanje** i unesi Project URL + **anon/public** key. Nikad ne unositi service_role key.
5. Napravi dva naloga: jedan za Anu i jedan za Bobija. Oboje koriste isti tim kod, npr. `HELIOS-BOBI-ANA`.

## Funkcije
- Ana: novi servis, telefon, adresa, mapa link, marka/model, simptom, napomena, fotografija.
- Bobi: novi servisi, statusi Preuzeto / Na terenu / Završeno, import u Korisnike.
- Status se proverava automatski na 10 sekundi.
- Lokalna Helios baza ostaje odvojena i radi offline.
- Supabase koristi RLS i tim kod; service-role ključ nije potreban.


## Predstojeći servisi i iPhone podsetnici
- Na početnom ekranu postoji **Predstojeći servisi**.
- Za svakog korisnika se računa sledeći servis iz datuma poslednjeg servisa/montaže i intervala 6 ili 12 meseci.
- Lista pokazuje koliko dana je ostalo ili da je servis dospeo.
- Dugme **Kalendar** pravi `.ics` događaj sa alarmima 30, 14, 7 i 1 dan pre termina. Na iPhone-u se taj fajl otvara i dodaje u Apple Kalendar.
- Dugme **Obaveštenja** traži dozvolu za web obaveštenja. Ako je dozvola uključena, Helios može prikazati upozorenje kada se aplikacija otvori i servis ulazi u narednih 30 dana.
- Za obaveštenje koje mora da stigne i kada aplikacija nikada nije otvorena, treba naknadno povezati pravi Web Push servis/backend. To nije isto što i obična browser `Notification` dozvola.

### Podešavanje na Bobijevom i Aninom iPhone-u
1. Otvoriti Helios preko GitHub Pages HTTPS adrese u Safari-ju.
2. Izabrati **Share → Add to Home Screen** i pokrenuti Helios sa nove ikone.
3. U Helios-u otvoriti **Predstojeći servisi → Obaveštenja → Allow**.
4. Za pouzdan alarm za konkretan termin otvoriti **Kalendar** pored korisnika i dodati `.ics` događaj u iPhone Kalendar.
5. Isto uraditi na Aninom iPhone-u ako želi da i ona dobija iste podsetnike.

Napomena: lokalna baza korisnika je na svakom telefonu odvojena. Zajednički Ana ↔ Bobi servisni nalozi idu preko Supabase-a, ali podsetnik u Apple Kalendaru se dodaje na uređaju na kojem je kalendar fajl otvoren.

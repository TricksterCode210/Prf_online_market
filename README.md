# Prf_online_market

## Dinnyés Dávid (NIV5AJ)

Online piactér

Feladat kiírás
---------------
Szerepkörök: eladók, vevők és vendégek.
Csak a regisztrált felhasználók lehetnek eladók vagy vevők. A vendég felhasználók böngészhetik, milyen használt termékek érhetők el és megtekinthetik azok árait, de vásárlást nem kezdeményezhetnek. Az eladók feltölthetik használt termékeiket, de természetesen nem vásárolhatják meg a saját feltöltött termékeiket. Ha egy használt termék eladásra kerül, az inaktívvá válik a piactéren. Az eladók listázhatják, hogy melyik terméket milyen összegért sikerült értékesíteni, a vevők pedig láthatják korábbi vásárlásaikat.



Két feladatkör van, de van egy plusz admin, aki mindenre képes a felületen tesztelés szempontjából. Az eredeti két szerepkör az az eladó és a vásárló.
Van az adatbázis indulásakor 1 vásárló és 2 eladó (1 admin, de az csak tesztelésre).

Bejelentkezési adatok:
| Felhasználónév | Jelszó |
|----------------|--------|
| test_admin     | teszt  |
| test_vasarlo   | teszt  |
| test_elado1    | teszt  |
| test_elado2    | teszt  |

Adatbázis indítás
1. Terminálban navigálunk a databasere `cd database`
2. Felépítjük a dockeres környezetet `docker compose up -d`
3. Adatbázis feltöltésére pedig használjuk ezt `docker exec online_market mongorestore --username root --password password --authenticationDatabase admin --dir /dump`
4. (Opcionális) Ha leállítanánk a dockert, akkor `docker compose down`

Backend indítás
1. Terminálban navigálunk a backendre `cd backend`
2. Letöltjük a szükséges függőségeket `npm install`
3. Felépítjük a környezetet `npm run build`
4. Elindítjuk a backendet `npm run start`

Frontend indítás
1. Terminálban elnavigálunk a frontendre `cd frontend`
2. Letöltjük a szükséges függőségeket `npm install`
3. Futtatjuk a környezetet `npm run start`

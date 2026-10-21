# Gang Długołęka — strona statyczna

Responsywna, jednoplikowa w działaniu wizytówka klubu. Nie wymaga kompilacji, backendu ani zależności. Wszystkie ścieżki są względne, więc strona działa także z podkatalogu (np. GitHub Pages).

## Uruchomienie

W katalogu projektu uruchom prosty serwer HTTP:

```bash
python3 -m http.server 8000
```

Następnie otwórz `http://localhost:8000`. Samo otwarcie `index.html` również zadziała, ale serwer HTTP lepiej odzwierciedla hosting docelowy.

## Pliki

- `index.html` — treść, sekcje, metadane i linki.
- `styles.css` — tokeny wizualne, układ i responsywność.
- `script.js` — menu mobilne, lightbox galerii i animacje.
- `assets/images/` — zdjęcia przekazane przez właściciela i lokalne placeholdery SVG.

## Podmiana materiałów

Zdjęcia motocykli przekazane przez właściciela zostały zapisane lokalnie jako zoptymalizowane pliki JPEG. Strona nie publikuje obecnie zdjęć przedstawiających ludzi. Pozostałe placeholdery są celowo oznaczone jako demonstracyjne. W `index.html` miejsca do edycji są oznaczone komentarzami `PODMIANA`, `PODMIANA PARTNERÓW` i `KONTAKT`.

1. Umieść zoptymalizowane zdjęcia WebP/AVIF w `assets/images/`.
2. Zmień odpowiednie `src`, `href`, `width`, `height` i teksty `alt` w `index.html`.
3. Dla galerii ten sam większy plik lub jego wariant podaj w `href`.
4. Hero powinno mieć co najmniej ok. 1920 × 1200 px i nie powinno być ładowane leniwie. Pozostałe zdjęcia zachowują `loading="lazy"`.
5. Po otrzymaniu finalnego zdjęcia social preview zastąp `social-preview.svg`. Bezwzględny adres `og:image`, `og:url` i canonical należy dodać dopiero po ustaleniu domeny.

Potwierdzone nazwy partnerów wpisuje się w jednym miejscu: tablicy `partnerNames` na początku `script.js`. Dopóki wartości mają postać `null`, strona pokazuje neutralne etykiety zapisane w HTML i działa tak samo bez JavaScriptu.

## Dane wymagające uzupełnienia przed publikacją

- zdjęcie samochodu z USA, jeśli ma być pokazany w galerii,
- oficjalne nazwy i opcjonalne logotypy obu partnerów,
- bezpośredni, zweryfikowany kontakt do Gangu lub osoby od importu i sprzedaży,
- finalny URL wdrożenia do canonical, `og:url`, bezwzględnego `og:image` i ewentualnej sitemap.

Bez danych kontaktowych sekcja kontaktu świadomie prowadzi wyłącznie do partnerów w sprawie napraw i customizacji. Nie ma nieaktywnego telefonu, e-maila ani zapytania o import.

## Publikacja

Całą zawartość katalogu można opublikować bez zmian na dowolnym hostingu statycznym. Na GitHub Pages wybierz gałąź i katalog główny jako źródło. Projekt nie zakłada konkretnej domeny i nie zawiera analityki, zewnętrznych embedów ani banera cookies.

## Kontrola po podmianie zdjęć

Sprawdź stronę przy szerokościach 360, 390, 768, 1024 i 1440 px, powiększeniu 200% oraz z `prefers-reduced-motion`. Zweryfikuj menu i galerię klawiaturą, wszystkie linki oraz brak błędów w konsoli. Wyniki Lighthouse należy zmierzyć ponownie po dodaniu finalnych zdjęć.

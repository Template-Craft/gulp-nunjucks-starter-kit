'use strict';

// Polski słownik
export default {
  'cache.init': 'Inicjalizacja pamięci podręcznej zależności...',
  'cache.setCalled': 'Wywołano setDependencyCache().',
  'cache.memoryUsage': 'wykorzystanie pamięci:',
  'cache.counts':
    'Komponentów w pamięci podręcznej: {{components}}, sekcji w pamięci podręcznej: {{sections}}, szablonów: {{templates}}',
  'cache.reset': 'Pamięć podręczna wyczyszczona ({{reason}})',
  'cache.memoryLimitExceeded': 'Przekroczono limit pamięci: {{used}} MB',
  'cache.usedFromCache': 'PAMIĘĆ PODRĘCZNA ZALEŻNOŚCI',
  'cache.usedFresh': 'NOWA ANALIZA ZALEŻNOŚCI',
  'cache.componentsStat': 'komponenty: {{count}} (w {{files}} plikach)',
  'cache.sectionsStat': 'sekcje: {{count}} (w {{files}} plikach)',
  'cache.templatesStat': 'szablony: {{count}} (w {{files}} plikach)',

  'debug.noData': 'Brak danych dla {{label}}',
  'debug.tableSummary': 'dependencyMap -> {{label}}s: {{count}} pozycji',
  'table.fileCount': 'Liczba plików',
  'table.usedIn': 'Używane w',

  'monitor.notificationTitle': 'Gulp monitor',
  'monitor.resourceExceeded': 'Przekroczono próg zasobów',
  'monitor.statFailed': 'nie udało się odczytać statystyk: {{error}}',

  'watcher.changed': 'Zmieniono:',

  'notify.startError': 'Błąd uruchomienia Gulp',
  'notify.buildError': 'Błąd kompilacji Gulp',
  'notify.serverError': 'Błąd uruchomienia serwera Gulp',
  'notify.devMessage': 'projekt uruchomiony, miłego kodowania!',
  'notify.buildMessage': 'sprawdź folder build w katalogu nadrzędnym.',
  'notify.devTitle': 'Witaj świecie!',
  'notify.buildTitle': 'Kompilacja zakończona',

  'info.sectionAbout': 'O projekcie',
  'info.app': 'Aplikacja',
  'info.version': 'Wersja',
  'info.license': 'Licencja',
  'info.sectionSystem': 'System',
  'info.os': 'System operacyjny',
  'info.platform': 'Platforma',
  'info.arch': 'Architektura',
  'info.sectionRuntime': 'Środowisko uruchomieniowe',
  'info.runtimeLabel': 'Środowisko',
  'info.modeLabel': 'Tryb',
  'info.modeDev': 'Deweloperski',
  'info.modeProd': 'Produkcyjny',

  'errors.sass': 'Ups! Błąd Sass',
  'errors.njk': 'Ups! Błąd szablonu Nunjucks',
  'errors.scripts': 'Ups! Błąd skryptów',
  'errors.json': 'Ups! Błąd Json',
  'errors.vendors': 'Ups! Błąd wtyczki zewnętrznej',
  'errors.assets': 'Ups! Błąd pliku zasobów',

  'styles.initBuild': 'Inicjalizacja kompilacji main.scss',

  'depmap.incrementalUpdate': 'Przyrostowo zaktualizowano "{{label}}" -> plików: {{count}}',
  'depmap.fileSynced': 'Zsynchronizowano plik "{{path}}" -> powiązania zaktualizowane',

  'common.none': '(brak)',
  'common.readFileFailed': '⚠️ Nie udało się odczytać pliku: {{file}}',

  'nunjucks.jsonDirectPage': 'Zaktualizowano JSON {{name}} -> przebudowa tylko strony "{{page}}.njk"',
  'nunjucks.jsonLinkedRebuild': 'Zaktualizowano JSON {{name}} -> powiązano z encją -> przebudowa {{count}} plik(ów):',
  'nunjucks.jsonNoLinks': 'Zaktualizowano JSON {{name}} -> brak powiązań -> przebudowa wszystkich stron',
  'nunjucks.globalJson': 'Zaktualizowano globalny JSON ({{name}}) -> przebudowa wszystkich stron',
  'nunjucks.pageUpdated': 'Zaktualizowano szablon strony -> przebudowa "{{name}}"',
  'nunjucks.componentUpdated': 'Zaktualizowano komponent "{{name}}" -> przebudowa plik(ów):',
  'nunjucks.sectionUpdated': 'Zaktualizowano sekcję "{{name}}" -> przebudowa plik(ów):',
  'nunjucks.templateUpdated': 'Zaktualizowano szablon "{{name}}" -> przebudowa plik(ów):',
  'nunjucks.updateNoLinks': 'Aktualizacja "{{name}}" -> brak powiązań, przebudowa wszystkich stron',
  'nunjucks.unknownOrFull': 'Nieznana zmiana lub pełne renderowanie -> przebudowa wszystkich stron',
};

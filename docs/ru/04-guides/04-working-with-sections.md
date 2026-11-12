# Working with Sections

Section описывает структуру одного логического блока страницы (Hero, About, Gallery, Contacts). Структуру каталогов (Landing Page vs Multipage) и подключение через `getSection(...)` см. в разделе Development → Sections.

## Главное правило

Section объединяет Components в законченный блок, но не должна дублировать разметку между секциями — как только часть разметки повторяется в нескольких Sections, выносите её в Component (см. Working with Components).

## Какой режим выбрать

Один файл-страница — Landing Page, несколько страниц со своим набором секций — Multi-page Project. Переход между режимами не требует переписывать сами Sections, только их расположение и аргумент `group` у `getSection`.

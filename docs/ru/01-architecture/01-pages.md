# Pages

Pages — точки входа Build System. Каждый файл в `views/pages/` становится отдельной HTML-страницей после сборки.

## Ответственность

Page отвечает только за композицию страницы: какие Sections используются, в каком порядке, какие данные нужны и какой Template служит основой. Page не должна содержать сложную логику или повторно используемую разметку — это ответственность Sections, Components и Templates.

```njk
{% from getTemplate('head') import HTMLHead %}
<html>
  <head>{{ HTMLHead() }}</head>
  <body>
    {% from getComponent('Header') import Header %}
    {{ Header() }}

    {% include getSection('', 'first_section') %}

    {% from getComponent('Footer') import Footer %}
    {{ Footer() }}

    {% include getTemplate('scripts') %}
  </body>
</html>
```

## Данные

Page может использовать собственные данные, глобальные данные (`Global.json`) и данные, нужные отдельным сущностям, которые она подключает. Сама страница не должна становиться источником данных для других частей проекта.

## Incremental Build

Для Build System Page — конечная цель сборки и объект Incremental Build. При изменении компонента, секции, шаблона или данных Build System определяет, какие Pages от них зависят, и пересобирает только их.

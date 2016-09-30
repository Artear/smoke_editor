# Smoke Editor

An implementation of a Draft.js Based editor for non-reactjs enviroments.
Smoke keeps track of changes in the draft-editor state and exports it to a form field, for you to save it to a database on form submittion.

It uses Megadraft as core editor. Support for other draftjs based editors will be in the roadmap.

### Install
`npm install`

### Usage


```html

<div id="edit-body">
    <textarea id="edit-body-text" name="body" data-draft-json="" data-field-name="body"></textarea>
</div>

<script src="/dist/SmokeEditorFactory.js"></script>
<script>
    var config = {
        plugins: ['EMBED', 'RELATEDCONTENT'],
        actions: ['BOLD', 'ITALIC', 'LINK', 'SUBTITLE', 'BLOCKQUOTE'],
        debug: true
    }
    SmokeEditorFactory.make(document.getElementById('edit-body'), config);
</script>

```

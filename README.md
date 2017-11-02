# Smoke Editor

An implementation of a Draft.js Based editor for non-reactjs enviroments.
Smoke keeps track of changes in the draft-editor state and exports it to a form field, for you to save it to a database on form submittion.

It uses Megadraft as core editor. Support for other draftjs based editors will be in the roadmap.

### Circle CI build status

[![CircleCI](https://circleci.com/gh/Artear/smoke_editor/tree/master.svg?style=svg)](https://circleci.com/gh/Artear/smoke_editor/tree/master)

### Usage

```html
<textarea id="my-editor" name="my-editor-name"></textarea>

<script src="smoke_editor.min.js"></script>
<script>
    var config = {
        plugins: ['EMBED', 'RELATEDCONTENT','IMAGE', 'RELATEDTAG', 'KALTURA'],
        actions: ['BOLD', 'ITALIC', 'LINK', 'BLOCKQUOTE', 'TAG', 'PEOPLE', 'SUBTITLE'],
        debug: true
    };
    
    SmokeEditorFactory.make(document.getElementById('my-editor'), config);
</script>

```

## Requirements

* [Yarn](https://yarnpkg.com/en/docs/install) package manager ([see installation instructions]([Yarn](https://yarnpkg.com/en/docs/install)))
* Configure [conventional github releaser](https://github.com/conventional-changelog/conventional-github-releaser) if you will generate releases. 

## Development

* `yarn` installs dependencies
* `yarn run start` starts dev server at default port `8081`
* `PORT={value} yarn run start` starts dev server at the specified port number
* `yarn run build` build distribution version to the `dist` folder

### Commits format

This project follows the [conventional changelog](https://github.com/conventional-changelog/conventional-changelog) Angular spec.

### Generating a new version

* Versions are generated via Circle CI when merging to `master` (see `.cirlcleci/config.yml`).

## Notes and resources

* Hot reload help [here](https://github.com/gaearon/react-hot-loader/blob/master/docs/Troubleshooting.md)
* `copy-webpack-plugin` using version 2.1.6 due to [this issue](https://github.com/kevlened/copy-webpack-plugin/issues/29)
* webpack dev server spins up the mock server because it's simpler and more straightforward than mounting the HMR middleware in express
* POST requests to mock server aren't served via the dev server proxy but overriding its app setup, see 
[here](http://stackoverflow.com/questions/39636615/webpack-not-accepting-post-requests) and
[here](http://stackoverflow.com/questions/42735457/webpack-dev-server-support-for-post-put-delete-methods-using-proxy)


## TODOs

* automatic changelog generation
* version and releases flow
* sourcemaps generation
* tests
* editor as a React-only component (no DOM input creation) for React environments
* generate DOM wrapper automatically for non React environments
* banners

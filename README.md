# snapped

[![NPM](https://nodei.co/npm/snapped.png)](https://nodei.co/npm/snapped/)

[![NPM version](https://img.shields.io/npm/v/snapped.svg)](https://www.npmjs.com/package/snapped)
[![Build Status](https://travis-ci.org/remarkablemark/snapped.svg?branch=master)](https://travis-ci.org/remarkablemark/snapped)
[![Coverage Status](https://coveralls.io/repos/github/remarkablemark/snapped/badge.svg?branch=master)](https://coveralls.io/github/remarkablemark/snapped?branch=master)

Snapshot generator for [React](https://facebook.github.io/react/) UI. Inspired by [Jest snapshot testing](https://facebook.github.io/jest/docs/snapshot-testing.html).

## Install

```sh
$ npm install snapped
```

## Usage

```jsx
import generateSnapshot from 'snapped';
const reactElement = (
  <div className='class'>
    Hello, world!
  </div>
);
console.log(
  generateSnapshot(reactElement)
);
```

Output:
```

<div
  className="class"
>
  Hello, world!
</div>

```

## Testing

```sh
$ npm test
$ npm run lint
```

## License

[MIT](https://github.com/remarkablemark/snapped/blob/master/LICENSE)

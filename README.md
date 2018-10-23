# renameAll.js
Author: GNXB (Apiwith Potisuk)

To rename all matching file/folder at once by regular expression (regex).

## Usage
### Normal
```BASH
$ node renameAll.js -d ./ -r '(\w+)\.txt$' -w '$1.md'
$ node renameAll.js -d ./ -r '2018 (\w+)\.txt$' -w '2019 $1.txt'
```

### Test
Not execute, just print the matching items

Put `--test` option when executing
```BASH
$ node renameAll.js -d ./ -r '(\w+)\.txt$' -w '$1.md' --test
```

### `--help`
```BASH
$ node renameAll.js --help
USAGE: node renameAll.js [OPTION1] [OPTION2]... arg1 arg2...
The following options are supported:
  -d, --dir <ARG1>   	Directory Base (mandatory)
  -r, --regex <ARG1> 	Regex to select matching item (mandatory)
  -w, --word <ARG1>  	Word will be place at selecting position (mandatory)
  --test             	To test matching item by printing out before rename
```


## Go recursively
There is no recursive option provided because I attend to reduce the overhead some. But I have provided the way to perform this.

Noted, I will not provide the Bash solution because there is so many old version of command in OSX and make OSX user feel uncomfortable (me too).

Example situation, there is `2018-****.txt` in `target` folder
```BASH
> tree .
.
├── info
│   └── 2018-info.txt
└── work
    └── 2018-work.txt

2 directories, 2 files
```

Open `Node.js` terminal
```BASH
$ node
```

Then follows the following lines of code
```JavaScript
> const { execSync } = require('child_process');
undefined

// If you provide 'find' command with absolute path, it will print all output out as absolute path too.
// '-type d' is only directory
> var list = execSync('find /path/to/target -type d').toString().split('\n')
undefined

> list.pop() \\ Pop out the last blank line
''

> for (var i in list) {
	console.log(
		execSync(`node renameAll.js -d ${list[i]} -r '([A-z0-9-]+)\.txt$' -w '$1.md'`)
			.toString()
	);
}

2018-info.txt -> 2018-info.md

2018-work.txt -> 2018-work.md
```


## Installation
```BASH
$ git clone https://github.com/GNXB/renameAll.js
$ cd renameAll.js
$ npm install
```

## Dependency
```JSON
"dependencies": {
  "stdio": "^0.2.7"
}
```
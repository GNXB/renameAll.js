// Author: GNXB (Apiwith)

const fs = require('fs');
const path = require('path');
const stdio = require('stdio');
const argv = stdio.getopt({
	'dir': { key: 'd', args: 1, mandatory: true, description: 'Directory Base' },
	'regex': { key: 'r', args: 1, mandatory: true, description: 'Regex to select matching item' },
	'word': { key: 'w', args: 1, mandatory: true, description: 'Word will be place at selecting position' },
	'test': { description: 'To test matching item by printing out before rename' }
});

const regex = new RegExp(argv.regex);

fs.readdir(argv.dir, (err, dir) => {
	var fdir = dir.filter(e => regex.test(e));

	if (argv.test) console.info(fdir);
	else {
		for (var i in fdir) {
			var oname = fdir[i].replace(regex, argv.word);
			fs.rename(
				path.join(argv.dir, fdir[i]), 
				path.join(argv.dir, oname), 
				err => {
					if (err) console.error(err);
					else console.info(fdir[i] + ' -> ' + oname);
				}
			);
		}
	}
});
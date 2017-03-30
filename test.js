import test from 'ava';
import execa from 'execa';
test('pkgstat --help', async t => {
    const help_stdout = await execa('./pkgstat.js',['--help']);
    //console.log(help_stdout);
    t.true(help_stdout.stdout.length > 0);
})
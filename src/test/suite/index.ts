import * as path from 'path';
import * as Mocha from 'mocha';
import { glob } from 'glob';

export async function run(): Promise<void> {
	// Create the mocha test
	const mocha = new Mocha({
		ui: 'tdd',
	});

	const testsRoot = path.resolve(__dirname, '..');

	const files: string[] = await glob('**/**.test.js', { cwd: testsRoot });
	files.forEach((f: string) => mocha.addFile(path.resolve(testsRoot, f)));

	return new Promise((c, e) => {
		try {
			// Run the mocha test
			mocha.run(failures => {
				if (failures > 0) {
					e(new Error(`${failures} tests failed.`));
				} else {
					c();
				}
			});
		} catch (err) {
			e(err);
		}
	});
}

export type Version =
	| '1.21'
	| '1.20'
	| '1.19'
	| '1.18'
	| '1.17'
	| '1.16'
	| '1.15'
	| '1.14'
	| '1.13';

export const releaseVersion: Version = '1.21';
export const snapshotVersion: Version = '1.21';

export const defaultVersion: Version = releaseVersion;

export const versionKeys = {
	'1.13': 0,
	'1.14': 1,
	'1.15': 2,
	'1.16': 3,
	'1.17': 4,
	'1.18': 5,
	'1.19': 6,
	'1.20': 7,
	// 1.20.5 placeholder 8
	'1.21': 9
};

export function versionAtLeast(version: Version, minVersion: Version): boolean {
	return versionKeys[version] >= versionKeys[minVersion];
}

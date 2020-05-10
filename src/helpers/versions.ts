export type Version = "1.16" | "1.15"

export const releaseVersion: Version = "1.15"
export const snapshotVersion: Version = "1.16"

export const defaultVersion: Version = releaseVersion

export const versionKeys = {
  "1.15": 0,
  "1.16": 1
}

export function versionAtLeast(version: Version, minVersion: Version): boolean {
  return versionKeys[version] >= versionKeys[minVersion]
}
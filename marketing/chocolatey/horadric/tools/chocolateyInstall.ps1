$ErrorActionPreference = 'Stop'

$toolsDir = "$(Split-Path -Parent $MyInvocation.MyCommand.Definition)"

$packageArgs = @{
  packageName    = 'horadric'
  unzipLocation  = $toolsDir
  url64bit       = 'https://github.com/Mopra/horadric.dev/releases/download/v0.17.0/horadric-x64.zip'
  checksum64     = '41127047F04CAEC1B59019E2EFB0318088D109908A48133AC22B46EE1192D712'
  checksumType64 = 'sha256'
}

Install-ChocolateyZipPackage @packageArgs

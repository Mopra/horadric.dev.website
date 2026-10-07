$ErrorActionPreference = 'Stop'

$toolsDir = "$(Split-Path -Parent $MyInvocation.MyCommand.Definition)"

$packageArgs = @{
  packageName    = 'horadric'
  unzipLocation  = $toolsDir
  url64bit       = 'https://github.com/Mopra/horadric.dev/releases/download/v0.16.0/horadric-x64.zip'
  checksum64     = '9339ED0701948784E2D3D6B267B563CE0372B7628CA6BA54D7AFF47C1D7EF1C7'
  checksumType64 = 'sha256'
}

Install-ChocolateyZipPackage @packageArgs

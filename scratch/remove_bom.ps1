$path = 'c:\Users\zekas\DIETOLOQ\dietoloq\src\i18n\messages\az.json'
$content = Get-Content -Path $path -Raw
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($path, $content, $utf8NoBom)
Write-Host "BOM removed successfully from az.json"

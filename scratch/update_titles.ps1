$path = 'c:\Users\zekas\DIETOLOQ\dietoloq\src\i18n\messages\az.json'
$content = Get-Content -Path $path -Raw -Encoding UTF8
$content = $content -replace 'Funksional Tibb və Anti Age mütəxəssisi', 'Funksional Tibb Həkimi və Anti Age mütəxəssisi'
[System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)
Write-Host "Title update completed successfully."

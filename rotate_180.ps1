Add-Type -AssemblyName System.Drawing
$images = @('4.JPG', '5.JPG', '8.JPG', '10.JPG', '15.JPG')
$dir = "C:\Users\ASEEL\Desktop\Flip Flex\Subha Studio\subha-studios-main\public\Bridal"

foreach ($img in $images) {
    $path = Join-Path $dir $img
    if (Test-Path $path) {
        $bmp = [System.Drawing.Image]::FromFile($path)
        $bmp.RotateFlip([System.Drawing.RotateFlipType]::Rotate180FlipNone)
        $tempPath = Join-Path $dir ("temp2_" + $img)
        $bmp.Save($tempPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
        $bmp.Dispose()
        Move-Item -Force $tempPath $path
        Write-Host "Successfully rotated 180 degrees: $img"
    } else {
        Write-Host "File not found: $path"
    }
}

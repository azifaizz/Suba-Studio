Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile("C:\Users\ASEEL\Desktop\Flip Flex\Subha Studio\subha-studios-main\public\postwed\p12.png")
$img.RotateFlip([System.Drawing.RotateFlipType]::Rotate270FlipNone)
$img.Save("C:\Users\ASEEL\Desktop\Flip Flex\Subha Studio\subha-studios-main\public\postwed\p12_rotated.png", [System.Drawing.Imaging.ImageFormat]::Png)
$img.Dispose()
Move-Item -Path "C:\Users\ASEEL\Desktop\Flip Flex\Subha Studio\subha-studios-main\public\postwed\p12_rotated.png" -Destination "C:\Users\ASEEL\Desktop\Flip Flex\Subha Studio\subha-studios-main\public\postwed\p12.png" -Force
Write-Host "Image successfully rotated left 90 degrees."

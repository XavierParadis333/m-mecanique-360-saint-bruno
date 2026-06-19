param(
    [string]$UserEmail = "xquidozparadis@gmail.com",
    [string]$UserName = "XavierParadis333"
)

# Récupère le nom du dossier courant
$RepoName = (Get-Item .).BaseName

Write-Host "Initialisation Git pour: $RepoName" -ForegroundColor Green
git init
git config --global user.email $UserEmail
git config --global user.name $UserName
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin "https://github.com/$UserName/$RepoName.git"
git push -u origin main

Write-Host "Terminé! Ton code est sur GitHub." -ForegroundColor Green
Write-Host "Va sur https://github.com/$UserName/$RepoName pour vérifier" -ForegroundColor Cyan
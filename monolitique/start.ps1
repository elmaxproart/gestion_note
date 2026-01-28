# Script de démarrage rapide pour le projet monolithique
Write-Host "🚀 Démarrage du projet monolithique..." -ForegroundColor Cyan
Write-Host ""

# Vérifier si les dépendances sont installées
if (-not (Test-Path "$PSScriptRoot\backend\node_modules")) {
    Write-Host "📦 Installation des dépendances du backend..." -ForegroundColor Yellow
    Set-Location "$PSScriptRoot\backend"
    npm install
}

if (-not (Test-Path "$PSScriptRoot\frontend\node_modules")) {
    Write-Host "📦 Installation des dépendances du frontend..." -ForegroundColor Yellow
    Set-Location "$PSScriptRoot\frontend"
    npm install
}

Write-Host ""
Write-Host "✨ Démarrage des services..." -ForegroundColor Green
Write-Host ""
Write-Host "Backend: http://localhost:3001" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host ""
Write-Host "⚠️  Ouvrez deux terminaux séparés et exécutez:" -ForegroundColor Yellow
Write-Host "Terminal 1: cd monolitique/backend && npm start" -ForegroundColor White
Write-Host "Terminal 2: cd monolitique/frontend && npm run dev" -ForegroundColor White

# Script de démarrage rapide pour les microservices
Write-Host "🚀 Démarrage des microservices..." -ForegroundColor Cyan
Write-Host ""

# Vérifier si les dépendances sont installées
if (-not (Test-Path "$PSScriptRoot\student-service\node_modules")) {
    Write-Host "📦 Installation des dépendances du service étudiants..." -ForegroundColor Yellow
    Set-Location "$PSScriptRoot\student-service"
    npm install
}

if (-not (Test-Path "$PSScriptRoot\notes-service\node_modules")) {
    Write-Host "📦 Installation des dépendances du service notes..." -ForegroundColor Yellow
    Set-Location "$PSScriptRoot\notes-service"
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
Write-Host "Service Étudiants: http://localhost:3002" -ForegroundColor Cyan
Write-Host "Service Notes: http://localhost:3003" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:5174" -ForegroundColor Cyan
Write-Host ""
Write-Host "⚠️  Ouvrez trois terminaux séparés et exécutez:" -ForegroundColor Yellow
Write-Host "Terminal 1: cd microservices/student-service && npm start" -ForegroundColor White
Write-Host "Terminal 2: cd microservices/notes-service && npm start" -ForegroundColor White
Write-Host "Terminal 3: cd microservices/frontend && npm run dev" -ForegroundColor White

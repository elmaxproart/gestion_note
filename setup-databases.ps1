# Script d'initialisation des bases de données
# Assurez-vous que PostgreSQL est en cours d'exécution

Write-Host "🗄️  Initialisation des bases de données..." -ForegroundColor Cyan
Write-Host ""

# Demander le mot de passe PostgreSQL
$pgPassword = Read-Host "Entrez le mot de passe pour l'utilisateur 'postgres'" -AsSecureString
$PGPASSWORD_Plain = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($pgPassword))
$env:PGPASSWORD = $PGPASSWORD_Plain

# Initialiser la base monolithique
Write-Host "📊 Création de la base de données monolithique..." -ForegroundColor Green
try {
    & psql -U postgres -f "$PSScriptRoot\monolitique\backend\init-db.sql"
    Write-Host "✅ Base de données monolithique créée avec succès!" -ForegroundColor Green
} catch {
    Write-Host "❌ Erreur lors de la création de la base monolithique" -ForegroundColor Red
    Write-Host $_.Exception.Message
}

Write-Host ""

# Initialiser la base du service étudiants
Write-Host "👨‍🎓 Création de la base de données du service étudiants..." -ForegroundColor Green
try {
    & psql -U postgres -f "$PSScriptRoot\microservices\student-service\init-db.sql"
    Write-Host "✅ Base de données des étudiants créée avec succès!" -ForegroundColor Green
} catch {
    Write-Host "❌ Erreur lors de la création de la base des étudiants" -ForegroundColor Red
    Write-Host $_.Exception.Message
}

Write-Host ""

# Initialiser la base du service notes
Write-Host "📝 Création de la base de données du service notes..." -ForegroundColor Green
try {
    & psql -U postgres -f "$PSScriptRoot\microservices\notes-service\init-db.sql"
    Write-Host "✅ Base de données des notes créée avec succès!" -ForegroundColor Green
} catch {
    Write-Host "❌ Erreur lors de la création de la base des notes" -ForegroundColor Red
    Write-Host $_.Exception.Message
}

Write-Host ""
Write-Host "🎉 Initialisation terminée!" -ForegroundColor Cyan
Write-Host ""
Write-Host "Prochaines étapes:" -ForegroundColor Yellow
Write-Host "1. Installer les dépendances pour chaque projet (npm install)" -ForegroundColor Yellow
Write-Host "2. Démarrer les applications (npm start pour backend, npm run dev pour frontend)" -ForegroundColor Yellow

# Nettoyer le mot de passe de l'environnement
Remove-Item Env:\PGPASSWORD

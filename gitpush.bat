@echo off
set GIT=C:\Users\Usuario\AppData\Local\GitHubDesktop\app-3.5.6\resources\app\git\cmd\git.exe
"%GIT%" init
"%GIT%" remote add origin https://github.com/budyto/electromym-web.git
"%GIT%" fetch origin
"%GIT%" checkout -b main
"%GIT%" branch --set-upstream-to=origin/main main
"%GIT%" add -A
"%GIT%" commit -m "feat: integración API BCRA via Supabase Edge Function, simulador Dark & Gold, .htaccess Hostinger"
"%GIT%" push origin main --force
echo DONE

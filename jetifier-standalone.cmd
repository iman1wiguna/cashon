@IF EXIST "%~dp0\sh.exe" (
  "%~dp0\sh.exe"  "%~dp0\node_modules\jetifier\bin\jetifier-standalone" %*
) ELSE (
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  sh  "%~dp0\node_modules\jetifier\bin\jetifier-standalone" %*
)
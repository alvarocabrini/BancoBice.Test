# BancoBice.Test
Prueba Banco Bice Labs

### Levantando la aplicación
1. Sobre la carpeta que contiene la publicación de la aplicación ([Descargar aquí](https://github.com/alvarocabrini/BancoBicePublish)) debes abrir una consola de comandos (CMD) y ejecutar el comando **dotnet BancoBice.Test.Presentation.dll** 
![alt text](https://fotos.subefotos.com/a664c68b82c1879e68c9ef718e95ff6co.png "CMD dotnet")

2. Abrir el navegador, y copiar la siguiente url [https://localhost:5001/](https://localhost:5001/) o [http://localhost:5000/](http://localhost:5000/)


### Test unitario
Para correr el test unitario se necesitará:
  - Visual Studio 2019 [Descargalo aquí](https://visualstudio.microsoft.com/es/thank-you-downloading-visual-studio/?sku=Community&rel=16)
  - .NET Core 3.1 SDK (v3.1.201) [Windows x64](https://dotnet.microsoft.com/download/dotnet-core/thank-you/sdk-3.1.201-windows-x64-installer) [Otra arquitectura / Sistema operativo](https://dotnet.microsoft.com/download/dotnet-core/3.1)

1. Abrir la aplicación, click sobre la pestaña **Prueba/Test** y seleccionar **Explorador de pruebas/Test Explorer**
![alt text](https://fotos.subefotos.com/02f2d32769233e1e214c1c4194b8dbado.png "Explorador de pruebas")

2. Se deplegará un cuadro llamado **Explorador de pruebas/Test Explorer**, donde se encontrará un test unitario **UrisStatusOk**, al seleccionarlo y presionar click secundario, debes seleccionar **Ejecutar/Execute**
![alt text](https://fotos.subefotos.com/4a7de7f6908e362d873f18421fadf807o.png "Explorador de pruebas")


### Para hacer cambios sobre esta aplicación o levantarla en un servidor web se necesita los siguiente
  - Visual Studio 2019 [Descargalo aquí](https://visualstudio.microsoft.com/es/thank-you-downloading-visual-studio/?sku=Community&rel=16)
  - .NET Core 3.1 SDK (v3.1.201) [Windows x64](https://dotnet.microsoft.com/download/dotnet-core/thank-you/sdk-3.1.201-windows-x64-installer) [Otra arquitectura / Sistema operativo](https://dotnet.microsoft.com/download/dotnet-core/3.1)
  - Node.js [Descargalo aquí](https://nodejs.org/es/download/)
  
Para generar la publicación se deben seguir los siguientes pasos
1. Abrir la aplicación
2. Sobre el proyecto **BancoBice.Test.Presentation** dar click secundario y seleccionar **Publicar/Publish**
![alt text](https://docs.microsoft.com/en-us/visualstudio/deployment/media/quickstart-publish.png?view=vs-2019 "Crear perfil publicación")

3. En el recuadro seleccionar **Carpeta/Folder**, en el botón **Buscar/Browse** seleccionar la ruta donde se alojará la publicación, luego en la esquina inferior derecha presionar el botón **Publicar/Publish**
![alt text](https://docs.microsoft.com/en-us/visualstudio/deployment/media/quickstart-publish-folder.png?view=vs-2019 "Configurar publicación")

4. En el recuadro que aparecerá debe estar presionar el botón **Publicar/Publish** esto puede tomar unos minutos 
![alt text](https://docs.microsoft.com/en-us/visualstudio/deployment/media/quickstart-publish-folder-summary.png?view=vs-2019 "Generar publicación")

5. Mover los archivos generados al servidor web, como por ejemplo IIS

# BancoBice.Test
Prueba Banco Bice Labs

### Probar la aplicación
1. Sobre la carpeta que contiene la publicación de la aplicación ([Descárgala aquí](https://github.com/alvarocabrini/BancoBicePublish)) debes abrir una consola de comandos (CMD) y ejecutar el comando **dotnet BancoBice.Test.Presentation.dll** 

![alt text](https://fotos.subefotos.com/a664c68b82c1879e68c9ef718e95ff6co.png "CMD dotnet")

2. Abre el navegador, y copia la siguiente url [https://localhost:5001/](https://localhost:5001/) o [http://localhost:5000/](http://localhost:5000/)


### Test unitario
Para correr el test unitario necesitarás:
  - Visual Studio 2019 ([Descárgala aquí](https://visualstudio.microsoft.com/es/thank-you-downloading-visual-studio/?sku=Community&rel=16))
  - .NET Core 3.1 SDK (v3.1.201) [Windows x64](https://dotnet.microsoft.com/download/dotnet-core/thank-you/sdk-3.1.201-windows-x64-installer) [Otra arquitectura / Sistema operativo](https://dotnet.microsoft.com/download/dotnet-core/3.1)

1. Abre la aplicación, sobre la pestaña **Prueba/Test** selecciona **Explorador de pruebas/Test Explorer**

![alt text](https://fotos.subefotos.com/02f2d32769233e1e214c1c4194b8dbado.png "Explorador de pruebas")

2. Se deplegará un panel llamado **Explorador de pruebas/Test Explorer**, verás un test unitario con el nombre **UrisStatusOk**, haz 
click secundario y selecciona **Ejecutar/Execute**

![alt text](https://fotos.subefotos.com/4a7de7f6908e362d873f18421fadf807o.png "Explorador de pruebas")


### Para hacer cambios sobre esta aplicación o levantarla en un servidor web se necesita lo siguiente
  - Visual Studio 2019 ([Descárgala aquí](https://visualstudio.microsoft.com/es/thank-you-downloading-visual-studio/?sku=Community&rel=16))
  - .NET Core 3.1 SDK (v3.1.201) [Windows x64](https://dotnet.microsoft.com/download/dotnet-core/thank-you/sdk-3.1.201-windows-x64-installer) [Otra arquitectura / Sistema operativo](https://dotnet.microsoft.com/download/dotnet-core/3.1)
  - Node.js ([Descárgala aquí](https://nodejs.org/es/download/))
  
Para generar la publicación sigue los siguientes pasos
1. Abre la aplicación
2. Sobre el proyecto **BancoBice.Test.Presentation** haz click secundario y selecciona **Publicar/Publish**

![alt text](https://docs.microsoft.com/en-us/visualstudio/deployment/media/quickstart-publish.png?view=vs-2019 "Crear perfil publicación")

3. En el recuadro selecciona la opción **Carpeta/Folder**, haz click en **Buscar/Browse** y selecciona la ruta donde se alojará la publicación, luego en la esquina inferior derecha haz click en **Publicar/Publish**

![alt text](https://docs.microsoft.com/en-us/visualstudio/deployment/media/quickstart-publish-folder.png?view=vs-2019 "Configurar publicación")

4. Aparecerá un recuadro en donde debes hacer click en **Publicar/Publish** (esto puede tardar unos minutos) 

![alt text](https://docs.microsoft.com/en-us/visualstudio/deployment/media/quickstart-publish-folder-summary.png?view=vs-2019 "Generar publicación")

5. Mueve los archivos generados al servidor web, por ejemplo al IIS

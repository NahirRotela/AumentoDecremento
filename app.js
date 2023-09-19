const http = require("http");
const { exec } = require("child_process");



        // Comando para crear un contenedor
        console.log("Se esta por crear el contenedor")
        const dockerRunCommand = 'docker run -d --name mi_contenedor -p 8080:80 nginx';

        exec(dockerRunCommand, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error al crear el contenedor: ${error}`);
                return;
            }

            console.log(`Contenedor creado con éxito. ID del contenedor: ${stdout}`);

        });
    

// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => {
//     console.log(Servidor en ejecución en el puerto ${PORT});
// });

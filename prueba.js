const { exec } = require('child_process');

function encontrarPuertoLibre(puertoInicial, puertoFinal) {
    return new Promise((resolve, reject) => {
        let puerto = puertoInicial;

        const verificarSiguientePuerto = () => {
            if (puerto > puertoFinal) {
                reject(new Error('No se encontraron puertos libres en el rango especificado.'));
                return;
            }

            // Verificar si el puerto está en uso
            const comandoVerificacion = `docker run --rm -d -p ${puerto}:80 nginx`;

            exec(comandoVerificacion, (error, stdout, stderr) => {
                if (error && error.message.includes('port is already allocated')) {
                    // El puerto está en uso, intentar con el siguiente
                    puerto++;
                    verificarSiguientePuerto();
                } else if (error) {
                    // Ocurrió otro error al intentar verificar el puerto
                    reject(error);
                } else {
                    // Si el comando se ejecuta exitosamente, significa que el puerto está libre
                    resolve(puerto);
                }
            });
        };

        verificarSiguientePuerto();
    });
}



async function crearContenedor() {
    try {
        // Obtener un nombre de contenedor aleatorio
        const nombreContenedor = `web${Math.floor(Math.random() * 1000)}`;
        console.log(`Nombre de contenedor: ${nombreContenedor}`);
        
        // Obtener un puerto incremental
        const puertoInicial = 4000;
        const puertoFinal = 5000;
        const puerto = await encontrarPuertoLibre(puertoInicial, puertoFinal);
        console.log(`Puerto encontrado: ${puerto}`);

        // Comando para crear el contenedor con el nombre y puerto obtenidos
        const dockerRunCommand = `docker run -d -t --name ${nombreContenedor} -p ${puerto}:80 nginx`;
        
        console.log("Se está por crear el contenedor");
        
        exec(dockerRunCommand, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error al crear el contenedor: ${error}`);
                return;
            }
        
            console.log(`Contenedor creado con éxito. ID del contenedor: ${stdout}`);
        });
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

// Ejecutar la función principal para crear un contenedor
crearContenedor();



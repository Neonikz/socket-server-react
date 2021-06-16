// Servidor de express
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');

class Server {

    constructor(){

        this.app = express();
        
        this.port = process.env.PORT;

        //Http server
        this.server = http.createServer( this.app );

        // Configuraciones del socket
        this.io = socketio( this.server, { /* Configuraciones */ } ); 
    }

    middlewares(){
        //Desplegar el directorio publico
        this.app.use( express.static( path.resolve( __dirname, '../public' ) ) );
    }


    configSockets(){
        new Sockets( this.io );
    }


    execute(){
        
        // Inicializar middlewares
        this.middlewares();

        //Inicializar sockets
        this.configSockets();

        // Inicializar server
        this.server.listen( this.port , () => {
            console.log('Server corriendo en puerto: ', this.port );
        });
    }

}


module.exports = Server;
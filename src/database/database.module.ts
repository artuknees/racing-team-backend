import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config'; // traigo esto para poner las variables de entorno
import { MongoClient } from 'mongodb';

import { MongooseModule } from '@nestjs/mongoose'
import config from '../config'; // traigo las config

@Global() // con esto le digo que va a ser un module global. todo lo que estara abajo va a ser global
@Module({
  imports: [
    MongooseModule.forRootAsync({ // asi me conecto pasandole variables de entorno
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { connection, user, password, host, port, dbName } = configService.mongo;
        return {
          uri: `${connection}://${user}:${password}@${host}.${port}/`,
          dbName,
        }
      },
      inject: [config.KEY]
    })
  ],
  providers: [
    { // para conectarme a mi MONGO DB ATLAS
      provide: 'MONGO-ATLAS',
      useFactory: async (configService: ConfigType<typeof config>) => { // esto va a poder ser inyectable por cualquier servicio
        const { connection, user, password, host, port, dbName } = configService.mongo;
        const uri = `${connection}://${user}:${password}@${host}.${port}/`; // mongo compass da esta direccion - string de conexion
        const client = new MongoClient(uri);
        await client.connect();
        const database = client.db(dbName); // digo a que db me conecto
        return database; // retorno directamente la base de datos. Mas adelante me conecto a lo que quiera.
      },
      inject: [config.KEY]
    },
  ],
  exports: ['MONGO-ATLAS'], // lo hago exportable
})
export class DatabaseModule { }

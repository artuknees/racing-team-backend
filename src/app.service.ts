import { Injectable, Inject } from '@nestjs/common';
import { Db } from 'mongodb'

@Injectable()
export class AppService {
  constructor(
    @Inject('MONGO-ATLAS') private atlasDatabase: Db,
  ) {}
  getAtlasEngines() {
    const atlasCollection = this.atlasDatabase.collection('engines');
    return atlasCollection.find().toArray();
  }
}
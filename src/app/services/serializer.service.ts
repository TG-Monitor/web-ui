import { Injectable } from '@angular/core';
import {areAllEquivalent} from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class SerializerService {

  constructor() { }

  public serializeRequest(): string {
    const msg: string[] = [];
    for (let i = 0; i < arguments.length; i++) {
      msg.push(arguments[i]);
    }
    return JSON.stringify(msg);
  }

  public deserializeResponse(msg: string) {
    return JSON.parse(msg);
  }

  public serializeResponse(msg: string) {
    return JSON.stringify(msg);
  }
}
